import {Plugin} from 'esbuild';
import {rm, writeFile} from 'fs/promises';
import path from 'path';

interface HTMLPluginOptions {
    template?: string;
    title?: string;
    jsPath?: string[];
    cssPath?: string[]
}
const renderHTML = (options: HTMLPluginOptions) : string => {
    return options.template ||
    `
        <!DOCTYPE html>
        <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${options.title}</title>
                ${options?.cssPath?.map(path => `<link rel="stylesheet" href="${path}"></link>`).join(' ')}
            </head>
            <body>
                <div id="root"></div>
                ${options?.jsPath?.map(path => `<script src="${path}"></script>`).join(' ')}
            </body>
        </html>
    `
}
const preparePaths = (outputs: string[]) => {
    return outputs.reduce<Array<string[]>>((acc, path) => {
        const [js, css] = acc;
        const splittedFileName = path.split('/').pop();
        if(splittedFileName?.endsWith('.js')) {
            js.push(splittedFileName)
        } else if(splittedFileName?.endsWith('.css')) {
            css.push(splittedFileName)
        }

        return acc
    }, [[], []])
}

export const HTMLPLugin = (options: HTMLPluginOptions): Plugin => {
    return {
        name: 'HTMLPlugin',
        setup(build) {
            const outDir = build.initialOptions.outdir;
            build.onStart(async() => {
                try {
                    if(outDir) {
                        await rm(outDir, {recursive: true})
                    }
                }
                catch {

                }
            })
            build.onEnd(async (result) => {
                // console.log(result.metafile);
                const outputs = result.metafile?.outputs;
                const [jsPath, cssPath] = preparePaths(Object.keys(outputs || {}));
                // console.log(jsPath);
                // console.log(cssPath);
                if(outDir) {
                    await writeFile(
                        path.resolve(outDir, 'index.html'),
                        renderHTML({ jsPath, cssPath, ...options})

                    )
                }
            })
        }
    }
}