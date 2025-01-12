import React from 'react';

interface NavbarProps {
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  return (
    <nav className={`navbar-${theme}`}>
      Super Cool Title
    </nav>
  );
};

export default Navbar;
