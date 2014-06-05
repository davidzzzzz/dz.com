'use strict';

require.config({
    paths: {
        'requireLib' : 'vendor/require',
        'jquery': 'vendor/jquery.min',
        'scrollTo' : 'vendor/jquery.scrollTo.min',
        'bootstrap': 'vendor/bootstrap.min',
        'easing': 'vendor/jquery.easing.min',
        'colorbox': 'vendor/jquery.colorbox-min',
        'photoSet': 'vendor/jquery.photoSet-grid.min'
    },
    "shim": {
        "easing": ["jquery"],
        "bootstrap": ["jquery"],
        "colorbox": ["jquery"],
        "photoSet": ["jquery"]
    }
});