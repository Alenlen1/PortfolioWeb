import type { StaticImageData } from "next/image";
import type { projects } from "@/data/portfolio";
import evacuRosaScreenshot from "../../public/projects/evacu-rosa.png";
import skillBridgeScreenshot from "../../public/projects/skillbridge.png";
import cashoutScreenshot from "../../public/projects/cashout-tracker.png";

const screenshots: Record<string, StaticImageData> = {
  "evacu-rosa": evacuRosaScreenshot,
  skillbridge: skillBridgeScreenshot,
  "cashout-tracker": cashoutScreenshot,
};

type ScreenshotProject = (typeof projects)[number] & {
  lightImage?: string;
  darkImage?: string;
};

export function ProjectScreenshot({
  project,
  expanded = false,
}: {
  project: ScreenshotProject;
  expanded?: boolean;
}) {
  const screenshot = screenshots[project.slug];
  // Static imports bind the screenshot to the component instead of relying on
  // an image field in the project object passed through the detail route.
  const lightImage = project.lightImage ?? screenshot?.src ?? project.image;
  const darkImage = project.darkImage;
  return (
    <div className="project-preview project-screenshot">
      <div className="screenshot-browserbar" aria-hidden="true">
        <div>
          <span />
          <span />
          <span />
        </div>
        <span>{new URL(project.url).hostname}</span>
      </div>
      <div
        className="screenshot-body"
        role="img"
        aria-label={`${project.name} — screenshot of the live website`}
      >
        <img
          className={darkImage ? "screenshot-light" : undefined}
          src={lightImage}
          width={screenshot?.width ?? 1200}
          height={screenshot?.height ?? 900}
          alt=""
          aria-hidden="true"
          loading={expanded ? "eager" : "lazy"}
          decoding="async"
        />
        {darkImage && (
          <img
            className="screenshot-dark"
            src={darkImage}
            width={screenshot?.width ?? 1200}
            height={screenshot?.height ?? 900}
            alt=""
            aria-hidden="true"
            loading={expanded ? "eager" : "lazy"}
            decoding="async"
          />
        )}
      </div>
    </div>
  );
}
