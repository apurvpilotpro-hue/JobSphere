package com.jobapp.api.repository;

import com.jobapp.api.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);

    // Return the first application record for a given email (used to resolve userId by email)
    Optional<JobApplication> findFirstByEmail(String email);
}