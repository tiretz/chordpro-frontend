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
	defaultOptions: {
		theme: 'vs-dark',
		language: 'javascript',
		scrollBeyondLastLine: false,
		minimap: { enabled: false },
		automaticLayout: true,
		fixedOverflowWidgets: true,
		wordWrap: 'on',
    	wrappingStrategy: 'advanced',
	},
	onMonacoLoad: () => { console.log((<any>window).monaco); }
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

export class AppModule { }
