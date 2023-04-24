import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

import { TaskType } from 'src/types';
import style from './style.module.css';

interface Props {
  task: TaskType;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}

function Task({ task, onArchiveTask, onPinTask }: Props) {
  return (
    <div className={style['list-item']}>
      <div className={style.label}>
        {task.state === 'TASK_ARCHIVED' ? (
          <MdCheckBox
            onClick={() => onArchiveTask(task.id)}
            size={20}
            color='#243e57'
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => onArchiveTask(task.id)}
            size={20}
            color='#243e57'
          />
        )}
        <input
          type='text'
          className={style.input}
          value={task.title}
          readOnly={true}
          placeholder='Input title'
        />
      </div>

      <div
        className={style['pin-wrapper']}
        onClick={(event) => event.stopPropagation()}
      >
        {task.state !== 'TASK_ARCHIVED' && (
          <button onClick={() => onPinTask(task.id)} className={style.button}>
            {task.state === 'TASK_PINNED' ? (
              <AiFillStar size={20} color='#243e57' />
            ) : (
              <AiOutlineStar size={20} color='#243e57' />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Task;
export type { Props };
