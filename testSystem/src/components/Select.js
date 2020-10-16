import Axios from 'axios';
import React, { Component } from 'react'
//没用
export default class Select extends Component {
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        Axios({
            url:this.props.url,
            method:'POST'
        })
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
