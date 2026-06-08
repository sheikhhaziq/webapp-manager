import GLib from "gi://GLib"

export const APP_DIR = `${GLib.get_home_dir()}/.local/share/applications`

export const WEBAPPS_DIR = `${GLib.get_home_dir()}/.local/share/webapps`

export const PROFILE_DIR = `${WEBAPPS_DIR}/profiles`

export const LAUNCHER_PATH = `${WEBAPPS_DIR}/launch-app`

export const ICON_DIR = `${APP_DIR}/icons`
