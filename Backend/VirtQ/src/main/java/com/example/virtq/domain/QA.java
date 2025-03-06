package com.example.virtq.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public class QA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Must provide a Q&A name")
    private String name;

    @NotBlank(message = "Must provide a host for the Q&A")
    private String host;

    @NotBlank(message = "Must provide a passcode to join Q&A")
    private String passcode;

    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    private Date create_At;

    private String qaLeader;

    public QA() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getPasscode() {
        return passcode;
    }

    public void setPasscode(String passcode) {
        this.passcode = passcode;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public String getQaLeader() {
        return qaLeader;
    }

    public void setQaLeader(String qaLeader) {
        this.qaLeader = qaLeader;
    }
}
