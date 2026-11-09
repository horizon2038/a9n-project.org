---
title: "A9N Microkernel v0.1.16 released"
date: '2026-08-25T16:45:31+09:00'
tags: ['kernel', 'update', 'release']
summary: 'SMP support and a HAL fix in A9N Microkernel v0.1.16.'
---

## Changes

### SMP

- The experimental v0.2.0-smp branch has been merged into the mainline kernel, making SMP officially supported.
  - Enable SMP at build time with `-DA9N_CONFIG_ENABLE_SMP`.
  - Set the affinity in `process_control_block::configure` to choose the core on which a process runs.
  - Inter-core IPC and notifications are now available. They involve IPIs in the IPC path and are **much slower** than communication within a single core, so their use is discouraged.
    - Shared memory combined with notifications is recommended for inter-core communication.

### HAL

- Fixed an issue that made `configure_cycles(cycles)` effectively do nothing.
