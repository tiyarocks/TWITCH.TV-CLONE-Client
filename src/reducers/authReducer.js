import { SIGN_IN,SIGN_OUT } from "../actions/types";
//capitals mean do not try to modify this object under any circumstances

const INITIAL_STATE={
    isSignedIn:null
}
export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SIGN_IN:
            return{...state,isSignedIn:true}
        case SIGN_OUT:
            return{...state,isSignedIn:false}
        default:
            return state
    }
}