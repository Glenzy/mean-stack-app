import { Component, OnInit } from '@angular/core';

import { IPost } from '../../shared/interfaces';
import { PostsService } from '../../services/posts.service'
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-postlist',
    templateUrl: './postlist.component.html',
    styleUrls: ['./postlist.component.scss']
})
export class PostListComponent implements OnInit {
    title: String;
    posts: IPost[] = [];
    PostsSubscription: any;
    constructor(public PostsService: PostsService) { }
    ngOnInit() {
        this.title = "Post List Component";
        this.PostsService.getPosts();
        this.PostsSubscription = this.PostsService.getPostUpdateListener()
            .subscribe((posts: IPost[]) => {
                this.posts = posts;
            });
    }
    ngOnDestroy() {
        this.PostsSubscription.unsubscribe();
    }

    onDelete(postId: string) {
        this.PostsService.deletePost(postId);
    }
}
