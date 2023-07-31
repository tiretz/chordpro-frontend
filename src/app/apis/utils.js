function getChordsForKeyAndMode(key, mode) {

    switch (key, mode) {
        case 0, 1:
            return ["C", "Dm", "Em", "F", "G", "Am", "B°"];
        case 9, 0:
            return ["Am", "B°", "C", "Dm", "Em", "F", "G"];
        case 7, 1:
            return ["G", "Am", "Bm", "C", "D", "Em", "F#°"];
        case 4, 0:
            return ["Em", "F#°", "G", "Am", "Bm", "C", "D"];
        case 3, 1:
            return ["D", "Em", "F#m", "G", "A", "Bm", "C#°"];
        case 11, 0:
            return ["Bm", "C#°", "D", "Em", "F#m", "G", "A"];
        case 9, 1:
            return ["A", "Bm", "C#m", "D", "E", "F#m", "G#°"];
        case 6, 0:
            return ["F#m", "G#°", "A", "Bm", "C#m", "D", "E"];
        case 4, 1:
            return ["E", "F#m", "G#m", "A", "B", "C#m", "D#°"];
        case 1, 0:
            return ["C#m", "D#°", "E", "F#m", "G#m", "A", "B"];
        case 11, 1:
            return ["B", "C#m", "D#m", "E", "F#", "G#m", "A#°"];
        case 8, 0:
            return ["G#m", "A#°", "B", "C#m", "D#m", "E", "F#"];
        case 6, 1:
            return ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#°"];
        case 3, 0:
            return ["D#m", "E#°", "F#", "G#m", "A#m", "B", "C#"];
        case 5, 1:
            return ["F", "Gm", "Am", "Bb", "C", "Dm", "E°"];
        case 2, 0:
            return ["Dm", "E°", "F", "Gm", "Am", "Bb", "C"];
        case 10, 1:
            return ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "A°"];
        case 7, 0:
            return ["Gm", "A°", "Bb", "Cm", "Dm", "Eb", "F"];
        case 3, 1:
            return ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "D°"];
        case 0, 0:
            return ["Cm", "D°", "Eb", "Fm", "Gm", "Ab", "Bb"];
        case 8, 1:
            return ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "G°"];
        case 5, 0:
            return ["Fm", "G°", "Ab", "Bbm", "Cm", "Db", "Eb"];
        case 1, 1:
            return ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "C°"];
        case 10, 0:
            return ["Bbm", "C°", "Db", "Ebm", "Fm", "Gb", "Ab"];
        default:
            return [];
    }

}


function getDurationInMinAndSec(ms) {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return (
        sec === 60
            ? (min + 1) + ":00"
            : min + ":" + (sec < 10 ? "0" : "") + sec
    );
}

