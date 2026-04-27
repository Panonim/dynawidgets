# Caddy Routes

This widget displays [Caddy](https://caddyserver.com) external and local links to your services proxied through Caddy.

The widget is modeled after the [cloudflare tunnels widget](https://github.com/glanceapp/community-widgets/blob/main/widgets/cloudflared-tunnels/README.md). Should work well in both full and small columns layouts.

<details>
  <summary>Full column preview</summary>
  <img src="images/preview-full.png" width="600px" />
</details>

<details>
  <summary>Small column preview</summary>
  <img src="images/preview-small.png" width="300px" />
</details>

```yaml
- type: custom-api
  css-class: "widget-type-caddy"
  cache: 4h
  options:
    domain_name: ".example.com"
    icon_url: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/caddy.svg"
    local_ip: "localhost"
    docker: false
  title: Caddy Routes
  url: http://${CADDY_ADMIN_URL}/config/apps/http/servers/${CADDY_SERVER_NAME}/routes
  template: |
     <style>
      .widget-type-caddy li {
        margin-top: var(--list-half-gap); 
        border-top: 1px solid var(--color-separator);
        padding-top: var(--list-half-gap);
      }
      </style>
      <ul class="dynamic-columns list-gap-15 list-with-separator">
      {{ range .JSON.Array "" }}
        {{ $dial := .String "handle.0.routes.0.handle.0.upstreams.0.dial"}}
        {{ $host := .String "match.0.host.0" }}
        {{ $dial_address := "" }}
        {{ if $.Options.BoolOr "docker" false }}
          {{ $dial_address = $dial }}
        {{ else }}
          {{ $dial_address = $dial | findMatch (":.*") | concat ($.Options.StringOr "local_ip" "localhost") }}
        {{ end }}
        
        <li class="flex items-center gap-20">
            <div class="shrink-0">
                <img class="docker-container-icon" src="{{ $.Options.StringOr "icon_url" "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/caddy.svg" }}" alt="" loading="lazy">
            </div>
            <div class="min-width-0 grow">
              <a href='https://{{ $host }}' class="color-highlight size-title-dynamic block text-truncate" target="_blank" rel="noreferrer">{{ $host | trimSuffix ($.Options.StringOr "domain_name" ".example.com") }}</a>
              <div class="flex items-center gap-10" style="margin-bottom: 5px">
                <div class="text-left">
                  <img src="assets/img/link-down-right.png" style="width: auto; height: 20px; margin-left: 0px; margin-top: -4px;">
                </div>
                <div class="size-h6 flex-1 text-left">
                  {{ if $.Options.BoolOr "docker" false }}
                    {{ $dial_address }}
                  {{ else }}
                  <a href='http://{{ $dial_address }}' target="_blank" rel="noreferrer">{{ $dial_address }}</a>
                  {{ end }}
                </div>
              </div>
            </div>
        </li>
      {{ end }}
      </ul>
```

## Environment Variables

`CADDY_ADMIN_URL` - In the format of `address:port`. Usually this is `localhost:2019`, but see the [caddy docs](https://caddyserver.com/docs/api) for more info.
`CADDY_SERVER_NAME` - this is the name of your caddy server. If you manually created a JSON file for Caddy you probably know it, if you are using Caddy with docker, this is usually `srv0` (see also below).

If you have multiple servers block in your config file (either Caddyfile or JSON file), you should be able to add multiple servers by reusing the widget and specifying a different url, e.g.:

`url: http://${CADDY_ADMIN_URL}/config/apps/http/servers/srv0/routes`
`url: http://${CADDY_ADMIN_URL}/config/apps/http/servers/example/routes`

You can find your server(s) name by running the following command (with `jq`):

```bash
curl http://YOURIP:2019/config/apps/http/servers/ | jq 'keys'
```

## Options

| Option | Default | Description |
| :--- | :--- | :--- |
| `domain_name` | `.example.com` | Base domain suffix (with leading `.`) trimmed from displayed service names |
| `icon_url` | `https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/caddy.svg` | URL of the icon shown next to each service. Can be selfhosted e.g. `assets/img/caddy.svg` |
| `local_ip` | `localhost` | IP or hostname used to build clickable local service links, formatted as `IP:Port` |
| `docker`   | `false` | If `true`, shows raw container addresses without links, if `false`, shows clickable internal links |

> **NOTE:** When `docker: false`, the port used in the local link is the one configured in Caddy's reverse proxy, so to resolve the link correctly, the port need to be reachable/open. If you are using Docker with a VPN/Tailscale, you can still get clickable internal links by setting `docker: false` and `local_ip` to your VPN/Tailscale IP or domain.

## Assets

Upload to your dynacat `assets` folder.

1. <a href="images/link-down-right.png"><img src="images/link-down-right.png" width="auto" height="20px" />images/link-down-right.png</a> file

> Arrow icon is sourced from the original [cloudflare tunnels widget](https://github.com/glanceapp/community-widgets/blob/main/widgets/cloudflared-tunnels/link-down-right.png).
