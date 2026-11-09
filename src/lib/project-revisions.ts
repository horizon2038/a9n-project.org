import type { ProjectSlug } from "@/lib/project-manifest";

export type ProjectRevision = {
  branch: string;
  commit: string;
  committedAt: string;
  packageVersion?: string;
  release?: { tag: string; publishedAt: string; url: string };
};

// Repository default branches and latest published releases, checked via GitHub.
// Descriptions follow the source revision; releases may precede that revision.
export const projectCheckedAt = "2026-11-10";

export const projectRevisions: Record<ProjectSlug, ProjectRevision> = {
  "a9n": {
    "branch": "develop",
    "commit": "02951a48d00988861da5f5811e732eaa47343766",
    "committedAt": "2026-10-28T17:17:50Z",
    "release": {
      "tag": "v0.3.11",
      "publishedAt": "2026-10-24T17:13:05Z",
      "url": "https://github.com/horizon2038/A9N/releases/tag/v0.3.11"
    }
  },
  "nanami": {
    "branch": "main",
    "commit": "5a2da38088a6d7c4489989ee2b59740a005744ac",
    "committedAt": "2026-11-09T17:26:52Z",
    "release": {
      "tag": "v0.7.2",
      "publishedAt": "2026-11-03T09:06:47Z",
      "url": "https://github.com/horizon2038/Nanami/releases/tag/v0.7.2"
    }
  },
  "nun": {
    "branch": "main",
    "commit": "a10150c5beb3ea2429caac5927b978b7dc8feea6",
    "committedAt": "2026-10-14T15:25:21Z",
    "packageVersion": "0.2.1"
  },
  "a9n-abi": {
    "branch": "main",
    "commit": "4c14adfed24b3ac4188ac6f89114172c7f05c501",
    "committedAt": "2026-10-13T15:12:02Z",
    "packageVersion": "0.8.0"
  },
  "a9n-types": {
    "branch": "main",
    "commit": "2054502bebd9ad13f7108e325c8dbd1084eabd55",
    "committedAt": "2026-09-06T05:12:35Z",
    "packageVersion": "0.4.0"
  },
  "a9nloader-rs": {
    "branch": "main",
    "commit": "272b24a1a099e6522afae6adc61ca8409b649920",
    "committedAt": "2026-09-17T07:59:56Z",
    "packageVersion": "0.2.0"
  },
  "spencer": {
    "branch": "main",
    "commit": "18b61279801d31ec34042961d11f84388b69e4cc",
    "committedAt": "2026-10-31T06:55:38Z"
  }
};
