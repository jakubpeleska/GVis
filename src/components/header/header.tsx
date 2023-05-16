import { FC } from 'react';

import "./header.css"

const Header: FC = () => {

  const title = 'GVis'
  const otherInfo = 'GeoJSON visualizer and converter'

  return (
    <>
      <header id='header'>
        <div id='header-container'>
          <h1>{title}</h1>
          <h2>{otherInfo}</h2>
        </div>
      </header>
    </>
  );
};

export default Header;