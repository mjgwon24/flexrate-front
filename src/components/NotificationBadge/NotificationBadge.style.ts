import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';

export const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const Badge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: ${semanticColor.icon.active.error};
  color: ${semanticColor.text.normal.onPrimary};
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  border: 2px solid ${semanticColor.bg.default};
  box-sizing: border-box;
`;

export const SmallBadge = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: ${semanticColor.icon.active.error};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid ${semanticColor.bg.default};
`;
