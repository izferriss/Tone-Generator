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
var btnOctDec = document.getElementById("octDec");
var btnOctInc = document.getElementById("octInc");

var freqInput = document.getElementById("freqIn");
var freqOutput = document.getElementById("freqOut");
var rdioSine = document.getElementById("sine");
var rdioSq = document.getElementById("sq");
var rdioSaw = document.getElementById("saw");
var rdioTri = document.getElementById("tri");

var key_note_c = 'a';
var key_note_c_sharp = 'w';
var key_note_d = 's';
var key_note_d_sharp = 'e';
var key_note_e = 'd';
var key_note_f = 'f';
var key_note_f_sharp = 't';
var key_note_g = 'g';
var key_note_g_sharp = 'y';
var key_note_a = 'h';
var key_note_a_sharp = 'u';
var key_note_b = 'j';
var key_ctrl_oct_inc = '+';
var key_ctrl_oct_dec = '-';


const CHANNELS = 2;
const SAMPLE_RATE = 44100;
const NOTE_DURATION = 0.75;
const MIN_FREQ = 16.35;
const MAX_FREQ = 7902.13;

//notes
const c		= [16.35,32.70,65.41,130.81,261.63,523.25,1046.50,2093.00,4186.01];
const cS	= [17.32,34.65,69.30,138.59,277.18,554.37,1108.73,2217.46,4434.92];
const d		= [18.35,36.71,73.42,146.83,293.66,587.33,1174.66,2349.32,4698.63];
const dS	= [19.45,38.89,77.78,155.56,311.13,622.25,1244.51,2489.02,4978.03];
const e 	= [20.60,41.20,82.41,164.81,329.63,659.25,1318.51,2637.02,5274.04];
const f		= [21.83,43.65,87.31,174.61,349.23,698.46,1396.91,2793.83,5587.65];
const fS	= [23.12,46.25,92.50,185.00,369.99,739.99,1479.98,2959.96,5919.91];
const g		= [24.50,49.00,98.00,196.00,392.00,783.99,1567.98,3135.96,6271.93];
const gS	= [25.96,51.91,103.83,207.65,415.30,830.61,1661.22,3322.44,6644.88];
const a		= [27.50,55.00,110.00,220.00,440.00,880.00,1760.00,3520.00,7040.00];
const aS 	= [29.14,58.27,116.54,233.08,466.16,932.33,1864.66,3729.31,7458.62];
const b 	= [30.87,61.74,123.47,246.94,493.88,987.77,1975.53,3951.07,7902.13];

//wave stuff
var hertz = 440;                    //(f)requency = 1/T
var period = 1/hertz;               //T = 1/f
var omega = hertz * 2 * Math.PI;    //w = 2pi/T = 2pi * f
var secs = 2;                       //duration of wave
var filterFreqValue = document.getElementById("filterFreq");
var filterQualValue = document.getElementById("filterQual");

//handlers
var src;
var audctx = new AudioContext();
var buffer;
var myArr;
var active = [false, false, false, false, false , false, false, false , false, false, false, false];
var octave = 4;

//listeners
btnPlay.addEventListener("click", play);
freqInput.addEventListener("input", setFreq);
rdioSine.addEventListener("input", setFreq);
rdioSq.addEventListener("input", setFreq);
rdioSaw.addEventListener("input", setFreq);
rdioTri.addEventListener("input", setFreq);
filterFreqValue.addEventListener("input", setFilterFreqValue);
filterQualValue.addEventListener("input", setFilterQualValue);

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
btnOctDec.addEventListener("click", decOctave);
btnOctInc.addEventListener("click", incOctave);


