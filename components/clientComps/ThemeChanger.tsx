"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeChanger = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [client, setclient] = useState(false);

  useEffect(() => {
    setclient(true);
  }, []);
  const handletheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return client ? (
    <button onClick={handletheme}>{theme === "dark" ? "light" : "dark"}</button>
  ) : (
    <div>loading...</div>
  );
};

export default ThemeChanger;
