import { initialize, mswDecorator } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';

initialize();

export const decorators = [mswDecorator];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
