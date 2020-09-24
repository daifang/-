import React, { Component } from 'react';
import Axios from 'axios' ;
import '../css/Final.css';

export default class Final extends Component {
    constructor(){
        super();
        this.state = {
            data : {},
            course_id : 0,
            num : 0,
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
                course_id : res.data.course_id
            },()=>{
                Axios({
                    method:'post',
                    data: {
                        course_id : this.state.course_id
                    },
                    headers:{
                        Authorization:localStorage.getItem('userId')
                    },
                    url:'/api/student/examination/getFinalExamSimpleInfo'
                }).then((response) => {
                    console.log(this.state.course_id)
                    if(this.state.course_id == 0){
                        alert('你还没有选课！');
                        localStorage.setItem('userId','');
                        window.location.hash = '/';
                    }else{
                        this.setState({
                            data: response.data.data
                        },()=>{
                            console.log(response)
                            console.log(this.state.data)
                            this.setState({
                                num : this.state.data.radio_select_num+this.state.data.multi_select_num+this.state.data.judge_question_num
                            })
                        })
                    }
                })
            })
        })
    }
    componentDidMount(){
        this.getData();
        document.title = '期末测试';
    }
    render() {
        return (
            <div className="animated slideInRight" 
                onTouchEnd ={(e)=>{
                    this.goToTest(e)
                }}
            >
                <div id="content" className="content">
                <div className="title">{this.state.data.page_name}</div>
                <div className="masege">1.考试时间为{this.state.data.answer_time},满分为{this.state.data.full_score}分</div>
                <div className="masege2">2.题目数量：单选题{this.state.data.radio_select_num}道，多选题{this.state.data.multi_select_num}道，判断题{this.state.data.judge_question_num}道，共计{this.state.num}道题。</div>
                </div>
            </div>
        )
    }
    goToTest = (e)=>{
        window.location.hash = 'test/'+this.state.data.page_id+"&"+this.state.data.id;
    }
    goTo = (e)=>{
        window.location.hash = 'Section/'+e.target.id;
    }

}
