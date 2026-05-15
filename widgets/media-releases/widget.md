# Media Releases

A horizontal poster carousel showing upcoming movie and TV episode releases by querying the Radarr and Sonarr calendar APIs. Items are sorted chronologically and display the poster art, title, release type (In Cinemas / Digital / Physical for movies, episode code for series), and the release date/time.

Can be a companion widget for [media-server-history](../media-server-history/widget.md)

## Preview

![Media Releases widget preview](./images/preview.png)

## Requirements

- A running [Radarr](https://radarr.video/) instance with API access
- A running [Sonarr](https://sonarr.tv/) instance with API access

## Configuration

```yaml
- type: dynawidgets
  widget: media-releases
  options:
    interval: 30 # Days ahead to show releases (default: 30)
    radarr-url: ${RADARR_URL}
    radarr-key: ${RADARR_KEY}
    sonarr-url: ${SONARR_URL}
    sonarr-key: ${SONARR_KEY}
    exclude-physical: true # Set to true to hide physical-only movie releases
```

## Options

| Option             | Type   | Default | Description                                                        |
| ------------------ | ------ | ------- | ------------------------------------------------------------------ |
| `interval`         | int    | `30`    | Number of days ahead to fetch upcoming releases                    |
| `radarr-url`       | string | —       | Base URL of your Radarr instance                                   |
| `radarr-key`       | string | —       | Radarr API key (found in Settings → General)                       |
| `sonarr-url`       | string | —       | Base URL of your Sonarr instance                                   |
| `sonarr-key`       | string | —       | Sonarr API key (found in Settings → General)                       |
| `exclude-physical` | bool   | `false` | When `true`, movies whose next release is physical-only are hidden |

## Notes

- Movie release type priority is: **In Cinemas → Digital → Physical**. The earliest upcoming release type is shown.
- Episode air times are displayed in UTC as returned by the Sonarr API.
- Poster images are fetched directly from your Radarr/Sonarr instances, so the widget requires network access to both services.
- Use environment variables for all URLs and API keys — never hardcode them.
