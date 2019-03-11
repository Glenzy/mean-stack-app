import { i18nPostprocess } from '@angular/core/src/render3';

export interface IPost {
    id: String,
    title: string,
    content: string,
    category: string,
    tag: string,
    image: string
}

export type IPostList = [IPost]


export interface IAuthData {
    email: string,
    password: string
}