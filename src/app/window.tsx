import Adw from "gi://Adw"
import { gettext as t } from "gettext"
import NavigationService from "@/services/NavigationServicve"
import HomePage from "@/pages/Home/HomePage"

export default function AppWindow(props: {
  app: Adw.Application
  ref: (self: Adw.ApplicationWindow) => void
}) {
  const { app, ref } = props

  return (
    <Adw.ApplicationWindow
      $={ref}
      application={app}
      title={t("My Awesome App")}
    >
      <Adw.NavigationView $={(view) => NavigationService.attach(view)}>
        <HomePage />
      </Adw.NavigationView>
    </Adw.ApplicationWindow>
  )
}
