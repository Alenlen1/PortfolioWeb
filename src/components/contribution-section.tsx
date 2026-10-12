import ContributionSkyline from "@/components/contribution-skyline";
import {
  ScrollAssemblyTitle,
  ScrollAssemblyBlock,
} from "@/components/scroll-assembly";
import {
  getGitHubContributions,
  githubProfileUrl,
  githubUsername,
} from "@/lib/github-contributions";

const palette = {
  light: ["#c4d0b7", "#99af87", "#728d5d", "#485f39"],
  dark: ["#354634", "#58734a", "#86a76e", "#b6d49c"],
};

export async function ContributionSection({ endDate }: { endDate: string }) {
  const activity = await getGitHubContributions(endDate);
  return (
    <section className="skyline-section" aria-labelledby="skyline-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">GitHub / @{githubUsername}</span>
          <ScrollAssemblyTitle
            id="skyline-heading"
            text="Building, commit by commit."
          />
        </div>
        <a
          className="text-link"
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View GitHub profile ↗
        </a>
      </div>
      <ScrollAssemblyBlock>
        <ContributionSkyline
          data={activity.data}
          endDate={activity.endDate}
          defaultView="2d"
          palette={palette}
          className="skyline-widget"
        />
      </ScrollAssemblyBlock>
      {activity.cached && (
        <p className="skyline-cache-note">
          Last saved GitHub activity through {activity.endDate}.
        </p>
      )}
    </section>
  );
}
