# GitHub Status with Components

Displays GitHub's overall service health and the public components listed on
GitHub Status.

## Configuration

```yaml
- type: dynawidgets
  widget: github-status-components
  title: GitHub Status
  cache: 5m
```

The widget uses GitHub's public Statuspage summary endpoint and needs no
credentials.
