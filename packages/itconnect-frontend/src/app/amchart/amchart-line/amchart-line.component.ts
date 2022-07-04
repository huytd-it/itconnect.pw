import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AmchartLineConfig} from "../../models/common";
import * as _ from "lodash";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

@Component({
  selector: 'app-amchart-line',
  templateUrl: './amchart-line.component.html',
  styleUrls: ['./amchart-line.component.scss']
})
export class AmchartLineComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('cntChart') cntChart: ElementRef;
  @Input() data: any[];
  @Input() labelX = 'legend';
  @Input() config: AmchartLineConfig[];

  root: am5.Root;

  constructor() { }

  ngOnDestroy(): void {
    this.root.dispose();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data, config } = changes;
    if (
      data && data.currentValue && !_.isEqual(data.currentValue, data.previousValue) ||
      config && config.currentValue && !_.isEqual(config.currentValue, config.previousValue)
    ) {
      setTimeout(() => this.buildChart());
    }
  }

  private buildChart() {
    if (this.root) {
      this.root.dispose()
    }

    if (!this.data) {
      return;
    }

    this.root = am5.Root.new(this.cntChart.nativeElement);
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    let chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(this.root, {}));
    cursor.lineY.set("visible", false);

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
      categoryField: this.labelX,
      startLocation: 0.5,
      endLocation: 0.5,
      renderer: am5xy.AxisRendererX.new(this.root, {}),
      tooltip: am5.Tooltip.new(this.root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(this.root, {})
    }));


    this.config.forEach(cf => {
      let series = chart.series.push(am5xy.SmoothedXYLineSeries.new(this.root, {
        name: cf.name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: cf.field,
        categoryXField: this.labelX,
        stroke: am5.color(cf.stroke),
        tooltip: am5.Tooltip.new(this.root, {
          labelText: `${cf.name}: {${cf.field}}`
        })
      }));

      series.strokes.template.setAll({
        strokeWidth: 2,
        fill: cf.fill ? am5.color(cf.fill) : undefined,
        strokeDasharray: cf.strokeDasharray ? cf.strokeDasharray : undefined
      });

      series.data.setAll(this.data);
    })

    let legend = chart.rightAxesContainer.children.push(am5.Legend.new(this.root, {
      width: 200,
      paddingLeft: 15,
      height: am5.percent(100)
    }));
    legend.data.setAll(chart.series.values);

    xAxis.data.setAll(this.data)
  }
}
