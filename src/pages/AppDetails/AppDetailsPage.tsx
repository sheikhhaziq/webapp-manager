import Adw from "gi://Adw"
import Gtk from "gi://Gtk"

import Page from "@/components/Page"
import AppIcon from "@/components/AppIcon"

import type { WebApp } from "@/models/WebApp"
import DialogService from "@/services/DialogService"
import { getScope } from "gnim"
import ConfirmDialog from "@/dialogs/ConfirmDialoh"
import { useApps } from "@/contexts/AppsContext"
import Gio from "gi://Gio"
import LauncherService from "@/services/LauncherService"
import ClipboardService from "@/services/ClipboardService"
import FileService from "@/services/FileService"
import ToastService from "@/services/ToastService"
import {
  createExtensionsState,
  ExtensionsContext,
} from "@/contexts/ExtensionsContext"
import { ExtensionList } from "./widgets/ExtensionList"
import ExtensionService from "@/services/ExtensionService"
import DetailsHeader from "./widgets/DetailsHeader"
import AppInfo from "./widgets/AppInfo"
interface AppDetailsPageProps {
  app: WebApp
}

export default function AppDetailsPage(props: AppDetailsPageProps) {
  const extensionsState = createExtensionsState(
    props.app.profilePath,
  )
  return (
    <Page title={props.app.name}>
      <Gtk.ScrolledWindow>
        <Adw.Clamp maximumSize={700}>
          <Gtk.Box
            orientation={Gtk.Orientation.VERTICAL}
            spacing={24}
            marginTop={24}
            marginBottom={24}
            marginStart={24}
            marginEnd={24}
          >
            <DetailsHeader app={props.app} />
            <AppInfo app={props.app} />
            <Adw.PreferencesGroup
              title="Extensions"
            >
              <Adw.ActionRow
                title="Get More Extensions"
                subtitle="Browse and install extensions from the Chrome Web Store"
                activatable
                onActivated={() => {
                  ExtensionService.openStore(props.app.profilePath)
                }}
              ><Gtk.Image
                  $type="prefix"
                  iconName="applications-internet-symbolic"
                  pixelSize={32}
                  valign={Gtk.Align.CENTER}
                />
                <Gtk.Button
                  $type="suffix"
                  iconName="view-refresh-symbolic"
                  class="flat"
                  valign={Gtk.Align.CENTER}
                  onClicked={() =>
                    extensionsState.reload()
                  }
                />
              </Adw.ActionRow>
            </Adw.PreferencesGroup>
            <ExtensionsContext
              value={extensionsState}
            >
              {() => <ExtensionList />}
            </ExtensionsContext>
          </Gtk.Box>
        </Adw.Clamp>
      </Gtk.ScrolledWindow>
    </Page>
  )
}
