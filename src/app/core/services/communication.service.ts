import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CommunicationService {
	private chords = new BehaviorSubject<string[]>([]);

	chords$ = this.chords.asObservable();

	setInitialChords(initialChords: string[]) {
		this.chords.next(initialChords);
	}

	updateChords(chords: string[]) {
		this.chords.next(chords);
	}
}
