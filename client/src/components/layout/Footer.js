import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.background.starry};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
  position: relative;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.white};
  
  /* Stars effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
    background-size: 25px 25px;
    opacity: 0.2;
    pointer-events: none;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLogo = styled.div`
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
  letter-spacing: 1px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    font-size: 1rem;
    letter-spacing: 0.5px;
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
      text-shadow: 0 0 5px rgba(255, 202, 40, 0.5);
      transform: translateY(-2px);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.secondary};
    transition: all ${({ theme }) => theme.transitions.fast};
    border: 1px solid rgba(255, 202, 40, 0.3);
    
    svg {
      font-size: 1.25rem;
    }
    
    &:hover {
      transform: translateY(-3px);
      background: rgba(255, 202, 40, 0.2);
      box-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
    }
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterLogo>TeeStyle</FooterLogo>
        
        <FooterLinks>
          <Link to="/">Home</Link>
          <Link to="/">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blog">Blog</Link>
        </FooterLinks>
        
        <SocialIcons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
        </SocialIcons>
        
        <Copyright>&copy; {new Date().getFullYear()} TeeStyle - Superhero T-Shirts. All rights reserved.</Copyright>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
