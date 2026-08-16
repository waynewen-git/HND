"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type NavMenuLabel = "Guitars" | "Amps" | "Speakers" | "Lifestyle";

interface NavMenuContextValue {
  openMenu: string | null;
  setOpenMenu: (label: string | null) => void;
  openCategoryMenu: (label: string) => void;
  keepMenuOpen: () => void;
  scheduleCloseMenu: () => void;
}

const NavMenuContext = createContext<NavMenuContextValue>({
  openMenu: null,
  setOpenMenu: () => {},
  openCategoryMenu: () => {},
  keepMenuOpen: () => {},
  scheduleCloseMenu: () => {},
});

const CLOSE_DELAY_MS = 220;

export function NavMenuProvider({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenuState] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const setOpenMenu = useCallback(
    (label: string | null) => {
      clearCloseTimer();
      setOpenMenuState(label);
    },
    [clearCloseTimer],
  );

  const keepMenuOpen = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const scheduleCloseMenu = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenMenuState(null);
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const openCategoryMenu = useCallback(
    (label: string) => {
      clearCloseTimer();
      setOpenMenuState(label);
    },
    [clearCloseTimer],
  );

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <NavMenuContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        openCategoryMenu,
        keepMenuOpen,
        scheduleCloseMenu,
      }}
    >
      {children}
    </NavMenuContext.Provider>
  );
}

export function useNavMenu() {
  return useContext(NavMenuContext);
}
