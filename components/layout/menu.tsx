import React from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";

export const Menu = () => {
  return (
    <Nav className="ml-auto" navbar>
      <Nav.Item>
        <Link href="/australia" passHref>
          <Nav.Link>Australia</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://martinlabs.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://github.com/martindavid/covid19-visualisation"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ fontSize: "1.2rem" }}>
            <i className="fab fa-github" aria-hidden="true"></i>
          </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
