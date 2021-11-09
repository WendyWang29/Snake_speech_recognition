let recognizer
let words
const wordList = ["up", "down", "left", "right"]

//modelLoaded


// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', ()=> {
    return navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    }).then(loadModel()).catch(err => { console.log('error!!!')})
    }
)


async function loadModel() {
    console.log('we try to load the model now....')
    recognizer = speechCommands.create('BROWSER_FFT')
    await recognizer.ensureModelLoaded()
    words = recognizer.wordLabels()
    console.log(recognizer.wordLabels())
    console.log('model loaded!')
    startListening()
}

function startListening() {
    recognizer.listen(({scores}) => {

        //console.log("scores--",scores);   <-- see the scores

        // Turn scores into a list of (score,word) pairs.
        scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}))

        // Find the most probable word.
        scores.sort((s1, s2) => s2.score - s1.score)
        const elementId = `${scores[0].word}`;
        console.log(elementId)
        }, {
            probabilityThreshold: 0.75
        }
    );
}



function stopListening() {
    recognizer.stopListening()
}