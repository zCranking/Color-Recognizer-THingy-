Webcam.set({
    width: 450,
    height: 400,
    image_format: 'png',
    png_quality: 100,
})

camera = document.getElementById("webcam");

Webcam.attach(camera);

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='selfie' src='" + data_uri + "'>";

    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/8QcjT3Njj/model.json", modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function check(){
    img = document.getElementById("selfie");
    classifier.classify(img , gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object-name").innerHTML = results[0].label;
        results = results[0].confidence.toFixed(2);
        document.getElementById("object-accuracy").innerHTML = results;
    }
}