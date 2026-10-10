import snapshot from "@/data/github-contributions.json";
import { parseGitHubCalendar } from "@/lib/github-calendar";

export const githubUsername = "Alenlen1";
export const githubProfileUrl = `https://github.com/${githubUsername}`;

export async function getGitHubContributions(endDate: string) {
  const start = new Date(`${endDate}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 370);
  const startDate = start.toISOString().slice(0, 10);
  const years = Array.from({ length: Number(endDate.slice(0, 4)) - start.getUTCFullYear() + 1 }, (_, i) => start.getUTCFullYear() + i);
  try {
    const calendars = await Promise.all(years.map(async year => {
      const response = await fetch(`https://github.com/users/${githubUsername}/contributions?from=${year}-01-01&to=${year}-12-31`, {
        next: { revalidate: 3600 },
        headers: { Accept: "text/html" },
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`GitHub calendar returned ${response.status}`);
      return parseGitHubCalendar(await response.text());
    }));
    const data = [...new Map(calendars.flat().map(day => [day.date, day])).values()]
      .filter(day => day.date >= startDate && day.date <= endDate)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (data.length < 365) throw new Error("GitHub calendar is incomplete");
    return { data, endDate, cached: false };
  } catch {
    return { data: snapshot.days, endDate: snapshot.endDate, cached: true };
  }
}
