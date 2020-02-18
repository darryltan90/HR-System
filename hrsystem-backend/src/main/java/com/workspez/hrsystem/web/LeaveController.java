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
	
	@PostMapping("/add")//empty means using the same address as the top: "/leave"
	public ResponseEntity<?> addLeaveToDashoard(@Valid @RequestBody Leave leave, BindingResult result){
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
	
	@GetMapping("/allLeaves")
	public Iterable<Leave> getAllLeaves(){
		return leaveService.findAll();
	}
	
	@GetMapping("/get{leave_id}")
	public ResponseEntity<?> getLeaveById(@PathVariable Long leave_id){
		Leave leave = leaveService.findById(leave_id);
		return new ResponseEntity<Leave>(leave, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete{leave_id}")
	public ResponseEntity<?> delById(@PathVariable Long leave_id){
		//ProjectTask projectTask = projectTaskService.findById(pt_id);
		
		leaveService.delete(leave_id);
		
		return new ResponseEntity<String>("Leave deleted", HttpStatus.OK);
	}
	
}
