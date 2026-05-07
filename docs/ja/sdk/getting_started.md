# はじめに

このドキュメントに従って、FlexDesigner プラグインを作成して実行します。

## プラグインのアーキテクチャ

FlexDesigner プラグインは、フロントエンドとバックエンドの 2 つの部分で構成されます。

#### フロントエンド

フロントエンドは [vue3](https://vuejs.org/) と [Vuetify3](https://vuetifyjs.com/en/) で構築され、Chromium 環境で実行されます。 window オブジェクトを介して FlexDesigner と通信します。

#### バックエンド

バックエンドは JavaScript で記述され、Node.js で実行されます。 WebSocket 経由で FlexDesigner と通信します。

## 前提条件

FlexDesigner プラグインを開発するには、以下が必要です。

- Node.js 18 以降
- FlexDesigner v1.0.0 以降
- Flexbar 本体
- コードエディター (VS Code をお勧めします)

> We recommend using nvm to install and manage your Node.js environment.
> [nvm for MacOS](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
> [nvm for Windows](https://github.com/coreybutler/nvm-windows/releases)

## SDK の入手

FlexCLI を使って SDK をインストールし、構成します。

### FlexCLI をインストールする

次を実行します。

`npm install -g @eniac/flexcli`

これにより、開発環境に FlexCLI がインストールされます。インストール後、ターミナルで `flexcli` を実行し、正しくインストールされていることを確認します。

### 最初のプラグインを作成する

次を実行します。

`flexcli plugin create`

次に、プロンプトに従って必要なパラメータを入力します。

> 注: オンライン プラットフォーム（FlexGate）でプラグインを公開する場合は、ホスト先の正しいリポジトリ URL を必ず指定してください。 FlexDesigner はその URL からプラグインを取得・更新します。

作成が成功すると、ワークスペースは次のようになります。

```
│  .gitignore
│  package.json
│  rollup.config.mjs
│  
├─com.eniac.example.plugin
│  │  config.json
│  │  manifest.json
│  │  
│  ├─backend
│  ├─logs
│  ├─resources
│  └─ui
└─src
    plugin.js
```

#### com.`<作成者>`.`<名前>`.plugin

このフォルダーはプラグイン ディレクトリです。 GitHub でプラグインをホストする場合、プラグインはルート レベルに配置する必要があります。そうしないと、FlexDesigner はそれを認識できません。

- **config.json**: ユーザー アカウントの詳細やプラグイン設定など、保持する必要があるデータを保存します。
- **manifest.json**: プラグインの情報を説明します
- **backend**: コンパイルされたバックエンド スクリプトが含まれます
- **logs**: ログ ファイルのデフォルトの場所
- **resources**: 画像などのリソースのデフォルトの保存場所
- **ui**: プラグインのフロントエンド ファイルを保持します

#### src

このディレクトリには、Node.js の子プロセスとして実行され、WebSocket を通じて FlexDesigner と通信するバックエンド コードが含まれています。

## 初回の実行

FlexDesigner が実行されていることを確認してから、以下を実行します。

```
npm run build
npm run dev
```

これにより、プラグインが自動的にコンパイル・バンドル・インストールされます。 FlexDesigner の Key Library にプラグインが表示されます。

![1742308777216](/image/getting_started/1742308777216.png)

プラグインに加えた変更はすべて、FlexDesigner と自動的に同期されます。

おつかれさまでした。最初のプラグインの作成と実行が完了しました。

さらに開発を進める場合は、サンプル プラグインを参照してください。

- [Example](https://github.com/ENIAC-Tech/Plugin-Example) – サポートされているすべての機能と API の例
- [ScreenMirror](https://github.com/ENIAC-Tech/Plugin-ScreenMirror) – 画面の特定の領域を Flexbar にミラーリングする例
