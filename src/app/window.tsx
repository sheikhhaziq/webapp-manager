import Adw from "gi://Adw"
import { gettext as t } from "gettext"
import NavigationService from "@/services/NavigationServicve"
import DialogService from "@/services/DialogService"
import HomePage from "@/pages/Home/HomePage"
import { AppsContext, createAppsState } from "@/contexts/AppsContext"

export default function AppWindow(props: {
  app: Adw.Application
  ref: (self: Adw.ApplicationWindow) => void
}) {
  const { app, ref } = props
  const appsState = createAppsState()

  return (
    <Adw.ApplicationWindow
      $={(window) => {
        ref(window)

        DialogService.attach(window)
      }}
      application={app}
      title={t("My Awesome App")}
    >
      <AppsContext value={appsState}>
        {() => (
          <Adw.NavigationView $={(view) => NavigationService.attach(view)}>
            <HomePage />
          </Adw.NavigationView>
        )}
      </AppsContext>
    </Adw.ApplicationWindow>
  )
}
