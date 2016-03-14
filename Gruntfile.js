module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      lesslint: {
        files: ['./src/less/style.less'],
        tasks: ['lesslint']
      },
      less: {
        files: ['./src/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true,
          event: 'all',
          reload: true,
        }
      },
      postcss: {
        files: ['./build/css/style.css'],
        tasks: ['postcss']
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    lesslint: {
      src: ['./src/less/style.less'],
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
          "./build/css/style.css": "./src/less/style.less" // destination file and source file
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
        src: './build/css/style.css'
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
