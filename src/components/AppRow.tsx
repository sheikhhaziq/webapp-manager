import Adw from "gi://Adw"
import Gtk from "gi://Gtk"

import type { WebApp } from "@/models/WebApp"
import AppIcon from "./AppIcon"
import { useApps } from "@/contexts/AppsContext"
import { getScope } from "gnim"
import DialogService from "@/services/DialogService"
import ConfirmDialog from "@/dialogs/ConfirmDialoh"
import NavigationService from "@/services/NavigationService"
import AppDetailsPage from "@/pages/AppDetails/AppDetailsPage"
import LauncherService from "@/services/LauncherService"

interface AppRowProps {
  app: WebApp

  onActivated?: (app: WebApp) => void
}

export default function AppRow(props: AppRowProps) {
  const { removeApp } = useApps()
  const scope = getScope()

  function deleteApp() {
    DialogService.present(scope, () =>
      ConfirmDialog({
        heading: "Delete Web App?",
        body: `Delete "${props.app.name}" and its browser profile? This action cannot be undone.`,
        confirmLabel: "Delete",
        destructive: true,
        onConfirm: () => {
          removeApp(props.app)
        },
      }),
    )
  }

  return (
    <Adw.ActionRow
      title={props.app.name}
      subtitle={props.app.url}
      activatable
      onActivated={() =>
        NavigationService.push(scope, () => <AppDetailsPage app={props.app} />)
      }
    >
      <AppIcon icon={props.app.iconPath} />
      <Gtk.Button
        $type="suffix"
        tooltipText="launch"
        label="Launch"
        valign={Gtk.Align.CENTER}
        class="suggested-action"
        onClicked={() => {
          LauncherService.launch(props.app)
        }}
      />
      <Gtk.Button
        $type="suffix"
        iconName="user-trash-symbolic"
        tooltipText="Remove"
        valign={Gtk.Align.CENTER}
        class="flat destructive-action"
        onClicked={deleteApp}
      />
    </Adw.ActionRow>
  )
}
