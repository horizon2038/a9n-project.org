---
title: "A9N Microkernel v0.1.16をリリースしました"
date: '2026-08-25T16:45:31+09:00'
tags: ['kernel', 'update', 'release']
summary: 'A9N Microkernel v0.1.16のリリース'
---

## 変更内容

### SMP

- Experimentalなバージョンだったv0.2.0-smpをメインラインカーネルにマージし，SMP対応を正式にサポートしました．
  - ビルド時に`-DA9N_CONFIG_ENABLE_SMP`を指定することでSMP対応を有効化できます．
  - `process_control_block::configure`のAffinity設定を変更することで，プロセスが実行されるコアを指定できます．
  - Inter-CoreなIPC，Notificationが利用可能になりました．ただし，IPCのPathにIPIが介在するため，Intra-Coreなものよりも**非常に低速**となります．よって非推奨です．
    - Inter-Coreな通信にはShared MemoryとNotificationを組み合わせることを推奨します．

### HAL

- `configure_cycles(cycles)`が事実上無意味だった問題を修正しました
