import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
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
    PostsSubscription: Subscription;
    userIsAuthenticated = false;
    AuthListenerSubscription: Subscription;

    constructor(public PostsService: PostsService, private authservice: AuthService) { }

    ngOnInit() {
        this.PostsService.getPosts();
        this.PostsSubscription = this.PostsService.getPostUpdateListener()
            .subscribe((posts: IPost[]) => {
                this.posts = posts;
            });
        this.userIsAuthenticated = this.authservice.getAuthenticatedStatus();
        this.AuthListenerSubscription = this.authservice.getAuthStatusListener().subscribe((isAuthenticated) => {
            this.userIsAuthenticated = isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.PostsSubscription.unsubscribe();
        this.AuthListenerSubscription.unsubscribe();
    }

    onDelete(postId: string) {
        this.PostsService.deletePost(postId);
    }
}
