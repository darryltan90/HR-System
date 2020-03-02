package com.workspez.hrsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workspez.hrsystem.domain.Leave;
import com.workspez.hrsystem.repo.LeaveRepo;

@Service
public class LeaveService {
	
	@Autowired
	private LeaveRepo leaveRepo;
	
	public Leave saveOrUpdateLeave(Leave leave) {
		return leaveRepo.save(leave);
	}

	public Iterable<Leave> findAll(){
		return leaveRepo.findAll();
	}
	
	public Leave findAllLeavesByEmpId(int empId) {
		return leaveRepo.findAllLeavesByEmpId(empId);
	}
	
	public Leave findLeaveDetailsByIdAndEmpId(int id, int empId) {
		return leaveRepo.findLeaveDetailsByIdAndEmpId(id, empId);
	}
	
	public void delete(int id, int empId) {
		Leave leave = findLeaveDetailsByIdAndEmpId(id, empId);
		leaveRepo.delete(leave);
	}
	
}
