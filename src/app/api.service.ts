import { Injectable } from '@angular/core';
import { ISongInformation } from './apis/api.results';
import { getSongInformation } from './apis/spotify.api';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	async getSearchResults(songTitle: string, songArtists: string): Promise<ISongInformation[]> {
		return await getSongInformation(songTitle, songArtists);
	}
}