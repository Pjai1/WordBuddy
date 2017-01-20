angular.module('starter', ['ionic'])
 
.controller('AppCtrl', function($scope, $http) {
  $scope.data = {
    speechText: ""
  };
  $scope.recognizedText = "";
  $scope.selectedLanguage = "";
  $scope.recordedLanguage = "";
  $scope.changeLanguage = function(selectedLanguage) {
    $scope.selectedLanguage = selectedLanguage;
    console.log($scope.selectedLanguage);
  }
  $scope.changeRecordedLanguage = function(recordedLanguage) {
    $scope.recordedLanguage = recordedLanguage;
    console.log($scope.recordedLanguage);
  }
  $scope.textToTranslate = "";


 
  $scope.speakText = function() {
    if (window.cordova) {
      console.log($scope.selectedLanguage);
        TTS.speak({
            text: $scope.data.speechText,
            locale: $scope.selectedLanguage,
            rate: 1.1
          }, function () {
            }, function (reason) {
              console.log(reason);
          });
    }
  };
 
  $scope.record = function() {
    var recognition = new SpeechRecognition();
    $scope.textToTranslate = "";
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.textToTranslate = event.results[0][0].transcript;
            $scope.$apply();
        }
    };
    recognition.start();
  };

  $scope.translateSpeak = function() {
    var apiKey = 'trnsl.1.1.20170115T001645Z.3796a73ae92b9523.06c54f46db24a65471f340dd23cc39e9d4ff6966';
    var str = "";
    var substr1 = $scope.selectedLanguage.substring(0,2);
    var substr2 = $scope.recordedLanguage.substring(0,2);
    var lang = substr1+'-'+substr2;

    // console.log($scope.selectedLanguage.substring(0,2));

    // var request = {
    //   method: 'POST',
    //   url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    //   headers: {
    //     'Content-Type': undefined
    //   },
    //   data: {
    //     key: apiKey,
    //     text: $scope.data.speechText,
    //     lang: lang
    //   }
    // };

    // $http(request).then(function(success){
    //   console.log(success);
    //   str = JSON.stringify(success);
    //   $scope.data.speechText = str['text'];
    // }, 
    // function(error){
    //     console.log(error);
    //   });

    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+apiKey+'&lang='+lang+'&text='+$scope.data.speechText, function(data) {
      $scope.data.speechText = data.text;
      $scope.$apply();
    });

    };

  $scope.translateRecord = function() {
    var apiKey = 'trnsl.1.1.20170115T001645Z.3796a73ae92b9523.06c54f46db24a65471f340dd23cc39e9d4ff6966';
    var str = "";
    var substr1 = $scope.selectedLanguage.substring(0,2);
    var substr2 = $scope.recordedLanguage.substring(0,2);
    var lang = substr1+'-'+substr2;

    // var request = {
    //   method: 'POST',
    //   url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    //   headers: {
    //     'Content-Type': undefined
    //   },
    //   data: {
    //     key: apiKey,
    //     text: $scope.textToTranslate,
    //     lang: lang
    //   }
    // };

    // $http(request).then(function(success){
    //   console.log(success);
    //   str = JSON.stringify(success);
    //   $scope.textToTranslate = str['text'];
    // }, 
    // function(error){
    //     console.log(error);
    //   });
    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+apiKey+'&lang='+lang+'&text='+$scope.textToTranslate, function(data) {
      $scope.textToTranslate = data.text;
      $scope.$apply();
    });

    };
});