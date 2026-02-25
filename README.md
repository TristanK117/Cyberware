# CyberAware

CyberAware is a multi-service full-stack application designed to support cybersecurity education, awareness, and safe digital practices. The system is composed of a frontend client, backend API, supporting infrastructure, and a machine learning service. This repository is structured to support collaborative development, local testing, and containerized deployment.

---

## Repository Structure

```
CyberAware/
├── backend/              # API server and business logic
├── frontend/             # Web client application
├── ml-service/           # Machine learning microservice
├── infrastructure/       # Deployment and DevOps configuration
├── docker-compose.yml    # Local multi-container setup
└── README.md
```

Each service is isolated but designed to work together through defined APIs and shared environment configuration.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Git
- Docker and Docker Compose
- Node.js (LTS recommended)
- Python 3.9+
- PostgreSQL (optional if running fully containerized)

Verify installations:

```bash
node -v
python --version
docker --version
```

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TristanK117/CyberAware.git
cd CyberAware
```

---

### 2. Configure Environment Variables

Each service may require its own `.env` file.

Create `.env` files in:
- `backend/`
- `frontend/`
- `ml-service/`

Example backend `.env`:

```env
PORT=8000
DATABASE_URL=postgres://user:password@localhost:5432/CyberAware
SECRET_KEY=your_secret_key
```

Do not commit `.env` files. Use `.env.example` if contributing.

---

### 3. Start Infrastructure with Docker

If using Docker for database and dependencies:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

---

### 4. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python app.py
```

Backend should run on the configured port (e.g., http://localhost:8000).

---

### 5. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will typically run on http://localhost:3000.

---

### 6. ML Service Setup

```bash
cd ml-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python serve.py
```

Ensure the backend is configured to communicate with the ML service endpoint.

---

## Development Workflow

- Create feature branches:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Follow consistent commit formatting.
- Keep pull requests focused and scoped.
- Rebase before opening a PR if needed.

---

## Testing

Run tests within each service directory.

Backend:
```bash
pytest
```

Frontend:
```bash
npm test
```

ML Service:
```bash
pytest
```

All new functionality should include appropriate tests where applicable.

---

## Code Standards

- Write clear, maintainable code.
- Avoid hardcoded secrets.
- Validate all external inputs.
- Document new endpoints or services.
- Keep functions modular and testable.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch.
3. Make changes with tests.
4. Push to your fork.
5. Open a Pull Request with a clear description.

Pull requests should explain:
- What was changed
- Why it was changed
- How it was tested

Large architectural changes should be discussed before implementation.

---

## Common Issues

If ports are already in use:
```bash
lsof -i :3000
kill -9 <PID>
```

If Docker containers fail:
```bash
docker compose down
docker compose up --build
```

If dependencies conflict:
```bash
pip freeze > requirements.txt
```

---

## License

Specify the license here (MIT, Apache 2.0, etc.).

---

## Maintainers

Primary Maintainer: Tristan Khieu

For architectural questions or contribution alignment, open an issue before starting major changes.
