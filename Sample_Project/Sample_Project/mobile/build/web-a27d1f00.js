import { q as WebPlugin, t as registerWebPlugin } from './webapi-79a1d3db.js';

class CameraPreviewWeb extends WebPlugin {
    constructor() {
        super({
            name: 'CameraPreview',
            platforms: ['web'],
        });
    }
    async start(options) {
        return new Promise(async (resolve, reject) => {
            await navigator.mediaDevices
                .getUserMedia({
                audio: !options.disableAudio,
                video: true
            })
                .then((stream) => {
                // Stop any existing stream so we can request media with different constraints based on user input
                stream.getTracks().forEach((track) => track.stop());
            })
                .catch((error) => {
                reject(error);
            });
            const video = document.getElementById('video');
            const parent = document.getElementById(options.parent);
            if (!video) {
                const videoElement = document.createElement('video');
                videoElement.id = 'video';
                videoElement.setAttribute('class', options.className || '');
                // Don't flip video feed if camera is rear facing
                if (options.position !== 'rear') {
                    videoElement.setAttribute('style', '-webkit-transform: scaleX(-1); transform: scaleX(-1);');
                }
                const userAgent = navigator.userAgent.toLowerCase();
                const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
                // Safari on iOS needs to have the autoplay, muted and playsinline attributes set for video.play() to be successful
                // Without these attributes videoElement.play() will throw a NotAllowedError
                // https://developer.apple.com/documentation/webkit/delivering_video_content_for_safari
                if (isSafari) {
                    videoElement.setAttribute('autoplay', 'true');
                    videoElement.setAttribute('muted', 'true');
                    videoElement.setAttribute('playsinline', 'true');
                }
                parent.appendChild(videoElement);
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const constraints = {
                        video: {
                            width: { ideal: options.width },
                            height: { ideal: options.height }
                        }
                    };
                    if (options.position === 'rear') {
                        constraints.video.facingMode = 'environment';
                        this.isBackCamera = true;
                    }
                    else {
                        this.isBackCamera = false;
                    }
                    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                        //video.src = window.URL.createObjectURL(stream);
                        videoElement.srcObject = stream;
                        videoElement.play();
                        resolve({});
                    }, (err) => {
                        reject(err);
                    });
                }
            }
            else {
                reject({ message: 'camera already started' });
            }
        });
    }
    async stop() {
        const video = document.getElementById('video');
        if (video) {
            video.pause();
            const st = video.srcObject;
            const tracks = st.getTracks();
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.stop();
            }
            video.remove();
        }
    }
    async capture(options) {
        return new Promise((resolve, _) => {
            const video = document.getElementById('video');
            const canvas = document.createElement('canvas');
            // video.width = video.offsetWidth;
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            // flip horizontally back camera isn't used
            if (!this.isBackCamera) {
                context.translate(video.videoWidth, 0);
                context.scale(-1, 1);
            }
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            let base64EncodedImage;
            if (options.quality != undefined) {
                base64EncodedImage = canvas.toDataURL('image/jpeg', options.quality / 100.0).replace('data:image/jpeg;base64,', '');
            }
            else {
                base64EncodedImage = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
            }
            resolve({
                value: base64EncodedImage,
            });
        });
    }
    async captureSample(_options) {
        return this.capture(_options);
    }
    async getSupportedFlashModes() {
        throw new Error('getSupportedFlashModes not supported under the web platform');
    }
    async setFlashMode(_options) {
        throw new Error('setFlashMode not supported under the web platform');
    }
    async flip() {
        throw new Error('flip not supported under the web platform');
    }
    async setOpacity(_options) {
        const video = document.getElementById('video');
        if (!!video && !!_options['opacity']) {
            video.style.setProperty('opacity', _options['opacity'].toString());
        }
    }
}
const CameraPreview = new CameraPreviewWeb();
registerWebPlugin(CameraPreview);

export { CameraPreview, CameraPreviewWeb };
