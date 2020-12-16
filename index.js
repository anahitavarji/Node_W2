"use strict";

const { request, Router } = require("express");
var express = require("express");

var app = express();

const data = require("./employees.json");

app.get("/employees", (req, res) => {
  if (!data) {
    res.statusCode(404).send("Could not find information");
  }

  res.send(data);
});

app.get("/employees/:id", (req, res) => {
  const findEmployee = data.employees.find((employee) => {
    return parseInt(req.params.id) === employee.employeeID;
  });
  if (!findEmployee) {
    res.status(404).send("Could not find employee");
  }

  res.send(findEmployee);
});

// app.post("/employees", (req, res) => {
//   const newEmployee = {
//     employeeID: data.employees.length + 1,
//     name: req.body.name,
//     salary: req.body.salary,
//     departmentName: req.body.departmentName,
//   };


//   data.employees.push(newEmployee)
  
// });


app.post("/employees", (req, res) => {
  const newEmployee = {
      employeeID: data.employees.length + 1,
      name: req.body.name,
      salary: req.body.salary,
      departmentName: req.body.departmentName
  };

  data.employees.push(newEmployee);

  res.send("Done");
});

app.put("/employees/:id", (req, res) => {
  const foundEmployee = data.employees.find((employee) => {
    return parseInt(req.params.id) === employee.employeeID;
  });

if (!foundEmployee) {
  return res.status(404).send("Employee cannot be found.");
}


foundEmployee.name = req.body.name;

foundEmployee.salary = req.body.salary;

foundEmployee.departmentName = req.body.departmentName;

res.send("finished");
});


Router.delete("/employees/:id", (req, res) => {
  const chosenEmployee = data.employees.find((employee) => {
    return parseInt(req.params.id) === employee.employeeID;
  });

  if (!chosenEmployee) {
    return res.status(404).send("Employee cannot be found.");
  }
  
  const employeeIndex = data.employees.indexOf(chosenEmployee);

  data.employees.splice(employeeIndex, 1);
  res.json(data.employees);

});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
