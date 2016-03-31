import { createStore } from 'redux';
import reducer from './modules/reducers';

export default function configureStore(initialState) {
  return createStore(reducer, initialState);
}
