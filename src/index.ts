import * as core from '@actions/core';

async function run() {
  try {
    const logsPath = core.getInput('logs-path');
    console.log('Not implemented...');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();