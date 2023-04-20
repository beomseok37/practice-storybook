import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { HiOutlineEmojiSad } from 'react-icons/hi';

import TaskList from 'src/components/TaskList';

import { fetchTasks, selectError } from 'src/redux/tasks';

import style from './style.module.css';

function InBoxScreen() {
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (!!error) {
    return (
      <div className={style['wrapper']}>
        <div className={style['error-wrapper']}>
          <HiOutlineEmojiSad size={32} />
          <div className={style['title-message']}>Oh no!</div>
          <div className={style['subtitle-message']}>Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className={style['wrapper']}>
      <nav>
        <h1 className={style['title-message']}>Taskbox</h1>
      </nav>
      <TaskList />
    </div>
  );
}

export default InBoxScreen;
