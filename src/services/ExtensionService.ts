import Gio from "gi://Gio"
import GLib from "gi://GLib"

import type { BrowserExtension } from "@/models/BrowserExtension"

enum DisableReason {
  USER_ACTION = 1,
}

class ExtensionService {
  list(profilePath: string): BrowserExtension[] {
    const prefsPath = GLib.build_filenamev([
      profilePath,
      "Default",
      "Preferences",
    ])

    const file = Gio.File.new_for_path(prefsPath)

    if (!file.query_exists(null)) {
      return []
    }

    try {
      const [success, contents] = file.load_contents(null)

      if (!success || !contents) {
        return []
      }

      const prefs = JSON.parse(new TextDecoder().decode(contents))

      const extensionsData = prefs.extensions?.settings ?? {}

      const extensions: BrowserExtension[] = []

      for (const [id, data] of Object.entries<any>(extensionsData)) {
        const manifest = data.manifest

        if (!manifest?.name) {
          continue
        }

        extensions.push({
          id,
          name: manifest.name,
          version: manifest.version ?? "",
          description: manifest.description ?? "",
          isActive:
            !Array.isArray(data.disable_reasons) ||
            data.disable_reasons.length === 0,
          isBuiltin: data.location === 5,
          iconPath: this.getIconPath(profilePath, data),
        })
      }

      extensions.sort((a, b) => {
        if (a.isBuiltin !== b.isBuiltin) {
          return a.isBuiltin ? 1 : -1
        }

        return a.name.localeCompare(b.name)
      })

      return extensions
    } catch (e) {
      logError(e)

      return []
    }
  }

  setEnabled(profilePath: string, extensionId: string, enabled: boolean) {
    const prefs = this.loadPreferences(profilePath)

    const extension = prefs?.extensions?.settings?.[extensionId]

    if (!extension) {
      return
    }

    extension.disable_reasons = enabled ? [] : [DisableReason.USER_ACTION]

    this.savePreferences(profilePath, prefs)
  }

  uninstall(profilePath: string, extensionId: string) {
    const prefs = this.loadPreferences(profilePath)

    if (prefs?.extensions?.settings) {
      delete prefs.extensions.settings[extensionId]

      this.savePreferences(profilePath, prefs)
    }

    const extensionDir = Gio.File.new_for_path(
      GLib.build_filenamev([profilePath, "Default", "Extensions", extensionId]),
    )

    if (extensionDir.query_exists(null)) {
      this.deleteRecursive(extensionDir)
    }
  }

  private getIconPath(profilePath: string, data: any): string | undefined {
    const icons = data.manifest?.icons

    if (!icons) {
      return undefined
    }

    const iconFile =
      icons["128"] ?? icons["64"] ?? icons["48"] ?? icons["32"] ?? icons["16"]

    if (!iconFile) {
      return undefined
    }

    let iconPath: string

    if (typeof data.path === "string" && data.path.startsWith("/")) {
      iconPath = GLib.build_filenamev([data.path, iconFile])
    } else {
      iconPath = GLib.build_filenamev([
        profilePath,
        "Default",
        "Extensions",
        data.path,
        iconFile,
      ])
    }

    const file = Gio.File.new_for_path(iconPath)

    return file.query_exists(null) ? iconPath : undefined
  }

  private loadPreferences(profilePath: string): any | null {
    try {
      const file = Gio.File.new_for_path(
        GLib.build_filenamev([profilePath, "Default", "Preferences"]),
      )

      const [success, contents] = file.load_contents(null)

      if (!success || !contents) {
        return null
      }

      return JSON.parse(new TextDecoder().decode(contents))
    } catch (e) {
      logError(e)

      return null
    }
  }

  private savePreferences(profilePath: string, prefs: any) {
    try {
      const file = Gio.File.new_for_path(
        GLib.build_filenamev([profilePath, "Default", "Preferences"]),
      )

      file.replace_contents(
        JSON.stringify(prefs, null, 2),
        null,
        false,
        Gio.FileCreateFlags.REPLACE_DESTINATION,
        null,
      )
    } catch (e) {
      logError(e)
    }
  }

  private deleteRecursive(file: Gio.File) {
    const type = file.query_file_type(Gio.FileQueryInfoFlags.NONE, null)

    if (type === Gio.FileType.DIRECTORY) {
      const enumerator = file.enumerate_children(
        "standard::*",
        Gio.FileQueryInfoFlags.NONE,
        null,
      )

      let info

      while ((info = enumerator.next_file(null))) {
        this.deleteRecursive(file.get_child(info.get_name()))
      }
    }

    file.delete(null)
  }
  openStore(profilePath: string) {
    Gio.Subprocess.new(
      [
        "brave-origin",
        `--user-data-dir=${profilePath}`,
        "https://chromewebstore.google.com/?utm_source=ext_app_menu",
      ],
      Gio.SubprocessFlags.NONE
    )
  }
}

export default new ExtensionService()
