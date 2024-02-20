import { ChangeDetectorRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ISong } from '../models/api.results';
import { ApiService } from './api.service';
import { DocumentService } from './document.service';
import { LoadingOverlayService } from './loading-overlay.service';
import { IAutomaticDialogResult, IManualDialogResult } from '../models/dialog.results';
import { CommunicationService } from './communication.service';
import { adaptLyrics } from '../../shared/utils/utils';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EditorService implements OnDestroy {
	private editor: any | undefined;
	private model: any | undefined;

	private chords: string[] | undefined;
	private chordsSubscription: Subscription | undefined;

	constructor(private loadingOverlayService: LoadingOverlayService, private documentService: DocumentService, private apiService: ApiService, private communicationService: CommunicationService) {
		this.onValueChange = this.onValueChange.bind(this);

		this.chordsSubscription = this.communicationService.chords$.subscribe((chords) => {
			this.chords = chords;
		});
	}

	ngOnDestroy(): void {
		this.chordsSubscription?.unsubscribe();
	}

	initMonacoEditor(editor: any): void {
		const monaco = (<any>window).monaco;

		// Register a new language
		monaco.languages.register({ id: 'chordpro' });

		// Language configuration
		const languageConfig = {
			surroundingPairs: [
				{ open: '{', close: '}' },
				{ open: '[', close: ']' },
				{ open: '(', close: ')' },
				{ open: '<', close: '>' },
				{ open: "'", close: "'" },
				{ open: '"', close: '"' },
			],
			autoClosingPairs: [
				{ open: '{', close: '}' },
				{ open: '[', close: ']' },
				{ open: '(', close: ')' },
				{ open: "'", close: "'", notIn: ['string', 'comment'] },
				{ open: '"', close: '"', notIn: ['string', 'comment'] },
			],
		};

		monaco.languages.setLanguageConfiguration('chordpro', languageConfig);

		// Register a tokens provider for the language
		monaco.languages.setMonarchTokensProvider('chordpro', {
			defaultToken: '',
			tokenizer: {
				root: [
					[
						/\{(title|t|subtitle|st|su|album|artist|author|key|k|ok|capo|tempo|time|duration|book|number|flow|midi|midi-index|pitch|keywords|topic|copyright|footer|f|ccli|restrictions|composer|lyricist)(:[^{}]*)\}/,
						'meta-data-directives',
					],
					[/\{(comment|c|comment_bold|cb|comment_italic|ci|guitar_comment|gc)(:[^{}]*)\}/, 'formatting-directives'],
					[/\{((start_of_chorus|soc)(:([^{}]*))?|end_of_chorus|eoc)\}/, 'environment-directives-chorus'],
					[/\{((start_of_verse|sov)(:([^{}]*))?|end_of_verse|eov)\}/, 'environment-directives-verse'],
					[/\{((start_of_tab|sot)(:([^{}]*))?|end_of_tab|eot)\}/, 'environment-directives-tab'],
					[/\{((start_of_bridge|sob)((:|\\s)([^{}]*))?|end_of_bridge|eob)\}/, 'environment-directives-bridge'],
					[/\{((start_of_part|sop)((:|\\s)([^{}]*))?|end_of_p|eop)\}/, 'environment-directives-part'],
					[/\[.*?\]/, 'chord-diagrams'],
					// [/((E|e|B|b|G|g|D|d|A|a){1}\\||\\|{1,2})/, "chord-diagrams-chords"],
					[/\{(define)(:([^{}]*))?\}/, 'chord-diagrams-define'],
					[/\{(textsize|textfont|chordsize|chordfont)(:([^{}]*))?\}/, 'fonts-sizes-colours'],
					[/\{(new_page|np|new_physical_page|npp)([^{}]*)\}/, 'output-related-directives'],
				],
			},
		});

		// Define a new theme that contains only rules that match this language
		monaco.editor.defineTheme('chordpro-theme', {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{ token: 'meta-data-directives', foreground: 'D16969' },
				{
					token: 'formatting-directives',
					foreground: '808080',
					fontStyle: 'italic',
				},
				{
					token: 'environment-directives-chorus',
					foreground: '569CD6',
				},
				{ token: 'environment-directives-verse', foreground: 'FFFFFF' },
				{ token: 'environment-directives-tab', foreground: 'DCDCAA' },
				{
					token: 'environment-directives-bridge',
					foreground: 'FFFFFF',
				},
				{ token: 'environment-directives-part', foreground: 'FFFFFF' },
				{ token: 'chord-diagrams', foreground: 'B5CEA8' },
				// { token: "chord-diagrams-chords", foreground: "D16969" },
				{ token: 'chord-diagrams-define', foreground: 'FFFFFF' },
				{ token: 'fonts-sizes-colours', foreground: '808080' },
				{ token: 'output-related-directives', foreground: '808080' },
			],
			colors: {
				'editor.foreground': '#FFFFFF',
			},
		});

		// Register a completion item provider for the new language
		monaco.languages.registerCompletionItemProvider('chordpro', {
			provideCompletionItems: (model: any, position: any) => {
				var word = model.getWordUntilPosition(position);
				var range = {
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber,
					startColumn: word.startColumn,
					endColumn: word.endColumn,
				};
				var suggestions = [
					// Chorus
					{
						label: 'chorus',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{soc: Chorus}', '$0', '{eoc}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Chorus snipped.',
						range: range,
					},
					{
						label: 'soc',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{soc: Chorus}', '$0'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of chorus.',
						range: range,
					},
					{
						label: 'eoc',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{eoc}'].join('\n'),
						documentation: 'End of chorus.',
						range: range,
					},
					{
						label: 'start_of_chorus',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{start_of_chorus: Chorus}', '$0'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of chorus.',
						range: range,
					},
					{
						label: 'end_of_chorus',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{end_of_chorus}'].join('\n'),
						documentation: 'End of chorus.',
						range: range,
					},

					// Verse
					{
						label: 'verse',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sov: Verse $0}', '', '{eov}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Verse snipped.',
						range: range,
					},
					{
						label: 'verse_1',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sov: Verse 1}', '$0', '{eov}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Verse 1 snipped.',
						range: range,
					},
					{
						label: 'verse_2',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sov: Verse 2}', '$0', '{eov}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Verse 2 snipped.',
						range: range,
					},
					{
						label: 'verse_3',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sov: Verse 3}', '$0', '{eov}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Verse 3 snipped.',
						range: range,
					},
					{
						label: 'verse_4',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sov: Verse 4}', '$0', '{eov}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Verse 4 snipped.',
						range: range,
					},
					{
						label: 'verse_5',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sov: Verse 5}', '$0', '{eov}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Verse 5 snipped.',
						range: range,
					},
					{
						label: 'sov',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sov: Verse $0}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of verse.',
						range: range,
					},
					{
						label: 'eov',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{eov}'].join('\n'),
						documentation: 'End of verse.',
						range: range,
					},
					{
						label: 'start_of_verse',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{start_of_verse: Verse $0}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of verse.',
						range: range,
					},
					{
						label: 'end_of_verse',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{end_of_verse}'].join('\n'),
						documentation: 'End of verse.',
						range: range,
					},

					// Bridge
					{
						label: 'bridge',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sob: Bridge}', '$0', '{eob}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Bridge snipped.',
						range: range,
					},
					{
						label: 'sob',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sob: Bridge}', '$0'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of bridge.',
						range: range,
					},
					{
						label: 'eob',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{eob}'].join('\n'),
						documentation: 'End of bridge.',
						range: range,
					},
					{
						label: 'start_of_bridge',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{start_of_bridge: Bridge}', '$0'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of bridge.',
						range: range,
					},
					{
						label: 'end_of_bridge',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{end_of_bridge}'].join('\n'),
						documentation: 'End of bridge.',
						range: range,
					},

					// Part
					{
						label: 'part',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: $0}', '', '{eop}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Part snipped.',
						range: range,
					},
					{
						label: 'sop',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: $0}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of part.',
						range: range,
					},
					{
						label: 'eop',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{eop}'].join('\n'),
						documentation: 'End of part.',
						range: range,
					},
					{
						label: 'start_of_part',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{start_of_part: $0}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of part.',
						range: range,
					},
					{
						label: 'end_of_part',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{end_of_part}'].join('\n'),
						documentation: 'End of part.',
						range: range,
					},

					// Tab
					{
						label: 'tab',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sot}', '$0', '{eot}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Tab snipped.',
						range: range,
					},
					{
						label: 'sot',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sot}', '$0'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of tab.',
						range: range,
					},
					{
						label: 'eot',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{eot}'].join('\n'),
						documentation: 'End of tab.',
						range: range,
					},
					{
						label: 'start_of_tab',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{start_of_tab}', '$0'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Start of tab.',
						range: range,
					},
					{
						label: 'end_of_tab',
						kind: monaco.languages.CompletionItemKind.Text,
						insertText: ['{end_of_tab}'].join('\n'),
						documentation: 'End of tab.',
						range: range,
					},

					// Custom sections
					{
						label: 'pre_chorus',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: Pre-Chorus}', '$0', '{eop}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Insert pre-chorus section.',
						range: range,
					},
					{
						label: 'post_chorus',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: Post-Chorus}', '$0', '{eop}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Insert post-chorus section.',
						range: range,
					},
					{
						label: 'intro',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: Intro}', '$0', '{eop}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Insert intro section.',
						range: range,
					},
					{
						label: 'outro',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: Outro}', '$0', '{eop}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Insert outro section.',
						range: range,
					},
					{
						label: 'instrumental',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: Instrumental}', '$0', '{eop}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Insert instrumental section.',
						range: range,
					},
					{
						label: 'solo',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: ['{sop: Solo}', '$0', '{eop}'].join('\n'),
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Insert solo section.',
						range: range,
					},
					{
						label: 'comment',
						kind: monaco.languages.CompletionItemKind.Snippet,
						insertText: '{c: $0}',
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
						documentation: 'Insert comment.',
						range: range,
					},
				];
				return { suggestions: suggestions };
			},
		});

		// Update editor options
		editor.updateOptions({
			value: null,
			theme: 'chordpro-theme',
			scrollBeyondLastLine: false,
			minimap: { enabled: true },
			automaticLayout: true,
			fixedOverflowWidgets: true,
			wordWrap: 'on',
			wrappingStrategy: 'advanced',
			autoClosingBrackets: 'languageDefined',
		});

		// Add chord-insert commands
		for (let index = 0; index < 9; index++) {
			editor.addCommand(monaco.KeyMod.WinCtrl | monaco.KeyCode[`Digit${index + 1}`], () => {
				if (this.chords && this.chords.length > index) {
					this.insertChord(this.chords[index]);
				}
			});
		}

		this.editor = editor;
		this.model = editor.getModel();

		monaco.editor.setModelLanguage(this.model, 'chordpro');

		this.model.onDidChangeContent(this.onValueChange);
	}

	getModel(): any {
		return this.model;
	}

	getEditor(): any {
		return this.editor;
	}

	getEditorValue(): string | null {
		return this.editor?.getValue();
	}

	setEditorValue(value: string): void {
		this.editor?.setValue(value);
	}

	async onValueChange(event: any): Promise<void> {
		const content = this.getEditorValue();

		if (!content) return;

		await this.checkKeyChange(content);
		this.updateChordSelector(content);
	}

	async initNewAutomaticSong(songInformation: IAutomaticDialogResult): Promise<void> {
		this.loadingOverlayService.showLoadingOverlay('Query song data ...');

		const songInfo: ISong = await this.apiService.getSongInfo(songInformation.id);

		if (songInfo === null) return;

		this.loadingOverlayService.updateLoadingOverlayMessage('Filling song template ...');

		this.documentService.setDocumentData(songInfo);

		this.setEditorValue(this.generateSongTemplateWithLyrics(songInfo));

		this.loadingOverlayService.hideLoadingOverlay();
	}

	initNewManualSong(songInformationAndMetaData: IManualDialogResult): void {
		const songInfo = songInformationAndMetaData as ISong;

		this.loadingOverlayService.showLoadingOverlay('Filling song template ...');

		this.documentService.setDocumentData(songInfo);

		this.setEditorValue(this.generateSongTemplateWithLyrics(songInfo));

		this.loadingOverlayService.hideLoadingOverlay();
	}

	insertChord(chord: string): void {
		this.editor.executeEdits('insert-chord', [
			{
				range: this.editor.getSelection(),
				text: `[${chord}]`,
				forceMoveMarkers: true,
			},
		]);
		this.editor.focus();
	}

	private generateSongTemplateWithLyrics(songInfo: ISong): string {
		return [
			`{title: ${songInfo.title}}`,
			`{artist: ${songInfo.artists.join(', ')}}`,
			`{album: ${songInfo.albumName}}`,
			`{key: ${songInfo.key}}`,
			`{tempo: ${Number(songInfo.tempo).toFixed(0)}}`,
			`{time: ${songInfo.timeSignature}}`,
			`{duration: ${songInfo.duration}}`,
			'{midi: PC0.0:0}',
			'{keywords: English}',
			'',
			adaptLyrics(songInfo.lyrics) || '',
		].join('\n');
	}

	private updateChordSelector(content: string): void {
		const regexMatches: IterableIterator<RegExpMatchArray> = content.matchAll(/\[(([A-G](#|b)?)(\(?(M|maj|major|m|min|minor|dim|sus|dom|aug)?(\+|-|add)?\d*\)?)(\/([A-G](#|b)?))?)\]/g);
		const matches: RegExpMatchArray[] = [...regexMatches];

		if (matches.length === 0) return;

		const chordMap = new Map<string, { chord: string; occurence: number }>();

		for (const match of matches) {
			const chord: string = match[1].toLowerCase();

			if (chord === '') continue;

			chordMap.set(chord, {
				chord: match[1],
				occurence: (chordMap.get(chord)?.occurence ?? 0) + 1,
			});
		}

		const chordsSortedByOccurrence: string[] = [...chordMap.entries()].sort((a, b) => b[1].occurence - a[1].occurence).map((pair) => pair[1].chord);

		const finalChords: string[] = chordsSortedByOccurrence;

		const keyChords: string[] | undefined = this.documentService.songInfo?.chords;

		if (keyChords) {
			for (const chord of keyChords) {
				if (finalChords.indexOf(chord) === -1) finalChords.push(chord);
			}
		}

		this.communicationService.updateChords(chordsSortedByOccurrence);
	}

	private async checkKeyChange(content: string): Promise<void> {
		const regexMatches: IterableIterator<RegExpMatchArray> = content.matchAll(/{key: ?([A-G][b|#]?m?)}/g);
		const matches: RegExpMatchArray[] = [...regexMatches];

		if (matches.length === 0) return;

		for (const match of matches) {
			const newKey = match[1];

			if (newKey == this.documentService.songInfo?.key) break;

			const newChord = await this.apiService.getChordInfoByNoteName(newKey);

			if (this.documentService.songInfo) {
				this.documentService.songInfo.key = newChord.key!;
				this.documentService.songInfo.chords = newChord.chords;
				this.communicationService.setInitialChords(newChord.chords);
			}
			break;
		}
	}
}
