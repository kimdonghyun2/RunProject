$(document).ready(function() {
	button_test();
});

function button_test() {
	/*
	$("#btn_test").on("click", function(e) {
		alert('버튼 클릭');
	});
	*/
}


var clients = [{
	"Name": "Otto Clay",
	"Age": 25,
	"Country": 1,
	"Address": "Ap #897-1459 Quam Avenue",
	"Married": false
},
{
	"Name": "Connor Johnston",
	"Age": 45,
	"Country": 2,
	"Address": "Ap #370-4647 Dis Av.",
	"Married": true
},
{
	"Name": "Lacey Hess",
	"Age": 29,
	"Country": 3,
	"Address": "Ap #365-8835 Integer St.",
	"Married": false
},
{
	"Name": "Timothy Henson",
	"Age": 56,
	"Country": 1,
	"Address": "911-5143 Luctus Ave",
	"Married": true
},
{
	"Name": "Ramona Benton",
	"Age": 32,
	"Country": 3,
	"Address": "Ap #614-689 Vehicula Street",
	"Married": false
}
];

$(function(){
	$("#jsGrid").jsGrid({
		width: "100%",
		height: "400px",

		autoload: true,
		//데이터 변경, 추가, 삭제대하여 자동으로 로드되게 함
		sorting: true,
		//그리드 헤더 클릭시 sorting이 되게함
		data: clients,
		//clients를 생성된 배열를 연결함.

		fields: [{
			name: "Name",
			type: "text",
			width: 150
		},
		{
			name: "Age",
			type: "number",
			width: 50
		},
		{
			name: "Address",
			type: "text",
			width: 200
		},
		{
			name: "Married",
			type: "checkbox",
			title: "Is Married",
			sorting: false
		}
		]
		//grid에 표현될 필드 요소
	})
});

/*
$(function() {
	$("#jsGrid").jsGrid({
		width: "100%",
		height: "400px",

		autoload: true,
		//데이터 변경, 추가, 삭제대하여 자동으로 로드되게 함
		sorting: true,
		//그리드 헤더 클릭시 sorting이 되게함
		data: clients,
		//clients를 생성된 배열를 연결함.
	
		
		loaddata: function() {
			console.log("LoadData called...")
			var d = $.Deferred();

			$.ajax({
				type: "GET",
				url: "/getUserList",
				datatype: "json",
			}).done(function(response) {

				d.resolve({
					data: response.items,
					itemCount: response.itemCount
				})
			});

			return d.promise();

		},

		fields: [{
			name: "id",
			type: "text",
			width: 150
		},
		{
			name: "pw",
			type: "text",
			width: 50
		},
		{
			name: "name",
			type: "text",
			width: 200
		}
		]
		//grid에 표현될 필드 요소
	})

});
*/
/*
$(function(){
	
	$("#jsGrid").jsGrid("loaddata", memberList).done(function(){});	
})

function getJson() {
	$.ajax({
		url: "/getUserList",
		type: 'POST',
		dataType: "json",
		success: function(data) {

			var jsondata = JSON.stringify(data);

			$("#obj").append(jsondata);
		},
		error: function(data) { },
		beforeSend: function() { },
		complete: function() { }
	});
}
*/

//버튼 클릭시 grid에 있는 값 가져오기
$("#get_data").click(function() {
	var items = $("#jsGrid").jsGrid("option", "data");
	//jsGrid에 데이터 가져오기
	console.log(items);
	//getJson();
});
