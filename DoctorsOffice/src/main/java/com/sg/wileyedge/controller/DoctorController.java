package com.sg.wileyedge.controller;

import com.sg.wileyedge.dto.Doctor;
import com.sg.wileyedge.dto.Specialty;
import com.sg.wileyedge.service.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
@CrossOrigin
public class DoctorController {

    @Autowired
    DoctorServiceImpl doctorServiceImpl;

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        List<Doctor> doctors = doctorServiceImpl.getAllDoctors();

        return doctors;
    }

    @GetMapping("speciality/{id}")
    public ResponseEntity<Object> getDoctorSpecialityById(@PathVariable int id) {
        String speciality = doctorServiceImpl.getDoctorSpecialityById(id);
        String json = "{\"speciality\": \"" + speciality + "\"}";
        return ResponseEntity.ok().body(json);
    }

    @GetMapping("/specialities")
    public List<Specialty> getAllSpecialities() {
        List<Specialty> specialities = doctorServiceImpl.getAllSpecialities();

        return specialities;
    }
    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable int id) {
        Doctor doctor = doctorServiceImpl.getDoctorById(id);

        return doctor;
    }

    @PostMapping("/add")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        Doctor addedDoctor = doctorServiceImpl.addNewDoctor(doctor);

        return addedDoctor;
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable int id, @RequestBody Doctor doctor) {
        Doctor updatedDoctor = doctorServiceImpl.updateDoctorData(id, doctor);

        return updatedDoctor;
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable int id) {
        doctorServiceImpl.deletedoctorById(id);
    }
}
