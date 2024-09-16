//Browser source link: http://localhost:9090/bundles/portals/graphics/index.html

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

function stopCapture() {
    clearInterval(intervalID);
    let tracks = video.srcObject.getTracks();

    tracks.forEach((track) => track.stop());
    video.srcObject = null;
}

const startTesseractButton = document.querySelector("#tesseractTest");
startTesseractButton.addEventListener("click", () => { startCapture(options) });
const stopTesseractButton = document.querySelector("#stopTesseract");
stopTesseractButton.addEventListener("click", stopCapture);

function mirror() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.globalCompositeOperate = "source-over";
    ctx.filter = "grayscale(100%)";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    readPortal();
}

async function detectGameStart() {
    const { data: { hp1 } } = await worker.recognize(canvas, {
        rectangle: { top: 206, left: 1825, width: 25, height: 15 },
    });

    const { data: { hp2 } } = await worker.recognize(canvas, {
        rectangle: { top: 206, left: 1825, width: 25, height: 15 },
    });

    const { data: { hp3 } } = await worker.recognize(canvas, {
        rectangle: { top: 206, left: 1825, width: 25, height: 15 },
    });
    console.log([hp1, hp2, hp3]);

    // trigger game started state if 2/3 are = 100, listen for portal
}

async function readPortal() {
    const { data: { text } } = await worker.recognize(canvas, {
        rectangle: { top: 515, left: 628, width: 664, height: 88 },
    });
    console.log(text);
    portalReplicant.value = text.replace(/[^\d\w\s-\']/g, "");
    // await worker.terminate();

    // trigger portal selected state, listen for end of game
}

async function detectGameEnd() {
    // check for nth place text, trigger end of game, listen for next game
}