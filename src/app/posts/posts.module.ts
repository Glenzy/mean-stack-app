import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule
} from '@angular/material';

import { PostsComponent } from './posts.component';
import { CreatePostsComponent } from './createPosts/create-posts.component';
import { PostListComponent } from './postList/postlist.component';
import { ToggleCreatePostsFormService } from '../services/toggle-create-posts.service';

@NgModule({
    declarations: [
        PostsComponent,
        CreatePostsComponent,
        PostListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatExpansionModule,
    ],
    providers: [ToggleCreatePostsFormService],
    exports: [PostsComponent]
})
export class PostsModule { }
