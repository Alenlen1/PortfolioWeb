"use client";
import { Download } from "lucide-react";
export function PrintResume() {
  return (
    <button className="pill-button" onClick={() => window.print()}>
      Save as PDF <Download size={14} />
    </button>
  );
}
