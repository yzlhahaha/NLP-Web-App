function checkformat (inputText) {
    const LanguageDetect = require('languagedetect');
    const lngDetector = new LanguageDetect();
    console.log("::: Running checkForInput :::", inputText);
    const result = lngDetector.detect(inputText);
    let checklist = [];
    for (let i = 0; i < result.length; i++) {
        checklist.push(result[i][0]);
    }
    if (checklist.includes('english')){
        alert("Input is valid, processing input.");
    } else {
        alert("Input seems invalid, the input will be processed, but the result may be inaccurate.")
    }
};

export {checkformat}