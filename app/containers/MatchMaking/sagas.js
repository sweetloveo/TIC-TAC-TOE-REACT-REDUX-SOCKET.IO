import { all, call, put, take, race } from "redux-saga/effects"

export default function* rootSaga() {
    yield all([
        watchFindMatch()
    ])
}

export function* watchFindMatch() {
    while (true) {
        yield take("server/FIND_OPPONENT")
        console.log("STARTING THE RACE")
        yield race({
            task: take("FOUND_OPPONENTEIEI"),
            cancel: call(watchForCancelSearch)
        })
    }
}

export function* watchForCancelSearch() {
    console.log("LISTENING FOR LOCATION_CHANGE")
    yield take("@@router/LOCATION_CHANGE")
    yield put({type: "server/CANCEL_FIND_OPPONENT"})
    console.log("CANCELED DONE")
}
