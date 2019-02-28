import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

import { IPost } from '../shared/interfaces';


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

    addPost(post: IPost) {

        const postData = new FormData();
        postData.append('title', post.title);
        postData.append('content', post.content);
        postData.append('tag', post.tag);
        postData.append('category', post.category);
        postData.append('image', post.image, post.title);
        this.http.post<{ post: IPost[], id: String }>('http://localhost:3030/api/posts', postData)
            .subscribe((postResponse) => {
                console.log('postResponse', postResponse);
                const id = postResponse.id;
                post.id = id;
                this.Posts.push(post);
                this.postsUpdated.next([...this.Posts])
            });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3030/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.Posts.filter((post) => post.id !== postId);
                this.Posts = updatedPosts;
                this.postsUpdated.next([...this.Posts])
            });
    }

    editPost(post: IPost) {
        const postId = post.id;
        console.log('edit post', post);
        this.http.put('http://localhost:3030/api/posts/' + postId, post)
            .subscribe(() => {
                this.Posts = this.Posts.filter((post) => post.id !== postId);
                this.Posts.push(post);
                this.postsUpdated.next([...this.Posts])
            });
    }

    getPost(id: string) {
        return this.http.get<IPost>('http://localhost:3030/api/posts/' + id)
    }
}