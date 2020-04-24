import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import { Menu } from "./menu";

export const Header = () => {
  return (
    <header className="bg-light">
      <Container fluid>
        <Navbar expand="lg" bg="light" className="bg-light p-0">
          <Link href="/" passHref>
            <Navbar.Brand>Covid19 Viz.</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Menu />
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};
