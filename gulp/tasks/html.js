import fileinclude from 'gulp-file-include';
import versionNumber from 'gulp-version-number';
import htmlBeautify from 'gulp-html-beautify';
import htmlmin from 'gulp-htmlmin';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(fileinclude())
        .pipe(
            versionNumber({
                value: '%DT%',
                append: {
                    key: '_v',
                    cover: 0,
                    to: ['css', 'js'],
                },
                output: {
                    file: 'gulp/version.json',
                },
            })
        )
        .pipe(app.isBuild ? htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        }) : htmlBeautify({
            indentSize: 2
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}
