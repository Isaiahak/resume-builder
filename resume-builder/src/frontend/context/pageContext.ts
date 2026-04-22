import { createContext } from "react";

export type Page = "search" | "project" | "add" | "description"; 

export type PageContextType = {
  selectedPage: Page;
  setSelectedPage: React.Dispatch<React.SetStateAction<Page>>;
};

export const PageContext = createContext<PageContextType | null>(null);
