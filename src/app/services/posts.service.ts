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
                        id: post._id,
                        image: post.image
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
        this.http
            .post<{ id: String, data: { category: string, image: string, content: string, tag: string, title: string, } }>('http://localhost:3030/api/posts', postData)
            .subscribe((postResponse) => {
                console.log('postResponse', postResponse.data.image);
                const postData: IPost = {
                    id: postResponse.id,
                    content: postResponse.data.content,
                    title: postResponse.data.title,
                    tag: postResponse.data.tag,
                    image: postResponse.data.image,
                    category: postResponse.data.category
                }
                this.Posts.push(postData);
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

        const postData = new FormData();
        postData.append('title', post.title);
        postData.append('content', post.content);
        postData.append('tag', post.tag);
        postData.append('category', post.category);
        postData.append('image', post.image, post.title);

        this.http.put<{ id: String, data: { category: string, image: string, content: string, tag: string, title: string, } }>('http://localhost:3030/api/posts/' + postId, postData)
            .subscribe((postResponse) => {
                console.log('postResponse', postResponse.data.image);
                const postData: IPost = {
                    id: postResponse.id,
                    content: postResponse.data.content,
                    title: postResponse.data.title,
                    tag: postResponse.data.tag,
                    image: postResponse.data.image,
                    category: postResponse.data.category
                }
                this.Posts = this.Posts.filter((post) => post.id !== postData.id);
                this.Posts.push(post);
                this.postsUpdated.next([...this.Posts])
            });
    }

    getPost(id: string) {
        return this.http.get<IPost>('http://localhost:3030/api/posts/' + id)
    }
}