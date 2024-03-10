// don't need cuz of cdn
// import Tesseract from "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js";

// const Tesseract = window.Tesseract;

const portalReplicant = nodecg.Replicant("portalName");
portalReplicant.on("change", value => {
    document.querySelector("#portal").innerHTML = value;
});

// const worker = await Tesseract.createWorker("eng");

// Tesseract on img element test
// const img = document.getElementById("testimg");

// (async () => {
//     const { data: { text} } = await worker.recognize(img);
//     console.log(text);
//     portalReplicant.value = text;
//     // await worker.terminate();
// })();

// const options = {
//     video: {
//         displaySurface: "window"
//     },
//     audio: false
// };

// const video = document.querySelector("#screenshare");
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// ctx.filter = "grayscale(100%)";

// async function startCapture(displayMediaOptions) {
//     try {
//         video.srcObject = 
//             await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
//         console.log(video.srcObject);
//         setInterval(mirror, 1000);
//     } catch (err) {
//         console.error(err);
//     }
// }

// startCapture(options);

// function mirror() {
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.globalCompositeOperate = "source-over";
//     ctx.filter = "grayscale(100%)";
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);    

//     (async () => {
//         const { data: { text} } = await worker.recognize(canvas);
//         console.log(text);
//         // await worker.terminate();
//     })();
// }