(function() {
  'use strict';

  angular
    .module('deadFront')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider, $mdIconProvider) {

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // Set Theme
    $mdThemingProvider
    .definePalette('deadPalette', {
    '50': 'F1F8E9',
    '100': 'DCEDC8',
    '200': 'C5E1A5',
    '300': 'AED581',
    '400': '9CCC65',
    '500': '8BC34A',
    '600': '7CB342',
    '700': '689F38',
    '800': '558B2F',
    '900': '33691E',
    'A100': 'CCFF90',
    'A200': 'B2FF59',
    'A400': '76FF03',
    'A700': '64DD17',

    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined

    })
    .theme('default')
    .primaryPalette('deadPalette');


    $mdIconProvider
        .defaultFontSet('')
  }

})();
