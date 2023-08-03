import { Injectable } from '@angular/core';
import { ISongInformation, ISongMetaData } from './apis/api.results';
import { ApiService } from './api.service';
import { DocumentService } from './document.service';
import { LoadingOverlayService } from './loading-overlay.service';

@Injectable({
	providedIn: 'root'
})
export class EditorService {

	monacoEditor: any | undefined;

	constructor(private loadingOverlayService: LoadingOverlayService, private documentService: DocumentService, private apiService: ApiService) { }

	getEditorValue(): string | null {
		
		this.setEditorInstance();
		return this.monacoEditor.editor?.getModels()[0]?.getValue();
	}

	setEditorValue(value: string) {

		this.setEditorInstance();
		this.monacoEditor.editor?.getModels()[0]?.setValue(value);
	}

	async initNewSong(songInformation: ISongInformation) {

		this.loadingOverlayService.showLoadingOverlay('Query song meta data ...');

		const songMetaData: ISongMetaData | null = await this.apiService.getSongMetaData(songInformation);

		if (songMetaData === null)
			return;

		this.loadingOverlayService.updateLoadingOverlayMessage('Query song lyrics ...');

		const songLyrics: string | null = await this.apiService.getSongLyrics(songInformation);

		this.loadingOverlayService.updateLoadingOverlayMessage('Filling song template ...');

		this.documentService.setDocumentData(songInformation, songMetaData, songLyrics);

		this.setEditorValue(this.generateSongTemplateWithLyrics(songInformation, songMetaData, songLyrics));

		this.loadingOverlayService.hideLoadingOverlay();
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