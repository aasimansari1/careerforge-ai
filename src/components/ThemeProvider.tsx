"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border-color)" },
        }}
      />
    </NextThemesProvider>
  );
}
