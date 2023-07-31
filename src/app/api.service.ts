import { Injectable } from '@angular/core';
import { SearchResult } from './apis/api.results';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor() { }

	getSearchResults(songTitle: string | undefined, songArtists: string | undefined): SearchResult[] {

		return [ { title: 'Title', artists: 'Artist', albumCover: 'url' } ]
	}
}
