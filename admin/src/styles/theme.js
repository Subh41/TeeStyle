const theme = {
  colors: {
    primary: '#1976D2',
    secondary: '#FFCA28',
    heroRed: '#D32F2F',
    heroBlue: '#1565C0',
    villainPurple: '#6A1B9A',
    success: '#43A047',
    error: '#D32F2F',
    warning: '#FFA000',
    info: '#0288D1',
    white: '#FFFFFF',
    black: '#000000',
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
      light: '#ECEFF1',
      dark: '#263238'
    },
    background: {
      main: '#121212',
      paper: '#1E1E1E',
      deeper: '#0A0A0A',
      starry: '#121212'
    }
  },
  typography: {
    heading: {
      fontFamily: '"Bangers", "Comic Sans MS", cursive',
      fontWeight: 700
    },
    body: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '50%'
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.3)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.3)'
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  effects: {
    textShadow: {
      normal: '0 2px 4px rgba(0, 0, 0, 0.5)',
      starlight: '0 0 8px rgba(255, 202, 40, 0.5), 0 0 15px rgba(255, 202, 40, 0.3)'
    }
  }
};

export default theme;
