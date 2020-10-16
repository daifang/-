import Axios from 'axios';
import React, { Component } from 'react';
var i=0;

export default class ResultDetail extends Component {
    constructor(){
        super();
        this.state = {
            data:{
                data:{

                }
            },
            type:'normal',
            question_list:[],
            api:{
                normal:'Chapter',
                final:'Final'
            },
            questionType:['','单选题','多选题','判断题']
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
    componentWillUnmount(){
        i=0;
    }
    render() {
        if(this.state.question_list.length == 0){
            return(<div>加载中</div>)
        }else
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
                            <span style={{height:'auto',width:'90%',fontSize:'18px',overflowWrap:'break-word',marginLeft:'5%',marginTop:'5%'}}>{`${(this.state.data.data.chapter_name?this.state.data.data.chapter_name:this.state.data.data.course_name) + " " + (this.state.data.data.lesson_name? this.state.data.data.lesson_name:this.state.data.data.page_name)}`}</span>
                            <span style={{height:'50%',width:'70%',lineHeight:'300%',textIndent:'20px',fontSize:'14px',color:'rgb(180, 180, 180)',position:'absolute',top:'30%'}}>{`交卷时间:${this.state.data.data.hand_in_time?this.state.data.data.hand_in_time:'无'}`}</span>
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
                                <span style={{textIndent:'10px',fontSize:'15px',color:'rgb(180, 180, 180)'}}>考试成绩:</span>
                                <span style={{fontSize:'25px',marginLeft:'10px',lineHeight:'30px'}}>{this.state.data.data.score?this.state.data.data.score:'0'}分</span>
                            </span>
                            <span style ={{display:this.state.type=='final'?'flex':'none',width:'60%',height:'100%',alignItems:'center'}}>
                                <span style={{textIndent:'10px',fontSize:'15px'}}>考试结果:</span>
                                <span style={{fontSize:'25px',color:this.state.data.data.is_pass?'green':'red'}}>{this.state.data.data.is_pass?'及格':'不及格'}</span>
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
                        <div
                        style={{
                            fontSize:"18px",
                            marginLeft:'4%',
                            marginTop:'5px'
                        }}>
                            答题卡
                        </div>
                    <ul>      
                        {
                            //题目信息
                            this.state.question_list.map((val,idx)=>{
                                // console.log(val);
                                return(
                                    <li 
                                        id = {val.question_class}
                                    >
                                    <div 
                                        style={{
                                                display:val.question_array.length?'block':'none',
                                                marginLeft:'4%',
                                                marginTop:"5%",
                                                fontSize:'15px'
                                        }}> 
                                            {this.state.questionType[val.question_class]}
                                        </div>
                                    <ul style={{width:'100%',display:'flex',flexWrap:'wrap'}}>
                                    {
                                            val.question_array.map((val1,idx1)=>{
                                                i++;
                                                return(
                                                    <li style={{
                                                        width:'35px',
                                                        height:'35px',
                                                        background:val1.is_answered?(val1.is_right?'#ecfffd url("/exam/d.png") no-repeat':'#ecfffd url("/exam/x.png") no-repeat'):'white',
                                                        color:val1.is_answered?'#33a6ff':'black',
                                                        marginTop:'3%',
                                                        marginLeft:'3%',
                                                        fontSize:'15px',
                                                        fontWeight:'500',
                                                        lineHeight:'35px',
                                                        textAlign:'center',
                                                        borderRadius:'5px',
                                                        border:val1.is_answered?'none':'0.3px solid gray'
                                                    }}
                                                    className={i}
                                                    id = {this.state.data.data.id+'&'+this.state.type}
                                                    onTouchEnd = {(e)=>{
                                                        localStorage.setItem('idx',idx1);
                                                        this.goTo(e);
                                                    }}
                                                    >
                                                        {i}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>


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
        localStorage.setItem('quest_num',e.target.classList[0]);
        window.location.hash = '/testdetail/'+e.target.id;
    }
}
