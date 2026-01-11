import { Provider } from "react-redux";
import { Routes } from "../config";
import configureStore from "../config/Redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
