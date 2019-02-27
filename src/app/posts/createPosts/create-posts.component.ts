import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    formData: IPost;
    formIsActive: boolean;
    mode = 'create';

    constructor(
        public postsService: PostsService,
        public toggleCreatePostsFormService: ToggleCreatePostsFormService,
    ) {
        this.formData = {
            id: null,
            title: '',
            category: '',
            content: '',
            tag: ''
        };
        this.formIsActive = false;
    }
    ngOnInit() {
        this.toggleCreatePostsFormService.activeForm.subscribe(formIsActive => {
            this.formIsActive = formIsActive;
        });

        this.toggleCreatePostsFormService.editFormData.subscribe(formData => {
            this.mode = 'edit';
            this.formData = formData;
            this.formData = {
                id: formData._id,
                title: formData.title,
                content: formData.content,
                tag: formData.tag,
                category: formData.category
            }
            console.log('this.formData', this.formData);
        })
    }

    onCreatePost(form: NgForm) {
        if (form.invalid) { return }
        this.formData.title = form.value.title;
        this.formData.category = form.value.category;
        this.formData.content = form.value.content;
        this.formData.tag = form.value.tag;

        if (this.mode === 'create') {
            this.postsService.addPost(this.formData);
        }

        if (this.mode === 'edit') {
            this.postsService.editPost(this.formData);
        }

        form.reset();
        this.toggleCreatePostsFormService.toggleCreatePostsForm();
    }
    toggleCreatePostsForm() {
        this.toggleCreatePostsFormService.toggleCreatePostsForm();
    }
}
