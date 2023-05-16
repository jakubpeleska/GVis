import React, { FC } from 'react';

import "./footer.css"

const Footer: FC = () => {

  const copyright = '©Jakub Peleška 2023'

  const topic = `Vizualizátor GeoJSON - GVis
    Bude se jednat o sigle page aplikaci, která bude zprostředkovávat vizualizaci souborů ve formátu GeoJSON.
    Stránka bude mít dvě hlavní části - mapu s vizualizací a sidebar s různými akcemi.
    Nahrávaní GeoJSON souborů bude možné přímo z lokálního zařízení nebo pomocí URL.
    Soubory bude možné editovat, specifikovat jejich projekci a upravovat parametry vizualizace.`

  return (
    <>
      <footer id='footer'>
        <p>{copyright}</p>
        <p>{topic}</p>
      </footer>
    </>
  );
};

export default Footer;