import Axios from 'axios';
import React, { Component } from 'react';
import Card from '../compontents/Testcard';
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
            questType:['','单选','多选',"判断"],
            len:1,
            testTime:0,
            data:[],
            content:true,
            show:false,
            timer:null,
            hand_data:{}
        }
        if(localStorage.getItem('testTime') != null){
            localStorage.setItem('testTime',localStorage.getItem('testTime'));
        }else{
            localStorage.setItem('testTime',0);
        }
    }
    componentDidMount(){
        //获取试题
        this.setState({
            type:this.props.match.params.id.split('&')[this.props.match.params.id.split('&').length-1]
        },()=>{
            if(this.state.type == 'normal'){
                Axios({
                    url:'/api/student/videoCourseDesign/getQuestionList',
                    method:'POST',
                    data:{
                        lessonId:Number.parseInt(this.props.match.params.id.split('&')[0]),
                        pageNumber:0
                    },
                    headers:{
                        Authorization:localStorage.getItem('userId')
                    }
                }).then(res=>{
                    //初始化题目
                    if(res.data.code == 500){
                        alert(res.data.msg);
                        window.location.hash = '/Mine';
                    }
                    else{
                        console.log(res);
                        localStorage.setItem('test',JSON.stringify(res.data.data));
                        this.setState({
                            data_list:res.data.data.questionList,
                            len:res.data.data.questionList.length
                        },()=>{
                            let question_list = [];
                            // console.log(this.state.data_list);
                            this.state.data_list.map(val=>{
                                val.question_array.map(val1=>{
                                    val1.isAnswered = false;
                                    val1.selectList.map(val2=>{
                                        val2.checked = false;
                                    })
                                    question_list.push(val1);
                                })
                            })
                            this.setState({
                                data:question_list
                            },()=>{
                                // console.log(this.state.data);
                            });
                        })
                    }
                });
            }else if(this.state.type == 'final'){
                //请求期末数据
                // console.log({
                //     id:this.props.match.params.id.split('&')[0].split('$')[1],
                //     page_id:this.props.match.params.id.split('&')[0].split('$')[0]
                // });
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
                        localStorage.setItem('test',JSON.stringify(res.data.data));
                        this.setState({
                            data_list:res.data.data.questionList,
                            len:res.data.data.questionList.length,
                            hand_data:res.data.data
                        },()=>{
                            let question_list = [];

                            // console.log(this.state.data_list);
                            this.state.data_list.map(val=>{
                                val.question_array.map(val1=>{
                                    val1.isAnswered = false;
                                    val1.selectList.map(val2=>{
                                        val2.checked = false;
                                    })
                                    question_list.push(val1);
                                })
                            })
                            // console.log(question_list);
                            this.setState({
                                data:question_list
                            },()=>{
                                console.log(this.state.hand_data);
                            });
                        })
                    }
                })
            }
        })
        //计时
        clearInterval(this.state.timer);
        this.setState({
            timer:setInterval(()=>{
                var time = Number.parseInt(localStorage.getItem('time'));
                if(Number.isNaN(time)){
                    localStorage.removeItem('time');
                    window.location.hash = '/resultDetail';
                    clearInterval(this.state.timer);
                }else{
                    if(time -1000 <= 0){
                        localStorage.removeItem('time');
                        clearInterval(this.state.timer);
                        this.change_nr(true);
                    }else{
                        time-=1000;
                    }
                    localStorage.setItem('time',time);
                }
                var testTime = localStorage.getItem('testTime');
                testTime++;
                localStorage.setItem("testTime",testTime);
                this.setState({
                    time:time
                })
            },1000)
        });
        //返回事件
        window.addEventListener('popstate',(e)=>{
            e.preventDefault();
            console.log('禁止回退');
            window.location.hash = window.location.hash;
        })
    }
    componentWillUnmount(){
        this.state.timer&&clearInterval(this.state.timer)
    }
    render() {
        // console.log(this.state.data_list);
        if(this.state.data.length > 0)
        return(
            <div style = {{display:'flex',flexDirection:'column',height:'100%'}}>
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
                            this.state.data.map((ite,index)=>{
                                // console.log(ite)
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
                        onTouchEnd={this.change_nr}    
                            >交卷
                    </div>
                </div>
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
                    <span style={{width:"40%",marginLeft:'5%',color:'#3197EE',fontSize:"20px"}}>
                        {`[${this.state.question_num+1}][${this.state.questType[this.state.data[this.state.question_num].question_class?this.state.data[this.state.question_num].question_class:'1']}题]`}
                    </span>
                    <span style={{fontSize:'13px',marginLeft:'5%',marginTop:'2%'}}>{`剩余时间:${this.time(localStorage.getItem('time'))}`}</span>
                </div>
                <div 
                    className = 'question'
                    style = {{
                        width:'100%'
                    }}
                >
                    <p style={{marginLeft:'5%',fontSize:'20px'}}>{this.state.data[this.state.question_num].context}</p>
                </div>
            </div>
            <ul style= {{
                height:'70%',
                width:'100%'
            }}
                id='select_list'
            >
                {
                    //选择题选项

                    this.state.data[this.state.question_num].selectList.map(
                        (val,idx)=>{
                            // console.log(val);
                            if(this.state.data[this.state.question_num].question_class == 1)
                            return(
                                <li>
                                    <input id={val.select_id} name={idx} class="check1" onChange={(e)=>{this.handler(e)}} checked = {val.checked} type="radio" value={val.select_content}/>
                                    <label for={val.select_id} class="radio-label" style={{display:'flex',alignItems:'center'}}>
                                        <span style={{width:'10%',marginTop:'5%',color:'#0076ce'}}>{val.select_name}、</span>
                                        <span style={{width:"80%",marginTop:'5%',fontSize:'20px'}}>{val.select_content}</span> 
                                    </label>
                                </li>
                            )
                            else if(this.state.data[this.state.question_num].question_class == 2)
                            return(
                                <li>
                                    <input id={val.select_id} class="check1" type="checkbox" onChange={(e)=>{this.handler(e,2)}}  name={idx} value={val.select_content} checked = {val.checked}/>
                                    <label for={val.select_id} class="radio-label" >
                                        <span style={{width:'10%',color:'#0076ce',position:'relative',top:'15px'}}>{val.select_name}、</span>
                                        <span style={{width:"60%",fontSize:'20px',position:'relative',top:'15px'}}>{val.select_content}</span> 
                                    </label>
                                </li>
                            )
                            else if(this.state.data[this.state.question_num].question_class == 3)
                            return(
                                <li>
                                    <input id={val.select_id} class="check1" type="radio" onChange={(e)=>{this.handler(e)}} name={idx} value={val.select_content} checked = {val.checked}/>
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
                    <span style={{fontSize:"19px",height:'100%',lineHeight:'270%',color:"#cdcdcd",fontWeight:"700",marginLeft:'5%'}}>
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
                }}
                onTouchEnd = {()=>{
                    this.hand();
                }}
                id = 'select_list'
                >
                    <span style={{backgroundColor:' #33a6ff',width:'40%',marginLeft:'30%',borderRadius:'10px',color:'white',marginTop:'5%'}}>{this.state.question_num+1}/{this.state.data.length}</span>
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
                    <span style={{fontSize:"19px",height:'100%',lineHeight:'270%',color:"#cdcdcd",fontWeight:"700",marginRight:'5%'}}>{'⋙'}</span>
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
        this.setState({
            question_num:this.state.question_num +1 == this.state.data.length?this.state.question_num:this.state.question_num + 1
        })
        console.log(this.state.question_num);
        if(this.state.question_num+1 == this.state.data.length){
            let yes = window.confirm('是否要交卷');
            if(yes == true){
                this.change_nr();
            }else{
                return false;
            }
        }
    }
    last = ()=>{
        // console.log('上一个');
        this.setState({
            question_num:this.state.question_num  <= 0?0:this.state.question_num - 1
        })
    }
    hand = (e)=>{
        console.log('交卷');
        document.getElementById('card').style.display = 'block';
        document.getElementById('select_list').style.display = 'none';
    }
    handler = (e,num)=>{
        // console.log(e.target.checked);
        let list = this.state.data;
        if(num == 2){
            list[this.state.question_num].selectList[e.target.name].checked = e.target.checked;
            list[this.state.question_num].isAnswered = false;
            let user_answer = [];
            list[this.state.question_num].selectList.map((val,idx)=>{
                if(val.checked){
                    list[this.state.question_num].isAnswered = true;
                }
                val.checked?user_answer.push(val.select_id):user_answer.splice(0,0);
            })
            list[this.state.question_num].user_answer = user_answer;
        }else{
            list[this.state.question_num].selectList.map(val=>{
                val.checked = false;
            });
            list[this.state.question_num].selectList[e.target.name].checked = true;
            list[this.state.question_num].isAnswered = true;
            list[this.state.question_num].user_answer = list[this.state.question_num].selectList[e.target.name].checked?[list[this.state.question_num].selectList[e.target.name].select_id]:[]
        }
        this.setState({
            data_list:list
        },()=>{
            // console.log(this.state.data_list);
        })
    }
    time = (time)=>{
        //
        var value = parseInt(time/1000);
        var theTime = parseInt(value);// 秒
        var middle= 0;// 分
        var hour= 0;// 小时
    
        if(theTime > 60) {
            middle= parseInt(theTime/60);
            theTime = parseInt(theTime%60);
            if(middle> 60) {
                hour= parseInt(middle/60);
                middle= parseInt(middle%60);
            }
        }
        var result = " "+parseInt(theTime)+" ";
        if(middle > 0) {
            result = " "+parseInt(middle)+" : "+result;
        }
        if(hour> 0) {
            result = " "+parseInt(hour)+" : " +result;
        }
        return result;
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
    change_nr=(q)=>{
        console.log(12);
        localStorage.removeItem('time');
        console.log(this.state.hand_data);
        if(this.state.type == 'final'){
            console.log('期末交卷');
            let arr_xz=[],
            arr_dx=[],
            arr_pd=[],
            obj1={group_num:1,question_class:1,question_array:arr_xz},
            obj2={group_num:2,question_class:2,question_array:arr_dx},
            obj3={group_num:3,question_class:3,question_array:arr_pd},
            q_list=[obj1,obj2,obj3],
            sign = true;
            let temp3 = JSON.parse(localStorage.getItem("testTime"));
            this.state.data.map(val=>{
                switch(val.question_class){
                    case 1:arr_xz.push(val)
                            break;
                    case 2:arr_dx.push(val)
                            break;
                    case 3:arr_pd.push(val)
                }
            })
            for(let i = 0;i < this.state.data.length;i++){
                if(!this.state.data[i].isAnswered){
                    sign = false;
                    break;
                }else{
                    sign = true;
                }
            }
            if(q){
                Axios({
                    url:'/api/student/examination/handInPageQuestion',
                    method:'POST',
                    data:{
                        id:this.state.hand_data.id,
                        page_id:this.state.hand_data.page_id,
                        question_time:temp3,
                        pass_rate:this.state.hand_data.pass_rate,
                        totalSize:this.state.hand_data.totalSize,
                        scoring_formula:this.state.hand_data.scoring_formula,
                        questionList:q_list,
                    },
                    headers:{
                        Authorization:localStorage.getItem('userId')
                    }
                }).then((res)=>{
                    console.log(res);
                    if(res.data.code == 0){
                        alert("提交成功！");
                        let str = JSON.stringify(res.data.data);
                        localStorage.setItem('result',str);
                        localStorage.removeItem('time');
                        window.location.hash = '/resultDetail/';
                    }else{
                        alert("提交出错，请重试！");
                        window.location.hash = '/';
                    }
                })
                return 0;
            }
            if(sign){
                localStorage.removeItem('time');
                let yes = window.confirm('交卷后不能再作答，确定要交卷吗？');
                if(yes){
                    Axios({
                        url:'/api/student/examination/handInPageQuestion',
                        method:'POST',
                        data:{
                            id:this.props.match.params.id.split('&')[0].split('$')[1],
                            page_id:this.props.match.params.id.split('&')[0].split('$')[0],
                            question_time:temp3,
                            pass_rate:this.state.data_list.pass_rate,
                            totalSize:this.state.data_list.totalSize,
                            scoring_formula:this.state.data_list.scoring_formula,
                            questionList:q_list,
                        },
                        headers:{
                            Authorization:localStorage.getItem('userId')
                        }
                    }).then((res)=>{
                        console.log(res);
    
                        if(res.data.code == 0){
                            alert("提交成功！");
                            let str = JSON.stringify(res.data.data);
                            localStorage.setItem('result',str);
                            localStorage.removeItem('time');
                            window.location.hash = '/resultDetail/';
                        }else{
                            alert("提交出错，请重试！");
                            window.location.hash = '/';
                        }
                    })
                }

            }else{
                let ok = window.confirm('还有问题没有回答，是否要提交');
                clearInterval(this.state.timer);
                if(ok){
                    Axios({
                        url:'/api/student/examination/handInPageQuestion',
                        method:'POST',
                        data:{
                            id:this.props.match.params.id.split('&')[0].split('$')[1],
                            page_id:this.props.match.params.id.split('&')[0].split('$')[0],
                            question_time:temp3,
                            pass_rate:this.state.data_list.pass_rate,
                            totalSize:this.state.data_list.totalSize,
                            scoring_formula:this.state.data_list.scoring_formula,
                            questionList:q_list,
                        },
                        headers:{
                            Authorization:localStorage.getItem('userId')
                        }
                    }).then((res)=>{
                        console.log(res);
    
                        if(res.data.code == 0){
                            alert("提交成功！");
                            let str = JSON.stringify(res.data.data);
                            localStorage.setItem('result',str);
                            localStorage.removeItem('time');
                            window.location.hash = '/resultDetail/';
                        }else{
                            console.log(res);
                            alert(res.data.msg);
                            window.location.hash = '/';
                        }
                    })
                }
            }
        }else{
            //章节考试
            let arr_xz=[],
            arr_dx=[],
            arr_pd=[],
            obj1={group_num:1,question_class:1,question_array:arr_xz},
            obj2={group_num:2,question_class:2,question_array:arr_dx},
            obj3={group_num:3,question_class:3,question_array:arr_pd},
            q_list=[obj1,obj2,obj3],
            sign = true;
            let temp1 = JSON.parse(localStorage.getItem("userInfo")),
            temp2 = JSON.parse(localStorage.getItem('id')),
            temp3 = JSON.parse(localStorage.getItem("testTime")),
            temp4 = JSON.parse(localStorage.getItem("test"))
            console.log(temp3);
            this.state.data.map(val=>{
                switch(val.question_class){
                    case 1:arr_xz.push(val)
                            break;
                    case 2:arr_dx.push(val)
                            break;
                    case 3:arr_pd.push(val)
                }
            })
            for(let i = 0;i < this.state.data.length;i++){
                if(!this.state.data[i].isAnswered){
                    sign = false;
                    break;
                }else{
                    sign = true;
                }
            }
            if(q){
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
                        totalSize:this.state.data.length,
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
                        let str = JSON.stringify(res.data.data);
                        localStorage.setItem('result',str);
                        localStorage.removeItem('time');
                        window.location.hash = '/resultDetail/';
                    }else{
                        alert("提交出错，请重试！");
                        window.location.hash = '/';
                    }
                })
                return 0;
            }
            if(sign){
                localStorage.removeItem('time');
                let yes = window.confirm('交卷后不能再作答，确定要交卷吗？');
                if(yes){
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
                        totalSize:this.state.data.length,
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
                        let str = JSON.stringify(res.data.data);
                        localStorage.setItem('result',str);
                        localStorage.removeItem('time');
                        window.location.hash = '/resultDetail/';
                    }else{
                        alert("提交出错，请重试！");
                        window.location.hash = '/';
                    }
                })
                }

            }else{
                let ok = window.confirm('还有问题没有回答，是否要提交');
                clearInterval(this.state.timer);
                if(ok){
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
                            totalSize:this.state.data.length,
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
                            let str = JSON.stringify(res.data.data);
                            localStorage.setItem('result',str);
                            localStorage.removeItem('time');
                            window.location.hash = '/resultDetail/';
                        }else{
                            alert("提交出错，请重试！");
                            window.location.hash = '/';
                        }
                    })
                }
            }
        }
    }
}
