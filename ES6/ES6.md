### 一：变量定义(const         let)

​	注意点：没有预解析(TDZ)，块级作用域， 不能重复定义

​	var 定义的变量属于window,而const 和 let则不是这样

​	const : 定义时必须赋值，不能重复赋值

​		const rainb = Object.freeze([1,2,3])



### 二：解构赋值

```javascript
let [a,b,c] = [1,2,3]

let {name, age} = {

	name: 'rainbow',

	age: 18

}
```

注意：左右两边的格式和结构必须保持一致



### 三：字符串

1. 模板字符串

2. 关于字符串的方法

   ① 查找字符串中是否包含某个字符串 

   ​						String.includes(‘’)  =》 true/false

   ②判断字符串是否是以谁开头：

   ​						String.startsWith('')

   ③判断字符串是否以谁结尾： 

   ​						String.endsWith('')

   ④字符串的重复次数：

   ​						String.repeats(3)

   ⑤填充字符串

   ​		str.padStart('整个字符串的长度（填充后）'，‘填充内容’)

   ​		str.padEnd('整个字符串的长度'，‘填充内容’)

### 四：函数

1. 函数的默认参数

   ```javascript
   function show(a="123"){
   	console.log(a)
   }
   ```

   

2. 函数的参数默认已经定义了，不能再用let const 去重新定义了

   ```javascript
   function show(a=18){
       let a = 101 //错误
       console.log(a)
   }
   show()
   ```

3. 箭头函数

   ```=
   let show = ()=>1
   let show2 = () =>{
   	语句
   	return
   	}
   ```

   注意点：

   ①. 箭头函数中的this定义函数时所在的对象，而不再是运行时所在的对象

   ②.箭头函数中没有了argument(用...替代可以)

   ③.箭头函数不能替代构造函数

### 五：数组

1. 循环

   forEach

   ```javascript
   Array.forEach(function(val, i, arr){
       console.log(val ,i ,arr)
   },参数2(指定this))
   ```

2. 映射

   重新整理数据结构

   map() 	非常有用，做数据交互  "映射"
   			正常情况下，需要配合return，返回是一个新的数组
   			若是没有return，相当于forEach

   重新整理数据结构:
   			[{title:'aaa'}]   ->  [{t:'aaaa'}]

   ```javascript
   let newArr = Array.map((item,index,arr) => {
              let arr = [
               {title:'aaaaa', read:100, hot:true},
               {title:'bbbb', read:100, hot:true},
               {title:'cccc', read:100, hot:true},
               {title:'dddd', read:100, hot:true}
           ];
           
           let newArr = arr.map((item, index, arr)=>{
               let json={}
               json.t = `^_^${item.title}-----`;
               json.r = item.read+200;
               json.hot = item.hot == true && '真棒!!!';
               return json;
           });
   })
   ```

   

3. arr.filter():  过滤，过滤一些不合格“元素”， 如果回调函数返回true，就留下来

   ```javascript
           let arr = [
               {title:'aaaaa', read:100, hot:true},
               {title:'bbbb', read:100, hot:false},
               {title:'cccc', read:100, hot:true},
               {title:'dddd', read:100, hot:false}
           ];
   
           let newArr = arr.filter((item,index,arr) => {
               return !item.hot
           })
           console.log(newArr)
   ```

   

4. arr.some(): 类似查找,  数组里面某一个元素符合条件，返回true

   ```javascript
           let arr =['apple','banana','orange'];
   
           let b = arr.some((val, index, arr) =>{
               return val=='banana2';
           });
   
           console.log(b);
   ```

   

5. arr.every(): 数组里面所有的元素都要符合条件，才返回true

   ```javascript
           let arr = [1,3,5,7,9,10];
   
           var b = arr.every((val, index, arr)=>{
               return val%2==1;
           });
   
           console.log(b);
   ```

   	其实他们可以接收两个参数:forEach, map, filter, some,every
   		arr.forEach/map...(循环回调函数, this指向谁);
   	------------------------------------------------------------

6. arr.reduce()   //从左往右
   		求数组的和、阶乘

7. arr.reduceRight()  //从右往左

8. Array.from:
   	作用: 把类数组(获取一组元素、arguments...) 对象转成数组

   ​	个人观点： 具备 length这个东西，就一般是类数组

   ​	也可以用扩展运算符 let arrLi = [...aLi];

