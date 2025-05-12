'use client';

import styled from '@emotion/styled';
import Link from 'next/link';

export const SidebarWrapper = styled.aside`
  width: 250px;
  min-height: calc(100vh - 73px);
  background-color: #f9fafc;
  padding: 24px 16px;
  border-right: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 24px;
  span {
    font-weight: 400;
    font-size: 14px;
    color: #9fa4b0;
    margin-left: 4px;
  }
`;

export const Welcome = styled.div`
  font-size: 14px;
  color: #414141;
  margin-bottom: 32px;
`;

export const NavSection = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`;

export const NavLink = styled(Link)`
  display: block;
  padding: 8px 0;
  color: #222;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    color: #008eff;
  }
`;
