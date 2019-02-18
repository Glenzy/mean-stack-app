import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPost } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private Posts: IPost[] = [];
    private postsUpdated = new Subject<IPost[]>();

    constructor() {

    }

    getPosts() {
        return [...this.Posts];
    }

    addPost(newPost: IPost) {
        this.Posts.push(newPost);

    }
}