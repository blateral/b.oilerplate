var browserSync = require("browser-sync");

module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

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

        eslint: {
            target: [
                'Gruntfile.js',
                '<%= settings.js.modules.src %>',
                '<%= settings.js.main.src %>'
            ],
            options: {
                quiet: true
            }
        },

        uglify: {
            js: {
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
                '!dist/css/*.woff.css',
                'dist/js/*.js',
                '!dist/js/*.min.js',
                '!dist/**/*.custom.*'
            ]
        },

        browserify: {
            all: {
                src: ['src/js/**/*.js'],
                dest: 'dist/js/all.js',
                options: {
                    transform: ['babelify', 'envify'],
                    watch: true
                }
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
                    usemin: true,
                    version: '<%= pkg.version %>'
                }
            }
        },

        shell: {
            build: {
                command: './node_modules/kss/bin/kss-node --config kss-config-build.json'
            },

            dev: {
                command: './node_modules/kss/bin/kss-node --config kss-config-dev.json'
            }
        },

        usebanner: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['dist/css/*.min.css', 'dist/js/*.min.css']
                }
            }
        },

        watch: {

            options: {
                spawn: false // Very important, don't miss this
            },

            js: {
                files: '<%= eslint.target %>',
                tasks: ['eslint']
            },

            browserifyBundle: {
                files: '<%= settings.js.all.dist %>',
                tasks: ['bs-inject-js']
            },

            scss: {
                files: '<%= settings.css.scss.src %>',
                tasks: ['sass', 'autoprefixer', 'shell:dev', 'bs-inject-css']
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
                    host: '<%= settings.sftp.server.host %>',
                    port: '<%= settings.sftp.server.port %>',
                    authKey: '<%= settings.sftp.server.key %>'
                },
                src: '<%= settings.sftp.src %>',
                dest: '<%= settings.sftp.dest %>',
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
        browserSync.reload(settings.js.all.dist);
    });

    grunt.registerTask('bs-inject-html', function () {
        browserSync.reload();
    });

    grunt.registerTask('build', _ => {
        grunt.warn('\n\n`grunt build` ist sowas von 2015. Bitte `npm run build` nutzen\n\n');
    })

    grunt.registerTask('deploy', _ => {
        grunt.warn('\n\n`grunt deploy` ist sowas von 2015. Bitte `npm run deploy` nutzen\n\n');
    })

    grunt.registerTask('default', _ => {
        grunt.warn('\n\n`grunt` ist sowas von 2015. Bitte `npm start` nutzen\n\n');
    })

    grunt.registerTask('_build', ['clean', 'eslint', 'browserify', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'copy', 'assemble:build', 'clean:build', 'usebanner', 'shell:build']);
    grunt.registerTask('compile', ['browserify', 'sass', 'autoprefixer', 'copy', 'shell:dev', 'assemble:dev']);
    grunt.registerTask('start', ['compile' ,'bs-init', 'watch']);
    grunt.registerTask('_deploy', ['_build' ,'sftp-deploy']);
};
