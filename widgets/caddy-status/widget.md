# Caddy Status

This widget displays [Caddy](https://caddyserver.com) reverse proxy status, in particular: upstreams, current requests, and failed requests.

The widget is modeled after the [homepage caddy widget](https://gethomepage.dev/widgets/services/caddy/), and uses a similar structure to the Immich widget. Should work well in both full and small columns layouts.

<details>
  <summary>Full column preview</summary>
  <img src="images/preview-full.png" width="800px" />
</details>

<details>
  <summary>Small column preview</summary>
  <img src="images/preview-small.png" width="300px" />
</details>

```yaml
- type: dynawidgets
  widget: caddy-status
  title: Caddy Status
  update-interval: 1m
```

## Environment Variables

`CADDY_ADMIN_URL` - In the format of `address:port`. Usually this is `localhost:2019`, but see the [caddy docs](https://caddyserver.com/docs/api) for more info.
