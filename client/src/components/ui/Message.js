import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case 'error':
        return '#FEE2E2';
      case 'success':
        return '#D1FAE5';
      case 'warning':
        return '#FEF3C7';
      default:
        return theme.colors.gray[100];
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case 'error':
        return '#991B1B';
      case 'success':
        return '#065F46';
      case 'warning':
        return '#92400E';
      default:
        return '#1F2937';
    }
  }};
  border: 1px solid ${({ variant }) => {
    switch (variant) {
      case 'error':
        return '#FCA5A5';
      case 'success':
        return '#6EE7B7';
      case 'warning':
        return '#FCD34D';
      default:
        return '#E5E7EB';
    }
  }};
`;

const Message = ({ variant = 'info', message }) => {
  return <MessageContainer variant={variant}>{message}</MessageContainer>;
};

export default Message;
