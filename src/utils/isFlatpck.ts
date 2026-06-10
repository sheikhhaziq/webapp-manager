import GLib from "gi://GLib"

export function isFlatpak() {
    return GLib.file_test(
        "/.flatpak-info",
        GLib.FileTest.EXISTS,
    )
}