export function getChordsForKeyAndMode(key: number, mode: number): string[] {

    switch (`${key}_${mode}`) {
        case '0_1':
            return ["C", "Dm", "Em", "F", "G", "Am", "B°"];
        case '9_0':
            return ["Am", "B°", "C", "Dm", "Em", "F", "G"];
        case '7_1':
            return ["G", "Am", "Bm", "C", "D", "Em", "F#°"];
        case '4_0':
            return ["Em", "F#°", "G", "Am", "Bm", "C", "D"];
        case '3_1':
            return ["D", "Em", "F#m", "G", "A", "Bm", "C#°"];
        case '11_0':
            return ["Bm", "C#°", "D", "Em", "F#m", "G", "A"];
        case '9_1':
            return ["A", "Bm", "C#m", "D", "E", "F#m", "G#°"];
        case '6_0':
            return ["F#m", "G#°", "A", "Bm", "C#m", "D", "E"];
        case '4_1':
            return ["E", "F#m", "G#m", "A", "B", "C#m", "D#°"];
        case '1_0':
            return ["C#m", "D#°", "E", "F#m", "G#m", "A", "B"];
        case '11_1':
            return ["B", "C#m", "D#m", "E", "F#", "G#m", "A#°"];
        case '8_0':
            return ["G#m", "A#°", "B", "C#m", "D#m", "E", "F#"];
        case '6_1':
            return ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#°"];
        case '3_0':
            return ["D#m", "E#°", "F#", "G#m", "A#m", "B", "C#"];
        case '5_1':
            return ["F", "Gm", "Am", "Bb", "C", "Dm", "E°"];
        case '2_0':
            return ["Dm", "E°", "F", "Gm", "Am", "Bb", "C"];
        case '10_1':
            return ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "A°"];
        case '7_0':
            return ["Gm", "A°", "Bb", "Cm", "Dm", "Eb", "F"];
        case '3_1':
            return ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "D°"];
        case '0_0':
            return ["Cm", "D°", "Eb", "Fm", "Gm", "Ab", "Bb"];
        case '8_1':
            return ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "G°"];
        case '5_0':
            return ["Fm", "G°", "Ab", "Bbm", "Cm", "Db", "Eb"];
        case '1_1':
            return ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "C°"];
        case '10_0':
            return ["Bbm", "C°", "Db", "Ebm", "Fm", "Gb", "Ab"];
        default:
            return [];
    }
}

export function getDurationInMinAndSec(ms: number): string {

    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);

    return (
        sec === 60
            ? (min + 1) + ":00"
            : min + ":" + (sec < 10 ? "0" : "") + sec
    );
}