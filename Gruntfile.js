module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        settings: grunt.file.readJSON('settings.json'),
        banner: [
            '/*!',
            '<%= pkg.name %>',
            '@version <%= pkg.version %>',
            '@date <%= grunt.template.today("yyyy-mm-dd, HH:MM") %>',
            '*/'
        ].join("\n"),

        sass: {
            options: {
                sourceMap: true
            },
            main: {
                files: {
                    '<%= settings.css.main.dist %>': '<%= settings.css.main.src %>',
                }
            }
        },

        autoprefixer: {
            all: {
                expand: true,
                flatten: true,
                src: 'dist/css/*.css',
                dest: 'dist/css'
            }
        },

        cssmin: {
            css: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                '<%= settings.js.modules.src %>',
                '<%= settings.js.main.src %>'
            ]
        },

        concat: {
            main: {
                src: ['<%= settings.js.modules.src %>', '<%= settings.js.main.src %>'],
                dest: '<%= settings.js.main.dist %>'
            },

            vendor: {
                src: '<%= settings.js.vendor.src %>',
                dest: '<%= settings.js.vendor.dist %>'
            },

            all: {
                src: ['<%= settings.js.vendor.dist %>', '<%= settings.js.main.dist %>'],
                dest: '<%= settings.js.all.dist %>'
            }
        },

        uglify: {
            js: {
                options: {
                    banner: "<%= banner %>\n"
                },
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js',
                    ext: '.min.js'
                }]
            }
        },

        copy: {
            webroot: {
                expand: true,
                cwd: 'src/webroot',
                src: '**',
                dest: 'dist'
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
            dist: 'dist',
            build: [
                'dist/tmp',
                'dist/css/*.map', 
                'dist/css/*.css', 
                '!dist/css/*.min.css', 
                'dist/js/*.js', 
                '!dist/js/*.min.js'
            ]
        },

        assemble: {
            options: {
                flatten: true,
                layout: '<%= settings.html.layout.src %>',
                partials: '<%= settings.html.includes.src %>',
                helpers: '<%= settings.html.helper.src %>',
                data: '<%= settings.html.data.src %>'
            },

            dev: {
                src: '<%= settings.html.main.src %>',
                dest: 'dist/',
                options: {
                    usemin: false
                }
            },

            build: {
                src: '<%= settings.html.main.src %>',
                dest: 'dist/',
                options: {
                    usemin: true
                }
            }
        },

        watch: {

            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'concat:vendor', 'concat:all'],
                options: {
                    livereload: true
                }
            },

            vendor: {
                files: '<%= concat.vendor.src %>',
                tasks: ['concat:vendor', 'concat:all']
            },

            scss: {
                files: '<%= settings.css.scss.src %>',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },

            webroot: {
                files: 'src/webroot/**',
                tasks: 'copy',
                options: {
                    livereload: true
                }
            },

            html: {
                files: '<%= settings.html.all.src %>',
                tasks: 'assemble:dev',
                options: {
                    livereload: true
                }
            },
        }

    });

    grunt.registerTask('build', ['clean', 'jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'copy', 'assemble:build', 'clean:build']);
    grunt.registerTask('compile', ['concat', 'sass', 'autoprefixer', 'copy', 'assemble:dev']);
    grunt.registerTask('server', ['connect', 'watch']);
    grunt.registerTask('default', ['compile' ,'server']);
};
