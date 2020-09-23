import React, { Component } from 'react'
import '../css/sets.css';
export default class Sets extends Component {
    constructor(){
        super();
    }
    componentDidMount(){
        document.title = '设置';
    }
    render() {
        return (
            <div className = 'slideInRight animated'>
                <div id = 'sets' >
                    <div onClick = {()=>{this.goTo('/change/tel')}}>
                        <span>修改手机号</span>
                        <img src = '/right.png'/>
                    </div>
                    <div onClick = {()=>{this.goTo('/change/password')}}>
                        <span>修改登录密码</span>
                        <img src = '/right.png'/>
                    </div>
                    <div>
                        <span>切换课程</span>
                        <img src = '/right.png'/>
                    </div>
                </div>
                <div id = 'exit' onClick = {this.exit}>
                    退出
                </div>
            </div>
        )
    }
    exit = ()=>{
        let yesORno = window.confirm('确认要退出登录吗?');
        if(yesORno){
            localStorage.setItem('userId','');
            window.location.hash = '/';
        }
    }
    goTo = (url)=>{
        window.location.hash = url;
    }
}
