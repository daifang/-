import Axios from 'axios';
import React, { Component } from 'react';
import {Checkbox,Radio} from 'antd';
export default class Test extends Component {
    constructor(){
        super();
        this.state = {
            //试卷类型
            type:'',
            //期末
            page_id:'',
            id:'',
            //章节
            lesson_id:'',
            //答题卡,题目
            data_list:[],
            //返回后台答案
            answer_list:[],
            //渲染
            list:[],
            question_num:0,
            nowQuestData:{},
            questType:['','单选','多选',"判断"]
        }
    }
    componentDidMount(){
        //获取试题
        this.setState({
            type:this.props.match.params.id.split('&')[this.props.match.params.id.split('&').length-1]
        },()=>{
            if(this.state.type == 'normal'){
                console.log({
                    lessonId:this.props.match.params.id.split('&')[0]
                });
                //请求章节数据
                Axios({
                    url:'/api/student/videoCourseDesign/getQuestionList',
                    method:'POST',
                    data:{
                        lessonId:this.props.match.params.id.split('&')[0]
                    },
                    headers:{
                        Authorization:localStorage.getItem('userId')
                    }
                }).then(res=>{
                    console.log(res);
                });
            }else if(this.state.type == 'final'){
                //请求期末数据
                console.log({
                    id:this.props.match.params.id.split('&')[0].split('$')[1],
                    page_id:this.props.match.params.id.split('&')[0].split('$')[0]
                });
                Axios({
                    url:'/api/student/examination/getFinalExamQuestionList',
                    method:'POST',
                    data:{
                        id:this.props.match.params.id.split('&')[0].split('$')[1],
                        page_id:this.props.match.params.id.split('&')[0].split('$')[0]
                    },
                    headers:{
                        Authorization:localStorage.getItem('userId')
                    }
                }).then(res=>{
                    //初始化题目
                    if(res.data.code == 500){
                        alert(res.data.msg);
                        window.location.hash = '/Mine'
                    }
                    else{
                        console.log(res.data);
                        this.setState({
                            data_list:res.data.data.questionList
                        },()=>{
                            let question_list = [];
                            console.log(this.state.data_list);
                            this.state.data_list.map(val=>{
                                val.question_array.map(val=>{
                                    question_list.push(val);
                                })
                            })
                            this.setState({
                                data_list:question_list
                            },()=>{
                                console.log(this.state.data_list);
                            });
                        })
                    }
                })
            }
        })
    }
    render() {
        if(this.state.data_list.length>1)
        return(
            <div style = {{display:'flex',flexDirection:'column',height:'100%'}}>
            <div style = {{
                height:'20%',
                display:'flex',
                flexDirection:'column'
            }}>
                <div 
                    className = 'title'
                    style = {{
                        display:'flex',
                        marginTop:'5%'
                    }}
                >
                    <span style={{width:"40%",marginLeft:'5%'}}>
                        {`[${this.state.question_num+1}][${this.state.questType[this.state.data_list[this.state.question_num].question_class?this.state.data_list[this.state.question_num].question_class:'1']}]`}
                    </span>
                    <span>{`剩余时间:`}</span>
                </div>
                <div 
                    className = 'question'
                    style = {{
                        width:'100%'
                    }}
                >
                    <p style={{marginLeft:'5%',fontSize:'20px'}}>{this.state.data_list[this.state.question_num].context}</p>
                </div>
            </div>
            <ul style= {{
                height:'70%',
                width:'100%'
            }}>
                {
                    //选择题选项
                    this.state.data_list[this.state.question_num].selectList.map(
                        (val)=>{
                            console.log(val)
                            if(this.state.data_list[this.state.question_num].question_class == 1)
                            return(
                                <li>
                                    <input id={val.select_id} class="check1" type="radio" name="check1" value={val.select_content}/>
                                    <label for={val.select_id} class="radio-label" style={{display:'flex',alignItems:'center'}}>
                                        <span style={{width:'10%',marginTop:'5%',color:'#0076ce'}}>{val.select_name}、</span>
                                        <span style={{width:"80%",marginTop:'5%',fontSize:'20px'}}>{val.select_content}</span> 
                                    </label>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div 
                className = "test_foot"
                style={{
                    display:'flex',
                    width:'100%',
                    height:'10%',
                    backgroundColor:'white',
                    alignItems:'center',
                    justifyContent:'center',
                    borderTop:"1px solid rgb(196, 196, 196)"
                }}
            >   
                <span style={{
                    width:'30%',
                    display:'flex',
                    height:"100%",
                    alignItems:'center'
                }}
                    onTouchEnd = {(e)=>{
                        this.last(e);
                    }}
                >
                    <span style={{fontSize:"25px",height:'100%',lineHeight:'270%',color:"#cdcdcd",fontWeight:"700",marginLeft:'20%'}}>
                        {'⋘'}
                    </span>
                    <span
                        style={{height:'100%',lineHeight:"450%",color:"#cdcdcd",fontWeight:"700",marginLeft:'10%'}}
                    >上一题</span>
                </span>
                <span style={{
                    width:"40%",
                    textAlign:'center',
                    height:'100%',
                    display:'flex',
                    flexDirection:'column'
                }}>
                    <span style={{backgroundColor:' #33a6ff',width:'40%',marginLeft:'30%',borderRadius:'10px',color:'white',marginTop:'5%'}}>{1}/{50}</span>
                    <span style={{marginTop:"10%",color:' #33a6ff'}}>答题卡-交卷</span>
                </span>
                <span style={{
                    width:'30%',
                    display:'flex',
                    height:'100%',
                    alignItems:'center',
                    justifyContent:'center'
                }}
                    onTouchEnd = {(e)=>{
                        this.next(e);
                    }}
                >
                    <span style={{height:'100%',lineHeight:"450%",color:"#cdcdcd",fontWeight:"700",marginRight:'10%'}}>下一题</span>
                    <span style={{fontSize:"25px",height:'100%',lineHeight:'270%',color:"#cdcdcd",fontWeight:"700",marginRight:'20%'}}>{'⋙'}</span>
                </span>
            </div>
        </div>
        )
        else
        return(
            <div>加载中</div>
        )
    }

    next = ()=>{
        console.log('下一个');
        this.setState({
            question_num:this.state.question_num + 1
        })
    }
    last = ()=>{
        console.log('上一个');
        this.setState({
            question_num:this.state.question_num - 1
        })
    }
}
