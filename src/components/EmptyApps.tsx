import CreateWebAppDialog from "@/dialogs/CreateWebAppDialog"
import DialogService from "@/services/DialogService"
import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import { getScope } from "gnim"

export default function EmptyApps() {
  const scope = getScope()
  return (
    <Adw.StatusPage
      iconName="web-browser-symbolic"
      title="No Apps"
      description="Create your first app"
    >
      <Gtk.Button
        $type="child"
        class="suggested-action pill"
        halign={Gtk.Align.CENTER}
        onClicked={() => {
          DialogService.present(
            scope,
            () => (<CreateWebAppDialog />) as Adw.Dialog,
          )
        }}
      >
        <Gtk.Box spacing={6}>
          <Gtk.Image iconName="list-add-symbolic" />

          <Gtk.Label label="Create" />
        </Gtk.Box>
      </Gtk.Button>
    </Adw.StatusPage>
  )
}
