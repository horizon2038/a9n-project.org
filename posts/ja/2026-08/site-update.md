---
title: 'A9N Project websiteを更新しました'
date: '2026-08-19T12:00:00+09:00'
tags: ['project', 'website']
summary: 'A9N Microkernelと関連Projectの情報，Document，Newsを掲載するwebsiteへ更新しました．'
---

## 変更内容

A9N Project websiteを更新しました．

今回の更新では，A9N Microkernelを中心に，次の情報を整理しています．

- A9N Microkernelの概要と設計
- A9N Projectを構成する各Repository
- SPENCERを使った標準構成のBuild手順
- A9N Manualと関連Document
- 日本語版と英語版のNews

## Newsの投稿方法

News記事はMarkdownで管理します．Front matterには記事名，公開日時，タグ，要約を記述します．記事は静的Page，タグ別一覧，RSS Feedへ反映されます．

```yaml
---
title: '記事名'
date: '2026-08-19T12:00:00+09:00'
tags: ['project']
summary: '記事の要約'
---
```

技術仕様の詳細は[A9N Manual](https://github.com/horizon2038/A9N/tree/develop/doc/a9n-manual)を参照してください．
