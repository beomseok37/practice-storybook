import { StoryFn } from '@storybook/react';
import Task, { Props as TaskProps } from '.';

export default {
  component: Task,
  title: 'Task',
};

const Template: StoryFn<TaskProps> = (args: TaskProps) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
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

const longTitleString = `very very long string very very long string very very long string very very long string very very long string very very long string very very long string very very long string`;

export const LongTitle = Template.bind({});
LongTitle.args = {
  task: {
    ...Default.args.task!,
    title: longTitleString,
  },
};
