from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import os
from models import (
    init_db, create_session, get_session,
    save_simulation_result, log_event, get_admin_stats, get_db
)

app = Flask(__name__)

ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS}})

SIMULATION_VARIANTS = {
    "shopping": [1, 2, 3],
    "cookie": [1, 2, 3],
    "subscription": [1, 2],
    "permissions": [1, 2],
}

ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "darklab-admin-2025")


def require_admin(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("X-Admin-Token")
        if token != ADMIN_TOKEN:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated


@app.route("/api/session/create", methods=["POST"])
def create():
    intervention_mode = random.choice(["control", "intervention"])
    session_id = create_session(intervention_mode)

    variants = {
        sim: random.choice(variants)
        for sim, variants in SIMULATION_VARIANTS.items()
    }

    return jsonify({
        "session_id": session_id,
        "intervention_mode": intervention_mode,
        "variants": variants,
    })


@app.route("/api/session/<session_id>", methods=["GET"])
def get(session_id):
    session = get_session(session_id)
    if not session:
        return jsonify({"error": "Session not found"}), 404
    return jsonify(session)


@app.route("/api/session/<session_id>/complete", methods=["POST"])
def complete_session(session_id):
    conn = get_db()
    conn.execute("UPDATE sessions SET completed = 1 WHERE id = ?", (session_id,))
    conn.commit()
    conn.close()
    return jsonify({"ok": True})


@app.route("/api/result", methods=["POST"])
def save_result():
    data = request.get_json()
    required = ["session_id", "simulation", "variant", "fell_for_pattern"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing fields"}), 400

    save_simulation_result(
        session_id=data["session_id"],
        simulation=data["simulation"],
        variant=data["variant"],
        fell_for_pattern=data["fell_for_pattern"],
        confidence=data.get("confidence"),
        time_to_first_click_ms=data.get("time_to_first_click_ms"),
        hesitation_count=data.get("hesitation_count", 0),
        click_count=data.get("click_count", 0),
    )
    return jsonify({"ok": True})


@app.route("/api/event", methods=["POST"])
def log():
    data = request.get_json()
    log_event(
        session_id=data["session_id"],
        simulation=data.get("simulation"),
        event_type=data["event_type"],
        element_id=data.get("element_id"),
        timestamp_ms=data["timestamp_ms"],
    )
    return jsonify({"ok": True})


@app.route("/api/stats/public", methods=["GET"])
def public_stats():
    """Anonymized aggregate stats — no auth required, safe to expose."""
    conn = get_db()
    rows = conn.execute("""
        SELECT simulation,
               intervention_mode,
               ROUND(AVG(CAST(fell_for_pattern AS FLOAT)) * 100, 1) as fall_rate,
               ROUND(AVG(confidence), 2) as avg_confidence,
               COUNT(*) as total
        FROM simulation_results sr
        JOIN sessions s ON sr.session_id = s.id
        WHERE s.completed = 1
        GROUP BY simulation, intervention_mode
    """).fetchall()
    total = conn.execute("SELECT COUNT(*) FROM sessions WHERE completed = 1").fetchone()[0]
    conn.close()
    return jsonify({
        "total_participants": total,
        "by_simulation": [dict(r) for r in rows],
    })


@app.route("/api/admin/stats", methods=["GET"])
@require_admin
def admin_stats():
    return jsonify(get_admin_stats())


@app.route("/api/admin/export", methods=["GET"])
@require_admin
def export_csv():
    import csv
    import io
    conn = get_db()
    rows = conn.execute("""
        SELECT sr.session_id, s.intervention_mode, sr.simulation, sr.variant,
               sr.fell_for_pattern, sr.confidence, sr.time_to_first_click_ms,
               sr.hesitation_count, sr.click_count, sr.completed_at
        FROM simulation_results sr
        JOIN sessions s ON sr.session_id = s.id
        ORDER BY sr.completed_at
    """).fetchall()
    conn.close()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["session_id", "intervention_mode", "simulation", "variant",
                     "fell_for_pattern", "confidence", "time_to_first_click_ms",
                     "hesitation_count", "click_count", "completed_at"])
    for row in rows:
        writer.writerow(list(row))

    from flask import Response
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=darkpattern_data.csv"}
    )


init_db()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
