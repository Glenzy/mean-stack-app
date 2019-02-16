import { Component, OnInit } from '@angular/core';

import { IPostList } from '../shared/interfaces';
@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    title: String;
    storedPosts: IPostList[];
    constructor() {
        this.storedPosts = [];
    }
    ngOnInit() {
        this.title = "Posts Component";
    }

    onPostAdded(post) {
        this.storedPosts.push(post);
    }
}
