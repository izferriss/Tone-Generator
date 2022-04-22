var btnPlay = document.getElementById("play");

var btnA = document.getElementById("A");
var btnASharp = document.getElementById("A#");
var btnB = document.getElementById("B");
var btnC = document.getElementById("C");
var btnCSharp = document.getElementById("C#");
var btnD = document.getElementById("D");
var btnDSharp = document.getElementById("D#");
var btnE = document.getElementById("E");
var btnF = document.getElementById("F");
var btnFSharp = document.getElementById("F#");
var btnG = document.getElementById("G");
var btnGSharp = document.getElementById("G#");

var freqInput = document.getElementById("freqIn");
var freqOutput = document.getElementById("freqOut");
var rdioSine = document.getElementById("sine");
var rdioSq = document.getElementById("sq");
var rdioSaw = document.getElementById("saw");
var rdioTri = document.getElementById("tri");

const CHANNELS = 1;
const SAMPLE_RATE = 44100;

//wave stuff
var hertz = 440;                    //(f)requency = 1/T
var period = 1/hertz;               //T = 1/f
var omega = hertz * 2 * Math.PI;    //w = 2pi/T = 2pi * f
var secs = 2;                       //duration of wave

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

btnA.addEventListener("click", setHz);
btnASharp.addEventListener("click", setHz);
btnB.addEventListener("click", setHz);
btnC.addEventListener("click", setHz);
btnCSharp.addEventListener("click", setHz);
btnD.addEventListener("click", setHz);
btnDSharp.addEventListener("click", setHz);
btnE.addEventListener("click", setHz);
btnF.addEventListener("click", setHz);
btnFSharp.addEventListener("click", setHz);
btnG.addEventListener("click", setHz);
btnGSharp.addEventListener("click", setHz);
document.addEventListener("keypress", event =>
{
    if(event.key === '1')
    {
        btnA.click();
    }
    if(event.key === '2')
    {
        btnASharp.click();
    }
    if(event.key === '3')
    {
        btnB.click();
    }
    if(event.key === '4')
    {
        btnC.click();
    }
    if(event.key === '5')
    {
        btnCSharp.click();
    }
    if(event.key === '6')
    {
        btnD.click();
    }
    if(event.key === '7')
    {
        btnDSharp.click();
    }
    if(event.key === '8')
    {
        btnE.click();
    }
    if(event.key === '9')
    {
        btnF.click();
    }
    if(event.key === '0')
    {
        btnFSharp.click();
    }
    if(event.key === '-')
    {
        btnG.click();
    }
    if(event.key === '=')
    {
        btnGSharp.click();
    }
});

//Key params
btnA.frequency = 440;
btnASharp.frequency = 466.2;
btnB.frequency = 493.9;
btnC.frequency = 523.3;
btnCSharp.frequency = 554.4;
btnD.frequency = 587.3;
btnDSharp.frequency = 622.3;
btnE.frequency = 659.3;
btnF.frequency = 698.5;
btnFSharp.frequency = 740;
btnG.frequency = 784;
btnGSharp.frequency = 830.6;




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
        for (harms = 1; harms < 13; harms++)
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

//Sets value of slider
function setHz(hz)
{
    freqInput.value = hz.currentTarget.frequency;
    setFreq();
    play();
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

