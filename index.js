// Your code here
function createEmployeeRecord(array) {
    let record;
    return record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createDSObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(object, dateStamp) {
    object.timeInEvents.push(createDSObj("TimeIn", dateStamp));
    return object;
}

function createTimeOutEvent(object, dateStamp) {
    object.timeOutEvents.push(createDSObj("TimeOut", dateStamp));
    return object;
}

function hoursWorkedOnDate(object, dateWorked) {
    const timeIn = object.timeInEvents.find((e) => e.date === dateWorked).hour;
    const timeOut = object.timeOutEvents.find((e) => e.date === dateWorked).hour;
    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(object, dateWorked) {
    const wage = object.payPerHour;
    const hoursWorked = hoursWorkedOnDate(object, dateWorked);
    return wage * hoursWorked;
}

function allWagesFor(object) {
    const allWages = object.timeInEvents.map((day) => {return wagesEarnedOnDate(object, day.date)});
    return allWages.reduce((accum, currentValue) => accum + currentValue);
}

function calculatePayroll(records) {
    const allPay = (records.map((employee) => {return allWagesFor(employee)}));
    return allPay.reduce((accum, currentValue) => accum + currentValue);
}

function findEmployeeByFirstName(srcArray, searchedName) {
    return srcArray.find((record) => record.firstName === searchedName);
}