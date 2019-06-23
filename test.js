var projects = JSON.parse(localStorage.getItem("projectIndex"));
console.log(projects);

var item = $("<a class='container'><img src='{img}' width='256' height='225' align='middle'><div class='overlay'><div class='text'>{name}</div></div></a>");

$.getJSON('https://api.myjson.com/bins/iwkml', function (data) {
    for (var i = 0; i < projects.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (projects[i] == j) {
                $('#myDiv').append(item);
            }
        }
    }

});