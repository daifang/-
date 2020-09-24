import React, { Component } from 'react';
import '../css/result.css';
import Axios from 'axios';
import List from '../compontents/Result_list';
export default class Result extends Component {
    constructor(){
        super();
        this.state = {
            pageType:{
                normal:'getChapterExamScoreList',
                final:'getChapterExamScoreDetail'
            },
            data : 'isBottom为true时滚动到底部，此时+20代表离底部20像素之内就判断为滚动到底部，继续加载数据'.split(''),
            type:'normal',
            pageNum:0,
            pageSize:6
        }
    }
    componentDidMount(){
        this.load();
        document.getElementById('result_list').addEventListener('scroll',(e)=>{
            let isLoad = this.isBottom(e);
            if(isLoad)
                this.load();
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
                course_id:JSON.parse(localStorage.getItem('userInfor')).course_id 
            }
        }).then(res=>{
            if(res.data.status == 40301){
                alert('登录状态已过期,请重新登录');
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                //拼接数据
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
                        className = 'topMenu'
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
                <List 
                    data = {this.state.data}
                />
                <div id = 'result_foot'>
                    成绩详情
                </div>
            </div>
        )
    }
    isBottom = (e)=>{
        const { clientHeight, scrollHeight, scrollTop } = e.target;
        // const { clientHeight, scrollHeight, scrollTop } = this.scroll;
 
        const isBottom = scrollTop + clientHeight + 20 > scrollHeight;
        console.log(scrollTop, clientHeight, scrollHeight, isBottom);
        return isBottom;
    }
    changePage = (e,num1)=>{
        //设置页面数据来源
        this.setState({
            type:e.target.id
        },()=>{
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
