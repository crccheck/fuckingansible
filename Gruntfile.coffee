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


  # TODO livereload
  # TODO autoprefixer

  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['sass', 'browserify']
  grunt.registerTask 'dev', ['default', 'watch']
