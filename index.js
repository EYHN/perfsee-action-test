const core = require('@actions/core')
const github = require('@actions/github')
const path = require('path')
const sdk = require('@perfsee/sdk')

try {
  const args = ['take-snapshot']

  args.push('--project', core.getInput('project'))
  args.push('--token', core.getInput('token'))

  if (core.getInput('hash')) {
    args.push('--hash', core.getInput('hash'))
  } else if (github.context.sha) {
    args.push('--hash', github.context.sha)
  }
  if (core.getInput('env')) {
    for (const env of parseArrayInput(core.getInput('env'))) {
      args.push('--env', env)
    }
  } else if (
    github.context.eventName === 'deployment_status' &&
    github.context.payload.deployment_status.state == 'success'
  ) {
    args.push('--env', github.context.payload.deployment.environment)
  }
  if (core.getInput('profile')) {
    for (const profile of parseArrayInput(core.getInput('profile'))) {
      args.push('--profile', profile)
    }
  }
  if (core.getInput('title')) {
    args.push('--title', core.getInput('title'))
  }
  if (core.getInput('pages')) {
    for (const page of parseArrayInput(core.getInput('pages'))) {
      args.push(page)
    }
  }
  console.log(`RUN ${args.join(' ')}`)
  sdk.runCli(args)
} catch (error) {
  core.setFailed(error.message)
}

function parseArrayInput(input) {
  return input
    .split('\n')
    .map((input) => input.trim())
    .filter((i) => !!i)
}
