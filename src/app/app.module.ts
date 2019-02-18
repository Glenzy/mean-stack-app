import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { PostsModule } from './posts/posts.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    HeaderModule,
    PostsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
