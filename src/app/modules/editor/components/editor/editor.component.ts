import { Component } from '@angular/core';
import { DocumentService } from 'src/app/core/services/document.service';
import { EditorService } from 'src/app/core/services/editor.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
	options: any = {};

	constructor(private editorService: EditorService, private documentService: DocumentService) {}

	onDropAreaDragOver(event: DragEvent): void {
		event.stopImmediatePropagation();
		event.preventDefault();

		if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
	}

	async onDropAreaDrop(event: DragEvent): Promise<void> {
		event.stopImmediatePropagation();
		event.preventDefault();

		if (event.dataTransfer && event.dataTransfer.files.length > 0 && event.dataTransfer.files[0].name.toLowerCase().endsWith('.chopro')) {
			const file = event.dataTransfer.files[0];
			this.editorService.setEditorValue(await file.text());
			this.documentService.setDocumentData({
				albumCoverUrl: '',
				albumName: '',
				albumReleaseDate: new Date(),
				artists: [],
				chords: [],
				duration: '',
				id: '',
				key: '',
				lyrics: '',
				mode: 0,
				spotifyUrl: '',
				tempo: '',
				timeSignature: '',
				title: '',
			});
		}
	}

	onMonacoEditorInit(editor: any): void {
		this.editorService.initMonacoEditor(editor);
	}
}
