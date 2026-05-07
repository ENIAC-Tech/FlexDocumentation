# Flexbar 接続のトラブルシューティング

FlexDesigner が Flexbar を認識できない場合は、次の手順に従って問題を特定し、解決してください。

## コンピュータの認識を確認する

Flexbar には追加の USB ドライバーは必要なく、接続時に自動的に認識されます。これを次のようにして確認します。

### 方法 1: Flexbar 関数をテストする

1. **Access the Home Screen**:
   Press the "🏠" icon on the far left of Flexbar
   ![ホームボタン](/image/cannot_connect/1746349468296.png)
2. **Test Device Functions**:
   Rotate the volume wheel or press media control buttons and observe your computer's response
   ![機能テスト](/image/cannot_connect/1746349473776.png)

コンピュータの音量が変化するか、メディア コントロールが反応する場合、システムは Flexbar を正常に認識しています。

### 方法 2: システム デバイス マネージャーを確認する

#### 窓

1. デバイスマネージャーを開く
2. デバイスリストを見ながらFlexbarを接続および切断する
3. デバイスが表示されたり消えたりすると、システムは Flexbar を認識します。

#### macOS

1. 左上のアップルメニューをクリック→「このMacについて」を選択
2. 「システムレポート」をクリックしてシステム情報を入力します
3. ハードウェアセクションで「USB」を選択します
4. USB デバイスリストで Flexbar を探します

### コンピュータが Flexbar を認識しない場合?

以下の解決策を試してください。

- USB ポートを変更します (内蔵コンピューター ポートを使用することが望ましい)
- USB ハブやドッキング ステーションを介した接続は避けてください
- USB-A - USB-C ケーブルを使用してみる

## Flexbar はコンピュータに認識されるが、FlexDesigner に接続されない

### 解決策 1: デバイスを再起動する

コンピュータと FlexDesigner を再起動することが、ほとんどの接続の問題を解決する最も簡単で効果的な方法です。

### 解決策 2: FlexDesigner を再インストールする

[公式Webサイト](https://eniacelec.com/pages/software)から最新のソフトウェアをダウンロードして再インストールしてください。

### 解決策 3: USB プロトコルを切り替える

まれに、システムで特定のプロトコルを使用した Flexbar との通信に問題が発生することがあります。 Flexbar は、HID と CDC USB プロトコルの両方をサポートします。それらを切り替えるには:

1. **Enter Safe Mode**:
   During startup, click the "Enter SafeMode" button on the left side of the LOGO screen
   ![セーフモードへの移行](/image/safemode/1743991368473.png)
2. **Access Settings**:
   Click the gear icon on the far right of Flexbar
   ![設定ボタン](/image/safemode/1743991410209.png)
3. **Switch USB Mode**:
   Press button 6 to toggle between CDC and HID modes
   ![1746499904730](/image/cannot_connect/1746499904730.png)
4. **Flexbar を再接続**

## LinuxのUSB許可の問題

Linux を使用していて、「USB デバイスにアクセスできません。権限の問題が原因である可能性があります」というメッセージが表示された場合は、次の手順に従ってください。

1. **udev ルールを作成**するには、ターミナルで次のコマンドを実行します。
   ```bash
   echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bd", MODE="0666", GROUP="plugdev"
   SUBSYSTEM=="hidraw", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bd", MODE="0666", GROUP="plugdev"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bf", MODE="0666", GROUP="plugdev"
   SUBSYSTEM=="tty", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bf", MODE="0666", GROUP="plugdev"' > /tmp/99-flexbar.rules
   sudo cp /tmp/99-flexbar.rules /etc/udev/rules.d/
   sudo udevadm control --reload-rules && sudo udevadm trigger
   ```

2. **デバイスを切断して再接続します**

3. **アプリケーションを再起動します**

## MacOS の USB 許可の問題

MacOS を使用している場合は、システム設定でアクセサリの接続を許可していることを確認してください。

詳細については、[Apple 公式ドキュメント](https://support.apple.com/en-us/102282) を参照してください。


## まだ問題がありますか?

上記の方法で問題が解決しない場合は、contact@eniacelec.com までメールでお問い合わせください。当社のテクニカル サポート チームが問題の解決を支援するために直ちにご連絡いたします。
