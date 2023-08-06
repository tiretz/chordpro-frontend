import { Component } from '@angular/core';

export enum InlineType {
	Square_brackets = '[]',
	Curly_brackets = '{}'
}

@Component({
	selector: 'app-inlines-selector',
	templateUrl: './inlines-selector.component.html',
	styleUrls: ['./inlines-selector.component.css']
})
export class InlinesSelectorComponent {

	inlines: InlineType[] = [
		InlineType.Square_brackets,
		InlineType.Curly_brackets
	];
}