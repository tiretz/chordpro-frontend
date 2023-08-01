import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { ISongInformation, ISongMetaData } from '../apis/api.results';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

	constructor(public dialog: MatDialog, private apiService: ApiService) {}

	openDialog() {
		
		const dialogRef = this.dialog.open(NewDialogComponent, {
			width: '80%',
			enterAnimationDuration: '500ms',
			exitAnimationDuration: '500ms',
		});

		dialogRef.afterClosed().subscribe(async result => {

			const songInformation = result as ISongInformation;

			if (songInformation === undefined)
				return;
			
			console.log(songInformation);

			const songMetaData: ISongMetaData | null = await this.apiService.getSongMetaData(songInformation);
			console.log(songMetaData);

			if (songMetaData === null)
				return;

			const songLyrics: string | null = await this.apiService.getSongLyrics(songInformation);
			console.log(songLyrics);			
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
