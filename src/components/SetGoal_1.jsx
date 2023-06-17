import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

import Config from "../scripts/config";

class SetGoal_1 extends Component {
    state = { ros: null }

    constructor() {
        super()

        this.init_connection()
        this.sendCommand = this.sendCommand.bind(this)
    }

    sendCommand(event) {
        console.log("SetGoal_1 sent command")

        var cmdService = new window.ROSLIB.Service({
            ros: this.state.ros,
            name: '/setgoal/setgoal',
            serviceType: 'setgoal/msgs'
        })

        var request = new window.ROSLIB.ServiceRequest({
            package_name: 'navstack_pub',
            launch_file: 'set_goals1'
        })

        cmdService.callService(request, function(response) {
            console.log('Service call: ', response);
        })
    }

    init_connection() {
        this.setState(
            {
                ros: new window.ROSLIB.Ros()
            }
        )

        try {
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            )
            console.log("SetGoal_1 - Connected")
        } catch (error) {
            console.log(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            )
            console.log("SetGoal_1 - cannot connect to the WS robot. Try again after 1 second");
        }
    }

    sendCommand() {
        console.log("SetGoal_1 sent command")
    }

    render() {
        return (
            <div>
                <Button onClick={this.sendCommand}>
                    SET GOAL 1
                </Button>
            </div>
        )
    }
}

export default SetGoal_1
