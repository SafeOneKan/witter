"use client";

import { ThemeProvider } from "next-themes";

const ThemePro = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ThemePro;
