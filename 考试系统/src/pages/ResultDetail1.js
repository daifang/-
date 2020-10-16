import React, { Component } from 'react';
var i=0;
export default class ResultDetail1 extends Component {
    constructor(){
        super();
        this.state = {
            data:null,
            type:localStorage.getItem('type'),
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
        if(localStorage.getItem('result') != null){
            let list = JSON.parse(localStorage.getItem('result')).questionList;
            this.setState({
                question_list:list,
                data:JSON.parse(localStorage.getItem('result'))
            })
        }
        window.addEventListener('storage',()=>{
            console.log(1);
            this.componentDidMount();
        })
    }
    componentWillUnmount(){
        window.removeEventListener('storage',()=>{console.log('remove')});
        i=0
    }
    render() {
        if(this.state.data == null){
            return(<div></div>)
        }else{
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
                                <span style={{height:'50%',width:'90%',fontSize:'18px',overflowWrap:'break-word',marginLeft:'5%',marginTop:'5%'}}>{`${(this.state.data.chapter_name?this.state.data.chapter_name:this.state.data.course_name) + " " + (this.state.data.lesson_name? this.state.data.lesson_name:this.state.data.page_name)}`}</span>
                                <span style={{height:'50%',width:'70%',lineHeight:'300%',textIndent:'20px',fontSize:'14px',color:' rgb(180, 180, 180)',position:'absolute',top:'30%'}}>{`交卷时间:${this.state.data.hand_in_time?this.state.data.hand_in_time:this.state.data.create_time}`}</span>
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
                                    <span style={{textIndent:'10px',fontSize:'15px',color:' rgb(180, 180, 180)'}}>考试成绩:</span>
                                    <span style={{fontSize:'25px',textIndent:'10px'}}>{(this.state.data.userTotalScore!==undefined)?this.state.data.userTotalScore:this.state.data.user_total_score}分</span>
                                </span>
                                <span style ={{display:((this.state.type=='final')?'flex':'none'),width:'49%',height:'100%',alignItems:'center'}}>
                                    <span style={{textIndent:'10px',fontSize:'15px',color:'rgb(180, 180, 180)'}}>考试结果:</span>
                                    <span style={{fontSize:'25px',color:this.state.data.is_pass?'green':'red'}}>{this.state.data.is_pass?'及格':'不及格'}</span>
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
                                            style={{
                                                width:'100%',
                                                height:'auto'
                                            }}
                                        >
                                        <div 
                                        style={{
                                                display:val.question_array.length?'block':'none',
                                                marginLeft:'4%',
                                                marginTop:"5%",
                                                fontSize:'15px'
                                        }}> {this.state.questionType[val.question_class]}</div>
                                       <ul style={{width:'100%',display:'flex',flexWrap:'wrap'}}>
                                       {
                                                val.question_array.map((val1,idx1)=>{
                                                    i++;
                                                    console.log(val1);
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
                                                        id = {this.state.data.id+'&'+this.state.type}
                                                        onTouchEnd = {
                                                            (e)=>{
                                                                this.goTo(e);
                                                            }
                                                        }
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
    }
    goTo = (e)=>{
        // console.log(e.target.name);
        localStorage.setItem('quest_num',e.target.classList[0]);
        window.location.hash = '/testdetail/';
    }
}
