import React from 'react';
import logo from "../logo/logo.jpg";


function DashBoard(props) {
    return (
        <div className="dashboard">
            <img src={logo} alt={"logo"} width="130%"></img>
        </div>
    );
    var styles = StyleSheet.create({
        container: {
             flex: 1,
             justifyContent: 'center',
             alignItems: 'center',
             backgroundColor: '#F5FCFF',
             flexDirection: 'column',
        },
             backgroundImage:{
             width:320,
             height:480,
           }
        }
    )
}

export default DashBoard;