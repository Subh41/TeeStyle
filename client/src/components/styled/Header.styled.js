import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.background.starry};
  background-image: linear-gradient(to bottom, #0c0f22, #121733);
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: fixed; /* Changed to fixed position */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px; /* Fixed height for header */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.text.light};
  overflow: visible; /* Changed to visible for dropdowns */
  
  /* Starry background effect */
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 100%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
    background-size: 25px 25px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }
  
  /* Comic style accent at bottom */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.secondary};
    z-index: 1;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 5;
  
  .right-section {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }
  
  .nav-icons {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }

  .search-and-icons {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  .search-form {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all ${({ theme }) => theme.transitions.fast};
    backdrop-filter: blur(5px);

    &:focus-within {
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 0 15px rgba(255, 202, 40, 0.3);
      border-color: ${({ theme }) => theme.colors.secondary};
    }

    .search-input {
      border: none;
      background: transparent;
      padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.white};
      min-width: 200px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    .search-button {
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.secondary};
      padding: ${({ theme }) => theme.spacing.xs};
      cursor: pointer;
      transition: all ${({ theme }) => theme.transitions.fast};

      &:hover {
        color: ${({ theme }) => theme.colors.white};
        transform: scale(1.1);
        text-shadow: 0 0 5px ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  .nav-icons {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
  position: relative;
  z-index: 5;
  letter-spacing: 1px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 500px;

  svg {
    width: 35px;
    height: 35px;
    filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.secondary});
  }

  span {
    position: relative;
    display: inline-block;
    transform: translateZ(10px);
  }

  small {
    color: ${({ theme }) => theme.colors.white};
    text-shadow: none;
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    opacity: 0.8;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 0 0 15px ${({ theme }) => theme.colors.secondary};
    transform: scale(1.02);
    
    svg {
      transform: rotate(-5deg);
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 5;
`;

export const StyledNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  letter-spacing: 0.5px;
  transition: all ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
  overflow: hidden;
  z-index: 1;
  white-space: nowrap; /* Prevent text from wrapping */
  min-width: max-content; /* Ensure the link takes up enough space for its content */
  display: inline-block; /* Keep links as blocks */
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${({ theme }) => theme.colors.secondary};
    transition: all 0.3s ease;
    opacity: 0.2;
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    background-color: rgba(0, 0, 0, 0.5);
    text-shadow: 0 0 8px rgba(255, 202, 40, 0.7);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    
    &::before {
      height: 100%;
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.secondary};
    background: rgba(255, 255, 255, 0.1);
    font-weight: 700;
    box-shadow: 0 0 10px rgba(255, 202, 40, 0.3);
    border: 1px solid rgba(255, 202, 40, 0.3);
    transform: translateY(-2px);
    
    &::before {
      height: 100%;
      opacity: 0.2;
    }
  }

  svg {
    width: 22px;
    height: 22px;
    filter: drop-shadow(0 0 3px ${({ theme }) => theme.colors.secondary});
  }

  &.cart-icon {
    position: relative;
  }
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1); /* Added background for better visibility */
  border: 1px solid ${({ theme }) => theme.colors.secondary}; /* Added border */
  height: 36px; /* Fixed height to ensure it stays within header */

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    text-shadow: 0 0 5px rgba(255, 202, 40, 0.5);
    transform: translateY(-2px);
  }
  
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.heroRed}, ${({ theme }) => theme.colors.heroBlue});
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: radial-gradient(circle at center, transparent 30%, ${({ theme }) => theme.colors.secondary} 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover::before {
      opacity: 0.3;
    }
  }

  span {
    font-weight: 600;
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    letter-spacing: 0.5px;
  }
`;

export const CartBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: ${({ theme }) => theme.colors.heroRed};
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 0;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 10px rgba(211, 47, 47, 0.8);
  border: 2px solid white;
  font-family: Arial, sans-serif;
  z-index: 9999;
  transform: translate(0, 0);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  overflow: visible;
  animation: badgePulse 2s infinite;
  
  @keyframes badgePulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.7);
    }
    70% {
      transform: scale(1.1);
      box-shadow: 0 0 0 6px rgba(211, 47, 47, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(211, 47, 47, 0);
    }
  }
`;

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  color: ${({ theme }) => theme.colors.background.deeper};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: ${({ theme }) => theme.colors.heroRed};
    color: ${({ theme }) => theme.colors.white};
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(211, 47, 47, 0.4);
  }
  
  /* Radial glow effect */
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 202, 40, 0.4) 0%, rgba(255, 202, 40, 0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

export const SearchPopup = styled.div`
  position: fixed;
  top: 80px; /* Match the header height */
  left: 0;
  right: 0;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.background.deeper} 0%, #121733 100%);
  padding: 20px;
  z-index: 1050;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border-top: 3px solid ${({ theme }) => theme.colors.secondary};
  border-bottom: 3px solid ${({ theme }) => theme.colors.secondary};
  transform-origin: top center;
  animation: searchDropIn 0.3s ease-out forwards;
  backdrop-filter: blur(10px);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  
  @keyframes searchDropIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Starry background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.1;
    pointer-events: none;
    z-index: -1;
  }
  
  .search-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    
    /* Comic book style border */
    &::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border: 2px dashed ${({ theme }) => theme.colors.secondary};
      border-radius: 34px;
      opacity: 0.5;
      pointer-events: none;
      animation: pulseBorder 2s infinite;
    }
    
    @keyframes pulseBorder {
      0% { opacity: 0.2; }
      50% { opacity: 0.5; }
      100% { opacity: 0.2; }
    }
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px 60px 15px 25px;
  border-radius: 30px;
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
  font-weight: 500;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    letter-spacing: 1px;
    font-weight: 400;
    font-size: 1.1rem;
  }
  
  &:focus {
    box-shadow: 0 0 25px rgba(255, 202, 40, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5);
    border-color: ${({ theme }) => theme.colors.heroRed};
    transform: translateY(-2px);
  }
