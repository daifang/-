import React, { Component } from 'react';
import Axios from 'axios' ;
import '../css/Final.css';

export default class Final extends Component {
    constructor(){
        super();
        this.state = {
            data : {},
            test1 : ['a','b','c','d','e'],
            masege : {
                courseId : 47
            }
        }
    }

    getData = () => {
        Axios({
            method:'post',
            data: this.state.masege,
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            url:'/api/student/videoCourseDesign/getChapterList'
        }).then((response) => {
            console.log(response);
            // this.state.data = response.data;
        })
    }
    componentDidMount(){
        document.title = '期末考试';
        this.getData();
        console.log(1)
    }
    render() {
        var temp = this.state.test1.map((item,index) => <p key={index} className="content">{item}</p>)

        return (
            <div className = "animated slideInRight">
                <div id="head"></div>
                <div id="content">
                    {temp}
                </div>
            </div>
        )
    }
}
