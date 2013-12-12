module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        settings: {
            css: {
                scssMain: 'css/src/main.scss',
                scss: 'css/src/**/*.scss',
                dist: 'css/dist/main.css',
                assetsSrc: 'css/src/assets/**/*',
                assetsDist: 'css/dist/assets/',
            },

            js: {
                srcAll: 'js/src/**/*.js',
                modules: 'js/src/modules/*.js',
                src: 'js/src/*.js',
                distMain: 'js/dist/main.js',
                distLibs: 'js/dist/libs.js',
                distAll: 'js/dist/<%=pkg.name%>.js'
            },

            html: {
                files: [
                    'index.html'
                ]
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
                    '<%= settings.css.dist %>': '<%= settings.css.dist %>'
                }
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                '<%= settings.js.srcAll %>'
            ]
        },

        concat: {
            js: {
                src: ['<%= settings.js.modules %>', '<%= settings.js.src %>'],
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
                    '<%= settings.js.distAll %>': '<%= settings.js.distAll %>'
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
            uses_defaults: {}
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

    function createJsModule(data) {
        var tpl = grunt.file.read('js/src/modules/module.tpl'),
            out = grunt.template.process(tpl, {data: data});

        grunt.file.write('js/src/modules/' + data.name + '.js', out);

        grunt.log.writeln('Created js/src/modules/' + data.name + '.js');
    }


    grunt.registerTask('js-module', 'Creating module for js', function(moduleName){
        var data;

        if (arguments.length === 0) {
            data = {
                name: 'MyModule'
            };
        } else {
            data = {
                name: moduleName
            };
        }

        createJsModule(data);
    });

    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('compile', ['concat', 'sass', 'autoprefixer', 'copy:cssAssetsDist']);
    grunt.registerTask('server', ['connect', 'watch']);
};
