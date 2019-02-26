import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePostsComponent } from './posts/createPosts/create-posts.component';

const routes: Routes = [
    { path: 'edit-post:postId', component: CreatePostsComponent },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}