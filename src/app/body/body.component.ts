import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { ISongInformation } from '../apis/api.results';
import { EditorService } from '../editor.service';
import { OverrideDialogComponent, OverrideDialogModel } from '../override-dialog/override-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

	constructor(private dialog: MatDialog, private editorService: EditorService) {}

	async openDialog() {

		if (this.editorService.getEditorValue())
		{
			const dialogRef = this.dialog.open(OverrideDialogComponent, {
				width: '400px',
				enterAnimationDuration: '500ms',
				exitAnimationDuration: '500ms',
				data: new OverrideDialogModel('Override document', 'Do you really want to override your current song document?')
			});

			const overrideResult = await firstValueFrom(dialogRef.afterClosed());

			if (!overrideResult)
				return;
		}

		this.editorService.setEditorValue('');
				
		const dialogRef = this.dialog.open(NewDialogComponent, {
			width: '80%',
			enterAnimationDuration: '500ms',
			exitAnimationDuration: '500ms',
		});

		dialogRef.afterClosed().subscribe(async result => {

			const songInformation = result as ISongInformation;

			if (songInformation === undefined)
				return;

			this.editorService.initNewSong(songInformation);
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
