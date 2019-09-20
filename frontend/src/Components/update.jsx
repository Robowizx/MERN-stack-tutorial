import React, { Component } from 'react';
import {Form,Select,Button,Checkbox,Row,Col,Input,InputNumber} from 'antd';

const {Option} = Select;

class Update extends Component {
    state = {display: [],fields:[]};
    constructor(props){
        super(props);
        fetch('http://localhost:4000/read').then(res => res.json()).then(out =>{
            this.setState({ display: out});
        });
    }
    onChange = (values)=>{
        console.log("options selected: "+values);
        this.setState({fields: values});
    };
    onChange2 = (value) =>{
      console.log('Student selected: '+value);  
    };
    search = (item) =>{
      for(let i=0;i< this.state.fields.length;i++){
          if(this.state.fields[i]===item)
            return true;
              
      }
      return false;
    };
    submit = (e)=>{
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ',values);
          fetch('http://localhost:4000/update/'+values.usn,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
          }).then(res => res.text()).then(out => alert(out));
          
        }
      });
    }
    render() { 

        const plainOptions = ['Name', 'Branch','Sem','Phno'];

        const { getFieldDecorator } = this.props.form;

          const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 8 },
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
                offset: 8,
              },
            },
          };

        return ( 
            <React.Fragment>
                <Row>
                <Col xs={{span:22,offset:1}} sm={{span:16,offset:8}} md={{span:16,offset:8}} lg={{span:8,offset:9}}>
                  <h1 style={{fontSize:'30px'}}>Update Student Details</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={{span:22,offset:1}} sm={{span:8,offset:10}} style={{paddingBottom:'20px',paddingTop:'10px'}}>
                  <Form.Item>
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
                  </Form.Item>
                </Col>
              </Row>  
              <Row>
                <Col xs={{span:22,offset:1}} sm={{span:16,offset:8}} md={{span:16,offset:8}} lg={{span:8,offset:9}}>
                  <h1 style={{fontSize:'30px'}}>Select Details to Update</h1>
                </Col>
              </Row>
              <Row>
                <Col sm={{span:8,offset:9}}>
                  <Checkbox.Group style={{paddingLeft:'20px',paddingBottom:'50px'}}options={plainOptions} onChange={this.onChange} />
                </Col>
              </Row>
              <Form {...formItemLayout} onSubmit={this.submit}>
                { this.search("Name")?<Form.Item label='Student Name'>
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
                  </Form.Item>:null
                }
                {this.search("Branch")?<Form.Item label='Branch'>
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
                    </Form.Item>:null
                }
                {this.search("Sem")?<Form.Item label='Semester'>
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
                  </Form.Item>:null
                }
                {this.search("Phno")?<Form.Item label='Phone Number'>
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
                  </Form.Item>:null
                }
                {
                  (this.state.fields.length>=1)?<Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                  </Form.Item>:null
                }
              </Form>  
            </React.Fragment>
         );
    }
}
 
const UpdateForm = Form.create({ name: 'update' })(Update);
export default UpdateForm;