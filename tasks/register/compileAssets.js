module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dist',
    'copy:dev',
    'jst:dev',
    'less:dev',
    'jshint:dev',
    'browserify:dev',
    'preprocess-tax:dist'
  ]);
};
