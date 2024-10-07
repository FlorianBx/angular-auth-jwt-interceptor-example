import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-user-growth-chart',
  standalone: true,
  template: '<canvas #chartCanvas></canvas>',
  styles: [
    ':host { display: block; width: 100%; max-width: 1240px; margin: 0 auto; }',
  ],
})
export class UserGrowthChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Number of users',
              data: [65, 59, 80, 81, 56, 55, 40, 34, 120, 121, 100, 139],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              align: 'start',
              text: 'Number of users',
              color: 'rgb(75, 192, 192)',
              font: {
                size: 20,
              },
            },
            legend: {
              labels: {
                color: 'rgb(75, 192, 192)',
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
