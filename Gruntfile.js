module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      less: {
        files: ['src/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true,
          event: 'all',
          reload: true,
        }
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
    serve: {
        options: {
            port: 9001,
        }
    },
    less: {
      development: {
        options: {
          compress: false
        },
        files: {
          "build/css/style.css": "src/less/style.less" // destination file and source file
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
    concurrent: {
        target: {
          tasks: [['jshint', 'less', 'postcss', 'watch'], 'serve'],
          options: {
              logConcurrentOutput: true
          }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['concurrent:target']);
};
