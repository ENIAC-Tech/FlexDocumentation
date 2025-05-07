# Release Your Plugin

This guide explains how to publish your plugin.

## GitHub Actions

Plugins created with `flexcli` come pre-configured with GitHub Actions. To publish your plugin, simply push your code to a GitHub repository and create a Release. Note that your Release Tag must match the plugin version specified in the `manifest.json` file. The GitHub CI will automatically compile and publish the `*.flexplugin` file to the Release assets.

You can then share the `*.flexplugin` file or the GitHub repository link for users to import the plugin in the key library.

### Multi-Platform Support

In some cases, different operating systems may require different backend programs.

You can modify GitHub Actions to package your plugin in the following format:

 `xxx.<OS NAME>.<ARCH>.flexplugin`

Where OS NAME supports `win32, darwin, linux`; ARCH supports `x64, arm64`. The ARCH segment is optional and can be omitted.

FlexDesigner will automatically find and install the appropriate plugin backend. If it cannot find a file with the required naming format, it will use the first .flexplugin file it encounters.

## Submit to FlexGate

If you want to share your plugin with a broader audience, you can publish it to FlexGate.

See [Uploading Plugins to FlexGate](../troubleshoting/flexgate.md)
