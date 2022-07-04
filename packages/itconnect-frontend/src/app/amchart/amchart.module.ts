import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmchartLineComponent } from './amchart-line/amchart-line.component';



@NgModule({
    declarations: [
        AmchartLineComponent
    ],
    exports: [
        AmchartLineComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AmchartModule { }
