import { Component } from '@angular/core';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { EditorService } from '../editor.service';
import { OverrideDialogComponent, OverrideDialogModel } from '../override-dialog/override-dialog.component';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from '../document.service';
import { IAutomaticDialogResult, IManualDialogResult } from '../interfaces/dialog.results';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

	constructor(private dialog: MatDialog, private editorService: EditorService, private documentService: DocumentService) {}

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

			const selectedTabIndex = dialogRef.componentInstance.selectedTabIndex;

			if (selectedTabIndex == 0) {

				const automaticResult = result as IAutomaticDialogResult;

				if (!automaticResult)
					return;
				
				this.editorService.initNewAutomaticSong(automaticResult);
			} else if (selectedTabIndex == 1) {

				const manualResult = result as IManualDialogResult;

				if (!manualResult)
					return;

				this.editorService.initNewManualSong(manualResult);
			}
		});
	}

	onDownloadButtonClick() {
		this.downloadFile(`${this.documentService.songInformation?.artists.join(', ')} - ${this.documentService.songInformation?.title}.chopro`, this.editorService.getEditorValue() || '');
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