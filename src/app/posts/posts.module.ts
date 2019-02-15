import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule } from '@angular/material';

import { HeaderComponent } from '../header/header.component';
import { PostsComponent } from './posts.component';
import { CreatePostsComponent } from './createPosts/create-posts.component';

@NgModule({
    declarations: [
        PostsComponent,
        CreatePostsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule
    ],
    exports: [PostsComponent]
})
export class PostsModule { }
