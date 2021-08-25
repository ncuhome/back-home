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
          为统筹做好学校秋季开学及常态化疫情防控工作，切实保障全体师生员工的安全健康以及正常的教育教学秩序。
          <br />
          南昌大学所有符合正常来校条件的学生，需要在入校前进行入校申请，通过辅导员审批后方可入校。
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
