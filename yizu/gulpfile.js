var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    del = require('del');

gulp.task('default',sequence(['bower','sass','server','watch']));

gulp.task('bower',function(){
    gulp.src('../bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('./lib/jquery/'));
    gulp.src('../bower_components/requirejs/require.js').pipe(gulp.dest('./lib/requirejs/'));
    gulp.src('../bower_components/slick-carousel/slick/slick.min.js').pipe(gulp.dest('./lib/slick/'));
    gulp.src('../common/js/*.*').pipe(gulp.dest('./script/common/'));
    gulp.src('../common/sass/*.*').pipe(gulp.dest('./sass'));
});

gulp.task('sass', function () {
     gulp.src('./sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./www/css'));
});

gulp.task('server',function(){
    connect.server({
        port:3000,
        root: ['.'],
        livereload: true
    });
});

gulp.task('watch',function(){
    gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('dist',sequence(['del','bower','sass','css','js'],'copy-dist'));
gulp.task('copy-dist',function(){
    var path = './dist/';
    gulp.src('./*.html').pipe(gulp.dest(path));
    gulp.src('./www/image/**').pipe(gulp.dest(path.concat('www/image')));
    gulp.src('./lib/**/*').pipe(gulp.dest(path.concat('lib')));
});

gulp.task('del',function(){
    del('./dist');
});


gulp.task('css', function() {
    return gulp.src('./www/css/*.css')
        .pipe(minifyCss({
            advanced:false
        }))
        .pipe(gulp.dest('./dist/www/css'));
});

gulp.task('js', function() {
    return gulp.src('./script/**/**/*.js')
        .pipe(gulp.dest('./dist/script'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/script'));
});