9. Array.of():  把一组值，转成数组 (不常用)

   ```javascript
   let arr = Array.of('apple','banana','orange');
   console.log(arr);
   ```

10. arr.find():  查找，找出第一个符合条件的数组成员，如果没有找到，返回undefined

    ```javascript
            let arr = [23,900,101,80,100];
    
            let res = arr.find((val, index, arr) =>{
                return val>1000;
            });
    
            console.log(res);
    ```

    

11. arr.findIndex(): 找的是位置， 没找到返回-1

    ```javascript
            let arr = [23,900,101,80,100];
    
            let res = arr.findIndex((val, index, arr) =>{
                return val>100;
            });
    
            console.log(res);
    ```

12. arr.fill()	填充
    	arr.fill(填充的东西, 开始位置, 结束位置);

    ```javascript
            let arr = new Array(10);
    
            arr.fill('默认值',1,3);
            console.log(arr);
    ```

13. 在ES2016里面新增:

    ```javascript
    arr.indexOf()
    arr.includes()
    	str.includes()
    ```

### 六：对象

1. 对象简介语法(相当有用)

   ```javascript
   	let json ={
   		a:1,
   		b:2,
   		showA:function(){
   			return this.a;
   		}
   		showB:function(){
   			return this.b;
   		}
   	}
   
   	let json ={
   		a,
   		b,
   		showA(){  //个人建议: 一定注意，不要用箭头函数
   		},
   		showB(){
   		}
   	}
   
   
   	new Vuex.Store({
   		state,
   		mutation,
   		types,
   		actions
   	});
   
   	new Vue({
   		router,
   		App,
   		vuex
   	})
   ```



### 七：Promise

作用:  解决异步回调问题

```javascript
        let a = 1;
        let promise = new Promise(function(resolve, reject){
            if(a==10){
                resolve('成功');
            }else{
                reject('失败鸟');
            }
        });

        //promise.then(success, fail);

        promise.then(res=>{
            console.log(res);
        }).catch(err=>{  //reject,发生错误，别名
            console.log(err);
        })
```



Promise.all([p1, p2, p3]):  把promise打包，扔到一个数组里面，打包完还是一个promise对象
		必须确保，所有的promise对象，都是resolve状态，都是成功状态
	Promise.race([p1, p2, p3]): 只要有一个成功，就返回



### 八：模块化

	js不支持模块化
		ruby   require
		python  import
	
	在ES6之前，社区制定一套模块规范:
		Commonjs		主要服务端  nodeJs    require('http')
		AMD			requireJs, curlJs
		CMD			seaJs
	
	ES6出来，统一服务端和客户端模块规范:
		import {xx} ddd


​		
​	模块化：
​			注意： 需要放到服务器环境
​			a). 如何定义模块？
​				export  东西
​				export const a =12;
​				export{
​					a as aaa,
​					b as banana
​				}
​			b). 如何使用?
​				import
​				import './modules/1.js'; 
​				import {a as a, banana, c} from './modules/2.js'
​				import * as modTwo from './modules/2.js';
​				import a from './3.js'
​				import mod, {show, sum, a,b} from './4.js'
​		使用模块:
​			<script type="module"></script>


​	
​		import:  特点
​			a). import 可以是相对路径，也可以是绝对路径
​				import 'https://code.jquery.com/jquery-3.3.1.js';
​			b). import模块只会导入一次，无论你引入多少次
​			c). import './modules/1.js';  如果这么用，相当于引入文件
​			d). 有提升效果，import会自动提升到顶部，首先执行
​			e). 导出去模块内容，如果里面有定时器更改，外面也会改动，不想Common规范缓存


​	
​	  	* import()  类似node里面require， 可以动态引入, 默认import语法不能写到if之类里面
​			返回值，是个promise对象
​	
​			import('./modules/1.js').then(res=>{
​				console.log(res.a+res.b);
​			});
​	
​			优点:
​				1. 按需加载
​				2. 可以写if中
​				3. 路径也可以动态
​	
			Promise.all([])



### 九：类

面向对象 ，类
	属性
	方法
函数模拟

人:  Person
	属性: name
	展示名字: showName

```javascript
 Person.prototype.showName
```
ES5之前：

```javascript
	function Person(){
		this.name='aaa';
	}
	Person.prototype.showName=function(){}
```

ES6中变形:

