import React, { Component } from 'react';
import {Form,Select,Button,Checkbox} from 'antd';

const {Option} = Select;

class Update extends Component {
    state = {display: [],dynamic:[],student:""};
    constructor(props){
        super(props);
        fetch('http://localhost:4000/read').then(res => res.json()).then(out =>{
            this.setState({ display: out});
        });
    }
    onChange = (values)=>{
        console.log("options selected: "+values);
        this.setState({dynamic: values});
    };
    onChange2 = (value) =>{
      console.log('Student selected: '+value);
      this.setState({student: value});  
    };
    render() { 

        const plainOptions = ['USN', 'Name', 'Branch','Sem','Phno'];

        const { getFieldDecorator } = this.props.form;

          const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 6 },
              sm: { span: 8 },
            },
          };  
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 6,
                offset: 0,
              },
              sm: {
                span: 8,
                offset: 4,
              },
            },
          };

        return ( 
            <React.Fragment>
                <h1 style={{padding:'10px 660px 20px',fontSize:'30px'}}>Update Student Details</h1>
                {getFieldDecorator('usn',{
                       rules:[
                           {
                               required: true,
                               message: "Please select the USN"
                           }
                       ] 
                    })(<Select 
                            onChange={this.onChange2}    
                            placeholder="Select a student"
                            showSearch
                            style={{width:'200px'}}
                        >
                            {this.state.display.map(out =>{return <Option key={out.usn} value={out.usn}>{out.usn}</Option>})}
                        </Select>
                        )}
                <h1 style={{padding:'10px 660px 0px',fontSize:'30px'}}>Select Details to Update</h1>
                <Checkbox.Group style={{padding: '20px 640px 20px'}}options={plainOptions} onChange={this.onChange} />
                

            </React.Fragment>
         );
    }
}
 
const UpdateForm = Form.create({ name: 'update' })(Update);
export default UpdateForm;