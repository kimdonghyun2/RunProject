$(document).ready(function() {
	//button_click();
	set_grid();
	add_grid();
	//update_grid();
	lookup_grid();
	insert_grid();
});

//그리드에 있는 모든 데이터 db로 저장

function insert_grid() {

	$("#insert_grid_btn").click(function() {
		//jsGrid에 있는 모든 데이터 = data
		var items = $("#jsGrid").jsGrid("option", "data");

		$.ajax({
			url: "/saveUserList", //RequestMapping이랑 연결
			type: "post",
			data: JSON.stringify(items),	//JSON 형태로 변경
			contentType: "application/json"	//json 데이터

			, success: function() {
				console.log("저장 성공");

			},
			error: function() {
				console.log("저장 실패", items);
			}

		});

	});
}

//재조회
function lookup_grid() {
	$("#get_data").click(function() {
		//재조회
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
		filtering: true,
		
		
		//데이터 변경, 추가, 삭제대하여 자동으로 로드되게 함
		sorting: true,

		//그리드 헤더 클릭시 sorting이 되게함
		//data: clients,
		//clients를 생성된 배열를 연결함.

		controller: {
			
			loadData: function(filter) {
				//alert(JSON.stringify(filter));
				var d = $.Deferred();
				
				$.ajax({
					url: "/getUserList",
					type: "get",
					//data : {}, 전송 파라미터 ex(ID, PW)
					contentType: "application/json",
					dataType: "json",
					data : {
						
						/* 아래처럼 보내고 Controller 에서 @RequestParam("id") String id 으로 받아도 됨 */
						id : filter.id,
						pw : filter.pw,
						name : filter.name
						
					}
					,
							
					success: function(response) {
						console.log("filter : ", filter);
						console.log("success: ", response);
						//console.log(response);
						
						//d.resolve(response);
					},
					error: function(response) {
						console.log("fail : " + response);

					}
					
				}).done(function(response){
					d.resolve(response);
				});
				
				/*
				.done(function(filter){
					console.log("filter : " + JSON.stringify(filter));
					//console.log("response : " + response); //JSON.stringify 붙이면 json 형태로 출력됨
					d.resolve(filter);
				});
				*/
				
				return d.promise();
			}
			
			/*
			loadData: function(filter) {
				var d = $.Deferred();

				$.ajax({
					type: "GET",
					url: "/getUserList",
					data: filter, //filtering에 들어가는 값
					contentType: "application/json",
				}).done(function(result) {
					result = $.grep(result, function(item) {
						return item.SomeField === filter.SomeField;
					});
					//console.log("filter: " + JSON.stringify(filter));
					d.resolve(result);
				})

				return d.promise();
			}
			*/
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
			{	
				/*
				headerTemplate: function() {
					return $("<input>").attr("type", "checkbox").attr("id", "selectAllCheckbox")
				},
				itemTemplate: function(_, item) {
					return $("<input>").attr("type", "checkbox").attr("class", "singleCheckbox")
						.prop("checked", $.inArray(item.name, selectedItems) > -1)
						.on("change", function() {
							$(this).is(":checked") ? selectItem($(this).parent().next().text()) : unselectItem($(this).parent().next().text());
						});
				},
				align: "center",
				width: 10,
				sorting: false
				*/
				headerTemplate: function() {
					return $("<input>").attr("type", "checkbox").attr("id", "selectAllCheckbox")
				},
				itemTemplate: function(_, item) {
					return $("<input>").attr("type", "checkbox").attr("class", "singleCheckbox")
						.prop("checked", $.inArray(item, selectedItems) > -1)
						.on("change", function() {
							$(this).is(":checked") ? selectItem(item) : unselectItem(item);
						})
						.on("click", function(event){
							// 안해주면 editing: true 되어있을때 체크박스 두번 눌러야 체크됨.
							event.stopPropagation();
						});
				},
				align: "center",
				width: 10,
				sorting: false
				

			},
			//{ name: "", type: "checkbox", width : 20},//
			{ name: "name", type: "text", width: 150 },
			{ name: "id", type: "text", width: 150 },
			{ name: "pw", type: "text", width: 150 },
			{ type: "control" },

		],

		onPageChanged: function() {
			console.log("페이지 변경");

			//selectedItems = [];
			$("#selectAllCheckbox").prop("checked", false);

			$('.singleCheckbox').each(function() {
				this.checked = false;
				//unselectItem(item);

			});
			selectedItems = [];
		}


		/*
		fields: [
			//!!! response 컬럼 헤더랑 정확히 일치해야 함(순서 + 대소문자) !!!
			{ name: "checked", type: "checkbox", width : 20},
			
			{ name: "name", type: "text", width: 150 },
			{ name: "id", type: "text", width: 150 },
			{ name: "pw", type: "text", width: 150 },
			{ type: "control" },
		]
		*/

	});

	/* 체크박스 관련 START */
	var selectedItems = [];
	
	var selectItem = function(item) {
        selectedItems.push(item);
    };
 
    var unselectItem = function(item) {
        selectedItems = $.grep(selectedItems, function(i) {
            return i !== item;
        });
    };

	
	/*
	var selectItem = function(item) {
		console.log("item: " + item);
		console.log("singleCheckbox_Length: "  + $(".singleCheckbox").length);
		
		selectedItems.push(item);
		
		if ($(".singleCheckbox").length == $(".singleCheckbox:checked").length) {
			// .prop()는 지정한 선택자를 가진 첫번째 요소의 속성값을 가져오거나 속성값을 추가합니다
			//HTML 입장에서의 속성(attribute)이 아닌 JavaScript 입장에서의 속성(property)
			$("#selectAllCheckbox").prop("checked", true);
		} else {
			$("#selectAllCheckbox").prop("checked", false);
		}
	};

	

	var unselectItem = function(item) {
		selectedItems = $.grep(selectedItems, function(i) {
			return i !== item;
		});
		if (selectedItems.length == 0) {
			$('#selectAllCheckbox').attr('checked', false);
		}
		if ($(".singleCheckbox").length == $(".singleCheckbox:checked").length) {
			$("#selectAllCheckbox").prop("checked", true);
		} else {
			$("#selectAllCheckbox").prop("checked", false);
		}
	};
	*/
	
	
	$("#selectAllCheckbox").click(function(item) {
		selectedItems = [];
		if (this.checked) { // check select status
			$('.singleCheckbox').each(function() {
				this.checked = true;
				selectItem($(this).parent().next().text());
			});
		} else {

			$('.singleCheckbox').each(function() {
				this.checked = false;
				unselectItem(item);
			});
			selectedItems = [];
		}
	});

	/* 체크박스 관련 END */
}