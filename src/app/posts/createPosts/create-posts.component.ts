import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IPost } from '../../shared/interfaces';
import { PostsService } from '../../services/posts.service'

@Component({
    selector: 'app-create-posts',
    templateUrl: './create-posts.component.html',
    styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
    title: String;
    newPost: IPost;
    formIsActive: boolean;
    constructor(public postsService: PostsService) {
        this.newPost = {
            id: null,
            title: '',
            category: '',
            content: '',
            tag: ''
        };
        this.formIsActive = false;
    }
    ngOnInit() {
        this.title = 'Create a Post';
    }
    onClickAddPostBtn() {
        return this.formIsActive = !this.formIsActive;
    }
    onCreatePost(form: NgForm) {
        if (form.invalid) {
            return
        }
        this.newPost.title = form.value.title;
        this.newPost.category = form.value.category;
        this.newPost.content = form.value.content;
        this.newPost.tag = form.value.tag;
        this.postsService.addPost(this.newPost);
    }
}
