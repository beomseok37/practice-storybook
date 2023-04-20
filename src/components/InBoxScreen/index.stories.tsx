import { Provider } from 'react-redux';
import { StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { fireEvent, within, waitFor } from '@storybook/testing-library';

import store from 'src/redux/store';

import { mockedState } from 'src/components/TaskList/__test__/index.stories';

import InBoxScreen from '.';

export default {
  component: InBoxScreen,
  title: 'InBoxScreen',
  decorators: [
    (Story: StoryFn) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

const Template: StoryFn = () => <InBoxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.json(mockedState.tasks));
        }
      ),
    ],
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(async () => {
    const pinButton3 = canvas
      .getByDisplayValue('Task 3')
      .parentElement?.parentElement?.getElementsByTagName(
        'button'
      )[0] as Element;
    const pinButton5 = canvas
      .getByDisplayValue('Task 5')
      .parentElement?.parentElement?.getElementsByTagName(
        'button'
      )[0] as Element;

    fireEvent.click(pinButton3);
    fireEvent.click(pinButton5);
  });
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    ],
  },
};
