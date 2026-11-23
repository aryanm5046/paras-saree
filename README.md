# Paras Sarees

A first storefront for Paras Sarees in Jogiwara, Chandni Chowk. The React client uses plain CSS. Express serves a small catalog sourced from the shop’s public listings.

## Run locally

Use Node.js 22.12 or later. From the repository root, install dependencies.

```sh
npm ci --prefix client
npm ci --prefix server
```

Run these commands in separate terminals.

```sh
npm run dev --prefix server
npm run dev --prefix client
```

Open the URL printed by Vite. Vite proxies `/api` to `http://127.0.0.1:3000`. If you change the Express `PORT`, set `API_TARGET` on the client to the matching origin.

To serve the client and API together through Express, run the following commands and open `http://localhost:3000`.

```sh
npm run build --prefix client
npm start --prefix server
```

## Catalog API

- `GET /api/health` returns `{"status":"ok"}`.
- `GET /api/products` returns category filters and catalog entries. Add `category=sarees` or `category=lehengas` and optionally a `q` search term.
- `GET /api/products/:id` returns a catalog entry and its source link.

The catalog data lives in `server/src/data/products.js`. Product enquiries open WhatsApp with the selected piece and its source link. Pricing and availability are confirmed by the shop.

## Imagery

The product photos come from [Paras Sarees on Instagram](https://www.instagram.com/paras_4329/) and its [TradeIndia catalog](https://www.tradeindia.com/paras-sarees-37885016/product-services.html). Each entry links to its original reel or listing. The site also links to the shop’s [WhatsApp channel](https://whatsapp.com/channel/0029Vb7pEvZGpLHY2y2PK43h).

The illustrative hero was made with the built-in ImageGen tool and exported to WebP at 1200 and 640 pixels wide. The following prompt was used.

> Create a photorealistic campaign photo for the image panel of a small Delhi saree wholesaler’s website. Landscape 4:3, edge-to-edge image with no text, watermark, or logo. A gracefully posed adult Indian woman wearing a deep vermilion silk saree with a broad antique-gold woven zari border, traditional blouse and understated earrings, seated in a warm sandstone haveli alcove. Medium-wide portrait with the entire drape and folds visible; place her near the center-right but keep face and most of the garment safely within the central 75% for responsive cropping. Warm natural window light from the left, terracotta and sandstone setting, unretouched skin texture, detailed fabric, calm expression, refined but approachable small-boutique editorial. Keep background uncluttered. This is aspirational campaign imagery, not a product listing.
