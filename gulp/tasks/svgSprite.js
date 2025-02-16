import svgo from 'gulp-svgo';
import {stacksvg} from 'gulp-stacksvg';
import rename from 'gulp-rename';

export const genSvgSprite = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SVG',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(svgo())
        .pipe(stacksvg({ output: `sprite` }))
        .pipe(rename('icons.svg'))
        .pipe(app.gulp.dest(`${app.path.build.images}`))
        .pipe(app.plugins.browsersync.stream());
}