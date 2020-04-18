//component that sets up google Oauth from start to end
import React, { Component } from 'react'
import { connect } from "react-redux"
import { signIn,signOut } from "../actions";
class GoogleAuth extends Component {
    
    componentDidMount(){
        //gapi is available on window scope..lib takes time to load up..so we take a callback after auth2 has successfully loaded into gapi
        
        window.gapi.load("client:auth2",()=>{
            window.gapi.client.init({
                //initialising the authentication client with...
                clientId:"400409695520-6dd90eqbhc5hup3824kmiq71tlv5jtb6.apps.googleusercontent.com",
                scope:"email"
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance()

                //update our auth state inside of redux store
                this.onAuthChange(this.auth.isSignedIn.get())

                //wait for the authentication status to change at some point in the future
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }
    //set up callback funcs as arrow so that it is bound to the component
    //gonna be called anytime users authentication status changes
    onAuthChange=isSignedIn=>{
        // we dont wanna have component level state anymore
       // this.setState({isSignedIn:this.auth.isSignedIn.get()})

       if(isSignedIn){
           this.props.signIn(this.auth.currentUser.get().getId())
       }
       else{
           this.props.signOut()
       }
    }
    onSignInClick=()=>{
        this.auth.signIn()
    }
    onSignOutClick=()=>{
        this.auth.signOut()
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return <div>null</div>
        }
        else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick}className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        }
        else{
            return (
                <button onClick={this.onSignInClick}className="ui green button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)
