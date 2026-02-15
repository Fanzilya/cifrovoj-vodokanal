import { makeAutoObservable, runInAction } from 'mobx';
import Hls, { ErrorTypes } from 'hls.js';

export class StreamPlayerModel {
    videoElement: HTMLVideoElement | null = null;
    hlsInstance: Hls | null = null;
    reconnectTimer: number | null = null;
    reconnectAttempts = 0;
    videoSrc: string | null = null;

    private setIsLoading: ((loading: boolean) => void) | null = null;

    private readonly MAX_RECONNECT_ATTEMPTS = 10;
    private readonly RECONNECT_DELAY = 2000;

    constructor() {
        makeAutoObservable(this);
    }

    setVideoElement(element: HTMLVideoElement | null) {
        this.videoElement = element;
    }

    start(videoSrc: string, setIsLoading: (value: boolean) => void) {
        if (!this.videoElement) return;

        this.setIsLoading = setIsLoading;
        this.videoSrc = videoSrc;

        // ✅ STRICT native HLS ONLY
        if (
            this.videoElement.canPlayType('application/vnd.apple.mpegurl') &&
            !Hls.isSupported()
        ) {
            this.videoElement.src = this.normalizeUrl(videoSrc);
            this.videoElement.play().catch(() => { });
            this.setIsLoading(false);
            return;
        }

        // ✅ ВСЕГДА hls.js, если он доступен
        this.createHls(videoSrc);
    }

    private createHls(videoSrc: string) {
        if (!this.videoElement || !Hls.isSupported()) return;

        this.setIsLoading?.(true);

        const hls = new Hls({
            lowLatencyMode: false,
            liveDurationInfinity: true,

            maxBufferLength: 2,
            maxMaxBufferLength: 3,
            maxBufferSize: 0,
        });

        this.hlsInstance = hls;

        const source = this.normalizeUrl(videoSrc);

        hls.attachMedia(this.videoElement);
        hls.loadSource(source);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            this.setIsLoading?.(false);
            this.videoElement?.play().catch(() => { });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
            if (!data.fatal) return;
            this.retryReconnect(true);
        });
    }


    destroy() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }

        if (this.hlsInstance) {
            this.hlsInstance.detachMedia();
            this.hlsInstance.destroy();
            this.hlsInstance = null;
        }

        if (this.videoElement) {
            this.videoElement.pause();
        }

        this.videoSrc = null;
        this.reconnectAttempts = 0;
    }


    private retryReconnect(forceRecreate = false) {
        if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) return;

        this.reconnectAttempts++;

        this.reconnectTimer = window.setTimeout(() => {
            if (forceRecreate && this.videoSrc) {
                this.createHls(this.videoSrc);
            } else {
                this.hlsInstance?.startLoad();
            }
        }, this.RECONNECT_DELAY);
    }

    private normalizeUrl(url: string) {
        return url.replace(/([^:]\/)\/+/g, '$1');
    }
}
