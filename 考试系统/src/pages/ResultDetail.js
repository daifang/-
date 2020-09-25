import Axios from 'axios';
import React, { Component } from 'react'

export default class ResultDetail extends Component {
    constructor(){
        super();
        this.state = {
            data:{
                data:{

                }
            },
            type:'normal',
            question_list:[{question_array:[{is_answered:1,is_right:1}]}],
            api:{
                normal:'Chapter',
                final:'Final'
            }
        }
    }
    componentDidMount(){
        document.title = '考试成绩详情'
        Axios({
            method:'POST',
            url:`/api/student/examination/get${this.state.api[window.location.hash.split('&')[1]]}ExamScoreDetail`,
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            data:{
                id:this.props.match.params.id.split('&')[0],
                course_id:this.props.match.params.id.split('&')[0]
            }
        }).then(res=>{
            if(res.data.status == 40301){
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                console.log(res.data);
                this.setState({
                    data:res.data
                },()=>{
                    let list = JSON.parse(this.state.data.data.question_list);
                    this.setState({
                        question_list:list,
                        type:window.location.hash.split('&')[1]
                    },()=>{
                        // console.log(this.state.question_list);
                    })
                    // console.log(JSON.parse(this.state.data.data.question_list));
                })
            }
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
                            <span style={{height:'50%',width:'70%',lineHeight:'300%',textIndent:'15px'}}>{`考试名:${this.state.data.data.course_name?this.state.data.data.course_name:'无'}`}</span>
                            <span style={{height:'50%',width:'70%',lineHeight:'300%',textIndent:'15px'}}>{`交卷时间:${this.state.data.data.hand_in_time?this.state.data.data.hand_in_time:'无'}`}</span>
                        </div>
                        <div style = {{
                            height:'50%',
                            display:'flex',
                            alignItems:'center',
                            alignContent:'center',
                            justifyContent:'center',
                            justifyItems:'center'
                        }}>
                            <span style ={{display:'flex',width:this.state.type=='final'?'40%':'95%',height:'100%',alignItems:'center'}}>
                                <span style={{textIndent:'10px'}}>考试成绩:</span>
                                <span style={{textIndent:'10px',fontSize:'35px'}}>{this.state.data.data.score?this.state.data.data.score:'∞'}分</span>
                            </span>
                            <span style ={{display:this.state.type=='final'?'flex':'none',width:'60%',height:'100%',alignItems:'center'}}>
                                <span style={{textIndent:'10px'}}>考试结果:</span>
                                <span style={{textIndent:'10px',fontSize:'35px',color:this.state.data.data.is_pass?'green':'red'}}>{this.state.data.data.is_pass?'及格':'不及格'}</span>
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
                            this.state.question_list.map(val=>{
                                // console.log(val);
                                return(
                                    <ul 
                                        id = {val.question_class}
                                        style={{
                                            width:'100%',
                                            height:'auto',
                                            display:'flex',
                                            flexWrap:'wrap',
                                            justifyContent:"right"
                                        }}
                                    >
                                        {
                                            val.question_array.map(val1=>{
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
                                                        borderRadius:'5px'
                                                    }}
                                                    >
                                                        {val1.context}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
