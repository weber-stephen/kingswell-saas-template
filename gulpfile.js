var gulp            = require('gulp'),

    //for development
    browserSync     = require('browser-sync').create(),

    //for css:
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),

    //for js:
    uglify          = require('gulp-uglify'),
    mainBowerFiles  = require('gulp-main-bower-files'),
    concat          = require('gulp-concat-sourcemap'),

    //Image Minification
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),

    //For NodeJS Server:
    nodemon         = require('gulp-nodemon');

var paths = {
  client_src : 'client',
  build : 'build',
  bower_components : 'bower_components',
  vendor : 'vendor',
  tpl : 'tpl',
  server : 'server',
};

var componentPaths = {
  //Obviously you need this for the application to run
  angular : paths.bower_components+'/angular/angular.js',
  
  //This is the style for the whole application and the components
  angularAria : paths.bower_components+'/angular-aria/angular-aria.min.js',
  angularMaterial : paths.bower_components+'/angular-material/angular-material.js',
  angularMaterialCSS : paths.bower_components+'/angular-material/angular-material.css',

  //OC Lazy Load
  oclazyload : paths.bower_components+'/oclazyload/dist/ocLazyLoad.min.js',

  //Almost every plugin still needs this
  jquery : paths.bower_components+'/jquery/dist/jquery.js',
  
  //Necessary for all routing
  angularUIRouter : paths.bower_components+'/angular-ui-router/release/angular-ui-router.js',
  
  //My favorite utility
  lodash : paths.bower_components+'/lodash/lodash.min.js',
  
  //Pretty much the best date handling library out there
  moment : paths.bower_components+'/moment/moment.js',
  
  //If you aren't using cookies, then you dont need this
  angularCookies : paths.bower_components+'/angular-cookies/angular-cookies.js',
  
  //I don't use this, but you can - consider some of the alternatives out there
  angularResource : paths.bower_components+'/angular-resource/angular-resource.js',
  
  //Turns those clicks into taps - good to include
  angularTouch : paths.bower_components+'/angular-touch/angular-touch.js',
  
  //Keep everything safe - good to include
  angularSanitize : paths.bower_components+'/angular-sanitize/angular-sanitize.js',
  
  //Recommend this for a little nicer experience
  angularAnimate : paths.bower_components+'/angular-animate/angular-animate.js',
  
  //Needed for validation
  angularMessages : paths.bower_components+'/angular-messages/angular-messages.js',
  
  //You don't need this, but I include it in case you want to use mocks
  angularMocks : paths.bower_components+'/angular-mocks/angular-mocks.js',
  angularMaterialMocks : paths.bower_components+'/angular-material/angular-material-mocks.js',
  
  //This is required by google maps
  angularSimpleLogger : paths.bower_components+'/angular-simple-logger/dist/angular-simple-logger.min.js',
  
  //Google maps
  angularGoogleMaps : paths.bower_components+'/angular-google-maps/dist/angular-google-maps.min.js',
  
  //Might not need this in your application - this is for showing code samples 
  //in various pages can be removed when you are ready to remove the sample pages
  highlightJS: paths.bower_components+'/highlightjs/highlight.pack.min.js',
  highlightJSDarkCSS: paths.bower_components+'/highlightjs/styles/monokai_sublime.css',
  angularHighlightJS: paths.bower_components+'/angular-highlightjs/build/angular-highlightjs.min.js',
  angularClipboard: paths.bower_components+'/angular-clipboard/angular-clipboard.js',

  //Rickshaw charts
  d3 : paths.bower_components+'/d3/d3.min.js',
  rickshaw : paths.bower_components+'/rickshaw/rickshaw.min.js',
  rickshawCSS : paths.bower_components+'/rickshaw/rickshaw.min.css',
  angularRickshaw : paths.bower_components+'/angular-rickshaw/rickshaw.js',

  //C3 Charts
  c3 : paths.bower_components+'/c3/c3.min.js',
  angularC3 : paths.bower_components+'/c3-angular/c3-angular.min.js',

  //NVD3 Charts
  nvd3 : paths.bower_components+'/nvd3/build/nv.d3.js',
  nvd3CSS : paths.bower_components+'/nvd3/build/nv.d3.css',
  angularNvd3 : paths.bower_components+'/angular-nvd3/dist/angular-nvd3.js',

  //ChartJS
  chartJS : paths.bower_components+'/Chart.js/Chart.min.js',
  angularChartJS : paths.bower_components+'/ng-chartjs/dist/angular-chartjs.js',

  //Just a nice simple pie chart plugin
  angularEasyPieChart : paths.bower_components+'/jquery.easy-pie-chart/dist/angular.easypiechart.min.js',
  
  //For more icons
  angularFontAwesome : paths.bower_components+'/angular-fontawesome/dist/angular-fontawesome.min.js',
  
  //Angular & Material Version of Datatables
  angularMaterialDatatables : paths.bower_components+'/angular-material-data-table/dist/md-data-table.min.js',
  angularMaterialDatatablesCSS : paths.bower_components+'/angular-material-data-table/dist/md-data-table.min.css',
  
  //An alternative to datatables
  angularSmartTable : paths.bower_components+'/angular-smart-table/dist/smart-table.min.js',

  //SocketIO
  socketIO : paths.bower_components+'/socket.io-client/socket.io.js',
  angularSocketIO : paths.bower_components+'/angular-socket-io/socket.min.js',

  //CountTo
  angularCountTo : paths.bower_components+'/angular-count-to/build/angular-count-to.min.js',

  /*
  * For Login and Register Screens
  */
  materialDesignLite : paths.bower_components+'/material-design-lite/material.min.js',

  //For modern login and register screens
  vide : paths.bower_components+'/vide/dist/jquery.vide.min.js'

};

