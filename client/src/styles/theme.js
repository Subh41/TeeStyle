const theme = {
  colors: {
    primary: '#FF5757', // Vibrant red for fashion
    secondary: '#333333', // Dark gray/almost black for fashion contrast
    tertiary: '#FF8A8A', // Lighter red
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#9E9E9E',
      hint: '#9E9E9E',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F8F8F8',
    },
    // Fashion-specific colors
    fashion: {
      men: '#3D5AFE',       // Blue for men's section
      women: '#D500F9',     // Purple for women's section
      highlight: '#FFC107', // Gold/yellow for highlights
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease'
  },
  typography: {
    heading: {
      fontFamily: '"Inter", sans-serif'
    }
  }
};

export default theme;
