import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

	constructor(public dialog: MatDialog) {}

	openDialog() {
		
		const dialogRef = this.dialog.open(NewDialogComponent, {
			width: '80%',
			enterAnimationDuration: '500ms',
			exitAnimationDuration: '500ms',
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	onEditorContainerResize() {
		
		// Resize editor
		const editors = (<any>window).monaco.editor.getEditors()
		if (editors && editors.length > 0)
			editors[0].layout()
	}

	onDownloadButtonClick() {
		this.downloadFile("test.chopro", (<any>window).monaco.editor.getModels()[0].getValue());
	}

	downloadFile(filename: string, text: string) {

		// Create dummy element
		const element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
	  
		element.style.display = 'none';
		document.body.appendChild(element);
	  
		element.click();
	  
		document.body.removeChild(element);
	}
}
