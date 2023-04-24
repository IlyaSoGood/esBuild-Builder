import ESBuild from 'esbuild';
import path from 'path';
import config from './esbuild-config';
import { EventEmitter } from 'events';

import express from 'express';

const PORT = Number(process.env.PORT) || 3000;

const emitter = new EventEmitter;

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

app.get('/subscribe', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    emitter.on('refresh', () => {
        //ОЧЕНЬ ВАЖНО: ДАННЫЙ ЧАНК ВСЕГДА НАЧИНАЕТСЯ С "data: "
        res.write('data: some message')
    })
})

function sendMessage() {
    emitter.emit('refhresh')
}

app.listen(PORT, () => console.log('server started on  http://localhost:' + PORT));

//--->ESBuild 0.17.17 version ЗАПУСК СБОРКИ И WATCH
(async () => {
    //Первоначальная сборка
    let result = await ESBuild.build(config)
    .then((result) => {
        console.log('build...')
    }).catch(err => {
        console.log(err);
    })
    //Запуск watch'ера
    let ctx = await ESBuild.context(config);

    await ctx.watch().then(() => {
        console.log('watched')
    });
    // console.log('watched')
})()
//--->