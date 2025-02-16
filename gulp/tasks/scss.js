import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemap from 'gulp-sourcemaps';
import csso from 'gulp-csso';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({
                grid: true,
                overrideBrowserlist: ['last 5 versions'],
                cascade: true,
            })
        ]))
        .pipe(app.isBuild ? csso() : app.gulp.dest(app.path.build.css))
        .pipe(app.isBuild ? app.gulp.dest(app.path.build.css) : sourcemap.write("."))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
