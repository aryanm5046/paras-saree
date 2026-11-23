# Paras Saree

A React and Express starter for the Paras Saree storefront.

## Run locally

Use Node.js 22.12 or later. From the repository root, install the dependencies:

```sh
npm ci --prefix client
npm ci --prefix server
```

Run these commands in separate terminals:

```sh
npm run dev --prefix client
npm run dev --prefix server
```

Vite prints the client URL. The server defaults to port 3000 and accepts a `PORT` environment variable.

```sh
curl http://localhost:3000/api/health
```

The health endpoint returns HTTP 200 with `{"status":"ok"}`.
