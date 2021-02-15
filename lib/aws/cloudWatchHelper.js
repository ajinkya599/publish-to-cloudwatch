"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishLogEvent = void 0;
const core = __importStar(require("@actions/core"));
const aws_sdk_1 = require("aws-sdk");
function publishLogEvent(logGroup, logStream, eventMessage) {
    const accessKeyId = core.getInput('access-key-id', { required: true });
    const secretAccessKey = core.getInput('secret-access-key', { required: true });
    const region = core.getInput('region', { required: true });
    let cloudwatchlogs = new aws_sdk_1.CloudWatchLogs({ region: region, accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
    let eventParams = {
        logEvents: [
            {
                message: eventMessage,
                timestamp: getTimestamp()
            }
        ],
        logGroupName: logGroup,
        logStreamName: logStream
    };
    console.log(`Publishing the event to cloudwatch. Log group: ${logGroup}, Log stream: ${logStream}\nEvent params: ${JSON.stringify(eventParams)}`);
    cloudwatchlogs.putLogEvents(eventParams, function (err, data) {
        if (err)
            console.log(err, err.stack); // an error occurred
        else
            console.log(data); // successful response
    });
    console.log('Posted event to cloudwatch!');
}
exports.publishLogEvent = publishLogEvent;
function getTimestamp() {
    // Cloudwatch API expects event timestamp to be the no. of milliseconds elapsed since  'Jan 1, 1970 00:00:00 UTC'
    return new Date().valueOf();
}
