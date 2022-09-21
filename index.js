const core = require('@actions/core')
const childProcess = require('child_process')
const path = require('path')

try {
  const args = ['take-snapshot']

  args.push('--project', core.getInput('project'))
  args.push('--token', core.getInput('token'))

  if (core.getInput('hash')) {
    args.push('--hash', core.getInput('hash'))
  }
  if (core.getInput('hash')) {
    args.push('--hash', core.getInput('hash'))
  }
  if (core.getInput('env')) {
    for (const env of parseArrayInput(core.getInput('env'))) {
      args.push('--env', env)
    }
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
  const command = path.join(__dirname, './node_modules/.bin/perfsee')
  console.log(`RUN ${command} ${args.join(' ')}`)
  childProcess.spawnSync(command, args, {
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
