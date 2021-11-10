import { put, takeEvery, call } from 'redux-saga/effects';
import { UserActionType } from '../../../types/userAction';
import * as UserActionCreators from '../../actionCreators/userActionCreator';
import AuthorizationService from '../../../utils/authorizationService';
import { IResponse } from '../../../types/user';

function* register(action: { payload: { email: string; password: string } }) {
  try {
    const response: IResponse = yield call(
      AuthorizationService.register,
      action.payload.email,
      action.payload.password,
    );
    localStorage.setItem('token', response.accessToken);
    yield put(UserActionCreators.registerUserSuccess(response.user));
  } catch (e) {
    yield put(UserActionCreators.authorizationError(e.message));
  }
}

function* login(action: { payload: { email: string; password: string } }) {
  try {
    const response: IResponse = yield call(
      AuthorizationService.login,
      action.payload.email,
      action.payload.password,
    );
    localStorage.setItem('token', response.accessToken);
    yield put(UserActionCreators.loginUserSuccess(response.user));
  } catch (e) {
    console.log(e);
    yield put(UserActionCreators.authorizationError(e.message));
  }
}
function* logout() {
  try {
    yield call(AuthorizationService.logout);
    localStorage.removeItem('token');
    yield put(UserActionCreators.logoutUserSuccess());
  } catch (e) {
    yield put(UserActionCreators.logoutUserFailed(e));
  }
}

export function* userWatcher() {
  yield takeEvery(UserActionType.REGISTER_USER_REQUEST as any, register);
  yield takeEvery(UserActionType.LOGIN_USER_REQUEST as any, login);
  yield takeEvery(UserActionType.LOGOUT_USER_REQUEST as any, logout);
}
