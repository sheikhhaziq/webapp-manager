import Gio from "gi://Gio"
import Glib from "gi://GLib"

class FileService {
  openFolder(path: string) {
    try {
      const file = Gio.File.new_for_path(path)
      print(file.get_uri())
      Gio.AppInfo.launch_default_for_uri(file.get_uri(), null)
    } catch (e) {
      logError(e)
    }
  }



  revealFile(path: string) {
    try {
      const file = Gio.File.new_for_path(path)

      Gio.DBus.session.call(
        "org.freedesktop.FileManager1",
        "/org/freedesktop/FileManager1",
        "org.freedesktop.FileManager1",
        "ShowItems",
        new Glib.Variant(
          "(ass)",
          [[file.get_uri()], ""],
        ),
        null,
        Gio.DBusCallFlags.NONE,
        -1,
        null,
        null,
      )
    } catch (e) {
      logError(e)
    }
  }
}

export default new FileService()
