import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

import Config from "../scripts/config"



class SetGoal_2 extends Component {
    state = { ros: null }

    constructor() {
        super()

        this.init_connection()

        this.sendCommand = this.sendCommand.bind(this)
    }


    init_connection() {
        this.state.ros = new window.ROSLIB.Ros()

        try {
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            )
            console.log("SetGoal_2 - Connected")
        } catch (error) {
            console.log(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            )
            console.log("SetGoal_2 - cannot connect to the WS robot. Try again after 1 second");
        }
    }

    sendCommand(event) {
        console.log("SetGoal_2 sent command")

        // var cmdService = new window.ROSLIB.Service({
        //     ros: this.state.ros,
        //     name: '/setgoal/setgoal',
        //     serviceType: 'setgoal/msgs'
        // })

        // var cmdService_test = new window.ROSLIB.Service({
        //     ros: this.state.ros,
        //     name: '/map_server',
        //     serviceType: 'map_server/map_server'
        // })

        // var request = new window.ROSLIB.ServiceRequest({
        //     package_name: 'map_server',
        //     launch_file: 'map.yaml'
        // })

        // cmdService_test.callService(request, function(response) {
        //     console.log('Service call: ', response);
        // })

        const cmd = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: '/run_command',  // Replace with an appropriate topic name
            messageType: 'std_msgs/String'
          });
        
        const runCommand = new window.ROSLIB.Message({
            data: 'rosrun your_package your_executable'  // Replace with your desired rosrun command
          });
        
        cmd.publish(runCommand);
    }

    render() {
        return (
            <div>
                <Button onClick={this.sendCommand}>
                    SET GOAL 2
                </Button>
            </div>
        )
    }
}

export default SetGoal_2