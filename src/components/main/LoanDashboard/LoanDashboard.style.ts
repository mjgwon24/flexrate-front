import { primitiveColor, semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const RecentLoanProgressContainer = styled.div`
  height: 251px;
  width: 100%;
  border-radius: 15px;
  padding: 18px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  background-color: ${primitiveColor.background.cardBg};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

export const Title = styled.div`
  ${typoStyleMap['body2_eb']};
  color: ${semanticColor.text.normal.sub3};
`;

export const AccountContainer = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
`;

export const Account = styled.div`
  ${typoStyleMap['display']};
  color: ${semanticColor.text.normal.primary};
`;

export const TransparentCardContainer = styled.div`
  display: flex;
`;

export const TransparentCard = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const TransparentCardTitle = styled.div`
  ${typoStyleMap['body2_sb']};
  color: ${semanticColor.text.normal.sub3};
`;

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TransparentCardAccount = styled.div`
  ${typoStyleMap['title2']};
  color: ${semanticColor.text.normal.primary};
`;

export const Description = styled.div`
  padding: 2px 8px;
  background-color: ${semanticColor.bg.default};
  color: ${semanticColor.text.normal.sub3};
  ${typoStyleMap['caption3_b']};
  border-radius: 15px;
`;
