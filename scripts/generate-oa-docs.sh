#!/bin/bash

# Generar archivo JSON
redocly bundle docs/api.yaml -o docs/openapi.json

# Generar archivo YAML
redocly bundle docs/api.yaml -o docs/openapi.yaml

# Generar archivo HTML
redocly build-docs ecommercy -o docs/redoc-static.html
