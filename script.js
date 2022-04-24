//Play button control
var btnPlay = document.getElementById("play");

//Note buttons
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

//Frequency slider controls
var freqInput = document.getElementById("freqIn");
var freqOutput = document.getElementById("freqOut");

//Waveform controls
var rdioSine = document.getElementById("sine");
var rdioSq = document.getElementById("sq");
var rdioSaw = document.getElementById("saw");
var rdioTri = document.getElementById("tri");

//Filter Controls
var checkbox_low_pass = document.getElementById("check_low_pass");
var slider_low_pass_freq = document.getElementById("slider_low_pass_freq");
var output_low_pass_freq = document.getElementById("low_pass_freq_out");
var slider_low_pass_Q = document.getElementById("slider_low_pass_Q");
var output_low_pass_Q = document.getElementById("low_pass_Q_out");

var checkbox_high_pass = document.getElementById("check_high_pass");
var slider_high_pass_freq = document.getElementById("slider_high_pass_freq");
var output_high_pass_freq = document.getElementById("high_pass_freq_out");
var slider_high_pass_Q = document.getElementById("slider_high_pass_Q");
var output_high_pass_Q = document.getElementById("high_pass_Q_out");

var checkbox_band_pass = document.getElementById("check_band_pass");
var slider_band_pass_freq = document.getElementById("slider_band_pass_freq");
var output_band_pass_freq = document.getElementById("band_pass_freq_out");
var slider_band_pass_Q = document.getElementById("slider_band_pass_Q");
var output_band_pass_Q = document.getElementById("band_pass_Q_out");

var checkbox_low_shelf = document.getElementById("check_low_shelf");
var slider_low_shelf_freq = document.getElementById("slider_low_shelf_freq");
var output_low_shelf_freq = document.getElementById("low_shelf_freq_out");
var slider_low_shelf_Q = document.getElementById("slider_low_shelf_Q");
var output_low_shelf_Q = document.getElementById("low_shelf_Q_out");

var checkbox_high_shelf = document.getElementById("check_high_shelf");
var slider_high_shelf_freq = document.getElementById("slider_high_shelf_freq");
var output_high_shelf_freq = document.getElementById("high_shelf_freq_out");
var slider_high_shelf_Q = document.getElementById("slider_high_shelf_Q");
var output_high_shelf_Q = document.getElementById("high_shelf_Q_out");

var checkbox_peaking = document.getElementById("check_peaking");
var slider_peaking_freq = document.getElementById("slider_peaking_freq");
var output_peaking_freq = document.getElementById("peaking_freq_out");
var slider_peaking_Q = document.getElementById("slider_peaking_Q");
var output_peaking_Q = document.getElementById("peaking_Q_out");

var checkbox_notch = document.getElementById("check_notch");
var slider_notch_freq = document.getElementById("slider_notch_freq");
var output_notch_freq = document.getElementById("notch_freq_out");
var slider_notch_Q = document.getElementById("slider_notch_Q");
var output_notch_Q = document.getElementById("notch_Q_out");

var checkbox_all_pass = document.getElementById("check_all_pass");
var slider_all_pass_freq = document.getElementById("slider_all_pass_freq");
var output_all_pass_freq = document.getElementById("all_pass_freq_out");
var slider_all_pass_Q = document.getElementById("slider_all_pass_Q");
var output_all_pass_Q = document.getElementById("all_pass_Q_out");

//Keyboard symbols
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
var key_ctrl_space = ' ';


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

//variables
var src;
var audctx = new AudioContext();
var buffer;
var myArr;
var keyIsActive = [false, false, false, false, false , false, false, false , false, false, false, false, false, false, false];
var octave = 4;
var filter_low_pass_freq = 0;
var filter_low_pass_Q = 0;
var filter_high_pass_freq = 0;
var filter_high_pass_Q = 0;
var filter_band_pass_freq = 0;
var filter_band_pass_Q = 0;
var filter_low_shelf_freq = 0;
var filter_low_shelf_Q = 0;
var filter_high_shelf_freq = 0;
var filter_high_shelf_Q = 0;
var filter_peaking_freq = 0;
var filter_peaking_Q = 0;
var filter_notch_freq = 0;
var filter_notch_Q = 0;
var filter_all_pass_freq = 0;
var filter_all_pass_Q = 0;

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
btnOctDec.addEventListener("click", decOctave);
btnOctInc.addEventListener("click", incOctave);

