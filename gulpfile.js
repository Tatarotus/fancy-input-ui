const {src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

function css() {
  return src('sass/*.scss')
    .pipe(sass())
    .pipe(dest('./build/css'))
    .pipe(browserSync.stream());
}

function minify() {
  return src('sass/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('./build/css/'));
}

function compress() {
  return src('./javascript/*.js')
    .pipe(uglify())
    .pipe(dest('./build/javascript'));
}

function serve() {
  browserSync.init({
    server: './build',
  });

  watch('./sass/*.scss', css);
  watch('./build/*.html').on('change', browserSync.reload);
}

exports.css = css;
exports.minify = minify;
exports.compress = compress;
exports.default = parallel(css, serve);
