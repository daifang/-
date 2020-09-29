
import React, { Component } from 'react';
export default class Test extends Component {
    constructor(){
        super();
        this.state = {
            //试卷类型
            type:{
                final:'Final',
                normal:'Chapter'
            },
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
            question_num:localStorage.getItem('quest_num')-1,
            nowQuestData:{},
            questType:['','单选','多选',"判断"],
            len:1,
            data:[]
        }
    }
    componentWillUnmount(){
        window.removeEventListener('storage',()=>{console.log('remove')});
    }
    componentDidMount(){
        window.addEventListener('storage',()=>{
            console.log(1);
            this.componentDidMount();
        })
        let list = JSON.parse(localStorage.getItem('result')).questionList;
        this.setState({
            data_list:list
        },()=>{
                let question_list = [];
                // console.log(this.state.data_list);
                this.state.data_list.map(val=>{
                    val.question_array.map(val1=>{
                        // val1.isAuswered = false;
                        val1.selectList.map(val2=>{
                            val2.checked = false;
                        })
                        if(val1.answer_right){
                            eval(val1.answer_right).map(val3=>{
                                val1.selectList.map(val2=>{
                                    if(val3 == val2.select_id){
                                        console.log(val2,val3);
                                         val2.checked = true;
                                    }
                                })
                            })
                            console.log(this.state.data_list);
                        }
                        question_list.push(val1);
                    })
                })
                this.setState({
                    data:question_list
                },()=>{
                    console.log(this.state.data);
                });
            })
    }
    render() {
        console.log(this.state.data_list);
        if(this.state.data.length > 0)
        return(
            <div style = {{display:'flex',flexDirection:'column',height:'100%'}}>
            {/* <List/> */}
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
                    <span style={{width:"40%",marginLeft:'5%',fontSize:"16px",color:'#3197EE'}}>
                        {`${this.state.question_num+1}、【${this.state.questType[this.state.data[this.state.question_num].question_class?this.state.data[this.state.question_num].question_class:'1']}题】`}
                    </span>
                    {/* <span>{`剩余时间:${this.time(localStorage.getItem('time'))}`}</span> */}
                </div>
                <div 
                    className = 'question'
                    style = {{
                        width:'100%'
                    }}
                >
                    <p style={{marginLeft:'5%',fontSize:'16px',marginLeft:'10%'}}>{this.state.data[this.state.question_num].context}</p>
                </div>
            </div>
            <ul style= {{
                height:'auto',
                width:'100%',
                marginLeft:'5%',
                paddingBottom:'20px'
            }}>
                {
                    //选择题选项
                    this.state.data[this.state.question_num].selectList.map(
                        (val,idx)=>{
                            // console.log(val);
                            if(this.state.data[this.state.question_num].question_class == 1)
                            return(
                                <li>
                                    <input 
                                        id={val.select_id} 
                                        name={idx} 
                                        class="check1" 
                                        checked = {val.checked} 
                                        type="radio" 
                                        value={val.select_content}

                                    />
                                    <label for={val.select_id} class="radio-label" style={{display:'flex',alignItems:'center'}}>
                                        <span style={{width:'10%',marginTop:'5%',color:'#0076ce',fontSize:"15px"}}>{val.select_name}、</span>
                                        <span style={{width:"70%",marginTop:'5%',fontSize:'15px',overflowWrap:'break-word'}}>{val.select_content}</span> 
                                    </label>
                                </li>
                            )
                            else if(this.state.data[this.state.question_num].question_class == 2)
                            return(
                                <li>
                                    <input id={val.select_id} class="check1" type="checkbox"  name={idx} value={val.select_content} checked = {val.checked}/>
                                    <label for={val.select_id} class="radio-label" >
                                        <span style={{width:'10%',color:'#0076ce',position:'relative',top:'15px',fontSize:'15px'}}>{val.select_name}、</span>
                                        <span style={{width:"70%",fontSize:'15px',position:'relative',top:'15px',overflowWrap:'break-word'}}>{val.select_content}</span> 
                                    </label>
                                </li>
                            )
                            else if(this.state.data[this.state.question_num].question_class == 3)
                            return(
                                <li>
                                    <input id={val.select_id} class="check1" type="radio" name={idx} value={val.select_content} checked = {val.checked}/>
                                    <label for={val.select_id} class="radio-label" style={{display:'flex',alignItems:'center'}}>
                                        <span style={{width:'10%',marginTop:'5%',color:'#0076ce',fontSize:'15px'}}>{val.select_name}、</span>
                                        <span style={{width:"70%",marginTop:'5%',fontSize:'15px',overflowWrap:'break-word'}}>{val.select_content}</span> 
                                    </label>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div 
                style={{
                    display:'flex',
                    width:'90%',
                    marginLeft:'5%',
                    height:'50%',
                    backgroundColor:'white',
                    alignItems:'left',
                    justifyContent:'left',
                    borderTop:'0.1px solid gray'
                }}
            >
                <span style={{width:'40%',textAlign:'center',fontSize:"15px",marginLeft:'-20px',marginTop:'5%'}}>{`正确答案:${this.answer(this.state.data[this.state.question_num].answer_right,this.state.data[this.state.question_num].selectList)}`}</span>
                <span style={{width:'40%',textAlign:'center',fontSize:'15px',marginLeft:'-35px',marginTop:'5%'}}>{`你的答案:${this.answer(this.state.data[this.state.question_num].user_answer?this.state.data[this.state.question_num].user_answer:[],this.state.data[this.state.question_num].selectList)}`}</span>
            </div>
            <div 
                className = "test_foot"
                style={{
                    display:'flex',
                    width:'100%',
                    height:'15%',
                    backgroundColor:'white',
                    alignItems:'center',
                    justifyContent:'center',
                    // borderTop:"1px solid  rgb(226, 226, 226)"
                }}
            >   
                {/* <span style={{
                    width:'30%',
                    display:'flex',
                    height:"100%",
                    alignItems:'center'
                }}
                    onTouchEnd = {(e)=>{
                        this.last(e);
                    }}
                >
                    <span style={{fontSize:"19px",height:'100%',lineHeight:'540%',marginLeft:'5%'}}>
                        <img src="/exam/jiantou.png"></img>
                    </span>
                    <span
                        style={{height:'100%',lineHeight:"485%",color:"#cdcdcd",fontWeight:"300",marginLeft:'-2%',fontSize:'17px',color:'#33a6ff'}}
                    >上一题</span>
                </span> */}
                <span style={{
                    width:"40%",
                    textAlign:'center',
                    height:'100%',
                    display:'flex',
                    flexDirection:'column'
                }}
                >
                    <span style={{width:'40%',marginLeft:'30%',borderRadius:'10px',color:'gray',marginTop:'20%',height:'30%',fontSize:'17px'}}>{this.state.question_num+1}/{this.state.data.length}</span>
                    {/* <span style={{marginTop:"10%",color:' #33a6ff'}}>答题卡-交卷</span> */}
                </span>
                {/* <span style={{
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
                    <span style={{height:'100%',lineHeight:"485%",color:"#cdcdcd",fontWeight:"300",marginLeft:'-2%',fontSize:'17px',color:'#33a6ff'}}>下一题</span>
                    <span style={{fontSize:"19px",height:'100%',lineHeight:'540%',marginRight:'5%'}}><img src="/exam/jiantou.png" style={{WebkitTransform:'rotate(180deg)'}}></img></span>
                </span> */}
            </div>
        </div>
        )
        else
        return(
            <div>加载中</div>
        )
    }

    next = ()=>{
        // console.log('下一个');
        // console.log(this.state.question_num + 2>=this.state.data_list.length?'0':1);
        this.setState({
            question_num:this.state.question_num + 2>this.state.data.length?this.state.question_num :this.state.question_num + 1
        })
    }
    last = ()=>{
        // console.log('上一个');
        this.setState({
            question_num:this.state.question_num  <= 0?0:this.state.question_num - 1
        });
    }
    answer = (arr,brr)=>{
        let j = 0,str = '';
        brr.map(val=>{
            eval(arr).map(val1=>{
                
                if(val1 == val.select_id){
                    // console.log(val,val1);
                    str += ' '+val.select_name
                    // console.log(str);
                }
            })
        })
        return str;
    }
}

