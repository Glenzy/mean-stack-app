import { i18nPostprocess } from '@angular/core/src/render3';

export interface IPost {
    id: Number,
    title: String,
    content: String,
    category: String,
    tag: String
}

export type IPostList = [IPost]