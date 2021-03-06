import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest("color/get", initColorList),
    takeLatest("color/getPortfolio", initColorPortfolio),
    takeLatest("color/getLike", initColorLike),
    takeLatest("color/loadMore", colorLoadMore),
    takeLatest("color/toggleLike", toggleLike),
    takeLatest("color/addNew", addNew),
  ]
}

function* initColorLike(action) {
  try {
    const payload = yield call(requester, '/api/initColorLike');
    if(payload.error){
      yield put({
        type: "color/getLike/fail",
        payload: {msg: e}
      });
    }else{
      yield put({
        type: "color/getLike/success",
        payload: payload.result
      });
    }
  } catch (e) {
    yield put({
      type: "color/getLike/fail",
      payload: {msg: e}
    });
  }
}

function* initColorPortfolio(action) {
  try {
    const payload = yield call(requester, '/api/initColorPortfolio');
    yield put({
      type: "color/getPortfolio/success",
      payload: payload.result
    });
  } catch (e) {
    yield put({
      type: "color/getPortfolio/fail",
      payload: {msg: e}
    });
  }
}

function* initColorList(action) {
  const payload = yield call(requester, '/api/initColorList');
  if(payload.error){
    yield put({
      type: "color/get/fail",
      payload: payload.result,
    });
  } else {
    yield put({
      type: "color/get/success",
      payload: payload.result
    });
  }
}

function* colorLoadMore(action) {
  try {
    const payload = yield call(requester, '/api/initColorList');
    yield put({
      type: "color/loadMore/success",
      payload: payload.result
    });
  } catch (e) {
    yield put({
      type: "color/loadMore/fail",
      payload: {msg: e}
    });
  }
}

function* toggleLike(action) {
  try {
    const payload = yield call(requester, '/api/toggleLike', action.payload);
  } catch (e) {
  }
}

function* addNew(action) {
  try {
    const result = yield call(requester, '/api/addNewColor', action.payload);
    let colorinfo = action.payload;
    if(result.error){
      yield put({
        type: "color/addNew/fail",
        payload: {msg: result.result}
      });
    } else {
      yield put({
        type: "color/addNew/success",
        payload: {
          ...colorinfo,
          id: result.result.id,
          name: result.result.name
        }
      });
    }
  } catch (e) {

  }
}


export default function*(){
  yield fork(watchers);
}