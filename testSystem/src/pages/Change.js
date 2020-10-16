import Axios from 'axios';
import React, { Component } from 'react';
import '../css/change.css';
//修改信息
export default class Change extends Component {
    constructor(){
        super();
        this.state = {
            op:'',
            title:{
                tel:{
                    title:'修改手机号',
                    post:'/studentInformation/updateStudentInformation'
                },
                password:{
                    title:'修改登录密码',
                    post:'/studentInformation/updateStudentPassword'
                },
                class:{
                    title:'切换课程',
                    post:''
                }
            },
            tel:'',
            password:'',
            newPassword:'',
            class:''
        }
    }
    componentDidMount(){
        this.setState({
            op:this.props.match.params.op
        })
        // console.log(this.state.op);
    }
    render() {
        if(this.state.op == 'tel'){
            //修改手机号
            let tel = JSON.parse(localStorage.getItem('userInfo')).stuPhone
            return (
                <div id = 'tel' className="animated slideInRight">
                    <input placeholder = {tel} id = 'tel_txt' onChange = {(e)=>{this.setState({
                        tel:e.target.value
                    })}}/>
                    <div onClick = {()=>{this.post(`/api/student/${this.state.title[this.state.op].post}`)}} className = 'ok'>提交</div>
                </div>
            )
        }else if(this.state.op == 'password'){
            //修改密码
            return (
                <div style = {{height:'100%'}} className="animated slideInRight">
                    <input 
                        placeholder = {'请输入新密码'} 
                        id = 'password' 
                        type = 'password'
                        onChange = {(e)=>{this.setState({
                            password:e.target.value
                        })}}
                    />
                    <input 
                        placeholder = '请重复新密码' 
                        id = 'newPassword' 
                        type = 'password'
                        onChange = {(e)=>{this.setState({
                            newPassword:e.target.value
                        })}}
                    />
                    <div 
                        onClick = {()=>{
                                if(this.state.password != this.state.newPassword)
                                    alert('您的两次输入密码不一致');
                                else
                                    this.changePassword(`/api/student/${this.state.title[this.state.op].post}`);
                            }
                        } 
                        className = 'ok'
                    >
                        提交
                    </div>
                </div>
            )
        }else{
            return(
                <div>404 not found</div>
            )
        }
    }
    post = (url)=>{
        Axios({
            method:"POST",
            headers:{'Authorization':localStorage.getItem('userId')},
            url:url,
            data:{stuPhone:this.state.tel},
        }).then(res=>{
            if(res.data.code == 0){
                alert(res.data.msg);
                window.location.hash = '/';
            }else{
                // alert(res.data.msg);
            }
        })
    }
    changePassword = (url) =>{
        // console.log(this.state.password);
        // console.log(this.state.newPassword);
        Axios({
            method:"POST",
            headers:{'Authorization':localStorage.getItem('userId')},
            url:url,
            data:{
                password:this.state.password,
                repeatPassword:this.state.newPassword
            }
        }).then(res=>{
            if(res.data.code == 0){
                alert(res.data.msg);
                window.location.hash = '/';
            }else{
                // alert(res.data.msg);
            }
        })
    }
}
