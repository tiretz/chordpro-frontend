import { Component } from '@angular/core';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ApiService } from 'src/app/services/api.service';
import { IAutomaticDialogResult, IManualDialogResult } from 'src/app/interfaces/dialog.results';
import { ITrackInfo } from 'src/app/apis/api.results';
import { getChordsByKeyAndMode } from 'src/app/utils/utils';

enum SongKey {
	'A' = 9,
	'A#/Bb' = 10,
	'B' = 11,
	'C' = 0,
	'C#/Db' = 1,
	'D' = 2,
	'D#/EB' = 3,
	'E' = 4,
	'F' = 5,
	'F#/Gb' = 6,
	'G' = 7,
	'G#/Ab' = 8
}

enum SongMode {
	'Major' = 1,
	'Minor' = 0
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

	keys: { name: string, value: string | SongKey }[] = Object.entries(SongKey).map(([name, value]) => ({ name, value })).filter((v) => isNaN(Number(v.name)));
	modes: { name: string, value: string | SongMode }[] = Object.entries(SongMode).map(([name, value]) => ({ name, value })).filter((v) => isNaN(Number(v.name)));

	searchResults: ITrackInfo[] = [];

	private selectedSong: ITrackInfo | undefined;

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

		const chords = getChordsByKeyAndMode(this.songKey, this.songMode);

		const manualDialogResult: IManualDialogResult = {
			albumName: this.songAlbum,
			artists: [ this.songArtists ],
			title: this.songTitle,
			tempo: this.songTempo,
			duration: this.songDuration,
			key: chords.length > 0 ? chords[0] : '',
			timeSignature: this.songTime,
			albumCoverUrl: '',
			chords,
			albumReleaseDate: new Date(),
			spotifyUrl: '',
			id: '',
			mode: this.songMode,
		};

		this.dialogRef.close(manualDialogResult);
	}

	async querySongSearch() {
		this.searchResults = await this.apiService.getSongs(this.songTitleToSearch, this.songArtistsToSearch);
	}
}