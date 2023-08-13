import { Injectable } from '@angular/core';
import { ITrackInfo, ISong } from '../apis/api.results';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor (private http: HttpClient) { }

	async getSongs(songTitle: string, songArtists: string): Promise<ITrackInfo[]> {
		return await firstValueFrom(this.http.get<ITrackInfo[]>("http://localhost:5001/songs/", { params: { "title": songTitle, "artists": songArtists } }));
	}

	async getSongInfo(songId: string): Promise<ISong> {
		return await firstValueFrom(this.http.get<ISong>(`http://localhost:5001/songs/${songId}`));
	}
}