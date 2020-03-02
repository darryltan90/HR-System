package com.workspez.hrsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.workspez.hrsystem.domain.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{
	
	Employee findByEmail(String email);
	
}
