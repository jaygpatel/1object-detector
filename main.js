img = "";
status1 = "";
objects = [];


function preload(){

    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size (380,380);
    video.hide();


    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
    

}

function draw(){

    image(video,0 ,0,380, 380);

    if(status1 != ""){
        r = random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
    

        for (var i = 0; i < objects.length; i=i+1){
            document.getElementById("status").innerHTML = "status: Object Detected";
            document.getElementById("number_of_objects").innerHTML= "number of objects detected are = "+objects.length;

            percent = floor(objects[i].confidence * 100)
            fill(r,g,b);
            text(objects[i].label + " " + percent + "%", objects[i].x+15,objects[i].y +15)
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y, objects[i].height, objects[i].width);

            
        }

    }



}

function modelLoaded(){

    console.log("Model Loaded!")
    status1  = true;
    
}

function gotResult(error,results){
    if(error){
        console.log("error");
    
    }

    console.log(results);
    objects = results;
}