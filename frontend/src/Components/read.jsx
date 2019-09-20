import React, {Component} from "react";
import {Descriptions, Row, Col} from "antd";

class Read extends Component {
  state = {
    display: []
  };
  constructor(props) {
    super(props);
    fetch("http://localhost:4000/read")
      .then(res => res.json())
      .then(out => {
        this.setState({display: out});
      });
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col
            xs={{span: 22, offset: 1}}
            sm={{span: 16, offset: 8}}
            md={{span: 16, offset: 8}}
            lg={{span: 8, offset: 9}}>
            <h1 style={{fontSize: "30px"}}>Student Details</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={{span: 22, offset: 1}} sm={{span: 16, offset: 4}}>
            {this.state.display.map(out => {
              return (
                <Descriptions
                  style={{paddingBottom: "30px"}}
                  bordered
                  title={out.name}
                  key={out["_id"]}>
                  <Descriptions.Item label="USN">{out.usn}</Descriptions.Item>
                  <Descriptions.Item label="Branch" span={2}>
                    {out.branch}
                  </Descriptions.Item>
                  <Descriptions.Item label="Semester">
                    {out.sem}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone number">
                    {out.phno}
                  </Descriptions.Item>
                </Descriptions>
              );
            })}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Read;
