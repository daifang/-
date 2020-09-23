import React, { Component } from 'react';
import Input from '../compontents/Input';
import '../css/login.css';
import Button from '../compontents/Button';
export default class login extends Component {
    constructor(){
        super();
        this.state = {
            data:{
                stu_idCard:'',
                password:''
            }
        }
    }
    componentDidMount(){
        document.title = '登录';
    }
    render() {
        return (
            <div style={{
                display:"flex",
                flexDirection:'column',
                height:'100%'
            }}
            className = "animated fadeInUp"
            >
                {/* <div id = "home">
                    <a href = '/#/detail'><img src='/home.png'/></a>
                </div> */}
                <div id = 'title'>
                    <span>{'学生答题系统'}</span>
                    <span>{'您好,欢迎登录'}</span>
                </div>
                <div style={{marginTop:'5%'}}>
                    <Input
                        title = '用户名'
                        style = {{
                            borderBottom:'1px solid gray',
                            width:'90%',
                            borderTop:'none',
                            borderLeft:'none',
                            borderRight:'none',
                            outLine:'none',
                            marginLeft:'5%',
                            marginTop:'5%',
                            height:'30px',
                            fontSize:'20px'
                        }}
                        onChange = {this.onChange}
                        placeholder = {'请输入用户名'}
                        name = {'stu_idCard'}
                    />
                </div>
                <div style={{marginTop:'5%'}}>
                    <Input
                        title = '密码'
                        style = {{
                            borderBottom:'1px solid gray',
                            width:'90%',
                            borderTop:'none',
                            borderLeft:'none',
                            borderRight:'none',
                            marginLeft:'5%',
                            marginTop:'5%',
                            height:'30px',
                            fontSize:'20px'
                        }}
                        onChange = {this.onChange}
                        placeholder = {'请输入密码'}
                        type = {'password'}
                        name = {'password'}
                    />
                </div>
                <div>
                    <Button
                        title = {'登录'}
                        data = {this.state.data}
                        url = {'/api/auth/jwt/appToken'}
                    />
                </div>
            </div>
        )
    };
    onChange = (e)=>{
        // console.log(e.target.value);
        // console.log(e.key);
        switch(e.target.name){
            case 'stu_idCard':
                this.setState({
                    data:{
                        stu_idCard: e.target.value,
                        password:this.state.data.password
                    }
                }
                );
                break;
            case 'password':
                this.setState({
                    data:{
                        stu_idCard:this.state.data.stu_idCard,
                        password: e.target.value
                    }
                }
                );
                break;
        }
    };
}
