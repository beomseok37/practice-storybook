import { Provider } from 'react-redux';

import InBoxScreen from 'src/components/InBoxScreen';

import store from 'src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <InBoxScreen />
    </Provider>
  );
}

export default App;
