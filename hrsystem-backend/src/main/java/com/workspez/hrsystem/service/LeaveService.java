package com.workspez.hrsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workspez.hrsystem.domain.Leave;
import com.workspez.hrsystem.repo.LeaveRepo;

@Service
public class LeaveService {
	
	@Autowired
	private LeaveRepo leaveRepo;
	
	// used for both creating and updating leaves
	public Leave saveOrUpdateLeave(Leave leave) {
		return leaveRepo.save(leave);
	}

	// get all leaves
	public Iterable<Leave> findAll(){
		return leaveRepo.findAll();
	}
	
	// find all leaves with empId
	public Iterable<Leave> findAllLeavesByEmpId(int empId) {
		return leaveRepo.findAllLeavesByEmpId(empId);
	}
	
	// find specific leave with leave id and empId
	public Leave findLeaveDetailsByIdAndEmpId(int id, int empId) {
		return leaveRepo.findLeaveDetailsByIdAndEmpId(id, empId);
	}
	
	// delete leave according to leave id and empId
	public void delete(int id, int empId) {
		Leave leave = findLeaveDetailsByIdAndEmpId(id, empId);
		leaveRepo.delete(leave);
	}
	
	public void deleteLeavesByEmpId(int empId) {
		leaveRepo.deleteLeavesByEmpId(empId);
	}
	
}
