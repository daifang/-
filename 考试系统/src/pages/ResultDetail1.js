import Axios from 'axios';
import React, { Component } from 'react';

export default class ResultDetail1 extends Component {
    constructor(){
        super();
        this.state = {
            data:JSON.parse(localStorage.getItem('result')),
            type:'normal',
            question_list:[{question_array:[{is_answered:1,is_right:1}]}],
            api:{
                normal:'Chapter',
                final:'Final'
            },
            questionType:['','单选题','多选题','判断题']
        }
        console.log(this.state.data);
    }
    componentDidMount(){
        document.title = '考试成绩结果';
        this.setState({
            question_list:this.state.data.questionList
        })
        
    }
    render() {
        return (
            <div 
                style={{backgroundColor:'rgb(236, 236, 236)',height:'100%',width:'100%'}} 
                className="animated slideInRight"
            >
                <div id = "header_bg"></div>
                <div 
                    style = {{
                        backgroundColor:'white',
                        height:'30%',
                        top:'5%',
                        width:'90%',
                        borderRadius:'12px',
                        position:'absolute',
                        left:'5%',
                        display:'flex',
                        flexDirection:'column'
                    }}>
                        <div style={{
                            height:'50%',
                            borderBottom:'1px rgb(236, 236, 236) solid',
                            display:'flex',
                            flexDirection:'column',
                            alignItems:"flex-start"
                        }}>
                            <span style={{height:'50%',width:'70%',lineHeight:'300%',textIndent:'20px',fontSize:'18px'}}>{`${this.state.data.chapter_name + " " + this.state.data.lesson_name}`}</span>
                            <span style={{height:'50%',width:'70%',lineHeight:'300%',textIndent:'20px',fontSize:'17px'}}>{`交卷时间:${this.state.data.hand_in_time?this.state.data.hand_in_time:this.state.data.create_time}`}</span>
                        </div>
                        <div style = {{
                            height:'50%',
                            display:'flex',
                            alignItems:'center',
                            alignContent:'center',
                            justifyContent:'center',
                            justifyItems:'center'
                        }}>
                            <span style ={{display:'flex',width:this.state.type=='final'?'50%':'95%',height:'100%',alignItems:'center'}}>
                                <span style={{textIndent:'10px'}}>考试成绩:</span>
                                <span style={{fontSize:'35px'}}>{this.state.data.score?this.state.data.score:'0'}分</span>
                            </span>
                            <span style ={{display:this.state.type=='final'?'flex':'none',width:'60%',height:'100%',alignItems:'center'}}>
                                <span style={{textIndent:'10px'}}>考试结果:</span>
                                <span style={{fontSize:'35px',color:this.state.data.is_pass?'green':'red'}}>{this.state.data.is_pass?'及格':'不及格'}</span>
                            </span>
                        </div>
                </div>
                <div 
                    style = {{
                        backgroundColor:'white',
                        height:'60%',
                        width:'90%',
                        borderRadius:'12px',
                        position:'absolute',
                        top:'38%',
                        left:'5%',
                        overflow:'scroll'
                    }}>
                    <ul>      
                        {
                            //题目信息
                            this.state.question_list.map((val,idx)=>{
                                // console.log(val);
                                return(
                                    <li 
                                        id = {val.question_class}
                                        style={{
                                            width:'100%',
                                            height:'auto',
                                            display:'flex',
                                            justifyContent:"right"
                                        }}
                                    >

                                        {
                                            val.question_array.map((val1,idx1)=>{
                                                console.log(val1);
                                                return(
                                                    <li style={{
                                                        width:'40px',
                                                        height:'40px',
                                                        background:val1.is_answered?(val1.is_right?'#ecfffd url("/d.png") no-repeat':'#ecfffd url("/x.png") no-repeat'):'white',
                                                        color:val1.is_answered?'#33a6ff':'black',
                                                        marginTop:'3%',
                                                        marginLeft:'3%',
                                                        fontSize:'20px',
                                                        fontWeight:'700',
                                                        lineHeight:'40px',
                                                        textAlign:'center',
                                                        borderRadius:'5px',
                                                        border:val1.is_answered?'none':'0.1px solid gray'
                                                    }}
                                                    id = {this.state.data.id+'&'+this.state.type}
                                                    >
                                                        {idx1+1}
                                                    </li>
                                                )
                                            })
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    goTo = (e)=>{
        // console.log(e.target.name);
        window.location.hash = '/testdetail/'+e.target.id;
    }
}
