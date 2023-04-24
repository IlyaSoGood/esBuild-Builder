import ESBuild from 'esbuild';
import path from 'path';
import config from './esbuild-config';

import express from 'express';

const PORT = Number(process.env.PORT) || 3000;

//ESBuild 0.14.48 version ЗАПУСК Serve
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

//--->ESBuild 0.17.17 version ЗАПУСК Serve
// (async () => {
//     let ctx = await ESBuild.context({
//         ...config
//     })
    
//     let { host, port } = await ctx.serve({
//         servedir: config.outdir,
//         port: PORT
//     })
//     // }).then(console.log('server started on  http://localhost:' + PORT)) переписать вывод сообщения в консоль
// })()
//--->

//Запуск своего кастомного сервера потому что автор не смог найти нативную работу комбинации WATCH и SERVE
const app = express();

app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

app.listen(PORT, () => console.log('server started on  http://localhost:' + PORT));

//--->ESBuild 0.17.17 version ЗАПУСК СБОРКИ И WATCH
(async () => {
    //Первоначальная сборка
    let result = await ESBuild.build(config).then((result) => {
        // console.log(result)
        return result
    }).catch(err => {
        console.log(err);
    })
    //Запуск watch'ера
    let ctx = await ESBuild.context(config);

    await ctx.watch();
})()
//--->