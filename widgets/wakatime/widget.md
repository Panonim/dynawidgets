# WakaTime

A [Dynacat](https://github.com/Panonim/dynacat) widget that pulls from the [WakaTime API](https://wakatime.com/developers) and displays your coding metrics — total time, daily average, best day, top languages, and top projects — directly on your dashboard.

> Please note that Claude AI was utilized to assist in development and testing.

## Prerequisites

- A running [Dynacat](https://github.com/Panonim/dynacat) or [Glance](https://github.com/glanceapp/glance) instance
- A [WakaTime](https://wakatime.com) account with an editor plugin installed
- Your WakaTime Secret API Key — [wakatime.com/settings/api-key](https://wakatime.com/settings/api-key)

## Configuration
```yaml
- type: dynawidgets
  widget: wakatime
  title: WakaTime
  title-icon: di:wakatime-light
  title-url: https://wakatime.com
  cache: 30m
```
## Configuration

| Variable | Required | Description |
|---|---|---|
| `WAKATIME_API_KEY` | Yes | Your WakaTime Secret API Key |

### Time range

The weekly overview defaults to `last_7_days`. To change it, swap the URL suffix in your config:

| Suffix | Period |
|---|---|
| `stats/last_7_days` | Past 7 days *(default)* |
| `stats/last_30_days` | Past 30 days |
| `stats/last_6_months` | Past 6 months |
| `stats/last_year` | Past year |
| `stats/all_time` | All time |

## Credits

Created by [@jshields-ca](https://github.com/jshields-ca) — [scootr.ca](https://scootr.ca)

Built for [Dynacat](https://github.com/Panonim/dynacat), a self-hosted dashboard application.