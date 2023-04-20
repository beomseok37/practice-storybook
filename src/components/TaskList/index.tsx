import { BsCheckCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import Task from 'src/components/Task';

import { selectStatus, selectTasks, updateTaskState } from 'src/redux/tasks';

import style from './style.module.css';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const status = useSelector(selectStatus);

  const handlePinTask = (newID: string) => {
    dispatch(updateTaskState({ id: newID, newTaskState: 'TASK_PINNED' }));
  };
  const handleArchiveTask = (newID: string) => {
    dispatch(updateTaskState({ id: newID, newTaskState: 'TASK_ARCHIVED' }));
  };

  const LoadingRow = (
    <div className={style['loader-wrapper']}>
      <span className={style.loader} />
    </div>
  );

  if (status === 'loading') {
    return (
      <div className={style['list-items']} data-testid='loading'>
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
          onPinTask={handlePinTask}
          onArchiveTask={handleArchiveTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
