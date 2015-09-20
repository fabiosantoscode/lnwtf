#!/usr/bin/env node
'use strict'

var assert = require('assert')
var path = require('path')
var fs = require('fs')
var bossy = require('bossy')
var prompt = require('prompt-sync').prompt;

var args = bossy.parse({
  f: { description: 'The start of the link', alias: 'from', require: true },
  t: { description: 'The destination of the link', alias: 'to', require: true },
  s: { description: 'Create a symbolic link', alias: ['symbolic', 'symlink'], type: 'boolean' },
  h: { description: 'Display this message', alias: 'help', type: 'boolean' }
})

var printUsage = args instanceof Error || args.help
if (printUsage) {
  if (!args.help) { process.stderr.write(args.toString() + '\n') }
  process.exit(args.help ? 0 : 1)
  return
}

var paths = (function(args) {
  var from = path.resolve(args.from)
  var to = path.isAbsolute(args.to) ?
    path.resolve(args.to) :
    path.relative(from, path.dirname(args.to))

  return {
    from: from,
    to: to
  }
}(args))

var doPrompt = true;  // TODO

if (doPrompt) {
  var response;
  while (true) {
    process.stdout.write('Create a ' + (args.symbolic ? 'symlink' : 'hard link') + ': ' + paths.from + ' -> ' + paths.to + ' [Y/n]? ')
    response = prompt()
    response = response && response.toLowerCase()
    if (response === null || response === 'n') { process.exit(0) }
    if (response === '' || response === 'y') { break; }
  }
}

// Wtf, in the fs module the arguments for this are inconsistent!
if (args.symbolic) {
  fs.symlinkSync(paths.to, paths.from)
} else {
  fs.linkSync(paths.from, paths.to)
}
