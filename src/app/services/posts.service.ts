import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operator'
import { HttpClient } from '@angular/common/http'

import { IPost } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private Posts: IPost[] = [];
    private postsUpdated = new Subject<IPost[]>();
    private postsApiUrl = '/api/posts';
    private port = 3030
    constructor(private http: HttpClient) {

    }

    getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3030/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map((post) => {
                    title: post.title,
                        content: post.content,
                            id: post._id
                })
            }))
            .subscribe((postData) => {
                console.log(postData);
                this.Posts = postData.posts || [];
                this.postsUpdated.next([...this.Posts]);
            });
        return this.Posts;
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(newPost: IPost) {
        const post = newPost;
        this.http.post<{ post: IPost[] }>('http://localhost:3030/api/posts', post)
            .subscribe((postResponse) => {
                this.Posts.push(post);
                this.postsUpdated.next([...this.Posts])
            });
    }
}