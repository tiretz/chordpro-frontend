import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Subscription } from 'rxjs';
import { EditorService } from '../editor.service';

@Component({
	selector: 'app-chord-selector',
	templateUrl: './chord-selector.component.html',
	styleUrls: ['./chord-selector.component.css']
})
export class ChordSelectorComponent implements OnInit, OnDestroy {

	chords: string[] = [];

	private initialChordsSubscription: Subscription | undefined;

	constructor(private communicationService: CommunicationService, private editorService: EditorService) {}

	ngOnDestroy(): void {
		this.initialChordsSubscription?.unsubscribe();
	}

	ngOnInit(): void {
		this.initialChordsSubscription = this.communicationService.initialChords$.subscribe((chords) => {
			this.chords = chords;
		});
	}

	insertChord(chord: string) {

		this.editorService.getEditor().executeEdits("insert-chord", [{ range: this.editorService.getEditor().getSelection(), text: `[${chord}]`, forceMoveMarkers: true }]);
		this.editorService.getEditor().focus();
	}
}