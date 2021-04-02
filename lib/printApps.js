const appSource = '/Applications';
const fs = require('fs');
const path = require('path');
const PassThrough = require('stream').PassThrough;
const outputFileName = 'apps.txt'

const setupConsoleToFile = (filePath) => {
    const outlog = fs.createWriteStream(filePath, { flags: 'a' })
    const oso = process.stdout
    const splitter = new PassThrough()
    process.__defineGetter__("stdout", function () {
        return splitter
    })
    splitter.pipe(oso)
    splitter.pipe(outlog)
}

const getList = (appSource) => new Promise(
    (res, rej) => fs.readdir(appSource, (err, files) => {
        if (err) rej(err);
        res(files
            .filter(file => path.extname(file) == ".app")
            .map(file => file.substring(0, file.length - 4))
        )
    }))

setupConsoleToFile(outputFileName)

const printApps = () => getList(appSource).then(apps => {
    console.table(apps)
    process.exit(0)
})

export default printApps



