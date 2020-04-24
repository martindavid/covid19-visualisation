import React from "react";
import LoaderSpinner from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="component-loader">
      <LoaderSpinner type="Rings" color="#FBC9CE" height={80} width={80} />
    </div>
  );
};
