const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');


function compileStyle() {
    return src('./src/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(prefix())
    .pipe(dest('./src/style/'))
    .pipe(browserSync.stream())
}

function imgMin() {
    return src('./src/assets/*')
    .pipe(imagemin({
        optimizationLevel: 5,
        interlaced: true,
        progressive: true
    }))
    .pipe(dest('./src/assets'))
}

/*launch the project with the gulp watch command auto reload html, js, styles files with browser-sync*/

function watchFiles() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    })

    watch('./src/style/**/*.scss', compileStyle);
    watch('./*.html').on('change', browserSync.reload);
    watch('./src/js/**/*.js').on('change', browserSync.reload);
}


exports.style = compileStyle;
exports.img = imgMin;
exports.watch = watchFiles;