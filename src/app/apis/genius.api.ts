import { IGeniusSongData } from "./api.results";

interface IHeader {
    'X-RapidAPI-Key': string;
    'X-RapidAPI-Host': string
}

interface IRequestHeader {
    method: string;
    headers: IHeader
}

const request: IRequestHeader = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '51f9dbc71dmshec2881c3fa505dbp1cf1e7jsncbacd35c29bd',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
};

async function getLyricsByTitleAndOrArtist(songNameAndOrArtist: string): Promise<string | null> {

    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${encodeURIComponent(songNameAndOrArtist)}&per_page=5&page=1&text_format=plain`;

    try {
        const response = await fetch(url, (<any>request));

        const resultAsJson = await response.json();

        const result: IGeniusSongData[] = resultAsJson.hits.map((element: any) => {
            return {
                id: element.result.id,
                views: element.result.stats.pageviews,
            };
        });

        result.sort((a: IGeniusSongData, b: IGeniusSongData) => { return b.views - a.views });

        const lyricsUrl = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${result[0].id}&text_format=plain`;

        const responseLyrics = await fetch(lyricsUrl, (<any>request));

        const resultLyrics = await responseLyrics.json();

        return resultLyrics.lyrics.lyrics.body.plain;

    } catch (error) {
        console.error(error);
        return null;
    }
}