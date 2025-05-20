import React from 'react';
import styled from 'styled-components';

const RecommendationsSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Message = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Recommendations = () => {
  return (
    <RecommendationsSection>
      <Title>Recommended for You</Title>
      <Message>Personalized recommendations will appear here once you start browsing products.</Message>
    </RecommendationsSection>
  );
};

export default Recommendations;
