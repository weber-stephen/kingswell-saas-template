var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat-sourcemap'),
    imagemin    = require('gulp-imagemin'),
    uglify      = require('gulp-uglify'),
    pngquant    = require('imagemin-pngquant'),
    restify     = require('restify'),
    jf          = require('jsonfile'),
    fs          = require('fs'),
    express     = require('express')(),
    http        = require('http').Server(express),
    io          = require('socket.io')(http);

var paths = {
  src:'src',
  build:'build',
  bower_components:'bower_components',
  vendor:'vendor',
  tpl:'tpl',
};

var componentPaths = {
  //Obviously you need this for the application to run
  angular : paths.bower_components+'/angular/angular.js',
  
  //This is the style for the whole application and the components
  angularAria : paths.bower_components+'/angular-aria/angular-aria.min.js',
  angularMaterial : paths.bower_components+'/angular-material/angular-material.js',
  angularMaterialCSS : paths.bower_components+'/angular-material/angular-material.css',

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
      './'+componentPaths.rickshawCSS,
      './'+componentPaths.highlightJSDarkCSS,
      './'+componentPaths.angularMaterialDatatablesCSS,
      './'+componentPaths.gridstackCSS,
      './'+componentPaths.nvd3CSS
    ])
    .pipe(concat('_bower_components.scss'))
    .pipe(gulp.dest('./'+paths.src+'/sass/'));
});

gulp.task('socketio_server',function() {

  console.log('Starting Socket.IO Server');

  function randRange(min,max) {
    return Math.floor(Math.random() * max) + min;
  }

  var messages = ['Hello! How are you?','I love this system, where did you find it?','Another marketing ploy'];

  function sendMessageIncoming() {
    io.sockets.emit('messageIncoming',{profile:('profile'+(randRange(1,11))+'.jpg'),msg:messages[randRange(0,2)]});
  }

  io.on('connection', function (socket) {

    console.log('User Connected To Socket.IO Server');

    var serverLoadUpdateInterval = setInterval(function() {
      console.log('Sending Server Load Update');
      io.sockets.emit('serverLoad',{cpu:randRange(5,100),space:randRange(5,100),bandwidth:randRange(5,100),chartValue:randRange(5,100)});
    },5000);
    
    setTimeout(function() {
      console.log('Sending Message Incoming');
      sendMessageIncoming();
    },5000);
    sendMessageIncoming();

    socket.on('disconnect', function() {
      console.log('User Disconnected From Socket.IO Server');
      clearInterval(serverLoadUpdateInterval);
    });

  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });

});

/**
 * $ gulp api_server
 * description: launches api server using restify
 * Resify documentation: http://restify.com/#server-api
 */
gulp.task('api_server', function() {
  
  function respond(json, req, res, next, callback) {
    jf.readFile('build/data/'+json+'.json', function(err, data) { //if change detected read the sports.json 
      if(callback) {
        callback(req,data);
      } else {
        res.send(data);
        next();
      }
    });
  }

  var server = restify.createServer();

  server.use(restify.CORS());
  server.use(restify.fullResponse());

  //Search
  server.get('/search/:query', function (req, res, next) {
    respond('search',req,res,next);
  });

  //Username check
  server.get('/usernameCheck/:query', function (req, res, next) {
    respond('usernameCheck',req,res,next,function(req,data) {
      var taken = false;
      for (var i = data.length - 1; i >= 0; i--) {
        if(req.params.query === data[i]) {
          taken = true;
          res.send({response:'taken'});
          next();
        }
      }
      if(!taken) {
        res.send({response:'available'});
        next();
      }
    });
  });

  server.get('/currentUser', function (req, res, next) {
    respond('currentUser',req,res,next);
  });

  server.get('/messages', function (req, res, next) {
    respond('messages',req,res,next);
  });

  server.get('/notifications', function (req, res, next) {
    respond('notifications',req,res,next);
  });

  server.get('/tableData', function (req, res, next) {
    respond('tableData',req,res,next);
  });

  server.get('/tasks', function (req, res, next) {
    respond('tasks',req,res,next);
  });

  server.get('/meetings', function (req, res, next) {
    respond('meetings',req,res,next);
  });

  server.get('/customers', function (req, res, next) {
    respond('customers',req,res,next);
  });

  server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

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
    './'+paths.src+'/sass/main.scss',
    './'+paths.src+'/sass/basic_login.scss',
    './'+paths.src+'/sass/modern_login.scss',
    './'+paths.src+'/sass/**/*.scss'
  ], ['sass']);

  gulp.watch([
    './'+paths.src+'/data/*.*'
  ], ['data']);

  gulp.watch([
    './'+paths.src+'/img/*.jpg',
    './'+paths.src+'/img/*.png',
    './'+paths.src+'/img/*.gif',
    './'+paths.src+'/img/**/*.jpg',
    './'+paths.src+'/img/**/*.png',
    './'+paths.src+'/img/**/*.gif',
  ], ['imagemin']);

  gulp.watch([
      './'+paths.src+'/js/*.js',
      './'+paths.src+'/app/*.js',
      './'+paths.src+'/app/**/*.js'
  ], ['js']);

  gulp.watch([
    paths.src+'/*.html',
    paths.src+'/app/tpl/*.html',
    paths.src+'/app/tpl/*.tpl',
    paths.src+'/app/views/*.html',
    paths.src+'/app/partials/*.html'
  ],['html']).on('change', browserSync.reload);

});

