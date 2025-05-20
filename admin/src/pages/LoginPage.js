import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: authError, user } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/admin/dashboard');
    }
    
    // Set error message from Redux state
    if (authError) {
      setError(authError);
    }
  }, [user, authError, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Dispatch login action
    const result = await dispatch(login(formData));
    
    // If login was successful, navigate to dashboard
    if (!result.error) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <LoginContainer>
      <BackgroundOverlay />
      
      <LoginCard
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoContainer>
          <Logo>TeeStyle</Logo>
          <Subtitle>Admin Panel</Subtitle>
        </LogoContainer>
        
        <LoginForm onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage>
              <FiAlertCircle />
              <span>{error}</span>
            </ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </InputWrapper>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <InputIcon>
                <FiLock />
              </InputIcon>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </InputWrapper>
          </FormGroup>
          
          <LoginButton 
            type="submit" 
            disabled={loading}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </LoginButton>
          
          <LoginHint>
            Demo credentials: admin@teestyle.com / admin123
          </LoginHint>
        </LoginForm>
        
        <PoweredBy>
          TeeStyle Admin © {new Date().getFullYear()}
        </PoweredBy>
      </LoginCard>
    </LoginContainer>
  );
};

// Styled components with superhero theme
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.deeper};
  position: relative;
  overflow: hidden;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(21, 101, 192, 0.3), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(106, 27, 154, 0.3), transparent 40%);
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: -1;
  }
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl}, 0 0 30px rgba(255, 202, 40, 0.2);
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
  
  /* Starry effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 100px 100px;
    z-index: -1;
    opacity: 0.5;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.light};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.3);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

const LoginButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.heroBlue}, ${({ theme }) => theme.colors.primary});
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.heroBlue});
    box-shadow: 0 0 15px rgba(25, 118, 210, 0.5);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(211, 47, 47, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 0.9rem;
  
  svg {
    color: ${({ theme }) => theme.colors.error};
    flex-shrink: 0;
  }
`;

const LoginHint = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  opacity: 0.7;
  font-style: italic;
`;

const PoweredBy = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default LoginPage;
