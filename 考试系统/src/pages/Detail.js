import Axios from 'axios';
import React, { Component } from 'react';
import '../css/details.css';
export default class Detail extends Component {
    constructor(){
        super();
        this.state = {
            data:{}
        }
    }
    componentDidMount(){
        document.title = '个人资料';
        Axios({
            method:'get',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            url:'/api/student/studentInformation/getStudentInformation'
        }).then(res=>{
            console.log(res);
            this.setState({
                data:res.data
            })
        })
    }
    render() {
        return (
            <div id = 'details' className = "animated slideInRight">
                <p>
                    <span>名字 :</span>
                    <span>{this.state.data.stuName}</span>
                </p>
                <p>
                    <span>学号 :</span>
                    <span>{this.state.data.stuIdcard}</span>
                </p>
                <p>
                    <span>年级 :</span>
                    <span>{this.state.data.stuGrade}</span>
                </p>
                <p>
                    <span>班级 :</span>
                    <span>{this.state.data.stuClassRoom}</span>
                </p>
                <p>
                    <span>专业 :</span>
                    <span>{this.state.data.stuProfessional}</span>
                </p>
                <p>
                    <span>手机号 :</span>
                    <span>{this.state.data.stuPhone}</span>
                </p>
            </div>
        )
    }
}