/**
 * $ gulp compile and copy sass
 * description: 
 */
gulp.task('sass', function () {
  return gulp.src([
    './'+paths.src+'/sass/main.scss',
    './'+paths.src+'/sass/basic_login.scss',
    './'+paths.src+'/sass/basic_register.scss',
    './'+paths.src+'/sass/modern_login.scss',
    './'+paths.src+'/sass/modern_register.scss',
    './'+paths.src+'/sass/**/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp copy html and templates
 * description: 
 */
gulp.task('html', function() {

  gulp.src('./'+paths.src+'/*.html')
  .pipe(gulp.dest('./'+paths.build));

  gulp.src(['./'+paths.src+'/app/views/*.html'])
  .pipe(gulp.dest('./'+paths.build+'/views'));

  gulp.src(['./'+paths.src+'/app/partials/*.html'])
  .pipe(gulp.dest('./'+paths.build+'/partials'));

  gulp.src(['./'+paths.src+'/app/tpl/*.html','./'+paths.src+'/app/tpl/*.tpl'])
  .pipe(gulp.dest('./'+paths.build+'/tpl'));

});

/**
 * $ gulp copy data json files
 * description: 
 */
gulp.task('data', function () {
  return gulp.src('./'+paths.src+'/data/*.json')
  .pipe(gulp.dest('./'+paths.build+'/data'));
});

/**
 * $ gulp copy fonts
 * description: 
 */
gulp.task('fonts', function () {
  return gulp.src('./'+paths.src+'/fonts/*')
  .pipe(gulp.dest('./'+paths.build+'/fonts'));
});

/**
 * $ gulp compile js
 * description: 
 */
gulp.task('js', function () {

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    './'+paths.src+'/js/basic_login.js'
  ])
  .pipe(concat('basic_login.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    './'+paths.src+'/js/basic_register.js'
  ])
  .pipe(concat('basic_register.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    componentPaths.vide,
    './'+paths.src+'/js/modern_login.js'
  ])
  .pipe(concat('modern_login.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  gulp.src([
    componentPaths.jquery,
    componentPaths.materialDesignLite,
    componentPaths.vide,
    './'+paths.src+'/js/modern_register.js'
  ])
  .pipe(concat('modern_register.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));

  return gulp.src([
    componentPaths.jquery,
    componentPaths.angular,
    componentPaths.angularCookies,
    componentPaths.angularMaterial,
    componentPaths.angularTouch,
    componentPaths.angularMessages,
    componentPaths.angularSanitize,
    componentPaths.angularAnimate,
    componentPaths.angularAria,
    componentPaths.angularUIRouter,
    componentPaths.lodash,
    componentPaths.angularSimpleLogger,
    componentPaths.angularGoogleMaps,
    componentPaths.angularSmartTable,
    componentPaths.d3,
    componentPaths.rickshaw,
    componentPaths.angularRickshaw,
    componentPaths.angularEasyPieChart,
    componentPaths.c3,
    componentPaths.angularC3,
    componentPaths.nvd3,
    componentPaths.angularNvd3,
    componentPaths.chartJS,
    componentPaths.angularChartJS,
    componentPaths.moment,
    componentPaths.highlightJS,
    componentPaths.angularHighlightJS,
    componentPaths.angularClipboard,
    componentPaths.angularFontAwesome,
    componentPaths.angularMaterialDatatables,
    componentPaths.socketIO,
    componentPaths.angularSocketIO,
    componentPaths.angularCountTo,
    './'+paths.src+'/app/libs/*.js', //This is where I put libraries that down have bower files
    './'+paths.src+'/app/*.js',
    './'+paths.src+'/app/services/*.js',
    './'+paths.src+'/app/services/**/*.js',
    './'+paths.src+'/app/factories/*.js',
    './'+paths.src+'/app/factories/**/*.js',
    './'+paths.src+'/app/controllers/*.js',
    './'+paths.src+'/app/controllers/**/*.js',
    './'+paths.src+'/app/directives/*.js',
    './'+paths.src+'/app/directives/**/*.js',
  ])
  .pipe(concat('app.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));
});

/**
 * $ gulp compress images
 * description: Compresses images from original quality
 */
gulp.task('imagemin', function () {
    return gulp.src([
      paths.src+'/img/*.jpg',
      paths.src+'/img/*.gif',
      paths.src+'/img/*.png',
      paths.src+'/img/**/*.jpg',
      paths.src+'/img/**/*.gif',
      paths.src+'/img/**/*.png'
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
  return gulp.src('./'+paths.src+'/img/icons/*.svg')
  .pipe(gulp.dest('./'+paths.build+'/img/icons'));
});

/**
 * $ gulp default
 * description: launches everything needed to build and view application
 */
gulp.task('default', ['client_server','api_server','socketio_server']);
