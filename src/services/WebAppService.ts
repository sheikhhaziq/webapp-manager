import Gio from "gi://Gio"
import GLib from "gi://GLib"

import type { WebApp } from "@/models/WebApp"

import IconService from "@/services/IconService"

import { APP_DIR, LAUNCHER_PATH, PROFILE_DIR } from "@/config/paths"

import { DEFAULT_ICON } from "@/config/app"

import {
  DESKTOP_GROUP,
  KEY_ID,
  KEY_MANAGED,
  KEY_PROFILE,
  KEY_URL,
} from "@/config/desktop"

class WebAppService {
  list(): WebApp[] {
    const apps: WebApp[] = []

    try {
      const dir = Gio.File.new_for_path(APP_DIR)

      const enumerator = dir.enumerate_children(
        "standard::name",
        Gio.FileQueryInfoFlags.NONE,
        null,
      )

      let info

      while ((info = enumerator.next_file(null))) {
        const filename = info.get_name()

        if (!filename.endsWith(".desktop")) {
          continue
        }

        const desktopPath = `${APP_DIR}/${filename}`

        const keyFile = new GLib.KeyFile()

        try {
          keyFile.load_from_file(desktopPath, GLib.KeyFileFlags.NONE)

          const isManaged = keyFile.get_boolean(DESKTOP_GROUP, KEY_MANAGED)

          if (!isManaged) continue

          apps.push({
            id:
              keyFile.get_string(DESKTOP_GROUP, KEY_ID) ??
              filename.replace(".desktop", ""),

            name: keyFile.get_string(DESKTOP_GROUP, "Name") ?? filename,

            url: keyFile.get_string(DESKTOP_GROUP, KEY_URL) ?? "",

            iconPath: keyFile.get_string(DESKTOP_GROUP, "Icon") ?? "",

            profilePath: keyFile.get_string(DESKTOP_GROUP, KEY_PROFILE) ?? "",

            desktopPath,
          })
        } catch (e) {
          logError(e)
        }
      }
    } catch (e) {
      logError(e)
    }

    return apps
  }

  async create(name: string, url: string): Promise<WebApp> {
    GLib.mkdir_with_parents(APP_DIR, 0o755)

    GLib.mkdir_with_parents(PROFILE_DIR, 0o755)

    const id = GLib.uuid_string_random()

    const desktopPath = `${APP_DIR}/${id}.desktop`

    const profilePath = `${PROFILE_DIR}/${id}`

    GLib.mkdir_with_parents(profilePath, 0o755)

    let icon = DEFAULT_ICON

    try {
      icon = await IconService.downloadFavicon(id, url)
    } catch (e) {
      logError(e)
    }

    const desktopFile = `[Desktop Entry]
Version=1.0
Type=Application
Name=${name}
Exec=${LAUNCHER_PATH} "${url}" "${profilePath}"
Icon=${icon}
Terminal=false
Categories=Network;
StartupNotify=true

${KEY_MANAGED}=true
${KEY_ID}=${id}
${KEY_URL}=${url}
${KEY_PROFILE}=${profilePath}
`

    GLib.file_set_contents(desktopPath, desktopFile)

    GLib.chmod(desktopPath, 0o755)

    return {
      id,
      name,
      url,
      iconPath: icon,
      profilePath,
      desktopPath,
    }
  }

  remove(app: WebApp) {
    try {
      Gio.File.new_for_path(app.desktopPath).delete(null)
    } catch (e) {
      logError(e)
    }

    if (app.profilePath) {
      try {
        GLib.spawn_command_line_sync(`rm -rf "${app.profilePath}"`)
      } catch (e) {
        logError(e)
      }
    }
  }
}

export default new WebAppService()
