<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Home</title>
	<script src="<%= request.getContextPath() %>/resources/js/jquery-3.5.1.min.js"></script>
	<script src="<%= request.getContextPath() %>/resources/js/Home.js"></script>
	<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
	<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
	
</head>
<body>
    
	<button id="get_data"> jsgrid 데이터 가져오기 </button>
	
	<div id="jsGrid"></div>
	
	
	name : <input id ="user_name" type ="text">
	id : <input id ="user_id" type ="text">
	pw : <input id ="user_pw" type ="text">
	<br>
	<button id="add_data"> 데이터 그리드에 추가 </button>
	<br>
    <button id="insert_grid_btn"> 그리드에 추가된 데이터 db 저장 </button>
    <br>
    <button id="delete_grid_btn"> 체크된 것 삭제 </button>
   	<br> 
    <button id="update_grid_btn"> 변경사항 저장 </button>
    <!--  
    <table>
        <thead>
            <tr>
                <th>아이디</th>
                <th>비밀번호</th>
                <th>이름</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${data}" var="data">
                <tr>
                    <td>${data.id}</td>
                    <td>${data.pw}</td>
                    <td>${data.name}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
 	-->
	
</body>
</html>