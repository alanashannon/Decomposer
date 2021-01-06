import * as Tone from 'tone'; 

window.addEventListener('DOMContentLoaded', () => {

    const tiles = document.querySelectorAll('.tile');
    console.log(tiles)
    let soundArr = [];
    // sound when clicking on tiles, push to soundArr
    (function populateSoundArr() {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', async () => {
                let sound = new Tone.Player(`./dist/dvorak/sample_0${i+1}.wav`).toDestination();
                Tone.loaded().then(() => {
                    sound.start();
                    soundArr.push(sound);
                    // console.log(soundArr);
                })
            })
        }
        // return soundArr;
    })();
    
    (function playSoundArr() {
        for (let i = 0; i < tiles.length; i++) {
            let sound = new Tone.Player(`./dist/dvorak/sample_0${i + 1}.wav`).toDestination(); 
            document.querySelector('.play').addEventListener('click', async () => {
                console.log(soundArr)
                // Tone.loaded().then(() => {
                //     const seq = new Tone.Sequence((time, note) => {
                //         sound.triggerAttackRelease(note, 1, time); 
                //     }, [...soundArr]).start(0); 
                    
                // })
                // Tone.Transport.start()
                soundArr.forEach(clip => {
                    Tone.loaded().then(() => {
                        clip.start(); 
                    })
                })
            })
        }
    })()
    
    // document.querySelector('.play').addEventListener('click', async () => {
    //     for (let i = 0; i < tiles.length; i++) {
    //         let sound = new Tone.Player(`./dist/dvorak/sample_0${i+1}.wav`).toDestination();
    //         // let sound = new Tone.Synth().toDestination(); 
    //         console.log(soundArr)
    //         const seq = new Tone.Sequence((time, note) => {
    //             sound.triggerAttackRelease(note, 1, time);
    //         }, [...soundArr]).start(0); 
    //         Tone.Transport.start(); 
    //     }
    //     console.log('audio is ready')
    // })
        // const seq = new Tone.Sequence((time, note) => {
        //     synth.triggerAttackRelease(note, 1, time);
        // }, [...arr]).start(0); 
        // console.log(arr)

        // let sound = new Tone.Player(`./dist/dvorak/sample_01.wav`).toDestination();
        // Tone.loaded().then(() => {
        //     sound.start(); 
        // })

    // const seq = new Tone.Sequence((time, note) => {
    //     sound.triggerAttackRelease(note, 1, time);
    // }, [...soundArr]).start(0); 

    const stopButton = document.querySelector('.stop-button'); 
    stopButton.addEventListener('click', () => {
        Tone.Transport.stop(); 
        console.log("stopping")
    })

    function moveTiles() {
        const tiles = document.querySelectorAll('.tile'); 
        // console.log(tiles)
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', async () => {
                tiles[i].style.visibility = 'hidden'; 
                let chosenTile = document.getElementsByClassName('tile')[i];
                const clone = chosenTile.cloneNode(true); 
                const board = document.getElementById('board').appendChild(clone);
                clone.style.visibility = 'visible';
            })
        }
    }
    moveTiles(); 

    function moveTileOutOfBoard() {

    }

    // document.querySelector('.board').addEventListener('click', async () => {
    //     console.log('click on board')


    // })

    const board = document.querySelector('.board').addEventListener('click', async => {
        document.querySelector('.tile').addEventListener('click', async () => {
            console.log('tile clicked')
        })
    }) 

    
})
