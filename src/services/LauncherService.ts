import Gio from "gi://Gio"

import type { WebApp } from "@/models/WebApp"

import { LAUNCHER_PATH } from "@/config/paths"

class LauncherService {
  launch(app: WebApp) {
    try {
      Gio.Subprocess.new(
        [LAUNCHER_PATH, app.url, app.profilePath],
        Gio.SubprocessFlags.NONE,
      )
    } catch (e) {
      logError(e)
    }
  }
}

export default new LauncherService()
