module.exports = function (grunt) {
  grunt.registerTask('linkAssets', [
    'sails-linker:jsDev',
    'sails-linker:stylesDev',
    'sails-linker:livereloadDev'
  ]);
};
