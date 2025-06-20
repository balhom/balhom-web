#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Directory where the web files are located
WEB_FILES_DIR="/usr/share/nginx/html"

# List of environment variables to replace in the web files
ENV_VARS="BALHOM_API_BASE_URL \
KEYCLOAK_URL \
KEYCLOAK_REALM \
KEYCLOAK_CLIENT_ID"

# Find all JavaScript files in the web files directory
find "$WEB_FILES_DIR" -name "*.js" | while read -r WEB_FILE; do
    # Loop through each environment variable
    for key in $ENV_VARS; do
        # Get the value of the environment variable
        value=$(eval echo \$$key)

        # Replace the placeholder in the web file with the actual value
        sed -i "s|__ENV_VITE_${key}|${value}|g" "$WEB_FILE"
    done
done

# Execute the Docker entrypoint script with nginx
exec /docker-entrypoint.sh nginx -g "daemon off;" "$@"
