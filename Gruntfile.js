module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      copy: {
        files: ['src/*', 'src/**/*'],
        tasks: ['copy']  
      },
      clean: {
        files: ['src/*', 'src/**/*'],
        tasks: ['clean']  
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
    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: ['**/*', '*', '!less'],
        dest: 'build/'
      },
    },
    // clean: {
    //   build: ['src/**/*', 'src/*', '!less'],
    //   release: ['build/']
    // },
    concurrent: {
        target: {
          tasks: [['jshint', 'copy', 'clean', 'less', 'watch'], 'serve'],
          options: {
              logConcurrentOutput: true
          }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['concurrent:target']);
};
