package com.mycompany.MyProject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.javassist.compiler.ast.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mycompany.dto.MemberVO;
import com.mycompany.service.MemberService;
import com.mysql.cj.xdevapi.JsonParser;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@Inject
	private MemberService service;

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) throws Exception {

		logger.info("home");

//        List<MemberVO> memberList = service.selectMember();

//        model.addAttribute("memberList", memberList);

//        System.out.println(memberList.get(0).getId().toString());

		return "home";
	}

	@RequestMapping(value = "/getUserList", method = RequestMethod.GET)

	// ResponseBody 를 달면 알아서 json 형태로 변경되어짐
	@ResponseBody
	public List<MemberVO> getUserList(Locale locale, Model model, 
			@RequestParam("id") String id, 
			@RequestParam("name") String name, 
			@RequestParam("pw") String pw) throws Exception {
		
		System.out.println(id + " , " + name + " , " + pw);
		
		MemberVO searchMember = new MemberVO();
		searchMember.setId(id);
		searchMember.setName(name);
		searchMember.setPw(pw);
		
		//System.out.println(SearchVO.getId() + " , " + SearchVO.getName() + " , " + SearchVO.getPw());
		//List<MemberVO> memberList = service.selectMember();
		List<MemberVO> memberList = service.selectMember(searchMember);
		return memberList;

	}

	@RequestMapping(value = "/saveUserList", method = RequestMethod.POST)
	// ResponseBody 를 달면 알아서 json 형태로 변경되어짐
	@ResponseBody
	public void saveUserList(@RequestBody List<MemberVO> insertList) throws Exception {
		//System.out.println(insertList);		

		service.insertMember(insertList);
		 
		//return "home";

	}
}