import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Roboto:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    background-color: ${({ theme }) => theme.colors.background.main};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.5;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: -1;
    pointer-events: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.light};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  button {
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, select, textarea {
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    font-size: 1rem;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  /* Toast styling */
  .Toastify__toast {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  .Toastify__toast--success {
    background: ${({ theme }) => theme.colors.success};
  }

  .Toastify__toast--error {
    background: ${({ theme }) => theme.colors.error};
  }

  .Toastify__toast--warning {
    background: ${({ theme }) => theme.colors.warning};
  }

  .Toastify__toast--info {
    background: ${({ theme }) => theme.colors.info};
  }
`;

export default GlobalStyles;
