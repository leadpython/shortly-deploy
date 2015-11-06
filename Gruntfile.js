module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['./public/client/concatClient.js', './public/lib/concatLib.js', './public/client/minifiedClient.js', './public/client/minifiedClient.js'],
    concat: {
      options: {
        separator: ';'
      },
      client: {
        src: ['./public/client/*.js'],
        dest: './public/client/concatClient.js'
      },
      lib: {
        src: ['./public/lib/jquery.js', './public/lib/underscore.js','./public/lib/backbone.js','./public/lib/handlebars.js'],
        dest: './public/lib/concatLib.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
          files: {
            './public/client/minifiedClient.js': './public/client/concatClient.js',
            './public/lib/minifiedLib.js': './public/lib/concatLib.js'
          }
        }
    },

    jshint: {
      files: [
        // Add filespec list here
        'minifyShortly.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: './public',
            src: ['*.css'],
            dest: './public',
            ext: '.min.css'
          }]
        }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'clean',
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
          command: [
            'git add .',
            'git commit -m "Deployed Project"',
            'git push origin master',
            'git push azure master',
            'azure site browse'
            ].join('&&')
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    console.log(n);
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['clean', 'concat', 'uglify', 'jshint', 'cssmin']);
      //grunt.registerTask('default', ['clean','concat', 'uglify', 'jshint', 'cssmin']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
      // add your production server task here
      'shell'
  ]);

  

};
