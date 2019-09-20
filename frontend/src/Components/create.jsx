import React, { Component } from 'react';
import { Form,Input,InputNumber,Select,Button,Row,Col } from 'antd';

const { Option } = Select;

class Create extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ',values);
          fetch('http://localhost:4000/create',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
          }).then(res => res.text()).then(out => alert(out));
        }
      });
    };
    render() { 
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4},
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 1,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        return ( 
            <React.Fragment>
              <Row>
                <Col xs={{span:22,offset:1}} sm={{span:16,offset:8}} md={{span:16,offset:8}} lg={{span:8,offset:9}}>
                  <h1 style={{fontSize:'30px'}}>Student Registration</h1>
                </Col>
              </Row>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="USN">
                    {getFieldDecorator('usn',{
                       rules:[
                           {   
                               type: 'string',
                               len: 10,
                               pattern: /1SK1[5789](CS|EC|CV|TX)([0-9]){3}/,
                               message: "The input is not a valid USN"
                           },
                           {
                               required: true,
                               message: "Please enter the USN"
                           }
                       ] 
                    })(<Input style={{width:'200px'}}/>)}    
                </Form.Item>
                <Form.Item label="Name">
                  {getFieldDecorator('name',{
                    rules:[
                      {
                        type: 'string',
                        min: 3,
                        message:'Name must be at least 3 characters'
                      },
                      {
                        required: true,
                        message: 'Please enter the Name' 
                      }
                    ]
                  })(<Input style={{width:'200px'}}/>)}
                </Form.Item>
                <Form.Item label="Branch">
                  {getFieldDecorator('branch',{
                    rules:[
                       {
                         required: true,
                         message: 'Please select a Branch'
                       }
                    ]
                  })(<Select showSearch placeholder='Search a Branch' style={{width:'150px'}}>
                      <Option value='CSE'>CSE</Option>
                      <Option value='ECE'>ECE</Option>
                      <Option value='CIV'>CIV</Option>
                      <Option value='TEX'>TEX</Option>
                  </Select>)}
                </Form.Item>
                <Form.Item label="Semester">
                    {getFieldDecorator('sem',{
                      rules:[
                        {
                          required: true,
                          message:'Please Enter a Semester'
                        },
                        {
                          type:'number',
                          min: 1,
                          max: 8,
                          message:'Semester must be from 1-8'
                        }
                      ]
                    })(<InputNumber min={1} max={8}/>)}
                </Form.Item>
                <Form.Item label='Phone Number'>
                    {getFieldDecorator('phno',{
                      rules:[
                        {
                          required: true,
                          message:'Please enter the Phone number'
                        },
                        {
                          type: 'string',
                          pattern: /([0-9]){10}/,
                          len: 10,
                          message:'Enter a valid Phone number'
                        }
                      ]
                    })(<Input style={{width:'200px'}}/>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
            </React.Fragment>
         );
    }
}
const CreateForm = Form.create({ name: 'register' })(Create);
export default CreateForm;

