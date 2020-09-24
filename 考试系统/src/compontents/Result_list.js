import React, { Component } from 'react';

export default class Result_list extends Component {
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        this.setState({
            data:this.props.data
        })
    }
    render() {
        return (
            <div id = 'result_list'>
                <ul>
                    {
                        this.state.data.map(val=>{
                            return(
                                <li>{val}</li>
                            )    
                        })
                    }
                </ul>
            </div>
        )
    }
}
