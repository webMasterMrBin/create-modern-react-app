import React, { FC, StrictMode, lazy, Suspense } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { PageContainer, SideMenuContainer } from 'src/shared';

const demo = lazy(() => import('src/pages/demo'));
const RouteProvider: FC = () => {
  return (
    <BrowserRouter>
      <StrictMode>
        
      </StrictMode>
    </BrowserRouter>
  );
};

export default RouteProvider;
