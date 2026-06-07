import Adw from "gi://Adw"
import GObject from "gi://GObject"

class NavigationService {
  private view: Adw.NavigationView | null = null

  attach(view: Adw.NavigationView) {
    this.view = view
  }

  private get navigationView(): Adw.NavigationView {
    if (!this.view) {
      throw new Error("NavigationView has not been attached")
    }

    return this.view
  }

  get currentPage(): Adw.NavigationPage | null {
    return this.navigationView.visiblePage
  }

  canPop(): boolean {
    const current = this.navigationView.visiblePage

    if (!current) return false

    return this.navigationView.get_previous_page(current) !== null
  }

  push(page: GObject.Object) {
    this.navigationView.push(page as Adw.NavigationPage)
  }

  pop() {
    if (this.canPop()) {
      this.navigationView.pop()
    }
  }

  replace(page: GObject.Object) {
    if (this.canPop()) {
      this.navigationView.pop()
    }

    this.push(page)
  }

  clear() {
    while (this.canPop()) {
      this.navigationView.pop()
    }
  }
}

export default new NavigationService()
