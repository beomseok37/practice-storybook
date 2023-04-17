import { StoryFn } from '@storybook/react';
import Task, { Props as TaskProps } from '.';

export default {
  component: Task,
  title: 'Task',
};

const Template: StoryFn<TaskProps> = (args: any) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'Task_INBOX',
    updateAt: new Date(2021, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task!,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task!,
    state: 'TASK_ARCHIVED',
  },
};
