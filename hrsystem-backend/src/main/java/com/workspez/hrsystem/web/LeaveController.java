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

import com.workspez.hrsystem.domain.Leave;
import com.workspez.hrsystem.service.LeaveService;

@RestController
@RequestMapping ("/hrsystemApi/leaves")
@CrossOrigin
public class LeaveController {
	
	@Autowired 
	private LeaveService leaveService;

	//-------------------EMPLOYEE-------------------//
	@PostMapping("/employee/add")//empty means using the same address as the top: "/hrsystemApi/leaves"
	public ResponseEntity<?> addLeave(@Valid @RequestBody Leave leave, BindingResult result){
		//<?> means generic data type
		if (result.hasErrors()) { //to simplify the error code
			Map<String, String> errorMap = new HashMap<>();
			// list above is for type FieldError
			// used to display specific error
			
			for(FieldError error: result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
				//field, default message from List<FieldError>
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		Leave newLeave = leaveService.saveOrUpdateLeave(leave);
		return new ResponseEntity<Leave>(newLeave, HttpStatus.CREATED);
	}
	
	// (employee)gets all leaves based on empId
	@GetMapping("/employee/allLeaves/{empId}")
	public Iterable<Leave> findAllLeavesByEmpId(@PathVariable int empId){
		return leaveService.findAllLeavesByEmpId(empId);
	}
	
	// (employee)gets specific leave based on leaveId and empId
	@GetMapping("/employee/getLeave/{empId}/{leaveId}")
	public ResponseEntity<?> getLeaveDetailsByIdAndEmpId(@PathVariable int leaveId, @PathVariable int empId){
		Leave leave = leaveService.findLeaveDetailsByIdAndEmpId(leaveId, empId);
		return new ResponseEntity<Leave>(leave, HttpStatus.OK);
	}	
	
	// (employee)delete leave based on leaveId and empId
	@DeleteMapping("/employee/deleteById/{empId}/{leaveId}")
	public ResponseEntity<?> delById(@PathVariable int leaveId, @PathVariable int empId){
		leaveService.delete(leaveId, empId);
		return new ResponseEntity<String>("Leave deleted", HttpStatus.OK);
	}
	
	@GetMapping("employee/getByStatus/{status}")
	public Iterable<Leave> findAllLeavesByStatus(@PathVariable String status){
		return leaveService.findAllLeavesByStatus(status);
	}
	
	//=============================================================================================================
	
	//-------------------ADMIN-------------------//
	//(admin)updates the leave details based on the leave id
	@PostMapping("/admin/add")//empty means using the same address as the top: "/hrsystemApi/leaves"
	public ResponseEntity<?> updateLeave(@Valid @RequestBody Leave leave, BindingResult result){
		//<?> means generic data type
		if (result.hasErrors()) { //to simplify the error code
			Map<String, String> errorMap = new HashMap<>();
			// list above is for type FieldError
			// used to display specific error
			
			for(FieldError error: result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
				//field, default message from List<FieldError>
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		Leave newLeave = leaveService.saveOrUpdateLeave(leave);
		return new ResponseEntity<Leave>(newLeave, HttpStatus.CREATED);
	}
	
	// (admin)gets all leaves
	@GetMapping("/admin/allLeaves")
	public Iterable<Leave> getAllLeaves(){
		return leaveService.findAll();
	}
	
	
}
