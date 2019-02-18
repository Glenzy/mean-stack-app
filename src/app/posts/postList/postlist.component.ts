import { Component, OnInit } from '@angular/core';

import { IPost } from '../../shared/interfaces';
import { PostsService } from '../../services/posts.service'

@Component({
    selector: 'app-postlist',
    templateUrl: './postlist.component.html',
    styleUrls: ['./postlist.component.scss']
})
export class PostListComponent implements OnInit {
    title: String;
    posts: IPost[] = [];
    constructor(public PostsService: PostsService) { }
    ngOnInit() {
        this.title = "Post List Component";
        this.PostsService.getPosts();
        this.PostsService.getPostUpdateListener()
            .subscribe((posts: IPost[]) => {
                this.posts = posts;
            });
    }
}
