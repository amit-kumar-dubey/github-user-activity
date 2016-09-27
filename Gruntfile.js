// @amit kumar dubey only a config example for project setup
module.exports = function(grunt) {

    //var root = 'PROJECT'; use root when u need
    // Project configuration .

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //Watch Task for sass and normal css changes and minify so you can see refection on the browser.
        serve: {
            options: {
                port: 9000
            }
        },
        watch: {
            sass: {
                files: ['css/**/*.scss', 'css/sass/**/*.scss', 'css/main.css'],
                tasks: ['sass', 'concat', 'cssmin'],
                options: {
                    spawn: false
                },
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    lineNumbers: true, // 1
                    debugInfo: true
                },
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        concat: {

            js: {
                src: ['js/lib/jquery-210min.js', 'js/lib/bootstrap.min.js', 'js/lib/angular.min.js', 'js/lib/require.js', 'js/main.js'], //src: ['js/**/*.js'] this code is not used just because of depency of one file to others, 
                dest: 'js/project.build.js',
                options: {
                    separator: ';',
                }
            },
            css: {
                src: ['css/lib/**/*.css', 'css/main.css', 'css/app.css', ],
                dest: 'css/style.css'
            }
        },
        cssmin: {
            compress: {
                files: {
                    "build/build.min.css": "css/style.css"
                }
            }
        },
        uglify: {
            options: {
                manage: true,
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'build/build.min.js': 'js/project.build.js'
                }
            }
        }



    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-http-server');


    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', ['sass', 'concat', 'cssmin', 'uglify']);



};
