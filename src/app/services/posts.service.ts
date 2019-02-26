import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

import { IPost } from '../shared/interfaces';
import { post } from 'selenium-webdriver/http';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private Posts: IPost[] = [];
    private postsUpdated = new Subject<IPost[]>();

    constructor(private http: HttpClient) { }

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
                this.postsUpdated.next([...this.Posts]);
            });
        return this.Posts;
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(newPost: IPost) {
        const post = newPost;
        this.http.post<{ post: IPost[], id: String }>('http://localhost:3030/api/posts', post)
            .subscribe((postResponse) => {
                const id = postResponse.id;
                post.id = id;
                console.log(post);
                this.Posts.push(post);
                this.postsUpdated.next([...this.Posts])
            });
    }

    deletePost(postId: string) {
        console.log(postId);
        this.http.delete('http://localhost:3030/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.Posts.filter((post) => post.id !== postId);
                this.Posts = updatedPosts;
                this.postsUpdated.next([...this.Posts])
            });
    }
}