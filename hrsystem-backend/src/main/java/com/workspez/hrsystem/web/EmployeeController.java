package com.workspez.hrsystem.web;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workspez.hrsystem.domain.Employee;
import com.workspez.hrsystem.service.EmployeeService;
import com.workspez.hrsystem.service.LeaveService;

@RestController
@RequestMapping("/hrsystemApi/employees")
@CrossOrigin
public class EmployeeController {
	
	@Autowired 
	EmployeeService employeeService;
	
	@Autowired
	LeaveService leaveService;
	
	// add/update employee
	@PostMapping("/admin/add")
	public ResponseEntity<?> addEmployee(@Valid @RequestBody Employee employee, BindingResult result){
		if (result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<>();
			
			for (FieldError error: result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		Employee newEmployee = employeeService.saveOrUpdateEmpoyee(employee);
		return new ResponseEntity<Employee>(newEmployee, HttpStatus.CREATED);
	}
	
	// get all employees
	@GetMapping("/admin/allEmployees")
	public Iterable<Employee>getAllEmployees(){
		return employeeService.findAll();
	}
	
	// delete employee(service not done)
	@DeleteMapping("/admin/deleteEmployee/{empId}")
	public ResponseEntity<?> delById(@PathVariable int empId){
		
		// deleting leaves
		leaveService.deleteLeavesByEmpId(empId);

		// deleting employee
		employeeService.delete(empId);
		return new ResponseEntity<String>("Employee and leaves deleted", HttpStatus.OK);
	}

}
