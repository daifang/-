import React, { Component } from 'react';
import Axios from 'axios' ;
import '../css/Classes.css';

export default class Final extends Component {
    constructor(){
        super();
        this.state = {
            data : [],
            courseId : 0,
        }
    }

    getData = () => {
        Axios({
            method:'get',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            url:'/api/student/studentInformation/getStudentInformation' 
        }).then((res) => {
            this.setState({
                courseId : res.data.course_id
            },()=>{
                console.log(this.state.courseId)
                Axios({
                    method:'post',
                    data: {
                        courseId : this.state.courseId
                    },
                    headers:{
                        Authorization:localStorage.getItem('userId')
                    },
                    url:'/api/student/videoCourseDesign/getChapterList'
                }).then((response) => {
                    if(this.state.courseId == 0){
                        console.log('没有选课')
                    }else{
                        // console.log(this.state.courseId)
                        this.setState({
                            data: response.data.data
                        })
                        // console.log(response.data.data);
                    }
                })
            })
        })
    }
    componentDidMount(){
        this.getData();
        document.title = '章节测试';
    }
    render() {
        var temp = this.state.data.map((item,index) => <p key={item.id} id={item.id} className="content" onClick = {(e)=>{this.goTo(e)}}><span className="con_p">{item.name}</span></p>)

        return (
            <div className="animated slideInRight">
                <div id="head"></div>
                <div id="content">
                    {temp}
                </div>
            </div>
        )
    }
    
    goTo = (e)=>{
        window.location.hash = 'Section/'+e.target.id;
    }

}
