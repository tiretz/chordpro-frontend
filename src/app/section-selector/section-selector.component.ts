import { Component } from '@angular/core';

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
		SectionType.Chorus,
		SectionType.Verse_1,
		SectionType.Verse_2,
		SectionType.Verse_3,
		SectionType.Bridge,
		SectionType.Instrumental,
		SectionType.Solo,
		SectionType.Outro
	];
}