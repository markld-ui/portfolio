# Roman Slinkov Portfolio

Portfolio application with a React + Tailwind CSS frontend and an ASP.NET Core API.

## Local development

Start the API:

```bash
dotnet run --project Portfolio.Api --urls http://localhost:5080
```

In a second terminal, start the frontend:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Local production-like run

```bash
docker compose -f docker-compose.local.yml up --build
```

The application will be available at `http://localhost:8080`.

## Hosting

The default `docker-compose.yml` is the production configuration. It starts the
ASP.NET Core application on the internal Docker network and publishes it through
Nginx on ports 80 and 443.

Before deployment, make sure these files exist on the host:

```text
certs/fullchain.pem
certs/privkey.pem
```

Then deploy:

```bash
docker compose up -d --build
```

## Contact form

Copy `.env.example` to `.env` and provide the Telegram bot token and target chat ID.
The values are read only by the ASP.NET Core backend and are never exposed to the browser.
