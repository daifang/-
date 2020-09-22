import React, { Component } from 'react'

export default class Input extends Component {
    constructor(){
        super();   
    }
    render() {
        return (
            <div style={{display:"flex",flexDirection:"column"}}>
                <span style={{marginLeft:'5%',fontWeight:'500'}}>
                    {this.props.title}
                </span>
                <input 
                    autoComplete = 'off'
                    type = {this.props.type} 
                    style = {this.props.style}
                    placeholder = {this.props.placeholder}
                    onChange = {(e)=>{
                        this.onChange(e);
                    }}
                    name = {this.props.name}
                />
            </div>
        );
    };
    onChange = (e)=>{
        this.props.onChange(e);
    }
}
