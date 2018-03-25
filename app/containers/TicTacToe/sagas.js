import { all, call, put, take, race } from "redux-saga/effects"

export default function* rootSaga() {
    yield all([
        getBoardNow()
    ])
}

export function* getBoardNow() {
    while (true) {
        yield take("server/SET_TILE")
        console.log("STARTING THE RACE/getBoardNow")
        yield race({
            task: take("SET_TILE"),
            cancel: call(watchForCancelBoardnow)
        })
    }
}

export function* watchForCancelBoardnow() {
    console.log("LISTENING FOR LOCATION_CHANGE")
    yield take("@@router/LOCATION_CHANGE")
    console.log("CANCELED DONE")
}
