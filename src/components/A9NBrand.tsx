import Image from "next/image";

type BrandVariant = "horizontal" | "lockup" | "mark" | "title";

export function A9NBrand({
  variant,
  decorative = false,
  priority = false,
}: {
  variant: BrandVariant;
  decorative?: boolean;
  priority?: boolean;
}) {
  const alt = decorative ? "" : "A9N Project";

  if (variant === "horizontal") {
    return (
      <span className="a9n-brand-horizontal" aria-hidden={decorative || undefined}>
        <Image
          className="a9n-brand-mark"
          src="/brand/a9n-project_logo.svg"
          width={510}
          height={638}
          alt=""
          priority={priority}
        />
        <Image
          className="a9n-brand-title"
          src="/brand/a9n-project_title.svg"
          width={1291}
          height={255}
          alt={alt}
          priority={priority}
        />
      </span>
    );
  }

  const image = {
    lockup: {
      className: "a9n-brand-lockup",
      src: "/brand/a9n-project_logo_and_title.svg",
      width: 646,
      height: 519,
    },
    mark: {
      className: "a9n-brand-mark",
      src: "/brand/a9n-project_logo.svg",
      width: 510,
      height: 638,
    },
    title: {
      className: "a9n-brand-title",
      src: "/brand/a9n-project_title.svg",
      width: 1291,
      height: 255,
    },
  }[variant];

  return <Image {...image} alt={alt} priority={priority} />;
}
