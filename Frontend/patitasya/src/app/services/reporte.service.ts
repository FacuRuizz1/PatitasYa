import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetReportRequest, PetReportResponse } from '../models/Reporte';
import { Estadisticas } from '../models/Estadisticas';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

   // Obtener todos los reportes
  getAllReports(): Observable<PetReportResponse[]> {
    return this.http.get<PetReportResponse[]>(`${this.apiUrl}/report/listar`);
  }

  //Obtener un reporte por ID
  getReporteById(id: number): Observable<PetReportResponse> {
    return this.http.get<PetReportResponse>(`${this.apiUrl}/report/${id}`);
  }

  // Obtener reportes por tipo
  getReportsByType(tipo: string): Observable<PetReportResponse[]> {
    return this.http.get<PetReportResponse[]>(`${this.apiUrl}/report/tipo/${tipo}`);
  }

   // Obtener reportes por estado
  getReportsByStatus(estado: string): Observable<PetReportResponse[]> {
    return this.http.get<PetReportResponse[]>(`${this.apiUrl}/report/estado/${estado}`);
  }

  // Obtener reportes por usuario
  getReportsByUser(usuarioId: number): Observable<PetReportResponse[]> {
    return this.http.get<PetReportResponse[]>(`${this.apiUrl}/report/usuario/${usuarioId}`);
  }

  // Crear un reporte
  createReport(reporte: PetReportRequest): Observable<PetReportResponse> {
    return this.http.post<PetReportResponse>(`${this.apiUrl}/report/crear`, reporte);
  }

   // Subir imagen
  uploadImage(reportId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.apiUrl}/report/${reportId}/upload`, formData);
  }

  updateReport(id: number, reporte: PetReportRequest): Observable<PetReportResponse> {
  return this.http.put<PetReportResponse>(`${this.apiUrl}/report/${id}`, reporte);
  }

  deleteReport(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/report/${id}`);
  }

  getEstadisticas(): Observable<Estadisticas> {
  return this.http.get<Estadisticas>(`${this.apiUrl}/report/estadisticas`);
}
}
