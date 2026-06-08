import Adw from "gi://Adw"
import { gettext as t } from "gettext"
import NavigationService from "@/services/NavigationService"
import DialogService from "@/services/DialogService"
import HomePage from "@/pages/Home/HomePage"
import { AppsContext, createAppsState } from "@/contexts/AppsContext"
import ToastService from "@/services/ToastService"

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
          <Adw.ToastOverlay
            $={(overlay) => {
              ToastService.attach(overlay)
            }}
          >
            <Adw.NavigationView $={(view) => NavigationService.attach(view)}>
              <HomePage />
            </Adw.NavigationView>
          </Adw.ToastOverlay>
        )}
      </AppsContext>
    </Adw.ApplicationWindow>
  )
}
