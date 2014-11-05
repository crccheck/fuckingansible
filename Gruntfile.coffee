module.exports = (grunt) ->
  grunt.initConfig
    sass:
      options:
        sourceMap: true
      dist:
        files:
          'fuckinga.css': 'fuckinga.sass'
    browserify:
      dist:
        files:
          'main.js': ['fuckina.js']


  # TODO livereload
  # TODO autoprefixer

  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-browserify'

  grunt.registerTask 'default', ['sass']
