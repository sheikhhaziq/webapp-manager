export const LAUNCHER_SCRIPT = `#!/usr/bin/env bash

set -euo pipefail

URL="\${1:-}"
PROFILE="\${2:-}"

if [[ -z "$URL" || -z "$PROFILE" ]]; then
    echo "Usage: $0 <url> <profile_dir>"
    exit 1
fi

is_chromium_based() {
    local browser="$1"

    "$browser" --version 2>/dev/null | grep -qiE \
        'chromium|chrome|brave|edge|vivaldi|opera'
}

launch_browser() {
    local browser="$1"

    exec "$browser" \
        --user-data-dir="$PROFILE" \
        --app="$URL"
}

DEFAULT_DESKTOP=$(xdg-settings get default-web-browser 2>/dev/null || true)

BROWSER=""

case "$DEFAULT_DESKTOP" in
    google-chrome.desktop)      BROWSER="google-chrome" ;;
    chromium.desktop)           BROWSER="chromium" ;;
    chromium-browser.desktop)   BROWSER="chromium-browser" ;;
    brave-browser.desktop)      BROWSER="brave-browser" ;;
    brave-origin.desktop)       BROWSER="brave-origin" ;;
    microsoft-edge.desktop)     BROWSER="microsoft-edge" ;;
    vivaldi.desktop)            BROWSER="vivaldi" ;;
    opera.desktop)              BROWSER="opera" ;;
esac

if [[ -n "$BROWSER" ]] && command -v "$BROWSER" >/dev/null 2>&1; then
    if is_chromium_based "$BROWSER"; then
        launch_browser "$BROWSER"
    fi
fi

for browser in \
    brave-origin \
    brave-browser \
    google-chrome \
    chromium \
    chromium-browser \
    microsoft-edge \
    vivaldi \
    opera
do
    if command -v "$browser" >/dev/null 2>&1; then
        if is_chromium_based "$browser"; then
            launch_browser "$browser"
        fi
    fi
done

echo "No Chromium-based browser found."
exit 1
`