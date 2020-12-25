const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');
const svgstore = require('svgstore');
const fs = require('fs');
const path = require('path');
const del = require('del');

const dirIconsSrc = 'icons/src/';
const dirIconDist = 'icons/dist';

const dirSpriteSrc = 'icons/dist/svg/';
const dirSpriteDist = 'public';

let sprites = svgstore();

(async () => {
    try {
        // Prepare dist dir
        if (fs.existsSync(dirIconDist)){
            await del(dirIconDist);
        }
        fs.mkdirSync(dirIconDist);

        // Prepare icons
        await imagemin([`${dirIconsSrc}**/*.svg`], {
            destination: dirSpriteSrc,
            plugins: [
                imageminSvgo({
                    plugins: [
                        { cleanupIDs: { remove: true } },
                        { cleanupNumericValues: { floatPrecision: 2 } },
                        { removeStyleElement: true },
                        { removeTitle: false },
                        { removeDimensions: true },
                        { convertColors: {
                            currentColor: true
                        }}
                    ],
                    multipass: true
                })
            ]
        }).then(function (data) {
            console.log('SVG-Icons were successfully optimized');
        }).catch(function (error) {
            console.error(error);
        });

        // Create icon sprite
        const files = await fs.promises.readdir(dirSpriteSrc);

        for (const file of files) {
            const fromPath = path.join(dirSpriteSrc, file);
            const id = file.replace('.svg', '');
            const stat = await fs.promises.stat(fromPath);

            if (stat.isFile() && file !== '.DS_Store') {
                console.log('add ' + fromPath);
                sprites.add(
                    id, 
                    fs.readFileSync(fromPath, 'utf8'), 
                    { 
                        copyAttrs: [
                            'stroke', 
                            'fill', 
                            'stroke-width',
                            'stroke-linecap',
                            'stroke-linejoin'
                        ], 
                        symbolAttrs: { 
                            'vector-effect': 'non-scaling-stroke',
                            'stroke-width': '1'
                        }
                    }
                );
            }
        }

        fs.writeFileSync(path.join(dirSpriteDist, './iconsprite.svg'), sprites);
        console.log(`SVG sprite successfully generated at ${dirSpriteDist}/iconsprite.svg`);

    }
    catch( e ) {
        console.error('Whoops! Something went wrong...', e);
    }
})();
