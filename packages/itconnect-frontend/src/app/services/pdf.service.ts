import { Injectable } from '@angular/core';
import {ScriptService} from "./script.service";
import {User, UserInfo} from "../models/user.model";
import {NotifyService} from "./notify.service";
import {FileService} from "./file.service";

declare let pdfMake: any;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private scriptService: ScriptService,
    private notifyService: NotifyService,
    private fileService: FileService
  ) { }

  generatePdf(user: User) {
    this.scriptService.load('pdfMake', 'vfsFonts').then(async () => {
      if (pdfMake) {
        pdfMake.createPdf(await this.getDocumentDefinition(user)).open();
      } else {
        this.notifyService.error('PdfMake', 'Không thể tải thư viện');
      }
    })
  }

  async getDocumentDefinition(user: User) {
    const ui = user.userInfo;
    return {
      content: [
        // header
        {
          table: {
            widths: ['*', 100],
            body: [
              [
                [
                  {
                    width: 'auto',
                    text: ui.fullName,
                    style: 'name',
                    margin: [0, 3, 0, 3],
                  },
                  {
                    text: `${ui.addressStreet}, ${ui.addressVillage.name}, ${ui.addressDistrict.name}, ${ui.addressProvince.name}`,
                    margin: [0, 3, 0, 3],
                  },
                  {
                    text: 'Email : ' + user.email,
                    margin: [0, 3, 0, 3],
                  },
                  {
                    text: 'SĐT: ' + ui.phone,
                    margin: [0, 3, 0, 3],
                  },
                ],
                [
                  await this.getProfilePicObject(user)
                ],
              ],
            ]
          },
          layout: {
            hLineWidth: function (i: any, node: any) {
              return 0
            },
            vLineWidth: function (i: any, node: any) {
              return 0
            },
          }
        },

        // objective
        {
          text: 'Mục tiêu',
          style: 'header'
        },
        {
          text: ui.objective?.replace(/<[^>]*>/g, '')
        },

        // interest
        {
          text: 'Sở thích',
          style: 'header'
        },
        {
          text: ui.interest?.replace(/<[^>]*>/g, '')
        },

        // skill
        {
          text: 'Kỹ năng',
          style: 'header'
        },

        // position
        {
          text: 'Vị trí',
          style: 'header'
        },

        // experience
        {
          text: 'Kinh nghiệm làm việc',
          style: 'header'
        },

        // education
        {
          text: 'Học vấn',
          style: 'header'
        },

        // văn bằng
        {
          text: 'Văn bằng / chứng chỉ',
          style: 'header'
        },

      ],
      styles: this.getStyles(),
      defaultStyle: {
        fontSize: 11,
      }
    }
  }

  getSkill(user: UserInfo) {
    return null;
  }

  getStyles() {
    return {
      header: {
        fontSize: 14,
        bold: true,
        margin: [0, 15, 0, 6],
      },
      name: {
        fontSize: 14,
        bold: true
      },
      tableHeader: {
        bold: true,
      }
    }
  }

  async getProfilePicObject(user: User) {
    if (user.userInfo.avatar) {
      const url = this.fileService.getFullUrl(user.userInfo.avatar.slug);
      const img = await this.getBase64ImageFromURL(url);
      if (img) {
        return {
          image: img,
          width: 75,
          alignment : 'right'
        };
      }
    }
    return null;
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        }
        reject(ctx);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }
}
