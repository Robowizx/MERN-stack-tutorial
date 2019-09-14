import React, { Component } from 'react';
import { Form,Input,Button } from 'antd';

class Delete extends Component {
    handleSubmit = e =>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                console.log('Received values of form: ',values);
                fetch('http://localhost:4000/delete/'+values.usn,{
            method:'DELETE'
            }).then(res => res.text()).then(out => alert(out));
            }
        });
    }
    render() { 
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 16 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 12,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        return ( 
            <React.Fragment>
               <h1 style={{padding:'10px 700px 20px',fontSize:'30px'}}>Student Deletion</h1>
               <Form {...formItemLayout} onSubmit={this.handleSubmit} layout='inline'>
                   <Form.Item label="USN" style={{paddingLeft:'600px'}}>
                       {getFieldDecorator('usn',{
                           rules:[
                               {
                                   required: true,
                                   message: 'Please enter a USN'
                               },
                               {
                                type: 'string',
                                len: 10,
                                pattern: /1SK1[5789](CS|EC|CV|TX)([0-9]){3}/,
                                message: "The input is not a valid USN"
                               }
                           ]
                       })(<Input size='large' style={{width:'200px'}}/>)}
                   </Form.Item>
                   <Form.Item {...tailFormItemLayout} style={{paddingLeft:'25px'}}>
                        <Button type="primary" htmlType="submit">
                            Delete
                        </Button>
                    </Form.Item>
                </Form>   
            </React.Fragment>
         );
    }
}
 const DeleteForm = Form.create({name:'delete'})(Delete);
export default DeleteForm;
