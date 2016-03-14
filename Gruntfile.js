module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      options: {
        interrupt: true,
        event: ['all']
      },
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      lesslint: {
        files: ['./build/less/style.less'],
        tasks: ['lesslint']
      },
      less: {
        files: ['./build/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true,
          event: 'all',
          reload: true,
        }
      },
      postcss: {
        files: ['./src/css/style.css'],
        tasks: ['postcss']
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'build/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    lesslint: {
      src: ['./build/less/style.less'],
      options: {
        failOnError: false,
        failOnWarning: false
      }
    },
    less: {
      development: {
        options: {
          compress: false
        },
        files: {
          "./src/css/style.css": "./build/less/style.less" // destination file and source file
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 3 version']})
        ]
      },
      dist: {
        src: './src/css/style.css'
      }
    },
    browserSync: {
        bsFiles: {
            src : ['./src/css/*.css', './src/img/*', './src/vid/*', '*.html']
        },
        options: {
            server: {
                baseDir: "./"
            },
            ui: {
                port: 8080
            }
        }
    },
    concurrent: {
      target: {
        tasks: [['jshint', 'lesslint', 'less', 'postcss', 'watch'], 'browserSync'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('default', ['concurrent:target']);
};
