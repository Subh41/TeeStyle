const theme = {
  colors: {
    // Starry Night inspired colors
    primary: '#1a237e', // Night blue (deep blue from starry night)
    secondary: '#ffca28', // Star gold (bright, vibrant star color)
    tertiary: '#3949ab', // Starry blue (medium blue from the sky)
    
    // Comic superhero inspired colors
    heroRed: '#d32f2f', // Hero red (like Superman, Spider-Man)
    heroBlue: '#0277bd', // Hero blue (like Captain America, Superman)
    villainPurple: '#4a148c', // Villain purple (like Thanos, Joker)
    actionYellow: '#ffc107', // Action highlight color
    
    // Standard UI colors
    success: '#43a047',
    error: '#e53935',
    warning: '#ffb300',
    info: '#039be5',
    white: '#FFFFFF',
    black: '#000000',
    
    // Starry sky gradients
    nightSky: {
      dark: '#121858', // Darkest part of the night sky
      medium: '#283593', // Medium dark blue for night sky
      light: '#5c6bc0', // Lighter blue for twilight areas
    },
    
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
      secondary: '#455a64',
      light: '#FFFFFF',
      accent: '#ffca28', // Star gold for accent text
    },
    
    background: {
      paper: '#FFFFFF',
      default: '#F8F8F8',
      starry: 'linear-gradient(to bottom, #121858, #283593)', // Starry night gradient
      comic: '#FFFFFF', // Comic page white background
    },
    
    // Comic universe categories
    universe: {
      marvel: '#e53935', // Marvel red
      dc: '#0277bd',     // DC blue
      anime: '#7e57c2',  // Anime purple
      indie: '#26a69a',  // Indie teal
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
      fontFamily: '"Bangers", "Bebas Neue", sans-serif',
      weight: 700
    },
    body: {
      fontFamily: '"Roboto", sans-serif',
      regular: 400,
      bold: 700
    },
    sizes: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      md: '1.125rem',    // 18px
      lg: '1.25rem',     // 20px
      xl: '1.5rem',      // 24px
      '2xl': '1.875rem', // 30px
      '3xl': '2.25rem',  // 36px
      '4xl': '3rem',     // 48px
      hero: '4rem'       // 64px
    }
  },
  
  // Comic-style effects
  effects: {
    boxShadow: {
      hero: '0 4px 6px -1px rgba(25, 118, 210, 0.5), 0 2px 4px -1px rgba(25, 118, 210, 0.06)',
      villain: '0 4px 6px -1px rgba(74, 20, 140, 0.5), 0 2px 4px -1px rgba(74, 20, 140, 0.06)',
      action: '0 0 10px 2px rgba(255, 193, 7, 0.4)'
    },
    textShadow: {
      heroic: '2px 2px 0px rgba(2, 119, 189, 0.5)',
      villainous: '2px 2px 0px rgba(74, 20, 140, 0.5)',
      starlight: '0 0 10px rgba(255, 193, 7, 0.8), 0 0 20px rgba(255, 193, 7, 0.5)'
    },
    border: {
      comic: '2px solid #000000',
      dashed: '2px dashed #000000',
      heroic: '2px solid #0277bd',
      villainous: '2px solid #4a148c'
    },
    comicBg: {
      dotted: 'radial-gradient(#000000 3px, transparent 3px)',
      halftone: 'radial-gradient(#000000 1px, transparent 1px)'
    }
  }
};

export default theme;
