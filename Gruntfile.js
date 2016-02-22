/**
 * Created by irfan.maulana on 2/19/2016.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js', '!*.min.js'],
                    dest: 'build/',
                    ext: '.min.js'
                }]
                //files: grunt.file.expandMapping([
                //        '!**/node_modules/**',
                //        '**/connection/connection.js',
                //        '<%= pkg.name %> /model/*.js',
                //        '<%= pkg.name %> /routes/*.js'],
                //    'build/', {
                //    rename: function(destBase, destPath) {
                //        return destBase+destPath.replace('.js', '.min.js');
                //    }
                //})
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};