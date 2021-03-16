import * as Tone from 'tone'; 

window.addEventListener('DOMContentLoaded', () => {
    let clonedTiles = document.getElementsByClassName('.cloned-tile');
    const tiles = document.querySelectorAll('.tile');
    const board = document.getElementById('board'); 
    const sel = document.getElementById('piece-toggle');

    (function setBoard() {
        let listProko = document.getElementById('tile-list-proko'); 
        listProko.style.display = 'none';
        let staffStarterProko = document.getElementById('staff-starter-proko'); 
        if (sel.value === 'dvorak') {
            staffStarterProko.style.display = 'none' //TODO every add after, display none in default
        }
        
        sel.addEventListener('change', async () => {
            tiles.forEach(tile => {
                if (tile.style.visibility === 'hidden') {
                    tile.style.visibility = 'visible';
                }
            })
            while (board.childNodes.length > 5) {
                board.removeChild(board.lastChild)
            }
            soundArr = [];
            Tone.Transport.cancel();

            const currentSel = sel.value; 
            if (currentSel === 'proko') {
                let list = document.getElementById('tile-list-dvorak')
                listProko.style.display = 'inherit'; 
                list.style.display = 'none';
                staffStarterProko.style.display = 'inherit'; 
                let staffStarterDvorak = document.getElementById('staff-starter-dvorak'); 
                staffStarterDvorak.style.display = 'none';
            } else if (currentSel === 'dvorak') {
                listProko.style.display = 'none'; 
                let listDvorak = document.getElementById('tile-list-dvorak')
                listDvorak.style.display = 'inherit';
                staffStarterProko.style.display = 'none';
                let staffStarterDvorak = document.getElementById('staff-starter-dvorak');
                staffStarterDvorak.style.display = 'inherit';
            }
        })
    })();
    
    (function stopButton() {
        const stopButton = document.querySelector('.stop-button'); 
        stopButton.addEventListener('click', () => {
            Tone.Transport.stop(); 
            Tone.Transport.cancel(); 
        })
    })(); 

    const clearButton = document.body.querySelector('.clear-button'); 
    clearButton.addEventListener('click', async () => {
        tiles.forEach(tile => {
            if (tile.style.visibility === 'hidden') {
                tile.style.visibility = 'visible';
            }
        })
        //TODO adjust length as more staff starters get added
        while (board.childNodes.length > 5) {
            board.removeChild(board.lastChild)
        }

        soundArr = []; 
        Tone.Transport.cancel(); 
    }); 

    const volume = document.body.querySelector(".volume");
    let soundArr = [];
    // sound when clicking on tiles, push to soundArr
    (function populateSoundArr() {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', async () => {
                let currentSel = sel.value; 
                
                let sound = new Tone.Player(`./dist/${currentSel}/sample_0${i+1}.wav`).toDestination();

                volume.addEventListener('change', (e) => {
                    console.log(e.target.value)
                    sound.volume.input.value = (e.target.value);
                })
             
                Tone.loaded().then(() => {
                    sound.start();
                    soundArr.push(sound);
                })
            })
        }
    })();
    
    (function playSoundArr() {
        document.querySelector('.play').addEventListener('click', async () => {
            let currentSel = sel.value; 
            const seq = new Tone.Sequence((time, note) => {
                Tone.loaded().then(() => {
                    if (currentSel === "dvorak") {
                        Tone.Transport.bpm.value = 18; //TODO Add specific bpm for each piece
                    } else if (currentSel === "proko") {
                        Tone.Transport.bpm.value = 12.5;
                    }
                    note.start(time);
                })
            }, [...soundArr]).start(); 
            Tone.Transport.start();

        })
    })();

    let boardTiles = [];
    (function moveTiles() {

        const tiles = document.querySelectorAll('.tile'); 
       
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', async () => {
                tiles[i].style.visibility = 'hidden'; 
                let chosenTile = document.getElementsByClassName('tile')[i];
                const clone = chosenTile.cloneNode(true); 
               
                clone.classList.add('cloned-tile')
                document.getElementById('board').appendChild(clone);
                clone.style.visibility = 'visible';
                boardTiles.push(clone);
            })
        }
    })();

    (function moveTileOffBoard() {
        // let clonedTiles = document.getElementsByClassName('cloned-tile')
        // console.log(clonedTiles)
        for (let i = 0; i < clonedTiles.length; i++) {
            clonedTiles[i].addEventListener('click', async () => {
                tiles.forEach((tile, j) =>{
                    // console.log(tile)
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


    
});