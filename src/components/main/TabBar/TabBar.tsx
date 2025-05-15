'use client';

import { TabContainer, TabMenu } from './TabBar.style';

const TabBar = () => {
  const TabMenus = ['꿀머니', '카드', '케피탈', 'FlexRate', '저축은행'];

  return (
    <TabContainer>
      {TabMenus.map((label, idx) => (
        <TabMenu key={idx} $isActive={label === 'FlexRate'}>
          {label}
        </TabMenu>
      ))}
    </TabContainer>
  );
};

export default TabBar;
