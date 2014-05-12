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

                html: {
                    src: 'src/html',
                    dist: 'dist'
                },

                media: {
                    src: 'src/media',
                    dist: 'dist/media'
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
            },

            media: {
                src: '<%=settings.paths.media.src%>/**/*',
                dist: '<%=settings.paths.media.dist%>'
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
            css: {
                options: {
                    banner: '/* <%= pkg.name %> v<%= pkg.version %> (build <%= grunt.template.today("yyyy-mm-dd") %>) */'
                },
                files: {
                    '<%= settings.css.dist %>': '<%= settings.css.dist %>'
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
            js: {
                options: {
                    banner: '/* <%= pkg.name %> v<%= pkg.version %> (build <%= grunt.template.today("yyyy-mm-dd") %>) */'
                },
                files: {
                    '<%= settings.js.distAll %>': '<%= settings.js.distAll %>'
                }
            }
        },

        copy: {
            media: {
                expand: true,
                cwd: '<%=settings.paths.media.src%>/',
                src: '**',
                dest: '<%= settings.media.dist %>'
            },

            layoutMedia: {
                expand: true,
                cwd: '<%=settings.paths.css.src%>/assets/',
                src: '**',
                dest: '<%= settings.css.assetsDist %>'
            },

            html: {
                expand: true,
                cwd: '<%=settings.paths.html.src%>/',
                src: '**',
                dest: '<%= settings.paths.html.dist %>'
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '*',
                    base: 'dist'
                }
            }
        },

        clean: {
            dist: ['dist']
        },

        /*sprite:{
            all: {
                src: 'path/to/your/sprites/*.png',
                destImg: 'destination/of/spritesheet.png',
                destCSS: 'destination/of/sprites.scss'
            }
        }*/

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
                files: '<%= settings.css.scssAll %>',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },

            assets: {
                files: '<%= settings.css.assetsSrc %>',
                tasks: 'copy:layoutMedia',
                options: {
                    livereload: true
                }
            },

            media: {
                files: '<%= settings.media.src %>',
                tasks: 'copy:media',
                options: {
                    livereload: true
                }
            },

            html: {
                files: '<%= settings.html.all %>',
                tasks: 'copy:html',
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.registerTask('build', ['clean', 'jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'copy']);
    grunt.registerTask('compile', ['concat', 'sass', 'autoprefixer', 'copy']);
    grunt.registerTask('server', ['connect', 'watch']);
};
