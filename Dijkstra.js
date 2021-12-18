//Код Дейкстры

let fs = require('fs')
let arg=process.argv;
let data = fs.readFileSync(arg[2], "utf8")
let s = data
let input = s.toString().split(' ');

let djst = [];
let stek = [];

let priority = {
    '(': 0,
    ')': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
};

if (input[0] == '(') stek.push('(');
else djst.push(input[0]);

for (let i = 1; i < input.length; i++) {
    if ("()*/+-^".includes(input[i]) == false) {
        djst.push(input[i]);
    } else if (input[i] == '(') {
        stek.push('(');
    } else if (input[i] == ')') {
        while (stek[stek.length - 1] != '(') {
            djst.push(stek[stek.length - 1]);
            stek.pop();
        }
        stek.pop();
    } else if (stek.length == 0 || priority[input[i]] >= priority[stek[stek.length - 1]]) {
        stek.push(input[i])
    } else {
        while (stek[stek.length - 1] != '(' && stek.length) {
            djst.push(stek[stek.length - 1]);
            stek.pop();
        }
        stek.push(input[i]);
    }
}
while (stek.length) {
    djst.push(stek[stek.length - 1]);
    stek.pop()
}
let output = '';

console.log("Код Дейкстры:")
for (i = 0; i < djst.length-1; i++) output += djst[i] + ' ';
console.log(output+djst[i])
let temp = [];
let sub;
let mult;
for (let i = 0; i < djst.length-1; i++) {
    if (!"-+*^/".includes(djst[i]) )
        temp.push(djst[i])
    else {
        djst[i]= ("^".includes(djst[i])) ? "**": djst[i];
        sub = eval(`${temp[temp.length - 2]}${djst[i]}${temp[temp.length - 1]}`)
        temp.pop();
        temp.pop();
        temp.push(sub);
    }
}
console.log("Результат:")
let ans;
for(let i=0;i<data.length;i++) data=data.replace("^","**");
if(djst[djst.length-1]!='^') {
    ans = eval(`${temp[0]}
    ${djst[djst.length - 1]}
    ${temp[1]}`)
    console.log(ans);
}
else {
    ans=Math.pow(temp[0], temp[1])
    console.log(ans);
}
console.log(eval(data))
console.log("Проверка на совместимость ответов:"+(eval(data)==ans));
//Тесты:
//( 6 + 10 - 4 ) / ( 1 + 1 * 2 ) + 1
//( ( 7 - 6.35 ) / 6.5 + 9.9 ) / ( ( 1.2 / 36 + 1.2 / 0.25 - 21 / 16 ) / ( 169 / 24 ) )
// 2 ^ 2 ^ 2
// 2 ^ 2 * 2
// 2 ^ 2 * 2 ^ 2
