import { useState } from "react";
import { PageContext } from "./pageContext";
import type { Page } from "./pageContext";

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPage, setSelectedPage] = useState<Page>("search");

  return (
    <PageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </PageContext.Provider>
  );
};

