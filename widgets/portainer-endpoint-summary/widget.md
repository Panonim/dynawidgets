# Portainer Endpoint Summary

Displays the connection state and recent Docker snapshot counts for one
Portainer environment.

## Configuration

```yaml
- type: dynawidgets
  widget: portainer-endpoint-summary
  title: Portainer Environment
  cache: 5m
  url: ${PORTAINER_URL}/api/endpoints/${PORTAINER_ENDPOINT_ID}
  headers:
    X-API-Key: ${PORTAINER_API_KEY}
```

The URL must be present in the widget configuration. If Portainer uses a
self-signed certificate, add:

```yaml
  allow-insecure: true
```

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `PORTAINER_URL` | Yes | Base URL of the Portainer server, without a trailing slash. |
| `PORTAINER_ENDPOINT_ID` | Yes | Numeric identifier of the Portainer environment to display. |
| `PORTAINER_API_KEY` | Yes | Portainer access token with permission to read the environment. |

Keep the API key in Dynacat's environment or secrets configuration rather than
placing it directly in the dashboard YAML.
