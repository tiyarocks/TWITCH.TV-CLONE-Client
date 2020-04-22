import React from "react"
import Modals from "../Modals"
import history from "../../history"
import {connect} from "react-redux"
import {fetchStream,deleteStream} from "../../actions"
import {Link } from "react-router-dom"
class StreamDelete extends React.Component {

    //fetching the deletion stream
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions(){
        return(
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(this.props.match.params.id)}className="ui button negative">Delete</button>
                <Link to="/"className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }
    renderContent(){
        if(!this.props.stream){
            return "Are u sure u wanna delete this stream?"
        }
        return `Are u sure u wanna delete this stream with title ${this.props.stream.title}`
    }
    render(){
        return (
            <div>
                StreamDelete
                //configuring the modal making it a reusable component
                <Modals
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={()=>history.push("/")}
                
                />
            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return{stream:state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete) 