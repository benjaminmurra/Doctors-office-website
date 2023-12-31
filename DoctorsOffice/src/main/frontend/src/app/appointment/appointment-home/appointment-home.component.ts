import { Component, OnInit } from '@angular/core';
import { appointmentService } from './appointment.service';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-appointment-home',
  templateUrl: './appointment-home.component.html',
  styleUrls: ['./appointment-home.component.css']
})
export class AppointmentHomeComponent implements OnInit {
  closeResult: String ='close';

  constructor(private appointmentService: appointmentService, private modalService: NgbModal, public auth: AuthService) {}

  patientFName!: string;
  patientLName!: string;
  dateOfBirth!: string;
  address!: string;
  phoneNumber!: string;
  email!: string;
  appointmentTime!: string;
  doctorId!: number;
  status!: string;
  time!: Date;
  patientId!: number;
  showForm: boolean = false;
  profileJson: string = "";
  profileData: string = "";
  minDateTime: Date = new Date();

  ngOnInit(): void{
    this.auth.user$.subscribe(
      (profile: any) => {
        this.profileJson = JSON.stringify(profile, null, 2);
      }
    );
    this.getPatientDetails();
    this.getDoctorDetails();
    this.getAppointmentDetails();
  }

  //toggle form
  toggleForm() {
    this.showForm = !this.showForm;
  }

  selectedDoctor: any = null;

  showFormForDoctor(doctor: any) {
    this.selectedDoctor = doctor;
  }
  register(registerForm: NgForm) {

    const appointmentData = {
      doctorId : this.selectedDoctor.doctorId,
      patientId: 1, //TODO: get patient id from profile data
      time: registerForm.value.appointmentDateTime,
      status: "Scheduled"
    }

    this.appointmentService.addAppointment(appointmentData).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.getAppointmentDetails();
        this.minDateTime = new Date(); // Update the minimum date and time to the current date and time
      },
      (err) => {
        console.log(err);
      }
    );
  }

  appointmentDetails = null as any;
  getAppointmentDetails() {
    this.appointmentService.getAppointments().subscribe(
      (resp) => {
        console.log(resp);
        this.appointmentDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  patientDetails: any;
  doctorDetails: any;
  specialties: { [doctorId: number]: string } = {};

  getPatientByEmailDetails(email: string) {
    this.appointmentService.getPatientByEmail(email).subscribe(
      (resp) => {
        console.log(resp);
        this.patientDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPatientDetails() {
    this.appointmentService.getPatients().subscribe(
      (resp) => {
        console.log(resp);
        this.patientDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDoctorDetails() {
    this.appointmentService.getDoctors().subscribe(
      (resp) => {
        this.doctorDetails = resp;
        // Fetch specialties for all doctors
        this.doctorDetails.forEach((doctor: any) => {
          this.getDoctorSpeciality(doctor.doctorId);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDoctorSpeciality(doctorId: number): void {
    this.appointmentService.getDoctorSpeciality(doctorId).subscribe(
      (resp) => {
        console.log(resp);
        this.specialties[doctorId] = resp.speciality;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteAppointment(appointmentID: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(appointmentID).subscribe(
        (resp) => {
          console.log(resp);
          this.getAppointmentDetails();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  open(content: any, doctor: any) {
    this.selectedDoctor = doctor; // Store the selected doctor
    this.minDateTime = new Date(); // Set the minimum date and time to the current date and time
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  editingAppointment: any = {};

  openEditModal(content: any, appointment: any) {
    this.editingAppointment = { ...appointment }; // Set the editingAppointment object
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  updateAppointment(form: NgForm) {
    const updatedAppointmentData = {
      appointmentId: this.editingAppointment.appointmentId,
      patientId: this.editingAppointment.patientId,
      doctorId:this.editingAppointment.doctorId,
      time: form.value.appointmentDateTime,
      status: this.editingAppointment.status
    };
    console.log(updatedAppointmentData);
  
    this.appointmentService.updateAppointment(this.editingAppointment.appointmentId, updatedAppointmentData).subscribe(
      (resp) => {
        console.log(resp);
        this.getAppointmentDetails();
        this.modalService.dismissAll();
      },
      (err) => {
        console.log(err);
      }
    );
  }

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  getDoctorName(doctorId: number): string {
    const doctor = this.doctorDetails.find((d: any) => d.doctorId === doctorId);
    if (doctor) {
      return `${doctor.doctorFName} ${doctor.doctorLName}`;
    }
    return '';
  }
  

  selectedAppointment: any;

 
}

