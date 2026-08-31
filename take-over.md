# Rootech Radio - フロントエンド実装 引き継ぎ資料

## プロジェクト概要

「Rootech Radio(ルーテックラジオ)」は、技術ニュースを毎日自動生成してYouTubeに配信する
AIラジオ番組。バックエンドパイプライン(RSS収集→AI原稿生成→音声合成→動画化→YouTube投稿)は
GCP上にすでに完成・稼働している。

このリポジトリ(techRadioPlt)は、その配信を表示するフロントエンド(React + Vite)。
**バックエンドは完成済み・触る必要なし。今回のタスクはフロントエンドの実装のみ。**

## やってほしいこと

トップページに以下を表示する:

1. **今日配信されたラジオのYouTube動画**(iframe埋め込み)
2. **その下に、その回の原稿全文**

曜日ごとに配信テーマが変わる(月:AI、火:Web開発、水:セキュリティ、木:バックエンド・DB、
金:クラウド・インフラ、土:プログラミング言語・OSSトレンド/ハードウェア・ガジェットの2本、
日:企業ウォッチ)。**土曜だけ1日に2本配信されることがある点に注意。**
表示するのは「今日の分すべて」(1〜2本)。過去回一覧などは将来の拡張、今回のスコープ外。

## データの取得方法

専用のREST APIをすでにCloud Run上に構築済み。**認証不要、CORSも設定済み**なので、
フロントエンドから直接 `fetch()` で叩ける。

### エンドポイント

Base URL(要確認・下記コマンドで取得):
```bash
gcloud run services describe radio-episodes-api --region us-central1 --format='value(status.url)'
```
(おそらく `https://radio-episodes-api-pijirfw6rq-uc.a.run.app` 系のURLだが、必ず上記コマンドで実URLを確認すること)

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/today` | 今日の全エピソードを配列で返す。**トップページで使うのはこれ**。土曜は2件になることがある |
| GET | `/episodes?limit=N` | 直近N件のエピソード一覧(新しい順)。将来の一覧ページ用、今回は未使用でOK |
| GET | `/episodes/{date}` | 指定日(YYYY-MM-DD)の全エピソードを配列で返す。将来の詳細ページ用、今回は未使用でOK |

### レスポンス形式(`/today` の例)

**常に配列(`episodes`)で返る。1件のときも配列に1要素入る形。**

```json
{
  "episodes": [
    {
      "id": "2026-08-29_プログラミング言語-OSSトレンド",
      "date": "2026-08-29",
      "day_of_week": "saturday",
      "topic": "プログラミング言語・OSSトレンド",
      "youtube_video_id": "UJolKI3rJ2o",
      "youtube_url": "https://youtu.be/UJolKI3rJ2o",
      "script": "こんにちは、Rootech Radioの須藤です...(原稿全文、数千文字)",
      "sources": [
        { "title": "記事タイトル1", "url": "https://example.com/article1" }
      ],
      "published_at": "2026-08-29T01:00:00+00:00"
    },
    {
      "id": "2026-08-29_ハードウェア-ガジェット",
      "date": "2026-08-29",
      "day_of_week": "saturday",
      "topic": "ハードウェア・ガジェット",
      "youtube_video_id": "abcXYZ123",
      "youtube_url": "https://youtu.be/abcXYZ123",
      "script": "こんにちは、Rootech Radioの須藤です...(原稿全文、数千文字)",
      "sources": [],
      "published_at": "2026-08-29T04:00:00+00:00"
    }
  ],
  "count": 2
}
```

- **平日は`episodes`が1件、土曜は2件になりうる。UIは配列を前提にループで表示すること**
  (例: 1件なら1ブロック、2件ならタブや縦並びで両方表示)
- `sources` は原稿の元になったニュース記事のタイトルとURL一覧。**「参考文献」として、
  各エピソードの原稿の下に一覧表示すること**(番組内で触れた記事に、リスナーが直接
  アクセスできるようにするのが目的)。空配列の場合もあるので、その場合は参考文献
  セクション自体を非表示にする。
- `youtube_video_id` を使って埋め込みiframeのURLを組み立てる:
  `https://www.youtube.com/embed/{youtube_video_id}`
- `script` は改行を含むプレーンテキスト(Markdown記法は除去済み)。長文(3000〜9000文字程度)
  なので、レイアウトは縦に長くなる前提で組むこと。
- まだ当日分が生成されていない時間帯は `404` が返る
  (`{"error": "本日のエピソードはまだありません", "episodes": []}`)。この場合の
  フォールバック表示(「本日の配信をお待ちください」等)を用意すること。

