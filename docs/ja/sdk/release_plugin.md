# プラグインをリリースする

このガイドでは、プラグインを公開する方法について説明します。

## GitHub Actions

`flexcli` で作成したプラグインには、GitHub Actions があらかじめ設定されています。公開するにはコードを GitHub リポジトリにプッシュし、Release を作成します。Release のタグは `manifest.json` で指定したプラグインのバージョンと一致させてください。GitHub CI が自動的に `*.flexplugin` をビルドし、Release のアセットとして公開します。

その後、ユーザーに `*.flexplugin` または GitHub リポジトリの URL を共有し、Key Library からプラグインをインポートしてもらえます。

### マルチプラットフォームのサポート

場合によっては、オペレーティング システムが異なれば、異なるバックエンド プログラムが必要になる場合があります。

GitHub Actions を変更し、プラグインを次の形式でパッケージ化できます。

 `xxx.&lt;OS NAME&gt;.&lt;ARCH&gt;.flexplugin`

ここで、OS NAME は `win32`、`darwin`、`linux` をサポートします。ARCH は `x64`、`arm64` をサポートします。ARCH の区切りは省略できます。

FlexDesigner は適切なプラグイン バックエンドを自動的に見つけてインストールします。必要な命名規則のファイルがない場合は、最初に見つかった `.flexplugin` が使われます。

## FlexGate に提出する

プラグインをより幅広いユーザーと共有したい場合は、プラグインを FlexGate に公開できます。

See [Uploading Plugins to FlexGate](../troubleshoting/flexgate)
