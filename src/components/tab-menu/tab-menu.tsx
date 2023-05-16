import React, { FC } from 'react';

import "./tab-menu.css"

interface TabMenuProps {
  onOpen: (filetype: 'geojson' | 'wkt') => void
}

const TabMenu: FC<TabMenuProps> = ({ onOpen }) => {

  return (
    <>
      <menu id='tab-menu'>
        <ul className="menu">
          <li>Open
            <ul className="submenu">
              <li onClick={() => onOpen('geojson')}>GeoJSON file</li>
              <li onClick={() => onOpen('wkt')}>WKT file</li>
            </ul>
          </li>
          <li>Save
            <ul className="submenu">
            </ul>
          </li>
          <li>Edit
          </li>
          <li>Style
            <ul className="submenu">
            </ul>
          </li>
        </ul>
      </menu>
    </>
  );
};

export default TabMenu;