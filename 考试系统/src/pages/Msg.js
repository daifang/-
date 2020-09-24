import Axios from 'axios';
import React, { Component } from 'react'

export default class Msg extends Component {

    constructor(){
        super();
        this.state = {
            pageSize:3,
            pageNumber:1,
            data:[]
        }
    }
    componentDidMount(){
        Axios({
            method:'POST',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            data:{
                pageSize:this.state.pageSize,
                pageNumber:this.state.pageNumber
            },
            url:'/api/student/studentInformation/getMsgList'
        }).then(res=>{
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                当前页面还未上线
            </div>
        )
    }
}
