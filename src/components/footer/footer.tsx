import { FC } from "react";

import "./footer.css";

const Footer: FC = () => {
  const copyright = "©Jakub Peleška 2023";

  return (
    <>
      <footer id="footer">
        <p>{copyright}</p>
        <a href="https://github.com/jakubpeleska/GVis" target="_blank">
          Source Code
        </a>
      </footer>
    </>
  );
};

export default Footer;
