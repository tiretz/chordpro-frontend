import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ISongInformation } from '../apis/api.results';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatDialogRef } from '@angular/material/dialog';
import { IAutomaticDialogResult, IManualDialogResult } from '../interfaces/dialog.results';
import { MatTabChangeEvent } from '@angular/material/tabs';

enum SongKey {
	Aflat = 'Ab',
	A = 'A',
	Asharp = 'A#',
	Bflat = 'Bb',
	B = 'B',
	C = 'C',
	Csharp = 'C#',
	Dflat = 'Db',
	D = 'D',
	Dsharp = 'D#',
	Eflat = 'Eb',
	E = 'E',
	F = 'F',
	Fsharp = 'F#',
	Gflat = 'Gb',
	G = 'G',
	Gsharp = 'G#'
}

enum SongMode {
	Major = 'Major',
	Minor = 'Minor'
}

@Component({
	selector: 'app-new-dialog',
	templateUrl: './new-dialog.component.html',
	styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent {

	selectedTabIndex: number = 0;

	createSongDisabled: boolean = true;
	songTitleToSearch: string = "";
	songArtistsToSearch: string = "";

	songTitle: string = "";
	songArtists: string = "";
	songAlbum: string = "";
	songKey: SongKey = SongKey.A;
	songMode: SongMode = SongMode.Major;
	songTime: string = '';
	songTempo: string = "";
	songDuration: string = "";

	keys: SongKey[] = Object.values(SongKey);
	modes: SongMode[] = Object.values(SongMode);

	searchResults: ISongInformation[] = [];

	private selectedSong: ISongInformation | undefined;

	constructor(private dialogRef: MatDialogRef<NewDialogComponent>, private apiService: ApiService) {}

	onSelectedTabChange(event: MatTabChangeEvent) {

		this.selectedTabIndex = event.index;

		if (this.selectedTabIndex == 1)
		{
			this.createSongDisabled = false;
			return;
		}

		if (this.selectedSong == undefined)
			this.createSongDisabled = true;
	}

	onSongSelected(event: MatSelectionListChange, selectedSongs: MatListOption[]) {

		if (selectedSongs.length > 0)
		{
			this.selectedSong = selectedSongs[0].value;
			this.createSongDisabled = false;
		}
	}

	onCreateButtonClick() {

		if (this.selectedTabIndex == 0)
		{
			this.dialogRef.close(this.selectedSong as IAutomaticDialogResult);
			return;
		}

		const combinedKey = `${this.songKey}${this.songMode == SongMode.Minor ? 'm' : ''}`;

		const manualDialogResult: IManualDialogResult = {
			album: this.songAlbum,
			artists: [ this.songArtists ],
			title: this.songTitle,
			bpm: Number(this.songTempo),
			duration: this.songDuration,
			key: combinedKey,
			timeSignature: this.songTime,
			albumCoverImg: '',
			chords: [],
			releaseDateAlbum: new Date(),
			spotifyLink: '',
			spotifySongID: ''
		};

		this.dialogRef.close(manualDialogResult);
	}

	async querySongSearch() {
		this.searchResults = await this.apiService.getSearchResults(this.songTitleToSearch, this.songArtistsToSearch);
	}
}