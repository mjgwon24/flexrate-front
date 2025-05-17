'use client';

import styled from '@emotion/styled';

export const SidebarWrapper = styled.aside`
  min-width: 230px;
  min-height: calc(100vh - 73px);
  background-color: #f9fafc;
  padding: 24px 16px;
  border-right: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
`;

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const ProfileName = styled.span`
  color: #008eff;
  font-weight: 700;
  font-size: 15px;
`;

export const ProfileGreeting = styled.p`
  font-weight: 700;
  font-size: 15px;
  margin: 0;
`;

export const SidebarHr = styled.hr`
  margin: 20px 0 25px 0;
  border: 0.05rem solid #d9d9d9;
  width: 100%;
`;

export const MenuSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 0.4rem;
  width: 100%;
`;

export const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const MenuSectionTitle = styled.p`
  color: #a6a6a6;
  font-size: 14px;
  margin: 0;
`;

export const MenuItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SelectedBar = styled.div`
  width: 6px;
  height: calc(100% + 10px);
  background: #008eff;
  border-radius: 0 4px 4px 0;
  position: absolute;
  left: -22px;
  top: -5px;
`;

export const MenuItem = styled.p<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? '#262626' : '#414141')};
  font-weight: ${({ selected }) => (selected ? 800 : 600)};
  font-size: 14px;
  cursor: pointer;
  margin: 0;
  padding-left: 0.4rem;
  z-index: 1;

  &:hover {
    color: #008eff;
  }
`;
