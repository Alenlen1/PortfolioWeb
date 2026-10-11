export type GitHubDay = { date: string; count: number };

/** GitHub's public calendar pairs each dated cell with its exact-count tooltip. */
export function parseGitHubCalendar(html: string): GitHubDay[] {
  const counts = new Map<string, number>();
  for (const match of html.matchAll(
    /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g,
  )) {
    const id = /\bfor="([^"]+)"/.exec(match[1])?.[1];
    const label = match[2].replace(/<[^>]*>/g, "").trim();
    const value = /^(No|[\d,]+) contributions? on\b/.exec(label)?.[1];
    if (id && value)
      counts.set(id, value === "No" ? 0 : Number(value.replaceAll(",", "")));
  }
  const days: GitHubDay[] = [];
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const date = /\bdata-date="(\d{4}-\d{2}-\d{2})"/.exec(match[1])?.[1];
    const id = /\bid="([^"]+)"/.exec(match[1])?.[1];
    if (!date) continue;
    if (!id || !counts.has(id))
      throw new Error("GitHub calendar is missing daily counts");
    days.push({ date, count: counts.get(id)! });
  }
  if (!days.length) throw new Error("GitHub calendar contains no dates");
  return days.sort((a, b) => a.date.localeCompare(b.date));
}
