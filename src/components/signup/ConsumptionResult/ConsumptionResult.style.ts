import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const CharacterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  padding: 11.5px 7px;
  border-radius: 15px;
  background: ${semanticColor.bg.default};
  box-shadow: 0px 4px 12px 4px rgba(0, 82, 147, 0.2);
`;

export const Tag = styled.div`
  ${typoStyleMap['body2_sb']}
  background: ${semanticColor.bgBtn.active.secondary};
  color: ${semanticColor.text.normal.accent};
  padding: 8px 12px;
  border-radius: 14.313px;
`;

export const Description = styled.div`
  margin-top: 5px;
  ${typoStyleMap['body2_sb']};
  color: ${semanticColor.text.normal.primary};
`;
