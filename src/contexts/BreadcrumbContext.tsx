import React, { createContext, useContext, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

type BreadcrumbContextType = {
  setBreadcrumb: (message: string, type?: "success" | "error" | "info") => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [breadcrumb, setBreadcrumbState] = useState<{
    message: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  const setBreadcrumb = (message: string, type?: "success" | "error" | "info") => {
    setBreadcrumbState({ message, type });
    setTimeout(() => setBreadcrumbState(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <BreadcrumbContext.Provider value={{ setBreadcrumb }}>
      {children}
      {breadcrumb && <Breadcrumb message={breadcrumb.message} type={breadcrumb.type} />}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  return context;
};
