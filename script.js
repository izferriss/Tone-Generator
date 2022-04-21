var btnPlay = document.getElementById("play");
var freqInput = document.getElementById("freqIn");
var freqOutput = document.getElementById("freqOut");

const CHANNELS = 1;
const SAMPLE_RATE = 44100;
const NUM_SECS = 2;

var freqReal = 440;
var freqAng = freqReal * 2 * Math.PI;
var src;
var audctx;
var buffer;
var myArr;

//Event listeners
btnPlay.addEventListener("click", play);
freqInput.addEventListener("input", setFreq);

//Initialize
window.onload = function ()
{
    showValue(freqInput.value);
    initialize();
};

//Initialize audio context and create sample
function initialize()
{
    audctx = new AudioContext();
    buffer = audctx.createBuffer(CHANNELS, SAMPLE_RATE * NUM_SECS, SAMPLE_RATE);
    myArr = buffer.getChannelData(0);
    for (let sampleNumber = 0 ; sampleNumber < SAMPLE_RATE * NUM_SECS ; sampleNumber++)
    {
        myArr[sampleNumber] = generateSample(sampleNumber);
    }
}

//Creates sinusodial sample
function generateSample(sampleNumber)
{
    let sampleTime = sampleNumber / SAMPLE_RATE;
    let sampleAngle = sampleTime * freqAng;
    return Math.sin(sampleAngle);
}

//Update
function setFreq()
{
    audctx.close();
    freqReal = getFreq();
    showValue(freqInput.value);
    freqAng = freqReal * 2 * Math.PI;
    audctx = new AudioContext();
    buffer = audctx.createBuffer(CHANNELS, SAMPLE_RATE * 2, SAMPLE_RATE);
    myArr = buffer.getChannelData(0);
    for (let sampleNumber = 0 ; sampleNumber < 88200 ; sampleNumber++)
    {
        myArr[sampleNumber] = generateSample(sampleNumber);
    }
}

//Returns value of slider
function getFreq()
{
    return (freqInput.value);
}

//Updates innerHTML of slider
function showValue(newVal)
{
    freqOutput.innerHTML = newVal;
}

//Plays the sample
function play()
{
    src = audctx.createBufferSource();
    src.buffer = buffer;
    src.connect(audctx.destination);
    src.start();
}

