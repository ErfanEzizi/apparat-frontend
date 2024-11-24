import React, { useState, useEffect } from "react";

type BreadcrumbProps = {
  message: string;
  type?: "success" | "error" | "info"; // Define different message types
  duration?: number; // Duration in milliseconds to auto-hide the breadcrumb
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ message, type = "info", duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bgColor =
    type === "success" ? "bg-primary" : type === "error" ? "bg-red-600" : "bg-primary-lightest";

  return (
    <div className={`${bgColor} text-white p-4 rounded shadow-md fixed top-4 right-4`}>
      {message}
    </div>
  );
};

export default Breadcrumb;
