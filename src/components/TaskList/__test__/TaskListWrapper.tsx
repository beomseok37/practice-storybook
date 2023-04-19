import { PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { StateType, initiateTaskState } from 'src/redux/tasks';

interface Props extends PropsWithChildren {
  initialState: StateType;
}

function TaskListWrapper({ initialState, children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiateTaskState(initialState));
  }, [dispatch, initialState]);

  return <>{children}</>;
}

export default TaskListWrapper;
