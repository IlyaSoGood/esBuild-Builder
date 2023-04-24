const ESBuild = require('esbuild');
const path = require('path');
const config = require('./esbuild-config.js');

const PORT = process.env.PORT || 3000;

//ESBuild 0.14.48 version
// ESBuild.serve({
//     servedir: config.outdir,
//     port: PORT
// }, {
//     ...config
// }).then(() => {
//     console.log('server started on  http://localhost:' + PORT)
// }).catch(err => {
//     console.log(err)
// })

//ESBuild 0.17.17 version
(async () => {
    let ctx = await ESBuild.context({
        ...config
    })
    
    let { host, port } = await ctx.serve({
        servedir: config.outdir,
        port: PORT
    }).then(console.log('server started on  http://localhost:' + PORT))
})()