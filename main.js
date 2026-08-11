const synth = new TouchEvent.PolySynth(Tone.Synth).toDestination();
let audtioHassStared = false;

//grab every cloud at once rather than writing one block per cloud//
const clouds=document.querySelectorAll(".cloud");

clouds.forEach(function(cloud)) {
    cloud.addEventListener("click", async function () {
        if (!audtioHassStared) {
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
}