import React from "react";
import styled from "styled-components";

const CustomFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
`;

export const Footer = () => {
  return (
    <CustomFooter className="bg-dark">
      <div className="container">
        <span className="text-white">
          &#169;
          {`${new Date().getFullYear()} Martinlabs.me All Rights Reserved`}
        </span>
      </div>
    </CustomFooter>
  );
};

Footer.displayName = "Footer";
