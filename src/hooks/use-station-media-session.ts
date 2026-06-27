import { RefObject, useEffect } from "react";
import type { Station } from "@/data/stations";

const noop = () => {};

export const useStationMediaSession = (
  audioRef: RefObject<HTMLAudioElement>,
  station: Station | undefined,
  enabled: boolean,
) => {
  useEffect(() => {
    if (!enabled || !station || typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

    const audio = audioRef.current;
    if (!audio) return;

    const artworkUrl = `${window.location.origin}/branding/goodtogoradio-logo-square.png`;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: station.name,
      artist: station.hostName ?? "Good To Go Radio",
      album: station.genre ?? station.tagline,
      artwork: [
        { src: artworkUrl, sizes: "512x512", type: "image/png" },
        { src: artworkUrl, sizes: "1024x1024", type: "image/png" },
      ],
    });

    const syncPlaybackState = () => {
      navigator.mediaSession.playbackState = audio.paused ? "paused" : "playing";
    };

    const handlePlay = async () => {
      await audio.play().catch(noop);
      syncPlaybackState();
    };

    const handlePause = () => {
      audio.pause();
      syncPlaybackState();
    };

    const handleStop = () => {
      audio.pause();
      audio.currentTime = 0;
      syncPlaybackState();
    };

    navigator.mediaSession.setActionHandler("play", handlePlay);
    navigator.mediaSession.setActionHandler("pause", handlePause);
    navigator.mediaSession.setActionHandler("stop", handleStop);

    syncPlaybackState();

    audio.addEventListener("play", syncPlaybackState);
    audio.addEventListener("pause", syncPlaybackState);
    audio.addEventListener("ended", syncPlaybackState);

    return () => {
      audio.removeEventListener("play", syncPlaybackState);
      audio.removeEventListener("pause", syncPlaybackState);
      audio.removeEventListener("ended", syncPlaybackState);

      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("stop", null);
      navigator.mediaSession.playbackState = "none";
      navigator.mediaSession.metadata = null;
    };
  }, [audioRef, enabled, station]);
};
