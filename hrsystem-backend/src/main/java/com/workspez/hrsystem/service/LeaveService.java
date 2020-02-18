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
	
	public Leave findById(Long id) {
		return leaveRepo.getById(id);
	}
	
	public void delete(Long id) {
		Leave leave = findById(id);
		leaveRepo.delete(leave);
		
	}
	
}
