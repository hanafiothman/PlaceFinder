import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics';
import { useDispatch } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
