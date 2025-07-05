# Multi Chat App 🧠

リアルタイムマルチチャットアプリケーション - 複数のチャットルームに同時参加できるWebアプリ

## 機能

- ✅ ユーザー認証（簡易ログイン）
- ✅ 複数チャットルームへの同時参加
- ✅ リアルタイムメッセージング
- ✅ ユーザープレゼンス表示
- ✅ タイピングインジケーター
- ✅ メッセージ履歴の保持
- ✅ レスポンシブデザイン（2画面/3画面/6画面レイアウト）

## 技術スタック

### フロントエンド
- React 18
- Socket.IO Client
- Tailwind CSS
- Vite

### バックエンド
- Node.js
- Express
- Socket.IO
- メモリ内データストレージ

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動

#### 方法1: フロントエンドとバックエンドを同時起動
```bash
npm run dev:full
```

#### 方法2: 個別起動
```bash
# バックエンドサーバー起動（ターミナル1）
npm run server

# フロントエンド開発サーバー起動（ターミナル2）
npm run dev
```

### 3. アプリケーションアクセス
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:3001

## 使用方法

1. **ログイン**: ユーザー名を入力してチャットに参加
2. **ルーム参加**: 各パネルでルームIDを入力して参加
3. **チャット**: 複数のルームで同時にチャットが可能
4. **レイアウト変更**: 画面上部で2画面/3画面/6画面を選択

## ファイル構成

```
multi-chat-app/
├── server/
│   └── index.js                 # Socket.IOサーバー
├── src/
│   ├── components/
│   │   ├── ChatPanel.jsx        # チャットパネルコンポーネント
│   │   └── LoginForm.jsx        # ログインフォーム
│   ├── App.jsx                  # メインアプリケーション
│   ├── main.jsx                 # エントリーポイント
│   └── index.css                # スタイル
├── public/
│   └── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## API仕様

### Socket.IOイベント

#### クライアント → サーバー
- `join-room`: ルームに参加
- `leave-room`: ルームから退出
- `send-message`: メッセージ送信
- `typing`: タイピング状態送信
- `get-rooms`: ルーム一覧取得

#### サーバー → クライアント
- `room-joined`: ルーム参加完了
- `new-message`: 新しいメッセージ
- `user-joined`: ユーザー参加通知
- `user-left`: ユーザー退出通知
- `room-users`: ルーム内ユーザー一覧
- `user-typing`: タイピング状態通知
- `rooms-list`: ルーム一覧

## カスタマイズ

### レイアウト追加
`src/App.jsx`の`gridClass`オブジェクトにレイアウトを追加：

```javascript
const gridClass = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  // 新しいレイアウトを追加
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
}[layout];
```

### データベース永続化
現在はメモリ内でデータを保持しています。永続化するには：

1. データベース（MongoDB、PostgreSQLなど）をセットアップ
2. `server/index.js`のデータストレージ部分を置き換え
3. メッセージとルーム情報をデータベースに保存

## トラブルシューティング

### ポート競合
- フロントエンド（5173）やバックエンド（3001）のポートが使用中の場合は、`vite.config.js`や`server/index.js`でポート番号を変更

### CORS エラー
- `server/index.js`のCORS設定を環境に合わせて調整

### 接続エラー
- バックエンドサーバーが起動していることを確認
- `src/App.jsx`のSocket.IO接続URLが正しいことを確認

## ライセンス

MIT License

## 作成者

ウィズネス・テクノロジー