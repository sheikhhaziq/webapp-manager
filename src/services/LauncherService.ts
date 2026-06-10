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
  openStore(profilePath: string) {
    const browser = this.findBrowser()

    if (!browser) {
      throw new Error(
        "No Chromium-based browser found",
      )
    }

    const argv = this.isFlatpak()
      ? [
        "flatpak-spawn",
        "--host",
        browser,
        `--user-data-dir=${profilePath}`,
        "https://chromewebstore.google.com/?utm_source=ext_app_menu",
      ]
      : [
        browser,
        `--user-data-dir=${profilePath}`,
        "https://chromewebstore.google.com/?utm_source=ext_app_menu",
      ]

    Gio.Subprocess.new(
      argv,
      Gio.SubprocessFlags.NONE,
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

    const argv = this.isFlatpak()
      ? [
        "flatpak-spawn",
        "--host",
        browser,
        `--user-data-dir=${profilePath}`,
        `--app=${url}`,
      ]
      : [
        browser,
        `--user-data-dir=${profilePath}`,
        `--app=${url}`,
      ]

    Gio.Subprocess.new(
      argv,
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

    if (!this.isFlatpak()) {
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

    for (const browser of browsers) {
      const proc = Gio.Subprocess.new(
        [
          "flatpak-spawn",
          "--host",
          "sh",
          "-c",
          `command -v ${browser}`,
        ],
        Gio.SubprocessFlags.STDOUT_PIPE,
      )

      proc.wait(null)

      const stdout =
        proc
          .get_stdout_pipe()
          ?.read_bytes(
            4096,
            null,
          )
          .toArray()

      const path = stdout
        ? new TextDecoder()
          .decode(stdout)
          .trim()
        : ""

      if (path) {
        return browser
      }
    }

    return null
  }

  private isFlatpak() {
    return GLib.file_test(
      "/.flatpak-info",
      GLib.FileTest.EXISTS,
    )
  }
}

export default new LauncherService()