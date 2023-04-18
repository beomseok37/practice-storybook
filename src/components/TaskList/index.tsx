import { BsCheckCircle } from 'react-icons/bs';
import { TaskType } from 'src/types';
import style from './style.module.css';
import Task from 'src/components/Task';

interface Props {
  tasks: TaskType[];
  loading: boolean;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

function TaskList({ tasks, loading, onPinTask, onArchiveTask }: Props) {
  const LoadingRow = (
    <div className={style['loader-wrapper']}>
      <span className={style.loader} />
    </div>
  );

  if (loading) {
    return (
      <div className={style['list-items']}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className={`${style['list-items']} ${style['center']}`}>
        <BsCheckCircle size={30} />
        <p>Task List is Empty</p>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((task) => task.state === 'TASK_PINNED'),
    ...tasks.filter((task) => task.state !== 'TASK_PINNED'),
  ];

  return (
    <div className={style['list-items']}>
      {tasksInOrder.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={onPinTask}
          onArchiveTask={onArchiveTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
export type { Props };
