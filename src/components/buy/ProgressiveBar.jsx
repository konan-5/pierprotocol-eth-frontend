import React, { useState, useRef, useCallback } from "react";

function ProgressBar({ max, onChange }) {
    const [progress, setProgress] = useState(0);
    const progressBarRef = useRef(null);

    const getProgressFromMouseEvent = useCallback(
        (event) => {
            const progressBar = progressBarRef.current;
            const { left, width } = progressBar.getBoundingClientRect();
            const newProgress = Math.min(Math.max(0, event.clientX - left), width);
            return (newProgress / width) * max;
        },
        [max]
    );

    const handleMouseDown = (event) => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = useCallback(
        (event) => {
            const newProgress = getProgressFromMouseEvent(event);
            setProgress(newProgress);
            onChange(newProgress);
        },
        [getProgressFromMouseEvent, onChange]
    );

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const width = (progress / max) * 100 + "%";

    return (
        <div className="progress-bar" ref={progressBarRef}>
            <div className="progress-bar-filled" style={{ width }} />
            <div
                className="progress-bar-handle"
                style={{ left: width }}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
}

export default ProgressBar;
