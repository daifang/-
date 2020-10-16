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
            pageSize:6,
            base64:null

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
                 <img 
                    src = {this.state.base64}
                    style={{position:"absolute",width:'100%',height:'100%',display:this.state.base64?'block':'none',zIndex:'100'}}

                />
                <div id = 'blue_line' style={{left:'20%'}}></div>    
                <div id = 'header_result'>
                    <div
                        id = 'normal'
                        className = 'topMenu selected'
                        onTouchEnd = {(e)=>{
                            this.changePage(e,0);
                        }}
                        style={{
                            fontSize:'15px'
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
                        style={{
                            fontSize:'15px'
                        }}
                    >
                        期末考试成绩
                    </div>
                </div>
                <div id = 'result_list' style={{height:'80%'}}>
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
                                            height:'auto',
                                            borderBottom:'0.1px rgb(226, 226, 226) solid'
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
                                                height:'auto',
                                                lineHeight:'30px',
                                                textIndent:'10px',
                                                overflowWrap:'break-word'
                                            }}
                                            id = {val?val.id:'none'}
                                        >{
                                            val?(val.lesson_name + val.chapter_name? val.lesson_name:val.course_name+val.page_name):'当前没有成绩'
                                        }</span>
                                        <span
                                            style={{
                                                fontSize:'14px',
                                                height:'50%',
                                                lineHeight:'30px',
                                                textIndent:'10px',
                                                color:'gray'
                                            }}
                                            id = {val?val.id:'none'}
                                        >{
                                            val?val.chapter_name?'所属章节:' +val.chapter_name:"考试时间: " + val.hand_in_time:''
                                            }</span>
                                        </span>
                                        <span
                                        style={{
                                            width:'30%',
                                            lineHeight:'60px',
                                            textIndent:'8px',
                                            fontSize:'25px',
                                            color:val?val.is_pass?'#33a6ff':'gray':'gray'
                                        }}
                                        id = {val?val.id:'none'}
                                    >{
                                        (val?val.score:'∞')+"分"
                                    }</span>
                                </div>
                            </li>
                        )})
                    }
                    </ul>
                </div>
                <div 
                    id = 'result_foot' 
                    style = {{
                        fontSize:'17px',
                        paddingLeft:'35%'
                    }}
                    onTouchEnd = {(e)=>{
                        this.getDetail(e);
                    }}
                >
                    <img src='/exam/统计.png' style={{
                        transform:'scale(0.6)',
                        float:'left',
                        
                    }}></img>
                    <span
                    style={{display:'block',float:'left',marginTop:'2%'}}>成绩统计</span>
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
        //改变样式 20% -> 70%  滑动
        let line = document.getElementById('blue_line');
        let Menu = document.getElementsByClassName('topMenu');
        if(num1 == 0){
            line.style.left = '20%';
            Menu[0].classList.add('selected');
            Menu[1].classList.remove('selected');
        }else if(num1 == 1){
            line.style.left = '70%';
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
            if(res.data.status == 500){
                alert('获取失败');
            }else{
                this.setState({
                    base64:`data:image/png;base64,${res.data.data.base64}`
                })
            }
        }).catch(e=>{
            if(e){
                alert('出了些错误,可能未分组');
            }
        })
    }

}
