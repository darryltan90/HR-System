package com.workspez.hrsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workspez.hrsystem.domain.Employee;
import com.workspez.hrsystem.repo.EmployeeRepo;

@Service
public class EmployeeService {
	
	@Autowired EmployeeRepo employeeRepo;
	
	public Employee findEmpDetailsByName(String empName) {
		return employeeRepo.findEmpDetailsByName(empName);
	}

}
