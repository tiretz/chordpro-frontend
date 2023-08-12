import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CommunicationService {

	private chords = new Subject<string[]>();
  
	chords$ = this.chords.asObservable();
  
	setInitialChords(initialChords: string[]) {
		this.chords.next(initialChords);
	}

	updateChords(chords: string[]) {
		this.chords.next(chords);
	}
}