`;

export const SearchSubmitButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.heroRed}, ${({ theme }) => theme.colors.villainPurple});
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(255, 202, 40, 0.3);
  font-size: 1.2rem;
  
  /* Comic book style shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    filter: blur(2px);
  }
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 202, 40, 0.5);
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.heroRed}, ${({ theme }) => theme.colors.heroBlue});
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const UserDropdownMenu = styled.div`
  position: fixed; /* Changed to fixed positioning */
  top: 80px; /* Position right below the header */
  right: 20px;
  width: 280px;
  max-height: 500px; /* Fixed maximum height */
  overflow-y: auto; /* Allow scrolling if needed */
  background: #4a148c; /* Solid color for better visibility */
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 202, 40, 0.3); /* Enhanced shadow with glow */
  z-index: 9999; /* Highest possible z-index */
  transform-origin: top right;
  animation: dropdownEnter 0.3s ease-out forwards;
  border: 3px solid ${({ theme }) => theme.colors.secondary}; /* Thicker gold border */
  border-top: 5px solid ${({ theme }) => theme.colors.secondary};
  margin-top: 0;
  
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
    opacity: 0.15;
    pointer-events: none;
    z-index: -1;
  }
  
  /* Glow effect to make it stand out */
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, rgba(255,202,40,0.1), rgba(211,47,47,0.1));
    border-radius: 10px;
    z-index: -2;
    filter: blur(5px);
    pointer-events: none;
  }
  
  @keyframes dropdownEnter {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const UserDropdownHeader = styled.div`
  padding: 18px 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  background: rgba(0, 0, 0, 0.3);
  margin-bottom: 8px;
  
  .user-name {
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 4px;
    letter-spacing: 0.5px;
    text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
  }
  
  .user-email {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const UserDropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  letter-spacing: 0.5px;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  margin: 4px 8px;
  border-radius: 8px;
  border-left: 3px solid ${({ theme }) => theme.colors.secondary};
  
  svg {
    margin-right: 10px;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateX(5px);
    
    svg {
      transform: scale(1.2);
    }
  }
`;

export const UserDropdownButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.heroRed};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  svg {
    margin-right: 10px;
    font-size: 1.1rem;
  }
  
  &:hover {
    background: rgba(211, 47, 47, 0.1);
    transform: translateX(5px);
    
    svg {
      transform: scale(1.2);
    }
  }
`;
