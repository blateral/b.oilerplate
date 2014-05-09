module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        settings: {
            css: {
                scssMain: 'src/css/main.scss',
                scssAll: 'css/src/**/*.scss',
                dist: 'dist/css/main.css',
                distMin: 'dist/css/main.min.css',
                assetsSrc: 'src/css/assets/**/*',
                assetsDist: 'dist/css/assets/',
            },

            js: {
                modules: 'src/js/modules/*.js',
                main: 'src/js/main.js',
                distMain: 'dist/js/main.tmp.js',
                distLibs: 'dist/js/libs.tmp.js',
                distAll: 'dist/js/all.js',
                distAllMin: 'dist/js/all.min.js'
            },

            html: {
                all: 'src/html/**/*.html',
                allDist: 'dist'
            }
        },

        sass: {
            all: {
                files: {
                    '<%= settings.css.dist %>': '<%= settings.css.scssMain %>',
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    '<%= settings.css.dist %>': '<%= settings.css.dist %>'
                }
            }
        },

        cssmin: {
            minify: {
                files: {
                    '<%= settings.css.distMin %>': '<%= settings.css.dist %>'
                }
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                '<%= settings.js.modules %>',
                '<%= settings.js.main %>'
            ]
        },

        concat: {
            js: {
                src: ['<%= settings.js.modules %>', '<%= settings.js.main %>'],
                dest: '<%= settings.js.distMain %>'
            },

            vendor: {
                src: [
                    'js/vendor/lib1/*.js'
                ],
                dest: '<%= settings.js.distLibs %>'
            },

            all: {
                src: ['<%= settings.js.distLibs %>', '<%= settings.js.distMain %>'],
                dest: '<%= settings.js.distAll %>'
            }
        },

        uglify: {
            all: {
                files: {
                    '<%= settings.js.distAllMin %>': '<%= settings.js.distAll %>'
                }
            }
        },

        copy: {
            cssAssetsDist: {
                expand: true, 
                flatten: true, 
                src: '<%= settings.css.assetsSrc %>', 
                dest: '<%= settings.css.assetsDist %>'
            }
        },

        connect: {
            server: {
                options: {
                    keepalive: true,
                    hostname: '*',
                    open: true
                }
            }
        },

        watch: {

            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'concat:js', 'concat:all'],
                options: {
                    livereload: true
                }
            },

            vendor: {
                files: '<%= concat.vendor.src %>',
                tasks: ['concat:vendor', 'concat:all']
            },

            scss: {
                files: '<%= settings.css.scss %>',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },

            assets: {
                files: '<%= settings.css.assetsSrc %>',
                tasks: 'copy:cssAssetsDist',
                options: {
                    livereload: true
                }
            },

            html: {
                files: '<%= settings.html.files %>',
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('compile', ['concat', 'sass', 'autoprefixer', 'copy:cssAssetsDist']);
    grunt.registerTask('server', ['connect', 'watch']);
};
