export const copy = () => {
    return app.gulp.src(app.path.src.mocks)
        .pipe(app.gulp.dest(app.path.build.mocks))
        .pipe(app.plugins.browsersync.stream());
}