const initialState = {
    time: '',
}

export const timeReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "TIME/SET-TIME":
            return {...state, time: action.time}
        default:
            return state
    }
}

export const setTimeAC = (time: string) => ({type: "TIME/SET-TIME", time} as const)

type ActionsType = ReturnType<typeof setTimeAC>
type InitialStateType = typeof initialState