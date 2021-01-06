import * as Tone from 'tone'; 

document.querySelector('.test-button').addEventListener('click', async () => {
    const synth = new Tone.Synth().toDestination(); 
    synth.triggerAttackRelease("D4", "8n");
    
    console.log('audio is ready')
})

document.querySelector('.test-button2').addEventListener('click', async () => {
    // const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    // const synth = new Tone.Synth().toDestination();

    // const now = Tone.now(); 
    // console.log(arr)
    // Tone.loaded().then(() => {
        //     arr.start(); 
        // })
        // synth.triggerRelease(["D4", "F#4", "A4"], now + 3);
        // synth.triggerRelease(arr, now + 3);
        
    // const synth = new Tone.Synth().toDestination(); 
    // const D4 = "D4"
    // const FS4 = "F#4"
    // const A4 = "A4"
    // let arr = []; 
    // arr.push(D4); 
     
    // const seq = new Tone.Sequence((time, note) => {
    //     synth.triggerAttackRelease(note, 1, time);
    // }, [...arr]).start(0); 
    // console.log(arr)

    // Tone.Transport.start();

    let sound = new Tone.Player(`./dist/dvorak/sample_01.wav`).toDestination();
    Tone.loaded().then(() => {
        sound.start(); 
    })
    console.log('audio is ready')
})

const stopButton = document.querySelector('.stop-button'); 
stopButton.addEventListener('click', () => {
    Tone.Transport.stop(); 
    console.log("stopping")
})

// const tile = document.querySelector('.tile').addEventListener('click', async () => {
//     console.log('clicked')
//     const C4 = "C4"
//     let arr = []; 
//     arr.push(C4)
//     console.log(arr)
//     hideTile(); 
//     moveTileToBoard(); 
// })
function moveTiles() {
    const tiles = document.querySelectorAll('.tile'); 
    console.log(tiles)
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', async () => {
            tiles[i].style.visibility = 'hidden'; 
            let chosenTile = document.getElementsByClassName('tile')[i]
            const clone = chosenTile.cloneNode(true); 
            const board = document.getElementById('board').appendChild(clone)
            clone.style.visibility = 'visible'
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




// window.addEventListener('DOMContentLoaded', () => {



// })
console.log("New Project!")