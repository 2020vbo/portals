// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:

document.querySelector("#set").addEventListener("click", setPortalName);
const portalReplicant = nodecg.Replicant("portalName");

function setPortalName() {
    const portal = document.querySelector("#setPortal").value;

    console.log("??");
    portalReplicant.value = portal;
}

portalReplicant.on("change", value => {
    document.querySelector("#setPortal").value = value;
});

const Tesseract = window.Tesseract;

const worker = await Tesseract.createWorker("eng");
let intervalID = null;

const options = {
    video: {
        displaySurface: "window"
    },
    audio: false
};

const video = document.querySelector("#screenshare");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

async function startCapture(displayMediaOptions) {
    try {
        video.srcObject = 
            await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        console.log(video.srcObject);
        intervalID = setInterval(mirror, 1000);
    } catch (err) {
        console.error(err);
    }
}

startCapture(options);

function mirror() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.globalCompositeOperate = "source-over";
    ctx.filter = "grayscale(100%)";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);    

    (async () => {
        const { data: { text} } = await worker.recognize(canvas, {
            rectangle: { top: 515, left: 628, width: 664, height: 88 },
        });
        console.log(text);
        portalReplicant.value = text.replace(/[^\d\w\s-]/g, "");
        // await worker.terminate();
    })();
}