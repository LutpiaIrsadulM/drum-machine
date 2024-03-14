import React, { useEffect, useState } from 'react';

function Display() {
    const [activeDrumPad, setActiveDrumPad] = useState('')

    const drumData = [
        {id: "heater-1", key: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", label: "Q"},
        {id: "heater-2", key: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", label: "W"},
        {id: "heater-3", key: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", label: "E"},
        {id: "heater-4", key: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", label: "A"},
        {id: "clap", key: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", label: "S"},
        {id: "open-hh", key: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", label: "D"},
        {id: "kick-n-hat", key: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", label: "Z"},
        {id: "kick", key: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", label: "X"},
        {id: "close-hh", key: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", label: "C"},
    ];

    useEffect(() => {
        const playAudio = (val) => {
            // Play audio corresponding to the clicked pad or pressed key
            const audio = document.getElementById(val);
            if (audio) {
                audio.currentTime = 0; // Reset audio to start
                audio.play()
                    .catch(error => console.error("Error playing audio:", error));
            }
        }

        const handleClick = (event) => {
            setActiveDrumPad(event.currentTarget.id);
            playAudio(event.currentTarget.innerText)
        }

        const handleKeydown = (event) => {
            const key = event.key.toUpperCase();
            if(isNaN(key)){
                const parent = document.querySelector(`.drum-pad:has(> #${key})`)
                if(parent){
                    setActiveDrumPad(parent.id);
                    playAudio(key)
                }
            }
        }

        // Add event listeners to each drum pad
        const drumPads = document.querySelectorAll('.drum-pad');
        drumPads.forEach(pad => {
            pad.addEventListener('click', handleClick);
        });

        // Add event listener for keydown event on the document
        document.addEventListener('keydown', handleKeydown);

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            drumPads.forEach(pad => {
                pad.removeEventListener('click', handleClick);
            });
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);
    
  return (
    <div className='container'>
    <div id='display'>{ activeDrumPad.toUpperCase() }</div>
    <div className='drum-pad-container'>
        {drumData.map(({ id, key, src, label }) => (
            <div className="drum-pad" id={id} key={id}>
                <audio className="clip" id={key} src={src} type="audio/mp3"></audio>
                {label}
            </div>
        ))}
    </div>
    </div>
  );
}

export default Display;
