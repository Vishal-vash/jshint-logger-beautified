"use strict";

var fs = require("fs");
var createHTML = require("create-html");
var today = new Date();
var fileName = "L@W_JS_" + today.getDate() + "_" + today.getMonth() + "_" + today.getFullYear() + "-" + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + ".log.html";
var dir = './logs';

module.exports = {
    reporter: function (results) {
        var tableRow = "",
            error_count = 0,
            warning_count = 0,
            info_count = 0,
            unknown_count = 0;

        var tableHead = `<thead>
                            <tr>
                                <th><strong>Type</strong></th>
                                <th><strong>File Name With Path</strong></th>
                                <th><strong>Line and Character</strong></th>
                                <th><strong>Description</strong></th>
                            </tr>
                        </thead>`;

        if (results.length === 0) {
            return console.log("No errors found.");
        }

        // output.push("\r\n");
        // output.push("-----*****************************************************************************----- \r\n");
        // output.push(results.length + " - Total Results Found on " + new Date() + "\r\n");
        // output.push("          Scroll to the bottom to find full summary of logs \r\n");
        // output.push("-----*****************************************************************************----- \r\n");
        // output.push("\r\n\r\n");

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

            tableRow += `<tr class=` + code_text.toLowerCase() + `>
                            <td>` + code_text + `</td>
                            <td>` + result.file + `</td>
                            <td>` + error.line + `:` + error.character + `</td>
                            <td>` + error.reason + `</td>
                        </tr>`;
        });

        var summary = `<h1>Full Summary Report</h1>
                        <table class="summaryTable">
                            <tr>
                                <td class="unknown">
                                    <p>Total Count<p>
                                    <p>`+ results.length + `</p>
                                </td>
                                <td class="error">
                                    <p>Errors Count<p>
                                    <p>`+ error_count + `</p>
                                </td>
                                <td class="warning">
                                    <p>Warning Count<p>
                                    <p>`+ warning_count + `</p>
                                </td>
                                <td class="info">
                                    <p>Info Count<p>
                                    <p>`+ info_count + `</p>
                                </td>
                            </tr>
                        </table>
                        <hr /> 
                        <h1>Deatiled Summary Report</h1>`;

        var html = createHTML({
            title: 'JS_Logger',
            // script: 'example.js',
            // scriptAsync: true,
            css: __dirname + '/style.css',
            lang: 'en',
            // dir: 'rtl',
            head: '<meta name="description" content="example">',
            body: '<div class="container"><div>' + summary + '</div><table>' + tableHead + '<tbody>' + tableRow + '</tbody></table>',
            // favicon: 'favicon.png'
        })

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(dir + "/" + fileName, html);
        console.log(results.length + " errors found. Output logged to " + fileName);
    }
};