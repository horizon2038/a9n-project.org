# a9n-project.org

A9N Project公式websiteのSourceです．Next.jsのstatic exportを使用します．

## Development

```sh
npm install
npm run dev
```

Production buildは`out/`へ出力されます．

```sh
npm run lint
npm run build
npm run check:links
```

## Languages

- 日本語: `/`
- English: `/en`

About，Projects，Getting Started，Documents，Newsは両言語で提供します．

表示構造は日英で共通です．Page Routeは`src/app/[[...path]]`へ統合し，Pathの先頭からLocaleを解決します．Componentに言語別の分岐や文章は置きません．

翻訳Dataは用途別に次の2箇所へ集約します．

- 共通PageとUI: `src/lib/i18n.ts`
- Project固有の文章: `src/lib/project-content.ts`

Project Dataは次の3層に分けています．

- `src/lib/project-manifest.ts`: Slug，Repository，関連Project，Screenshot Fileと寸法
- `src/lib/project-content.ts`: 日本語と英語の説明，Fact，ScreenshotのAltとCaption
- `src/lib/projects.ts`: Localeを指定して表示用Dataを組み立てるAPI

Projects一覧と各Projectの詳細Pageは，`src/lib/projects.ts`が返す同一構造のDataから静的生成します．

Screenshotは`project-manifest.ts`の各Projectに`screenshots`配列として追加できます．複数のScreenshotを登録でき，各Itemは一意な`id`を持ちます．同じ`id`の`alt`と`caption`を`project-content.ts`の日本語・英語双方へ追加して下さい．どちらかが欠けている場合はBuildが失敗します．Screenshotが0件の場合，詳細PageにSectionは表示されません．

## News

News原稿は`posts/ja`と`posts/en`へMarkdownとして追加します．対応する翻訳記事は同じslugを使います．

```markdown
---
title: '記事名'
date: '2026-08-19T12:00:00+09:00'
tags: ['project']
summary: '記事の要約'
---

本文
```

Build時に次のContentを静的生成します．

- News一覧と記事Page
- タグ別一覧
- Pagination
- `/feed.xml`と`/en/feed.xml`
- sitemap.xml
