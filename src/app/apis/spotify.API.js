let token
let arraySongList


function getRequestHeader(tokenFromObject) {
    return {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenFromObject}`
        },
    };
}


async function getSongInformation(title, artist) {

    let time = new Date()
    time = time.getTime()

    if (token === undefined || time > token.expires) {

        const urlToken = "https://accounts.spotify.com/api/token";

        const requestToken = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id=d67963d05e5a4246a7c450dca32b3451&client_secret=3ac2da0eb18b48348ff02403f54f64a3"
        };

        try {

            const responseToken = await fetch(urlToken, requestToken)
            const objToken = await responseToken.json()
            const date = new Date()
            token = {
                token: objToken.access_token,
                expires: date.getTime() + 3600000,
            }

        } catch (error) {
            console.error(error);
        }

    }


    //API Abfrage Song Informationen für Dropdown + SpotifyID  
    const urlSongInformation = `https://api.spotify.com/v1/search?q=remaster%2520track%3A${encodeURIComponent(encodeURIComponent(title))}%2520artist%3A${encodeURIComponent(encodeURIComponent(artist))}&type=track&limit=10&market=DE&offset=0`;

    try {

        const responseSongInformation = await fetch(urlSongInformation, getRequestHeader(token.token))
        const objSongInformation = await responseSongInformation.json()

        arraySongList = await objSongInformation.tracks.items.map((element) => {

            return {
                title: element.name,
                artists: element.artists.map((artist) => artist.name),
                album: element.album.name,
                releaseDateAlbum: new Date(Date.parse(element.album.release_date)),
                albumCoverImg: element.album.images[0].url,
                spotifySongID: element.id,
                spotifyLink: `https://open.spotify.com/intl-de/track/${element.id}?si=bac9baebf3954144`
            }

        });

    } catch (error) {
        console.log(error)
    }
}




async function getSongMetaData(spotifySongID) {

    const urlDurationKeyBPM = `https://api.spotify.com/v1/audio-features/${spotifySongID}`

    try {

        const responseDurationKeyBPM = await fetch(urlDurationKeyBPM, getRequestHeader(token.token))
        const objDurationKeyBPM = await responseDurationKeyBPM.json()

        const chords = getChordsForKeyAndMode(objDurationKeyBPM.key, objDurationKeyBPM.mode)
        const duration = getDurationInMinAndSec(objDurationKeyBPM.duration_ms)

        return {
            key: chords[0],
            chords,
            bpm: objDurationKeyBPM.tempo,
            duration,
            timeSignature: `${objDurationKeyBPM.time_signature}/4`
        }

    } catch {

    }

}


