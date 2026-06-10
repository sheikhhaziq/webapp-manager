Name:           webapp-manager
Version:        0.1.0
Release:        1%{?dist}
Summary:        Create and manage standalone web applications

License:        GPL-3.0-or-later
BuildArch:      noarch

Requires:       gjs
Requires:       gtk4
Requires:       libadwaita

%description
WebApp Manager allows users to create standalone web applications using Chromium-based browsers.

%install
mkdir -p %{buildroot}
cp -a build/rpm-root/usr %{buildroot}/

%post
/usr/bin/glib-compile-schemas %{_datadir}/glib-2.0/schemas >/dev/null 2>&1 || :

%postun
/usr/bin/glib-compile-schemas %{_datadir}/glib-2.0/schemas >/dev/null 2>&1 || :

%files
%{_bindir}/webapp-manager
%{_datadir}/applications/io.github.sheikhhaziq.WebappManager.desktop
%{_datadir}/glib-2.0/schemas/io.github.sheikhhaziq.WebappManager.gschema.xml
%{_datadir}/icons/hicolor/scalable/apps/io.github.sheikhhaziq.WebappManager.svg
%{_datadir}/metainfo/io.github.sheikhhaziq.WebappManager.metainfo.xml
