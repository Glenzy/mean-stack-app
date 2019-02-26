import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { IPost } from '../../shared/interfaces';
import { PostsService } from '../../services/posts.service'
import { ToggleCreatePostsFormService } from '../../services/toggle-create-posts.service'


@Component({
    selector: 'app-create-posts',
    templateUrl: './create-posts.component.html',
    styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
    title: String;
    post: IPost;
    formIsActive: boolean;
    mode = 'create';
    private postId: string
    constructor(
        public postsService: PostsService,
        public toggleCreatePostsFormService: ToggleCreatePostsFormService,
        public route: ActivatedRoute,
    ) {
        this.post = {
            id: null,
            title: '',
            category: '',
            content: '',
            tag: ''
        };
        this.formIsActive = false;
    }
    ngOnInit() {
        this.toggleCreatePostsFormService.change.subscribe(formIsActive => {
            this.formIsActive = formIsActive;
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.post = this.postsService.getPost(this.postId);
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onCreatePost(form: NgForm) {
        if (form.invalid) {
            return
        }
        this.post.title = form.value.title;
        this.post.category = form.value.category;
        this.post.content = form.value.content;
        this.post.tag = form.value.tag;
        if (this.mode === 'create') {
            this.postsService.addPost(this.post);
        }
        if (this.mode === 'edit') {
            this.postsService.addPost(this.post);
        }

        form.reset();
        this.toggleCreatePostsFormService.toggleCreatePostsForm();
    }
    toggleCreatePostsForm() {
        this.toggleCreatePostsFormService.toggleCreatePostsForm();
    }
}
