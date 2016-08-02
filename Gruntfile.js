module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'client/*.js', 'server.js']
    },
    watch: {
      files: ['client/*.js'],
      tasks: ['jshint', 'uglify']
    },
    copy: {
      main: {
        files: [
          // makes all src relative to cwd
          {expand: true, cwd: 'node_modules', src: ['angular/**', 'angular-animate/**', 'angular-aria/**', 'angular-material/**', 'angular-messages/**', 'angular-route/**', 'angularfire/**', 'firebase/**'], dest: 'public/assets/vendors'},
        ],
      },
    },
    uglify: {
     my_target: {
      //  options: {
      //    mangle: false
      //  },
       files: {
         'public/assets/scripts/client.min.js': ['client/*.js']
       }
     }
   }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify', 'watch']);

};
