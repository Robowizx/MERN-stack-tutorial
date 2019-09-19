import React, { Component } from 'react';
import { Layout,Menu } from 'antd';
import 'antd/dist/antd.css';
import CreateForm from './Components/create';
import Read from './Components/read';
import DeleteForm from './Components/delete';
import back from './MERN.jpg';

const { Content } = Layout;


class App extends Component {
  state = { option: "home"};          

  handleClick = e =>{
     this.setState({option: e.key});
  }
  tabSelect = ()=>{
     switch(this.state.option)
     {
        case "home": return <div style={{backgroundImage:`url(${back})`,backgroundSize:"1680px 865px",height:"800px"}}></div>;
        case "create": return <CreateForm/>;
        case "read": return <Read/>;
        case "delete": return <DeleteForm/>;
        default: return <h1 style={{margin: '300px 650px 460px',fontSize:'50px'}}>In development</h1>; 
     }
  } 
  render() { 
    return ( 
       <React.Fragment>
         <Layout className="layout">
                  <Menu style={{lineHeight: '64px'}}onClick={this.handleClick} selectedKeys={[this.state.option]} mode="horizontal">
                     <Menu.Item key="home">Home</Menu.Item>
                     <Menu.Item key="create">Create</Menu.Item>
                     <Menu.Item key="read">Read</Menu.Item>
                     <Menu.Item key="update">Update</Menu.Item>
                     <Menu.Item key="delete">Delete</Menu.Item>
                  </Menu>
            <Content style={{background:"#ffff"}}>
               {this.tabSelect()}
            </Content>
         </Layout>
       </React.Fragment> 
      )}   
}
export default App;