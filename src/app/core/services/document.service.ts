import { Injectable } from '@angular/core';
import { ISong } from '../models/api.results';
import { CommunicationService } from './communication.service';

@Injectable({
	providedIn: 'root',
})
export class DocumentService {
	songInfo: ISong | null = null;

	constructor(private communicationService: CommunicationService) {}

	setDocumentData(songInformation: ISong) {
		this.songInfo = songInformation;

		this.communicationService.setInitialChords(this.songInfo.chords);
	}
}
