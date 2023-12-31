-- DROP DATABASE IF EXISTS DoctorsOffice;

-- CREATE DATABASE DoctorsOffice;
--USE DoctorsOffice;

DROP TABLE IF EXISTS Specialty;
CREATE TABLE Specialty (
  specialtyId INT PRIMARY KEY AUTO_INCREMENT,
  specialtyName VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS Doctor;
CREATE TABLE Doctor (
  doctorId INT PRIMARY KEY AUTO_INCREMENT,
  doctorFName VARCHAR(50) NOT NULL,
  doctorLName VARCHAR(50) NOT NULL,
  doctorSpecialtyId INT NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  FOREIGN KEY (doctorSpecialtyId) REFERENCES Specialty(specialtyId)
);

DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient (
  patientId INT PRIMARY KEY AUTO_INCREMENT,
  patientFName VARCHAR(50) NOT NULL,
  patientLName VARCHAR(50) NOT NULL,
  dateOfBirth DATE NOT NULL,
  address VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);

DROP TABLE IF EXISTS Appointment;
CREATE TABLE Appointment (
  appointmentId INT PRIMARY KEY AUTO_INCREMENT,
  time TIMESTAMP,
  doctorId INT NOT NULL,
  patientId INT NOT NULL,
  status VARCHAR(50),
  FOREIGN KEY (doctorId) REFERENCES Doctor(doctorId),
  FOREIGN KEY (patientId) REFERENCES Patient(patientId)
);

CREATE INDEX idx_doctorId ON Appointment (doctorId);
CREATE INDEX idx_patientId ON Appointment (patientId);