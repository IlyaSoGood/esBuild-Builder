import { Plugin } from "esbuild";

//Данный модуль доступен только в NODE JS 18
import {rm} from 'fs/promises';

//Node js 12
// import fs from 'fs';

export const CleanPlugin: Plugin = {
    name: 'CleanPlugin',
    setup(build) {
        build.onStart(async () => {
            try {
                const outdir = build.initialOptions.outdir;
                console.log(outdir);
                if(outdir) {
                    //АККУРАТНО !!!!
                    //Node js 18
                    await rm(outdir, {recursive: true})
                    
                    //Node js 12
                    // await fs.promises.rmdir(outdir, {recursive: true});
                    console.log('папка очистилась')
                }
            } catch (e) {
                console.log('не удалось очистить папку')
            }
        })
    },
}