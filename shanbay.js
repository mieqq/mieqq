var obj = JSON.parse(body);

for (var i = 0; i < a.data.length; i++){
  a.data[i].due_date = "2030-01-01";
  a.data[i].state = "启用";
}

JSON.stringify(obj);