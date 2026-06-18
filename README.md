# Dark Pattern Lab

Dark Pattern Lab is the digital artefact for Sumit Rai's Computer Science dissertation at York St John University. The project is a small research website that lets participants experience common dark patterns in safe, fictional interfaces and then reflect on whether short educational interventions improve their ability to recognise them.

The live artefact is available here:

https://darkpatternlab.vercel.app

The source repository is here:

https://github.com/raisumit052-cpu/darkpatternlab

## What This Artefact Does

The website supports a full participant journey for a dissertation study:

1. Participants complete a pre-test survey in Qualtrics.
2. The website creates an anonymous study session.
3. Participants complete four simulated website tasks.
4. Some participants see intervention warnings and explanations during the simulations.
5. The website records anonymous interaction results.
6. Participants see a results summary.
7. Participants complete a post-test survey in Qualtrics.

The aim is to test whether awareness-based explanations can help people notice and resist manipulative interface design.

## Simulations Included

The artefact includes four types of simulated interfaces:

- Online shopping flow, including hidden costs, false urgency, and pre-selected extras.
- Cookie consent flow, including visual hierarchy manipulation and friction asymmetry.
- Subscription cancellation flow, including roach motel patterns and confirmshaming.
- App permissions flow, including misleading defaults and privacy-related pressure.

These simulations are fictional. They are designed for research and education, not for collecting personal data or making real purchases.

## Project Structure

```text
.
+-- frontend/        React + Vite website used by participants
+-- backend/         Flask API used for sessions, results, events, and exports
+-- vercel.json      Vercel deployment configuration for the frontend
`-- README.md        Project documentation
```

## Technology Used

- React and Vite for the participant-facing website.
- Flask for the backend API.
- SQLite for the current backend database file.
- Vercel for the frontend deployment.
- Render for the backend deployment.
- Qualtrics for the pre-test and post-test survey forms.

## Data Collected By The Website

The backend stores anonymous study interaction data only. It records:

- Anonymous session ID.
- Intervention group assignment: control or intervention.
- Simulation type and variant.
- Whether the participant fell for or resisted a dark pattern.
- Confidence rating after explanations.
- Time to first click.
- Hesitation count.
- Click count.
- Basic event logs, such as completion events.

The backend code does not collect participant names, email addresses, passwords, or Qualtrics survey answers. Survey answers are handled separately by Qualtrics.

Important: the backend currently writes to a SQLite file called `darkpattern.db`. For reliable live data collection, Render should be configured with persistent storage or the project should be moved to a managed database such as Render Postgres.

## Running The Project Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend normally runs at:

```text
http://localhost:5000
```

## Build And Checks

From the `frontend` folder:

```bash
npm run lint
npm run build
```

Both commands should pass before submitting or redeploying the project.

## Deployment Notes

The deployed frontend is hosted on Vercel. Requests to `/api/*` are forwarded to the Render backend:

```text
https://darkpatternlab.onrender.com
```

The backend exposes routes for creating sessions, saving simulation results, logging events, viewing public aggregate statistics, and exporting admin data.

## Admin And Export

The project includes an admin dashboard route at:

```text
/admin
```

The backend protects admin API routes with an `ADMIN_TOKEN` environment variable. In a production deployment, this token should be set securely in Render rather than relying on the development default in the source code.

## Dissertation Context

This artefact demonstrates the practical part of the dissertation: an interactive system for exposing participants to dark patterns and measuring whether explanations improve awareness. It is intended to support the methods and findings described in the written dissertation, not to operate as a commercial website.

## Limitations

- The simulations are simplified versions of real design patterns.
- The website records anonymous behavioural metrics, but the survey data remains in Qualtrics.
- SQLite is acceptable for a small prototype, but persistent storage or a managed database is recommended for longer-term data collection.
- The artefact is built for dissertation research and demonstration, so some operational features, such as full authentication and advanced data management, are intentionally lightweight.
