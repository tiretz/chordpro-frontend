import { Component } from '@angular/core';
import { EditorService } from 'src/app/core/services/editor.service';

export enum InlineType {
	Square_brackets = '[]',
	Curly_brackets = '{}',
}

@Component({
	selector: 'app-inlines-selector',
	templateUrl: './inlines-selector.component.html',
	styleUrls: ['./inlines-selector.component.css'],
})
export class InlinesSelectorComponent {
	inlines: InlineType[] = [InlineType.Square_brackets, InlineType.Curly_brackets];

	constructor(private editorService: EditorService) {}

	insertInline(inline: string) {
		const selectedText = this.editorService.getModel().getValueInRange(this.editorService.getEditor().getSelection());

		let textToInsert = '';

		switch (inline) {
			case InlineType.Square_brackets:
				textToInsert = `[${selectedText}]`;
				break;

			case InlineType.Curly_brackets:
				textToInsert = `{${selectedText}}`;
				break;

			default:
				break;
		}

		this.editorService.getEditor().executeEdits('insert-preselected-text-with-inline', [
			{
				range: this.editorService.getEditor().getSelection(),
				text: textToInsert,
				forceMoveMarkers: true,
			},
		]);
		this.editorService.getEditor().focus();
	}
}
