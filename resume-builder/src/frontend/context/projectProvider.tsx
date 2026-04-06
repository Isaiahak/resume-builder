import { useState } from "react";
import { ProjectContext } from "./projectContext";
import type { Project } from "./projectContext";

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject}}>
      {children}
    </ProjectContext.Provider>
  );
};
