import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { EditorComponent } from './components/editor/editor.component';
import { NewDialogComponent } from './components/new-dialog/new-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverrideDialogComponent } from './components/override-dialog/override-dialog.component';
import { ChordSelectorComponent } from './components/chord-selector/chord-selector.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { SectionSelectorComponent } from './components/section-selector/section-selector.component';
import { InlinesSelectorComponent } from './components/inlines-selector/inlines-selector.component';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { provideEnvironmentNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

const monacoConfig: NgxMonacoEditorConfig = {
	baseUrl: 'assets',
};

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		EditorComponent,
		FooterComponent,
		NewDialogComponent,
		BodyComponent,
		OverrideDialogComponent,
		ChordSelectorComponent,
		LoadingOverlayComponent,
		SectionSelectorComponent,
  		InlinesSelectorComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MonacoEditorModule.forRoot(monacoConfig),
		FormsModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatDividerModule,
		MatDialogModule,
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatGridListModule,
		MatProgressSpinnerModule,
		MatTooltipModule,
		MatSelectModule,
		NgxMaskDirective,
		NgxMaskPipe
	],
	providers: [ provideEnvironmentNgxMask() ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }