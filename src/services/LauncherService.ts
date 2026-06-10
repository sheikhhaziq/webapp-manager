import { WebApp } from "@/models/WebApp"
import Gio from "gi://Gio"
import GLib from "gi://GLib"

class LauncherService {
  launch(app: WebApp) {
    this.launchUrl(
      app.url,
      app.profilePath,
    )
  }

  launchUrl(
    url: string,
    profilePath: string,
  ) {
    const browser =
      this.findBrowser()

    if (!browser) {
      throw new Error(
        "No Chromium-based browser found",
      )
    }

    Gio.Subprocess.new(
      [
        browser,
        `--user-data-dir=${profilePath}`,
        `--app=${url}`,
      ],
      Gio.SubprocessFlags.NONE,
    )
  }

  private findBrowser():
    | string
    | null {
    const browsers = [
      "brave-origin",
      "brave-browser",
      "google-chrome",
      "chromium",
      "chromium-browser",
      "microsoft-edge",
      "vivaldi",
      "opera",
    ]

    for (const browser of browsers) {
      const path =
        GLib.find_program_in_path(
          browser,
        )

      if (path) {
        return path
      }
    }

    return null
  }
}

export default new LauncherService()