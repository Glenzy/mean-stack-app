import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PostsComponent } from './posts.component';
import { CreatePostsComponent } from './createPosts/create-posts.component';

@NgModule({
    declarations: [
        PostsComponent,
        CreatePostsComponent
    ],
    imports: [
        FormsModule
    ],
    exports: [PostsComponent]
})
export class PostsModule { }
