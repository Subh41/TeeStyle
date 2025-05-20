import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  .search-and-icons {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  .search-form {
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.sm};
    transition: all ${({ theme }) => theme.transitions.fast};

    &:focus-within {
      background: ${({ theme }) => theme.colors.white};
      box-shadow: ${({ theme }) => theme.shadows.sm};
    }

    .search-input {
      border: none;
      background: transparent;
      padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.text.primary};
      min-width: 200px;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: ${({ theme }) => theme.colors.text.secondary};
      }
    }

    .search-button {
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.text.secondary};
      padding: ${({ theme }) => theme.spacing.xs};
      cursor: pointer;
      transition: color ${({ theme }) => theme.transitions.fast};

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
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
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 1.75rem;
  font-weight: 700;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing.xl};
`;

export const StyledNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}15;
    font-weight: 600;
  }

  svg {
    width: 20px;
    height: 20px;
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
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
  }

  span {
    font-weight: 500;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  min-width: 18px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;
