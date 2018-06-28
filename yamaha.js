var commands = require("./commands.js");
module.exports = function(RED)
{
    //Main Function
    function Yamaha(config)
    {
        RED.nodes.createNode(this, config);
        var network = RED.nodes.getNode(config.network);
        var node = this;

        network.link(node);
        node.on("close", function() {
            network.server.close();
        });

        node.on("input", function(msg) {
            var good = false;
            if(msg.payload.direction == undefined || msg.payload.direction == null){showError(node, "Input Error", "Direction was not found, make sure msg.payload.direction exists"); return;}
            for(var key in commands.command) {
                if(key == msg.payload.command) {showError(node, "Input Error", "Command was not found, make sure msg.payload.command exists"); return;}
                if(commands.command[key].requirexPosition == true && (msg.payload.xPosition == undefined || msg.payload.xPosition == null)){showError(node, "Input Error", "xPosition was not found, make sure msg.payload.xPosition exists"); return;}
                if(commands.command[key].requireyPosition == true && (msg.payload.yPosition == undefined || msg.payload.yPosition == null)){showError(node, "Input Error", "yPosition was not found, make sure msg.payload.yPosition exists"); return;}
                if(commands.command[key].requireValue == true && (msg.payload.value == undefined || msg.payload.value == null)){showError(node, "Input Error", "Value was not found, make sure msg.payload.value exists"); return;}
            }

            var buffer = commands.generateBuffer(commands.findCommand(msg.payload.command), msg.payload.direction, msg.payload.xPosition, msg.payload.yPosition, msg.payload.value);

            //Send it!
             network.server.send(buffer, function(state) {
                 if(state == false) {
                    node.error(node, "An error occured while sending the command, please check your connection");
                    node.status({fill:"red",shape:"dot",text:"Could not send"});
                 }
             }, function(message) {
                var response = commands.findCommand(msg.payload.command).getResponse(message);
                if(commands.findCommand(msg.payload.command).responseValid(message, msg.payload.direction) == false){response = undefined;}
                if(response === undefined || response == null) {
                    node.status({fill:"red",shape:"dot",text:"Misunderstood Response"});
                    return false;
                }
                else {
                    node.send({
                        "topic": "response",
                        "payload": {
                            "rawMessage": "" + message,
                            "response": response.toLowerCase()
                        }
                    });
                    node.status({fill:"green",shape:"dot",text:"Sent!"});
                    return true;
                }
             });
        });
    }
    RED.nodes.registerType("yamahaamplifier-yamahaamplifier", Yamaha);
}

//Show an error
function showError(node, errorShort, errorLong) {
    node.error(errorLong);
    node.status({fill:"red",shape:"dot",text:errorShort});
}