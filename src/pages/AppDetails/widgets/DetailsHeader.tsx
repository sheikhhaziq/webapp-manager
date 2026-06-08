import Gtk from "gi://Gtk"
import AppIcon from "@/components/AppIcon"
import LauncherService from "@/services/LauncherService"
import { WebApp } from "@/models/WebApp"
import DialogService from "@/services/DialogService"
import ConfirmDialog from "@/dialogs/ConfirmDialoh"
import { useApps } from "@/contexts/AppsContext"
import { getScope } from "gnim"

export default function (props: { app: WebApp }) {
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
        <Gtk.Box
            orientation={Gtk.Orientation.VERTICAL}
            spacing={10}
            halign={Gtk.Align.CENTER}
            marginTop={24}
            marginBottom={24}
        >
            <AppIcon icon={props.app.iconPath} pixelSize={96} />

            <Gtk.Label class="title-1" label={props.app.name} />

            <Gtk.Label class="dim-label" label={props.app.url} />

            <Gtk.Box spacing={12} halign={Gtk.Align.CENTER}>
                <Gtk.Button
                    iconName="media-playback-start-symbolic"
                    label="Launch"
                    class="suggested-action"
                    onClicked={() => {
                        LauncherService.launch(props.app)
                    }}
                />

                <Gtk.Button
                    iconName="edit-delete-symbolic"
                    label="Uninstall"
                    class="destructive-action"
                    onClicked={deleteApp}
                />
            </Gtk.Box>
        </Gtk.Box>
    )
}