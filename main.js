labels = [];
status = "";
video = "";
objects = [];
function preload() {
    video = createVideo('video.mp4');

}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects...";

}


function modelLoaded() {
    console.log("Model Initialized!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}


function draw() {
    image(video, 0, 0, 600, 400);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = (objects.length - 1); i >= 0; i--) {
            document.getElementById("status").innerHTML = "Status: Objects Detected!";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length;
            fill('blue');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('blue');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(labels.includes(objects[i].label)){
                continue;
                
            }
            labels[i] = objects[i].label;

        }
        console.log("Labels array - "+labels);
        document.getElementById("list_of_objects").innerHTML = "List of Objects detected is " + labels;
    }
}