import sqlite3
import uuid
from datetime import datetime

DB_PATH = "darkpattern.db"


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            created_at TEXT NOT NULL,
            intervention_mode TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS simulation_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            simulation TEXT NOT NULL,
            variant INTEGER NOT NULL,
            fell_for_pattern INTEGER NOT NULL,
            confidence INTEGER,
            time_to_first_click_ms INTEGER,
            hesitation_count INTEGER,
            click_count INTEGER,
            completed_at TEXT NOT NULL,
            FOREIGN KEY (session_id) REFERENCES sessions(id)
        );

        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            simulation TEXT,
            event_type TEXT NOT NULL,
            element_id TEXT,
            timestamp_ms INTEGER NOT NULL,
            FOREIGN KEY (session_id) REFERENCES sessions(id)
        );
    """)
    conn.commit()
    conn.close()


def create_session(intervention_mode):
    session_id = str(uuid.uuid4())
    conn = get_db()
    conn.execute(
        "INSERT INTO sessions (id, created_at, intervention_mode) VALUES (?, ?, ?)",
        (session_id, datetime.utcnow().isoformat(), intervention_mode)
    )
    conn.commit()
    conn.close()
    return session_id


def get_session(session_id):
    conn = get_db()
    row = conn.execute("SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def save_simulation_result(session_id, simulation, variant, fell_for_pattern,
                           confidence, time_to_first_click_ms, hesitation_count, click_count):
    conn = get_db()
    conn.execute(
        """INSERT INTO simulation_results
           (session_id, simulation, variant, fell_for_pattern, confidence,
            time_to_first_click_ms, hesitation_count, click_count, completed_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (session_id, simulation, variant, int(fell_for_pattern), confidence,
         time_to_first_click_ms, hesitation_count, click_count,
         datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()


def log_event(session_id, simulation, event_type, element_id, timestamp_ms):
    conn = get_db()
    conn.execute(
        "INSERT INTO events (session_id, simulation, event_type, element_id, timestamp_ms) VALUES (?, ?, ?, ?, ?)",
        (session_id, simulation, event_type, element_id, timestamp_ms)
    )
    conn.commit()
    conn.close()


def get_admin_stats():
    conn = get_db()

    total_sessions = conn.execute("SELECT COUNT(*) FROM sessions").fetchone()[0]
    completed_sessions = conn.execute("SELECT COUNT(*) FROM sessions WHERE completed = 1").fetchone()[0]

    fall_rates = conn.execute("""
        SELECT simulation, intervention_mode,
               ROUND(AVG(CAST(fell_for_pattern AS FLOAT)) * 100, 1) as fall_rate,
               COUNT(*) as total,
               ROUND(AVG(confidence), 1) as avg_confidence,
               ROUND(AVG(time_to_first_click_ms), 0) as avg_time_ms
        FROM simulation_results sr
        JOIN sessions s ON sr.session_id = s.id
        GROUP BY simulation, intervention_mode
        ORDER BY simulation
    """).fetchall()

    conn.close()
    return {
        "total_sessions": total_sessions,
        "completed_sessions": completed_sessions,
        "fall_rates": [dict(r) for r in fall_rates],
    }