slider_low_pass_freq.addEventListener("input", setLowPassFreq);
slider_low_pass_Q.addEventListener("input", setLowPassQ);
slider_high_pass_freq.addEventListener("input", setHighPassFreq);
slider_high_pass_Q.addEventListener("input", setHighPassQ);
slider_band_pass_freq.addEventListener("input", setBandPassFreq);
slider_band_pass_Q.addEventListener("input", setBandPassQ);
slider_low_shelf_freq.addEventListener("input", setLowShelfFreq);
slider_low_shelf_Q.addEventListener("input", setLowShelfQ);
slider_high_shelf_freq.addEventListener("input", setHighShelfFreq);
slider_high_shelf_Q.addEventListener("input", setHighShelfQ);
slider_peaking_freq.addEventListener("input", setPeakingFreq);
slider_peaking_Q.addEventListener("input", setPeakingQ);
slider_notch_freq.addEventListener("input", setNotchFreq);
slider_notch_Q.addEventListener("input", setNotchQ);
slider_all_pass_freq.addEventListener("input", setAllPassFreq);
slider_all_pass_Q.addEventListener("input", setAllPassQ);


//key down
document.addEventListener('keydown', event =>
{
    if(event.key === key_note_c)
    {
        if(!keyIsActive[0])
        {
            keyIsActive[0] = true;
            freqInput.value = btnC.frequency;
            btnC.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_c_sharp)
    {
        if(!keyIsActive[1])
        {
            keyIsActive[1] = true;
            freqInput.value = btnCSharp.frequency;
            btnCSharp.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_d)
    {
        if(!keyIsActive[2])
        {
            keyIsActive[2] = true;
            freqInput.value = btnD.frequency;
            btnD.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_d_sharp)
    {
        if(!keyIsActive[3])
        {
            keyIsActive[3] = true;
            freqInput.value = btnDSharp.frequency;
            btnDSharp.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_e)
    {
        if(!keyIsActive[4])
        {
            keyIsActive[4] = true;
            freqInput.value = btnE.frequency;
            btnE.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_f)
    {
        if(!keyIsActive[5])
        {
            keyIsActive[5] = true;
            freqInput.value = btnF.frequency;
            btnF.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_f_sharp)
    {
        if(!keyIsActive[6])
        {
            keyIsActive[6] = true;
            freqInput.value = btnFSharp.frequency;
            btnFSharp.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_g)
    {
        if(!keyIsActive[7])
        {
            keyIsActive[7] = true;
            freqInput.value = btnG.frequency;
            btnG.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_g_sharp)
    {
        if(!keyIsActive[8])
        {
            keyIsActive[8] = true;
            freqInput.value = btnGSharp.frequency;
            btnGSharp.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_a)
    {
        if(!keyIsActive[9])
        {
            keyIsActive[9] = true;
            freqInput.value = btnA.frequency;
            btnA.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_a_sharp)
    {
        if(!keyIsActive[10])
        {
            keyIsActive[10] = true;
            freqInput.value = btnASharp.frequency;
            btnASharp.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_note_b)
    {
        if(!keyIsActive[11])
        {
            keyIsActive[11] = true;
            freqInput.value = btnB.frequency;
            btnB.classList.add("active");
            setFreq();
            play(true);
        }
    }
    if(event.key === key_ctrl_oct_dec)
    {
        if(!keyIsActive[12])
        {
            keyIsActive[12] = true;
            btnOctDec.classList.add("active");
            btnOctDec.click();
        }
    }
    if(event.key === key_ctrl_oct_inc)
    {
        if(!keyIsActive[13])
        {
            keyIsActive[13] = true;
            btnOctInc.classList.add("active");
            btnOctInc.click();
        }
    }
    if(event.key === key_ctrl_space)
    {
        if(!keyIsActive[14])
        {
            keyIsActive[14] = true;
            btnPlay.classList.add("active");
            play(true);
        }
    }
});

//key up
document.addEventListener('keyup', event =>
{
    if(event.key === key_note_c)
    {
        if(keyIsActive[0])
        {
            src.disconnect();
            btnC.classList.remove("active");
            keyIsActive[0] = false;
        }
    }
    if(event.key === key_note_c_sharp)
    {
        if(keyIsActive[1])
        {
            src.disconnect();
            btnCSharp.classList.remove("active");
            keyIsActive[1] = false;
        }
    }
    if(event.key === key_note_d)
    {
        if(keyIsActive[2])
        {
            src.stop();
            btnD.classList.remove("active");
            keyIsActive[2] = false;
        }
    }
    if(event.key === key_note_d_sharp)
    {
        if(keyIsActive[3])
        {
            src.stop();
            btnDSharp.classList.remove("active");
            keyIsActive[3] = false;
        }
    }
    if(event.key === key_note_e)
    {
        if(keyIsActive[4])
        {
            src.stop();
            btnE.classList.remove("active");
            keyIsActive[4] = false;
        }
    }
    if(event.key === key_note_f)
    {
        if(keyIsActive[5])
        {
            src.stop();
            btnF.classList.remove("active");
            keyIsActive[5] = false;
        }
    }
    if(event.key === key_note_f_sharp)
    {
        if(keyIsActive[6])
        {
            src.stop();
            btnFSharp.classList.remove("active");
            keyIsActive[6] = false;
        }
    }
    if(event.key === key_note_g)
    {
        if(keyIsActive[7])
        {
            src.stop();
            btnG.classList.remove("active");
            keyIsActive[7] = false;
        }
    }
    if(event.key === key_note_g_sharp)
    {
        if(keyIsActive[8])
        {
            src.stop();
            btnGSharp.classList.remove("active");
            keyIsActive[8] = false;
        }
    }
    if(event.key === key_note_a)
    {
        if(keyIsActive[9])
        {
            src.stop();
            btnA.classList.remove("active");
            keyIsActive[9] = false;
        }
    }
    if(event.key === key_note_a_sharp)
    {
        if(keyIsActive[10])
        {
            src.stop();
            btnASharp.classList.remove("active");
            keyIsActive[10] = false;
        }
    }
    if(event.key === key_note_b)
    {
        if(keyIsActive[11])
        {
            src.stop();
            btnB.classList.remove("active");
            keyIsActive[11] = false;
        }
    }
    if(event.key === key_ctrl_oct_dec)
    {
        if(keyIsActive[12])
        {
            btnOctDec.classList.remove("active");
            keyIsActive[12] = false;
        }
    }
    if(event.key === key_ctrl_oct_inc)
    {
        if(keyIsActive[13])
        {
            btnOctInc.classList.remove("active");
            keyIsActive[13] = false;
        }
    }
    if(event.key === key_ctrl_space)
    {
        if(keyIsActive[14])
        {
            btnPlay.classList.remove("active");
            keyIsActive[14] = false;
        }
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
    initFilterVals();
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
    freqOutput.innerHTML = newVal + " Hz";
}

function nyquist()
{
    return audctx.sampleRate/2;
}

function normalizedCutoffoHz(normalizedFreq, numOctaves)
{
    var f = new Number(normalizedFreq);
    f = nyquist() * Math.pow(2.0, numOctaves * (f - 1.0));
    return f;
}

//Plays the sample
function play(isLooped)
{
    src = audctx.createBufferSource();
    var gainNode = audctx.createGain();
    var Q, freq;

    var filterNode = audctx.createBiquadFilter();

    if(checkbox_low_pass.checked)
    {
        freq = filter_low_pass_freq;
        Q = filter_low_pass_Q;
        filterNode.type = "lowpass";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(checkbox_high_pass.checked)
    {
        freq = filter_high_pass_freq;
        Q = filter_high_pass_Q;
        filterNode.type = "highpass";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(checkbox_band_pass.checked)
    {
        freq = filter_band_pass_freq;
        Q = filter_band_pass_Q;
        filterNode.type = "bandpass";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(checkbox_low_shelf.checked)
    {
        freq = filter_low_shelf_freq;
        Q = filter_low_shelf_Q;
        filterNode.type = "lowshelf";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(checkbox_high_shelf.checked)
    {
        freq = filter_high_shelf_freq;
        Q = filter_high_shelf_Q;
        filterNode.type = "highshelf";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(checkbox_peaking.checked)
    {
        freq = filter_peaking_freq;
        Q = filter_peaking_Q;
        filterNode.type = "peaking";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(checkbox_notch.checked)
    {
        freq = filter_notch_freq;
        Q = filter_notch_Q;
        filterNode.type = "notch";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(checkbox_all_pass.checked)
    {
        freq = filter_all_pass_freq;
        Q = filter_all_pass_Q;
        filterNode.type = "allpass";
        filterNode.frequency.value = freq;
        filterNode.Q.value = Q;
    }
    if(!checkbox_low_pass.checked && !checkbox_high_pass.checked
        && !checkbox_band_pass.checked && !checkbox_low_shelf.checked
        && !checkbox_high_pass.checked && !checkbox_peaking.checked
        && !checkbox_notch.checked && !checkbox_all_pass.checked)
    {
        //No filters
    }

    var currTime = audctx.currentTime;
    gainNode.gain.value = 1;
    gainNode.gain.linearRampToValueAtTime(0.00001, currTime  + NOTE_DURATION);
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
    var superType;

    if(octave == 3)
    {
        superType = "rd Octave";
    }
    else if(octave == 2)
    {
        superType = "nd Octave";
    }
    else if(octave == 1)
    {
        superType = "st Octave";
    }
    else
    {
        superType = "th Octave";
    }

    document.getElementById("octDisplay").innerHTML = octave + superType;
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

function initFilterVals()
{
    setLowPassFreq();
    setLowPassQ();
    setHighPassFreq();
    setHighPassQ();
    setBandPassFreq();
    setBandPassQ();
    setLowShelfFreq();
    setLowShelfQ();
    setHighShelfFreq();
    setHighShelfQ();
    setPeakingFreq();
    setPeakingQ();
    setNotchFreq();
    setNotchQ();
    setAllPassFreq();
    setAllPassQ();
}

function cbChange(checkbox)
{
    var checkboxes = document.getElementsByClassName("filterboxes");
    for (var i = 0; i < checkboxes.length; i++)
    {
        checkboxes[i].checked = false;
    }

    if(checkbox.checked)
    {
        checkbox.checked = false;
    }
    else
    {
        checkbox.checked = true;
    }
}

function setLowPassFreq(){filter_low_pass_freq = slider_low_pass_freq.value; output_low_pass_freq.innerHTML = slider_low_pass_freq.value;}
function setLowPassQ(){filter_low_pass_Q = slider_low_pass_Q.value; output_low_pass_Q.innerHTML = slider_low_pass_Q.value;}
function setHighPassFreq(){filter_high_pass_freq = slider_high_pass_freq.value; output_high_pass_freq.innerHTML = slider_high_pass_freq.value;}
function setHighPassQ(){filter_high_pass_Q = slider_high_pass_Q.value; output_high_pass_Q.innerHTML = slider_high_pass_Q.value;}
function setBandPassFreq(){filter_band_pass_freq = slider_band_pass_freq.value; output_band_pass_freq.innerHTML = slider_band_pass_freq.value;}
function setBandPassQ(){filter_band_pass_Q = slider_band_pass_Q.value; output_band_pass_Q.innerHTML = slider_band_pass_Q.value;}
function setLowShelfFreq(){filter_low_shelf_freq = slider_low_shelf_freq.value; output_low_shelf_freq.innerHTML = slider_low_shelf_freq.value;}
function setLowShelfQ(){filter_low_shelf_Q = slider_low_shelf_Q.value; output_low_shelf_Q.innerHTML = slider_low_shelf_Q.value;}
function setHighShelfFreq(){filter_high_shelf_freq = slider_high_shelf_freq.value; output_high_shelf_freq.innerHTML = slider_high_shelf_freq.value;}
function setHighShelfQ(){filter_high_shelf_Q = slider_high_shelf_Q.value; output_high_shelf_Q.innerHTML = slider_high_shelf_Q.value;}
function setPeakingFreq(){filter_peaking_freq = slider_peaking_freq.value; output_peaking_freq.innerHTML = slider_peaking_freq.value;}
function setPeakingQ(){filter_peaking_Q = slider_peaking_Q.value; output_peaking_Q.innerHTML = slider_peaking_Q.value;}
function setNotchFreq(){filter_notch_freq = slider_notch_freq.value; output_notch_freq.innerHTML = slider_notch_freq.value;}
function setNotchQ(){filter_notch_Q = slider_notch_Q.value; output_notch_Q.innerHTML = slider_notch_Q.value;}
function setAllPassFreq(){filter_all_pass_freq = slider_all_pass_freq.value; output_all_pass_freq.innerHTML = slider_all_pass_freq.value;}
function setAllPassQ(){filter_all_pass_Q = slider_all_pass_Q.value; output_all_pass_Q.innerHTML = slider_all_pass_Q.value;}
