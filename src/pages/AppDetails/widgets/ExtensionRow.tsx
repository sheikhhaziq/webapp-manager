import Adw from "gi://Adw"
import Gtk from "gi://Gtk"

import type { BrowserExtension } from "@/models/BrowserExtension"
import { useExtensions } from "@/contexts/ExtensionsContext"
import DialogService from "@/services/DialogService"
import { getScope } from "gnim"
import ConfirmDialog from "@/dialogs/ConfirmDialoh"
import { ExtensionDetailsDialog } from "@/dialogs/ExtensionDetailsDialog"
interface ExtensionRowProps {
  extension: BrowserExtension
  isBuiltIn: boolean
  onDelete?(): void
}
export default function ExtensionRow(props: ExtensionRowProps) {
  const { setEnabled, uninstall } = useExtensions()
  const scope = getScope()

  function deleteExtension() {
    DialogService.present(scope, () =>
      ConfirmDialog({
        heading: "Delete Extension",
        body: `Delete "${props.extension.name}"? This action cannot be undone.`,
        confirmLabel: "Delete",
        destructive: true,
        onConfirm: () => {
          uninstall(props.extension.id)
        },
      }),
    )
  }
  function showDetails() {
    DialogService.present(
      scope,
      () =>
        (
          <ExtensionDetailsDialog
            extension={props.extension}
          />
        ) as Adw.Dialog,
    )
  }
  return (
    <Adw.ActionRow
      title={props.extension.name}
      subtitle={props.extension.description}
      subtitleLines={1}
      activatable={!props.isBuiltIn}
      onActivated={showDetails}
    >
      {props.extension.iconPath && (
        <Gtk.Image
          $type="prefix"
          file={props.extension.iconPath}
          pixelSize={32}
        />
      )}
      <Gtk.Label
        $type="suffix"
        label={`v${props.extension.version}`}
        valign={Gtk.Align.CENTER}
        cssClasses={["dim-label"]}
      />
      {!props.isBuiltIn ? (
        <>
          <Gtk.Button
            $type="suffix"
            valign={Gtk.Align.CENTER}
            iconName="user-trash-symbolic"
            cssClasses={["flat", "destructive-action"]}
            onClicked={deleteExtension}
          />
          <Gtk.Switch
            $type="suffix"
            active={props.extension.isActive}
            valign={Gtk.Align.CENTER}
            onNotifyActive={(sw) => {
              setEnabled(props.extension.id, sw.active)
            }}
          />
        </>
      ) : null}
    </Adw.ActionRow>
  )
}

// <Adw.ActionRow title={ext.name} subtitle={ext.description}>
//         {ext.iconPath && (
//           <Gtk.Image $type="prefix" file={ext.iconPath} pixelSize={32} />
//         )}

//         <Gtk.Label
//           $type="suffix"
//           label={`v${ext.version}`}
//           valign={Gtk.Align.CENTER}
//           cssClasses={["dim-label"]}
//         />
//         <Gtk.Button
//           $type="suffix"
//           valign={Gtk.Align.CENTER}
//           iconName="user-trash-symbolic"
//           cssClasses={["flat", "destructive-action"]}
//           onClicked={() => {
//             // showUninstall(ext)
//           }}
//         />

//         <Gtk.Switch
//           $type="suffix"
//           active={ext.isActive}
//           valign={Gtk.Align.CENTER}
//           onNotifyActive={(sw) => {
//             setEnabled(ext.id, sw.active)
//           }}
//         />
//       </Adw.ActionRow>
