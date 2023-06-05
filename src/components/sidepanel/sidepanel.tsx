import { FC } from 'react';

interface Props {
  option: 'none' | 'edit' | 'style'
}

const Sidepanel: FC<Props> = () => {

  return (
    <aside id='sidepanel'>

    </aside>
  );
};

export default Sidepanel;