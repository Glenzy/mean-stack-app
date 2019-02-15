import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-create-posts',
    templateUrl: './create-posts.component.html',
    styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
    title: String;
    enteredValue: String;
    newPost: String;
    constructor() { }
    ngOnInit() {
        this.title = 'Create a Post';

    }
    onCreatePost() {
        this.newPost = this.enteredValue;
    }
}
