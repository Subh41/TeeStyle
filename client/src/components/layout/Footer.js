import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
