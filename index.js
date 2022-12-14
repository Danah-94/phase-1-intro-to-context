// Your code here

  function createEmployeeRecord (employee) {

     const EmployeeRecordObject = {
            "firstName": employee[0],
            "familyName": employee[1],
            "title": employee[2],
            "payPerHour": employee[3],
            "timeInEvents": [],
            "timeOutEvents": []
      }
        
      return EmployeeRecordObject;
  }


   function createEmployeeRecords (employees) {
     return employees.map(employee => createEmployeeRecord(employee))  
  }

 
  function createTimeInEvent (employeeRecordObject, date) {

    const day = [...date];
    day.splice(10);

    const hour = [...date];
    hour.splice(0, 11);

    const timeInEvent = {
        type: 'TimeIn',
        hour: Number(hour.join('')),
        date: day.join('')
    };

    employeeRecordObject.timeInEvents.push(timeInEvent);
      return employeeRecordObject

  }


  function createTimeOutEvent (employeeRecordObject, date) {

    const day = [...date];
    day.splice(10);

    const hour = [...date];
    hour.splice(0, 11);

    const timeOutEvent = {
        type: 'TimeOut',
        hour: Number(hour.join('')),
        date: day.join('')
    };

    employeeRecordObject.timeOutEvents.push(timeOutEvent);
    return employeeRecordObject
  }


  function hoursWorkedOnDate (employeeRecordObject, date) {

    const hourIn = employeeRecordObject.timeInEvents.find(event => {
         if (event.date === date) {
            return Number(event.hour);
         }
    });

    const hourOut = employeeRecordObject.timeOutEvents.find(event => {
        if (event.date === date) {
            return Number(event.hour);
        }
     });

    const workHour = (hourOut.hour - hourIn.hour) * 0.01;
    return workHour;
  }


  function wagesEarnedOnDate (employeeRecordObject, date) {

    let payOwed = hoursWorkedOnDate(employeeRecordObject, date) * employeeRecordObject.payPerHour;
    return payOwed;
  }


  function allWagesFor (employeeRecordObject) {

    const daysPay = [];

    for(let record of employeeRecordObject.timeInEvents){
        daysPay.push(wagesEarnedOnDate(employeeRecordObject, record.date));
    }

    return daysPay.reduce((accumulation,value)=>{
            return accumulation + value;
        }
    )
  }


  function calculatePayroll (employeeRecordsArray){

    let moneyOwed = []

    for(let employee of employeeRecordsArray){
        moneyOwed.push(allWagesFor(employee));
    }

    return moneyOwed.reduce(
        (accumulation, value)=>{
            return accumulation + value;
        }
    )
  }
