import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {File} from "../models/file.model";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFullUrl(slug: string) {
    return `${environment.baseUrl}/file/s/${slug}`;
  }

  upload(file: Blob) {
    const uri = `file/upload`;
    const form = new FormData();
    form.append('file', file);
    return this.httpClient.post<File>(uri, form, {
      headers: {
        'Accept': "multipart/form-data"
      }
    })
  }
}
