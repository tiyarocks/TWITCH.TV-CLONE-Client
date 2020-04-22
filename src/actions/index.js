import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
} from "./types"
import history from "../history"
//axios instance
import streams from "../apis/streams"
//call action creators once we haVE successfully logged uder in or out using gapi lib

export const signIn=userId=>{
    return{
        type:SIGN_IN,
        payload: userId
    }
}
export const signOut=()=>{
    return{
        type:SIGN_OUT
    }
}

export const createStream=formValues=> async (dispatch,getState)=>{
    //associating streams with users
     const {userId} = getState().auth; 
    const response= await streams.post("/streams",{...formValues,userId});

    //DISPATCHING ACTIONS AFTER STREAM CREATION
    dispatch({type:CREATE_STREAM ,payload:response.data});

    //DO SOME PROGRAMMATIC NAVIGATION TO GET USER BACK TO ROOT ROUTE
    history.push("/")
}



export const fetchStreams=()=>async dispatch=>{
    const response= await streams.get("/streams")
    dispatch({type:FETCH_STREAMS ,payload:response.data})
}
export const fetchStream=(id)=>async dispatch=>{
    const response= await streams.get(`/stream/${id}`)
    dispatch({type:FETCH_STREAM ,payload:response.data})
}
export const editStream=(id,formValues)=>async dispatch=>{
    const response=await streams.patch(`/streams/${id}`,formValues)
    dispatch({type:EDIT_STREAM,payload:response.data})
     //DO SOME PROGRAMMATIC NAVIGATION TO GET USER BACK TO ROOT ROUTE
     history.push("/")
}

export const deleteStream=id=>async dispatch=>{
    await streams.delete(`/streams/${id}`)
    dispatch ({type:DELETE_STREAM,payload:id})
    history.push("/")
}
