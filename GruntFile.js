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
                       src: ['*.html, ,.ico, .htaccess, .php'],
                       dest: '<%= site.destination %>',
                       filter: 'isFile'
                   }
               ]
           },
           less : {
               files : [
                   {
                       expand: true,
                       filter: 'isFile',
                       src: ['<%= site.development %>bower_components/flexslider/flexslider.css'],
                       dest: '<%= site.development %>bower_components/flexslider/',
                       rename: function(dest, src) {
                           return dest + "flexslider.less";
                       }
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
            all: ['<%= site.destination %>/**/*.*']
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
    grunt.registerTask('build', ['clean:all','copy:less', 'less:development', 'copy:main', 'requirejs']);
};