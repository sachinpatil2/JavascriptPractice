function successCallback(result) {
    console.log('In success callback: ' + result);
}

function failureCallback(error) {
    console.log('In error callBack.: ' + error);
}
createAudioFileAsync(audiosettings, successCallback, failureCallback);

