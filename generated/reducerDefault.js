import { fromJS } from 'immutable';
import initialState from './initialState';
import {
ACTION_TYPES
} from '../path_to/constants/ActionTypes';

const reducer = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return state.set('open', false);
    default :
      return state;
  }
};

export default reducer;
