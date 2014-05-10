module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        settings: {

            paths: {
                css: {
                    src: 'src/css',
                    dist: 'dist/css'
                },

                js: {
                    src: 'src/js',
                    dist: 'dist/js'
                },

                html:{
                    src: 'src/html',
                    dist: 'dist'
                }
            },

            css: {
                scssMain: '<%=settings.paths.css.src%>/main.scss',
                scssAll: '<%=settings.paths.css.src%>/**/*.scss',
                dist: '<%=settings.paths.css.dist%>/main.css',
                distMin: '<%=settings.paths.css.dist%>/main.min.css',
                assetsSrc: '<%=settings.paths.css.src%>/assets/**/*',
                assetsDist: '<%=settings.paths.css.dist%>/assets/',
            },

            js: {
                modules: '<%=settings.paths.js.src%>/modules/*.js',
                main: '<%=settings.paths.js.src%>/main.js',
                distMain: '<%=settings.paths.js.dist%>/main.tmp.js',
                distLibs: '<%=settings.paths.js.dist%>/libs.tmp.js',
                distAll: '<%=settings.paths.js.dist%>/all.js',
                distAllMin: '<%=settings.paths.js.dist%>/all.min.js'
            },

            html: {
                all: '<%=settings.paths.html.src%>/**/*.html',
                allDist: '<%=settings.paths.html.dist%>'
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
