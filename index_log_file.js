"use strict";

var fs = require("fs");
var today = new Date();
var fileName = "L@W_JS_" + today.getDate() + "_" + today.getMonth() + "_" + today.getFullYear() + "-" + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + ".log";
var dir = './logs';

module.exports = {
    reporter: function (results) {

        var output = [],
            error_count = 0,
            warning_count = 0,
            info_count = 0,
            unknown_count = 0;
        if (results.length === 0) {
            return console.log("No errors found.");
        }

        output.push("\r\n");
        output.push("-----*****************************************************************************----- \r\n");
        output.push(results.length + " - Total Results Found on " + new Date() + "\r\n");
        output.push("          Scroll to the bottom to find full summary of logs \r\n");
        output.push("-----*****************************************************************************----- \r\n");
        output.push("\r\n\r\n");

        results.forEach(function (result, i) {
            var error = result.error,
                code_text = "";

            switch ((error.code).charAt(0)) {
                case "W":
                    code_text = "Warning";
                    warning_count += 1;
                    break;
                case "I":
                    code_text = "Info";
                    info_count += 1;
                    break;
                case "E":
                    code_text = "Error";
                    error_count += 1;
                    break;
                default:
                    code_text = "Unknown Code";
                    unknown_count += 1;
                    break;
            };
            output.push(code_text + " found in the file " + result.file);
            output.push(" [" + error.line + ":" + error.character + "] - (" + error.code + ") - " + error.reason + "\r\n");
        });

        output.push("\r\n\r\n\r\n");
        output.push("-----*************************************----- \r\n");
        output.push("Full Summary " + "\r\n");
        output.push("Total Errors Found - " + error_count + "\r\n");
        output.push("Total Warnings Found - " + warning_count + "\r\n");
        output.push("Total Info Found - " + info_count + "\r\n");
        output.push("Total Unknown Found - " + unknown_count + "\r\n");
        output.push("-----*************************************----= \r\n");

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(dir + "/" + fileName, output.join("\n"));
        console.log(results.length + " errors found. Output logged to " + fileName);
    }
};