import Adw from "gi://Adw"

interface ConfirmDialogProps {
  heading: string | null | undefined

  body?: string

  confirmLabel?: string
  cancelLabel?: string

  destructive?: boolean

  onConfirm(): void
}

export default function ConfirmDialog(
  props: ConfirmDialogProps,
): Adw.AlertDialog {
  const dialog = new Adw.AlertDialog({
    heading: props.heading,
    body: props.body,
  })

  dialog.add_response("cancel", props.cancelLabel ?? "Cancel")

  dialog.add_response("confirm", props.confirmLabel ?? "Confirm")

  if (props.destructive) {
    dialog.set_response_appearance(
      "confirm",
      Adw.ResponseAppearance.DESTRUCTIVE,
    )
  }

  dialog.set_default_response("cancel")

  dialog.set_close_response("cancel")

  dialog.connect("response", (_dialog, response) => {
    if (response === "confirm") {
      props.onConfirm()
    }
  })

  return dialog
}
