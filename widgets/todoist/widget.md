# Todoist Dashboard

A single consolidated `custom-api` widget for [Dynacat](https://github.com/Panonim/dynacat) that displays your Todoist productivity data at a glance:

- Karma score with trend indicator (↑ / ↓)
- Tasks completed today vs. your daily goal
- All-time completed task count
- Open task count with P1/P2/P3/P4 priority breakdown
- Active projects as clickable badges, each linking directly into Todoist
- Top 5 labels by frequency across open tasks, each linking directly into Todoist
- Quick link to open Todoist

No extra server required — Dynacat fetches the Todoist API directly at render time.

> Please note that Claude AI was utilized to assist in development and testing.

---

## Requirements

- A [Todoist](https://todoist.com) account
- A Todoist personal API token (free accounts supported)

---

## Environment Variables

Add the following to your Dynacat `.env` file:

| Variable | Description |
|----------|-------------|
| `TODOIST_API_TOKEN` | Your Todoist personal API token |

**How to get your API token:**
1. Log in to Todoist
2. Go to **Settings → Integrations → Developer**
3. Copy the value under **API token**

---

## Configuration

Paste the contents of `widgets/todoist-dashboard.yml` into a column's `widgets:` list in your Dynacat `config.yml`:

---

## Caching

The widget defaults to `cache: 15m`. Adjust to suit your needs. Use `cache: 1s` while developing to see live changes without restarting Dynacat.

---

## Troubleshooting

**Widget shows no content / blank**
- Confirm `TODOIST_API_TOKEN` is set in your Dynacat `.env`
- Check logs: `docker compose logs -f`
- Test the token directly:
  ```bash
  curl -s -H "Authorization: Bearer YOUR_TOKEN" \
    https://api.todoist.com/api/v1/user | python3 -m json.tool
  ```

**Labels section not showing**
- The section is hidden automatically when no open tasks have labels assigned.

**Per-project task counts not showing**
- The `/tasks` endpoint does not return a `project_id` field that can be reliably matched against project IDs in Go templates. Projects are shown as name badges only.

---

## API Reference

Uses [Todoist API v1](https://developer.todoist.com/api/v1/).

- **Auth:** `Authorization: Bearer {token}` header
- **User/Stats:** `GET https://api.todoist.com/api/v1/user`
- **Open Tasks:** `GET https://api.todoist.com/api/v1/tasks`
- **Projects:** `GET https://api.todoist.com/api/v1/projects`
- **Rate limit:** 1000 requests / 15 minutes per user

---

## Credits

Created by [@jshields-ca](https://github.com/jshields-ca) — [scootr.ca](https://scootr.ca)

Built for [Dynacat](https://github.com/Panonim/dynacat), a self-hosted dashboard application.
