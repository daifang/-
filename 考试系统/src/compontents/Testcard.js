// v3
import React, { Component } from 'react';
import Axios from 'axios';

export default class TestCard extends Component {

    constructor(){
        super();
        this.state={
            data:[],
            show:false,
            content:true,
            marTop:'36px',
        }
    }

    componentDidMount(){
        document.title = '答题卡';
        // console.log(this.props.data);
    }
    componentWillReceiveProps(next){
        console.log(next);
        this.setState({
            data:next.data
        })
    }

    render() {
        if(this.state.data.data == {}){
            console.log("没有数据")
        }else{
            return(
                <div style ={{height:'100%s',display:'none'}} id = "card">
                    <div
                    style={{
                        width:'100%',
                        height:'90%',
                        position:'fixed',
                        backgroundColor:'white',
                        top: '0',right: '0',left: '0',bottom: '0',
                        // display:'none'
                    }}>
                        <div 
                        style={{
                            width:'100%',
                            height:'10%',
                            float:'left',
                            
                        }} onTouchEnd={(e)=>{
                            document.getElementById('card').style.display = 'none';
                            document.getElementById('select_list').style.display = 'block';
                            }}>
                            <img src="/quxiao.png"
                            style={{
                                transform:'scale(0.15)',
                                marginTop:'-17%',
                                marginLeft:'-17%'
                            }}></img>
                        </div>
                        {
                            this.props.data.map((ite,index)=>{
                                console.log(ite)
                                return(
                                <div style={
                                    ite.isAnswered?{
                                        width:'40px',
                                        height:'40px',
                                        backgroundColor:'#ECFFFD',
                                        display:'inline',
                                        float:'left',
                                        marginTop:'20px',
                                        marginLeft:'5%',
                                        textAlign:'center',
                                        lineHeight:'40px',
                                        fontSize:'23px',
                                        borderRadius:'4px'
                                    }:{
                                        width:'40px',
                                        height:'40px',
                                        backgroundColor:'white',
                                        display:'inline',
                                        float:'left',
                                        marginTop:'20px',
                                        marginLeft:'5%',
                                        textAlign:'center',
                                        lineHeight:'40px',
                                        fontSize:'23px',
                                        border:'1px solid gray',
                                        borderRadius:'4px'
                                }}>{index+1}</div>
                                )
                            })
                        }
                    </div>
                    <div 
                        style={{
                            position:'fixed',
                            top: '0',right: '0',left: '0',bottom: '0',
                            backgroundColor:'#666666',
                            opacity:'0.6',
                            float:'left',
                            display:this.state.show?'block':'none',
                        }}
                    >
                        
                    </div>
                    <div 
                        style={{
                            width:'70%',
                            height:'110px',
                            backgroundColor:'white',
                            position:'absolute',
                            top: '0',right: '0',left: '0',bottom: '0',
                            margin:'auto',
                            zIndex:'1',
                            borderRadius:'20px',
                            paddingTop:'30px',
                            display:this.state.show?'block':'none'
                        }}>
                            <span
                            style={{
                                marginLeft:'10px'
                            }}>
                                {this.state.content?"还有题未答，确定要交卷吗？":"交卷后不能再作答，确定要交卷吗？"}
                            </span>
                            <div 
                            style={{
                                width:'50%',
                                height:'35px',
                                position:'absolute',
                                top: '1',right: '0',left: '0',bottom: '0',
                                display:'inline',
                                float:'left',
                                borderTop:'1px solid #7F7F7F',
                                borderBottomLeftRadius:'20px',
                                textAlign:'center',
                                paddingTop:'15px',
                            }}
                            onTouchEnd={this.change_qx}>
                                <span
                                style={{
                                    color:'#2C9AEF',
                                }}>
                                    取消
                                </span>
                            </div>
                            <div 
                            style={{
                                width:'49%',
                                height:'35px',
                                position:'absolute',
                                top: '1',right: '0',left: '1',bottom: '0',
                                display:'inline',
                                float:'left',
                                borderTop:'1px solid #7F7F7F',
                                borderLeft:'1px solid #7F7F7F',
                                borderBottomRightRadius:'20px',
                                textAlign:'center',
                                paddingTop:'15px',
                            }}
                            onTouchEnd={this.change_nr}>
                                <span
                                style={{
                                    color:'#2C9AEF',
                                }}>
                                    交卷
                                </span>
                            </div>
                        </div>
                    <div 
                        style={{
                            width:'100%',
                            height:'30px',
                            backgroundColor:'#2C9AEF',
                            border:'0px',
                            float:'left',
                            textAlign:'center',
                            paddingTop:'10px',
                            position:'fixed',
                            top: '100',right: '0',left: '0',bottom: '0',
                            }}
                        onTouchEnd={this.change_jj}    
                            >交卷
                    </div>
                </div>
            )
        }
    }

    change_jj=()=>{
        this.setState({
            show:true
        })
    }
    change_qx=()=>{
        this.setState({
            show:false,
            content:true
        })
    }
    change_nr=()=>{
        let arr_xz=[],
            arr_dx=[],
            arr_pd=[],
            obj1={group_num:1,question_class:1,question_array:arr_xz},
            obj2={group_num:2,question_class:2,question_array:arr_dx},
            obj3={group_num:3,question_class:3,question_array:arr_pd},
            q_list=[obj1,obj2,obj3];
        this.setState({
            content:false
        })
        if(this.state.content == false){
            let temp1 = JSON.parse(localStorage.getItem("userInfo")),
                temp2 = JSON.parse(localStorage.getItem('id')),
                temp3 = JSON.parse(localStorage.getItem("testTime")),
                temp4 = JSON.parse(localStorage.getItem("test"))
                console.log(temp3);

                this.props.data.map(val=>{
                    switch(val.question_class){
                        case 1:arr_xz.push(val)
                                break;
                        case 2:arr_dx.push(val)
                                break;
                        case 3:arr_pd.push(val)
                    }
                })
            Axios({
                url:'/api/student/videoCourseDesign/handInChapterQuestion',
                method:'POST',
                data:{
                    course_id:temp1.course_id,
                    chapter_id:temp2.chapter_id,
                    section_id:temp2.section_id,
                    lesson_id:temp2.lesson_id,
                    question_time:temp3,
                    chapter_pass_rate:temp4.pass_rate,
                    totalSize:this.props.data.length,
                    scoring_formula:temp4.scoring_formula,
                    questionList:q_list,
                },
                headers:{
                    Authorization:localStorage.getItem('userId')
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.code == 0){
                    alert("提交成功！");
                    window.location.hash = '/';
                }else{
                    alert("提交出错，请重试！");
                    window.location.hash = '/';
                }
            })
        }
    }
}
