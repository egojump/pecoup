#!/usr/bin/env node
const path = require('path')
const cli = require('cac')()

cli.command('create', {
  desc: 'Create a new website',
  examples: [
    'pecoup create my-blog'
  ]
}, input => {
  const pecoup = require('..')()

  if (!input[0]) {
    console.error('You must specify a folder name!')
    process.exit(1)
  }

  return pecoup.create({
    template: path.join(__dirname, '../templates/simple'),
    outDir: path.resolve(input[0])
  })
})

cli.command('new', {
  desc: 'Create pages or posts',
  examples: [
    'pecoup new post "Peco is so awesome"',
    'pecoup new page About'
  ]
}, input => {
  const pecoup = require('..')()

  if (input.length !== 2) {
    console.error(`Require 2 arguments but got ${input.length}`)
    process.exit(1)
  }

  if (!['post', 'page'].includes(input[0])) {
    console.error(`Type can only be "page" or "post" but got "${input[0]}"`)
    process.exit(1)
  }

  return pecoup.new({
    type: input[0],
    title: input[1]
  })
})

cli.parse()

if (!cli.matchedCommand) {
  cli.showHelp()
}
