import React, { FC } from 'react';
import { emptyContainer, emptyImg, emptyText } from './Empty.module.css';

const Empty: FC = () => {
  return (
    <div className={emptyContainer}>
      <img
        className={emptyImg}
        src="https://img.alicdn.com/imgextra/i2/O1CN01KKVd4C1CZYSbtwIb2_!!6000000000095-2-tps-240-240.png"
      />
      <div className={emptyText}>当前尚未获取到您的一方功能用量信息，请联系小二咨询</div>
    </div>
  );
};

export { Empty };
