
export function nameAdded(name) {
    return (dispatch) => {
        dispatch({
            type: "server/ADD_NAME",
            name
        })
    }
}
