package com.workspez.hrsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.workspez.hrsystem.domain.Leave;

@Repository
public interface LeaveRepo extends JpaRepository<Leave, Long>{

	// find all leaves by employee id
	@Query(value = " SELECT * FROM leaves WHERE emp_id =:empId", nativeQuery = true)
	Iterable<Leave> findAllLeavesByEmpId(@Param("empId") int empId);
	
	// find specific leave by id and employee id
	@Query(value = " SELECT * FROM leaves WHERE id =:id AND emp_id =:empId", nativeQuery = true)
	Leave findLeaveDetailsByIdAndEmpId(@Param("id") int id, @Param("empId") int empId);
	
	// modifying must be added for  
	// delete all leaves by employee id
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM leaves WHERE emp_id=:empId", nativeQuery = true)
	void deleteLeavesByEmpId(@Param("empId") int empId);
	
}
