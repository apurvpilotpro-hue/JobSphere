package com.jobapp.api.controller;

import com.jobapp.api.model.JobApplication;
import com.jobapp.api.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @GetMapping("/applications/user/{userId}")
    public Map<String, Object> getUserApplications(@PathVariable Long userId) {
        // Get all applications for this user
        List<JobApplication> applications = jobApplicationRepository.findByUserId(userId);
        
        // Extract all application IDs
        List<Long> applicationIds = applications.stream()
                .map(JobApplication::getApplicationId)
                .collect(Collectors.toList());
        
        // Create application details map
        Map<Long, JobApplication> applicationDetails = applications.stream()
                .collect(Collectors.toMap(
                    JobApplication::getApplicationId,
                    application -> application
                ));

        // Create the response structure
        Map<String, Object> response = new HashMap<>();
        response.put("user_id", userId);
        response.put("application_ids", applicationIds);
        response.put("applications", applicationDetails);
        
        return response;
    }

    // Endpoint to resolve a user_id by email (used by frontend login)
    @GetMapping("/users/email/{email}")
    public ResponseEntity<Map<String, Object>> getUserIdByEmail(@PathVariable String email) {
        Optional<JobApplication> appOpt = jobApplicationRepository.findFirstByEmail(email);
        if (appOpt.isPresent()) {
            Long userId = appOpt.get().getUserId();
            Map<String, Object> resp = new HashMap<>();
            resp.put("email", email);
            resp.put("user_id", userId);
            return ResponseEntity.ok(resp);
        } else {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "User not found for email: " + email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
        }
    }

    // Keep the existing getAllApplications method as a backup
    @GetMapping("/applications")
    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }
}