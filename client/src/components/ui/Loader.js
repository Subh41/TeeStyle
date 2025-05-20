import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const SpinnerContainer = styled.div`
  width: 40px;
  height: 40px;
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 4px solid ${({ theme }) => theme.colors.gray[200]};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    </LoaderWrapper>
  );
};

export default Loader;
