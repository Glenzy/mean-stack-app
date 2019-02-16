import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { IPost } from '../../shared/interfaces';

@Component({
    selector: 'app-create-posts',
    templateUrl: './create-posts.component.html',
    styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
    title: String;
    enteredPostTitle: String;
    enteredPostContent: String;
    enteredCategory: String;
    enteredTag: String;
    newPost: IPost;
    formIsActive: boolean;
    @Output() postCreated = new EventEmitter;
    constructor() {
        this.newPost = {
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
    onCreatePost() {
        this.newPost.title = this.enteredPostTitle;
        this.newPost.category = this.enteredCategory;
        this.newPost.content = this.enteredPostContent;
        this.newPost.tag = this.enteredTag;
        this.postCreated.emit(this.newPost);
        console.log('title', this.enteredPostTitle);
        console.log('post', this.newPost);
    }
}
