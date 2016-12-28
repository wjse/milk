var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    connect = require('gulp-connect');

gulp.task('default',sequence(['bower','sass','server','watch']));

gulp.task('bower',function(){
    gulp.src('../bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('./lib/jquery/'));
    gulp.src('../bower_components/jquery-form/jquery.form.js').pipe(gulp.dest('./lib/jquery/'));
    gulp.src('../bower_components/requirejs/require.js').pipe(gulp.dest('./lib/requirejs/'));
    gulp.src('../bower_components/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('./lib/bootstrap/'));
    gulp.src('../bower_components/bootstrap/dist/fonts/*').pipe(gulp.dest('./lib/fonts/'));
    gulp.src('../bower_components/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./lib/bootstrap/'));
    gulp.src('../common/js/*.*').pipe(gulp.dest('./script/common/'));
    gulp.src('../common/sass/*.*').pipe(gulp.dest('./sass'));
    gulp.src('../common/css/*.*').pipe(gulp.dest('./www/css'));
});

gulp.task('sass', function () {
     gulp.src('./sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./www/css'));
});

gulp.task('server',function(){
    gulp.watch(['*']);
    connect.server({
        port:3004,
        root: ['.'],
        livereload: true
    });
});

gulp.task('dist',sequence(['bower','sass','copy-dist']));
gulp.task('copy-dist',function(){
    var path = './dist/';
    gulp.src('./*.html').pipe(gulp.dest(path));
    gulp.src('./www/**/').pipe(gulp.dest(path.concat('www')));
    gulp.src('./script/**/*').pipe(gulp.dest(path.concat('script')));
    gulp.src('./lib/**/*.*').pipe(gulp.dest(path.concat('lib')));
});

gulp.task('watch',function(){
    gulp.watch('./sass/*.scss', function(){
        gulp.start('sass');
    });
});
