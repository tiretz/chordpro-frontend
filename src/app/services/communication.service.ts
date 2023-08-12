import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CommunicationService {

	private initialChords = new Subject<string[]>();
  
	initialChords$ = this.initialChords.asObservable();
  
	setInitialChords(initialChords: string[]) {
		this.initialChords.next(initialChords);
	}
}