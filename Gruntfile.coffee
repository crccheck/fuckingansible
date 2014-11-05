module.exports = (grunt) ->
  grunt.initConfig
    sass:
      options:
        sourceMap: true
        outputStyle: 'compressed'
      dist:
        files:
          'fuckinga.css': 'fuckinga.sass'
    browserify:
      dist:
        files:
          'main.js': ['fuckinga.js']
    watch:
      style:
        files: ['*.sass']
        tasks: ['sass']
        options:
          spawn: false
      scripts:
        files: ['fuckinga.js']
        tasks: ['browserify']
        options:
          spawn: false
    nodeunit:
      all: ['test/*_test.js']
    uglify:
      dist:
        files:
          'main.min.js': ['main.js']


  # TODO livereload
  # TODO autoprefixer

  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-nodeunit'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['build', 'test']
  grunt.registerTask 'dev', ['build', 'watch']
  grunt.registerTask 'build', ['sass', 'browserify', 'uglify']
  grunt.registerTask 'test', ['nodeunit']
