import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        mocks: `${buildFolder}/mocks/`
    },
    src: {
        js: `${srcFolder}/ts/*.ts`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        svgicons: `${srcFolder}/icons/*.svg`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        mocks: `${srcFolder}/mocks/**/*.*`
    },
    watch: {
        js: `${srcFolder}/ts/**/*.ts`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        svgicons: `${srcFolder}/icons/*.svg`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        mocks: `${srcFolder}/mocks/**/*.*`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder
}