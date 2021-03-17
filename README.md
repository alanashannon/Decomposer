# Decomposer

[Link to Decomposer](https://alanashannon.github.io/Decomposer/)

Decomposer is an interactive app that allows users rewrite famous pieces of music and play back their creations. By doing so, users can hear these pieces in ways 
they would never hear anywhere else, and maybe even gain some insight into how composers put their pieces of music together. 

## Core Features
* Users can click on tiles to rearrange the music
* Users can play back their creations
* Choose from multiple pieces of music

## Challenges
This project involved using Tone.js in a way that I don't believe it has been used before. It does not have very extensive documentation, and as it is generally geared towards synthesizers I had to adapt several features for my own purposes. 

The playback function plays a Tone Sequence, which reads an array at specific beats per minute (bpm) depending on the chosen piece of music. The code snippet below shows the playback function I ended up using. The bpm value takes the bpm of a full measure (i.e. for Dvorak New World Symphony, whole note = 36 bpm), which then needed to be divided by 2 for smooth playback as it reads in 8th notes by default. Each element in the sequence is a .wav file, and the sequence starts a new file at each bpm. The downside of this is that the music must be completely metronomic in order to ensure smooth playback, which puts a limit on the music that can be used. Another downside is that in stopping playback it pauses between elements, which considering the slow tempo in which it must be read, means it will likely continue playing past when you click the stop button. I am currently working towards solutions to both of these issues. 
```
(function playSoundArr() {
    document.querySelector('.play').addEventListener('click', async () => {
        let currentSel = sel.value; 
        const seq = new Tone.Sequence((time, note) => {
            Tone.loaded().then(() => {
                if (currentSel === "dvorak") {
                    Tone.Transport.bpm.value = 18; 
                } else if (currentSel === "proko") {
                    Tone.Transport.bpm.value = 12.5;
                }
                note.start(time);
            })
        }, [...soundArr]).start(); 
        Tone.Transport.start();
    })
})();
```

## Technologies/Languages Used 
* Javascript
* Tone.js
* HTML5/CSS
* Webpack
* MuseScore
* Pro Tools
