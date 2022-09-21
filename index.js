const core = require('@actions/core')
const childProcess = require('child_process')

try {
  const command = ['take-snapshot']

  command.push('--project', core.getInput('project'))
  command.push('--token', core.getInput('token'))

  if (core.getInput('hash')) {
    command.push('--hash', core.getInput('hash'))
  }
  if (core.getInput('hash')) {
    command.push('--hash', core.getInput('hash'))
  }
  if (core.getInput('env')) {
    for (const env of parseArrayInput(core.getInput('env'))) {
      command.push('--env', env)
    }
  }
  if (core.getInput('profile')) {
    for (const profile of parseArrayInput(core.getInput('profile'))) {
      command.push('--profile', profile)
    }
  }
  if (core.getInput('title')) {
    command.push('--title', core.getInput('title'))
  }
  if (core.getInput('pages')) {
    for (const page of parseArrayInput(core.getInput('pages'))) {
      command.push(page)
    }
  }
  childProcess.spawnSync('./node_modules/.bin/perfsee', command, {
    shell: false,
    stdio: ['inherit', 'inherit', 'inherit'],
    env: { ...process.env },
  })
} catch (error) {
  core.setFailed(error.message)
}

function parseArrayInput(input) {
  return input
    .split('\n')
    .map((input) => input.trim())
    .filter((i) => !!i)
}
