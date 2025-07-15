<p align="center">
  <img src="https://www.cityperks.ai/assets/shared/logo-with-green-text.png" width="250" alt="CityPerks Logo" />
</p>

<h3 align="center">CityPerks Frontend</h3>

<p align="center">
  Modern, type-safe Next.js frontend powering the CityPerks platform — fully dockerized and deployed via AWS Amplify and Cloudflare.
</p>

---

## 📦 Tech Stack

- ⚙️ Next.js 15 (App Router, Turbopack)
- ⚛️ React 19
- 💅 TailwindCSS 4
- 🔐 Cookie-based auth (middleware-protected)
- 📊 ApexCharts + Luxon
- 🧠 Jotai (state management)
- 🧪 React Hook Form + Zod
- 🔄 Axios, QR, Debounce utilities
- 🐳 Dockerized (dev + prod)

---

## 🚀 Local Development

### Prerequisites

- Node.js `>=18`
- Docker + Docker Compose

### Run Without Docker

```bash
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Usage

### Manual Build & Run

#### Development

```bash
docker build -f Dockerfile.dev -t cityperks-fe-dev .
docker run -p 3000:3000 -v ${PWD}:/app cityperks-fe-dev
```

#### Production

```bash
docker build -f Dockerfile.prod -t cityperks-fe-prod .
docker run -p 3000:3000 cityperks-fe-prod
```

---

### Using Docker Compose

#### Development

```bash
docker compose --profile dev up --build
```

#### Production

```bash
docker compose --profile prod up --build
```

---

## 🌐 Environment Variables

Create a `.env` file based on `.env.example`.

---

## ⚙️ NPM Scripts

| Script  | Purpose                    |
| ------- | -------------------------- |
| `dev`   | Run dev server (Turbopack) |
| `build` | Build for production       |
| `start` | Start production server    |
| `lint`  | Lint code with ESLint      |

---

## 🚀 Deployment

- Hosted on AWS Amplify (CI/CD)
- Cloudflare for DNS, SSL, DDoS protection
- Docker-ready for ECS or VPS if needed

Local production test:

```bash
docker build -f Dockerfile.prod -t cityperks .
docker run -d -p 3000:3000 cityperks
```

---

## 📄 License

UNLICENSED — Private project

---

## 💡 Notes

- Uses Next.js App Router (no `pages/`)
- Built with Turbopack for dev performance
- Fully dockerized with hot-reload and static production build
- Cookie-based auth secured via Next.js middleware
