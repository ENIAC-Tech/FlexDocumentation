# 「Content Aware Controls」の設定と使い方

## 「Content Aware Controls」とは？

Flexbar をさらに使いやすくするため、「Content Aware Controls」機能は、特定のアプリを開いているあいだ、画面上でよく使うショートカット画面を自動的に表示します。このチュートリアルに沿って簡単な手順を済ませると、次のような動きになります。

![1743733850920](/image/content_aware_controls/1743733850920.png)

## 追加の手順

「Content Aware Controls」でアプリ使用時に Flexbar が特定の Page を自動表示するには、まず表示用の Page を用意します。右側の Key Library の 「Navigation」カテゴリにある「Page」キーを見つけ、仮想 Flexbar にドラッグして使います。詳しくは「Flexbar での移動方法」のセクションを参照してください。

そのアプリでよく使うショートカットを追加したり、プリセットや「Market Place」からキー パックをインポートしたりできます。詳しくは「Page のエクスポートとインポート」のセクションを参照してください。

![1743733967747](/image/content_aware_controls/1743733967747.png)

> リンクした Page は Flexbar の Pages ツリー内のどこに置いても構いません。「Content Aware Controls」の動作には影響しません。
>
> 他のキーと同様に、Page の名前変更や見た目のカスタマイズができます。アプリ名に合わせて Page 名を変えても、「Content Aware Controls」の動作には影響しません。
>
> 今後、さらにショートカットのプリセットが Market Place にアップロードされ、ダウンロードできるようになります。ウィンドウやプログラム名は PC ごとに異なるため、これらの Page をソフトウェアのウィンドウに **手動でバインド**する必要がある点に注意してください。

## 「Content Aware Controls」を設定する

① FlexDesigner で、表示用に作成した Page をクリックします（親フォルダーで Page キー本体を選び、Page の中に入った状態ではないことを確認してください）。

② 下の構成パネルに Page の設定が表示されます。**FUNCTION** タブを開くと、**Bind to Window** の項目があります。

![7a811a87-01aa-4edc-856c-9cee1c64ff6f](C:\Users\tongy\Desktop\content aware controls\7a811a87-01aa-4edc-856c-9cee1c64ff6f.png)

③ **Bind to Window** の欄をクリックします。FlexDesigner が PC 上の開いているウィンドウを取得して一覧表示します。この Page にバインドしたいウィンドウを選びます。

④ 設定を保存し、Flexbar に構成をアップロードするのを忘れないでください。そうしないと反映されません。

![1743733975174](/image/content_aware_controls/1743733975174.png)

## 結果

パソコンで、あらかじめバインドしたウィンドウを開いたり、そのウィンドウを前面で使うと、Flexbar はそのウィンドウに対応する Page に自動的に切り替わります。この例では、**Excel Page** を **Microsoft Excel** にバインドしました。Microsoft Excel を使うと、Flexbar の「Content Aware Controls」機能が Excel Page を **自動的に** **表示**します。Flexbar 上の多数の Page を探し回る必要はありません。

![1743733988401](/image/content_aware_controls/1743733988401.png)

> 同じウィンドウに複数の Page を **バインドしないで**ください。
>
> **Bind to Window** をクリックしたとき、一覧に出るのは **いま開いている**ウィンドウだけです。設定時には、バインドしたいアプリのウィンドウを先に開いてください。バインドの単位はウィンドウです。
>
> アプリにバインドして Page を出し分けられますが、Page キー単体に **アプリを起動する**機能は **ありません**。その動きが必要な場合は **Open Application** キーを使い、前述の Page は別の場所に置いて、上と同様にウィンドウへバインドしてください。そうすればワンクリックでアプリを起動し、対応する Page を開けます。
>
> *この機能を使うには、FlexDesigner がバックグラウンドで起動している必要があります。

## サブページ

親 Page を特定のアプリにバインドすると、すべてのサブページも同じアプリに自動的にバインドされます。アプリにバインドされたサブページに入ると、Flexbar はそのサブページの位置を自動的に記憶し、次回は最後に開いていたサブページに自動的に戻ります。
