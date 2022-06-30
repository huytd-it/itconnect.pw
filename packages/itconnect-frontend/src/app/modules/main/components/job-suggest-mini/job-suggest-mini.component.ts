import { Component, OnInit } from '@angular/core';
import {Job} from "../../../../models/job.model";

@Component({
  selector: 'app-job-suggest-mini',
  templateUrl: './job-suggest-mini.component.html',
  styleUrls: ['./job-suggest-mini.component.scss']
})
export class JobSuggestMiniComponent implements OnInit {

  job = <any>{
    "id":39,
    "addressStreet":"647/24/2 Quốc lộ 13, Khu Phố 3",
    "salaryMin":12222,
    "salaryMax":1222222,
    "yoe":1,
    "name":"Test job 28/6",
    "endDate":"2022-06-30T17:00:00.000Z",
    "descriptionContent":"<p>Test 123</p>",
    "requirementContent":"<p>Test 123</p>",
    "reasonContent":null,
    "status":4,
    "createdAt":"2022-06-28T15:36:41.921Z",
    "updatedAt":"2022-06-29T17:20:46.118Z",
    "deletedAt":null,
    "companyTag":{
      "id":8,
      "name":"Công Ty TNHH Xuất Nhập Khẩu Thực Phẩm Minh Hưng",
      "mst":"0316957074",
      "isApprove":true,
      "createdAt":"2022-06-28T15:00:12.314Z",
      "updatedAt":"2022-06-28T15:47:12.514Z",
      "deletedAt":null
    },
    "addressProvince":{
      "id":7,
      "name":"TP Hồ Chí Minh",
      "type":1,
      "createdAt":"2022-06-28T10:48:39.847Z",
      "updatedAt":"2022-06-28T10:48:39.847Z",
      "deletedAt":null
    },
    "addressDistrict":{
      "id":2327,
      "name":"Quận Thủ Đức",
      "type":2,
      "createdAt":"2022-06-28T11:11:18.906Z",
      "updatedAt":"2022-06-28T11:11:18.906Z",
      "deletedAt":null
    },
    "addressVillage":{
      "id":2334,
      "name":"Phường Hiệp Bình Phước",
      "type":3,
      "createdAt":"2022-06-28T11:11:19.346Z",
      "updatedAt":"2022-06-28T11:11:19.346Z",
      "deletedAt":null
    },
    "jobApplyCount":2,
    "jobApplySelf":1,
    "jobSavedSelf":1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
