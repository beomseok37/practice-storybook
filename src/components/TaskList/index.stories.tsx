import { StoryFn } from '@storybook/react';
import TaskList, { Props as TaskListProps } from '.';
import * as TaskStories from 'src/components/Task/index.stories';

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

const Template: StoryFn<TaskListProps> = (args: TaskListProps) => (
  <TaskList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tasks: [
    { ...TaskStories.Default.args!.task!, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args!.task!, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args!.task!, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args!.task!, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args!.task!, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args!.task!, id: '6', title: 'Task 6' },
  ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  tasks: [
    ...Default.args.tasks!.slice(0, 5),
    {
      id: '6',
      title: 'Task 6 Pinned',
      state: 'TASK_PINNED',
      updateAt: new Date(2021, 0, 1, 9, 0),
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  ...Loading.args,
  loading: false,
};
