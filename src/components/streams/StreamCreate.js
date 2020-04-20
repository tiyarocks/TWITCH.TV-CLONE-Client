import { connect } from "react-redux"
import React, { Component } from 'react'
import StreamForm from "./StreamForm"
import {createStream  } from "../../actions"

class StreamCreate extends Component {
    // in place of event  it will be called with all the values out of our form inside an obj
    onSubmit=formValues=>{
        this.props.createStream(formValues)


    }
    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}
export default connect(null,{createStream })(StreamCreate)