```javascript
        class Person {                 	  //注意constructor 与 function 以及function之间不能使用逗号
            constructor(name,age = 18){   // constructor在new Person时就调用了
                this.name = name,
                this.age = age
            }
            showName(){                   // 没有function关键字
                console.log(this.name) // ES6里面class没有提升功能，在ES5，用函数模拟可以，默认函数提升
            }
            showAge(){
                console.log(this.age)
            }
        
        }
        let p1 = new Person('rainbow',25)
        p1.showName()
        p1.showAge()


	--------------------------
	const Person = class{}
	------------------------------
    
    // 磊中的属性名可以放表达式
	let a = 'strive';
	let b = 'method';
	class Person{
		[a+b](){
			
		}
	}

// json中的属性名可以放表达式
let aaa='aaa';
let bbb='ddd';
let json={
	[aaa+bbb]:'welcome 51mmr.net'    
}
```

注意： 
1. ES6里面class没有提升功能，在ES5，用函数模拟可以，默认函数提升
2. ES6里面this 比之前轻松多了

```javascript
矫正this:
	1. fn.call(this指向谁, args1, args2....)
	2. fn.apply(this指向谁, [args1, args2....])
	3. fn.bind()
```

静态方法: 就是类身上方法

```javascript
        class Person{
            constructor(){
                
            }
            showName(){
                return '这是showName方法';
            }
            static aaa(){
                return '这是静态方法';
            }
        }

        let p1 = new Person();

        console.log(p1.showName());
        console.log(Person.aaa());
```

父类,子类,继承

```javascript
        //父类
        class Person{
            constructor(name){
                this.name = name;
            }
            showName(){
                console.log('父类showName');
                return `名字为: ${this.name}`;
            }
        }

        //子类
        class Student extends Person{
            constructor(name,skill){
                super(name);   //调用父类的constructor
                this.skill = skill;
            }
            showName(){
                super.showName(); //父级的方法执行 

                //TODO 做子级事情
                console.log('子类里的showName');
            }
            showSkill(){
                return  `哥们儿的技能为: ${this.skill}`;
            }
        }
        

        //调用

        let stu1 = new Student('Strive','逃学');
        console.log(stu1.showName());
```



### 十：Symbol

数据类型:
	number、string、boolean、Object、undefined、function

	用typeof检测出来数据类型:
	symbol

new Number(12)
new String()
new Array()

symbol	使用情况一般

定义：
	let syml = Symbol('aaa');

```javascript
注意:
	1. Symbol 不能new
	2. Symbol() 返回是一个唯一值
		坊间传说, 做一个key，定义一些唯一或者私有一些东
	3. symbol是一个单独数据类型，就叫 symbol, 基本类型
	4. 如果symbol作为key，用for in循环，出不来
```





### 十一：Generator  函数 生成器

> 解决深度嵌套问题：目前用得不多

​	语法：function * show(){}       // 在function和其名字中加上一个*

​	

```javascript
        function * gen(){
            yield 'welcome';
            yield 'to';
            return '牧码人';
        }
        let g1 = gen();   // g1是一个对象
        console.log(g1.next()); //{value: "welcome", done: false}
        console.log(g1.next()); //{value: "to", done: false}
        console.log(g1.next()); //{value: "牧码人", done: true}

上述调用，手动调用，麻烦
```

```javascript
用for in 自动调用
        function * gen(){
            yield 'welcome';
            yield 'to';
            return '牧码人';
        }
        let g1 = gen();
        
        for(let val of g1){
            console.log(val);
        }

// 注意return不会调用
```

```javascript
// 结构赋值
        function * gen(){
            yield 'welcome';
            yield 'to';
            yield '51mmr.net';
            return '牧码人';
        }
        //let [a,b,c] = gen();
        let [a, ...b] = gen();    // 解构是解构所有结果的数组
        console.log(a, b);


        function * gen(){
            yield 'welcome';
            yield 'to';
            yield '51mmr.net';
            return '牧码人';
        }
        console.log(...gen());
```

```javascript
        function * gen(){
            yield 'welcome';
            yield 'to';
            yield '51mmr.net';
            return '牧码人';
        }
        console.log(Array.from(gen())); // 转为数组
```





### 十二： async

语法：

```javascript
async function fn(){  //表示异步，这个函数里面有异步任务
	let result = await  xxx	//表示后面结果需要等待
	
}
```

特点：

```javascript
	1. await只能放到async函数中
	2. 相比genrator语义化更强
	3. await后面可以是promise对象，也可以数字、字符串、布尔
	4. async函数返回是一个promise对象
	5. 只要await语句后面Promise状态变成 reject, 那么整个async函数会中断执行
```

