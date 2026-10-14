# m4gym.com

The M4GYM marketing site and legal pages, built with Next.js (App Router) and Tailwind.

| Path | Page |
| --- | --- |
| `/` | Home: product, personal coaching, live pricing, FAQ |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/delete-account` | How to delete an account (linked from the stores and the apps) |
| `/support` | Help and contact |

The design uses the same "Studio" tokens as the web console and the app (`app/globals.css`). Screenshots in `public/shots` are real captures of the product with sample data.

## Configuration

Optional public environment variables:

- `NEXT_PUBLIC_APP_URL`: the web console (default `https://app.m4gym.com`)
- `NEXT_PUBLIC_API_URL`: the API, for live prices (default `https://server.m4gym.com/api/v1`)
- `NEXT_PUBLIC_APP_STORE_URL`, `NEXT_PUBLIC_PLAY_STORE_URL`: store links; the buttons read "Coming soon" until these are set

Prices come from `GET /public/plans` and refresh hourly.

## Commands

```bash
npm run dev
npm run build
npm run lint
```
