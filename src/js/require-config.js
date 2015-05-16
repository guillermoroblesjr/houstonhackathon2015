require.config({
  paths: {
    app: '',
    main: './main',

    // Bower Components

  },
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    Class: {
      exports: 'Class'
    },
    angular: {
      exports: 'angular'
    }
  },
});
