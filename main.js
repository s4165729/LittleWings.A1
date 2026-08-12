 
 
const startStopButton = document.getElementById("startstopbutton");
const dayNightButton = document.getElementById("daynightbutton");
const infoButton = document.getElementById("infoButton");
const mutebutton = document.getElementById("mutebutton");
const volumeDownButton = document.getElementById("volumedownbutton");
const volumeUpButton = document.getElementById("volumeupbutton");
const modalOverlay = document.getElementById("modal-overlay");
const modalCloseButton = document.getElementById("modal-close");
const modalCloseX = document.getElementById("modal-close-x");
const plane = document.getElementById("plane");
const clouds = document.querySelectorAll(".cloud");

//piano sound instrument//
const piano = new Tone.Sampler({
    urls: {
        C4: "C4.mp3", 
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
    }, 
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/","
}).toDestination();

const planeSynth = new Tone.Synth({
    oscillator: {type: "triangle" },
}). toDestination();

let audioHasStarted =false;

async function startAudioIfNeeded() {
    if (!audioHasStarted) {
        await Tone.start();
        audioHasStarted = true;
    }
}

Tone.getDestination().volume.value= -8;

volumeUpButton.addEventListener("click", function () {
    const current = Tone.getDestination().volume.value;
    Tone.getDestination().volume.value=Math.min(current + 6,0);
});

volumeDownButton.addEventListener("click", function () {
    const current = Tone.getDestination().volume.value;
    Tone.getDestination().volume.value=Math.max(current + 6,-30);
});

mutebutton.addEventListener("click", function () {
    Tone.getDestination().mute=!Tone.getDestination().mute;
    mutebutton.textContent=Tone.getDestination().mute ? "🔊" : "🔊" ; 
});

StartStopButton.addEventListener("click", async function () {
    await startAudioIfNeeded();
    plane.classList.toggle("flying");
    plane.classList.toggle("flying");
    StartStopButton.textContent = plane.classList.contains("flying")? "⏸" : "▶";
});

dayNightButton.addEventListener("click", function () {
    document.body.classList.toggle("night");
    dayNightButton.textContent=document.body.classList.contains("night")? "☼" : "☾";
});

infoButton.addEventListener("click", function () {
    modalOverlay.classList.remove("hidden");
});

modalCloseButton.addEventListener("click", function () {
    modalOverlay.classList.add("hidden");
});

modalCloseX.addEventListener("click", function () {
    modalOverlay.classList.add("hidden");
});

let planeIsUp = false;

plane.addEventListener("click", async function () {
    await startAudioIfNeeded();

    if (planeIsUp) {
        plane.style.top = "50%";
        planeSynth.triggerAttackRelease("A3", "4n");
    } else {
        plane.style.top = "30%";
        planeSynth.triggerAttackRelease("A4", "4n");
    }

    planeIsUp = !planeIsUp;
});

    //clouds - allow users to tap a notes, and then tap again to stop it
    //one listener per cloud but they all share the same code/function

    clouds.forEach(function (cloud) {
        cloud.addEventListener("click", async function () {
            await startAudioIfNeeded();
            const note = cloud.dataset.note;

            if (cloud.classList.contains("playing")) {
                piano.triggerRealse(note);
                cloud.classList,remove("playing");
            } else {
                piano.triggerAttack(note);
                cloud.classList.add("playing");
            }
        });
    });