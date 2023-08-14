import { Component } from '@angular/core';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { OverrideDialogComponent, OverrideDialogModel } from '../override-dialog/override-dialog.component';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditorService } from 'src/app/services/editor.service';
import { DocumentService } from 'src/app/services/document.service';
import { IAutomaticDialogResult, IManualDialogResult } from 'src/app/interfaces/dialog.results';
import { saveFile } from 'src/app/utils/download.utils';

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

	async onDownloadButtonClick() {
		await saveFile(this.editorService.getEditorValue() || '', `${this.documentService.songInfo?.artists.join(', ') || 'Artist'} - ${this.documentService.songInfo?.title || 'Title'}.chopro`);
	}
}