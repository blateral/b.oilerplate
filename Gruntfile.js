module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.initConfig({

        sass: {
            all: {
                files: {
                    'css/dist/main.css': 'css/src/main.scss',
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'css/dist/main.css': 'css/dist/main.css'
                }
            }
        },

        cssmin: {
            minify: {
                files: {
                    'css/dist/main.css': 'css/dist/main.min.css'
                }
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                'js/src/**/*.js'
            ]
        },

        concat: {
            js: {
                src: ['js/src/modules/*.js', 'js/src/*.js'],
                dest: 'js/dist/main.js'
            },

            vendor: {
                src: ['js/vendor/**/*.js'],
                dest: 'js/dist/libs.js'
            },

            all: {
                src: ['js/dist/libs.js', 'js/dist/main.js'],
                dest: 'js/dist/app.js'
            }
        },

        uglify: {
            all: {
                files: {
                    'js/dist/app.min.js': 'js/dist/app.js'
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
                files: 'css/src/**/*.scss',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },

            html: {
                files: 'index.html',
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

    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin']);

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

};