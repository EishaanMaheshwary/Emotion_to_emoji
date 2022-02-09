var prediction_1;
var prediction_2;
Webcam.set({
    width:400,
    height:300,
    image_format:'png',
    png_quality:90
})
camera = document.getElementById("camera");
Webcam.attach( '#camera' );
function take_snapshot(){
Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+ data_uri + '"/>';
});
}
console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vu0YC8dYQ/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model loaded!");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+ speak_data2);
    synth.speak(utterThis);
}
function check(){
    img =document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
        window.alert(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_name_result1").innerHTML = results[0].label;
        document.getElementById("emotion_name_result2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("emoji_result1").innerHTML = "&#128522";
        }
        if(results[0].label == "Angry"){
            document.getElementById("emoji_result1").innerHTML = "&#128520";
        }
        if(results[0].label == "Sad"){
            document.getElementById("emoji_result1").innerHTML = "&#128545";
        }
        if(results[1].label == "Happy"){
            document.getElementById("emoji_result2").innerHTML = "&#128522";
        }
        if(results[1].label == "Angry"){
            document.getElementById("emoji_result2").innerHTML = "&#128520";
        }
        if(results[1].label == "Sad"){
            document.getElementById("emoji_result2").innerHTML = "&#128545";
        }
    }
}
