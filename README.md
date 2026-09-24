# PulseBoard — Task Tracker

Node.js + Express + MySQL backend, vanilla JS frontend, deployed via Docker,
GitHub Actions, and GHCR to an AWS EC2 instance.

```
pulseboard/
├── backend/                    Express + mysql2 API
├── frontend/                   Static HTML/CSS/JS UI, served by nginx
├── init.sql                    Creates the database + tasks table on first run
├── docker-compose.yml          LOCAL dev — builds images yourself
├── docker-compose.prod.yml     EC2 — pulls pre-built images from GHCR
├── .env.prod.example           Template for the EC2 server's .env file
└── .github/workflows/deploy.yml   CI/CD pipeline: build → push to GHCR → deploy
```

## Run it locally first (to prove the code works)

```bash
docker compose up --build
```

Then visit:
- `http://localhost` — the PulseBoard UI
- `http://localhost:3000/health` — backend health check
- `http://localhost:3000/api/tasks` — raw task data

See the chat guide for the full step-by-step deployment to AWS EC2 with
GitHub Actions and GHCR.
