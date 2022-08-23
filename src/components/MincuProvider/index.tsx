import React from 'react';
import Loading from '../Loading';
import Lower from '@/components/Lower';
import { useAppReady } from 'mincu-react';

const isLower = location.href.includes('?lower=true');
const MincuProvider: React.FC = ({ children = null }) => {
  const isReady = useAppReady(() => {
    // eslint-disable-next-line no-alert
    alert('请登录云家园在错峰返校模块登记');
    window.location.href="https://www.ncuos.com/index/app_cffx"
  });

  if (isLower) {
    return <Lower />;
  }

  if (isReady) {
    return <>{children}</>;
  }

  return (
    <>
      <Loading />
    </>
  );
};

export default MincuProvider;
