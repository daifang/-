import React, { Component } from 'react';
import Axios from 'axios' ;
import '../css/Classes.css';
//章节页
export default class Final extends Component {
    constructor(){
        super();
        this.state = {
            data : [],
            courseId : 0,
        }
    }

    getData = () => {
        Axios({
            method:'get',
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            url:'/api/student/studentInformation/getStudentInformation' 
        }).then((res) => {
            this.setState({
                courseId : res.data.course_id
            },()=>{
                // console.log(this.state.courseId)
                Axios({
                    method:'post',
                    data: {
                        courseId : this.state.courseId
                    },
                    headers:{
                        Authorization:localStorage.getItem('userId')
                    },
                    url:'/api/student/videoCourseDesign/getChapterList'
                }).then((response) => {
                    if(response.data.status){
                        alert('登录状态已过期,请重新登录');
                        localStorage.setItem('userId','');
                        window.location.hash = '/';
                    }else{
                        // console.log(this.state.courseId)
                        this.setState({
                            data: response.data.data?response.data.data:{ok:true}
                        })
                        // console.log(response.data.data);
                    }
                })
            })
        })
    }
    componentDidMount(){
        document.title = '章节测试';
        this.getData();
    }
    render() {
        if(!this.state.data.ok){
            var temp = this.state.data.map((item,index) => <p key={item.id} id={item.id} className="class_content" onTouchEnd = {(e)=>{this.goTo(e)}}><span className="con_p" id={item.id} style={{fontSize:'18px',overflowWrap:'break-word',display:'block'}}>{item.name}</span></p>)

            return (
                <div className="animated slideInRight" style={{height:'100%'}}>
                    <div id="class_head"></div>
                    <div id="class_content" style={{overflowY:'scroll'}}>
                        {temp}
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{width:'100%',height:'30%',textAlign:'center',fontSize:'25px',marginTop:'30%'}} className="animated slideInRight">
                    
                </div>
            )
        }
    }
    goTo = (e)=>{
        window.location.hash = 'Section/'+e.target.id;
    }
}
