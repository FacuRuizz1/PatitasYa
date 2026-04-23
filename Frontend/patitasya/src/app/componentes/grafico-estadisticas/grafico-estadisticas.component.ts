import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Estadisticas } from '../../models/Estadisticas';
import { ReporteService } from '../../services/reporte.service';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-grafico-estadisticas',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './grafico-estadisticas.component.html',
  styleUrl: './grafico-estadisticas.component.css'
})
export class GraficoEstadisticasComponent implements OnInit {

  estadisticas: Estadisticas | null = null;
  loading = true;

  chartType = ChartType.PieChart;
  chartData: [string, number][] = [];
  chartColumns = ['Tipo', 'Cantidad'];
  chartOptions = {
    backgroundColor: 'transparent',
    pieHole: 0.4,
    colors: ['#F4A582', '#90C98A', '#B5A9D4'],
    legend: {
      position: 'bottom',
      textStyle: { color: '#1A1208', fontSize: 13, bold: true, fontName: 'DM Sans' }
    },
    pieSliceTextStyle: { color: '#FAF7F2', fontSize: 13, bold: true },
    tooltip: { textStyle: { fontName: 'DM Sans', fontSize: 13 } },
    chartArea: { width: '85%', height: '75%' },
    fontName: 'DM Sans',
  };

   ngOnInit(): void {
    this.reporteService.getEstadisticas().subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.chartData = [
          ['Perdidas',    data.perdidas],
          ['Encontradas', data.encontradas],
          ['En adopción', data.adopciones],
        ];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

   constructor(private reporteService: ReporteService) {}

}
