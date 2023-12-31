package com.sg.wileyedge.dto;

public class Doctor {

    private int doctorId;

    private String doctorFName;

    private String doctorLName;

    private String doctorSpecialtyId;

    private String phoneNumber;
    private String email;
    private String imageURL;


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorFName() {
        return doctorFName;
    }

    public void setDoctorFName(String doctorFName) {
        this.doctorFName = doctorFName;
    }

    public String getDoctorLName() {
        return doctorLName;
    }

    public void setDoctorLName(String doctorLName) {
        this.doctorLName = doctorLName;
    }

    public String getDoctorSpecialtyId() {
        return doctorSpecialtyId;
    }

    public void setDoctorSpecialtyId(String doctorSpecialtyId) {
        this.doctorSpecialtyId = doctorSpecialtyId;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
    public String getImageURL() {
        return imageURL;
    }
}
