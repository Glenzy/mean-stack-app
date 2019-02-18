import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { IPost } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private Posts: IPost[] = [];
    private postsUpdated = new Subject<IPost[]>();
    private postsApiUrl = '/api/posts';
    constructor(private http: HttpClient) {

    }

    getPosts() {
        this.http.get<{ message: string, posts: IPost[] }>(`http:localhost` + this.postsApiUrl)
            .subscribe((postData) => {
                this.Posts = postData.posts;
                this.postsUpdated.next([...this.Posts]);
            });
        return this.Posts;
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(newPost: IPost) {
        this.Posts.push(newPost);
        this.postsUpdated.next([...this.Posts])
    }
}