# Exchange Rates Widget

A [Dynacat](https://github.com/Panonim/dynacat) that displays the current Canadian Dollar (CAD) exchange rate against USD and EUR, with a last-synced timestamp. This can be re-configured for any currency available in the Exchangerate-API. Refreshes once every 24 hours.

## What it shows

- **USD** — 1.00 CAD expressed in US Dollars
- **EUR** — 1.00 CAD expressed in Euros
- **Last synced** — timestamp from the ExchangeRate-API response

## Prerequisites

- A running [Dynacat](https://github.com/Panonim/dynacat) instance
- A free [ExchangeRate-API](https://www.exchangerate-api.com) account and API key
  - The free tier includes 1,500 requests/month, well within the 24-hour cache interval

## Setup

### 1. Get your API key

1. Sign up at [exchangerate-api.com](https://www.exchangerate-api.com)
2. Copy the API key shown on your dashboard

### 2. Set the environment variable

Add `HOMEPAGE_VAR_EXCHANGE_KEY` to the environment where Dynacat/Glance runs.

**.env file** (local installs):
```
HOMEPAGE_VAR_EXCHANGE_KEY=your_api_key_here
```

**Docker Compose:**
```yaml
environment:
  - HOMEPAGE_VAR_EXCHANGE_KEY=your_api_key_here
```

**Shell:**
```sh
export HOMEPAGE_VAR_EXCHANGE_KEY=your_api_key_here
```

## Configuration

| Variable | Required | Description |
|---|---|---|
| `HOMEPAGE_VAR_EXCHANGE_KEY` | Yes | Your ExchangeRate-API v6 key |

### Changing the base currency

The widget uses CAD as the base. To use a different base currency, change the URL in the YAML:

```yaml
url: https://v6.exchangerate-api.com/v6/${HOMEPAGE_VAR_EXCHANGE_KEY}/latest/USD
```

Replace `CAD` with any [supported currency code](https://www.exchangerate-api.com/docs/supported-currencies).

### Adding more currencies

To display additional currency rows, add more variables and template blocks following the existing USD/EUR pattern:

```yaml
template: |
  {{ $usd := .JSON.Float "conversion_rates.USD" }}
  {{ $gbp := .JSON.Float "conversion_rates.GBP" }}
```

Then add a corresponding `<div>` block in the template HTML for each new currency.

### Cache interval

The widget defaults to `cache: 24h`. Exchange rates update once daily on the free tier, so this is a natural fit. Shorten it if you are on a paid plan with more frequent updates.

## How it works

The widget uses the built-in `custom-api` widget type — no extra binary or server needed. The YAML is pasted directly into `glance.yml`.

- Fetches from the [ExchangeRate-API v6](https://www.exchangerate-api.com/docs/overview) `/latest/{base}` endpoint
- Rates are displayed to 4 decimal places
- The last-update timestamp is taken directly from the API response and trimmed to 16 characters for compact display
- Adapts to your Dynacat/Glance theme (no hardcoded colors)

## API Reference

- **Endpoint:** `GET https://v6.exchangerate-api.com/v6/{api_key}/latest/{base_currency}`
- **Docs:** [exchangerate-api.com/docs](https://www.exchangerate-api.com/docs/overview)
- **Free tier:** 1,500 requests/month

---

Built with [Claude Code](https://claude.ai/code) · Created by [jshields-ca](https://github.com/jshields-ca) · [scootr.ca](https://scootr.ca)

## License

MIT — see [LICENSE](../../LICENSE)