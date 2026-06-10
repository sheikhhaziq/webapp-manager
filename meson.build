# FIXME: rename
project('webapp-manager', version: '0.1.0')

# FIXME: rename
domain = 'io.github.sheikhhaziq.WebappManager'
name = meson.project_name()
version = meson.project_version()

prefix = get_option('prefix')
datadir = prefix / get_option('datadir')
bindir = prefix / get_option('bindir')


main_ts = configure_file(
  input: 'src/main.ts',
  output: 'main.ts',
  configuration: {
    'gjs': find_program('gjs').full_path(),
  },
)
esbuild = find_program(
  meson.project_source_root() / 'node_modules' / '.bin' / 'esbuild',
  required: true,
)

custom_target(
  input: 'src/main.ts',
  command: [
    esbuild,
    '--bundle', '@INPUT@',
    '--outfile=@OUTPUT@',
    '--external:gi://*',
    '--external:resource://*',
    '--external:system',
    '--external:gettext',
    '--format=esm',
    '--sourcemap=inline',
    '--target=firefox116',
    '--define:import.meta.name="' + name + '"',
    '--define:import.meta.version="' + version + '"',
    '--define:import.meta.domain="' + domain + '"',
    '--define:import.meta.datadir="' + datadir + '"',
  ],
  output: name,
  install: true,
  install_dir: bindir,
)

install_data(
  'data/io.github.sheikhhaziq.WebappManager.gschema.xml',
  install_dir: datadir / 'glib-2.0' / 'schemas',
)


#gnim_schemas = find_program(
#  'node_modules/gnim-schemas/lib/cli.js'
#)
#custom_target(
#  input: configure_file(
#    input: 'src/config/gschema.ts',
#    output: domain + '.gschema.ts',
#    configuration: {'domain': domain},
#  ),
#  command: [
#    find_program('gjs'),
#    '-m', gnim_schemas,
#    meson.current_build_dir(),
#  ],
#  output: domain + '.gschema.xml',
#  install: true,
#  install_dir: datadir / 'glib-2.0' / 'schemas',
#)


configure_file(
  input: 'data/desktop.in.desktop',
  output: domain + '.desktop',
  configuration: {'exe': bindir / name},
  install: true,
  install_dir: datadir / 'applications',
)

install_data(
  'data/icons/hicolor/scalable/apps/io.github.sheikhhaziq.WebappManager.svg',
  install_dir: datadir / 'icons' / 'hicolor' / 'scalable' / 'apps',
)
install_data(
  'data/io.github.sheikhhaziq.WebappManager.metainfo.xml',
  install_dir: datadir / 'metainfo',
)

import('gnome').post_install(
  gtk_update_icon_cache: true,
  glib_compile_schemas: true,
  update_desktop_database: true,
)
