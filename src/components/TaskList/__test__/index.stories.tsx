import { StoryFn } from '@storybook/react';

import * as TaskStories from 'src/components/Task/index.stories';

import ProviderWrapper from './ProviderWrapper';
import TaskList from '..';

export const mockedState = {
  tasks: [
    { ...TaskStories.Default.args!.task!, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args!.task!, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args!.task!, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args!.task!, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args!.task!, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args!.task!, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: '',
};

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [
    (Story: StoryFn) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: /.*mockedState$/,
};

const Template: StoryFn = () => <TaskList />;

export const Default = Template.bind({});
Default.decorators = [
  (Story: StoryFn) => (
    <ProviderWrapper initialState={mockedState}>
      <Story />
    </ProviderWrapper>
  ),
];

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (Story: StoryFn) => {
    const pinnedTasks = [
      ...mockedState.tasks.slice(0, 5),
      {
        id: '6',
        title: 'Task 6 Pinned',
        state: 'TASK_PINNED',
        updateAt: new Date(2021, 0, 1, 9, 0),
      },
    ];
    return (
      <ProviderWrapper initialState={{ ...mockedState, tasks: pinnedTasks }}>
        <Story />
      </ProviderWrapper>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (Story: StoryFn) => (
    <ProviderWrapper initialState={{ ...mockedState, status: 'loading' }}>
      <Story />
    </ProviderWrapper>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  (Story: StoryFn) => (
    <ProviderWrapper initialState={{ ...mockedState, tasks: [] }}>
      <Story />
    </ProviderWrapper>
  ),
];
