var song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWristY = 0;
scorerightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}
function modelLoaded()
{
    console.log("Posenet is Initialized!")
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scorerightWristY > 0.2)
    {
    circle(rightWristX, rightWristY, 20);

    if(rightWristY >0 && rightWristY <=100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    if(rightWristY >200 && rightWristY <=300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    if(rightWristY >300 && rightWristY <=400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    if(rightWristY >400 && rightWristY <=500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

    if(scoreleftWristY > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWristY = results[0].pose.keypoints[9].score;
        scorerightWristY = results[0].pose.keypoints[10].score;
        console.log("scoreleftWristY is " + scoreleftWristY + " and " + "scorerightWristY is " + scorerightWristY)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX is "+ leftWristX + " LeftWristY is "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX is "+ rightWristX + " RightWristY is "+ rightWristY);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}