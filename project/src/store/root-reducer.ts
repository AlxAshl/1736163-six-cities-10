import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {utilityProcess} from './utility-process/utility-process';
import {dataProcess} from './data-process/data-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Utility]: utilityProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
