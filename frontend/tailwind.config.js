module.exports = {
  theme: {
    fontFamily: {
      sans: [
        '"IBM Plex Sans"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ],
      mono: [
        '"IBM Plex Mono"',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    extend: {
      colors: {
        blue: {
          50: '#f1f6ff',
          100: '#d0defe',
          200: '#a3bbfc',
          300: '#7c97fb',
          400: '#5c7bf9',
          500: '#405ae1',  // Your custom blue
          600: '#354bbf',
          700: '#2c40a1',
          800: '#233683',
          900: '#1a2b66',
          950: '#162259'
        }
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    }
  }
}