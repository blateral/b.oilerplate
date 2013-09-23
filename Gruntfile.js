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
                    'css/dist//main.css': 'css/dist//main.css'
                }
            }
        },

        cssmin: {
            minify: {
                files: {
                    'css/dist//main.css': 'css/dist//main.css'
                }
            }
        },

        jshint: {
            options: {
                evil: true
            },
            files: [
                'Gruntfile.js',
                'js/src/**/*.js'
            ]
        },

        concat: {
            js: {
                src: ['js/vendor/underscore-min.js', 'js/src/modules/*.js', 'js/src/*.js'],
                dest: 'js/build/main.js'
            }
        },

        uglify: {
            all: {
                files: {
                    'js/build/main.min.js': 'js/build/main.js'
                }
            }
        },

        watch: {

            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'concat'],
                options: {
                    livereload: true
                }
            },

            scss: {
                files: 'scss/**/*.scss',
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
        var tpl = grunt.file.read('js/src/modules/module.tpl')
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