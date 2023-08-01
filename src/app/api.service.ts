import { Injectable } from '@angular/core';
import { ISongInformation, ISongMetaData } from './apis/api.results';
import { getSongInformation, getSongMetaData } from './apis/spotify.api';
import { getLyricsByTitleAndOrArtist } from './apis/genius.api';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	async getSearchResults(songTitle: string, songArtists: string): Promise<ISongInformation[]> {
		return await getSongInformation(songTitle, songArtists);
	}

	async getSongMetaData(songInformation: ISongInformation): Promise<ISongMetaData | null> {
		return await getSongMetaData(songInformation.spotifySongID);
	}

	async getSongLyrics(songInformation: ISongInformation): Promise<string | null> {
		return await getLyricsByTitleAndOrArtist(`${songInformation.title} ${songInformation.artists.join(', ')}`.trim());
	}
}