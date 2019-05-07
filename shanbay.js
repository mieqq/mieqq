var obj = JSON.parse(body);

for (var i = 0; i < obj.data.length; i++){
  obj.data[i].due_date = "2030-01-01";
  obj.data[i].state = "启用";
}

JSON.stringify(obj);