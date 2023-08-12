import { Injectable } from '@angular/core';
import { ISongInformation, ISongMetaData } from '../apis/api.results';
import { CommunicationService } from './communication.service';

@Injectable({
	providedIn: 'root'
})
export class DocumentService {

	songInformation: ISongInformation | null = null;
	songMetaData: ISongMetaData | null = null;
	songLyrics: string | null | null = null;

	constructor(private communicationService: CommunicationService) { }

	setDocumentData(songInformation: ISongInformation, songMetaData: ISongMetaData, songLyrics?: string | null) {

		this.songInformation = songInformation;
		this.songMetaData = songMetaData;
		this.songLyrics = songLyrics || null;

		this.communicationService.setInitialChords(this.songMetaData.chords);
	}
}