如何解决async函数中抛出错误，影响后续代码

```javascript
	a). 
		try{

		}catch(e){
			
		}
	b). promise本身catch
```

```javascript
个人建议大家:
	try{
		let f1 = await readFile('data/a.txt');
		let f3 = await readFile('data/c.txt');
		let f2 = await readFile('data/b.txt');
	}catch(e){}
```



### 十三：SET 数据结构  类似数组

数据结构
	数组
	json， 二叉树....

set数据结构:
	类似数组，但是里面不能有重复值

```javascript
let arr  = ['a','b','a'];

let arr = new Array();

set用法:
	let setArr = new Set(['a','b']);

	setArr.add('a');   往setArr里面添加一项
	setArr.delete('b');	删除一项
	setArr.has('a')	判断setArr里面有没有此值
	setArr.size	个数

	setArr.clear();	清空
```

循环

```javascript
for...of...

	循环:
		a). for(let item of setArr){  //默认是values()
		            console.log(item);
		        }
		b). for(let item of setArr.keys()){console.log(item);}  // keys 和values一致
		c). for(let item of setArr.values()){}
		d). for(let [k,v] of setArr.entries()){}
		
		e). setArr.forEach((value,index) =>{       // 推荐
		            console.log(value, index);
		        });
```

```javascript
let setArr = new Set().add('a').add('b').add('c');
```

数组去重:   

```javascript
	let arr = [1,2,3,4,5,6,7,6,5,4,3,2,1,2,3,4,4];
	let newArr = [...new Set(arr)];
	console.log(newArr);
```

set数据结构变成数组:

```javascript
[...set]
```





### 十三：map 数据结构，类似json

```javascript
类似 json, 但是json的键(key)只能是字符串

map的key可以是任意类型
```
使用

```javascript
	let map = new Map();

	map.set(key,value);    设置一个值

	map.get(key)	获取一个值

	map.delete(key)	删除一项
	
	map.has(key)	判断有没有

	map.clear()	清空
```

循环

```javascript
	for(let [key,value] of map){}

	for(let key of map.keys()){}

	for(let value of map.values()){}

	for(let [k,v] of map.entries()){}

	map.forEach((value, key) =>{
	    console.log(value, key);
	})
```

### 十四： 数字

```
	二进制:  (Binary)
		let a = 0b010101;
	八进制: (Octal)
		let a = 0o666;
	
	十六进制:
		#ccc
```

``` Nunber()、parseInt()、 parseFloat()
Nunber()、parseInt()、 parseFloat()
```

```javascript

	Number.isNaN(NaN)	-> true

	Number.isFinite(a)   判断是不是数字	√

	Number.isInteger(a)  判断数字是不是整数	√
```

```
	Number.parseInt();
	Number.parseFloat();
```

安全整数

```
	2**3

	安全整数:    -(2^53-1) 到 (2^53-1),   包含-(2^53-1) 和(2^53-1)

	Number.isSafeInteger(a);

	Number.MAX_SAFE_INTEGER	最大安全整数
	Number.MIN_SAFE_INTEGER	最小安全整数
```

Math:

```javascript
	Math.abs()
	Math.sqrt() 开根
	Math.sin()

	Math.trunc()	截取，只保留整数部分
		Math.trunc(4.5)  ->  4
		Math.trunc(4.9)  ->  4

	Math.sign(-5)   判断一个数到底是正数、负数、0
		Math.sign(-5)  ->  -1
		Math.sign(5)  -> 1
		Math.sign(0)	->  0
		Math.sign(-0)	->  -0
		其他值，返回 NaN
	
	Math.cbrt()	计算一个数立方根

		Math.cbrt(27)  ->  3
```



### 十五：ES2018(ES9)

1. 命名捕获

   ```javascript
   		语法:  (?<名字>)
   
   		let str = '2018-03-20';
   		let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
   		let {year, month ,day} = str.match(reg).groups;
   		console.log(year, month, day);
   	反向引用:
   		\1  \2     $1  $2
   	反向引用命名捕获:
   		语法:  \k<名字>
   
   		let reg = /^(?<Strive>welcome)-\k<Strive>$/;
   
   		匹配: ‘welcome-welcome’
   
   		-------------------------------------------------
   
   		let reg = /^(?<Strive>welcome)-\k<Strive>-\1$/;
   
   		匹配: 'welcome-welcome-welcome'
   
   	替换:
   		$<名字>
   
   		let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
   		str = str.replace(reg,'$<day>/$<month>/$<year>');
   		console.log(str);
   
   		----------------------------------------
   		str = str.replace(reg, (...args)=>{
   			//console.log(args)
   			let {year, month, day} = args[args.length-1];
   
   			return `${day}/${month}/${year}`;
   		});
   
   		console.log(str);
   ```

