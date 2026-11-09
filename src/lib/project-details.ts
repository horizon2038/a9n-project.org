import type { ProjectSlug } from "@/lib/project-manifest";
import type { Locale } from "@/lib/site";

export type ProjectSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  links: readonly { label: string; path: string }[];
};

type SectionCopy = Pick<ProjectSection, "title" | "paragraphs">;
type SectionDefinition = Pick<ProjectSection, "id" | "links"> & Record<Locale, SectionCopy>;

const definitions: Record<ProjectSlug, readonly SectionDefinition[]> = {
  a9n: [
    {
      id: "capability-design",
      ja: {
        title: "Capabilityを中心とした設計",
        paragraphs: [
          "A9Nは，プロセス，アドレス空間，通信ポートなどをCapabilityで操作する第3世代のCapability-based Microkernelです．Capabilityは対象のオブジェクトと操作権限を結び付けます．プロセスが到達できるCapabilityが権限の根拠となり，識別子の数値を知るだけでは操作できません．",
          "権限の委譲にはTake-Grant Modelを採用しています．ユーザー空間がCapabilityを配布し，カーネルが対象の型や操作に必要な権限を検査します．通常のカーネル呼び出しはCapability CallとYIELDに集約され，個々のオブジェクトの操作を共通の形式で扱えます．OSごとの資源配分やサービス構成はユーザー空間で決められます．",
        ],
      },
      en: {
        title: "A capability-oriented design",
        paragraphs: [
          "A9N is a third-generation Capability-based Microkernel. Processes, address spaces, and communication ports are objects accessed through capabilities, which combine a reference with authority. A process must hold a reachable capability to operate on an object; knowing a descriptor’s numeric value alone grants no access.",
          "A9N adopts the Take-Grant Model for authority delegation. User space distributes capabilities, while the kernel checks object types and the rights required by each operation. The regular kernel interface consists of Capability Call and YIELD, giving different objects a common invocation format. Resource allocation and service composition remain decisions for the user-space OS.",
        ],
      },
      links: [
        { label: "Manual: Introduction", path: "doc/a9n-manual/pages/introduction.typ" },
        { label: "Manual: Capability", path: "doc/a9n-manual/pages/capability.typ" },
      ],
    },
    {
      id: "ipc",
      ja: {
        title: "高速IPC",
        paragraphs: [
          "IPCはメッセージとCapabilityをプロセス間で転送します．短いメッセージにはレジスタを使い，収まらない部分にはIPCバッファを使います．要求と応答を組み合わせるCALL，応答と次の受信をまとめるREPLY_RECEIVEにより，サービス呼び出しの往復を構成できます．",
          "受信待ちのサーバがあり，それより優先度の高い実行可能プロセスがなければ，CALLからサーバへ直接切り替えます．通常のスケジューラ実行とReady Queueの探索を省略し，サーバが要求の処理を始めるまでの経路を短縮します．",
          "IPC内部の共通処理はC++20で記述しています．成功値とエラーをResult型にまとめ，処理を高階関数で連鎖させることで，正常系の経路をコンパイラが最適化しやすい形にします．型の条件に応じて自明なコピーや破棄を維持し，値渡しの負担とアーキテクチャごとの手書き最適化への依存を抑えています．",
        ],
      },
      en: {
        title: "High-performance IPC",
        paragraphs: [
          "IPC transfers messages and capabilities between processes. Short payloads use registers; additional words use the IPC buffer. CALL combines a request with a reply wait, while REPLY_RECEIVE combines a reply with the next receive, supporting request/reply service loops.",
          "When a server is waiting and no higher-priority process is ready, CALL switches directly to that server. This fastpath bypasses the normal scheduler invocation and ready-queue search, shortening the path from a client request to server execution.",
          "The common internal IPC logic is written in C++20. Result types carry success values and errors through higher-order function chains, exposing the normal execution path to compiler optimization. Conditionally trivial copy and destruction operations reduce value-passing overhead while limiting dependence on hand-written, architecture-specific optimization.",
        ],
      },
      links: [
        { label: "Manual: IPC Port", path: "doc/a9n-manual/pages/ipc_port.typ" },
        { label: "IPC implementation", path: "src/kernel/capability/ipc_port.cpp" },
        { label: "Result implementation", path: "src/liba9n/include/liba9n/result/__result/result_impl.hpp" },
      ],
    },
    {
      id: "memory",
      ja: {
        title: "メモリも明示的な資源として扱う",
        paragraphs: [
          "物理メモリはGenericというCapabilityで表し，その領域からプロセス，通信ポート，ページテーブル，Frameなどのオブジェクトを作成します．Frameは物理メモリ範囲，Address Spaceはアドレス空間を表します．オブジェクトの作成元となるメモリを明示するため，OS側でサービスごとの資源配分を管理できます．",
          "マッピングでは読出し・書込み・実行権限に加え，通常メモリ，フレームバッファ向けのBuffered，デバイスレジスタ向けのUncachedを指定できます．デバイスを扱うOSも同じメモリ操作の枠組みを使えます．共有領域の属性整合性や，参照を残さずメモリを再利用する管理はユーザー空間が担います．",
        ],
      },
      en: {
        title: "Explicit memory ownership",
        paragraphs: [
          "Generic capabilities represent physical memory from which processes, ports, page tables, and frames are created. A Frame represents a physical range; an Address Space represents a virtual address space. Making object backing explicit lets the user-space OS control how much memory each service receives.",
          "Mappings specify read, write, and execute permissions together with Normal, Buffered, or Uncached memory attributes. This gives ordinary memory, framebuffer writes, and device registers a common mapping interface. User space manages attribute consistency across aliases and the lifetime of references before backing memory is reused.",
        ],
      },
      links: [
        { label: "Manual: Generic", path: "doc/a9n-manual/pages/generic.typ" },
        { label: "Manual: Memory", path: "doc/a9n-manual/pages/memory.typ" },
      ],
    },
    {
      id: "events-and-faults",
      ja: {
        title: "通知・割り込み・例外をユーザー空間へ",
        paragraphs: [
          "Notification Portは，複数の発生源からの通知をビット単位でまとめます．待機とポーリングに対応し，IPCを受信するプロセスにも結び付けられます．割り込みはNotificationを通じてドライバへ配送され，ドライバが処理後にACKする構成を取れます．",
          "メモリ違反や未知のカーネル呼び出しなどの例外は，登録されたユーザー空間のハンドラへIPCで渡せます．プロセスを管理するサービスが処理方針を持てるため，デバイスドライバや他のOSのABI互換処理をカーネルの外に構成できます．NanamiのAlter/もこの例外配送を利用しています．",
        ],
      },
      en: {
        title: "User-space events and fault handling",
        paragraphs: [
          "Notification Ports accumulate event flags from multiple sources and support both waiting and polling. They can also be bound to processes receiving IPC. Hardware interrupts are delivered through notifications, allowing a user-space driver to handle a device and acknowledge the interrupt afterward.",
          "Faults such as memory violations and unknown kernel calls can be delivered by IPC to a registered user-space handler. The process-management service decides how to respond. This supports drivers and foreign-OS ABI handling outside the kernel; Nanami’s Alter/ uses this fault-delivery mechanism.",
        ],
      },
      links: [
        { label: "Manual: Notification Port", path: "doc/a9n-manual/pages/notification_port.typ" },
        { label: "Manual: Interrupt", path: "doc/a9n-manual/pages/interrupt.typ" },
        { label: "Manual: Building Services", path: "doc/a9n-manual/pages/building_services.typ" },
      ],
    },
    {
      id: "smp",
      ja: {
        title: "マルチコア実行とスケジューリング",
        paragraphs: [
          "x86_64とAArch64でSMPに対応し，異なるコアでユーザープロセスを並行実行できます．コアごとにスケジューラを持ち，優先度と同一優先度内のRound-robinで実行対象を選びます．CPU Affinityで配置を指定でき，IPCとNotificationはコアをまたいだプロセスの起床に対応します．",
          "SMPはビルド時に選択する構成です．QEMU virtとRaspberry Pi 4 Model Bでは4コアの起動を検証しています．現在はGiant Lockでカーネル処理を直列化しており，自動負荷分散やCPU Hotplugは実装していません．",
        ],
      },
      en: {
        title: "Multicore execution and scheduling",
        paragraphs: [
          "SMP is implemented for x86_64 and AArch64, allowing user processes to run concurrently on different cores. Each core has a priority-based scheduler with round-robin selection within a priority level. CPU affinity controls placement, and IPC and notifications can wake processes on another core.",
          "SMP is selected at build time. Four-core boot has been verified on QEMU virt and Raspberry Pi 4 Model B. Kernel entry is currently serialized by a giant lock; automatic load balancing and CPU hotplug are not implemented.",
        ],
      },
      links: [
        { label: "Manual: SMP", path: "doc/a9n-manual/pages/smp.typ" },
        { label: "Manual: Process Control Block", path: "doc/a9n-manual/pages/process_control_block.typ" },
      ],
    },
    {
      id: "portability",
      ja: {
        title: "HALによる移植性",
        paragraphs: [
          "ハードウェアに依存しないカーネル本体と，CPU・メモリ・割り込み・タイマなどを扱うHALを分離しています．共通カーネルはHALのインターフェースを呼び，アーキテクチャとボードの実装はビルド時に選択されます．オブジェクトモデルとIPCの共通処理を保ちながら，ハードウェアごとの実装を変更できる構成です．",
          "対応構成はx86_64／pc99，AArch64／QEMU virt，Raspberry Pi 4 Model Bです．AArch64ではU-Bootから起動し，QEMUはPSCI，Raspberry Pi 4はSpin Tableで追加コアを起動します．",
        ],
      },
      en: {
        title: "Portability through the HAL",
        paragraphs: [
          "The hardware-independent kernel is separated from the HAL, which implements CPU context, memory mapping, interrupts, timers, and I/O. Architecture and board implementations are selected at build time behind common interfaces. Hardware-specific changes can therefore preserve the shared object model and IPC logic.",
          "Implemented platforms are x86_64/pc99, AArch64/QEMU virt, and Raspberry Pi 4 Model B. AArch64 boots through U-Boot; secondary cores use PSCI on QEMU and spin tables on Raspberry Pi 4.",
        ],
      },
      links: [
        { label: "Manual: HAL Porting Guide", path: "doc/a9n-manual/pages/porting.typ" },
        { label: "Manual: Platform Status", path: "doc/a9n-manual/pages/document_status.typ" },
      ],
    },
  ],
  nanami: [
    {
      id: "user-space-system",
      ja: {
        title: "ユーザー空間で構成するOS",
        paragraphs: [
          "Nanamiは，ドライバ，ファイルシステム，ネットワーク，画面，ABI互換処理をそれぞれ別のユーザープロセスとして実装します．プロセス・メモリ管理サービスAlphaが，物理メモリの配分，プロセスの生成，アドレス空間，サービスの発見を管理します．OS固有の方針をA9N Microkernelへ持ち込まずにシステムを構成します．",
          "サービスの制御には同期IPCを使い，大量のデータには共有メモリ，DMAバッファ，リングバッファ，Notificationを使います．ドライバや各サービスはAlphaへ組み込まず独立して動作し，データ転送も用途に応じた経路を取ります．",
        ],
      },
      en: {
        title: "An OS composed in user space",
        paragraphs: [
          "Nanami implements drivers, filesystems, networking, graphics, and ABI compatibility as separate user processes. Alpha, its process and memory management service, manages physical resources, process creation, address spaces, and service discovery. OS-specific policies are built above the A9N Microkernel.",
          "Synchronous IPC carries control requests. Shared memory, DMA buffers, ring buffers, and notifications serve higher-volume data paths. Drivers and subsystem servers run independently of Alpha, allowing each subsystem to use a data-transfer path suited to its workload.",
        ],
      },
      links: [
        { label: "Architecture: System Layers", path: "nanami/docs/architecture.md#system-layers" },
        { label: "Architecture: IPC and Data Paths", path: "nanami/docs/architecture.md#ipc-and-data-paths" },
      ],
    },
    {
      id: "resource-domains",
      ja: {
        title: "資源の分割とサービス交換",
        paragraphs: [
          "Alphaを複数起動し，子のAlphaへメモリ予算とCapabilityを明示的に渡す構成に対応します．各Alphaは独立したプロセス管理とサービス名の空間を持ちます．親から取り込めるのは，対応するステートレスな制御サービスへの接続です．接続を個別に公開するため，親の資源やサービス一覧をそのまま渡す必要がありません．",
          "管理対象のサービスでは，公開名とクライアントの接続先を維持したまま，処理を担当するプロセスを協調的に交換できます．実行中の要求への応答を完了してから受信権限を引き継ぎ，通常の要求は引き続き直接IPCで配送します．共有バッファや未処理の通知を保持する構成も用意しています．",
          "交換には対応するサービスの協調が必要です．任意のサービスの内部状態やデバイス状態の移行，応答しないサービスからの自動復旧までを保証する機能ではありません．",
        ],
      },
      en: {
        title: "Resource domains and service exchange",
        paragraphs: [
          "Multiple Alpha instances can be started with explicitly partitioned memory budgets and capabilities. Each instance has its own process management and service namespace. Imports are limited to supported stateless control services, with individual connections exposed rather than the parent’s entire resource set or registry.",
          "Managed services can cooperatively replace their provider process while retaining their public name and client endpoint. Accepted requests finish before receive authority moves to the successor; ordinary requests continue to use direct IPC. Additional profiles retain opaque shared buffers and pending-work notifications across exchange.",
          "Exchange requires cooperation from a compatible service. It does not provide arbitrary application-state or device-state migration, nor automatic recovery from an unresponsive provider.",
        ],
      },
      links: [
        { label: "Architecture: Child Alpha", path: "nanami/docs/architecture.md#child-alpha-startup-and-memory-ownership" },
        { label: "Architecture: Managed Services", path: "nanami/docs/architecture.md#managed-services-and-cooperative-receiver-exchange" },
      ],
    },
    {
      id: "drivers-and-services",
      ja: {
        title: "ストレージ・ネットワーク・デバイス",
        paragraphs: [
          "デバイス管理サービスがプラットフォームに応じてドライバを選びます．AHCIやvirtioのブロックデバイス，virtio-net，USB xHCI，タイマ，入力，画面などを個別のサービスとして扱います．ext2ファイルシステムはブロックデバイスのサービス上で動作し，アプリケーションや他のサービスへファイル操作を提供します．",
          "ネットワークサービスはDHCP，ARP，IPv4，ICMP，UDP，DNS，TCPを実装します．ネイティブアプリとAlter/Linuxのソケットが同じネットワーク機能を利用でき，Linux向けのpingなどもNanami側のスタックを通じて動作します．",
        ],
      },
      en: {
        title: "Storage, networking, and devices",
        paragraphs: [
          "A user-space driver manager selects platform drivers. AHCI and virtio block devices, virtio networking, USB xHCI, timers, input, and display are handled by separate services. The ext2 filesystem runs above the block-device service and supplies file operations to applications and other services.",
          "The network service implements DHCP, ARP, IPv4, ICMP, UDP, DNS, and TCP. Native applications and Alter/Linux sockets share this stack, allowing supported Linux tools such as ping to use Nanami’s own networking services.",
        ],
      },
      links: [
        { label: "Device Drivers", path: "nanami/docs/device-drivers.md" },
        { label: "Architecture: Storage and Networking", path: "nanami/docs/architecture.md#storage-stack" },
      ],
    },
    {
      id: "desktop",
      ja: {
        title: "デスクトップ環境Honoka",
        paragraphs: [
          "Honokaは，ウィンドウの合成と管理を行うデスクトップ環境です．ウィンドウ枠，透過，フォーカス，移動，カーソル，壁紙やテーマを管理します．アプリケーションは共有メモリ上の描画領域へピクセルを書き，更新した領域を通知します．画面全体の構成と，アプリケーションの描画を分離しています．",
          "表示サービスの先には，対応するネイティブGPUドライバ，または起動時のフレームバッファを扱う独立したサービスを配置できます．Honokaは共通の表示インターフェースを使います．グラフィカルシェルや画像ビューアなどのネイティブアプリに加え，Alter/Linux上のX11環境もHonokaのウィンドウ内で表示できます．",
        ],
      },
      en: {
        title: "The Honoka desktop",
        paragraphs: [
          "Honoka is Nanami’s compositor and window manager. It owns window decorations, transparency, focus, movement, cursor rendering, wallpaper, and themes. Applications draw into shared-memory window buffers and report damaged regions, separating application rendering from desktop composition.",
          "A common display interface connects Honoka to supported native GPU drivers or an independent boot-framebuffer backend. The desktop hosts native applications such as the graphical shell and image viewer, as well as an X11 environment running through Alter/Linux inside a Honoka window.",
        ],
      },
      links: [
        { label: "Architecture: Graphics and Input", path: "nanami/docs/architecture.md#graphics-and-input" },
        { label: "GPU Protocol", path: "nanami/docs/gpu.md" },
      ],
    },
    {
      id: "alter",
      ja: {
        title: "Alter/によるOS ABI互換",
        paragraphs: [
          "Alter/は，LinuxやFreeBSDのバイナリが利用するOSのインターフェース（ABI）をユーザー空間で再現します．A9Nが配送したシステムコールの例外を受け，Nanamiのサービス要求へ変換します．ABIごとの変換処理を差し替えられるため，対応するABIの追加にカーネルやプロセス管理サービスの変更は不要です．",
          "Linux向けのAlter/Linuxはx86_64とAArch64に対応し，動的リンク，プロセス・スレッド管理，シグナル，ソケットなどを実装します．x86_64ではTiny Core 17.1のユーザーランドとX11環境をHonoka内で動かせます．シェル，動的リンカ，libcなどはTiny Coreの配布物を使い，ゲストのLinuxカーネルやハードウェア仮想化は使いません．",
          "互換性は実装済みのシステムコールとフラグに限られます．Alter/FreeBSDはx86_64向けで，動的リンクは未対応です．各ABIの対応表では，呼出しの有無に加えて，部分的な動作や未対応の条件も公開しています．",
        ],
      },
      en: {
        title: "OS ABI compatibility through Alter/",
        paragraphs: [
          "Alter/ reproduces the binary interfaces expected by Linux and FreeBSD applications in user space. It receives syscall faults from A9N and translates them into Nanami service requests. ABI-specific handlers can be replaced without changing the kernel or process management service.",
          "Alter/Linux supports x86_64 and AArch64, with dynamic linking, process and thread management, signals, and sockets. On x86_64 it runs Tiny Core 17.1 userspace and an X11 environment inside Honoka. The shell, dynamic linker, and libc come from Tiny Core’s distribution, without a guest Linux kernel or hardware virtualization.",
          "Compatibility is bounded by implemented syscalls and flags. Alter/FreeBSD targets x86_64 and does not support dynamic linking. Each personality’s support table records partial behavior and unsupported conditions as well as dispatched calls.",
        ],
      },
      links: [
        { label: "Alter/Linux Support", path: "nanami/servers/apps/alter/linux/linux-supported-syscalls.md" },
        { label: "Alter/FreeBSD Support", path: "nanami/servers/apps/alter/freebsd/freebsd-supported-syscalls.md" },
        { label: "Tiny Core / X11", path: "thirdparty/tinycore/README.md" },
      ],
    },
    {
      id: "component-interfaces",
      ja: {
        title: "サービスの境界と共通インターフェース",
        paragraphs: [
          "プロセス管理，ファイル，端末，ソケットなどの共通処理をサービスとして公開し，ネイティブアプリとABI互換処理が共有します．通信の型とプロトコルはnanami-uapi，実行時の共通処理はnanami-runtime，型付きのサービス呼び出しはnanami-clientに分離しています．サービスの実装と，それを利用する側の契約を分けた構成です．",
          "ネイティブのRustアプリはx86_64とAArch64，freestanding C++のSDKはx86_64に対応します．起動に必須のサービス，システムサービス，ユーザーセッションは別々の設定で構成できます．AArch64は現在ヘッドレス構成で，ネイティブのタイマ・画面・入力・ネットワークは未対応です．",
        ],
      },
      en: {
        title: "Service boundaries and shared interfaces",
        paragraphs: [
          "Process, file, terminal, and socket services are shared by native applications and ABI compatibility layers. nanami-uapi holds wire types and protocols, nanami-runtime supplies common runtime behavior, and nanami-client provides typed service calls. This separates service implementations from the interfaces their clients depend on.",
          "Native Rust applications support x86_64 and AArch64; the freestanding C++ SDK targets x86_64. Boot-critical services, system services, and user-session programs have separate configuration. AArch64 is currently headless; its native timer, display, input, and network stack are not yet implemented.",
        ],
      },
      links: [
        { label: "Application Interfaces", path: "nanami/docs/application.md" },
        { label: "Architecture: Boot Policy", path: "nanami/docs/architecture.md#boot-policy" },
      ],
    },
  ],
  nun: [
    {
      id: "runtime",
      ja: {
        title: "Rustとカーネルの起動規約をつなぐ",
        paragraphs: [
          "Nunは，A9N上で動くRustプログラムの起動処理を担うランタイムです．entry!マクロがアーキテクチャ固有のエントリとRustの関数をつなぎ，カーネルから渡されたInitInfoをプログラムへ引き渡します．起動時のレジスタ規約を，OS本体の処理から分離できます．",
          "InitInfoにはカーネルのバージョン，アーキテクチャ，プラットフォーム，コア数，IPCバッファ，初期メモリ資源などが含まれます．OSの初期プロセスが，起動環境と利用できる資源を同じ型で受け取れる構成です．",
        ],
      },
      en: {
        title: "Connecting Rust to the entry ABI",
        paragraphs: [
          "Nun provides startup support for Rust programs on A9N. Its entry! macro connects an architecture-specific entry point to a Rust function and passes through the kernel’s InitInfo. This separates entry-register conventions from the OS’s own initialization logic.",
          "InitInfo describes the kernel version, architecture, platform, core count, IPC buffer, and initial memory resources. The initial OS process receives both its execution environment and resource inventory through a shared Rust type.",
        ],
      },
      links: [
        { label: "Entry implementation", path: "src/entry_point.rs" },
        { label: "Runtime overview", path: "README.md" },
      ],
    },
    {
      id: "ipc-initialization",
      ja: {
        title: "IPCの初期設定と診断出力",
        paragraphs: [
          "ユーザー側のエントリ関数を呼ぶ前に，初期IPCバッファをTLSへ設定します．この準備をランタイムにまとめることで，プログラム本体は起動時のバッファ配置を繰り返し扱わずにIPCのインターフェースを利用できます．設定に失敗した場合はパニックとして報告します．",
          "print!とprintln!はA9Nのデバッグ呼び出しへ接続され，通常の端末サービスが存在する前から診断に使えます．パニックハンドラも同じ出力経路を使うため，初期化中の不具合を確認できる小さな実行基盤になります．",
        ],
      },
      en: {
        title: "IPC initialization and diagnostics",
        paragraphs: [
          "Before invoking the user entry function, Nun configures the initial IPC buffer in thread-local storage. Centralizing this preparation lets the program use the IPC interface without repeating entry-time buffer setup. A failed initialization is reported as a panic.",
          "The print! and println! macros use A9N debug calls, providing diagnostics before a normal terminal service exists. The panic handler uses the same output path, keeping early startup failures observable through a small runtime.",
        ],
      },
      links: [
        { label: "IPC initialization", path: "src/entry_point.rs" },
        { label: "Debug output", path: "src/debug_log.rs" },
        { label: "Panic handling", path: "src/panic.rs" },
      ],
    },
    {
      id: "runtime-scope",
      ja: {
        title: "小さなランタイムと共通ABI",
        paragraphs: [
          "Nunはno_std環境で動作し，a9n_abiを通じてカーネル操作と共通型を公開します．x86_64とAArch64のターゲット定義とリンカスクリプトも持ち，起動処理とCPUごとの差分をOSの機能から切り離しています．",
          "メモリ割当て，ドライバ，ファイルシステム，サービスの構成は，Nunの上に作るOSが担います．NanamiもNunを基礎にしつつ，プロセス管理やアプリケーション向けのランタイムを別の層として実装しています．",
        ],
      },
      en: {
        title: "A small runtime with a shared ABI",
        paragraphs: [
          "Nun runs without the Rust standard library and re-exports kernel operations and common types through a9n_abi. Target definitions and linker scripts cover x86_64 and AArch64, keeping startup and CPU-specific details separate from OS functionality.",
          "Memory allocation, drivers, filesystems, and service composition belong to the OS built above Nun. Nanami uses this foundation while implementing its process management and application runtime as separate layers.",
        ],
      },
      links: [
        { label: "Runtime exports", path: "src/lib.rs" },
        { label: "Target definitions", path: "arch/README.md" },
      ],
    },
  ],
  "a9n-abi": [
    {
      id: "object-operations",
      ja: {
        title: "Kernel ObjectをRustから操作する境界",
        paragraphs: [
          "a9n_abiは，A9NのCapability CallをRustから扱うための低水準インターフェースです．Capability Node，メモリ，プロセス，IPC，Notification，割り込みなどの操作番号と呼出し規約を定義します．カーネルとの値の受け渡しをこのcrateにまとめ，ランタイムやOSサービスが共有できます．",
          "メッセージやCapabilityの値そのものはa9n-typesが定義し，a9n_abiはそれらをどのレジスタへ置き，どの操作として呼ぶかを扱います．型，呼出し規約，上位のサービス実装を分けることで，ABIの変更箇所を追いやすくしています．",
        ],
      },
      en: {
        title: "The Rust boundary to kernel objects",
        paragraphs: [
          "a9n_abi provides the low-level Rust interface to A9N Capability Calls. It defines operation numbers and calling conventions for capability nodes, memory, processes, IPC, notifications, and interrupts. Runtimes and OS services share this description of the kernel boundary.",
          "a9n-types defines the values being exchanged; a9n_abi defines their register placement and invocation. Separating values, calling conventions, and higher-level services makes ABI changes easier to locate and review.",
        ],
      },
      links: [
        { label: "ABI scope", path: "src/lib.rs" },
        { label: "Capability Node operations", path: "src/capability_call/node.rs" },
      ],
    },
    {
      id: "architecture-boundary",
      ja: {
        title: "アーキテクチャごとの呼出し規約",
        paragraphs: [
          "x86_64とAArch64の実装を持ち，ターゲットに応じてレジスタ操作とカーネルへの遷移を切り替えます．IPCバッファやプロセスの設定も，公開された操作の定義とアーキテクチャ固有の処理に分離しています．",
          "crateはno_stdで動作し，Nunなどの小さなランタイムからも利用できます．オブジェクトの寿命やサービス全体の権限設計を扱う上位APIは別の層に置き，このcrateではカーネルABIの表現を担います．",
        ],
      },
      en: {
        title: "Architecture-specific calling conventions",
        paragraphs: [
          "Implementations for x86_64 and AArch64 select the target’s register operations and kernel-entry mechanism. Public operation definitions remain separate from architecture-specific IPC-buffer and process-configuration code.",
          "The crate is no_std and can be used by small runtimes such as Nun. Higher-level APIs own object lifetimes and service-wide authority policy; this layer concentrates on representing the kernel ABI.",
        ],
      },
      links: [
        { label: "Architecture selection", path: "src/arch.rs" },
        { label: "Process operation definitions", path: "src/capability_call/process_control_block.rs" },
      ],
    },
    {
      id: "mapping-attributes",
      ja: {
        title: "デバイスにも対応するメモリ属性",
        paragraphs: [
          "アドレス空間のマッピングでは，READ，WRITE，EXECUTEと，NORMAL，BUFFERED，UNCACHEDを組み合わせて属性を表します．通常のメモリと，フレームバッファやMMIOに必要な属性を同じ型で指定できます．",
          "メモリ種別を省略した場合はNormalになり，既存のアクセス権限のビット配置を維持しています．BUFFEREDとUNCACHEDは相互排他的です．アクセス権限とメモリ種別を区別して表現することで，デバイス向けの属性を追加しても呼出しの基本形式を保っています．",
        ],
      },
      en: {
        title: "Memory attributes for device mappings",
        paragraphs: [
          "Address-space mappings combine READ, WRITE, and EXECUTE with NORMAL, BUFFERED, or UNCACHED attributes. Ordinary RAM, framebuffer writes, and MMIO registers can use the same attribute type with appropriate memory behavior.",
          "Omitting the memory type selects Normal and preserves the existing access-permission bit layout. BUFFERED and UNCACHED are mutually exclusive. Keeping permissions separate from the memory-type field extends device mapping behavior without changing the basic call format.",
        ],
      },
      links: [
        { label: "Memory attributes", path: "README.md#memory-attributes" },
        { label: "Address Space ABI", path: "src/capability_call/address_space.rs" },
      ],
    },
  ],
  "a9n-types": [
    {
      id: "shared-types",
      ja: {
        title: "カーネルとユーザー空間が共有する型",
        paragraphs: [
          "a9n-typesは，Capabilityの記述子，オブジェクト種別，権限，エラー，例外理由などの共通型を定義します．カーネルとの境界や，複数のRustコンポーネント間で交わす値を，一つの定義として共有するためのcrateです．",
          "外部crateへの依存を持たないno_stdのライブラリです．カーネル呼び出しやレジスタ操作はa9n_abi，起動処理はNunに分け，共通型だけが必要なコンポーネントへ実行時の処理を持ち込まない構成にしています．",
        ],
      },
      en: {
        title: "Shared values across the kernel boundary",
        paragraphs: [
          "a9n-types defines capability descriptors, object kinds, rights, errors, fault reasons, and other shared values. It gives Rust components one set of definitions for data crossing the kernel boundary or exchanged throughout the A9N ecosystem.",
          "It is a no_std library with no external crate dependencies. Calls and register operations belong to a9n_abi, while startup belongs to Nun. Components that need only the shared values therefore do not acquire those runtime responsibilities.",
        ],
      },
      links: [
        { label: "Type-layer scope", path: "src/lib.rs" },
        { label: "Capability and error types", path: "src/types.rs" },
      ],
    },
    {
      id: "message-format",
      ja: {
        title: "IPCのメッセージ形式",
        paragraphs: [
          "MessageInfoは，ブロッキングの有無，メッセージ長，Capabilityの転送数，通常IPC・例外・通知の種別を1 Wordにまとめます．各フィールドを組み立てる関数と読み出す関数を持ち，送受信側が同じビット配置を扱えます．",
          "IpcBufferは，レジスタに収まらないメッセージの領域と，Capabilityの転送先を表すフィールドを定義します．メッセージのヘッダと転送用バッファを共通化することで，ランタイムごとにABIの配置を定義し直す必要を減らしています．",
        ],
      },
      en: {
        title: "A common IPC message format",
        paragraphs: [
          "MessageInfo packs the blocking flag, message length, capability-transfer count, and normal/fault/notification source into one word. Constructors and accessors give senders and receivers a common interpretation of the bit layout.",
          "IpcBuffer defines storage for message words beyond the register payload and fields identifying capability-transfer destinations. Sharing the header and buffer layouts avoids reproducing the ABI structure independently in each runtime.",
        ],
      },
      links: [
        { label: "MessageInfo", path: "src/message_info.rs" },
        { label: "IpcBuffer", path: "src/ipc_buffer.rs" },
      ],
    },
    {
      id: "initial-resources",
      ja: {
        title: "起動環境と初期資源の表現",
        paragraphs: [
          "InitInfoは，カーネルのバージョン，アーキテクチャとプラットフォームの名称，コア数，初期IPCバッファ，Genericの一覧をまとめます．GenericDescriptorは物理アドレス，領域の大きさ，デバイス領域かどうかを表し，起動直後のOSが利用できる資源を把握できます．",
          "InitInfoやGenericDescriptorはC互換のレイアウトを明示し，列挙型もABIに対応する表現を持ちます．初期Capabilityの配置から記述子を求める補助関数も含め，起動情報の形式と解釈を共通化しています．",
        ],
      },
      en: {
        title: "Describing the initial environment",
        paragraphs: [
          "InitInfo groups the kernel version, architecture and platform names, core count, initial IPC buffer, and available Generic regions. GenericDescriptor records each region’s physical address, size, and device classification, giving the initial OS process an inventory of its resources.",
          "InitInfo and GenericDescriptor use explicit C-compatible layouts, while ABI enums have explicit representations. Helpers also derive capability descriptors from the initial slot layout, keeping both the format and interpretation of startup information in one layer.",
        ],
      },
      links: [
        { label: "InitInfo and initial capabilities", path: "src/init.rs" },
        { label: "ABI representations", path: "src/types.rs" },
      ],
    },
  ],
  "a9nloader-rs": [
    {
      id: "boot-handoff",
      ja: {
        title: "UEFIからA9NとInitへ",
        paragraphs: [
          "A9NLoader-rsは，A9N Boot Protocol x86_64を実装するRust製のUEFIブートローダです．カーネルのELFと，最初のユーザープログラムであるInitのELFを別々に読み込み，それぞれのエントリとメモリ配置を準備します．",
          "カーネルとInitのロード情報，物理メモリの情報，アーキテクチャ固有の情報をBootInfoにまとめて引き渡します．OSのサービス構成をローダへ埋め込まず，カーネルがInitへ制御を渡すための起動境界を担います．",
        ],
      },
      en: {
        title: "From UEFI to A9N and Init",
        paragraphs: [
          "A9NLoader-rs is a Rust UEFI bootloader implementing the A9N Boot Protocol for x86_64. It loads the kernel ELF separately from Init, the first user-space program, and prepares their entry points and memory placement.",
          "BootInfo carries the image-loading results, physical memory information, and architecture-specific data into the kernel. The loader establishes the handoff to A9N and its initial process while leaving OS service composition to user space.",
        ],
      },
      links: [
        { label: "Loader overview", path: "README.md" },
        { label: "ELF loading", path: "src/loader/loader.rs" },
        { label: "BootInfo", path: "src/loader/boot_info.rs" },
      ],
    },
    {
      id: "firmware-memory",
      ja: {
        title: "Firmwareのメモリ情報を整理する",
        paragraphs: [
          "UEFIのメモリマップをA9NのFree・Device・Reservedの区分へ変換します．通常のRAMと，デバイスやFirmwareの情報を保持する領域を分けることで，起動後の資源管理に必要な情報を渡します．ACPIのReclaim領域やNVSは，内容を保持したままユーザー空間から参照できるDeviceとして扱います．",
          "マップはアドレス順に整列してから組み立て，矛盾する重複領域は拒否します．実機Firmwareの列挙順や，物理アドレス0から始まる空きRAM，領域間の隙間も回帰テストの対象にしています．",
        ],
      },
      en: {
        title: "Preserving the firmware memory map",
        paragraphs: [
          "The loader translates UEFI memory types into A9N’s Free, Device, and Reserved classifications. ACPI reclaim and NVS regions become Device resources, preserving firmware data for user-space discovery rather than treating it as allocator RAM.",
          "The map is sorted by address before construction, and conflicting overlaps are rejected. Regression coverage includes real-firmware ordering, free RAM beginning at physical address zero, gaps, malformed ranges, and the C ABI layout.",
        ],
      },
      links: [
        { label: "Memory classification", path: "src/loader/memory/policy.rs" },
        { label: "Memory-map tests", path: "tests/README.md" },
      ],
    },
    {
      id: "boot-component",
      ja: {
        title: "Rustで独立した起動コンポーネント",
        paragraphs: [
          "元のC／EDK2版ローダを書き直し，UEFIとの接続からELFの読み込みまでRustで実装しています．カーネルやユーザー空間のOSとは別の実行ファイルとして構成され，起動処理の変更を独立して管理できます．",
          "SPENCERが生成するx86_64のUEFIイメージでは，A9N，Initと組み合わせる起動コンポーネントとして使われます．対応するBoot Protocolはx86_64向けであり，AArch64の起動はU-Boot側が担当します．",
        ],
      },
      en: {
        title: "An independent Rust boot component",
        paragraphs: [
          "The original C/EDK2 loader was rewritten in Rust, covering the UEFI connection and ELF-loading path. It remains a separate executable from both the kernel and user-space OS, allowing boot behavior to evolve as an independent component.",
          "SPENCER combines it with A9N and Init in x86_64 UEFI images. Its boot protocol targets x86_64; AArch64 boot is handled by U-Boot instead.",
        ],
      },
      links: [
        { label: "Project scope", path: "README.md" },
        { label: "Boot implementation", path: "src/loader/loader.rs" },
      ],
    },
  ],
  spencer: [
    {
      id: "image-pipeline",
      ja: {
        title: "OSを起動可能なイメージにまとめる",
        paragraphs: [
          "SPENCERは，A9N Microkernel，Nunを使うOS，アーキテクチャに対応するブートローダを一つの処理系でビルドし，起動可能なディスクイメージへまとめます．カーネル，ユーザープログラム，起動用ファイルの組合せをまとめて管理する役割です．",
          "x86_64ではA9NLoader-rsによるUEFI起動，AArch64ではU-Bootによる起動に対応します．生成物はアーキテクチャ・プラットフォーム・Debug／Releaseごとに分かれ，カーネルやInitの個別バイナリと最終イメージを同じ構成として扱えます．",
        ],
      },
      en: {
        title: "A complete boot-image pipeline",
        paragraphs: [
          "SPENCER builds the A9N Microkernel, a Nun-based OS payload, and architecture-appropriate boot software, then assembles them into a bootable disk image. It manages the combination of kernel, user program, and boot files as one system configuration.",
          "x86_64 uses A9NLoader-rs and UEFI; AArch64 uses U-Boot. Artifacts are separated by architecture, platform, and Debug/Release profile, keeping the individual kernel and Init binaries alongside their final image.",
        ],
      },
      links: [
        { label: "System architecture", path: "README.md#architecture-overview" },
        { label: "Image composition", path: "README.md#build" },
      ],
    },
    {
      id: "emulation-and-hardware",
      ja: {
        title: "QEMUとRaspberry Pi 4",
        paragraphs: [
          "QEMUでの実行，仮想CPU数，SMPのカーネル構成，ハードウェアアクセラレーション，GDB接続を同じツールで管理します．カーネル側のSMP設定とQEMUのCPU数を別々に扱い，複数CPUを使うのにSMPを有効化していない構成は拒否します．",
          "Raspberry Pi 4 Model B向けには，VideoCore Firmware，Device Tree，U-Boot，A9N，Initを含むSDカード向けイメージを生成します．FirmwareとU-Bootの取得・ビルドも処理系に含め，QEMU向けの検証と実機向けの起動構成を共通の基盤で管理できます．",
        ],
      },
      en: {
        title: "QEMU and Raspberry Pi 4",
        paragraphs: [
          "The same tool manages QEMU execution, virtual CPU count, the kernel’s SMP configuration, hardware acceleration, and GDB connectivity. Kernel SMP support and QEMU CPU count remain separate settings; a multicore run without an SMP-enabled kernel is rejected.",
          "For Raspberry Pi 4 Model B, SPENCER creates an SD-card image containing VideoCore firmware, the device tree, U-Boot, A9N, and Init. Firmware acquisition and U-Boot builds are included in the pipeline, supporting both emulator-based validation and physical-board boot composition.",
        ],
      },
      links: [
        { label: "QEMU and SMP", path: "README.md#running-with-qemu" },
        { label: "Raspberry Pi 4 Model B", path: "README.md#raspberry-pi-4-model-b" },
      ],
    },
    {
      id: "external-os",
      ja: {
        title: "外部OSとの統合",
        paragraphs: [
          "組み込むOSはSPENCER内のサンプルに固定されません．外部のCargo Manifest，ターゲット定義，実行ファイルを受け取り，同じビルドとイメージ生成の経路へ接続できます．Nanamiもこの仕組みを利用しています．",
          "外部OSの成果物は，イメージ内のInitとして直接配置されます．OS本体の構成を独立して保ちながら，ブートローダとカーネルの組合せ，生成物の配置，QEMUでの実行をSPENCERへ集約できる設計です．",
        ],
      },
      en: {
        title: "Integration with external operating systems",
        paragraphs: [
          "The OS payload is not fixed to SPENCER’s sample. An external Cargo manifest, target definition, and executable can enter the same build and image pipeline. Nanami uses this integration boundary.",
          "The external executable is installed directly as the image’s Init payload. An OS can retain its own source structure while SPENCER owns bootloader/kernel composition, artifact placement, and QEMU execution.",
        ],
      },
      links: [
        { label: "External OS integration", path: "README.md#injecting-an-external-os-payload" },
      ],
    },
  ],
};

function localize(locale: Locale): Record<ProjectSlug, readonly ProjectSection[]> {
  const sections = (slug: ProjectSlug) => definitions[slug].map(
    ({ id, links, ...copy }) => ({ id, links, ...copy[locale] }),
  );
  return {
    a9n: sections("a9n"),
    nanami: sections("nanami"),
    nun: sections("nun"),
    "a9n-abi": sections("a9n-abi"),
    "a9n-types": sections("a9n-types"),
    "a9nloader-rs": sections("a9nloader-rs"),
    spencer: sections("spencer"),
  };
}

export const projectDetails: Record<Locale, Record<ProjectSlug, readonly ProjectSection[]>> = {
  ja: localize("ja"),
  en: localize("en"),
};
