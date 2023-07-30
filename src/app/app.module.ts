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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

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
					[/\{(title|t|subtitle|st|su|album|artist|author|key|k|ok|capo|tempo|time|duration|book|number|flow|midi|midi-index|pitch|keywords|topic|copyright|footer|f|ccli|restrictions|composer|lyricist)(:[^{}]*)\}/, "meta-data-directives"],
					[/\{(comment|c|comment_bold|cb|comment_italic|ci|guitar_comment|gc)(:[^{}]*)\}/, "formatting-directives"],
					[/\{((start_of_chorus|soc)(:([^{}]*))?|end_of_chorus|eoc)\}/, "environment-directives-chorus"],
					[/\{((start_of_verse|sov)(:([^{}]*))?|end_of_verse|eov)\}/, "environment-directives-verse"],
					[/\{((start_of_tab|sot)(:([^{}]*))?|end_of_tab|eot)\}/, "environment-directives-tab"],
					[/\{((start_of_bridge|sob)((:|\\s)([^{}]*))?|end_of_bridge|eob)\}/, "environment-directives-bridge"],
					[/\{((start_of_part|sop)((:|\\s)([^{}]*))?|end_of_p|eop)\}/, "environment-directives-part"],
					[/\[.*?\]/, "chord-diagrams"],
					// [/((E|e|B|b|G|g|D|d|A|a){1}\\||\\|{1,2})/, "chord-diagrams-chords"],
					[/\{(define)(:([^{}]*))?\}/, "chord-diagrams-define"],
					[/\{(textsize|textfont|chordsize|chordfont)(:([^{}]*))?\}/, "fonts-sizes-colours"],
					[/\{(new_page|np|new_physical_page|npp)([^{}]*)\}/, "output-related-directives"],
				],
			},
		});

		// Define a new theme that contains only rules that match this language
		monaco.editor.defineTheme("chordpro-theme", {
			base: "vs-dark",
			inherit: true,
			rules: [
				{ token: "meta-data-directives", foreground: "D16969" },
				{ token: "formatting-directives", foreground: "808080", fontStyle: "italic" },
				{ token: "environment-directives-chorus", foreground: "569CD6" },
				{ token: "environment-directives-verse", foreground: "FFFFFF" },
				{ token: "environment-directives-tab", foreground: "DCDCAA" },
				{ token: "environment-directives-bridge", foreground: "FFFFFF" },
				{ token: "environment-directives-part", foreground: "FFFFFF" },
				{ token: "chord-diagrams", foreground: "B5CEA8" },
				// { token: "chord-diagrams-chords", foreground: "D16969" },
				{ token: "chord-diagrams-define", foreground: "FFFFFF" },
				{ token: "fonts-sizes-colours", foreground: "808080" },
				{ token: "output-related-directives", foreground: "808080" },
			],
			colors: {
				"editor.foreground": "#FFFFFF",
			},
		});

		// Register a completion item provider for the new language
		monaco.languages.registerCompletionItemProvider("chordpro", {
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
					{ label: "chorus", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{soc: Chorus}", "$0", "{eoc}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Chorus snipped.", range: range },
					{ label: "soc", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{soc: Chorus}", "$0"].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of chorus.", range: range },
					{ label: "eoc", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{eoc}", ""].join("\n"), documentation: "End of chorus.", range: range },
					{ label: "start_of_chorus", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{start_of_chorus: Chorus}", "$0"].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of chorus.", range: range },
					{ label: "end_of_chorus", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{end_of_chorus}", ""].join("\n"), documentation: "End of chorus.", range: range },

					// Verse
					{ label: "verse", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sov: Verse $0}", "", "{eov}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Verse snipped.", range: range },
					{ label: "sov", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sov: Verse $0}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of verse.", range: range },
					{ label: "eov", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{eov}", ""].join("\n"), documentation: "End of verse.", range: range },
					{ label: "start_of_verse", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{start_of_verse: Verse $0}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of verse.", range: range },
					{ label: "end_of_verse", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{end_of_verse}", ""].join("\n"), documentation: "End of verse.", range: range },

					// Bridge
					{ label: "bridge", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sob: Bridge}", "$0", "{eob}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Bridge snipped.", range: range },
					{ label: "sob", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sob: Bridge}", "$0"].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of bridge.", range: range },
					{ label: "eob", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{eob}", ""].join("\n"), documentation: "End of bridge.", range: range },
					{ label: "start_of_bridge", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{start_of_bridge: Bridge}", "$0"].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of bridge.", range: range },
					{ label: "end_of_bridge", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{end_of_bridge}", ""].join("\n"), documentation: "End of bridge.", range: range },

					// Part
					{ label: "part", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sop: $0}", "", "{eop}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Part snipped.", range: range },
					{ label: "sop", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sop: $0}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of part.", range: range },
					{ label: "eop", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{eop}", ""].join("\n"), documentation: "End of part.", range: range },
					{ label: "start_of_part", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{start_of_part: $0}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of part.", range: range },
					{ label: "end_of_part", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{end_of_part}", ""].join("\n"), documentation: "End of part.", range: range },

					// Tab
					{ label: "tab", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sot}", "$0", "{eot}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Tab snipped.", range: range },
					{ label: "sot", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sot}", "$0"].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of tab.", range: range },
					{ label: "eot", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{eot}", ""].join("\n"), documentation: "End of tab.", range: range },
					{ label: "start_of_tab", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{start_of_tab}", "$0"].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of tab.", range: range },
					{ label: "end_of_tab", kind: monaco.languages.CompletionItemKind.Text, insertText: ["{end_of_tab}", ""].join("\n"), documentation: "End of tab.", range: range },

					// Custom sections
					{ label: "intro", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sop: Intro}", "$0", "{eop}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of intro part.", range: range },
					{ label: "outro", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sop: Outro}", "$0", "{eop}"].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of outro part.", range: range },
					{ label: "instrumental", kind: monaco.languages.CompletionItemKind.Snippet, insertText: ["{sop: Instrumental}", "$0", "{eop}", ""].join("\n"), insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: "Start of instrumental part.", range: range },
				];
				return { suggestions: suggestions };
			},
		});

		// Create document with custom language and text template
		// monaco.editor.create(document.getElementsByClassName("editor-container")[0], {
		// 	theme: "chordpro-theme",
		// 	value: getInitialTemplate(),
		// 	language: "chordpro",
		// });

		function getInitialTemplate() {
			return [
				"{title: }",
				"{artist: }",
				"{key: E}",
				"{tempo: 120}",
				"{duration: 3:00}",
				"{midi: PC0.0:0}",
				"{keywords: English}",
				"",
				"",
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
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatDividerModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})

export class AppModule {
	
}