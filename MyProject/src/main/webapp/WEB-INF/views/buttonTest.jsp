<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
	<script src="<%= request.getContextPath() %>/resources/js/jquery-3.5.1.min.js"></script>
	<script src="<%= request.getContextPath() %>/resources/js/buttonTest.js"></script>
	<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
	<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>

</head>
<body>
<h1>
	Hello world!  
</h1>

<a id ="btn_test" href="javascript:void(0);">실행</a></br>
<button id="get_data"> jsgrid 데이터 가져오기 </button>
<!-- grid_data 가져오기 -->

<div id="jsGrid"></div>
<!-- jsGrid 생성을 합니다.-->

</body>
</html>
