# k6 + Grafana + InfluxDB Starter Kit

A ready-to-use template for quick-start load testing. This repository provides a pre-configured stack featuring **k6** for load generation, **InfluxDB** for metric storage, and **Grafana** with an auto-provisioned real-time dashboard.

*This project is a practical companion to the article on Habr: [Link to your article here]*

## Features
- **Fully Dockerized:** The entire monitoring infrastructure spins up with a single command.
- **Isolated Ports:** Grafana runs on port `3002` and InfluxDB on `8087` to avoid conflicts with your existing local environments.
- **Auto-provisioning:** Grafana dashboards and data sources are configured automatically. No manual UI clicking is required.
- **Sitemap Spider Script:** Includes a smart k6 script example that parses a `sitemap.xml`, distributes the URLs among Virtual Users, and logs broken links (non-200 HTTP statuses) directly to your terminal.

## 💻 Prerequisites
Ensure you have the following installed on your machine:
- [Docker & Docker Compose](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for running npm scripts)
- [k6](https://k6.io/docs/get-started/installation/)

## Quick Start

**1. Clone the repository:**
```bash
git clone https://github.com/VasilKham/k6-load-test-starter-kit.git
cd k6-load-test-starter-kit
```

**2. Start the monitoring infrastructure:**
```bash
docker-compose up -d
```

**3. View the dashboard:**
Open your browser and navigate to `http://localhost:3002`. Grafana will open without requiring a password, and the dashboard will be ready.

**4. Run the load test:**
```bash
npm run test:spider
```
*The script will automatically fetch the sitemap, ramp up to 30 virtual users, and start streaming metrics to your Grafana dashboard.*

## 📂 Project Structure
* `docker-compose.yml` — Configuration for InfluxDB and Grafana services.
* `grafana/` — Auto-provisioning settings and the pre-built JSON dashboard.
* `scripts/sitemap_spider.js` — The main k6 load testing script.

## 📝 License
This project is licensed under the MIT License - see the `LICENSE` file for details.
