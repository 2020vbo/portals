// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
import Tesseract from "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js";

const portalReplicant = nodecg.Replicant("portalName");
portalReplicant.on("change", value => {
    document.querySelector("#portal").innerHTML = value;
});

// const { createWorker } = require("tesseract.js");

const worker = await Tesseract.createWorker("eng");
// const image = new File(["img"], "testing/augpay.png");

const img = document.getElementById("testimg");

// console.log("a");
// console.log(image.lastModifiedDate);
// console.log("b");

(async () => {
    const { data: { text} } = await worker.recognize(img);
    console.log(text);
    portalReplicant.value = text;
    // await worker.terminate();
})();

const options = {
    video: {
        displaySurface: "window"
    },
    audio: false
};

const video = document.querySelector("#screenshare");
const canvas = document.getElementById("canvas");

async function startCapture(displayMediaOptions) {
    try {
        video.srcObject = 
            await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        console.log(video.srcObject);
        setInterval(mirror, 1000);
    } catch (err) {
        console.error(err);
    }
}

startCapture(options);

function mirror() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    (async () => {
        const { data: { text} } = await worker.recognize(canvas);
        console.log(text);
        // await worker.terminate();
    })();
}