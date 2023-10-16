import React, { FC } from 'react';
import classname from 'classnames';
import { cardContainer } from './CardContainer.module.css';

const CardContainer: FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <div className={classname(cardContainer, className)}>{children}</div>;
};

export { CardContainer };
