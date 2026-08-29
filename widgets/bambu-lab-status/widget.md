# Bambu Lab Status

Displays Bambu Lab's overall service health and individual service components.

## Configuration

```yaml
- type: dynawidgets
  widget: bambu-lab-status
  title: Bambu Lab Status
  cache: 5m
```

The widget uses Bambu Lab's public Statuspage summary endpoint and needs no
credentials.
