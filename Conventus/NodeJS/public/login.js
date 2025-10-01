/*
const videoEl = document.querySelector("video");

navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {
        videoEl.srcObject = stream;
        videoEl.play();
    }
);

const RTC = new RTCPeerConnection();
*/

const videoIconEl = document.querySelector("#video-icon");

function normalize(x, y) {
    const svg = document.querySelector("#background");
    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;

    const normalizedX = (x / 100) * svgWidth;
    const normalizedY = (y / 100) * svgHeight;

    return [normalizedX, normalizedY];
}



function moveOnLine(movingEl, lineEl) {
    return new Promise(resolve => {

        const speed = 0.1;

        const [x1, y1] = normalize(lineEl.getAttribute("x1"), lineEl.getAttribute("y1"));
        const [x2, y2] = normalize(lineEl.getAttribute("x2"), lineEl.getAttribute("y2"));

        movingEl.style.left = `${x1}px`;
        movingEl.style.top = `${y1}px`;

        let oldTimeStamp = 0;

        function frame(timeStamp) {
            delta = timeStamp - oldTimeStamp;

            

            oldTimeStamp = timeStamp;
            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    });
}

moveOnLine(videoIconEl, document.querySelector("#connections-first"))
    .then(() => {

    });