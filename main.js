 
 
const StartStopButton = document.getElementById("startstopbutton");
const DayNightButton = document.getElementById("daynightbutton");
const mutebutton = document.getElementById("mutebutton");
const plane = document.getElementById("plane");
const clouds = document.querySelectorAll(".cloud");

//piano sound instrument//
const piano = new Tone.sampler({
    urls: {
        C4: "C4.mp3",
        D4: "D4.mp3",
        E4: "E4.mp",
        F4: "F4.mp3",
        G4: "G4.mp3",
        A4: "A4.mp3",
        B4: "B4.mp3",
        C5: "C5.mp3"
    }, 

    baseUrl: "sounds/piano/"
}).toDestination();

let audioHasStarted =false;


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
    piano.volume.value = -8;

    mutebutton.addEventListener("click", function () {
        piano.mute= !piano.mute;
        if (piano.mute) {
            mutebutton.textContent = "🎶";
        }else{
            mutebutton.textContent="🎶";
        }
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
        cloud.addEventListener("click", async function () {
            await startAudioIfNeeded();
            const note = cloud.dataset.note;

            //play piano notes//
            piano.triggerAttackRelease(note,"2n");

            //cloud visually reacts
            cloud.classList.add("playing");

            setTimeout(function () {
                cloud.classList.remove("playing");
            }, 800);
        });
    });