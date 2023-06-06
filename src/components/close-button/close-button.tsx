import { FC } from "react";

import "./close-button.css";

import CrossSVG from "../../assets/cross.svg";

interface Props {
  width: number;
  height: number;
  onClose: () => void;
}

const CloseButton: FC<Props> = ({ height, width, onClose }) => {
  return (
    <img
      className="close-button"
      src={CrossSVG}
      width={width}
      height={height}
      onClick={onClose}
    />
  );
};

export default CloseButton;
