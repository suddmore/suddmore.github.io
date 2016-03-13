module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-serve');
  grunt.registerTask('default', [
    'jshint',
    'less',
    'watch'
    // 'serve'
  ]);
};