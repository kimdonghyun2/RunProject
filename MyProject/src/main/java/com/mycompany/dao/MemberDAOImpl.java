package com.mycompany.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.mycompany.dto.MemberVO;

//MemberDAOImpl 은 SqlSession을 주입받아서 memberMapper.xml 에 등록한 쿼리문을 실행한다. 
//쿼리 실행 결과 여러개의 데이터를 가져오게 되므로 List로 받아서 리턴한다.
@Repository
public class MemberDAOImpl implements MemberDAO {

	@Inject
	private SqlSession sqlSession;

	private static final String Namespace = "com.example.mapper.memberMapper";
	
	/*
	@Override
	public List<MemberVO> selectMember() throws Exception {

		return sqlSession.selectList(Namespace + ".selectMember");
	}
	*/
	
	@Override
	public List<MemberVO> selectMember(MemberVO searchMember) throws Exception {

		return sqlSession.selectList(Namespace + ".selectMember", searchMember);
	}

	@Override
	public void insertMember(List<MemberVO> insertList) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.insert(Namespace+".insertMember", insertList);
	}

	
}
