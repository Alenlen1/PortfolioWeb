import darkPortrait from "../../public/profile/dark-firefly.png";
import lightPortrait from "../../public/profile/light-firefly.png";
import { profile } from "@/data/portfolio";

export function ProfilePortrait() {
  return (
    <div
      className="profile-portraits"
      role="img"
      aria-label={`Portrait of ${profile.name}`}
    >
      <svg
        className="profile-photo profile-photo-light"
        viewBox="280 -70 1240 1380"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <image href={lightPortrait.src} width="1920" height="1280" />
      </svg>
      <svg
        className="profile-photo profile-photo-dark"
        viewBox="-150 300 1150 1314"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <image href={darkPortrait.src} width="1368" height="1824" />
      </svg>
    </div>
  );
}
