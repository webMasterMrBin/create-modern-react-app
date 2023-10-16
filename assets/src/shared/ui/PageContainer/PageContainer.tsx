import React, { FC } from 'react';
import { pageContainer } from './PageContainer.module.css';

const PageContainer: FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={pageContainer}>{children}</div>;
};

export { PageContainer };
