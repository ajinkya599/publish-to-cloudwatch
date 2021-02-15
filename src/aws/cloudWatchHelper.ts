import * as core from '@actions/core';
import { CloudWatchLogs } from 'aws-sdk';

export function publishLogEvent(logGroup: string, logStream: string, eventMessage: string) {
  const accessKeyId = core.getInput('access-key-id', { required: true });
  const secretAccessKey = core.getInput('secret-access-key', { required: true });
  const region = core.getInput('region', { required: true });
  let cloudwatchlogs = new CloudWatchLogs({ region: region, accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });

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
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
  });

  console.log('Posted event to cloudwatch!');
}

function getTimestamp(): number {
  // Cloudwatch API expects event timestamp to be the no. of milliseconds elapsed since  'Jan 1, 1970 00:00:00 UTC'
  return new Date().valueOf();
}