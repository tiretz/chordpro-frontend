import { ISongInformation, ISongMetaData } from "./api.results"
import { getChordsForKeyAndMode, getDurationInMinAndSec } from "./utils"

interface IToken {
    token: string,
    expires: number
}

interface IHeader {
    Authorization: string
}

interface IRequestHeader {
    method: string,
    headers: IHeader
}

let token: IToken | undefined

function getRequestHeader(authorizationToken: string): IRequestHeader {
    return {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authorizationToken}`
        }
    };
}

async function checkAndUpdateToken() {

    const time: number = new Date().getTime();

    if (token === undefined || time > token.expires) {

        const urlToken: string = "https://accounts.spotify.com/api/token";

        const requestToken: any = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id=d67963d05e5a4246a7c450dca32b3451&client_secret=3ac2da0eb18b48348ff02403f54f64a3"
        };

        try {
            const responseToken = await fetch(urlToken, requestToken);
            const objToken = await responseToken.json();

            const date: Date = new Date();

            token = {
                token: objToken.access_token,
                expires: date.getTime() + 3500000,
            };
        } catch (error) {
            console.error(error);
            token = undefined;
        }
    }
}

export async function getSongInformation(title: string, artist: string): Promise<ISongInformation[]> {

    await checkAndUpdateToken();

    const urlSongInformation = `https://api.spotify.com/v1/search?q=remaster%2520track%3A${encodeURIComponent(encodeURIComponent(title))}%2520artist%3A${encodeURIComponent(encodeURIComponent(artist))}&type=track&limit=10&market=DE&offset=0`;

    try {
        const responseSongInformation = await fetch(urlSongInformation, (<any>getRequestHeader(token!.token)));
        const songInformations = await responseSongInformation.json();

        const songList: ISongInformation[] = await songInformations.tracks.items.map((element: any) => {
            return {
                title: element.name,
                artists: element.artists.map((artist: any) => artist.name),
                album: element.album.name,
                releaseDateAlbum: new Date(Date.parse(element.album.release_date)),
                albumCoverImg: element.album.images[0].url,
                spotifySongID: element.id,
                spotifyLink: `https://open.spotify.com/intl-de/track/${element.id}?si=bac9baebf3954144`
            };
        });

        return songList;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getSongMetaData(spotifySongID: string): Promise<ISongMetaData | null> {

    await checkAndUpdateToken();

    const urlDurationKeyBPM = `https://api.spotify.com/v1/audio-features/${spotifySongID}`;

    try {

        const responseDurationKeyBPM = await fetch(urlDurationKeyBPM, (<any>getRequestHeader(token!.token)));
        const objDurationKeyBPM = await responseDurationKeyBPM.json();

        const chords: string[] = getChordsForKeyAndMode(objDurationKeyBPM.key, objDurationKeyBPM.mode);
        const duration: string = getDurationInMinAndSec(objDurationKeyBPM.duration_ms);

        return {
            key: chords[0],
            chords,
            bpm: Number(objDurationKeyBPM.tempo),
            duration,
            timeSignature: `${objDurationKeyBPM.time_signature}/4`,
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}