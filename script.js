var btnPlay = document.getElementById("play");
var freqInput = document.getElementById("freqIn");
var freqOutput = document.getElementById("freqOut");
var rdioSine = document.getElementById("sine");
var rdioSq = document.getElementById("sq");
var rdioSaw = document.getElementById("saw");
var rdioTri = document.getElementById("tri");

const CHANNELS = 1;
const SAMPLE_RATE = 44100;
const NUM_SECS = 2;

//wave stuff
var hertz = 440;                    //(f)requency = 1/T
var period = 1/hertz;               //T = 1/f
var omega = hertz * 2 * Math.PI;    //w = 2pi/T = 2pi * f

//handlers
var src;
var audctx;
var buffer;
var myArr;

//listeners
btnPlay.addEventListener("click", play);
freqInput.addEventListener("input", setFreq);
rdioSine.addEventListener("input", setFreq);
rdioSq.addEventListener("input", setFreq);
rdioSaw.addEventListener("input", setFreq);
rdioTri.addEventListener("input", setFreq);

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
    var returnVal = 0;

    var sineIsChecked = rdioSine.checked;
    var sqIsChecked = rdioSq.checked;
    var sawIsChecked = rdioSaw.checked;
    var triIsChecked = rdioTri.checked;

    let time = sampleNumber / SAMPLE_RATE;
    let angle = time * omega;

    //SINUSOIDAL
    if(sineIsChecked)
    {
        return Math.sin(angle);
    }
    //SQUARE
    if(sqIsChecked)
    {
        return Math.sign(Math.sin(angle));
    }
    //SAWTOOTH
    if(sawIsChecked)
    {
        returnVal = Math.sin(angle);
        for (harms = 1; harms < 100; harms++)
        {
            returnVal += (Math.sin(angle * harms))/harms;
        }
        return returnVal;
    }
    //TRIANGLE
    if(triIsChecked)
    {
        return Math.asin(Math.cos(angle));
    }
}

//Update
function setFreq()
{
    audctx.close();
    hertz = getFreq();
    period = 1/hertz;
    showValue(freqInput.value);
    omega = hertz * 2 * Math.PI;
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
