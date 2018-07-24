
var y = 2100;
var i = 0;
for(let m=1;m<13;m++){
    var date = new Date(y + '-' + m + '-' + '13');
    if(date.getDay()==5){++i};
}
console.log(i)



// const fs = require('fs')
// const data = fs.readFileSync('/dev/stdin')
// var i = 0;
// for(let m=1;m<13;m++){
//     var date = new Date(data + '-' + m + '-' + '13');
//     if(date.getDay()==5){++i};
// }
// console.log(i)
// process.exit()