import type { ProjectSlug } from "@/lib/project-manifest";
import type { Locale } from "@/lib/site";

export type ProjectScreenshotCopy = {
  alt: string;
  caption: string;
};

export type ProjectContent = {
  kind: string;
  description: string;
  notes: readonly string[];
  provides: readonly string[];
  facts: readonly {
    label: string;
    value: string;
  }[];
  screenshotText: Readonly<Record<string, ProjectScreenshotCopy>>;
};

type ProjectContentMap = Record<ProjectSlug, ProjectContent>;

export const projectContent: Record<Locale, ProjectContentMap> = {
  ja: {
    a9n: {
      kind: "Microkernel",
      description: "第3世代のCapability-based Microkernelです．",
      provides: [
        "Capabilityによる権限管理",
        "プロセス・アドレス空間・スケジューリング",
        "IPC，Notification，Fault，割り込み配送",
        "ハードウェア依存コードを分離したHAL",
      ],
      facts: [
        { label: "実装", value: "C++，C，Assembly" },
        { label: "対応アーキテクチャ", value: "x86_64 Long Mode，AArch64" },
        { label: "AArch64の構成", value: "ARMv8-A，GICv2" },
        { label: "対応プラットフォーム", value: "pc99（x86_64），QEMU（x86_64／AArch64），Raspberry Pi 4 Model B（rpi4b）" },
        { label: "ソース構成", value: "kernel，hal，liba9n" },
        { label: "ライセンス", value: "MIT" },
      ],
      screenshotText: {},
      notes: [],
    },
    nanami: {
      kind: "User-space Operating System",
      description: "A9N Microkernel上の実験的なユーザー空間OSです．",
      provides: [
        "プロセス・メモリ管理サービスAlpha",
        "AHCI，virtio，USB xHCIドライバ",
        "ext2，IPv4，POSIXサービス",
        "デスクトップ環境Honokaとネイティブアプリ",
        "Linux・FreeBSD向けバイナリの実行（Alter/）",
        "Rust／C++のアプリ開発用SDK",
      ],
      facts: [
        { label: "主な実装言語", value: "Rust" },
        { label: "x86_64", value: "QEMU／UEFI，対応する実機" },
        { label: "AArch64", value: "QEMU virt／U-Boot，ヘッドレス構成" },
        { label: "AArch64の制限", value: "ネイティブのタイマ・画面・入力・ネットワークは未対応" },
        { label: "ランタイム", value: "Nun（Rust）" },
        { label: "状態", value: "開発中，ABIとサービスプロトコルは変更される可能性があります" },
        { label: "ライセンス", value: "MIT" },
      ],
      screenshotText: {
        "honoka-desktop": {
          alt: "HonokaデスクトップでNanamiのシェルを表示した画面",
          caption: "Honokaデスクトップ．",
        },
        "graphical-applications": {
          alt: "Honoka上でシェル，embedded-gfxのデモ，画像ビューアを起動した画面",
          caption: "シェル，デモ，画像ビューア．",
        },
        "alter-demo": {
          alt: "Alter/LinuxでBash，BusyBoxのuname，DOOMを実行した画面",
          caption: "Alter/Linuxで動く無改変のBash，BusyBox，DOOM．",
        },
      },
      notes: [],

    },
    nun: {
      kind: "User-level Runtime",
      description: "A9N向けのRustランタイムです．",
      provides: [
        "entry!マクロでの起動とInitInfoの受け渡し",
        "IPCバッファのTLS設定",
        "デバッグ出力とパニック処理",
        "x86_64／AArch64のターゲット定義とリンカスクリプト",
      ],
      facts: [
        { label: "実装言語", value: "Rust" },
        { label: "実行環境", value: "no_std / no_main" },
        { label: "対応アーキテクチャ", value: "x86_64，AArch64" },
        { label: "直接の依存", value: "a9n_abi 0.8.0" },
        { label: "ライセンス", value: "MIT" },
      ],
      screenshotText: {},
      notes: [],
    },
    "a9n-abi": {
      kind: "Kernel Call Interface",
      description: "A9Nのカーネル呼び出しを提供するRust crateです．",
      provides: [
        "カーネル呼び出しとCapability操作",
        "メッセージレジスタとIPCバッファ",
        "アクセス権限とNormal・Buffered・Uncachedのメモリ属性",
      ],
      facts: [
        { label: "形式", value: "no_std Rust crate" },
        { label: "対応feature", value: "x86_64（既定），aarch64" },
        { label: "依存", value: "a9n-types 0.4.0，bitflags 2" },
        { label: "ライセンス", value: "MIT" },
      ],
      screenshotText: {},
      notes: [
        "BufferedとUncachedは同時に指定できません．",
      ],
    },
    "a9n-types": {
      kind: "Shared Types",
      description: "A9Nの共通型を定義するRust crateです．",
      provides: [
        "Capabilityの記述子とエラー型",
        "MessageInfoとIpcBuffer",
        "InitInfo（カーネルバージョン，アーキテクチャ，コア数，初期メモリなど）",
      ],
      facts: [
        { label: "形式", value: "no_std Rust crate" },
        { label: "対象", value: "アーキテクチャ非依存" },
        { label: "依存", value: "外部crateへの依存なし" },
        { label: "ライセンス", value: "MIT" },
      ],
      screenshotText: {},
      notes: [],
    },
    "a9nloader-rs": {
      kind: "Bootloader",
      description: "A9Nを起動するx86_64 UEFIブートローダです．",
      provides: [
        "カーネルとInitのELF読み込み",
        "メモリマップなどの起動情報の受け渡し",
        "QEMUでの起動テスト",
      ],
      facts: [
        { label: "実装言語", value: "Rust" },
        { label: "起動環境", value: "x86_64 UEFI" },
        { label: "プロトコル", value: "A9N Boot Protocol x86_64" },
        { label: "入力", value: "kernel.elf，init.elf" },
        { label: "ライセンス", value: "MIT" },
      ],
      screenshotText: {
        "boot-sequence": {
          alt: "A9NLoader-rsがカーネルとInitを読み込み，メモリマップを準備しているQEMU画面",
          caption: "カーネルとInitの読み込み．",
        },
      },
      notes: [],
    },
    spencer: {
      kind: "Build / Image / Run",
      description: "A9Nのビルド，イメージ生成，QEMU実行をまとめるツールです．",
      provides: [
        "A9N・Nun・ブートローダのビルド",
        "UEFI／U-Bootイメージの生成",
        "QEMU実行，SMP設定，GDBデバッグ",
        "Nanamiなどの外部OSの組み込み",
      ],
      facts: [
        { label: "コマンド", value: "cargo xtask" },
        { label: "対応アーキテクチャ", value: "x86_64，AArch64" },
        { label: "対応プラットフォーム", value: "QEMU，Raspberry Pi 4 Model B" },
        { label: "Rustツールチェーン", value: "nightly-2026-03-25" },
        { label: "ライセンス", value: "MIT" },
      ],
      screenshotText: {
        "build-and-run": {
          alt: "SPENCERでA9NとA9NLoader-rsをビルドし，QEMUでNun Initを起動するターミナル操作",
          caption: "ビルドとQEMU起動．",
        },
      },
      notes: [],
    },
  },
  en: {
    a9n: {
      kind: "Microkernel",
      description: "A third-generation Capability-based Microkernel.",
      provides: [
        "Capability-based access control",
        "Processes, address spaces, and scheduling",
        "IPC, notifications, faults, and interrupts",
        "Hardware abstraction through the HAL",
      ],
      facts: [
        { label: "Implementation", value: "C++, C, and assembly" },
        { label: "Architectures", value: "x86_64 Long Mode, AArch64" },
        { label: "AArch64 configuration", value: "ARMv8-A, GICv2" },
        { label: "Platforms", value: "pc99 (x86_64), QEMU (x86_64/AArch64), Raspberry Pi 4 Model B (rpi4b)" },
        { label: "Source components", value: "kernel, hal, liba9n" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
      notes: [],
    },
    nanami: {
      kind: "User-space Operating System",
      description: "An experimental user-space OS on the A9N Microkernel.",
      provides: [
        "Alpha service for process and memory management",
        "AHCI, virtio, and USB xHCI drivers",
        "ext2, IPv4, and POSIX services",
        "Honoka desktop environment and native applications",
        "Linux and FreeBSD binary execution through Alter/",
        "Rust and C++ application SDKs",
      ],
      facts: [
        { label: "Primary language", value: "Rust" },
        { label: "x86_64", value: "QEMU/UEFI and supported hardware" },
        { label: "AArch64", value: "QEMU virt/U-Boot, headless" },
        { label: "AArch64 limits", value: "No native timer, display, input, or network stack yet" },
        { label: "Runtime", value: "Nun (Rust)" },
        { label: "Status", value: "Active development; ABI and service protocols may change" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "honoka-desktop": {
          alt: "Nanami Shell running on the Honoka desktop",
          caption: "Honoka desktop.",
        },
        "graphical-applications": {
          alt: "Shell windows, an embedded-gfx demo, and an image viewer running on the Honoka desktop",
          caption: "Shell, graphics demo, and image viewer.",
        },
        "alter-demo": {
          alt: "Unmodified Bash, BusyBox uname, and DOOM Linux binaries running through Alter/Linux",
          caption: "Unmodified Bash, BusyBox, and DOOM through Alter/Linux.",
        },
      },
      notes: [],

    },
    nun: {
      kind: "User-level Runtime",
      description: "A Rust runtime for A9N.",
      provides: [
        "entry! macro and InitInfo delivery",
        "Thread-local IPC buffer setup",
        "Debug output and panic handling",
        "x86_64 and AArch64 targets and linker scripts",
      ],
      facts: [
        { label: "Language", value: "Rust" },
        { label: "Environment", value: "no_std / no_main" },
        { label: "Architectures", value: "x86_64, AArch64" },
        { label: "Direct dependency", value: "a9n_abi 0.8.0" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
      notes: [],
    },
    "a9n-abi": {
      kind: "Kernel Call Interface",
      description: "A Rust crate for A9N kernel calls.",
      provides: [
        "Kernel calls and capability operations",
        "Message registers and IPC buffers",
        "Access permissions and Normal, Buffered, or Uncached memory attributes",
      ],
      facts: [
        { label: "Type", value: "no_std Rust crate" },
        { label: "Features", value: "x86_64 (default), aarch64" },
        { label: "Dependencies", value: "a9n-types 0.4.0, bitflags 2" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
      notes: [
        "Buffered and Uncached cannot be combined.",
      ],
    },
    "a9n-types": {
      kind: "Shared Types",
      description: "Shared A9N types for Rust.",
      provides: [
        "Capability descriptors and error types",
        "MessageInfo and IpcBuffer",
        "InitInfo: kernel version, architecture, core count, initial memory, and other boot data",
      ],
      facts: [
        { label: "Type", value: "no_std Rust crate" },
        { label: "Scope", value: "Architecture-independent" },
        { label: "Dependencies", value: "No external crates" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
      notes: [],
    },
    "a9nloader-rs": {
      kind: "Bootloader",
      description: "An x86_64 UEFI bootloader for A9N.",
      provides: [
        "Kernel and Init ELF loading",
        "Memory maps and boot information",
        "Standalone QEMU boot tests",
      ],
      facts: [
        { label: "Language", value: "Rust" },
        { label: "Boot environment", value: "x86_64 UEFI" },
        { label: "Protocol", value: "A9N Boot Protocol x86_64" },
        { label: "Inputs", value: "kernel.elf and init.elf" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "boot-sequence": {
          alt: "QEMU showing A9NLoader-rs loading the A9N kernel and Init and preparing the memory map",
          caption: "Loading the kernel and Init.",
        },
      },
      notes: [],
    },
    spencer: {
      kind: "Build / Image / Run",
      description: "Build A9N, generate disk images, and run them with QEMU.",
      provides: [
        "A9N, Nun, and bootloader builds",
        "UEFI and U-Boot images",
        "QEMU execution, SMP configuration, and GDB debugging",
        "External OS integration, including Nanami",
      ],
      facts: [
        { label: "Commands", value: "cargo xtask" },
        { label: "Architectures", value: "x86_64, AArch64" },
        { label: "Platforms", value: "QEMU, Raspberry Pi 4 Model B" },
        { label: "Rust toolchain", value: "nightly-2026-03-25" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "build-and-run": {
          alt: "Terminal session in which SPENCER builds A9N and A9NLoader-rs and boots A9N with Nun Init in QEMU",
          caption: "Build and boot with QEMU.",
        },
      },
      notes: [],
    },
  },
};
