import React from "react";
import { ErrorBoundary } from "../error-boundary";
import { Header, Footer } from "components/layout";

type LayoutProps = {
  children: React.ReactChildren | React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <main className="container mt-3">{props.children}</main>
      </ErrorBoundary>
      <Footer />
    </>
  );
};
