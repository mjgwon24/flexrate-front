import styled from '@emotion/styled';

import { semanticColor } from "@/styles/colors";
import { typoStyleMap } from "@/styles/typos";

export const PageContainer = styled.div`
    padding: 30px;
    width: 100%;
`;

export const ContentColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const FilterRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const FilterLabel = styled.p`
    margin: 0;
    font-size: 1rem;
    color: #3c3c3c;
    min-width: fit-content;
`;

export const ModalTitle = styled.div`
  padding: 12px 0px 12px 0px;
  ${typoStyleMap['title3']};
  color: ${semanticColor.text.normal.primary};
`;

export const ModalInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${semanticColor.border.inactive.default};
`;

export const ModalInfoKeyColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ModalInfoValueColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  gap: 0.5rem;
`;

export const InfoLabel = styled.p`
  color: ${semanticColor.text.normal.sub2};
  margin: 0;
`;

export const InfoValue = styled.p`
  color: ${semanticColor.text.normal.sub2};
  margin: 0;
`;