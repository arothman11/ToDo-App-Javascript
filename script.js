var apikey = "d3f1ce-409923-9f921b-6dc584-60ba89";
document.getElementById("button").addEventListener("click", Post);

document.getElementById("addform").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

//LIST
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    var todos = JSON.parse(this.responseText);
    console.log(todos);
    for(i=0; i<todos.length; i++){
      AddItem(todos[i]);
    }
  }
}

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
xhttp.send();

//POST

function Post(){
// Setting variable for form input (get from HTML form)
var placeholder=document.getElementById("addform").value;
var data = {
    text: placeholder
}

// Initalize AJAX Request
var xhttp2 = new XMLHttpRequest();

// Response handler
xhttp2.onreadystatechange = function() {

    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
        // parse JSON response
        var todo = JSON.parse(this.responseText);
        console.log(todo);
        AddItem(todo);
        document.getElementById('addform').value = '';

    } else if (this.readyState == 4) {
        // this.status !== 200, error from server
        console.log(this.responseText);
    }
}

xhttp2.open("POST", "https://cse204.work/todos", true);
xhttp2.setRequestHeader("Content-type", "application/json");
xhttp2.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
xhttp2.send(JSON.stringify(data));
}

// //GET
// // Setting variable for ToDo id
// var id = "d3f1ce-409923-9f921b-6dc584-60ba89";
//
// // Initalize AJAX Request
// var xhttp2 = new XMLHttpRequest();
//
// // Response handler
// xhttp2.onreadystatechange = function() {
//
//     // Wait for readyState = 4 & 200 response
//     if (this.readyState == 4 && this.status == 200) {
//
//         // parse JSON response
//         var todo = JSON.parse(this.responseText);
//
//         console.log(todo);
//
//     } else if (this.readyState == 4) {
//
//         // this.status !== 200, error from server
//         console.log(this.responseText);
//
//     }
// };
//
//
// xhttp2.open("GET", "https://cse204.work/todos/"+id, true);
// xhttp2.setRequestHeader("Content-type", "application/json");
// xhttp2.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
// xhttp2.send(JSON.stringify(data));

function Delete(){
  var id = this.parentElement.id;
  console.log(this.parentElement);
  var xhttp2 = new XMLHttpRequest();

// Response handler
  xhttp2.onreadystatechange = function() {

    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {

        // parse JSON response
        // var todo = JSON.parse(this.responseText);
        // console.log(todo);
        document.getElementById(id).remove();

    } else if (this.readyState == 4) {

        // this.status !== 200, error from server
        // console.log(this.responseText);

    }
};

  xhttp2.open("DELETE", "https://cse204.work/todos/"+id, true);
  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
  xhttp2.send();
}

function Check(){
  var data = {
      completed: true
  };
  var id = this.parentElement.id;
  console.log(this.parentElement);
  var xhttp2 = new XMLHttpRequest();

// Response handler
  xhttp2.onreadystatechange = function() {

    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {

        // parse JSON response
        // var todo = JSON.parse(this.responseText);
        document.getElementById(id).style.textDecoration="line-through";

    } else if (this.readyState == 4) {

        // this.status !== 200, error from server
        // console.log(this.responseText);
    }
};

  xhttp2.open("PUT", "https://cse204.work/todos/"+id, true);
  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
  xhttp2.send(JSON.stringify(data));
}


function AddItem(td){
  // console.log(document.getElementById("addform").value);
  var list = document.getElementById("list");
  var newelement = document.createElement("li");
  var input = document.getElementById("addform");
  newelement.innerText = td.text;

  newelement.id=td.id;

  if(td.completed==true){
    newelement.style.textDecoration="line-through";
  }

  var button = document.createElement("button");
  button.classList.add("checkbtn");
  button.innerHTML = '<i class="fas fa-check"></i>';
  button.addEventListener("click", Check);
  newelement.appendChild(button);

  var button = document.createElement("button");
  button.classList.add("closebtn");
  button.innerHTML = '<i class="fas fa-times"></i>';
  button.addEventListener("click", Delete);
  newelement.appendChild(button);

  list.appendChild(newelement);
}
