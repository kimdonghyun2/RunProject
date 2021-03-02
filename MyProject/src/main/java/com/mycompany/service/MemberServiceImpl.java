package com.mycompany.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.mycompany.dao.MemberDAO;
import com.mycompany.dto.MemberVO;

@Service
public class MemberServiceImpl implements MemberService {

	@Inject
	private MemberDAO dao;
	
	/*
	@Override
	public List<MemberVO> selectMember() throws Exception {

		return dao.selectMember();
	}
	*/
	
	@Override
	public List<MemberVO> selectMember(MemberVO searchMember) throws Exception {

		return dao.selectMember(searchMember);
	}
	
	@Override
	public void insertMember(List<MemberVO> insertList) throws Exception {
		dao.insertMember(insertList);
	}

}