import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 24px;
`;

export const Title = styled.div`
  ${typoStyleMap['head1']};
  text-align: center;
  color: ${semanticColor.text.normal.primary};
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 새로 추가하는 스타일 (배경 없애고, 텍스트 컬러 및 커서 조정)
export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${semanticColor.text.normal.sub2};
  ${typoStyleMap['body2_m']};
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;