import React from 'react';
import { WingBlank, Card } from 'antd-mobile';
import dataModule from 'mincu-data';
import network from 'mincu-network';
import store from '@/store';

function Header() {
  const [state, userDispatchers] = store.useModel('common');
  const { initialStatus } = userDispatchers;

  const getName = () => {
    const sex = dataModule.appData.user.profile.entireProfile.base_info.xb.dm ? '👨‍🎓' : '👩‍🎓';
    const { name } = dataModule.appData.user.profile.basicProfile;
    return `${sex} ${name}`;
  };

  React.useEffect(() => {
    network.token = dataModule.appData.user.token;
    initialStatus();
  }, []);

  return (
    <WingBlank size="md">
      <Card full>
        <Card.Header
          style={{ background: state.labelColor }}
          title={getName()}
          extra={dataModule.appData.user.profile.basicProfile.department}
        />
        <Card.Body>
          为预防新冠疫情，南昌大学所有在校本科生，需要在入校前进行入校申请，通过辅导员审批后方可入校。
          <br />
          信息可多次填报，以最后一次填报为准。如果审核通过再重新填报，辅导员需要重新审核。
        </Card.Body>
        <Card.Footer
          content={
            <>
              当前状态: <span style={{ color: state.labelColor }}>{state.status}</span>
            </>
          }
        />
      </Card>
    </WingBlank>
  );
}

export default Header;
