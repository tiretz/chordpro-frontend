import { Component } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

export enum SectionType {
	Intro = 'Intro',
	Chorus = 'Chorus',
	Verse_1 = 'Verse 1',
	Verse_2 = 'Verse 2',
	Verse_3 = 'Verse 3',
	Bridge = 'Bridge',
	Instrumental = 'Instrumental',
	Solo = 'Solo',
	Outro= 'Outro'
}

@Component({
	selector: 'app-section-selector',
	templateUrl: './section-selector.component.html',
	styleUrls: ['./section-selector.component.css']
})
export class SectionSelectorComponent {

	sections: SectionType[] = [
		SectionType.Intro,
		SectionType.Verse_1,
		SectionType.Chorus,
		SectionType.Verse_2,
		SectionType.Bridge,
		SectionType.Verse_3,
		SectionType.Instrumental,
		SectionType.Solo,
		SectionType.Outro
	];

	constructor(private editorService: EditorService) { }

	insertSection(section: string) {

		const selectedText = this.editorService.getModel().getValueInRange(this.editorService.getEditor().getSelection());

		let snippet = '';

		switch(section) {
			case SectionType.Intro:
				snippet = 'intro';
				break;
			
			case SectionType.Chorus:
				snippet = 'chorus';
				break;

			case SectionType.Verse_1:
				snippet = 'verse1';
				break;

			case SectionType.Verse_2:
				snippet = 'verse2';
				break;

			case SectionType.Verse_3:
				snippet = 'verse3';
				break;

			case SectionType.Bridge:
				snippet = 'bridge';
				break;

			case SectionType.Instrumental:
				snippet = 'instrumental';
				break;

			case SectionType.Solo:
				snippet = 'solo';
				break;

			case SectionType.Outro:
				snippet = 'outro';
				break;
			
			default:
				break;
		};

		this.editorService.getEditor().trigger('keyboard', 'editor.action.triggerSuggest', {});
		this.editorService.getEditor().trigger('keyboard', 'type', { text: snippet });

		setTimeout(() => {
			this.editorService.getEditor().trigger('editor', 'acceptSelectedSuggestion', {});
			this.editorService.getEditor().executeEdits("insert-preselected-text", [{ range: this.editorService.getEditor().getSelection(), text: selectedText, forceMoveMarkers: true }]);
			this.editorService.getEditor().focus();
		}, 100);
	}
}