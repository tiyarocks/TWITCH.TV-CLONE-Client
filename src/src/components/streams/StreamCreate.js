
import React, { Component } from 'react'
import { Field,reduxForm } from "redux-form"

class StreamCreate extends Component {

    renderError({error,touched}){
        if(touched &&error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput=({input,label,meta})=>{
        const className=`field ${meta.error&&meta.touched?'error':''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input}/>
               {this.renderError(meta)}
            </div>
        )
        
    }
    // in place of event  it will be called with all the values out of our form inside an obj
    onSubmit(formValues){
        console.log(formValues)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="title" component={this.renderInput} label="Enter title"/>
                    <Field name="description" component={this.renderInput} label="Enter description"/>
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        )
    }
}


//VALIDATION OF FORM INPUTS
const validate=(formValues)=>{
    const errors={}
   
    if(!formValues.title){
        errors.title="U must enter a title"
    }
    if(!formValues.description){
        errors.description="U must enter a desc"
    }
    return errors
}


export default reduxForm({

    //redux form will store values on a key "streamCreate" inside of reducer
    form:"streamCreate",
    validate
})(StreamCreate)