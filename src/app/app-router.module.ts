import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { PostsComponent } from './posts/posts.component';
import { SignupComponent } from "./signup/signup.component";
import { CreatePostsComponent } from "./posts/createPosts/create-posts.component";


const routes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'add-post', component: CreatePostsComponent },
    { path: 'edit-post/:postId', component: CreatePostsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
