import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditorComponent } from './editor/editor.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { MatToolbarModule } from '@angular/material/toolbar';

const monacoConfig: NgxMonacoEditorConfig = {
	baseUrl: 'assets',
	defaultOptions: {
		language: "chordpro",
		theme: "chordpro-theme",
		scrollBeyondLastLine: false,
		minimap: { enabled: true },
		automaticLayout: true,
		fixedOverflowWidgets: true,
		wordWrap: 'on',
    	wrappingStrategy: 'advanced',
	},
	onMonacoLoad: () => { 
		const monaco = (<any>window).monaco

		// Register a new language
		monaco.languages.register({ id: "chordpro" });

		// Register a tokens provider for the language
		monaco.languages.setMonarchTokensProvider("chordpro", {
			defaultToken: '',
			tokenizer: {
				root: [
					[/\{(new_song|ns)([^{}]*)\}/, 'preamble-directives'],
					[/\{(title|t|subtitle|st|artist|composer|lyricist|copyright|album|year|key|time|tempo|duration|capo|meta|midi|keywords)(:[^{}]*)\}/, "meta-data-directives"],
					[/\{(comment|c|comment_italic|ci|comment_box|cb|highlight|image)(:[^{}]*)\}/, "formatting-directives"],
					[/\{((start_of_chorus|soc|chorus)(:([^{}]*))?|end_of_chorus|eoc)\}/, "environment-directives-chorus"],
					[/\{((start_of_verse)(:([^{}]*))?|end_of_verse)\}/, "environment-directives-verse"],
					[/\{((start_of_tab|sot)(:([^{}]*))?|end_of_tab|eot)\}/, "environment-directives-tab"],
					[/\{((start_of_grid)((:|\\s)([^{}]*))?|end_of_grid)\}/, "environment-directives-grid"],
					[/\[.*?\]/, "chord-diagrams"],
					// [/((E|e|B|b|G|g|D|d|A|a){1}\\||\\|{1,2})/, "chord-diagrams-chords"],
					[/\{(define|chord)(:([^{}]*))?\}/, "chord-diagrams-define"],
					[/\{(textfont|textsize|textcolour|chordcolour|tabcolour|tabsize)(:([^{}]*))?\}/, "fonts-sizes-colours"],
					[/\{(new_page|np|new_physical_page|npp|column_break|cb|grid|g|no_grid|ng)([^{}]*)\}/, "output-related-directives"],
					[/\{(columns|col)(:([^{}]*))?\}/, "output-related-directives-column"],
				],
			},
		});

		// Define a new theme that contains only rules that match this language
		monaco.editor.defineTheme("chordpro-theme", {
			base: "vs-dark",
			inherit: true,
			rules: [
				{ token: "preamble-directives", foreground: "808080" },
				{ token: "meta-data-directives", foreground: "D16969" },
				{ token: "formatting-directives", foreground: "808080", fontStyle: "italic" },
				{ token: "environment-directives-chorus", foreground: "569CD6" },
				{ token: "environment-directives-verse", foreground: "FFFFFF" },
				{ token: "environment-directives-tab", foreground: "DCDCAA" },
				{ token: "environment-directives-grid", foreground: "FFFFFF" },
				{ token: "chord-diagrams", foreground: "B5CEA8" },
				// { token: "chord-diagrams-chords", foreground: "D16969" },
				{ token: "chord-diagrams-define", foreground: "FFFFFF" },
				{ token: "fonts-sizes-colours", foreground: "808080" },
				{ token: "output-related-directives", foreground: "808080" },
				{ token: "output-related-directives-column", foreground: "808080" },
			],
			colors: {
				"editor.foreground": "#FFFFFF",
			},
		});

		// Register a completion item provider for the new language
		// monaco.languages.registerCompletionItemProvider("chordpro", {
		// 	provideCompletionItems: (model: any, position: any) => {
		// 		var word = model.getWordUntilPosition(position);
		// 		var range = {
		// 			startLineNumber: position.lineNumber,
		// 			endLineNumber: position.lineNumber,
		// 			startColumn: word.startColumn,
		// 			endColumn: word.endColumn,
		// 		};
		// 		var suggestions = [
		// 			{
		// 				label: "simpleText",
		// 				kind: monaco.languages.CompletionItemKind.Text,
		// 				insertText: "simpleText",
		// 				range: range,
		// 			},
		// 			{
		// 				label: "testing",
		// 				kind: monaco.languages.CompletionItemKind.Keyword,
		// 				insertText: "testing(${1:condition})",
		// 				insertTextRules:
		// 					monaco.languages.CompletionItemInsertTextRule
		// 						.InsertAsSnippet,
		// 				range: range,
		// 			},
		// 			{
		// 				label: "ifelse",
		// 				kind: monaco.languages.CompletionItemKind.Snippet,
		// 				insertText: [
		// 					"if (${1:condition}) {",
		// 					"\t$0",
		// 					"} else {",
		// 					"\t",
		// 					"}",
		// 				].join("\n"),
		// 				insertTextRules:
		// 					monaco.languages.CompletionItemInsertTextRule
		// 						.InsertAsSnippet,
		// 				documentation: "If-Else Statement",
		// 				range: range,
		// 			},
		// 		];
		// 		return { suggestions: suggestions };
		// 	},
		// });

		// Create document with custom language and text template
		// monaco.editor.create(document.getElementsByClassName("editor-container")[0], {
		// 	theme: "chordpro-theme",
		// 	value: getInitialTemplate(),
		// 	language: "chordpro",
		// });

		function getInitialTemplate() {
			return [
				"{title: Template}",
				"{artist: Template}",
				"{key: E}",
				"{tempo: 120}",
				"{duration: 3:00}",
				"{midi: PC0.0:0}",
				"{keywords: English}"
			].join("\n");
		}

		// Dirty workaround to remove initial editor
		const editorContainer = document.getElementById("editor-container");
		if (editorContainer)
			editorContainer.innerHTML = "";

		// Create new document (model)
		monaco.editor.create(editorContainer, {
			value: getInitialTemplate(),
			language: "chordpro",
			theme: "chordpro-theme",
		});
	}
};

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		EditorComponent,
		FooterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MonacoEditorModule.forRoot(monacoConfig),
		MatToolbarModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})

export class AppModule {
	
}