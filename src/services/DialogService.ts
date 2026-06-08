import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import { Scope } from "gnim"

class DialogService {
  private widget: Gtk.Widget | null = null

  attach(widget: Gtk.Widget) {
    this.widget = widget
  }

  present(scope: Scope, dialogFactory: () => Adw.Dialog) {
    scope.run(() => {
      const dialog = dialogFactory()
      dialog.present(this.widget)
    })
  }
}

export default new DialogService()
