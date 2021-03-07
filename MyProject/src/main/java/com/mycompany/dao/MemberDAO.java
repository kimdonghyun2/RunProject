package com.mycompany.dao;

import java.util.List;

import com.mycompany.dto.MemberVO;
 
public interface MemberDAO {
    
    //public List<MemberVO> selectMember() throws Exception;
	public List<MemberVO> selectMember(MemberVO searchMember) throws Exception;
    public void insertMember(List<MemberVO> insertList) throws Exception;
    
    public void deleteMember(List<MemberVO> deleteList) throws Exception;
    
}