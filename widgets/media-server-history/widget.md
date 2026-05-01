# Media Server History

A horizontal poster carousel showing recently played media from your Jellyfin server. Displays movies, TV episodes, and music tracks with poster art, title, metadata, and how long ago each item was played.

## Preview

![Media Server History widget preview](./images/preview.png)

## Requirements

- A running [Jellyfin](https://jellyfin.org/) instance with API access

## Configuration

```yaml
- type: dynawidgets
  widget: media-server-history
  options:
    media-server: 'jellyfin'
    base-url: ${JELLYFIN_URL}
    api-key: ${JELLYFIN_TOKEN}
    user-name: ${JELLYFIN_USER}
    media-types: 'Movie,Episode,Audio' # optional
    history-length: '10' # optional
    thumbnail-aspect-ratio: 'portrait' # optional
    time-format: 'Jan 02 15:04' # optional
```

## Options

| Option                   | Type   | Default               | Description                                                                               |
| ------------------------ | ------ | --------------------- | ----------------------------------------------------------------------------------------- |
| `media-server`           | string | —                     | Media server type. Currently supported: `jellyfin`                                        |
| `base-url`               | string | —                     | Base URL of your media server instance                                                    |
| `api-key`                | string | —                     | API key for your media server                                                             |
| `user-name`              | string | —                     | The display name of the Jellyfin user whose history to show                               |
| `media-types`            | string | `Movie,Episode,Audio` | Comma-separated list of media types to include. Valid values: `Movie`, `Episode`, `Audio` |
| `history-length`         | string | `10`                  | Number of recently played items to display                                                |
| `thumbnail-aspect-ratio` | string | `portrait`            | Poster aspect ratio. Valid values: `portrait` (2/3), `square` (1/1), `landscape` (16/9)   |
| `time-format`            | string | `Jan 02 15:04`        | Go time format string for the played-at timestamp                                         |

## Notes

- Only `jellyfin` is supported at this time. Support for Plex and Emby is not implemented — contributions are welcome.
- The widget resolves the user ID automatically from the `user-name` option by querying the `/Users` endpoint.
- For TV episodes, the poster shown is the series poster rather than the episode thumbnail.
- For music, the primary image of the track is used (typically the album art).
- Played-at time is shown as a relative duration (e.g. "3 hours ago").
- Use environment variables for all URLs and API keys — never hardcode them.
