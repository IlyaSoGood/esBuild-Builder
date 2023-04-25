import { Plugin } from "esbuild";
import sendMessage from '../esbuild-dev';

export const HotReload: Plugin = {
    name: 'HotReload',
    setup(build) {
        build.onEnd(async () => {
            try {
                sendMessage();
                console.log('горячая перезагрузка')
            } catch (e) {
                console.log('горячая перезагрузка НЕ удалась')
            }
        })
    },
}