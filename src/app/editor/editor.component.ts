import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})
export class EditorComponent {

	editorOptions = {};

	code: string = 'function x() {\nconsole.log("Hello world!");\n}';

	onInit(editor: any) {
		
		// set default template
		editor.setValue(this.code)
	}
}
