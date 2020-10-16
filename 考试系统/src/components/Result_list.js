import React, { Component } from 'react';
import Axios from 'axios'
export default class Result_list extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            pageType:{
                normal:'getChapterExamScoreList',
                final:'getFinalExamScoreSimpleInfo'
            },
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
    render() {
        return (
            this.chapterList
        )
    }
    isBottom = (e)=>{
        //判断滚动条是否到底
        const { clientHeight, scrollHeight, scrollTop } = e.target;
        const isBottom = Number.parseInt(scrollTop)  +Number.parseInt(clientHeight)   > scrollHeight;
        // console.log(scrollTop, clientHeight, scrollHeight, isBottom);
        return isBottom;
    }


    load = ()=>{
        console.log('加载');
        //加载
        Axios({
            url:'/api/student/examination/'+this.state.pageType[this.props.type],
            method:'POST',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            data:{
                pageNumber:this.props.pageNum,
                pageSize:this.props.pageSize,
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

        //章节成绩
        chapterList = ()=>{
            this.state.data.map(val=>{
                return(
                    <li style = {{
                        height:'90px'
                    }}>
                        <div style={{
                            width:'100%',
                            height:'100%',
                            display:'flex'
                        }}>
                            <span style={{
                                display:"flex",
                                flexDirection:'column',
                                width:'80%'
                            }}>
                                <span
                                    style={{
                                        fontSize:'20px',
                                        height:'50%',
                                        lineHeight:'45px',
                                        textIndent:'10px'
                                    }}
                                >{val.lesson_name + val.section_name}</span>
                                <span
                                    style={{
                                        fontSize:'20px',
                                        height:'50%',
                                        lineHeight:'45px',
                                        textIndent:'10px'
                                    }}
                                >{val.chapter_name}</span>
                            </span>
                            <span
                                style={{
                                    width:'20%',
                                    lineHeight:'90px',
                                    textIndent:'8px',
                                    fontSize:'30px',
                                    color:val.is_pass?'#33a6ff':'gray'
                                }}
                            >{val.score}</span>
                        </div>
                    </li>
                )    
            })
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
}
