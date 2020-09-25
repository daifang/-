import React, { Component } from 'react';
import Axios from 'axios' ;
import '../css/Final.css';

export default class Final extends Component {
    constructor(){
        super();
        this.state = {
            data : {
                good:true
            },
            num : 0
        }
    }

    getData = () => {
        Axios({
            method:'post',
            data: {
                course_id :JSON.parse(localStorage.getItem('userInfo')).course_id
            },
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            url:'/api/student/examination/getFinalExamSimpleInfo'
        }).then((response) => {
            // console.log(response);
            if(response.data.status == 40301){
                alert('登录过期,重新登陆');
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                this.setState({
                    data: response.data.data?response.data.data:{radio_select_num:0,multi_select_num:0,judge_question_num:0,good:true}
                },()=>{
                    this.setState({
                        num : this.state.data.radio_select_num+this.state.data.multi_select_num+this.state.data.judge_question_num
                    })
                })
            }
        })
    }
    componentDidMount(){
        document.title = '期末测试';
        this.getData();
        // console.log(JSON.parse(localStorage.getItem('userInfo')).course_id);
        
    }
    render() {
        if(!this.state.data.good){
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
        }else{
            return(
                <div style={{width:'100%',height:'30%',textAlign:'center',fontSize:'25px',marginTop:'30%'}} className="animated slideInRight">当前没有考试</div>
            )
        }
    }
    goToTest = (e)=>{
        localStorage.setItem('time',this.state.data.answer_time);
        window.location.hash = 'test/'+this.state.data.page_id+"$"+this.state.data.id+"&"+"final";
    }
    goTo = (e)=>{
        window.location.hash = 'Section/'+e.target.id;
    }

}
