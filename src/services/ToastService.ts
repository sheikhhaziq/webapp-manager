import Adw from "gi://Adw"

class ToastService {
  private overlay: Adw.ToastOverlay | null = null

  attach(overlay: Adw.ToastOverlay) {
    this.overlay = overlay
  }

  show(title: string, timeout?: number | undefined) {
    if (!this.overlay) return

    this.overlay.add_toast(
      new Adw.Toast({
        title,
        timeout: timeout,
      }),
    )
  }
}

export default new ToastService()
