import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class appointmentService {
  constructor(private http: HttpClient) { }

  API = 'http://localhost:8080';

  public getDoctors() {
    return this.http.get(this.API + '/doctor/doctors');
  }
  public getDoctorSpeciality(doctorID: number): Observable<any> {
    return this.http.get(this.API + '/doctor/speciality/' + doctorID);
  }

  public getPatients() {
    return this.http.get(this.API + '/patient/patients');
  }

  public addPatient(patientData: any) {
    return this.http.post(this.API + '/patient/add', patientData);
  }

  public getPatientByEmail(patientEmail: string): Observable<any> {
    return this.http.get(this.API + '/patient/email/' + patientEmail);
  }

  public getAppointments() {
    return this.http.get(this.API + '/appointment/appointments');
  }

  public addAppointment(appointmentData: any) {
    return this.http.post(this.API + '/appointment/add', appointmentData);
  }

  public deleteAppointment(appointmentID: number) {
    return this.http.delete(this.API + '/appointment/' + appointmentID);
  }
  public updateAppointment(appointmentID: number, appointmentData: any) {
    return this.http.put(this.API + '/appointment/' + appointmentID, appointmentData);
  }
}
