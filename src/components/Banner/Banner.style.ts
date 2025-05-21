import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';

export const BannerContainer = styled.div<{ $borderNone?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: ${({ $borderNone }) =>
    $borderNone ? 'none' : `1px solid ${semanticColor.border.inactive.default}`};
  padding: 9px 21px;
  border-radius: 15px;
  min-width: fit-content;
  background: ${semanticColor.bg.default};
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 255px;
  min-width: fit-content;
`;

interface BannerLabelProps {
  $bgColor: string;
  $color: string;
}

export const BannerLabel = styled.div<BannerLabelProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  padding: 8px 12px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  margin-right: 10px;
  min-width: fit-content;
`;

export const BannerDesc = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${semanticColor.text.normal.primary};
  min-width: fit-content;
`;
