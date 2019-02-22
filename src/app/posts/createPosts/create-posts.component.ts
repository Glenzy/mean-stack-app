import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IPost } from '../../shared/interfaces';
import { PostsService } from '../../services/posts.service'
import { ToggleCreatePostsFormService } from '../../services/toggle-create-posts.service'

@Component({
    selector: 'app-create-posts',
    templateUrl: './create-posts.component.html',
    styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
    title: String;
    newPost: IPost;
    formIsActive: boolean;
    constructor(
        public postsService: PostsService,
        public toggleCreatePostsFormService: ToggleCreatePostsFormService
    ) {
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
        this.toggleCreatePostsFormService.change.subscribe(formIsActive => {
            this.formIsActive = formIsActive;
        });
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
        console.log(this.newPost);
    }
    onClickAddPostBtn() {
        this.toggleCreatePostsFormService.onClickAddPostBtn();
    }
}
