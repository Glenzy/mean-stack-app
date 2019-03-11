import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeTypeValidator } from './mime-type.validator';
import { IPost } from '../../shared/interfaces';
import { PostsService } from '../../services/posts.service'
import { ActivatedRoute, ParamMap } from "@angular/router";

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
    form: FormGroup;
    imagePreview: string | ArrayBuffer;
    private postId: string;
    isLoading: boolean;
    constructor(public postsService: PostsService, public route: ActivatedRoute) {
        this.formIsActive = false;
        this.formData = {
            id: null,
            title: '',
            content: '',
            tag: '',
            category: '',
            image: null
        }
    }


    ngOnInit() {
        this.form = new FormGroup({
            'id': new FormControl(null),
            'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
            'category': new FormControl(null, { validators: [Validators.required] }),
            'content': new FormControl(null, { validators: [Validators.required, Validators.minLength(25)] }),
            'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeTypeValidator] }),
            'tag': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
        })
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("postId")) {
                this.mode = "edit";
                this.postId = paramMap.get("postId");
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    console.log(postData);
                    this.isLoading = false;
                    this.formData = {
                        id: this.postId,
                        title: postData.title,
                        content: postData.content,
                        tag: postData.tag,
                        category: postData.category,
                        image: ''
                    };
                    this.form.setValue({ ...this.formData });
                });
            } else {
                this.mode = "create";
                this.postId = null;
            }
        });
    }

    onImageUpload(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get("image").updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }

    onCreatePost() {
        if (this.form.invalid) { return }
        this.formData.title = this.form.value.title;
        this.formData.category = this.form.value.category;
        this.formData.content = this.form.value.content;
        this.formData.tag = this.form.value.tag;
        this.formData.image = this.form.value.image;

        if (this.mode === 'create') {
            this.postsService.addPost(this.formData);
        }

        if (this.mode === 'edit') {
            this.postsService.editPost(this.formData);
        }

        this.form.reset();
    }
}
