import { Injectable } from '@angular/core';
import { ISongInformation, ISongMetaData } from './apis/api.results';
import { ApiService } from './api.service';
import { DocumentService } from './document.service';
import { LoadingOverlayService } from './loading-overlay.service';
import { IAutomaticDialogResult, IManualDialogResult } from './interfaces/dialog.results';

@Injectable({
	providedIn: 'root'
})
export class EditorService {

	private monacoEditor: any | undefined;
	private editor: any | undefined;
	private model: any | undefined;

	constructor(private loadingOverlayService: LoadingOverlayService, private documentService: DocumentService, private apiService: ApiService) { }

	getModel(): any {

		this.setMonacoInstance();
		return this.model;
	}

	getEditor(): any {

		this.setMonacoInstance();
		return this.editor;
	}

	getEditorValue(): string | null {
		return this.getEditor().getValue();
	}

	setEditorValue(value: string) {
		this.getEditor().setValue(value);
	}

	async initNewAutomaticSong(songInformation: IAutomaticDialogResult) {

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

	initNewManualSong(songInformationAndMetaData: IManualDialogResult) {

		const songInformation = songInformationAndMetaData as ISongInformation;
		const songMetaData = songInformationAndMetaData as ISongMetaData;

		this.loadingOverlayService.showLoadingOverlay('Filling song template ...');

		this.documentService.setDocumentData(songInformation, songMetaData);

		this.setEditorValue(this.generateSongTemplateWithLyrics(songInformation, songMetaData));

		this.loadingOverlayService.hideLoadingOverlay();
	}

	private setMonacoInstance() {

		if (this.monacoEditor === undefined)
			this.monacoEditor = (<any>window).monaco;

		if (this.editor === undefined)
			this.editor = this.monacoEditor.editor?.getEditors()[0];

		if (this.model === undefined)
			this.model = this.monacoEditor.editor?.getModels()[0];
	}

	private generateSongTemplateWithLyrics(songInformation: ISongInformation, songMetaData: ISongMetaData, songLyrics?: string | null): string {

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
			songLyrics || "",
		].join("\n");
	}
}