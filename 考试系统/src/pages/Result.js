import React, { Component } from 'react';
import '../css/result.css';
import Axios from 'axios';
export default class Result extends Component {
    constructor(){
        super();
        this.state = {
            pageType:{
                normal:'getChapterExamScoreList',
                final:'getFinalExamScoreSimpleInfo'
            },
            data : [],
            type:'normal',
            pageNum:0,
            pageSize:6
        }
    }
    componentDidMount(){
        this.load();
        document.getElementById('result_list').addEventListener('scroll',(e)=>{
            let isLoad = this.isBottom(e);
            if(isLoad){
                this.setState({
                    pageNum:this.state.pageNum++
                },()=>{
                    this.load();
                })
                
            }
            else
                return false;
        })
    }
    load = ()=>{
        console.log('加载');
        //加载
        Axios({
            url:'/api/student/examination/'+this.state.pageType[this.state.type],
            method:'POST',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            data:{
                pageNumber:this.state.pageNum,
                pageSize:this.state.pageSize,
                course_id:JSON.parse(localStorage.getItem('userInfo')).course_id 
            }
        }).then(res=>{
            if(res.data.status == 40301){
                alert('登录状态已过期,请重新登录');
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                //拼接数据
                // console.log('data');
                console.log(res);
                this.setState({
                    data:this.state.data.concat(res.data.data)
                })
            };
        });
    }
    render() {
        return (
            <div className = "animated slideInRight" style={{height:'100%'}}>
                <div id = 'blue_line'></div>    
                <div id = 'header_result'>
                    <div
                        id = 'normal'
                        className = 'topMenu selected'
                        onTouchEnd = {(e)=>{
                            this.changePage(e,0);
                        }}
                    >
                        章节考试成绩
                    </div>
                    <div
                        id = 'final'
                        className = 'topMenu'
                        onTouchEnd = {(e)=>{
                            this.changePage(e,1);
                        }}
                    >
                        期末考试成绩
                    </div>
                </div>
                <div id = 'result_list'>
                    <ul 
                        style={{
                            height:'auto',
                            width:'90%',
                            marginLeft:'5%',
                            marginTop:'5%'
                        }}
                        
                    >
                        {//渲染列表
                            this.state.data.map(val=>{
                                return(
                                    <li 
                                        style = {{
                                            height:'90px',
                                            borderBottom:'1px gray solid'
                                        }}
                                        id = {val?val.id:'none'}
                                        key = {val?val.id:'none'}
                                        onTouchEnd = {(e)=>{
                                            e.stopPropagation();
                                            this.goTo(e,'/resultDetail/');
                                        }}
                                        className = "animated fadeIn"
                                    >
                                        <div style={{
                                            width:'100%',
                                            height:'100%',
                                            display:'flex',
                                            backgroundColor:''
                                            }}
                                            id = {val?val.id:'none'}
                                        >
                                        <span style={{
                                            display:"flex",
                                            flexDirection:'column',
                                            width:'80%'
                                            }}
                                            id = {val?val.id:'none'}
                                        >
                                        <span
                                            style={{
                                                fontSize:'20px',
                                                height:'50%',
                                                lineHeight:'45px',
                                                textIndent:'10px'
                                            }}
                                            id = {val?val.id:'none'}
                                        >{
                                            val?(val.lesson_name + val.chapter_name?'所属章节:' + val.lesson_name:val.course_name+val.page_name):'当前没有成绩'
                                        }</span>
                                        <span
                                            style={{
                                                fontSize:'15px',
                                                height:'50%',
                                                lineHeight:'45px',
                                                textIndent:'10px'
                                            }}
                                            id = {val?val.id:'none'}
                                        >{
                                            val?val.chapter_name?val.chapter_name:"考试时间: " + val.hand_in_time:''
                                            }</span>
                                        </span>
                                        <span
                                        style={{
                                            width:'20%',
                                            lineHeight:'90px',
                                            textIndent:'8px',
                                            fontSize:'30px',
                                            color:val?val.is_pass?'#33a6ff':'gray':'gray'
                                        }}
                                        id = {val?val.id:'none'}
                                    >{
                                        val?val.score:'∞'
                                    }</span>
                                </div>
                            </li>
                        )})
                    }
                    </ul>
                </div>
                <div 
                    id = 'result_foot' 
                    onTouchEnd = {(e)=>{
                        this.getDetail(e);
                    }}
                >
                    成绩详情
                </div>
            </div>
        )
    }
    isBottom = (e)=>{
        //判断滚动条是否到底
        const { clientHeight, scrollHeight, scrollTop } = e.target;
        const isBottom = Number.parseInt(scrollTop)  +Number.parseInt(clientHeight)   > scrollHeight;
        // console.log(scrollTop, clientHeight, scrollHeight, isBottom);
        return isBottom;
    }
    changePage = (e,num1)=>{
        //设置页面数据来源
        this.setState({
            type:e.target.id,
            data:[]
        },()=>{
            console.log('清空并请求');
            this.componentDidMount();
        });
        //改变样式 17% -> 68%  滑动
        let line = document.getElementById('blue_line');
        let Menu = document.getElementsByClassName('topMenu');
        if(num1 == 0){
            line.style.left = '17%';
            Menu[0].classList.add('selected');
            Menu[1].classList.remove('selected');
        }else if(num1 == 1){
            line.style.left = '68%';
            Menu[1].classList.add('selected');
            Menu[0].classList.remove('selected');
        }
    }

    goTo = (e,url)=>{
        console.log(url);
        console.log(e.target);
        window.location.hash = url + e.target.id + "&" + this.state.type;
    }
    getDetail = (e)=>{
        Axios({
            url:'/api/student/examination/getStudentExamStatisticPicture',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            data:{
                course_id:JSON.parse(localStorage.getItem('userInfo')).course_id
            },
            method:'POST'
        }).then(res=>{
            console.log(res);
        })
    }
}
