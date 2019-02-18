import { Component, OnInit, Input } from '@angular/core';

import { PostsService } from '../../services/posts.service'

@Component({
    selector: 'app-postlist',
    templateUrl: './postlist.component.html',
    styleUrls: ['./postlist.component.scss']
})
export class PostListComponent implements OnInit {
    title: String;
    @Input() posts = [];
    constructor(public PostsService: PostsService) { }
    ngOnInit() {
        this.title = "Post List Component";
        this.posts = this.PostsService.getPosts();
    }
}
