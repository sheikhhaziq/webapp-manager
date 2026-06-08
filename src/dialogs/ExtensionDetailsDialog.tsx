import AppIcon from "@/components/AppIcon"
import { BrowserExtension } from "@/models/BrowserExtension"

import Adw from "gi://Adw"
import Gtk from "gi://Gtk"

interface ExtensionDetailsDialogProps {
    extension: BrowserExtension
}

export function ExtensionDetailsDialog(
    props: ExtensionDetailsDialogProps,
) {
    let dialog: Adw.Dialog

    return (
        <Adw.Dialog
            $={(self) => {
                dialog = self
            }}
            title={props.extension.name}
            contentWidth={500}
            contentHeight={450}
        >
            <Adw.ToolbarView>
                <Adw.HeaderBar $type="top">
                    <Adw.WindowTitle
                        $type="title"
                        title={props.extension.name}
                    />
                </Adw.HeaderBar>

                <Gtk.ScrolledWindow>
                    <Gtk.Box
                        orientation={Gtk.Orientation.VERTICAL}
                        spacing={18}
                        marginTop={18}
                        marginBottom={18}
                        marginStart={18}
                        marginEnd={18}
                    >
                        <Gtk.Box
                            orientation={Gtk.Orientation.VERTICAL}
                            spacing={12}
                            halign={Gtk.Align.CENTER}
                        >
                            <AppIcon
                                icon={props.extension.iconPath!}
                                pixelSize={64}
                            />

                            <Gtk.Label
                                class="title-2"
                                label={props.extension.name}
                            />

                            <Gtk.Label
                                class="dim-label"
                                label={`Version ${props.extension.version}`}
                            />
                        </Gtk.Box>

                        <Adw.PreferencesGroup
                            title="Description"
                        >
                            <Adw.ActionRow
                                subtitle={
                                    props.extension.description ||
                                    "No description available"
                                }
                            />
                        </Adw.PreferencesGroup>

                        <Adw.PreferencesGroup
                            title="Technical"
                        >
                            <Adw.ActionRow
                                title="Extension ID"
                                subtitle={
                                    props.extension.id
                                }
                            />
                        </Adw.PreferencesGroup>
                    </Gtk.Box>
                </Gtk.ScrolledWindow>
            </Adw.ToolbarView>
        </Adw.Dialog>
    )
}