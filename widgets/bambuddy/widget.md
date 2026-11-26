# 3D Printers

## Configuration
```yaml
- type: dynawidgets
  widget: bambuddy
  title: 3D Printers
  title-url: ${BAMBUDDY_URL}
  cache: 30s
  options:
    show-temperatures: true   # nozzle / bed / chamber temperatures
    show-ams: true            # filament color dots for AMS slots and the external spool
    show-camera: true         # camera icon linking to the printer's camera feed in Bambuddy
    hide-offline: false       # hide printers that are not connected
```

## Environment variables

| Variable | Description |
| --- | --- |
| `BAMBUDDY_URL` | Base URL of the server, without a trailing slash. Must be prefixed with either `https://` or `http://`. |
| `BAMBUDDY_API_KEY` | Describe what this value is. |
