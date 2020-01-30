var gulp          = require('gulp'),
    sass          = require('gulp-sass')
    cleanCSS      = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename'),
    inject        = require('gulp-inject'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    plumber       = require('gulp-plumber'),
    babel         = require('gulp-babel'),
    browserify    = require('gulp-browserify'),
    clean         = require('gulp-clean'),
    sourcemaps    = require('gulp-sourcemaps'),
    htmlmin       = require('gulp-html-minifier'),
    browserSync   = require('browser-sync');

var src           = "./src/",
    dist          = "./dist/";


gulp.task('html',function(){
    gulp.src(dist + '*.html',{force: true})
        .pipe(clean());
    gulp.src(src + '*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

gulp.task('css',function(){
    gulp.src(src + 'assets/css/*.css')
        .pipe(gulp.dest(dist + '/assets/css/dep/'))
});

gulp.task('fonts',function(){
    gulp.src(src + 'assets/fonts/*.*')
        .pipe(gulp.dest(dist + '/assets/css/fonts/'))
});

gulp.task('images',function(){
    gulp.src(src + 'assets/images/*.*')
        .pipe(gulp.dest(dist + '/images/'))
});

gulp.task('sass',function(){
    gulp.src(src + 'assets/sass/*.sass')
        .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(rename({basename: 'style'}))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + '/assets/css/'))
        .pipe(browserSync.stream()); 
});

gulp.task('js',function(){
    gulp.src(src + 'assets/js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']}))
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production }))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/assets/js/'))
        .pipe(browserSync.stream());
});

gulp.task('default',function(){
    browserSync.init({
        server: './dist'
    })
    gulp
    gulp.watch([src + '*.html'],['html']);
    gulp.watch([src + 'assets/sass/*.sass'],['sass']);
    gulp.watch([src + 'assets/css/*.css'],['css']);
    gulp.watch([src + 'assets/js/*.js'],['js']);
});
