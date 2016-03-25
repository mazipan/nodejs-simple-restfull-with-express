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
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files : {
                expand : true,
                cwd : 'src/public/stylesheets/',
                src : ['**/*.css', '!**/*.min.css'],
                dest : 'build/public/stylesheets/',
                ext : '.min.css'
            },
            combine : {
                files: {
                    'build/public/stylesheets/all-combine-style.min.css':
                        [
                            'src/public/stylesheets/library/bootstrap.min.css',
                            'src/public/stylesheets/library/bootstrap-theme.min.css',
                            'build/public/stylesheets/style.min.css'
                        ]
                }
            }
        },

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Default task(s).
    grunt.registerTask('default', [ 'uglify', 'cssmin']);

};