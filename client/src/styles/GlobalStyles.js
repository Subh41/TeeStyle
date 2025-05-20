import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Bebas+Neue&family=Roboto:wght@400;500;700&family=Comic+Neue:wght@400;700&display=swap');

  /* Keyframe animations */
  @keyframes twinkle {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes heroShine {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes starryBackground {
    from { background-position: 0 0; }
    to { background-position: 100% 100%; }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    overflow-x: hidden;
  }
  
  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.colors.background.starry};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.6;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    padding-top: 80px; /* Add padding to account for fixed header */
    
    /* Starry background effect */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background-image: 
        radial-gradient(2px 2px at 40px 60px, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
        radial-gradient(2px 2px at 20px 50px, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0)),
        radial-gradient(3px 3px at 30px 100px, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
        radial-gradient(2px 2px at 40px 60px, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
        radial-gradient(4px 4px at 110px 70px, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0)),
        radial-gradient(2px 2px at 10px 30px, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0));
      background-size: 200% 200%;
      animation: starryBackground 80s linear infinite;
    }
    
    /* Animated stars */
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-image: 
        radial-gradient(1px 1px at 150px 150px, rgba(255, 202, 40, 0.8), rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 250px 100px, rgba(255, 202, 40, 0.9), rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 50px 200px, rgba(255, 202, 40, 0.7), rgba(0, 0, 0, 0)),
        radial-gradient(1px 1px at 300px 250px, rgba(255, 202, 40, 0.6), rgba(0, 0, 0, 0));
      background-repeat: repeat;
      animation: twinkle 6s infinite alternate;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bangers', 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    text-shadow: ${({ theme }) => theme.effects.textShadow.comicBold};
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 3rem;
    letter-spacing: 2px;
    text-align: center;
    position: relative;
    margin: 2rem 0;
    
    /* Comic style heading with decorative stars */
    &::before, &::after {
      content: '★';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: ${({ theme }) => theme.colors.secondary};
      font-size: 1.5rem;
      animation: twinkle 2s infinite alternate;
    }
    
    &::before {
      left: -30px;
    }
    
    &::after {
      right: -30px;
    }
    
    /* Comic style burst effect */
    @media (min-width: 768px) {
      &::before {
        content: '✶ ✦';
        left: -60px;
      }
      
      &::after {
        content: '✦ ✶';
        right: -60px;
      }
    }
  }

  h2 {
    font-size: 2.25rem;
    position: relative;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.secondary}, transparent);
    }
  }

  h3 {
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.secondary};
  }

  button {
    cursor: pointer;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
    border: none;
    transition: all 0.3s ease;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: translateY(1px);
    }
    
    &:focus {
      outline: none;
    }
    
    /* Comic style shine effect */
    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%);
      opacity: 0;
      transform: scale(0.5);
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
    }
    
    &:hover::after {
      opacity: 1;
      transform: scale(1);
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary};
    transition: all 0.3s ease;
    position: relative;
    font-weight: 500;
    
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      text-shadow: 0 0 8px rgba(255, 202, 40, 0.5);
    }
  }

  ul {
    list-style: none;
  }
  
  /* Section styling */
  section {
    position: relative;
    padding: 2rem 0;
    
    /* Comic panel style border */
    &.comic-panel {
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2rem;
      margin: 2rem 0;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
        pointer-events: none;
      }
    }
  }
  
  /* Comic-style buttons */
  .btn-hero {
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.heroRed}, ${({ theme }) => theme.colors.villainPurple});
    background-size: 200% 200%;
    animation: heroShine 5s ease infinite;
    color: white;
    padding: 0.75rem 2rem;
    font-weight: 700;
    border-radius: 50px;
    box-shadow: 0 5px 15px rgba(211, 47, 47, 0.3);
    text-transform: uppercase;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(211, 47, 47, 0.4);
    }
    
    /* Comic style starburst for important buttons */
    &.featured {
      &::before {
        content: '';
        position: absolute;
        top: -20px;
        right: -20px;
        width: 60px;
        height: 60px;
        background: ${({ theme }) => theme.colors.secondary};
        border-radius: 50%;
        z-index: -1;
        opacity: 0.3;
      }
    }
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
    font-size: 1.1rem;
    border-radius: 4px;
    border: none;
    text-transform: uppercase;
    box-shadow: ${({ theme }) => theme.effects.boxShadow.hero};
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.effects.boxShadow.action};
    }
  }
  
  .btn-villain {
    background: linear-gradient(to right, ${({ theme }) => theme.colors.villainPurple}, ${({ theme }) => theme.colors.primary});
    color: white;
    padding: 0.75rem 1.5rem;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
    font-size: 1.1rem;
    border-radius: 4px;
    border: none;
    text-transform: uppercase;
    box-shadow: ${({ theme }) => theme.effects.boxShadow.villain};
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.effects.boxShadow.action};
    }
  }
  
  /* Star-themed cards */
  .starry-card {
    background: ${({ theme }) => theme.colors.background.starry};
    border-radius: 8px;
    padding: 1rem;
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.3;
      pointer-events: none;
    }
  }
  
  /* Comic-style section headers */
  .comic-section-title {
    font-family: 'Bangers', cursive;
    font-size: 2.5rem;
    text-align: center;
    padding: 1rem 0;
    position: relative;
    margin: 2rem 0;
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 2px 2px 0 ${({ theme }) => theme.colors.secondary}, 
                 4px 4px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: ${({ theme }) => theme.colors.secondary};
      border-radius: 2px;
    }
  }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export default GlobalStyles;