/**
 * $ gulp compile bower css files into one scss
 * description: 
 */
gulp.task('bower_css', function() {
  return gulp.src([
      './'+componentPaths.highlightJSDarkCSS,
      './'+componentPaths.angularMaterialDatatablesCSS,
      //If you plan to compile everything together I would recommend commenting these back in
      // './'+componentPaths.rickshawCSS,
      // './'+componentPaths.gridstackCSS,
      // './'+componentPaths.nvd3CSS,
    ])
    .pipe(concat('_bower_components.scss'))
    .pipe(gulp.dest('./'+paths.client_src+'/sass/'));
});

/**
 * $ gulp copy bower components
 * description: 
 */
gulp.task('bower', function() {
  return gulp.src('./bower_components/**/*')
  .pipe(gulp.dest('./'+paths.build+'/bower_components'));
});

/**
 * $ gulp compile sass for modern_login
 * description: 
 */
gulp.task('sass:basic_login', function () {
  return gulp.src([
    './'+paths.client_src+'/sass/basic_login.scss',
  ])
  .pipe(sass({ style: 'expanded', errLogToConsole: true }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(concat('basic_login.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.init())
  .pipe(minifycss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp compile sass for modern_register
 * description: 
 */
gulp.task('sass:basic_register', function () {
  return gulp.src([
    './'+paths.client_src+'/sass/basic_register.scss',
  ])
  .pipe(sass({ style: 'expanded', errLogToConsole: true }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(concat('basic_register.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.init())
  .pipe(minifycss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp compile sass for modern_login
 * description: 
 */
gulp.task('sass:modern_login', function () {
  return gulp.src([
    './'+paths.client_src+'/sass/modern_login.scss',
  ])
  .pipe(sass({ style: 'expanded', errLogToConsole: true }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(concat('modern_login.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.init())
  .pipe(minifycss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp compile sass for modern_register
 * description: 
 */
gulp.task('sass:modern_register', function () {
  return gulp.src([
    './'+paths.client_src+'/sass/modern_register.scss',
  ])
  .pipe(sass({ style: 'expanded', errLogToConsole: true }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(concat('modern_register.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.init())
  .pipe(minifycss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp compile sass for app
 * description: 
 */
gulp.task('sass:app', ['bower_css'], function () {
  return gulp.src([
    './'+paths.client_src+'/sass/app.scss'
  ])
  .pipe(sass({ style: 'expanded', errLogToConsole: true }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(concat('app.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.init())
  .pipe(minifycss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp compile sass for all resources
 * description: 
 */
gulp.task('sass',['sass:app','sass:basic_login','sass:basic_register','sass:modern_login','sass:modern_register']);

/**
 * $ gulp copy html and templates
 * description: 
 */
gulp.task('html', function() {

  gulp.src('./'+paths.client_src+'/*.html')
  .pipe(gulp.dest('./'+paths.build));

  gulp.src(['./'+paths.client_src+'/app/views/*.html'])
  .pipe(gulp.dest('./'+paths.build+'/views'));

  gulp.src(['./'+paths.client_src+'/app/partials/*.html'])
  .pipe(gulp.dest('./'+paths.build+'/partials'));

  gulp.src(['./'+paths.client_src+'/app/tpl/*.html','./'+paths.client_src+'/app/tpl/*.tpl'])
  .pipe(gulp.dest('./'+paths.build+'/tpl'));

});

/**
 * $ gulp copy data json files
 * description: 
 */
gulp.task('data', function () {
  return gulp.src('./'+paths.client_src+'/data/*.json')
  .pipe(gulp.dest('./'+paths.build+'/data'));
});

/**
 * $ gulp copy fonts
 * description: 
 */
gulp.task('fonts', function () {
  return gulp.src('./'+paths.client_src+'/fonts/*')
  .pipe(gulp.dest('./'+paths.build+'/fonts'));
});

/**
 * $ gulp copy controllers to build
 * description: 
 */
gulp.task('jscontroller-copy', function () {
  return gulp.src([
    './'+paths.client_src+'/app/controllers/*.js',
    './'+paths.client_src+'/app/controllers/**/*.js',
  ])
  .pipe(gulp.dest('./'+paths.build+'/js/controllers'));
});

/**
 * $ gulp compile js
 * description: 
 */
gulp.task('js', function () {

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    './'+paths.client_src+'/js/basic_login.js'
  ])
  .pipe(concat('basic_login.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    './'+paths.client_src+'/js/basic_register.js'
  ])
  .pipe(concat('basic_register.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    componentPaths.vide,
    './'+paths.client_src+'/js/modern_login.js'
  ])
  .pipe(concat('modern_login.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    componentPaths.vide,
    './'+paths.client_src+'/js/modern_register.js'
  ])
  .pipe(concat('modern_register.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  return gulp.src([
    componentPaths.jquery,
    componentPaths.angular,
    componentPaths.angularCookies,
    componentPaths.angularMaterial,
    componentPaths.angularTouch,
    componentPaths.angularSanitize,
    componentPaths.angularAnimate,
    componentPaths.angularAria,
    componentPaths.angularUIRouter,
    componentPaths.oclazyload,
    componentPaths.lodash,
    componentPaths.angularSimpleLogger,
    componentPaths.angularGoogleMaps,
    componentPaths.d3,

    //Font Awesome Icons
    componentPaths.angularFontAwesome,

    //Socket IO Functionality
    componentPaths.socketIO,
    componentPaths.angularSocketIO,

    //Used in most views to show examples, once you dont need the examples feel free to remove
    componentPaths.highlightJS,
    componentPaths.angularHighlightJS,
    componentPaths.angularClipboard,

    // Enable These If You Are Compiling All Plugins, Modules, Etc. Together
    // These will increase the initial file load and therefore make your app take longer to load
    // componentPaths.angularMessages,
    // componentPaths.angularSmartTable,
    // componentPaths.angularCountTo,
    // componentPaths.rickshaw,
    // componentPaths.angularRickshaw,
    // componentPaths.angularEasyPieChart,
    // componentPaths.c3,
    // componentPaths.angularC3,
    // componentPaths.nvd3,
    // componentPaths.angularNvd3,
    // componentPaths.chartJS,
    // componentPaths.angularChartJS,
    // componentPaths.moment,
    // componentPaths.angularMaterialDatatables,

    './'+paths.client_src+'/app/libs/*.js', //This is where I put libraries that down have bower files
    './'+paths.client_src+'/app/*.js',
    './'+paths.client_src+'/app/services/*.js',
    './'+paths.client_src+'/app/services/**/*.js',
    './'+paths.client_src+'/app/factories/*.js',
    './'+paths.client_src+'/app/factories/**/*.js',

    //Needed for App
    './'+paths.client_src+'/app/controllers/AppController.js',
    './'+paths.client_src+'/app/controllers/UserSidebarController.js',
    './'+paths.client_src+'/app/controllers/SearchController.js',

    // './'+paths.client_src+'/app/controllers/*.js',
    // './'+paths.client_src+'/app/controllers/**/*.js',
    './'+paths.client_src+'/app/directives/*.js',
    './'+paths.client_src+'/app/directives/**/*.js',
  ])
  .pipe(uglify({mangle:false}))
  .pipe(concat('app.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));
});

/**
 * $ gulp compress images
 * description: Compresses images from original quality
 */
gulp.task('imagemin', function () {
    return gulp.src([
      paths.client_src+'/img/*.jpg',
      paths.client_src+'/img/*.gif',
      paths.client_src+'/img/*.png',
      paths.client_src+'/img/**/*.jpg',
      paths.client_src+'/img/**/*.gif',
      paths.client_src+'/img/**/*.png'
    ])
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
});

/**
 * $ gulp copy svg files
 * description: 
 */
gulp.task('svg', function () {
  return gulp.src('./'+paths.client_src+'/img/icons/*.svg')
  .pipe(gulp.dest('./'+paths.build+'/img/icons'));
});

/**
 * $ gulp client_server
 * description: launches client server
 */
gulp.task('client_server', ['html','imagemin','svg','data','fonts','js','sass'], function() {

  browserSync.init({
      port:1899,
      server: "./build"
  });

  gulp.watch([
    './'+paths.client_src+'/sass/basic_login.scss',
  ], ['sass:basic_login']);

  gulp.watch([
    './'+paths.client_src+'/sass/basic_register.scss',
  ], ['sass:basic_register']);

  gulp.watch([
    './'+paths.client_src+'/sass/modern_login.scss',
  ], ['sass:modern_login']);

  gulp.watch([
    './'+paths.client_src+'/sass/modern_register.scss',
  ], ['sass:modern_register']);

  gulp.watch([
    './'+paths.client_src+'/sass/app.scss',
    './'+paths.client_src+'/sass/**/*.scss'
  ], ['sass:app']);

  gulp.watch([
    './'+paths.client_src+'/data/*.*'
  ], ['data']);

  gulp.watch([
    './'+paths.client_src+'/img/*.jpg',
    './'+paths.client_src+'/img/*.png',
    './'+paths.client_src+'/img/*.gif',
    './'+paths.client_src+'/img/**/*.jpg',
    './'+paths.client_src+'/img/**/*.png',
    './'+paths.client_src+'/img/**/*.gif',
  ], ['imagemin']);

  gulp.watch([
      './'+paths.client_src+'/js/*.js',
      './'+paths.client_src+'/app/*.js',
      './'+paths.client_src+'/app/**/*.js'
  ], ['js']);

  gulp.watch([
      './'+paths.client_src+'/app/controllers/*.js',
      './'+paths.client_src+'/app/controllers/**/*.js',
  ], ['jscontroller-copy']);

  gulp.watch([
    paths.client_src+'/*.html',
    paths.client_src+'/app/tpl/*.html',
    paths.client_src+'/app/tpl/*.tpl',
    paths.client_src+'/app/views/*.html',
    paths.client_src+'/app/partials/*.html'
  ],['html']).on('change', browserSync.reload);

});

/**
 * $ SocketIO & RESTify Server
 * description: Launches Socket.IO Server To Listen and launches API server using restify
 * Socket.IO documentation: http://socket.io/docs/
 * Restify documentation: http://restify.com/#server-api
 */
gulp.task('server:lint', function () {
  gulp.src(paths.server+'/server.js')
    .pipe(jshint());
});
gulp.task('server', function () {
  nodemon({
    script: paths.server+'/server.js',
    ext: 'js',
    ignore: [
      'gulpfile.js',
      'client/',
      'node_modules/',
      'build/',
    ],
    tasks: ['server:lint'],
    env: { 'NODE_ENV': 'development' }
  });
});

/**
 * $ gulp default
 * description: launches everything needed to build and view application
 */
gulp.task('default', ['client_server','server']);
