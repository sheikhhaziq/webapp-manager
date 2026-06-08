import Gdk from "gi://Gdk"
import Gtk from "gi://Gtk"
import { Accessor } from "gnim"

export default function AppIcon(props: {
  icon: string
  pixelSize?: number | Accessor<number> | undefined
}) {
  if (props.icon.startsWith("/")) {
    try {
      return (
        <Gtk.Image
          $type="prefix"
          paintable={Gdk.Texture.new_from_filename(props.icon)}
          pixelSize={props.pixelSize ?? 32}
        />
      )
    } catch {
      return (
        <Gtk.Image
          $type="prefix"
          iconName="web-browser-symbolic"
          pixelSize={32}
        />
      )
    }
  }

  return <Gtk.Image iconName={props.icon} pixelSize={32} />
}
