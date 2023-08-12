import { Component } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})
export class EditorComponent {

	options: any = { }

	constructor (private editorService: EditorService) { }

	onMonacoEditorInit(editor: any) {
		this.editorService.initMonacoEditor(editor);
	}
}