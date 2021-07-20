import { DateTime } from "luxon";
import { User } from "miracle-tv-shared/graphql";
import { createActions, handleActions } from "redux-actions";

type State = {
  currentUser?: { loading: boolean; user: User; expiresAt: DateTime };
};

export const actions = createActions({
  SET_USER: (state: State["currentUser"]) => ({ state }),
  SET_LOADING: (state: State["currentUser"]["loading"]) => ({ state }),
});

export const reducers = handleActions<State>(
  {
    SET_USER: (_, { payload: { state } }: any) => ({
      currentUser: state,
    }),
    SET_LOADING: (state: any, { payload: { state: loading } }: any) => ({
      ...state,
      currentUser: {
        ...state.currentUser,
        loading,
      },
    }),
  },
  { currentUser: null }
);
