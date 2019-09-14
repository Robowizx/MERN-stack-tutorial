import React, { Component } from 'react';
import { Descriptions } from 'antd';

class Read extends Component {

    state={
        display:[],
    };
    constructor(props){
        super(props);
        fetch('http://localhost:4000/read').then(res => res.json()).then(out =>{
            this.setState({ display: out});
        });
    }    
    render() { 
        return (
            <React.Fragment>
                <h1 style={{padding:'10px 700px 0px',fontSize:'30px'}}>Student Details</h1>
                {this.state.display.map(out =>{return <Descriptions style={{padding: '50px 100px'}}bordered title={out.name} key={out['_id']}>
            <Descriptions.Item label="USN">{out.usn}</Descriptions.Item>
            <Descriptions.Item label="Branch" span={2}>{out.branch}</Descriptions.Item>
            <Descriptions.Item label="Semester">{out.sem}</Descriptions.Item>
            <Descriptions.Item label="Phone number">{out.phno}</Descriptions.Item>
        </Descriptions>})}
            </React.Fragment>
        );
    }
}
 
export default Read;