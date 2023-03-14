'use client';

import dynamic from 'next/dynamic';
import { isDesktop } from '../utils/platform';

const Page = dynamic(
  () => {
    return isDesktop()
      ? import('../platform/pc')
      : import('../platform/mobile');
  },
  {
    ssr: false,
  }
);

const App = () => {
  return <Page />;
};

export default App;
