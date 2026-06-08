import Gdk from "gi://Gdk"
import Gtk from "gi://Gtk"

export default function AppIcon(props: { icon: string }) {
  if (props.icon.startsWith("/")) {
    try {
      return (
        <Gtk.Image
          $type="prefix"
          paintable={Gdk.Texture.new_from_filename(props.icon)}
          pixelSize={32}
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
