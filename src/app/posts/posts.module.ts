import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule
} from '@angular/material';

import { PostsComponent } from './posts.component';
import { CreatePostsComponent } from './createPosts/create-posts.component';
import { PostListComponent } from './postList/postlist.component'

@NgModule({
    declarations: [
        PostsComponent,
        CreatePostsComponent,
        PostListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule
    ],
    exports: [PostsComponent]
})
export class PostsModule { }
