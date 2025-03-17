package com.example.virtq.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class QA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Must provide a Q&A name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    User user;

    @NotBlank(message = "QA Identifier is required")
    @Size(min = 4, max = 5, message = "Please use 4 to 5 characters")
    @Column(updatable = false, unique = true)
    private String qaIdentifier;

    @NotBlank(message = "Must provide a passcode to join Q&A")
    private String passcode;

    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    private Date create_At;

    private String qaLeader;

    @OneToMany(mappedBy = "qa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

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

    public String getQaIdentifier() {
        return qaIdentifier;
    }

    public void setQaIdentifier(String qaIdentifier) {
        this.qaIdentifier = qaIdentifier;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
