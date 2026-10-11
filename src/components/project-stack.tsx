import { ToolkitIcon } from "@/components/toolkit-icon";

export function ProjectStack({ items }: { items: readonly string[] }) {
  return (
    <div
      className="stack-tags project-stack"
      aria-label="Project technologies and tools"
    >
      {items.map((item) => (
        <span key={item}>
          <ToolkitIcon name={item} />
          {item}
        </span>
      ))}
    </div>
  );
}
