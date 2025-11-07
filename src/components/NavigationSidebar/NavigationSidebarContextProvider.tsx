import { useRouter } from "next/router";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { NavigationSidebarContext } from "./NavigationSidebarContext";

export const NavigationSidebarContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <NavigationSidebarContext value={value}>
      {children}
    </NavigationSidebarContext>
  );
};