2. dotAll 模式 s

   ```javascript
   
   		之前 '.' 在正则里表示匹配任意东西， 但是不包括 \n 
   	
   	   let reg = /\w+/gims;
   ```

3. 标签函数

   ```javascript
   		// 定义和普通函数一样，调用不一样
   		function fn(){    
   
   		}
   
   		fn()  //这样调用就是普通函数
   
   		fn`aaa`  //标签函数使用
   
   		-----------------------------------
   		function fn(args){
   			return args[0].toUpperCase();
   		}
   
   		console.log(fn`welcome`);
   ```

### 十六： proxy:  代理

```javascript
// 作用： 扩展(增强)对象、方法(函数)一些功能
//	比如: 
//		Vue

//		Vue.config.keyCodes.enter=65

//	Proxy作用: 比如vue中拦截
//		预警、上报、扩展功能、统计、增强对象等等

//	proxy是设计模式一种，  代理模式
```

```
语法:
	new Proxy(target, handler);
	let obj = new Proxy(被代理的对象,对代理的对象做什么操作)

	handler:  // json

	{
		set(){},  //设置的时候干的事情
		get(){},  //获取干的事情
		deleteProperty(){},  //删除  delete obj.name
		has(){}  //问你有没有这个东西  ‘xxx’ in obj
		apply()  //调用函数处理
		.....
	}
```

apply()  :拦截方法  需要与reflect 配合使用

```javascript
        function sum(a,b){
            return a+b;
        }

        let newSum = new Proxy(sum, {
            apply(target, context, args){
                // console.log(target, context, args);
                //console.log(...arguments);
                // target:原来的函数
                // context : this指向
                // args: 参数	
                return Reflect.apply(...arguments); // Reflect.apply(调用的函数，this指向，参数数组);
            									
            }
        });

        console.log(newSum(2,3))
```



### 十七：Reflect

```
Reflect: 反射
	Object.xxx  语言内部方法

		Object.defineProperty

	放到Reflect对象身上

	通过Reflect对象身上直接拿到语言内部东西

	'assign' in Object    ->   Reflect.has(Object, 'assign')

	delete json.a	    ->   Reflect.deleteProperty(json, 'a');
```



### 其他

1. reset 运算符（扩展，重置, 剩余）

2. ES2017新增一个运算符:
   	幂
      		Math.pow(2,3)
      		2 ** 3

3. 循环

   for....of....：
   	arr.keys()	数组下标
   	arr.entries()	数组某一项

   

   ```javascript
   Object.keys()
   Object.entries();
   Object.values();
   ```
   ```javascript
           let arr = ['apple','banana','orange','tomato'];
   
           for(let val of arr){
               console.log(val);
           }
   
           for(let index of arr.keys()){
               console.log(index);
           }
   
           for(let item of arr.entries()){
               console.log(item);
           }
   
           for(let [key, val] of arr.entries()){
               console.log(key,val);
           }
   ```
   ```javascript
           let json = {
               a:1,
               b:2,
               c:3
           };
           for(let key of Object.keys(json)){
               console.log(key);
           }  
   
   
           let {keys, values, entries} = Object;   // 结构赋值
           let json = {
               a:1,
               b:2,
               c:3
           };
           for(let key of keys(json)){
               console.log(key);
           }
           for(let value of values(json)){
               console.log(value);
           }
           for(let item of entries(json)){
               console.log(item);
           }
           for(let [key, val] of entries(json)){
               console.log(key, val);
           }
   ```

   

4. Object.is():	用来比较两个值是否相等(不怎么用)

5. Object.assign():   用来合并对象

   	let 新的对象 = Object.assign(目标对象, source1, srouce2....)   // 后边覆盖前面的
      	
      	function ajax(options){  //用户传
      		let defaults={
      			type:'get',
      			header:
      			data:{}
      			....
      		};
      	
      		let json = Object.assign({}, defaults, options);
      		.....
      	}

      	用途:

​			复制一个对象  合并参数

​	





​	