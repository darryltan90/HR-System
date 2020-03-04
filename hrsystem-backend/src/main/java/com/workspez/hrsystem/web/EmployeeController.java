package com.workspez.hrsystem.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workspez.hrsystem.domain.Employee;
import com.workspez.hrsystem.service.EmployeeService;

@RestController
@RequestMapping("/hrsystemApi/authenticator")
@CrossOrigin
public class EmployeeController {
	
	@Autowired EmployeeService employeeService;
	
	@PostMapping("/login")
	public ResponseEntity<?> findEmpDetailsByName(@RequestParam(name="empName") String empName, @RequestParam(name="password") String password){
		Employee employee = employeeService.findEmpDetailsByNameAndPassword(empName, password);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}
}
