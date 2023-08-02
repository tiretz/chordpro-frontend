import { Injectable } from '@angular/core';
import { ISongInformation, ISongMetaData } from './apis/api.results';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class EditorService {

	monacoEditor: any | undefined;

	constructor(private apiService: ApiService) { }

	async initNewSong(songInformation: ISongInformation) {

		this.setEditorInstance();

		const songMetaData: ISongMetaData | null = await this.apiService.getSongMetaData(songInformation);

		if (songMetaData === null)
			return;

		const songLyrics: string | null = await this.apiService.getSongLyrics(songInformation);

		this.monacoEditor.editor?.getModels()[0]?.setValue(this.generateSongTemplateWithLyrics(songInformation, songMetaData, songLyrics))
	}

	private setEditorInstance() {

		if (this.monacoEditor === undefined)
			this.monacoEditor = (<any>window).monaco;
	}

	private generateSongTemplateWithLyrics(songInformation: ISongInformation, songMetaData: ISongMetaData, songLyrics: string | null): string {

		return [
			`{title: ${songInformation.title}}`,
			`{artist: ${songInformation.artists.join(', ')}}`,
			`{album: ${songInformation.album}}`,
			`{key: ${songMetaData.key}}`,
			`{tempo: ${songMetaData.bpm.toFixed(0)}}`,
			`{time: ${songMetaData.timeSignature}}`,
			`{duration: ${songMetaData.duration}}`,
			"{midi: PC0.0:0}",
			"{keywords: English}",
			"",
			songLyrics ?? "",
		].join("\n");
	}
}