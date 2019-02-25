import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
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
                    return {
                        title: post.title,
                        content: post.content,
                        tag: post.tag,
                        category: post.category,
                        id: post._id
                    }
                })
            }))
            .subscribe((postData) => {
                this.Posts = postData || [];
                console.log('this.Posts', this.Posts);
                console.log('postData', postData);
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

    deletePost(postId: string) {
        this.http.delete('http://localhost:3030/api/posts/?id=' + postId)
    }
}