import React from "react";

const Loader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-auto">
      <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-yellow-600 font-medium">{text}</span>
    </div>
  );
};

export default Loader;
