import React, { Component } from 'react';
import axios from 'axios';
//按钮组件
export default class Button extends Component {
    constructor(){
        super();
        this.state = {
            userInfo:{
                stu_idCard:'',
                password:''
            }
        }
    };
    componentDidMount(){
        if(localStorage.getItem('userId') == '' || !localStorage.getItem('userId')){
            window.location.hash = '/';
        }else{
            window.location.hash = '/Mine';
        }
    }
    render() {
        return (
            <div>
                <div 
                    id = 'loginButton'
                    onClick = {
                        (e)=>{
                            this.goDetail(this.props.url,e);
                        }}
                >
                   <span
                   style={{
                       lineHeight:'40px'
                   }}>{this.props.title}</span>
                </div>
            </div>
        )
    }
    goDetail = (url,event)=>{
        this.setState({
            userInfo:{
                stu_idCard:this.props.data.stu_idCard,
                password:this.props.data.password
            }
        },()=>{
            if(this.state.userInfo.password == '' || this.state.userInfo.stu_idCard == ''){
                window.alert('请完善表单信息');
            }else if(this.state.userInfo.password != '' && this.state.userInfo.stu_idCard != ''){
                axios.post(url,this.state.userInfo).then(res=>{
                    let data = res.data;
                    console.log(data);
                    if(data.status == 200){
                        //登录成功,跳转
                        window.location.hash = '/Mine';
                        localStorage.setItem('userId',data.data);
                    }else if(data.status == 40001){
                        //登录失败，提示
                        window.alert(data.message);
                        localStorage.setItem('userId','');
                    }
                })
            }
        });
    }
}
