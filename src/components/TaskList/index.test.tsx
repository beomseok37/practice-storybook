import { render, screen } from '@testing-library/react';

import { composeStories } from '@storybook/react';

import * as TaskListStories from './index.stories';

const { WithPinnedTasks } = composeStories(TaskListStories);

it('render pinned tasks at the start of the line', () => {
  render(<WithPinnedTasks />);

  const firstInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;

  expect(firstInput.value).toEqual('Task 6 Pinned');
});
