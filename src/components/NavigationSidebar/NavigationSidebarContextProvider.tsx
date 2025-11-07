import { useRouter } from "next/router";
import { useMemo, useState, type PropsWithChildren } from "react";
import { NavigationSidebarContext } from "./NavigationSidebarContext";

export const NavigationSidebarContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [previousPathName, setPreviousPathName] = useState(router.pathname);
  if (router.pathname !== previousPathName) {
    setPreviousPathName(router.pathname);
    setIsOpen(false);
  }

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <NavigationSidebarContext value={value}>
      {children}
    </NavigationSidebarContext>
  );
};
