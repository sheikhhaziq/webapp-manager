import GLib from "gi://GLib"

import { ICON_DIR } from "@/config/paths"
import fetch from "gnim/fetch"

class IconService {
  private ensureIconDir() {
    GLib.mkdir_with_parents(ICON_DIR, 0o755)
  }

  private createIconName(name: string): string {
    return name.toLowerCase().replaceAll(/\s+/g, "-")
  }

  async downloadFavicon(name: string, url: string): Promise<string> {
    this.ensureIconDir()

    const iconName = this.createIconName(name)

    const iconPath = `${ICON_DIR}/${iconName}.png`

    const faviconUrl = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(
      url,
    )}&sz=256`

    const response = await fetch(faviconUrl)

    if (!response.ok) {
      throw new Error(`Failed to download favicon (${response.status})`)
    }

    const bytes = new Uint8Array(await response.arrayBuffer())

    GLib.file_set_contents(iconPath, bytes)

    return iconPath
  }

  removeIcon(iconPath: string) {
    try {
      GLib.unlink(iconPath)
    } catch (e) {
      logError(e)
    }
  }

  exists(iconPath: string): boolean {
    return GLib.file_test(iconPath, GLib.FileTest.EXISTS)
  }
}

export default new IconService()
