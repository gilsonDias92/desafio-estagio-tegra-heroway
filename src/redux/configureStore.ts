import * as Redux from "redux";
import ReduxThunk from 'redux-thunk';
import * as ReduxDevTools from "redux-devtools-extension";
import airportsReducer from "./reducers/airports";
import flightsReducer from './reducers/flights';

const state = {
  airports: (state: any, action: any) => airportsReducer(state, action),
  flights: (state: any, action: any) => flightsReducer(state, action)
};

const rootReducer = Redux.combineReducers(state);

export type IAppState = ReturnType<typeof rootReducer>;

const store = Redux.createStore(
  rootReducer,
  ReduxDevTools.composeWithDevTools(
    Redux.applyMiddleware(ReduxThunk)
  ),
);

export default store;