import React from 'react';
import Loading from '../Loading';
import Lower from '@/components/Lower';
import { useAppReady } from 'mincu-react';

const isLower = location.href.includes('?lower=true');
const MincuProvider: React.FC = ({ children = null }) => {
  const isReady = useAppReady(() => {
    // eslint-disable-next-line no-alert
    alert('请使用南大家园打开');
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
