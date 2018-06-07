const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const kopy = require('kopy')
const chalk = require('chalk')
const install = require('install-packages')
const limax = require('limax')
const createPage = require('./createPage')

class PecoUp {
  async create({
    template,
    outDir
  }) {
    const folderName = path.basename(outDir)
    const stream = await kopy(template, outDir, {
      move: {
        _gitignore: '.gitignore',
        '_package.json': 'package.json'
      }
    })

    for (const file of stream.fileList) {
      const filepath = path.join(outDir, file)
      console.log(`Generated ${chalk.cyan(path.relative(process.cwd(), filepath))}`)
    }

    await install({
      cwd: outDir
    })

    const pm = await install.determinePackageManager(outDir)

    console.log(chalk.green(`Done, it's generated into ${outDir}!`))
    console.log(`Now you can ${chalk.cyan(`cd ${folderName}`)} and run ${chalk.cyan(`${pm} run dev`)} to start dev server.`)
  }

  async new({
    type,
    title
  }) {
    const page = createPage({
      type,
      title
    })

    const filename = limax(title, { tone: false }) + '.md'
    const filepath = path.join(process.cwd(), type === 'post' ? 'source/_posts' : 'source', filename)
    await promisify(fs.writeFile)(filepath, page, 'utf8')
    console.log(`Generated ${chalk.cyan(path.relative(process.cwd(), filepath))}`)
  }
}

module.exports = opts => new PecoUp(opts)
