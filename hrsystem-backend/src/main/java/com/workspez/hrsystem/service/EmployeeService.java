package com.workspez.hrsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workspez.hrsystem.domain.Employee;
import com.workspez.hrsystem.domain.Leave;
import com.workspez.hrsystem.repo.EmployeeRepo;

@Service
public class EmployeeService {
	
	@Autowired 
	EmployeeRepo employeeRepo;
	
	// (authentication) find specific employee details with username and password
	public Employee findEmpDetailsByNameAndPassword(String empName, String password) {
		return employeeRepo.findEmpDetailsByNameAndPassword(empName, password);
	}
	
	// find specific employee details with empId
	public Employee findEmpDetailsById(int empId) {
		return employeeRepo.findEmpDetailsById(empId);
	}

	// get all employees
	public Iterable<Employee> findAll(){
		return employeeRepo.findAll();
	}
	
	// used for both creating and updating employees 
	public Employee saveOrUpdateEmpoyee(Employee employee) {
		return employeeRepo.save(employee);
	}
	
	// need to delete all leaves associated with the employee as well
	// delete employee according to leave id and empId
//	public void delete(int empId) {
//		Employee employee = findEmpDetailsById(empId);
//		employeeRepo.delete(employee);
//	}
	
}
