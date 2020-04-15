import { SIGN_IN,SIGN_OUT } from "./types";

//call action creators once we haVE successfuklly logged uder in or out using gapi lib

export const signIn=()=>{
    return{
        type:SIGN_IN
    }
}
export const signOut=()=>{
    return{
        type:SIGN_OUT
    }
}