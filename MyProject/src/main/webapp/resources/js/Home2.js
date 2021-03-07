/*$(document).ready(function() {
	//button_click();

	//첫 그리드 set
	set_grid();

	//그리드에 name, id, pw 추가
	add_grid();

	//재조회
	lookup_grid();

	//추가된 데이터 db에 저장(update 기능도 가지고 있음 pk = id)
	insert_grid();

});


function insert_grid() {

	$("#insert_grid_btn").click(function() {
		//jsGrid에 있는 모든 데이터 = data
		var items = $("#jsGrid").jsGrid("option", "data");

		$.ajax({
			url: "/saveUserList", //RequestMapping이랑 연결
			type: "post",
			data: JSON.stringify(items),	//JSON 형태로 변경
			contentType: "application/json"	//json 데이터 type

			, success: function() { //성공
				console.log("저장 성공");

			},
			error: function() {	//실패
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
		confirmDeleting: false,

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
				console.log("LOG : loadData 호출됨");
				//alert(JSON.stringify(filter));
				var d = $.Deferred();

				$.ajax({
					url: "/getUserList",
					type: "get",
					//data : {}, 전송 파라미터 ex(ID, PW)
					contentType: "application/json",
					dataType: "json",
					data: {

						/* 아래처럼 보내고 Controller 에서 @RequestParam("id") String id 으로 받아도 됨 */
						id: filter.id,
						pw: filter.pw,
						name: filter.name

					}
					,

					success: function(response) {
						console.log("filter : ", filter);
						console.log("success: ", response);
					},
					error: function(response) {
						console.log("fail : " + response);

					}

				}).done(function(response) {
					d.resolve(response);
				});

				return d.promise();
			},

		},

		fields: [
			/* 따로 재정의해서 쓸 수 있음(name, id, pw, control 와 다르게) */
			{
				headerTemplate: function() {
					return $("<input>").attr("type", "checkbox").attr("id", "selectAllCheckbox")
				},
				itemTemplate: function(_, item) {
					return $("<input>").attr("type", "checkbox").attr("class", "singleCheckbox")
						.prop("checked", $.inArray(item, selectedItems) > -1)
						.on("change", function() {
							$(this).is(":checked") ? selectItem(item) : unselectItem(item);
						})
						.on("click", function(event) {
							// 안해주면 editing: true 되어있을때 체크박스 두번 눌러야 체크됨.
							event.stopPropagation();
						});
				},
				align: "center",
				width: 10,
				sorting: false


			},

			{
				name: "name", type: "text", width: 150,

				editTemplate: function(value) {
					var $result = jsGrid.fields.number.prototype.editTemplate.call(this, value);

					$result.on("keydown", function(e) {
						if (e.which == 13) {
							$("#jsGrid").jsGrid("updateItem");
							return false;
						}
					});


					setTimeout(function() {

						$result.focus();
						return false;
					});
					return $result;

				},
				/*insertTemplate: function(value) {
					this.insertControl = $("<input>");
					insert_on_enter(this.insertControl);
					return this.insertControl;
				},
				editTemplate: function(value) {
					this.editControl = $("<input>").val(value);
					update_on_enter(this.editControl);
					return this.editControl;
				}*/

			},
			{
				name: "id", type: "text", width: 150,
				editTemplate: function(value) {
					var $result = jsGrid.fields.number.prototype.editTemplate.call(this, value);
					$result.on("keydown", function(e) {
						if (e.which == 13) {
							$("#jsGrid").jsGrid("updateItem");
							return false;
						}
					});
					return $result;
				}
			},

			{
				name: "pw", type: "text", width: 150,
				editTemplate: function(value) {
					var $result = jsGrid.fields.number.prototype.editTemplate.call(this, value);
					$result.on("keydown", function(e) {
						if (e.which == 13) {
							$("#jsGrid").jsGrid("updateItem");
							return false;
						}
					});
					return $result;
				}
				//이것처럼 해도 됨
				/*insertTemplate: function(value) {
					this.insertControl = $("<input>");
					insert_on_enter(this.insertControl);
					return this.insertControl;
				},
				editTemplate: function(value) {
					this.editControl = $("<input>").val(value);
					update_on_enter(this.editControl);
					return this.editControl;
				}*/
			},
			{ type: "control", deleteButton: false, editing: false } /*editButton: false, deleteButton: false*/ //둘중 하나만 끌 수 있음

		],

		//페이지변경 OR 새로고침될때 발생하는 함수
		onPageChanged: function() {

			console.log("페이지 RELOAD");

			//selectedItems = [];
			$("#selectAllCheckbox").prop("checked", false);

			$('.singleCheckbox').each(function() {
				this.checked = false;
				//unselectItem(item);

			});
			selectedItems = [];
		},

		rowClick: function(args) {
			var $row = $(args.event.target).closest("tr");

			if (this._editingRow) {
				this.updateItem().done($.proxy(function() {
					this.editing && this.editItem($row);
				}, this));
				return;
			}

			this.editing && this.editItem($row);
		}

	});

	function insert_on_enter(field) {
		field.on("keydown", function(e) {
			if (e.keyCode == 13) {
				$("#jsGrid").jsGrid("insertItem");
				$("#jsGrid").jsGrid("clearInsert");
				return false;
			}
		})
	}

	function update_on_enter(field) {
		field.on("keydown", function(e) {
			if (e.keyCode === 13) {
				$("#jsGrid").jsGrid("updateItem");
				return false;
			}
		});
	}

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

	$("#selectAllCheckbox").click(function(item) {
		selectedItems = [];
		if (this.checked) { // check select status
			$('.singleCheckbox').each(function() {
				this.checked = true;
				selectItem(item);
				//selectItem($(this).parent().next().text());
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

	/* 체크된것 삭제 Start */
	$("#delete_grid_btn").click(function() {
		//한개 이상 체크되어야 confirm 뜸
		if (!selectedItems.length || !confirm("정말 삭제 하시겠습니까?"))
			return;

		//체크된 데이터 리스트 = selectedItems
		console.log("selectedItems : " + JSON.stringify(selectedItems));

		var items = selectedItems;

		$.ajax({
			url: "/deleteUserList",
			type: "post",
			//data : {}, 전송 파라미터 ex(ID, PW)
			contentType: "application/json",

			data: JSON.stringify(items),

			success: function() {

				console.log("Delete Success");

				//console.log(response);

				//d.resolve(response);
			},
			error: function() {
				console.log("Delete Fail : " + JSON.stringify(items));

			}

		}).done(function() {
			//1페이지로 이동
			$("#jsGrid").jsGrid("option", "pageIndex", 1);

			//$("#jsGrid").jsGrid("loadData");
			//reload
			$("#jsGrid").trigger("reloadGrid");
		});

		selectedItems = [];
	});
}*/