import type { Preview } from '@storybook/nextjs-vite';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobileSmall: { name: 'Mobile Small', styles: { width: '360px', height: '640px' } },
        mobileLarge: { name: 'Mobile Large', styles: { width: '480px', height: '896px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        tabletLandscape: { name: 'Tablet Landscape', styles: { width: '1024px', height: '768px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
        desktopLarge: { name: 'Desktop Large', styles: { width: '1440px', height: '900px' } },
        ultraWide: { name: 'Ultra Wide', styles: { width: '1920px', height: '1080px' } },
      },
    },
    layout: 'fullscreen',
  },
};

export default preview;