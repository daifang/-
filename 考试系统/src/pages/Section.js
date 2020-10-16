import Axios from 'axios';
import React, { Component } from 'react';

export default class Section extends Component {
    constructor(){
        super();
        this.state = {
            data_chapter:[],
            data_section:[],
            data:[]
        }
    };
    componentDidMount(){
        //一级列表
        Axios({
            url:'/api/student/videoCourseDesign/getSectionList',
            method:'POST',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            data:{
                chapterId:this.props.match.params.key
            }
        }).then(res=>{
            if(res.data.status == 40301){
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                // console.log(res);
                this.setState({
                    data_chapter:res.data.data
                },()=>{
                    this.state.data_chapter.map(val=>{
                        Axios({
                            url:'/api/student/videoCourseDesign/getLessonList',
                            method:'POST',
                            headers:{
                                Authorization:localStorage.getItem('userId')
                            } ,
                            data:{
                                sectionId:val.id
                            }
                        }).then(res=>{
                            //二级数据
                            val.lesson_list = res.data.data;
                            let arr = this.state.data;
                            arr.push(val);
                            this.setState({
                                data:arr
                            },()=>{
                                // console.log(this.state.data);
                            })
                        })
                    })
                })
            }
        })

    };
    render() {
        return (
            <div style={{
                width:'100%',
                height:'95%',
                overflow:'scroll'
            }}
                className = "animated slideInRight"
            >
                <ul style={{width:'100%'}}>
                {
                    this.state.data.map(val=>{
                        return(
                            <li 
                                id = {val.id} 
                                key = {val.id}
                                style={{
                                    width:'90%',
                                    marginLeft:"5%"
                                }}
                            >
                               <span style={{fontSize:'14px',display:'block',marginTop:'5%',marginLeft:'5%',color:'rgb(163, 163, 163)'}}>{val.name}</span> 
                                <ul style ={{
                                        width:'90%',
                                        marginLeft:"10%",
                                        fontSize:'18px'
                                    }}
                                >
                                    {
                                        //二级列表
                                        val.lesson_list.map(val1=>{
                                            // console.log(val1)
                                            return(
                                                <li 
                                                    className="sec_list"
                                                    style={{
                                                        marginTop:"20px",
                                                        marginLeft:'-15px',
                                                    }}
                                                >
                                                    <span style={{display:'block',marginTop:'-5%',marginLeft:'5%',fontSize:'15px',overflowWrap:'break-word',width:'80%'}}>{val1.name}</span>
                                                    <span style={{display:'block',marginLeft:'5%',fontSize:'13px',marginTop:'3%',color:'rgb(163, 163, 163)'}}>
                                                        {(val1.question_time==undefined?'暂无试题':'答题时间:'+'  '+val1.question_time+'分钟')}
                                                    </span>
                                                    <div 
                                                        style={{
                                                            display:val1.examination?'block':'none',
                                                            fontSize:'13px',
                                                            float:'right',
                                                            position:'relative',
                                                            right:'5%',
                                                            top:'-35px',
                                                            backgroundColor:' #33a6ff',
                                                            height:'30px',
                                                            width:'22%',
                                                            lineHeight:'30px',
                                                            textAlign:'center',
                                                            borderRadius:'15px',
                                                            color:'white',
                                                            fontWeight:'200'
                                                        }}
                                                        className = {val1.question_time + ' ' + val1.begin_time}
                                                        id = {val1.id +"&" + val.id}
                                                        onTouchEnd = {(e)=>{
                                                            this.goTo(e);
                                                        }}
                                                        >
                                                            开始考试
                                                    </div>
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
        )
    }
    goTo = (e)=>{
        let id = JSON.stringify({
            chapter_id:this.props.match.params.key,
            section_id:e.target.id.split('&')[1],
            lesson_id:e.target.id.split('&')[0]
        });
        localStorage.setItem('id',id);
        //当前考试剩余时间
        if(e.target.classList[1] != undefined){
            let test_time = e.target.classList[0]*60000;
            localStorage.setItem('examTime',test_time);
            let date = (e.target.classList[1]+"").split('-').concat((e.target.classList[2]+"").split(':'));//考试时间
            // console.log(date);
            date.map(val=>{
                val = val*1;
            })
            let create_sec = (Date.UTC(date[0],date[1],date[2],date[3],date[4],date[5]));//创造时间
            localStorage.setItem('create_time',create_sec);//创建时间
            if(localStorage.getItem('testTime') != null){
                localStorage.setItem('testTime',localStorage.getItem('testTime'));
            }else{
                localStorage.setItem('testTime',0);
            }
            window.location.hash = '/test/'+e.target.id + "&" + "normal";
        }
    }

}
