export const PrivacyPolicy: React.FC = () => {
  return (
    <main className="pt-20 min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-muted-foreground mb-8">最終更新日: 2026年9月5日</p>

        <div className="space-y-8 text-sm md:text-base text-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. はじめに</h2>
            <p>
              本プライバシーポリシーは、「Rootech Radio(ルーテックラジオ)」(以下「本アプリ」)における、
              情報の取り扱いについて説明するものです。
            </p>
            <p className="mt-2">
              本アプリは、技術ニュースラジオ番組「Rootech Radio」の配信を自動化するための、
              個人利用を目的とした内部ツールです。YouTube Data API を利用して、生成した
              動画コンテンツを特定のYouTubeチャンネルへ自動投稿する機能を持ちます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. 取得する情報</h2>
            <p>本アプリは、YouTube Data API を通じて、以下の情報にアクセスします。</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>動画のアップロード、タイトル・説明文の設定</li>
              <li>再生リストへの動画の追加</li>
            </ul>
            <p className="mt-2">
              本アプリは、上記の目的以外でYouTubeアカウントの情報を取得、保存、
              第三者へ提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. 情報の利用目的</h2>
            <p>取得した権限は、以下の目的にのみ使用されます。</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>自動生成した音声・動画コンテンツを、指定のYouTubeチャンネルへアップロードするため</li>
              <li>アップロードした動画を、テーマに応じた再生リストへ整理するため</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. 情報の第三者提供</h2>
            <p>本アプリは、取得した情報を第三者に提供、販売、共有することはありません。</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. データの保存</h2>
            <p>
              本アプリが認証に使用するトークン等の情報は、Google Cloud の
              Secret Manager 上で暗号化された状態で保管されており、本アプリの
              運営者以外がアクセスすることはできません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Google API サービスユーザーデータポリシーの遵守</h2>
            <p>
              本アプリによる Google API から取得した情報の使用および他のアプリへの
              情報の転送は、
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Google API Services User Data Policy
              </a>
              (Limited Use の要件を含む)に準拠します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. お問い合わせ</h2>
            <p>
              本アプリは個人開発による内部ツールであり、一般公開を目的としたものではありません。
              本プライバシーポリシーに関するお問い合わせについては、本アプリの運営者まで
              ご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. 本ポリシーの変更</h2>
            <p>
              本プライバシーポリシーの内容は、予告なく変更される場合があります。
              変更後の内容は、本ページに掲載された時点で効力を生じるものとします。
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
