import React, {Component} from "react";
import {Form, Input, Button, Row, Col} from "antd";

class Delete extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        fetch("http://localhost:4000/delete/" + values.usn, {
          method: "DELETE"
        })
          .then(res => res.text())
          .then(out => alert(out));
      }
    });
  };
  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 10}
      },
      wrapperCol: {
        xs: {span: 22},
        sm: {span: 4}
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 22,
          offset: 1
        },
        sm: {
          span: 4,
          offset: 10
        }
      }
    };

    return (
      <React.Fragment>
        <Row>
          <Col
            xs={{span: 22, offset: 1}}
            sm={{span: 14, offset: 10}}
            md={{span: 14, offset: 10}}
            lg={{span: 8, offset: 10}}>
            <h1 style={{paddingBottom: "20px", fontSize: "30px"}}>
              Student Deletion
            </h1>
          </Col>
        </Row>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="USN">
            {getFieldDecorator("usn", {
              rules: [
                {
                  required: true,
                  message: "Please enter a USN"
                },
                {
                  type: "string",
                  len: 10,
                  pattern: /1SK1[5789](CS|EC|CV|TX)([0-9]){3}/,
                  message: "The input is not a valid USN"
                }
              ]
            })(<Input size="large" style={{width: "250px"}} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Delete
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}
const DeleteForm = Form.create({name: "delete"})(Delete);
export default DeleteForm;
