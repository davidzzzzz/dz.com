'use strict';

module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        site: grunt.file.readYAML('app/site.yml'),
        less: {
            development: {
                options: {
                    paths: ["<%= site.development %>stylesheets", "<%= site.development %>bower_components"],
                    compress : true,
                    cleancss: true,
                    strictImports : true
                },
                files: [{
                    // no need for files, the config below should work
                    expand: true,
                    cwd:    "<%= site.development %>stylesheets/",
                    src:    "*.less",
                    ext:    ".css",
                    dest: '<%= site.destination_assets %>stylesheets/'
                }]
            }
        },
       copy: {
           main: {
               files: [
                   {
                       expand: true,
                       cwd: '<%= site.development %>images/',
                       src: ['**/*.{jpg,png,gif,ico}'],
                       dest: '<%= site.destination_assets %>images/',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       cwd: '<%= site.development %>stylesheets/vendor',
                       src: ['**/*.{jpg,png,gif,ico}'],
                       dest: '<%= site.destination_assets %>stylesheets/images/',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       flatten: true,
                       src: ['<%= site.development %>bower_components/requirejs/require.js', '<%= site.development %>bower_components/*/*{.min.js,-min.js}', '<%= site.development %>bower_components/*/dist/**/*{.min.js,-min.js}', '<%= site.development %>bower_components/*/{dist,js}/*{.min.js,-min.js}'],
                       dest: '<%= site.destination_assets %>javascripts/vendor/',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       flatten: true,
                       src: ['<%= site.development %>javascripts/**/*.js'],
                       dest: '<%= site.destination_assets %>javascripts/',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       cwd: '<%= site.development %>',
                       src: ['*.{html,ico,php}'],
                       dest: '<%= site.destination %>',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       cwd: '<%= site.development %>',
                       src: ['.htaccess'],
                       dest: '<%= site.destination %>',
                       filter: 'isFile'
                   }
               ]
           },
           deploy : {
               files: [
                   {
                       expand: true,
                       cwd: '<%= site.destination_assets %>',
                       src: ['**/*.*'],
                       dest: '<%= site.deploy_assets %>',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       cwd: '<%= site.destination %>',
                       src: ['*.{html,ico,php}'],
                       dest: '<%= site.deploy_site %>',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       cwd: '<%= site.destination %>',
                       src: ['*.{html,ico}'],
                       dest: '<%= site.deploy_site %>',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       cwd: '<%= site.server %>',
                       src: ['*.js'],
                       dest: '<%= site.deploy_server %>',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       src: ['package.json'],
                       dest: '<%= site.deploy_server_assets %>',
                       filter: 'isFile'
                   },
                   {
                       expand: true,
                       src: ['Procfile'],
                       dest: '<%= site.deploy_server_assets %>',
                       filter: 'isFile'
                   }
               ]
           }
       },
        requirejs: {
        	options: {
        		baseUrl: "<%= site.destination_assets %>/javascripts/",
                mainConfigFile : "<%= site.destination_assets %>/javascripts/require.config.js",
                include : ["requireLib"],
                optimizeCss: "none",
                optimize: "uglify2"
        	},
            index: {
                options: {
                    name: "index",
                    out: "<%= site.destination_assets %>javascripts-modules/index.min.js"
                }
            }
        },
        // Before generating any new files,
        // remove any previously-created files.
        clean: {
            all: ['<%= site.destination %>/**/*.*'],
            deploy: {
                src: ['<%= site.deploy %>/**/*.*'],
                options : {
                    force : true
                }
            }
        }
    });

    // Load npm plugins to provide necessary tasks.
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    // Default task to be run.
    grunt.registerTask('build', ['clean:all', 'less:development', 'copy:main', 'requirejs']);

    grunt.registerTask('deploy', ['build', 'clean:deploy', 'copy:deploy']);

};