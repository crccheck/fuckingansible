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
          'fuckinga.js': ['src/fuckinga.js']
    watch:
      options:
        livereload: true
      style:
        files: ['*.sass']
        tasks: ['sass']
        options:
          livereload: false
          spawn: true
      css:
        files: ['*.css']
      scripts:
        files: ['src/*.js']
        tasks: ['browserify', 'uglify']
        options:
          spawn: false
    nodeunit:
      all: ['test/*_test.js']
    uglify:
      dist:
        files:
          'fuckinga.min.js': ['fuckinga.js']
    connect:
      server:
        options:
          livereload: true


  # TODO livereload
  # TODO autoprefixer

  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-nodeunit'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', ['build', 'test']
  grunt.registerTask 'dev', ['connect', 'build', 'watch']
  grunt.registerTask 'build', ['sass', 'browserify', 'uglify']
  grunt.registerTask 'test', ['nodeunit']
