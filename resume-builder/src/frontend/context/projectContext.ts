import { createContext } from "react";

export type Project = string; 

export type ProjectContextType = {
  selectedProject: Project;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project>>;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);
