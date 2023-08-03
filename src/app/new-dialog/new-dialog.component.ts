import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ISongInformation } from '../apis/api.results';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-new-dialog',
	templateUrl: './new-dialog.component.html',
	styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent {

	createSongDisabled: boolean = true;
	songTitleToSearch: string = "";
	songArtistsToSearch: string = "";

	searchResults: ISongInformation[] = [];

	private selectedSong: ISongInformation | undefined;

	constructor(public dialogRef: MatDialogRef<NewDialogComponent>, private apiService: ApiService) {}

	onSongSelected(event: MatSelectionListChange, selectedSongs: MatListOption[]) {

		if (selectedSongs.length > 0)
		{
			this.selectedSong = selectedSongs[0].value;
			this.createSongDisabled = false;
		}
	}

	onCreateButtonClick() {
		this.dialogRef.close(this.selectedSong);
	}

	async querySongSearch() {
		this.searchResults = await this.apiService.getSearchResults(this.songTitleToSearch, this.songArtistsToSearch);
	}
}