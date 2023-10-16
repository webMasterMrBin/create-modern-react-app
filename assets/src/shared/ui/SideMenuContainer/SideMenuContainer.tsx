import React, { FC } from 'react';
import { Col } from '@alife/dt-oui';
import { useLocation } from 'react-router-dom';
import { SideMenu } from '@alife/cgp-ui';

const menuList = [
  {
    key: 'product',
    children: [
      {
        link: '/purchase/product',
        label: '版本订购',
        key: 'product',
      },
    ],
  },
  {
    key: 'package',
    children: [
      {
        link: '/purchase/package',
        label: '友盟数据',
        key: 'package',
      },
    ],
  },
];

const SideMenuContainer: FC = () => {
  const { pathname } = useLocation();
  const isShowSideMenu = ['/purchase/product', '/purchase/package'].includes(pathname);
  return <Col>{isShowSideMenu && <SideMenu menuList={menuList} />}</Col>;
};

export { SideMenuContainer };
