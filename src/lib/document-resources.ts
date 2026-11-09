export type DocumentResourceId =
  | "a9n-manual-pdf"
  | "a9n-manual-source"
  | "a9n-repository"
  | "a9n-abi-api"
  | "nanami"
  | "nun"
  | "a9n-types"
  | "spencer"
  | "a9nloader-rs";

export type DocumentResource = {
  id: DocumentResourceId;
  name: string;
  href: string;
};

export const documentResources = [
  {
    id: "a9n-manual-pdf",
    name: "A9N Manual (PDF)",
    href: "https://github.com/horizon2038/A9N/blob/develop/doc/a9n-manual/build/a9n-manual.pdf",
  },
  {
    id: "a9n-manual-source",
    name: "A9N Manual (Typst)",
    href: "https://github.com/horizon2038/A9N/tree/develop/doc/a9n-manual",
  },
  {
    id: "a9n-repository",
    name: "A9N Repository",
    href: "https://github.com/horizon2038/A9N",
  },
  {
    id: "a9n-abi-api",
    name: "a9n_abi API",
    href: "https://docs.rs/a9n_abi/latest/a9n_abi/",
  },
  {
    id: "nanami",
    name: "Nanami OS",
    href: "https://github.com/horizon2038/Nanami/blob/main/nanami/docs/architecture.md",
  },
  {
    id: "nun",
    name: "Nun",
    href: "https://github.com/horizon2038/Nun",
  },
  {
    id: "a9n-types",
    name: "a9n-types",
    href: "https://github.com/horizon2038/a9n-types",
  },
  {
    id: "spencer",
    name: "SPENCER",
    href: "https://github.com/horizon2038/spencer#build",
  },
  {
    id: "a9nloader-rs",
    name: "A9NLoader-rs",
    href: "https://github.com/horizon2038/a9nloader-rs#build",
  },
] as const satisfies readonly DocumentResource[];
