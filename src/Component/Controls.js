import React, { useState, useEffect } from 'react';
import { IoPlayBackSharp, IoPlayForwardSharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoPlaySharp, IoPauseSharp, } from 'react-icons/io5';
import { IoMdVolumeLow, IoMdVolumeOff, IoMdVolumeHigh } from "react-icons/io";

const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    tracks,
    trackIndex,
    setTrackIndex,
    setCurrentTrack,
    handleNext,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    useEffect(() => {
        audioRef.current.volume = volume / 100;
        audioRef.current.muted = muteVolume;
    }, [volume, audioRef, muteVolume]);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const skipForward = () => {
        audioRef.current.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
            setTrackIndex(tracks.length - 1);
            setCurrentTrack(tracks[tracks.length - 1]);
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
        }
    };

    return (
        <div className="controls-container">
            <div className="controls">
                <button onClick={handlePrevious}>
                    <IoPlaySkipBackSharp />
                </button>
                <button onClick={skipBackward}>
                    <IoPlayBackSharp />
                </button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                <button onClick={skipForward}>
                    <IoPlayForwardSharp />
                </button>
                <button onClick={handleNext}>
                    <IoPlaySkipForwardSharp />
                </button>
            </div>
            <div className="volume">
                <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume < 5 ? (
                        <IoMdVolumeOff />
                    ) : volume < 40 ? (
                        <IoMdVolumeLow />
                    ) : (
                        <IoMdVolumeHigh />
                    )}
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    style={{
                        background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
                    }}
                />
            </div>
        </div>
    );
};

export default Controls;
