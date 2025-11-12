package com.jobapp.api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class JobApplication {
    @Id
    private Long applicationId;
    private Long userId;
    private LocalDate appliedDate;
    private LocalDate respondedDate;
    private String company;
    private String jobTitle;
    private String seniority;
    private String jobType;
    private String workMode;
    private String industry;
    private String locationCity;
    private String locationCountry;
    private String sourcePlatform;
    private String status;
    private String salaryCurrency;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String salaryPeriod;
    private String requiredSkills;
    private String listedTechStack;
    private Integer yearsExperienceRequired;
    private String postingUrl;
    private String finalOutcome;
    private String rejectionReason;
    private LocalDate offerReceivedDate;
    private BigDecimal hiredSalary;
    private String name;
    private String email;
    private BigDecimal experienceYears;
    private String currentCity;
    private String currentCountry;
    private String primaryRoleInterest;
    private String skills;

    // Getters and Setters
    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }
    
    public LocalDate getRespondedDate() { return respondedDate; }
    public void setRespondedDate(LocalDate respondedDate) { this.respondedDate = respondedDate; }
    
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    
    public String getSeniority() { return seniority; }
    public void setSeniority(String seniority) { this.seniority = seniority; }
    
    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }
    
    public String getWorkMode() { return workMode; }
    public void setWorkMode(String workMode) { this.workMode = workMode; }
    
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }
    
    public String getLocationCity() { return locationCity; }
    public void setLocationCity(String locationCity) { this.locationCity = locationCity; }
    
    public String getLocationCountry() { return locationCountry; }
    public void setLocationCountry(String locationCountry) { this.locationCountry = locationCountry; }
    
    public String getSourcePlatform() { return sourcePlatform; }
    public void setSourcePlatform(String sourcePlatform) { this.sourcePlatform = sourcePlatform; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getSalaryCurrency() { return salaryCurrency; }
    public void setSalaryCurrency(String salaryCurrency) { this.salaryCurrency = salaryCurrency; }
    
    public BigDecimal getSalaryMin() { return salaryMin; }
    public void setSalaryMin(BigDecimal salaryMin) { this.salaryMin = salaryMin; }
    
    public BigDecimal getSalaryMax() { return salaryMax; }
    public void setSalaryMax(BigDecimal salaryMax) { this.salaryMax = salaryMax; }
    
    public String getSalaryPeriod() { return salaryPeriod; }
    public void setSalaryPeriod(String salaryPeriod) { this.salaryPeriod = salaryPeriod; }
    
    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }
    
    public String getListedTechStack() { return listedTechStack; }
    public void setListedTechStack(String listedTechStack) { this.listedTechStack = listedTechStack; }
    
    public Integer getYearsExperienceRequired() { return yearsExperienceRequired; }
    public void setYearsExperienceRequired(Integer yearsExperienceRequired) { this.yearsExperienceRequired = yearsExperienceRequired; }
    
    public String getPostingUrl() { return postingUrl; }
    public void setPostingUrl(String postingUrl) { this.postingUrl = postingUrl; }
    
    public String getFinalOutcome() { return finalOutcome; }
    public void setFinalOutcome(String finalOutcome) { this.finalOutcome = finalOutcome; }
    
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    
    public LocalDate getOfferReceivedDate() { return offerReceivedDate; }
    public void setOfferReceivedDate(LocalDate offerReceivedDate) { this.offerReceivedDate = offerReceivedDate; }
    
    public BigDecimal getHiredSalary() { return hiredSalary; }
    public void setHiredSalary(BigDecimal hiredSalary) { this.hiredSalary = hiredSalary; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public BigDecimal getExperienceYears() { return experienceYears; }
    public void setExperienceYears(BigDecimal experienceYears) { this.experienceYears = experienceYears; }
    
    public String getCurrentCity() { return currentCity; }
    public void setCurrentCity(String currentCity) { this.currentCity = currentCity; }
    
    public String getCurrentCountry() { return currentCountry; }
    public void setCurrentCountry(String currentCountry) { this.currentCountry = currentCountry; }
    
    public String getPrimaryRoleInterest() { return primaryRoleInterest; }
    public void setPrimaryRoleInterest(String primaryRoleInterest) { this.primaryRoleInterest = primaryRoleInterest; }
    
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
}