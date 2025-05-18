import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div<{ open: boolean }>`
  width: 100%;
  padding: 0px 16px;
  border: 1px solid ${semanticColor.bgBtn.active.sub3};
  border-radius: 12px;
  overflow: hidden;
  background: ${semanticColor.bg.default};
`;

export const AccordionValue = styled.div`
  ${typoStyleMap['body1_m']};
  padding: 0px 16px;
`;

export const Title = styled.div`
  ${typoStyleMap['body2_m']};
  margin-bottom: 1.5px;
  margin-left: 10px;
  padding: 12px 0px 1.5px 0px;
  color: ${semanticColor.text.normal.sub1};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0px;
  cursor: pointer;
  font-size: 16px;
`;

export const ImageContainer = styled.div<{ $open: boolean }>`
  transition: transform 0.3s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const Option = styled.li<{ selected: boolean }>`
  ${typoStyleMap['body1_m']};
  padding: 16px;
  font-size: 15px;
  cursor: pointer;
  background: ${({ selected }) =>
    selected ? semanticColor.bgBtn.active.secondary : semanticColor.bg.default};
  border-top: 1px solid ${semanticColor.border.inactive.default};

  & + & {
    border-top: 1px solid #eee;
  }
`;
