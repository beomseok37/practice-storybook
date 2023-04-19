import { PropsWithChildren, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import store from 'src/redux/store';
import { StateType, initiateTaskState } from 'src/redux/tasks';

interface Props extends PropsWithChildren {
  initialState: StateType;
}

function TaskListWrapper({ initialState, children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiateTaskState(initialState));
  }, [dispatch, initialState]);

  return <Provider store={store}>{children}</Provider>;
}

function ProviderWrapper({ initialState, children }: Props) {
  return (
    <Provider store={store}>
      <TaskListWrapper initialState={initialState}>{children}</TaskListWrapper>
    </Provider>
  );
}

export default ProviderWrapper;
