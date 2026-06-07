import Adw from "gi://Adw"
import Gio from "gi://Gio"
import GLib from "gi://GLib"
import { register } from "gnim/gobject"
import { createRoot } from "gnim"
import { SettingsProvider } from "./settings"
import { gettext as t } from "gettext"
import AppWindow from "./AppWindow"

@register()
export class App extends Adw.Application {
  declare private window?: Adw.Window

  constructor() {
    super({
      version: import.meta.version,
      applicationId: import.meta.domain,
      flags: Gio.ApplicationFlags.FLAGS_NONE,
    })

    GLib.set_prgname(import.meta.name)
    GLib.set_application_name(t("Gnim Demo"))
  }

  vfunc_startup(): void {
    super.vfunc_startup()

    createRoot((dispose) => {
      this.connect("shutdown", dispose)

      SettingsProvider(() => {
        AppWindow({
          app: this,
          ref: (self) => (this.window = self),
        })
      })
    })
  }
  vfunc_activate(): void {
    this.window?.present()
  }
}
