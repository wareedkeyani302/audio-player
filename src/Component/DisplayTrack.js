import React, { useEffect } from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, handleNext }) => {
    useEffect(() => {
        const onLoadedMetadata = () => {
            setDuration(audioRef.current.duration);
            progressBarRef.current.max = audioRef.current.duration;
        };

        audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);

        return () => {
            audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
    }, [audioRef, setDuration, progressBarRef]);

    return (
        <div>
            <audio src={currentTrack.src} ref={audioRef} onEnded={handleNext} />
            <div className="audio-info">
                <div className="audio-image">
                    {currentTrack.thumbnail ? (
                        <img src={currentTrack.thumbnail} alt="audio avatar" />
                    ) : (
                        <div className="icon-wrapper">
                            <span className="audio-icon">
                                <BsMusicNoteBeamed />
                            </span>
                        </div>
                    )}
                </div>
                <div className="text">
                    <p className="title">{currentTrack.title}</p>
                    <p>{currentTrack.author}</p>
                </div>
            </div>
        </div>
    );
};

export default DisplayTrack;

