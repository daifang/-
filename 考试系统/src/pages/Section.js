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
                console.log(res);
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
                                console.log(this.state.data);
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
                height:'100%',
                overflow:'scroll'
            }}>
                <ul style={{width:'100%'}}>
                {
                    this.state.data.map(val=>{
                        return(
                            <li 
                                id = {val.id} 
                                key = {val.id}
                                style={{
                                    width:'100%'
                                }}
                            >
                               <span style={{fontSize:'26px',display:'block',marginTop:'5%',marginLeft:'5%',color:'rgb(163, 163, 163)'}}>{val.name}</span> 
                                <ul style ={{
                                        width:'90%',
                                        marginLeft:"10%",
                                        fontSize:'18px'
                                    }}
                                >
                                    {
                                        //二级列表
                                        val.lesson_list.map(val1=>{
                                            return(
                                                <li 
                                                    className="sec_list"
                                                    style={{
                                                        marginTop:"15px"
                                                    }}
                                                >
                                                    <span style={{display:'block',marginTop:'-6%',marginLeft:'5%',fontSize:'20px'}}>{val1.name}</span>
                                                    <span style={{display:'block',marginLeft:'5%',fontSize:'15px',marginTop:'5%',color:'rgb(163, 163, 163)'}}>{'答题时间:'+val1.question_time}</span>
                                                    <div 
                                                        style={{
                                                            display:val1?'none':'block',
                                                            fontSize:'15px',
                                                            float:'right',
                                                            position:'relative',
                                                            right:'5%',
                                                            top:'-30px',
                                                            backgroundColor:' #33a6ff',
                                                            height:'30px',
                                                            width:'20%',
                                                            lineHeight:'30px',
                                                            textAlign:'center',
                                                            borderRadius:'5px',
                                                            color:'white'
                                                        }}
                                                        id = {val1.id}
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
        window.location.hash = '/test/'+e.target.id;
    }
}
