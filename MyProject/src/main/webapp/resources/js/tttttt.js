$(document).ready(function() {
	//button_click();
	set_grid();
	add_grid();
	//update_grid();
	lookup_grid();
	
});


//그리드에 있는 모든 데이터 db로 저장
/*
function save_grid() {
	$("#save_grid").click(function() {
		//jsGrid에 있는 모든 데이터(화면상) = data
		//var items = $("#jsGrid").jsGrid("option", "data");

		//getJson();
		//-> items를 보내서 중복 체크 후 없는것만 저장

		$.ajax({
			url: "/saveUserList",
			type: "post",
			dat: {
				items
			},
			contentType: "application/json"
			
			,success: function() {
				console.log("저장 성공");

			},
			error: function() {
				console.log("저장 실패");
			}
			
		});
	});
}
*/
//재조회
function lookup_grid() {
	("#get_data").click(function() {
		재조회
		$("#jsGrid").jsGrid("loadData"); // jsGrid의 controller의 loadData 호출

	});
}

//그리드에 추가
function add_grid() {
	$("#add_data").click(function() {

		var insert_item = {};

		insert_item.name = $("#user_name").val();
		insert_item.id = $("#user_id").val();
		insert_item.pw = $("#user_pw").val();

		$("#jsGrid").jsGrid("insertItem", insert_item);

	});
}

//첫 그리드 세팅
function set_grid() {
	$("#jsGrid").jsGrid({
		width: "100%",
		height: "400px",
		autoload: true,
		editing: true,

		paging: true,
		pageSize: 15,
		pageButtonCount: 5,

		//데이터 변경, 추가, 삭제대하여 자동으로 로드되게 함
		sorting: true,

		//그리드 헤더 클릭시 sorting이 되게함
		//data: clients,
		//clients를 생성된 배열를 연결함.

		controller: {
			loadData: function() {

				var d = $.Deferred();
				$.ajax({
					url: "/getUserList",
					type: "get",
					//data : {}, 전송 파라미터 ex(ID, PW)
					contentType: "application/json",
					success: function(response) {
						console.log(response);
						d.resolve(response);
					},
					error: function(response) {
						console.log("data : " + response)

					}
				})

				return d.promise();
			}
			/*
			,

			updateItem: function(item) {

			},

			deleteItem: function(item) {

			},

			insertItem: function(item) {

			}
			*/
		},

		fields: [
			//!!! response 컬럼 헤더랑 정확히 일치해야 함(순서 + 대소문자) !!!
			{ name: "name", type: "text", width: 150 },
			{ name: "id", type: "text", width: 150 },
			{ name: "pw", type: "text", width: 150 },
			{ type: "control" },
		]
	})
}