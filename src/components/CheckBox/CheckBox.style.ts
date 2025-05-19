import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const Wrapper = styled.label<{ disabled: boolean; size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ size }) => (size === 'large' ? '16px 12px' : '2px 12px 2px 16px')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const ImageLabelContainer = styled.div`
  display: flex;
  gap: 19px;
`;

export const Label = styled.span<{ disabled: boolean; size: string }>`
  color: ${({ disabled }) => (disabled ? '#aaa' : '#000')};
  ${({ size }) => (size === 'large' ? typoStyleMap['body1_sb'] : typoStyleMap['body2_sb'])};
  color: ${semanticColor.text.normal.sub1};
`;

export const ShowMore = styled.span<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? '#ccc' : '#888')};
  ${typoStyleMap['caption2_r']}
  color: ${semanticColor.text.state.textInfo};
  margin-right: 10px;
`;
