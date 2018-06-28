var command = {
    "power": {
        "standby": {
            requirexPosition: false,
            requireyPosition: false,
            requireValue: true,
            memNo: "512",
            uniqueID: "1",
            elmNo: "6",
            generateString: function(direction, xPosition, yPosition, value) {
                if(xPosition === undefined || xPosition === null){xPosition = "0";}
                if(yPosition === undefined || yPosition === null){yPosition = "0";}  
                var valueObject = {
                    xPos: xPosition,
                    yPos: yPosition,
                    prmNo: "0",
                    indexNo: "0"       
                }
                if(value === undefined || value === null) {
                    return generateMTXString(direction, this, valueObject);
                }
                if(direction == "set") {
                    if(value == "on") {
                        valueObject.value = "0";
                        return generateMTXString(direction, this, valueObject);
                    }
                    else if(value == "standby") {
                        valueObject.value = "1";
                        return generateMTXString(direction, this, valueObject);
                    }
                }
                else {
                    return generateMTXString(direction, this, valueObject);
                }
                return "error";
            },
            responseValid: function(message, direction) {
                message = "" + message;
                if(message.slice(0, 2) !== "OK"){return false;}
                if(message.slice(3, 6) !== direction){return false;}
                if(message.slice(7, 15) !== "MTX:mem_"){return false;}
                return true;
            },
            getResponse: function(message) {
                message = "" + message;
                if(message.slice(15, 18) !== "512"){return;}
                if(message.slice(19, 20) !== "1"){return;}
                if(message.slice(21, 22) !== "6"){return;}
                if(message.slice(23, 24) !== "0"){return;}
                if(message.slice(25, 26) !== "0"){return;}
                if(message.slice(27, 28) !== "0"){return;}
                if(message.slice(29, 30) !== "0"){return;}
                if(message.slice(31, 32) !== "0"){return;}
                if(message.slice(33, 34) !== "0"){return;}
                return message.slice(message.indexOf('"') + 1, message.length - 2);
            },
            isThis: function(message) {
                return false;
            }
        }
    },
    "volume": {
        "ATT": {
            requirexPosition: true,
            requireyPosition: false,
            requireValue: true,
            memNo: "512",
            uniqueID: "1",
            elmNo: "4",
            generateString: function(direction, xPosition, yPosition, value) {
                if(xPosition === undefined || xPosition === null){xPosition = "0";}
                if(yPosition === undefined || yPosition === null){yPosition = "0";}           
                var valueObject = {
                    xPos: xPosition,
                    yPos: yPosition,
                    prmNo: "0",
                    indexNo: "0"       
                }
                if(value === undefined || value === null) {
                    return generateMTXString(direction, this, valueObject);
                }
                if(direction == "set") {
                    valueObject.value = value;
                    return generateMTXString(direction, this, valueObject);
                }
                else {
                    return generateMTXString(direction, this, valueObject);
                }
                return "error";
            },
            responseValid: function(message, direction) {
                message = "" + message;
                if(message.slice(0, 2) !== "OK"){return false;}
                if(message.slice(3, 6) !== direction){return false;}
                if(message.slice(7, 15) !== "MTX:mem_"){return false;}
                return true;
            },
            getResponse: function(message) {
                message = "" + message;
                if(message.slice(15, 18) !== "512"){return;}
                if(message.slice(19, 20) !== "1"){return;}
                if(message.slice(21, 22) !== "4"){return;}
                if(message.slice(23, 24) !== "0"){return;}
                if(message.slice(25, 26) !== "0"){return;}
                if(message.slice(27, 28) !== "0"){return;}
                if(message.slice(29, 30) !== "0"){return;}
                if(message.slice(31, 32) !== "0"){return;}
                if(message.slice(33, 34) !== "0"){return;}
                return message.slice(message.indexOf('"') + 1, message.length - 2);
            },
            isThis: function(message) {
                return false;
            }
        },
        "mute": {
            requirexPosition: true,
            requireyPosition: false,
            requireValue: true,
            memNo: "512",
            uniqueID: "1",
            elmNo: "4",
            generateString: function(direction, xPosition, yPosition, value) {
                if(xPosition === undefined || xPosition === null){xPosition = "0";}
                if(yPosition === undefined || yPosition === null){yPosition = "0";}           
                var valueObject = {
                    xPos: xPosition,
                    yPos: yPosition,
                    prmNo: "2",
                    indexNo: "0"       
                }
                if(value === undefined || value === null) {
                    return generateMTXString(direction, this, valueObject);
                }
                if(direction == "set") {
                    if(value == "on") {
                        valueObject.value = "1";
                        return generateMTXString(direction, this, valueObject);
                    }
                    else if(value == "off") {
                        valueObject.value = "0";
                        return generateMTXString(direction, this, valueObject);
                    }
                }
                else {
                    return generateMTXString(direction, this, valueObject);
                }
                return "error";
            },
            responseValid: function(message, direction) {
                message = "" + message;
                if(message.slice(0, 2) !== "OK"){return false;}
                if(message.slice(3, 6) !== direction){return false;}
                if(message.slice(7, 15) !== "MTX:mem_"){return false;}
                return true;
            },
            getResponse: function(message) {
                message = "" + message;
                if(message.slice(15, 18) !== "512"){return;}
                if(message.slice(19, 20) !== "1"){return;}
                if(message.slice(21, 22) !== "4"){return;}
                if(message.slice(23, 24) !== "0"){return;}
                if(message.slice(25, 26) !== "0"){return;}
                if(message.slice(27, 28) !== "2"){return;}
                if(message.slice(29, 30) !== "0"){return;}
                if(message.slice(31, 32) !== "0"){return;}
                if(message.slice(33, 34) !== "0"){return;}
                return message.slice(message.indexOf('"') + 1, message.length - 2);
            },
            isThis: function(message) {
                var offset = message.indexOf(" ");
                if(message.slice(7 + offset, 15 + offset) !== "MTX:mem_"){return false;}
                if(message.slice(15 + offset, 18 + offset) !== "512"){return;}
                if(message.slice(19 + offset, 20 + offset) !== "1"){return false;}
                if(message.slice(21 + offset, 22 + offset) !== "4"){return false;}
                if(message.slice(23 + offset, 24 + offset) !== "0"){return false;}
                if(message.slice(25 + offset, 26 + offset) !== "0"){return false;}
                if(message.slice(27 + offset, 28 + offset) !== "2"){return false;}
                if(message.slice(29 + offset, 30 + offset) !== "0"){return false;}
                if(message.slice(31 + offset, 32 + offset) !== "0"){return false;}
                if(message.slice(33 + offset, 34 + offset) !== "0"){return false;}
                return true;
            }
        }
    },
    "raw": {
        "string": {
            generateString: function(unused1, unused2, unused3, rawString) {
                return rawString;
            },
            responseValid: function(message) {
                return true;
            },
            getResponse: function(message) {
                return message;
            },
            isThis: function(message) {
                return true;
            }
        }
    }
}

module.exports = {
    command: command,
    generateBuffer: function generateBuffer(command, direction, xPos, yPos, value) {
        return Buffer.concat([new Buffer(command.generateString(direction, xPos, yPos, value)), Buffer.from([0x0A])]);
    },
    findCommand: function(cmdString) {
        for(var key in command) {
            if(key == cmdString.split(":")[0]) {
                for(var key2 in command[key]){
                    if(key2 == cmdString.split(":")[1]) {
                        return command[key][key2];
                    }
                }
            }
        }
    },
    reformatIncomingMessage: function(message) {
        return "OK " + message.slice(7, message.length);
    },
    findCommandFromMessage: function(message) {
        for(var key in command) {
            for(var key2 in command[key]) {
                if(command[key][key2].isThis(message) == true){return command[key][key2];}
            }
        }
    }
}

function generateMTXString(direction, command, value) {
    if(value.value === undefined || value.value === null) {value.value = "";}
    return direction + " MTX:mem_"+command.memNo+"/"+command.uniqueID+"/"+command.elmNo+"/"+value.xPos+"/"+value.yPos+"/"+value.prmNo+"/"+value.indexNo+" 0 0 "+value.value;
}