## 実装イメージ(参考、縛りではない)

```jsx
// 例: src/App.jsx
function App() {
  const [episodes, setEpisodes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/today`)
      .then(res => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then(data => setEpisodes(data.episodes))
      .catch(() => setError(true));
  }, []);

  if (error) return <NoEpisodeYet />;
  if (!episodes) return <Loading />;

  return (
    <div>
      {episodes.map(episode => (
        <EpisodeBlock key={episode.id} episode={episode} />
      ))}
    </div>
  );
}

function EpisodeBlock({ episode }) {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${episode.youtube_video_id}`}
        allowFullScreen
      />
      <h2>{episode.topic}</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{episode.script}</p>
      {episode.sources?.length > 0 && (
        <section>
          <h3>参考文献</h3>
          <ul>
            {episode.sources.map((s, i) => (
              <li key={i}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
```

デザイン・コンポーネント分割・スタイリング手法は自由。既存の `src/` の作法があればそれに合わせる。

## デプロイ

Firebase Hosting にデプロイ済み設定がある(`firebase.json` 等がリポジトリに含まれるはず)。

```bash
npm install
npm run build
firebase deploy --only hosting
```

公開URL: `https://rootechradio.web.app`

## 番組の世界観(コピーやデザインの参考)

- 番組名: **Rootech Radio(ルーテックラジオ)**
- パーソナリティ: **須藤**(一人語り。"sudo" にかけた名前)
- トーン: エンジニア向け、カジュアルだが技術的に深い内容
- 背景画像イメージ: 暖色系・イラスト調・「机の上にラジオと観葉植物、ノートPC」という
  アットホームな配色(動画のサムネイル/背景で使用しているテイスト。参考程度)

## 追加タスク: 感想・要望フォーム

ページ内(トップまたはフッター付近)に、リスナーが感想・要望を送れるフォームを設置する。

### API

```bash
gcloud run services describe radio-feedback-api --region us-central1 --format='value(status.url)'
```
(認証不要、CORS設定済みなので直接fetchできる)

**POST** リクエストのみ対応:

```json
{
  "message": "感想・要望の本文(必須)",
  "name": "お名前(任意)",
  "episode_id": "対象エピソードのID(任意、表示中のエピソードの episode.id を渡す)"
}
```

成功時レスポンス: `{"status": "success", "id": "..."}`(200)
失敗時: `{"error": "..."}`(400 / 429 / 405)

- 送信元IPアドレスはAPI側で自動記録している(不適切投稿の追跡用、フロントエンドで
  意識する必要はない)
- **同一IPから60秒以内に3件を超える投稿はAPI側で自動的に拒否(429)される**。
  フロントエンド側でも連投を防ぐため、送信ボタンは送信中に無効化するなど配慮すること
- フォーム項目: 「感想・要望」(複数行テキスト、必須)、「お名前」(任意)。
  シンプルな1画面フォームでよい。送信後は完了メッセージを表示する
- 個人情報(メールアドレスなど)は収集しない設計。名前も任意入力なので、
  「名無しさん」的な扱いになる想定でよい

### 実装イメージ

```jsx
async function handleSubmit(message, name) {
  const res = await fetch(FEEDBACK_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, name }),
  });
  if (res.ok) {
    // 送信完了表示
  } else {
    const body = await res.json();
    // body.error を表示(429ならしばらく待つよう案内)
  }
}
```

## 追加タスク: チャンネル登録ボタン

ページ内(トップ、動画の近く)にYouTube公式のチャンネル登録ウィジェットを設置。

```html
<div class="g-ytsubscribe" data-channelid="UCyjTSKLiCrw8kmd3kBVCiBQ" data-layout="full" data-count="default"></div>
<script src="https://apis.google.com/js/platform.js"></script>
```

チャンネルID `UCyjTSKLiCrw8kmd3kBVCiBQ` で実装済み(`src/components/SubscribeButton.tsx`)。
SPAのためウィジェットのdivがDOMに存在してから`platform.js`を読み込む(または
既存スクリプトに`gapi.ytsubscribe.go()`で再スキャンさせる)実装にしている。

## 今回のスコープ外(将来の拡張。触れなくてよい)

- 過去回一覧・アーカイブページ
- 有料会員限定コンテンツ(検討中、未着手)
- 配信通知機能(検討中、未着手)
- ユーザー認証・ログイン
- 支援・投げ銭ボタン(再生数が増えてから検討予定、現時点では未着手)
