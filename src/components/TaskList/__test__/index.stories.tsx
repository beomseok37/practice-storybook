import { StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';

import store from 'src/redux/store';

import * as TaskStories from 'src/components/Task/index.stories';

import TaskListWrapper from './TaskListWrapper';
import TaskList from '..';
import { StateType } from 'src/redux/tasks';

const mockedState = {
  tasks: [
    { ...TaskStories.Default.args!.task!, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args!.task!, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args!.task!, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args!.task!, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args!.task!, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args!.task!, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
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
};

const Template: StoryFn = () => <TaskList />;

export const Default = Template.bind({});
Default.decorators = [
  (Story: StoryFn) => (
    <Provider store={store}>
      <TaskListWrapper initialState={mockedState}>
        <Story />
      </TaskListWrapper>
    </Provider>
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
      <Provider store={store}>
        <TaskListWrapper initialState={{ ...mockedState, tasks: pinnedTasks }}>
          <Story />
        </TaskListWrapper>
      </Provider>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (Story: StoryFn) => (
    <Provider store={store}>
      <TaskListWrapper initialState={{ ...mockedState, status: 'loading' }}>
        <Story />
      </TaskListWrapper>
    </Provider>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  (Story: StoryFn) => (
    <Provider store={store}>
      <TaskListWrapper initialState={{ ...mockedState, tasks: [] }}>
        <Story />
      </TaskListWrapper>
    </Provider>
  ),
];
