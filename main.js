 
 
const button = document.getElementById("startstopbutton");
const daynightbutton = document.getElementById("daynightbutton");

 button.addEventListener("click", function() {
        if (button.textContent === "▶") {
          button.textContent="⏯"
        } else {
             button.textContent = "▶︎";
     }
 });

daynightbutton.addEventListener("click", function() {
     if (daynightbutton.textContent ==="☾") {
        daynightbutton.textContent ="☼";
     }else {
        daynightbutton.textContent ="☾";
     }
 });

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
let audtioHasStarted = false;

//grab every cloud at once rather than writing one block per cloud//
const clouds=document.querySelectorAll(".cloud");

clouds.forEach(function (cloud) {
    cloud.addEventListener("click", async function () {
        if (!audtioHasStared) {
            await Tone.start();
            audioHasStarted=true;
        }
        const note = cloud.dataset.note;

        if (cloud.classList.contains("playing")) {
            synth.triggerRealse(note);
            cloud.classList.remove("playing");
        } else {
            synth.triggerAttack(note);
            cloud.classList.add("playing");
        }
    });
});