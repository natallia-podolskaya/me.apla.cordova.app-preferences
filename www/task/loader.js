document.addEventListener('deviceready', function () {
  try {
    var mod = cordova.require('cordova-plugin-app-preferences.task.AppPreferences');
    window.plugins = window.plugins || {};
    window.plugins.appPreferences = window.plugins.appPreferences || {};
    window.plugins.appPreferences.task = mod;
  } catch (e) {
    console.log('[app-preferences task] lazy expose failed:', e);
  }
});
