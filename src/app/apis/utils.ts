export function getDurationInMinAndSec(ms: number): string {

    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);

    return (
        sec === 60
            ? (min + 1) + ":00"
            : min + ":" + (sec < 10 ? "0" : "") + sec
    );
}