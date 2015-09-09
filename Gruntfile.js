var browserSync = require("browser-sync");

module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');

    var settings = grunt.file.readJSON('settings.json');

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
                dest: 'dist',
                dot: true
            }
        },

        clean: {
            dist: 'dist',
            build: [
                'dist/tmp',
                'dist/css/*.map',
                'dist/css/*.css',
                '!dist/css/*.min.css',
                '!dist/css/*.fonts.css',
                'dist/js/*.js',
                '!dist/js/*.min.js',
                '!dist/**/*.custom.*'
            ]
        },

        browserify: {
            dist: {
                files: {
                    '<%= settings.js.all.dist %>': ['<%= settings.js.modules.src %>', '<%= settings.js.main.src %>'],
                },
                options: {}
            }
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

            options: {
                spawn: false // Very important, don't miss this
            },

            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'browserify', 'bs-inject-js']
            },

            scss: {
                files: '<%= settings.css.scss.src %>',
                tasks: ['sass', 'autoprefixer', 'bs-inject-css']
            },

            webroot: {
                files: 'src/webroot/**',
                tasks: ['copy', 'bs-inject-html']
            },

            html: {
                files: '<%= settings.html.all.src %>',
                tasks: ['assemble:dev', 'bs-inject-html']
            }
        },

        'sftp-deploy': {

            build: {
                auth: {
                    host: '<%= settings.deploy.server.host %>',
                    port: '<%= settings.deploy.server.port %>',
                    authKey: '<%= settings.deploy.server.key %>'
                },
                src: '<%= settings.deploy.src %>',
                dest: '<%= settings.deploy.dest %>',
                exclusions: ['dist/**/.DS_Store'],
                cache : false
            }
        }

    });

    grunt.registerTask('bs-init', function () {
        var done = this.async();
        browserSync({
            port: 8000,
            server: './dist'
        }, function (err, bs) {
            done();
        });
    });

    grunt.registerTask('bs-inject-css', function () {
        browserSync.reload(settings.css.main.dist);
    });

    grunt.registerTask('bs-inject-js', function () {
        console.log(settings.js.all.dist);
        browserSync.reload(settings.js.all.dist);
    });

    grunt.registerTask('bs-inject-html', function () {
        browserSync.reload();
    });

    grunt.registerTask('build', ['clean', 'jshint', 'browserify', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'copy', 'assemble:build', 'clean:build']);
    grunt.registerTask('compile', ['browserify', 'sass', 'autoprefixer', 'copy', 'assemble:dev']);
    grunt.registerTask('default', ['compile' ,'bs-init', 'watch']);
    grunt.registerTask('deploy', ['build' ,'sftp-deploy']);
};
