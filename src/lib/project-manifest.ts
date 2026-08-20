export type ProjectSlug =
  | "a9n"
  | "nanami"
  | "nun"
  | "a9n-abi"
  | "a9n-types"
  | "a9nloader-rs"
  | "spencer";

export type ProjectScreenshotDefinition = {
  id: string;
  src: string;
  width: number;
  height: number;
};

export type ProjectDefinition = {
  slug: ProjectSlug;
  name: string;
  href: string;
  core?: boolean;
  related: readonly ProjectSlug[];
  screenshots?: readonly ProjectScreenshotDefinition[];
};

export const projectManifest: readonly ProjectDefinition[] = [
  {
    slug: "a9n",
    name: "A9N",
    href: "https://github.com/horizon2038/A9N",
    core: true,
    related: ["a9n-types", "a9n-abi", "a9nloader-rs", "nun", "spencer", "nanami"],
  },
  {
    slug: "nanami",
    name: "Nanami OS",
    href: "https://github.com/horizon2038/Nanami",
    related: ["a9n", "nun", "spencer", "a9nloader-rs"],
    screenshots: [
      {
        id: "honoka-desktop",
        src: "/screenshots/nanami/honoka_desktop.png",
        width: 2032,
        height: 1224,
      },
      {
        id: "graphical-applications",
        src: "/screenshots/nanami/graphical_applications.png",
        width: 2032,
        height: 1224,
      },
      {
        id: "alter-demo",
        src: "/screenshots/nanami/alter_demo.png",
        width: 2032,
        height: 1224,
      },
    ],
  },
  {
    slug: "nun",
    name: "Nun",
    href: "https://github.com/horizon2038/Nun",
    related: ["a9n", "a9n-types", "a9n-abi", "nanami", "spencer"],
  },
  {
    slug: "a9n-abi",
    name: "a9n_abi",
    href: "https://github.com/horizon2038/a9n-abi",
    related: ["a9n", "a9n-types", "nun"],
  },
  {
    slug: "a9n-types",
    name: "a9n_types",
    href: "https://github.com/horizon2038/a9n-types",
    related: ["a9n", "a9n-abi", "nun"],
  },
  {
    slug: "a9nloader-rs",
    name: "A9NLoader-rs",
    href: "https://github.com/horizon2038/a9nloader-rs",
    related: ["a9n", "nun", "spencer"],
    screenshots: [
      {
        id: "boot-sequence",
        src: "/screenshots/a9nloader-rs/a9nloader-rs.png",
        width: 2032,
        height: 1224,
      },
    ],
  },
  {
    slug: "spencer",
    name: "SPENCER",
    href: "https://github.com/horizon2038/spencer",
    related: ["a9n", "nun", "a9nloader-rs", "nanami"],
    screenshots: [
      {
        id: "build-and-run",
        src: "/screenshots/spencer/spencer_demo.gif",
        width: 1200,
        height: 600,
      },
    ],
  },
];
