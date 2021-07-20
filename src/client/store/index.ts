import { persistReducer, persistStore, Storage } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";
import { reducers } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(
  reducers,
  // @ts-ignore
  process.browser &&
    // @ts-ignore
    window &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
let persistor = persistStore(store as any);

const setupStore = () => {
  return { store, persistor };
};

export default setupStore;
