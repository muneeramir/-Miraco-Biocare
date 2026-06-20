"use client";

import { useServerInsertedHTML } from "next/navigation";

const themePreventFlashScript = `(function(){try{var theme=localStorage.getItem("theme");if(theme==="dark"||(!theme&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`;

/** Injects theme script into SSR HTML outside the React tree (no React 19 script warning). */
export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themePreventFlashScript }} />
  ));

  return null;
}
