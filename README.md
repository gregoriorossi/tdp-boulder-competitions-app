# TDP Boulder Competitions App

A full-stack web application for organizing and running **boulder competitions**, from competitor registration to results.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture](#2-architecture)
3. [Technical Requirements](#3-technical-requirements)
4. [Configuration](#4-configuration)
5. [Running Locally](#5-running-locally)
6. [Cloud Deployment](#6-cloud-deployment)
7. [Testing](#7-testing)
8. [Contributing](#8-contributing)
9. [License](#9-license)
10. [Author / Contacts](#10-author--contacts)

---

## 1. Introduction

### Purpose and Context

TDP Boulder Competitions App is a platform for managing boulder competitions. It supports the whole event lifecycle: organizers set up competitions and problems; climbers register, log their sends and check their results.

The application has two separate areas:

- **Editors area** (organizers/admins): create and manage competitions, problems and registrations.
- **Competitors area** (climbers): sign up for a competition and track their progress.

### Main Features

- Create, edit and publish competitions, each with its own public URL
- Organize problems
- Register competitors
- Let competitors log sent problems
- Compute and view results and rankings
- Pre-filled waivers for competitors
- Export competitors and results in csv format
- Send email notifications (e.g. registration confirmation via Resend)

### Tech Stack

**Frontend**

- React 19 + TypeScript
- Vite
- MUI (Material UI) + MUI X Date Pickers
- Sass (CSS modules)

**Backend**

- .NET 8 / ASP.NET Core Web API
- Entity Framework Core (PostgreSQL via Npgsql, with an optional In-Memory provider for development)
- JWT Bearer authentication
- Swagger / Swashbuckle

---

## 2. Architecture

### Overview

```
┌──────────────┐      HTTPS/REST       ┌──────────────────┐      EF Core      ┌──────────────┐
│   Frontend   │  ───────────────────▶ │  TDPCompetitions │ ────────────────▶ │  PostgreSQL  │
│ (React SPA)  │ ◀───────────────────  │       .Api       │ ◀──────────────── │   Database   │
└──────────────┘        JSON           └──────────────────┘                   └──────────────┘
   Cloud Run                               Cloud Run
 (nginx container)                   (ASP.NET container)
```

- The **Frontend** is a single-page application.
- The **Backend** is an ASP.NET Core Web API. It exposes REST endpoints under `/api` and uses JWT for authentication.
- Data is stored in **PostgreSQL** through Entity Framework Core. For local development, you can switch to an in-memory database with mock data.

### Repository Structure

```
tdp-boulder-competitions-app/
├── Frontend/                            # React + TypeScript SPA (Vite)
│   ├── src/                             # Pages, components, queries, services, models
│   ├── Dockerfile                       # Multi-stage build (Node → nginx)
│   ├── nginx.conf                       # nginx configuration for serving the SPA
│   └── cloudbuild.yaml                  # Google Cloud Build pipeline → Cloud Run
├── Backend/
│   ├── TDPCompetitions.sln              # .NET solution
│   ├── Dockerfile                       # Multi-stage build (SDK → ASP.NET runtime)
│   ├── TDPCompetitions.Api/             # Web API: controllers, view models, attributes, startup
│   ├── TDPCompetitions.Core/            # Domain layer: entities, interfaces, business contracts
│   └── TDPCompetitions.Infrastracture/  # Data access (EF Core, migrations) and external services
├── LICENSE
└── README.md
```

The backend follows **Clean Architecture**:

| Project | Responsibility |
|---|---|
| `TDPCompetitions.Api` | Presentation layer: HTTP controllers, request/response view models, validation attributes, DI and auth setup |
| `TDPCompetitions.Core` | Domain layer: entities and abstractions, with no external dependencies |
| `TDPCompetitions.Infrastracture` | Implementations: `AppDbContext`, EF Core migrations, managers, email/template/export services |

---

## 3. Technical Requirements

| Tool | Version | Notes |
|---|---|---|
| .NET SDK | 8.0 | All backend projects target `net8.0` |
| Node.js | 22.x | Matches the `node:22-alpine` image in `Frontend/Dockerfile` |
| npm | bundled with Node.js | |
| PostgreSQL | <!-- TODO: specify version --> | Not needed when `UseMockDatabase` is `true` |
| Docker | optional | Used to build and test container images locally |
| Google Cloud SDK (`gcloud`) | optional | Used for manual cloud deployments |

---

## 4. Configuration

### Backend (`Backend/TDPCompetitions.Api/appsettings.json`)

Settings can go in `appsettings.json`, in `appsettings.Development.json`, in [.NET User Secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets) (the API project already has a `UserSecretsId`), or in environment variables (use `__` as the separator, e.g. `Jwt__Key`).

| Key | Description | Example |
|---|---|---|
| `ConnectionStrings:DefaultConnection` | PostgreSQL connection string | `Host=localhost;Port=5432;Database=mydb;Username=postgres;Password=postgres` |
| `UseMockDatabase` | Uses an in-memory database with mock data instead of PostgreSQL | `false` |
| `Jwt:Key` | Secret key used to sign JWT tokens | `<your-secret-key>` |
| `Jwt:Issuer` | JWT issuer/audience | `MyApi` |
| `EmailServiceSettings:ApiToken` | API token for the Resend email service | `<resend-api-token>` |
| `EmailServiceSettings:SenderEmail` | Sender address for outgoing emails | `no-reply@info.testedipietra.it` |

> ⚠️ Don't commit real secrets (DB passwords, JWT keys, API tokens). Use User Secrets locally and environment variables or Secret Manager in the cloud.

### Frontend (`Frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `https://localhost:7124/api` |

`VITE_API_URL` is embedded into the bundle **at build time**. In the Docker build, it is passed as a `--build-arg`.

---

## 5. Running Locally

### Backend

```pwsh
cd Backend

# Restore and build
dotnet restore TDPCompetitions.sln
dotnet build TDPCompetitions.sln

# Apply EF Core migrations (requires dotnet-ef: dotnet tool install --global dotnet-ef)
dotnet ef database update --project TDPCompetitions.Infrastracture --startup-project TDPCompetitions.Api

# Run the API with the https profile
dotnet run --project TDPCompetitions.Api --launch-profile https
```

The API will be available at `https://localhost:7124` (and `http://localhost:5202`). Swagger UI is at `https://localhost:7124/swagger`.

You can also open `Backend/TDPCompetitions.sln` in **Visual Studio**, set `TDPCompetitions.Api` as the startup project and press **F5**.

> To run without PostgreSQL, set `"UseMockDatabase": true` in `appsettings.json` (or `appsettings.Development.json`).

### Frontend

```bash
cd Frontend

npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # type-check and build for production (output in dist/)
npm run lint       # run ESLint
npm run preview    # preview the production build locally
```

Make sure `VITE_API_URL` in `Frontend/.env` points to the running backend.

---

## 6. Cloud Deployment

### Frontend: Cloud Build → Cloud Run

The pipeline is defined in [`Frontend/cloudbuild.yaml`](Frontend/cloudbuild.yaml) and has three steps:

1. **Build** the Docker image from `Frontend/Dockerfile`, passing `VITE_API_URL` as a build argument.
2. **Push** the image to Artifact Registry: `europe-west8-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/frontend:latest`.
3. **Deploy** the image to Cloud Run as the `tdp-boulder-competitions-frontend` service in region `europe-west8`, with unauthenticated access allowed.

To run it manually from the repository root:

```bash
gcloud builds submit --config Frontend/cloudbuild.yaml --substitutions=REPO_NAME=<artifact-registry-repo> .
```

<!-- TODO: document the Cloud Build trigger (branch, repository connection) if one is configured -->

### Backend

The backend has a production-ready [`Backend/Dockerfile`](Backend/Dockerfile) that listens on port `8080`, as Cloud Run expects. The repository **doesn't include a Cloud Build pipeline for the backend yet**.

Example of a manual deployment:

```bash
cd Backend
gcloud run deploy <backend-service-name> --source . --region <region>
```

<!-- TODO: specify the backend service name, region and how secrets/env vars are provided -->

---

## 7. Testing

The repository **doesn't have automated tests yet** for the frontend or the backend.

Available quality checks:

```bash
cd Frontend
npm run lint
```

```pwsh
cd Backend
dotnet build TDPCompetitions.sln
```

---

## 9. License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.

---

## 10. Author / Contacts

- **Author:** [gregoriorossi](https://github.com/gregoriorossi)
- **Repository:** [github.com/gregoriorossi/tdp-boulder-competitions-app](https://github.com/gregoriorossi/tdp-boulder-competitions-app)
