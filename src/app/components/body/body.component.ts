import { Component } from '@angular/core';

@Component({
	selector: 'app-body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.css']
})
export class BodyComponent {

	onEditorContainerResize() {
		
		// Resize editor
		const editors = (<any>window).monaco.editor.getEditors()
		if (editors && editors.length > 0)
			editors[0].layout()
	}
}