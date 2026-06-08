import Gdk from "gi://Gdk"

class ClipboardService {
  copy(text: string) {
    const display = Gdk.Display.get_default()

    if (!display) return

    const clipboard = display.get_clipboard()

    clipboard.set(text)
  }
}

export default new ClipboardService()
