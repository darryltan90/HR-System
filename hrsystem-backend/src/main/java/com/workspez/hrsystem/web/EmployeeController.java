package com.workspez.hrsystem.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workspez.hrsystem.domain.Employee;
import com.workspez.hrsystem.service.EmployeeService;

@RestController
@RequestMapping("/hrsytemApi/employees")
@CrossOrigin
public class EmployeeController {
	
	@Autowired EmployeeService employeeService;
	
	@GetMapping("/login{email}")
	public ResponseEntity<?> findDetailsByEmail(@PathVariable String email){
		Employee employee = employeeService.findByEmail(email);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

}
