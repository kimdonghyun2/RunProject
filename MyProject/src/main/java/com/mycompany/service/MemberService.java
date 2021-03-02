package com.mycompany.service;

import java.util.List;
import com.mycompany.dto.MemberVO;

public interface MemberService {
	
	//public List<MemberVO> selectMember() throws Exception;
	public List<MemberVO> selectMember(MemberVO searchMember) throws Exception;
	public void insertMember(List<MemberVO> insertList) throws Exception;

}
