async function getSongListByTitleAndOrArtist(songName) {

    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${encodeURIComponent(songName)}&per_page=5&page=1&text_format=plain`;
    const request = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '51f9dbc71dmshec2881c3fa505dbp1cf1e7jsncbacd35c29bd',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, request);
        const obj = await response.json();
        const array = obj.hits.map((element) => {

            return {
                title: element.result.title,
                artist: element.result.artist_names,
                views: element.result.stats.pageviews,
                id: element.result.id,
                releaseDate: new Date(Date.UTC(element.result.release_date_components.year, element.result.release_date_components.month - 1, element.result.release_date_components.day)),
                albumCover: element.result.header_image_url
            }
        });

        array.sort((a, b) => { return b.views - a.views })

        return array

    } catch (error) {
        console.error(error);
    }

}

async function getLyricsBySongID(songID) {

    const lyricsUrl = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songID}&text_format=plain`;
    const detailsUrl = `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${songID}`
    const request = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '51f9dbc71dmshec2881c3fa505dbp1cf1e7jsncbacd35c29bd',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const responseLyrics = await fetch(lyricsUrl, request);
        const responseDetails = await fetch(detailsUrl, request)
        const resultLyrics = await responseLyrics.json();
        const resultDetails = await responseDetails.json();

        return {
            title: resultLyrics.lyrics.tracking_data.title,
            artist: resultDetails.song.artist_names,
            lyrics: resultLyrics.lyrics.lyrics.body.plain,
            releaseDate: new Date(Date.UTC(resultDetails.song.release_date_components.year, resultDetails.song.release_date_components.month - 1, resultDetails.song.release_date_components.day)),
            albumCover: resultDetails.song.header_image_thumbnail_url,
            youtube: resultDetails.song.youtube_url
        }

    } catch (error) {
        console.error(error);
    }
}

async function test() { await getLyricsBySongID(1638) }

async function test2() { await getSongListByTitleAndOrArtist("Pink Floyd") }

test()



