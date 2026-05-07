# FlexCLI ツールのドキュメント

このドキュメントでは、プラグインおよび FlexDesigner と対話する CLI ツールの使用に関する概要とガイドを提供します。このツールは、プラグインのリンク、再起動、デバッグ、インストール、アンインストールなど、プラグインを管理するためのさまざまなコマンドを提供します。また、プラグイン プロジェクトの作成とプラグイン構造の検証もサポートされています。

## インストール

### 前提条件

- Node.js バージョン 18 以降
- FlexDesigner バージョン 1.0.0 以降。

### 設定

次のコマンドを実行して、FlexDesigner の CLI ツール（FlexCLI）をインストールします。

```
npm install -g @eniactech/flexcli
```

## コマンド

### `plugin link`

プラグインを FlexDesigner にリンクします。

#### オプション:

- `--path &lt;path&gt;`: Path to the plugin directory (required)
- `--uuid &lt;uuid&gt;`: UUID of the plugin (required)
- `--debug &lt;debug&gt;`: Enable or disable debug mode (default: false)
- `--skip-validate`: 検証ステップをスキップします (デフォルト: false)
- `--force`: 既存のプラグインを強制的にオーバーライドします (デフォルト: false)
- `--start &lt;start&gt;`: Whether to start the plugin after linking (default: true)

#### 説明:

このコマンドは、プラグインのパスと UUID を指定して、プラグインを FlexDesigner にリンクします。また、デバッグ モードを有効にし、検証をスキップし、強制的にオーバーライドし、リンク後にプラグインを開始するオプションも提供します。

---

### `plugin restart`

プラグインを再起動します。

#### オプション:

- `--uuid &lt;uuid&gt;`: UUID of the plugin to restart (required)

#### 説明:

このコマンドは、指定された UUID を使用してプラグインを再起動します。

---

### `plugin unlink`

FlexDesigner からプラグインのリンクを解除します。

#### オプション:

- `--uuid &lt;uuid&gt;`: UUID of the plugin to unlink (required)
- `--silent`: 出力なしでサイレント モードで実行します (デフォルト: false)

#### 説明:

このコマンドは、指定された UUID を使用して FlexDesigner からプラグインのリンクを解除します。

---

### `plugin debug`

プラグインをデバッグします。

#### オプション:

- `--uuid &lt;uuid&gt;`: UUID of the plugin to debug (required)

#### 説明:

このコマンドは、UUID を指定してプラグインをデバッグするために使用します。プラグインに接続し、デバッグ情報を取得できます。

---

### `plugin list`

インストールされているすべてのプラグインをリストします。

#### 説明:

このコマンドは、FlexDesigner に現在インストールされているすべてのプラグインを一覧表示します。

---

### `plugin pack`

プラグインを `.flexplugin` ファイルにパックします。

#### オプション:

- `--path &lt;path&gt;`: Path to the plugin directory (required)
- `--output &lt;output&gt;`: Output path for the `.flexplugin` file
- `--skip-validate`: 検証をスキップします (デフォルト: false)

#### 説明:

このコマンドは、出力パスの指定と検証のスキップのオプションを使用して、プラグインを `.flexplugin` ファイルにパッケージ化します。

---

### `plugin install`

`.flexplugin` ファイルからプラグインをインストールします。

#### オプション:

- `--path &lt;path&gt;`: Path to the `.flexplugin` file (required)
- `--force`: インストールを強制します (デフォルト: false)

#### 説明:

このコマンドは、`.flexplugin` ファイルを使ってプラグインをインストールします。拡張子が `.flexplugin` でない場合はエラーが表示されます。`--force` オプションでインストールを強制できます。

---

### `plugin uninstall`

プラグインをアンインストールします。

#### オプション:

- `--uuid &lt;uuid&gt;`: UUID of the plugin to uninstall (required)

#### 説明:

このコマンドは、指定された UUID を使用してプラグインをアンインストールします。

---

### `plugin validate`

プラグインの構造とマニフェストを検証します。

#### オプション:

- `--path &lt;path&gt;`: Path to the plugin directory (required)

#### 説明:

このコマンドは、プラグイン ディレクトリとそのマニフェストを検証して、正しい構造に従っていることを確認します。

---

### `plugin create`

基本的なプラグイン ワークスペースを作成します。

#### 説明:

このコマンドは、新しいプラグインの基本的なワークスペースを作成し、プラグインのパス、名前、バージョン、作成者、説明、リポジトリ URL などの詳細を指定できるようにします。

次の情報の入力を求められます。

- プラグインのパス
- プラグイン名
- 著者名
- 逆引きドメイン UUID (例: `com.author.myplugin`)
- バージョン（`x.y.z` 形式）
- 説明
- リポジトリ URL

作成されたワークスペースは、指定された情報で初期化されます。

---

### `plugin kill`

プラグインスレッドを強制終了します。

#### 説明:

このコマンドは、FlexDesigner のプラグイン スレッドを強制終了します。

---

## 共通オプション

- `--port &lt;number&gt;`: Specifies the WebSocket server port (default: 60109)

---

## 使用例

プラグインをリンクするには:

```bash
flexcli plugin link --path /path/to/plugin --uuid com.example.plugin --debug true
```

プラグインを再起動するには:

```bash
flexcli plugin restart --uuid com.example.plugin
```

すべてのプラグインを一覧表示するには:

```bash
flexcli plugin list
```

新しいプラグイン ワークスペースを作成するには:

```bash
flexcli plugin create
```
