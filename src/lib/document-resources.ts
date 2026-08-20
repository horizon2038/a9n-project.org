export type DocumentResourceId =
  | "a9n-manual-pdf"
  | "a9n-manual-source"
  | "a9n-repository"
  | "a9n-abi-api"
  | "nanami"
  | "nun";

export type DocumentResource = {
  id: DocumentResourceId;
  name: string;
  href: string;
};

export const documentResources = [
  {
    id: "a9n-manual-pdf",
    name: "A9N Manual — PDF",
    href: "https://github.com/horizon2038/A9N/blob/develop/doc/a9n-manual/build/a9n-manual.pdf",
  },
  {
    id: "a9n-manual-source",
    name: "A9N Manual — Source",
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
    href: "https://github.com/horizon2038/Nanami",
  },
  {
    id: "nun",
    name: "Nun",
    href: "https://github.com/horizon2038/Nun",
  },
] as const satisfies readonly DocumentResource[];
