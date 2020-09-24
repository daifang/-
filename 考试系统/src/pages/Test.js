import React, { Component } from 'react'

export default class Test extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    componentDidMount(){
        //获取试题
        console.log(this.props.match.params.id);
    }
    render() {
        return (
            <div style = {{display:'flex',flexDirection:'column',height:'100%'}}>
                <div style = {{
                    height:'20%',
                    backgroundColor:'red',
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
                        <span style={{width:"40%",marginLeft:'5%'}}>{`[序号][题目类型]`}</span>
                        <span>{`剩余时间:`}</span>
                    </div>
                    <div 
                        className = 'question'
                        style = {{
                            width:'100%'
                        }}
                    >
                        <p style={{marginLeft:'5%',fontSize:'20px'}}>{"题目内容"}</p>
                    </div>
                </div>
                <ul style= {{
                    height:'70%',
                    width:'100%'
                }}>
                    {
                        //选择题选项

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
                    }}>
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
                    }}>
                        <span style={{height:'100%',lineHeight:"450%",color:"#cdcdcd",fontWeight:"700",marginRight:'10%'}}>下一题</span>
                        <span style={{fontSize:"25px",height:'100%',lineHeight:'270%',color:"#cdcdcd",fontWeight:"700",marginRight:'20%'}}>{'⋙'}</span>
                    </span>
                </div>
            </div>
        )
    }
}
