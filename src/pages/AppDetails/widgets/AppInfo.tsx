import { WebApp } from "@/models/WebApp"
import ClipboardService from "@/services/ClipboardService"
import FileService from "@/services/FileService"
import ToastService from "@/services/ToastService"
import Adw from "gi://Adw"
import Gtk from "gi://Gtk"

export default function (props: { app: WebApp }) {
    return (
        <Adw.PreferencesGroup title="Application">
            <Adw.ActionRow title="URL" subtitle={props.app.url}>
                <Gtk.Button
                    $type="suffix"
                    iconName="edit-copy-symbolic"
                    tooltipText="Copy URL"
                    valign={Gtk.Align.CENTER}
                    class="flat"
                    onClicked={() => {
                        ClipboardService.copy(props.app.url)
                        ToastService.show("Copied", 1)
                    }}
                />
            </Adw.ActionRow>

            <Adw.ActionRow title="Profile" subtitle={props.app.profilePath}>
                <Gtk.Button
                    $type="suffix"
                    iconName="folder-open-symbolic"
                    tooltipText="Open Folder"
                    valign={Gtk.Align.CENTER}
                    class="flat"
                    onClicked={() =>
                        FileService.openFolder(props.app.profilePath)
                    }
                />
            </Adw.ActionRow>

            <Adw.ActionRow
                title="Desktop File"
                subtitle={props.app.desktopPath}
            >
                <Gtk.Button
                    $type="suffix"
                    iconName="folder-open-symbolic"
                    tooltipText="Show File"
                    valign={Gtk.Align.CENTER}
                    class="flat"
                    onClicked={() =>
                        FileService.revealFile(props.app.desktopPath)
                    }
                />
            </Adw.ActionRow>
        </Adw.PreferencesGroup>
    )
}