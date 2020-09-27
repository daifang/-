import React, { Component } from 'react';
import '../css/Mine.css';
import axios from 'axios';

export default class Mine extends Component {
    constructor(){
        super();
        this.state = {
            username:'获取中...',
            userSchool:'...',
            imgSrc:'/student.png'
        }
    }
    componentDidMount(){
        document.title = '学生答题系统';
        axios.get('/api/student/studentInformation/getStudentInformation',{
            headers:{
                Authorization:localStorage.getItem('userId')
            }
        }).then(res=>{
            console.log(res);
            if(res.data.status == 40301){
                alert('登录状态已过期,请重新登录');
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                this.setState({
                    username:res.data.stuName?res.data.stuName:'获取中',
                    userSchool:res.data.stuProfessional?res.data.stuProfessional:'...',
                    imgSrc:res.data.imgSrc?res.data.imgSrc:this.state.imgSrc
                });
                localStorage.setItem('userInfo',JSON.stringify(res.data));
            }
        })
    }
    render() {
        return (
            <div id="Mine" className = "slideInRight animated">
                <div id="header">
                    <div id = "author">
                        <img style={{borderRadius:'100%'}} src = {this.state.imgSrc}/>
                    </div>
                    <div id = "src" style={{marginTop:'-10%'}}>
                        <h3>{this.state.username}</h3>
                        <p>{this.state.userSchool}</p> 
                    </div>
                    <div id = 'right' onTouchEnd = {()=>{this.goTo('/detail')}}>
                        <img 
                            style={{transform:'scale(0.4)'}}
                            src = '/right.png'
                        />
                    </div>
                    <div id = "set"  style={{borderRadius:'100%',height:'35%',transform:'scale(1)'}}>
                        {/* {消息页} */}
                        {/* <img  onTouchEnd = {()=>{this.goTo('/msgs')}} src='/msg.png'/> */}
                        <img  onTouchEnd = {()=>{this.goTo('/sets')}} src='/setting.png'/>
                    </div>
                </div>
                <div id="body">
                    <div>
                        <img onTouchEnd = {()=>{this.goTo('/classes')}} src = '/classes.png'/>
                    </div>
                    <div>
                        <img onTouchEnd = {()=>{this.goTo('/finalTests')}} src = '/final.png'/>
                    </div>
                    <div>
                        <img onTouchEnd = {()=>{this.goTo('/result')}} src = '/studentC.png'/>
                    </div>
                </div>
            </div>
        );
    }

    goTo = (url)=>{
        window.location.hash = url;
    }
}
