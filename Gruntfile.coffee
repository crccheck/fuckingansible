module.exports = (grunt) ->
  grunt.initConfig
    sass:
      options:
        sourceMap: true
      dist:
        files:
          'fuckinga.css': 'fuckinga.sass'

  # TODO livereload
  # TODO autoprefixer

  grunt.loadNpmTasks 'grunt-sass'

  grunt.registerTask 'default', ['sass']
