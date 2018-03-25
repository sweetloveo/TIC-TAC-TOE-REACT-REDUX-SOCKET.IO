import { all } from "redux-saga/effects"
import matchMakingSagas from "./containers/MatchMaking/sagas"
import getBoardnow from "./containers/TicTacToe/sagas"

export default function* rootSaga() {
    yield all([
        matchMakingSagas(),
        getBoardnow()
    ])
}
