import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import Page from "@/components/Page"
import AppList from "@/components/AppList"
import CreateWebAppDialog from "@/dialogs/CreateWebAppDialog"
import DialogService from "@/services/DialogService"
import { getScope } from "gnim"

export default function HomePage() {
  const scope = getScope()
  return (
    <Page
      title="HomePage"
      header={
        <Adw.HeaderBar $type="top">
          <Adw.WindowTitle $type="title" title="Web Apps" />

          <Gtk.Button
            $type="end"
            iconName="list-add-symbolic"
            onClicked={() => {
              DialogService.present(
                scope,
                () => (<CreateWebAppDialog />) as Adw.Dialog,
              )
            }}
          />
        </Adw.HeaderBar>
      }
    >
      <Adw.Clamp maximumSize={700}>
        <Gtk.Box
          orientation={Gtk.Orientation.VERTICAL}
          marginTop={12}
          marginBottom={12}
          marginStart={12}
          marginEnd={12}
        >
          <AppList />
        </Gtk.Box>
      </Adw.Clamp>
    </Page>
  )
}
