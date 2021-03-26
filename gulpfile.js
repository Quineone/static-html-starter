const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  clean = require('gulp-clean'),
  merge = require('merge-stream'),
  newer = require('gulp-newer'),
  rename = require("gulp-rename"),
  // html
  fileinclude = require('gulp-file-include'),
  htmlbeautify = require('gulp-html-beautify'),
  // css
  postcss = require('gulp-postcss'),
  atImport = require("postcss-import"),
  tailwindcss = require('tailwindcss'),
  autoprefixer = require('autoprefixer'),
  purgecss = require('gulp-purgecss'),
  cssnano = require('gulp-cssnano'),
  // js
  jsmin = require('gulp-jsmin'),
  // image
  imagemin = require('gulp-imagemin'),
  // icon
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  path = require('path');

// error handler
function swallowError(error) {
  console.log(error.toString())
  this.emit('end')
}

function tailwindExtractor(content) {
  // Extract tailwindcss classes
  // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  return content.match(/[^<>"'`\s]*[^<>"'`\s:]/g);
}

//========================================================================================================//
//                                            Html task
//========================================================================================================//

const PageSrc = 'src/pages/*.shtml',
  PageDest = 'dist/';

gulp.task('html', function() {
	return gulp.src(PageSrc)
		.pipe(fileinclude({
	    prefix: '@@',
	    basepath: '@file'
    }))
    .pipe(htmlbeautify({
      indent_size: 2,
      max_preserve_newlines: 0
    }))
    .pipe(rename({
			extname: '.html'
		}))
    .pipe(gulp.dest(PageDest));
});


//========================================================================================================//
//                                            Css task
//========================================================================================================//

const AppCssSrc = 'src/css/app.css',
  AppCssDest = 'dist/css/',
  FontCssSrc = 'src/css/fonts.css',
  FontCssDest = 'dist/css/';

gulp.task('prod:css', function () {
  const fontCss = gulp.src(FontCssSrc)
    .pipe(gulp.dest(FontCssDest));

  const appCss = gulp.src(AppCssSrc)
    .pipe(postcss([
      atImport,
      tailwindcss,
      autoprefixer
    ]).on('error', swallowError))
    .pipe(purgecss({
      content: [
        'src/**/*.shtml',
        'src/js/**/*.js'
      ],
      extractors: [{
        extractor: tailwindExtractor,
        extensions: [
          'shtml',
          'js'
        ]
      }]
    }).on('error', swallowError))
    .pipe(cssnano({
			zindex: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
    .pipe(gulp.dest(AppCssDest));

  return merge(fontCss, appCss);
});

gulp.task('dev:css', function () {
  const fontCss = gulp.src(FontCssSrc)
    .pipe(gulp.dest(FontCssDest));

  const appCss = gulp.src(AppCssSrc)
    .pipe(postcss([
      atImport,
      tailwindcss
    ]).on('error', swallowError))
		.pipe(rename({
			suffix: '.min'
		}))
    .pipe(gulp.dest(AppCssDest));

  return merge(fontCss, appCss);
});


//========================================================================================================//
//                                            JS task
//========================================================================================================//
const AppJsSrc = 'src/js/app.js',
  AppJsDest = 'dist/js/',
  VendorJsSrc = 'src/js/vendors/*.js',
  VendorJsDest = 'dist/js/vendors/';

gulp.task('js', function () {
  const vendorJs = gulp.src(VendorJsSrc)
    .pipe(newer(VendorJsDest))
    .pipe(gulp.dest(VendorJsDest));

	const appJs = gulp.src(AppJsSrc)
    .pipe(jsmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(AppJsDest));

  return merge(vendorJs, appJs);
});


//========================================================================================================//
//                                            Fonts task
//========================================================================================================//

const FontSrc = 'src/assets/fonts/*',
  FontDest = 'dist/assets/fonts/';

gulp.task('font', function() {
	return gulp.src(FontSrc)
		.pipe(newer(FontDest))
		.pipe(gulp.dest(FontDest));
});


//========================================================================================================//
//                                            Icons task
//========================================================================================================//

const IconSrc = 'src/assets/icons/*.svg',
	IconDest = 'dist/assets/images/';

gulp.task('icon', function () {
  return gulp.src(IconSrc)
    .pipe(svgmin(function (file) {
    	const prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [{
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
        }
    }))
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(IconDest));
});


//========================================================================================================//
//                                            Images task
//========================================================================================================//

const ImgSrc = 'src/assets/images/**/*',
  ImgDest = 'dist/assets/images/',
  UploadSrc = 'src/assets/uploads/**/*',
  UploadDest = 'dist/assets/uploads/';

gulp.task('image', function() {
	const images = gulp.src(ImgSrc)
		.pipe(newer(ImgDest))
		.pipe(imagemin())
		.pipe(gulp.dest(ImgDest));

  const uploads = gulp.src(UploadSrc)
		.pipe(newer(UploadDest))
		.pipe(imagemin())
		.pipe(gulp.dest(UploadDest));

	return merge(images, uploads);
});


//========================================================================================================//
//                                            Static task
//========================================================================================================//
const StaticFileSrc = 'src/*.*'
  StaticFileDest = 'dist/';

gulp.task('static', function() {
	return gulp.src(StaticFileSrc)
		.pipe(newer(StaticFileDest))
		.pipe(gulp.dest(StaticFileDest));
});


//========================================================================================================//
//                                            Clean task
//========================================================================================================//

const CleanFolder = 'dist';

gulp.task('clean', function() {
  return gulp.src(CleanFolder, {
    read: false,
    allowEmpty: true
  })
  	.pipe(clean());
});


//========================================================================================================//
//                                            Build task
//========================================================================================================//

gulp.task('prod:build', gulp.series('clean', 'html', 'prod:css', 'js', 'font', 'icon', 'image', 'static'));

gulp.task('dev:build', gulp.series('html', 'dev:css', 'js', 'font', 'icon', 'image', 'static'));


//========================================================================================================//
//                                            Server task
//========================================================================================================//

const WatchHtmlFolders = 'src/**/*.shtml',
  WatchCssFolders = ['src/css/*.css', 'tailwind.config.js'],
  WatchJsFolders = 'src/js/**/*.js',
  WatchFontFolders = 'src/assets/fonts/*',
  WatchIconFolders = 'src/assets/icons/*',
  WatchImageFolders = ['src/assets/images/**/*', 'src/assets/uploads/**/*'],
  WatchStaticFiles = 'src/*.*',
  ServerFiles = 'dist/**/*.*';

gulp.task('server', function() {

	browserSync.init({
    server: 'dist/',
    notify: false
  });

  // watch html
	gulp.watch(WatchHtmlFolders, gulp.parallel('html'));

	// watch css
	gulp.watch(WatchCssFolders, gulp.parallel('dev:css'));

	// watch js
	gulp.watch(WatchJsFolders, gulp.parallel('js'));

	// watch font
	gulp.watch(WatchFontFolders, gulp.parallel('font'));

	// watch icon
	gulp.watch(WatchIconFolders, gulp.parallel('icon'));

	// watch image
  gulp.watch(WatchImageFolders, gulp.parallel('image'));

  // watch static
	gulp.watch(WatchStaticFiles, gulp.parallel('static'));

	// watch dist folder
	gulp.watch(ServerFiles).on('change', browserSync.reload);
});


//========================================================================================================//
//                                            Default task
//========================================================================================================//

gulp.task('default', gulp.series('clean', 'dev:build', 'server'));
