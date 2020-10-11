let ary1 = ['A1','A2','B1','B2','C1','C2','D1','D2'];
let ary2 = ['A','B','C','D'];
//=> 合并后的数组变成：['A1','A2','A','B1','B2','B','C1','C2','C','D1','D2','D'];
// arr=ary1.concat(ary2)
// arr.sort((a,b) => a.localeCompare(b))
ary2 = ary2.map(item=>item+'学习');
let arr = ary1.concat(ary2);
// arr = arr.sort((a,b)=>a.localeCompare(b));  //升序
// arr = arr.map(item=>item.replace('学习',''));
arr = arr.sort((a,b)=>a.localeCompare(b)).map(item=>{
  return item.replace('学习','');
})
//arr = ["A1", "A2", "A", "B1", "B2", "B", "C1", "C2", "C", "D1", "D2", "D"]

let ary3 = ['A1','A2','B1','B2','C1','C2','D1','D2'];
let ary4 = ['A','B','C','D'];
//=> 合并后的数组变成：['A1','A2','A','B1','B2','B','C1','C2','C','D1','D2','D'];
ary3.reverse(); //["D2", "D1", "C2", "C1", "B2", "B1", "A2", "A1"]


let ary3 = ["D2", "D1", "A1","A2", "C1", "C2", "B1","B2" ];
let ary4 = ['B','A','D','C'];
//=》合并后的数组为：['D1','D2','D','A1','A2','A','C1','C2','C','B1','B2','B']
// 思路：记录索引的方式,插入进去
let n  = 0;  //n记录索引
for(let i=0;i<ary4.length;i++){
   //用来循环获取ary4的某一个
   let item2 = ary4[i];
   for(let k=0;k<ary3.length;k++){
     let item1= ary3[k];
     if(item1.includes(item2)){
       n=k;
     }
   }
    ary3.splice(n+1, 0, item2);  // n,0,x  从索引n开始，一个都不删，把x放到索引n的前面
}
console.log(ary3);  //["D2", "D1", "D", "A1", "A2", "A", "C1", "C2", "C", "B1", "B2", "B"]

