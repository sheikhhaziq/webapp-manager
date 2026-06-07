{
  description = "Gnim Demo App";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    nativeBuildInputs = with pkgs; [
      wrapGAppsHook
      gobject-introspection
      meson
      pkg-config
      ninja
      desktop-file-utils
      libxml2
    ];

    buildInputs = with pkgs; [
      gsettings-desktop-schemas
      glib
      libadwaita
      gtk4
      gjs
      esbuild
    ];

    # FIXME: rename
    pname = "gnim-demo";
    version = "0.0.0";
    src = ./.;
  in {
    packages.${system} = {
      default = pkgs.stdenv.mkDerivation {
        inherit pname version nativeBuildInputs buildInputs;

        src = pkgs.stdenv.mkDerivation {
          inherit src pname version;

          nativeBuildInputs = with pkgs; [
            pnpm.configHook
            pnpm
          ];

          pnpmDeps = pkgs.pnpm.fetchDeps {
            inherit src pname version;
            hash = "sha256-VarkDqXm9LIFiHpoj6zWd6w3W5kOxsb4koti91AtlK4=";
          };

          installPhase = ''
            cp -r . $out
          '';
        };
      };
    };

    devShells.${system}.default = pkgs.mkShell {
      packages = nativeBuildInputs ++ buildInputs ++ [pkgs.pnpm];
    };
  };
}
