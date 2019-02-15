import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';


import { PostsComponent } from './posts.component';
import { CreatePostsComponent } from './createPosts/create-posts.component';

@NgModule({
    declarations: [
        PostsComponent,
        CreatePostsComponent
    ],
    imports: [
        CommonModule,,
        MatToolbarModule,
    ],
    exports: [PostsComponent]
})
export class HeaderModule { }
