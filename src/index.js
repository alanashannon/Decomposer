import * as Tone from 'tone'; 

window.addEventListener('DOMContentLoaded', () => {
    let clonedTiles = document.getElementsByClassName('.cloned-tile');
    const tiles = document.querySelectorAll('.tile');
    const board = document.getElementById('board'); 
    
    (function stopButton() {
        const stopButton = document.querySelector('.stop-button'); 
        stopButton.addEventListener('click', () => {
            Tone.Transport.stop(); 
            console.log("stopping")
        })
    })(); 

    const clearButton = document.body.querySelector('.clear-button'); 
    clearButton.addEventListener('click', async () => {
        tiles.forEach(tile => {
            if (tile.style.visibility === 'hidden') {
                tile.style.visibility = 'visible'
            }
        })

        while (board.childNodes.length > 3) {
            board.removeChild(board.lastChild)
        }
        soundArr = []; 
    }); 

    let soundArr = [];
    // sound when clicking on tiles, push to soundArr
    (function populateSoundArr() {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', async () => {
                let sound = new Tone.Player(`./dist/dvorak/sample_0${i+1}.wav`).toDestination();
                Tone.loaded().then(() => {
                    sound.start();
                    soundArr.push(sound);
                })
            })
        }
    })();
    
    (function playSoundArr() {
        document.querySelector('.play').addEventListener('click', async () => {
            const seq = new Tone.Sequence((time, note) => {
                Tone.loaded().then(() => {
                    Tone.Transport.bpm.value = 17.5;
                    note.start();
                })
            }, [...soundArr]).start(0); 
            Tone.Transport.start();
        })
    })();

    let boardTiles = [];
    (function moveTiles() {
        const tiles = document.querySelectorAll('.tile'); 
        // console.log(tiles)
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', async () => {
                tiles[i].style.visibility = 'hidden'; 
                let chosenTile = document.getElementsByClassName('tile')[i];
                const clone = chosenTile.cloneNode(true); 
                console.log(chosenTile) 
                clone.classList.add('cloned-tile')
                document.getElementById('board').appendChild(clone);
                clone.style.visibility = 'visible';
                boardTiles.push(clone);
                // console.log(boardTiles)
                // console.log(board)
            })
        }
    })();

    (function moveTileOffBoard() {
        // let clonedTiles = document.getElementsByClassName('cloned-tile')
        console.log(clonedTiles)
        for (let i = 0; i < clonedTiles.length; i++) {
            clonedTiles[i].addEventListener('click', async () => {
                tiles.forEach((tile, j) =>{
                    console.log(tile)
                    if (clonedTiles[i].innerHTML === tile.textContent.toString()) {
                        clonedTiles[i].style.visibility = 'hidden'; 
                        tile.style.visibility = 'visible'; 
                    }

                })
                
            })
        }
    })();

    // document.querySelector('.board').addEventListener('click', async () => {
    //     console.log('click on board')


    // })


    
})
