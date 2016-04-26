import { Map, fromJS } from 'immutable';
import {
  THINK,
  EAT,
  BREATHE,
  DRINK,
  SLEEP,
 } from '../../constants/ActionTypes';

// Thoughts
export default function(state = Map(), action) {
  switch (action.type){
    case 'EXAMPLE' :
      return state;
    case THINK :
      return state;
    case EAT :
      return state;
    case BREATHE :
      return state;
    case DRINK :
      return state;
    case SLEEP :
      return state;
  }
  return state;
}
