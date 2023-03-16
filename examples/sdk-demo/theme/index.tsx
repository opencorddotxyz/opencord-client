import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: '0',
        padding: '0',
        width: '100vw',
        height: '100vh',
        webkitTapHighlightColor: 'transparent',
        background: '#282828',
      },
    },
  },
});

export default theme;
