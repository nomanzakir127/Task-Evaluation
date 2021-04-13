const initialState = {
    isloggedIn : false,
    Email:'',
    Password:'',
    ConformPassword:'',
    IP:'',
    Location:'',
    Device:''
}

function AuthReducer(state = initialState, action){
    switch(action.type){
        case 'login' : return {
            ...state,
            isloggedIn : true,
            ...action.payload
        }
        case 'logout' : return {
            ...state,
            isloggedIn : false
        }
        case 'signUp' : return {
            ...state,
            isloggedIn : true,
            ...action.payload
        }

        default: return state
    }
}

export default AuthReducer