//key down
document.addEventListener('keydown', event =>
{
    if(event.key === key_note_c)
    {
        if(!active[0])
        {
            active[0] = true;
            freqInput.value = btnC.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_c_sharp)
    {
        if(!active[1])
        {
            active[1] = true;
            freqInput.value = btnCSharp.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_d)
    {
        if(!active[2])
        {
            active[2] = true;
            freqInput.value = btnD.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_d_sharp)
    {
        if(!active[3])
        {
            active[3] = true;
            freqInput.value = btnDSharp.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_e)
    {
        if(!active[4])
        {
            active[4] = true;
            freqInput.value = btnE.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_f)
    {
        if(!active[5])
        {
            active[5] = true;
            freqInput.value = btnF.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_f_sharp)
    {
        if(!active[6])
        {
            active[6] = true;
            freqInput.value = btnFSharp.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_g)
    {
        if(!active[7])
        {
            active[7] = true;
            freqInput.value = btnG.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_g_sharp)
    {
        if(!active[8])
        {
            active[8] = true;
            freqInput.value = btnGSharp.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_a)
    {
        if(!active[9])
        {
            active[9] = true;
            freqInput.value = btnA.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_a_sharp)
    {
        if(!active[10])
        {
            active[10] = true;
            freqInput.value = btnASharp.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_b)
    {
        if(!active[11])
        {
            active[11] = true;
            freqInput.value = btnB.frequency;
            setFreq();
            play(true);
        }
    }
    if(event.key === key_ctrl_oct_dec)
    {
        btnOctDec.click();
    }
    if(event.key === key_ctrl_oct_inc)
    {
        btnOctInc.click();
    }
});

//key up
document.addEventListener('keyup', event =>
{
    if(event.key === key_note_c)
    {
        if(active[0])
        {
            src.disconnect();
            active[0] = false;
        }
    }
    if(event.key === key_note_c_sharp)
    {
        if(active[1])
        {
            src.disconnect();
            active[1] = false;
        }
    }
    if(event.key === key_note_d)
    {
        if(active[2])
        {
            src.stop();
            active[2] = false;
        }
    }
    if(event.key === key_note_d_sharp)
    {
        if(active[3])
        {
            src.stop();
            active[3] = false;
        }
    }
    if(event.key === key_note_e)
    {
        if(active[4])
        {
            src.stop();
            active[4] = false;
        }
    }
    if(event.key === key_note_f)
    {
        if(active[5])
        {
            src.stop();
            active[5] = false;
        }
    }
    if(event.key === key_note_f_sharp)
    {
        if(active[6])
        {
            src.stop();
            active[6] = false;
        }
    }
    if(event.key === key_note_g)
    {
        if(active[7])
        {
            src.stop();
            active[7] = false;
        }
    }
    if(event.key === key_note_g_sharp)
    {
        if(active[8])
        {
            src.stop();
            active[8] = false;
        }
    }
    if(event.key === key_note_a)
    {
        if(active[9])
        {
            src.stop();
            active[9] = false;
        }
    }
    if(event.key === key_note_a_sharp)
    {
        if(active[10])
        {
            src.stop();
            active[10] = false;
        }
    }
    if(event.key === key_note_b)
    {
        if(active[11])
        {
            src.stop();
            active[11] = false;
        }
    }
    if(event.key === key_ctrl_oct_dec)
    {
        btnOctDec.click();
    }
    if(event.key === key_ctrl_oct_inc)
    {
        btnOctInc.click();
    }
});

//Initialize
window.onload = function ()
{
    initialize();
};

//Initialize audio context and create sample
function initialize()
{
    setNotes();
    showValue(freqInput.value);
    displayOctave();
    createBuffer();
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
    //audctx.close();
    hertz = getFreq();
    period = 1/hertz;
    showValue(freqInput.value);
    omega = hertz * 2 * Math.PI;
    createBuffer();
    displayOctave();
}

//Returns value of slider
function getFreq()
{
    return (freqInput.value);
}

//Sets value of slider
function setHz(hz, loopVal)
{
    freqInput.value = hz.currentTarget.frequency;
    setFreq();
    play(false);
}

//Updates innerHTML of slider
function showValue(newVal)
{
    freqOutput.innerHTML = newVal;
}

//Plays the sample
function play(isLooped)
{
    src = audctx.createBufferSource();
    var qMultiplier = 30;
    var gainNode = audctx.createGain();
    var filterNode = audctx.createBiquadFilter();
    var minFilterFreq = MIN_FREQ;
    var maxFilterFreq = audctx.sampleRate /2;
    var numberOfOctaves = Math.log(maxFilterFreq / minFilterFreq) / Math.LN2;
    var multiplier = Math.pow(2, numberOfOctaves * (getFilterFreqValue() - 1.0));


    //Creates a filter based on drop down selection
    switch (document.getElementById("ddFilters").value)
    {
        case "none":
            break;
        case "lowpass":
            filterNode.type = 'lowpass';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        case "highpass":
            filterNode.type = 'highpass';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        case "bandpass":
            filterNode.type = 'bandpass';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        case "lowshelf":
            filterNode.type = 'lowshelf';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        case "highshelf":
            filterNode.type = 'highshelf';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        case "peaking":
            filterNode.type = 'peaking';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        case "notch":
            filterNode.type = 'notch';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        case "allpass":
            filterNode.type = 'allpass';
            filterNode.frequency.value = multiplier * maxFilterFreq;
            filterNode.Q.value = filterQualValue.value * qMultiplier;
            break;
        default:
            break;
    }

    var currTime = audctx.currentTime;
    gainNode.gain.linearRampToValueAtTime(0, currTime  + NOTE_DURATION);
    src.buffer = buffer;
    src.loop = isLooped;
    src.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audctx.destination);
    src.start();
}

//Updates all displays having to do with the octave
function displayOctave()
{
    document.getElementById("octDisplay").innerHTML = "&nbsp;" + octave + "&nbsp;";
    btnC.innerHTML = "C" + octave + "<BR><span class='caption'>(" + key_note_c +")</span>";
    btnCSharp.innerHTML = "C#" + octave + "<BR><span class='caption'>(" + key_note_c_sharp +")</span>";
    btnD.innerHTML = "D" + octave + "<BR><span class='caption'>(" + key_note_d +")</span>";
    btnDSharp.innerHTML = "D#" + octave + "<BR><span class='caption'>(" + key_note_d_sharp +")</span>";
    btnE.innerHTML = "E" + octave + "<BR><span class='caption'>(" + key_note_e +")</span>";
    btnF.innerHTML = "F" + octave + "<BR><span class='caption'>(" + key_note_f +")</span>";
    btnFSharp.innerHTML = "F#" + octave + "<BR><span class='caption'>(" + key_note_f_sharp +")</span>";
    btnG.innerHTML = "G" + octave + "<BR><span class='caption'>(" + key_note_g +")</span>";
    btnGSharp.innerHTML = "G#" + octave  + "<BR><span class='caption'>(" + key_note_g_sharp +")</span>";
    btnA.innerHTML = "A" + octave  + "<BR><span class='caption'>(" + key_note_a +")</span>";
    btnASharp.innerHTML = "A#" + octave  + "<BR><span class='caption'>(" + key_note_a_sharp +")</span>";
    btnB.innerHTML = "B" + octave  + "<BR><span class='caption'>(" + key_note_b +")</span>";
}

//Increases octave if able and updates frequencies accordingly
function incOctave()
{
    if (octave == 8)
    {
        octave = 8;
    }
    else
    {
        octave++;
    }
    displayOctave();
    setNotes();
}

//Decreases octave if able and updates frequencies accordingly
function decOctave()
{
    if (octave == 0)
    {
        octave = 0;
    }
    else
    {
        octave--;
    }
    displayOctave();
    setNotes();
}

//Sets the frequencies for each note depending on the selected octave
function setNotes()
{
    btnA.frequency = a[octave];
    btnASharp.frequency = aS[octave];
    btnB.frequency = b[octave];
    btnC.frequency = c[octave];
    btnCSharp.frequency = cS[octave];
    btnD.frequency = d[octave];
    btnDSharp.frequency = dS[octave];
    btnE.frequency = e[octave];
    btnF.frequency = f[octave];
    btnFSharp.frequency = fS[octave];
    btnG.frequency = g[octave];
    btnGSharp.frequency = gS[octave];
}

function createBuffer()
{
    buffer = audctx.createBuffer(CHANNELS, SAMPLE_RATE * NOTE_DURATION, SAMPLE_RATE);
    myArr = buffer.getChannelData(0);
    for (let sampleNumber = 0 ; sampleNumber < SAMPLE_RATE * NOTE_DURATION ; sampleNumber++)
    {
        myArr[sampleNumber] = generateSample(sampleNumber);
    }
}

function setFilterFreqValue()
{
    filterFreqValue.value = getFilterFreqValue();
}

function setFilterQualValue()
{
    filterQualValue.value = getFilterQualValue();
}

function getFilterFreqValue()
{
    return (filterFreqValue.value);
}

function getFilterQualValue()
{
    return (filterQualValue.value);
}
