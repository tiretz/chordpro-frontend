import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { EditorService } from 'src/app/core/services/editor.service';

@Component({
	selector: 'app-chord-selector',
	templateUrl: './chord-selector.component.html',
	styleUrls: ['./chord-selector.component.css'],
})
export class ChordSelectorComponent implements OnInit, OnDestroy {
	chords: string[] = [];

	private initialChordsSubscription: Subscription | undefined;

	constructor(private communicationService: CommunicationService, private editorService: EditorService) {}

	ngOnDestroy(): void {
		this.initialChordsSubscription?.unsubscribe();
	}

	ngOnInit(): void {
		this.initialChordsSubscription = this.communicationService.chords$.subscribe((chords) => {
			this.chords = chords;
		});
	}

	insertChord(chord: string) {
		this.editorService.insertChord(chord);
	}
}
