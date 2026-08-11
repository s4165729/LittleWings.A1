 
 
const StartStopButton = document.getElementById("startstopbutton");
const DayNightButton = document.getElementById("daynightbutton");
const mutebutton = document.getElementById("mutebutton");
const volumeDownButton = document.getElementById("volumedownbutton");
const volumeUpButton = document.getElementById("volumeupbutton");
const plane = document.getElementById("plane");
const clouds = document.querySelectorAll(".cloud");

//setting up the instrument with tone.polysynth lets more than one ring out at once, so 
//user holds two clouds on together it plays a chord instead of cutting off//
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

//play the audio until the user has clicked something once//
let audtioHasStarted = false;

async function startAudioIfNeeded() {
    if (!audioHasStarted) {
        await Tone.start();
        audioHasStarted = true;
    }
}

//start/stop buttons that make the plane fly//

 StartStopButton.addEventListener("click", async function() {
    await startAudioIfNeeded();

    plane.classList.add("flying");

    if (plane.classList.contains("flying")) {
        StartStopButton.textContent = "⏸";
    }else{
        StartStopButton.textContent = "▶";
    }
    });

    //volume controls//
    synth.volume.value = -8;

    volumeUpButton.addEventListener("click", function () {
        synth.volume.vule = Math.min(synth,volume.value + 6,0);
    });

    volumeDownButton.addEventListener("click",function () {
        synth.volume.value = Math.max(synth.volume.value -6, -30);
    });

    mutebutton.addEventListener("click", function () {
        synth.mute = !synth.mute;
        mutebutton.textContent = synth.mute ? "🎶" : "🎶";
    });

    //day/night button//
    DayNightButton.addEventListener("click", function () {
        document.body.classList.toggle("night");

        if (document.body.classList.contains("night")) {
            DayNightButton.textContent="*";
        } else{
            DayNightButton.textContent="🌙";
        }
    });

    //clouds - allow users to tap a notes, and then tap again to stop it
    //one listener per cloud but they all share the same code/function
    clouds.forEach(function (cloud) {
        cloud.addEventListener("click",async function () {
            await startAudioIfNeeded();

            const note = cloud.dataset.note; 
             
            if (cloud.classList.contains("playing")) {
                synth.triggerRealease(note); 
                cloud.classList.remove("playing");
            } else {
                synth.triggerAttack(note); 
                cloud.classList.add("playing");
            }
            
        });
    });