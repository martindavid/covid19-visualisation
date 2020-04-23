import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";

export const Menu = () => {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link href="https://martinlabs.me" passHref>
          <NavLink target="_blank" rel="noopener noreferrer">
            Blog
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          href="https://github.com/martindavid/covid19-visualisation"
          passHref
        >
          <NavLink target="_blank" rel="noopener noreferrer">
            <div style={{ fontSize: "1.2rem" }}>
              <i className="fab fa-github" aria-hidden="true"></i>
            </div>
          </NavLink>
        </Link>
      </NavItem>
    </Nav>
  );
};
