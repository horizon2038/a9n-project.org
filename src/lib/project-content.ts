import type { ProjectSlug } from "@/lib/project-manifest";
import type { Locale } from "@/lib/site";

export type ProjectScreenshotCopy = {
  alt: string;
  caption: string;
};

export type ProjectContent = {
  kind: string;
  description: string;
  overview: readonly string[];
  provides: readonly string[];
  role: string;
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
      kind: "Microkernel / Micro-hypervisor",
      description: "Capabilityに基づく権限管理，極めて高速なIPC，HALを備える第3世代マイクロカーネル／マイクロハイパーバイザです．A9N Projectのコアです．",
      overview: [
        "A9Nは，Capabilityに基づくObject Interfaceと極めて高速なIPC性能を備える第3世代Microkernelです．KernelはSystemの実行と保護に必要なMechanismを提供し，OS固有のPolicyをUser levelに置きます．",
        "Hardware依存部分はHALへ分離されています．公開実装ではx86_64 Long Modeに対応しています．",
      ],
      provides: [
        "Capabilityに基づくKernel ObjectのAuthority管理",
        "ProcessとAddress Spaceの管理",
        "極めて高速なIPC，Notification，Fault，Interrupt配送",
        "Architecture固有処理を分離するHAL",
      ],
      role: "A9N Projectの中核です．Bootloader，Rust Interface，Runtime，User-space OS，Build SystemはA9NのInterfaceと実行環境を前提として構成されます．",
      facts: [
        { label: "実装", value: "C++，C，Assembly" },
        { label: "対応Architecture", value: "x86_64 Long Mode" },
        { label: "Source構成", value: "Kernel，HAL，liba9n" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    nanami: {
      kind: "User-space Operating System",
      description: "A9N Microkernel上に構築される実験的なUser-space OSです．Driver，File System，Network，Graphics，User-level OS Compatible LayerであるAlterを分離されたUser Processとして実装します．",
      overview: [
        "NanamiはA9N Microkernel上に構築される実験的なUser-space OSです．OS Policy，Driver，File System，Network，Graphics，User-level OS Compatible LayerであるAlterを，CapabilityとIPCで接続された個別のUser Processとして実装します．",
        "最初のUser ProcessであるAlphaがMemory，Process，Service Discoveryなどを管理し，SPENCERがA9N，A9NLoader-rs，NanamiをBoot可能なUEFI Imageへ統合します．",
      ],
      provides: [
        "User-space DriverとSubsystem Server",
        "ext2 Root File SystemとService Manifest",
        "IPv4 Network StackとSocket Service",
        "Honoka DesktopとGraphical Shell",
        "User-level OS Compatible LayerであるAlter",
      ],
      role: "A9N上で実際のOS ServiceとApplication環境を構成するProjectです．KernelへPolicyを追加せず，Microkernel上でどこまでSystemを構築できるかを実装として示します．",
      facts: [
        { label: "主な実装言語", value: "Rust" },
        { label: "対応Target", value: "x86_64，QEMU／UEFI" },
        { label: "Runtime", value: "Nun" },
        { label: "状態", value: "開発中，Interface変更の可能性あり" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "honoka-desktop": {
          alt: "Honoka Desktop上でNanami Shellを表示している画面",
          caption: "Honoka Desktop：基本的なDesktop環境とShell．",
        },
        "graphical-applications": {
          alt: "Honoka Desktop上でShell，embedded-gfx Demo，Image Viewerを起動している画面",
          caption: "Graphical Applications：複数のGUI Applicationを起動した状態．",
        },
        "alter-demo": {
          alt: "Alter/Linux上でBash，BusyBoxのuname，DOOMを無改変Linux Binaryとして実行している画面",
          caption: "Alter Demo：AlterのLinux互換LayerであるAlter/Linux上でBashを起動し，BusyBoxのunameとDOOMを実行．いずれも無改変のLinux Binaryです．",
        },
      },
    },
    nun: {
      kind: "User-level Runtime",
      description: "A9N上でRust製User-level Initを構築するためのno_std Runtimeです．Entry，IPC Buffer初期化，Debug出力を提供します．",
      overview: [
        "Nunは，A9N Microkernelを利用するOSとUser-level InitをRustで構築するためのRuntimeです．no_std／no_main環境のEntry設定と，A9N Interfaceを利用するための基礎を提供します．",
      ],
      provides: [
        "User-level ProgramのEntry Macro",
        "Init Infoの受け渡し",
        "IPC Bufferの初期化",
        "Debug出力と最小Runtime",
      ],
      role: "低水準なKernel ABIとOS実装の間に位置します．a9n_typesとa9n_abiを利用し，Rust製InitやNanami OSが共通の起動処理を再利用できるようにします．",
      facts: [
        { label: "実装言語", value: "Rust" },
        { label: "実行環境", value: "no_std / no_main" },
        { label: "依存", value: "a9n_types，a9n_abi" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    "a9n-abi": {
      kind: "Kernel Call Interface",
      description: "User ModeからA9Nを呼び出すためのRust crateです．Kernel CallとCapability Operationの低水準Interfaceを提供します．",
      overview: [
        "a9n_abiは，Rust製User-level SoftwareからA9N Microkernelを呼び出すためのABI定義を提供するcrateです．Kernelとの境界にあるCalling ConventionとLayoutを集約します．",
      ],
      provides: [
        "Kernel Call Number",
        "Capability Operation Type",
        "Message Register Layout",
        "低水準Calling Convention",
      ],
      role: "A9NのKernel InterfaceをRustから利用できる形に固定します．Nunなどの上位Runtimeはこのcrateを通してKernel Callを実行します．",
      facts: [
        { label: "形式", value: "Rust crate" },
        { label: "依存", value: "a9n_types" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    "a9n-types": {
      kind: "Shared Types",
      description: "Capability Descriptor，Message Info，Init Infoなど，Kernel境界を越えて共有する型を定義するno_std Rust crateです．",
      overview: [
        "a9n_typesは，A9N Microkernel Ecosystemで共有するArchitecture非依存の型を定義するRust crateです．KernelとUser levelの両側で同じData表現を利用するための基礎になります．",
      ],
      provides: [
        "CapabilityとDescriptorの型",
        "IPC Message Format",
        "Error表現",
        "Kernel／User間で共有するData Structure",
      ],
      role: "A9N Interfaceの最も基礎的な型定義を保持します．a9n_abiとNunはこのcrateに依存し，重複したABI型の定義を避けます．",
      facts: [
        { label: "形式", value: "Rust crate" },
        { label: "対象", value: "Architecture非依存" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    "a9nloader-rs": {
      kind: "Bootloader",
      description: "A9N Boot Protocolを実装するRust製Bootloaderです．KernelとInitを読み込み，Boot情報とともにA9Nへ制御を渡します．",
      overview: [
        "A9NLoader-rsは，x86_64向けA9N Boot Protocolを実装するRust製Bootloaderです．従来のC／EDK2製A9NLoaderをRustで全面的に書き直した実装です．",
      ],
      provides: [
        "A9N Kernel ELFのLoad",
        "最初のUser-level ExecutableのLoad",
        "Boot情報の構築と受け渡し",
        "QEMUを利用した単体Test手順",
      ],
      role: "Firmware環境からA9N MicrokernelのEntryへ接続します．SPENCERの標準構成では，KernelとInitを含むUEFI Disk Imageの起動を担当します．",
      facts: [
        { label: "実装言語", value: "Rust" },
        { label: "Protocol", value: "A9N Boot Protocol x86_64" },
        { label: "入力", value: "kernel.elf，init.elf" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "boot-sequence": {
          alt: "A9NLoader-rsがA9N KernelとInitを読み込み，Memory Mapを準備しているQEMU画面",
          caption: "A9NLoader-rs：A9N KernelとInitを読み込み，Boot情報を準備している画面．",
        },
      },
    },
    spencer: {
      kind: "Build System / OSKit",
      description: "A9N，A9NLoader-rs，Nunを統合し，Build，Disk Image生成，QEMU実行をまとめて扱うToolKitです．",
      overview: [
        "SPENCERは，A9N Microkernel，Nun Runtime，A9NLoader-rsを一つのBuild Interfaceへ統合するOS構築Systemです．cargo xtaskからComponentのBuild，UEFI Disk Image生成，QEMU実行，GDB接続を扱います．",
      ],
      provides: [
        "統一されたBuild／Run Command",
        "Boot可能なUEFI Disk Image生成",
        "QEMU実行とGDB Debug",
        "外部OS Payloadの組み込み",
      ],
      role: "独立したRepositoryを再現可能な標準構成へまとめます．A9N単体のBuildではなく，Kernel，Loader，User Payloadを含む実行可能なSystemを生成します．",
      facts: [
        { label: "Build Interface", value: "cargo xtask" },
        { label: "対応Architecture", value: "x86_64" },
        { label: "対応Platform", value: "QEMU" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "build-and-run": {
          alt: "SPENCERがA9NとA9NLoader-rsをBuildし，QEMU上でA9NとNun Initを起動するTerminal操作",
          caption: "SPENCER Demo：cargo xtaskによるA9NとA9NLoader-rsのBuildから，QEMU上でのA9NとNun Initの起動まで．",
        },
      },
    },
  },
  en: {
    a9n: {
      kind: "Microkernel / Micro-hypervisor",
      description: "The core of the A9N Project: a third-generation capability-based microkernel and micro-hypervisor with exceptionally fast IPC and a HAL.",
      overview: [
        "A9N is a third-generation microkernel with a capability-based object interface and exceptionally fast IPC. The kernel provides the mechanisms required for execution and protection while OS policy remains at user level.",
        "Hardware-dependent code is separated into the HAL. The public implementation currently supports x86_64 Long Mode.",
      ],
      provides: [
        "Capability-based authority over kernel objects",
        "Process and address-space management",
        "Exceptionally fast IPC, notifications, faults, and interrupt delivery",
        "A HAL separating architecture-specific operations",
      ],
      role: "A9N is the core of the project. The bootloader, Rust interfaces, runtime, user-space OS, and build system are composed around its interfaces and execution environment.",
      facts: [
        { label: "Implementation", value: "C++, C, and assembly" },
        { label: "Supported architecture", value: "x86_64 Long Mode" },
        { label: "Source components", value: "Kernel, HAL, and liba9n" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    nanami: {
      kind: "User-space Operating System",
      description: "An experimental user-space OS built on A9N. Drivers, filesystems, networking, graphics, and the Alter User-level OS Compatible Layer run as isolated user processes.",
      overview: [
        "Nanami is an experimental user-space OS built on A9N Microkernel. OS policy, drivers, filesystems, networking, graphics, and the Alter User-level OS Compatible Layer are implemented as separate user processes connected through capabilities and IPC.",
        "Alpha, the initial user process, manages memory, processes, and service discovery. SPENCER integrates Nanami with A9N and A9NLoader-rs into a bootable UEFI image.",
      ],
      provides: [
        "User-space drivers and subsystem servers",
        "An ext2 root filesystem and service manifests",
        "IPv4 networking and socket services",
        "The Honoka desktop and graphical shell",
        "Alter User-level OS Compatible Layer",
      ],
      role: "Nanami composes operating-system services and an application environment on A9N. It demonstrates how a complete system can be built above the microkernel without moving policy into the kernel.",
      facts: [
        { label: "Primary language", value: "Rust" },
        { label: "Supported target", value: "x86_64, QEMU/UEFI" },
        { label: "Runtime", value: "Nun" },
        { label: "Status", value: "Active development, interfaces may change" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "honoka-desktop": {
          alt: "Nanami Shell running on the Honoka desktop",
          caption: "Honoka Desktop: the basic desktop environment and shell.",
        },
        "graphical-applications": {
          alt: "Shell windows, an embedded-gfx demo, and an image viewer running on the Honoka desktop",
          caption: "Graphical Applications: several GUI applications running together.",
        },
        "alter-demo": {
          alt: "Unmodified Bash, BusyBox uname, and DOOM Linux binaries running through Alter/Linux",
          caption: "Alter Demo: Bash starts through Alter/Linux, the Linux-compatible implementation of the Alter User-level OS Compatible Layer, and runs BusyBox uname and DOOM. All three are unmodified Linux binaries.",
        },
      },
    },
    nun: {
      kind: "User-level Runtime",
      description: "A no_std runtime for building Rust user-level Init programs on A9N. It provides entry setup, IPC buffer initialization, and debug output.",
      overview: [
        "Nun is a runtime for building operating systems and user-level Init programs for A9N Microkernel in Rust. It provides entry setup for no_std/no_main programs and the foundation required to use A9N interfaces.",
      ],
      provides: [
        "An entry macro for user-level programs",
        "Init information delivery",
        "IPC buffer initialization",
        "Debug output and a minimal runtime",
      ],
      role: "Nun sits between the low-level kernel ABI and operating-system implementations. It uses a9n_types and a9n_abi so Rust Init programs and Nanami OS can share common startup support.",
      facts: [
        { label: "Language", value: "Rust" },
        { label: "Environment", value: "no_std / no_main" },
        { label: "Dependencies", value: "a9n_types and a9n_abi" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    "a9n-abi": {
      kind: "Kernel Call Interface",
      description: "A Rust crate that provides the low-level kernel-call and capability-operation interface used to call A9N from user mode.",
      overview: [
        "a9n_abi is a Rust crate containing ABI definitions for calling A9N Microkernel from user-level software. It centralizes the calling conventions and layouts at the kernel boundary.",
      ],
      provides: [
        "Kernel-call numbers",
        "Capability-operation types",
        "Message-register layouts",
        "Low-level calling conventions",
      ],
      role: "It fixes the A9N kernel interface in a form usable from Rust. Higher-level runtimes such as Nun issue kernel calls through this crate.",
      facts: [
        { label: "Type", value: "Rust crate" },
        { label: "Dependency", value: "a9n_types" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    "a9n-types": {
      kind: "Shared Types",
      description: "A no_std Rust crate defining values shared across the kernel boundary, including capability descriptors, message information, and Init information.",
      overview: [
        "a9n_types is a Rust crate defining common architecture-independent types for the A9N Microkernel ecosystem. It provides shared data representations for both sides of the kernel boundary.",
      ],
      provides: [
        "Capability and descriptor types",
        "IPC message formats",
        "Error representations",
        "Data structures shared by kernel and user level",
      ],
      role: "It holds the foundational type definitions for A9N interfaces. a9n_abi and Nun depend on this crate to avoid duplicating ABI types.",
      facts: [
        { label: "Type", value: "Rust crate" },
        { label: "Scope", value: "Architecture-independent" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {},
    },
    "a9nloader-rs": {
      kind: "Bootloader",
      description: "A Rust bootloader implementing the A9N Boot Protocol. It loads the kernel and Init, then transfers control to A9N with boot information.",
      overview: [
        "A9NLoader-rs is a Rust bootloader implementing the x86_64 A9N Boot Protocol. It is a complete Rust rewrite of the original C/EDK2 A9NLoader.",
      ],
      provides: [
        "Loading the A9N kernel ELF",
        "Loading the initial user-level executable",
        "Constructing and passing boot information",
        "A standalone QEMU test workflow",
      ],
      role: "It connects the firmware environment to the A9N Microkernel entry point. In the standard SPENCER composition, it boots the UEFI disk image containing the kernel and Init.",
      facts: [
        { label: "Language", value: "Rust" },
        { label: "Protocol", value: "A9N Boot Protocol x86_64" },
        { label: "Inputs", value: "kernel.elf and init.elf" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "boot-sequence": {
          alt: "QEMU showing A9NLoader-rs loading the A9N kernel and Init and preparing the memory map",
          caption: "A9NLoader-rs: loading the A9N kernel and Init and preparing the boot information.",
        },
      },
    },
    spencer: {
      kind: "Build System / OSKit",
      description: "A toolkit integrating A9N, A9NLoader-rs, and Nun into one build, disk-image generation, and QEMU execution workflow.",
      overview: [
        "SPENCER is an OS construction system integrating A9N Microkernel, the Nun runtime, and A9NLoader-rs behind one build interface. Its cargo xtask commands cover component builds, UEFI disk-image generation, QEMU execution, and GDB attachment.",
      ],
      provides: [
        "Unified build and run commands",
        "Bootable UEFI disk-image generation",
        "QEMU execution and GDB debugging",
        "External OS payload integration",
      ],
      role: "It combines independent repositories into a reproducible standard composition. Rather than building A9N alone, it produces a runnable system containing the kernel, loader, and user payload.",
      facts: [
        { label: "Build interface", value: "cargo xtask" },
        { label: "Supported architecture", value: "x86_64" },
        { label: "Supported platform", value: "QEMU" },
        { label: "License", value: "MIT" },
      ],
      screenshotText: {
        "build-and-run": {
          alt: "Terminal session in which SPENCER builds A9N and A9NLoader-rs and boots A9N with Nun Init in QEMU",
          caption: "SPENCER demo: cargo xtask builds A9N and A9NLoader-rs, then boots A9N with Nun Init in QEMU.",
        },
      },
    },
  },
};
