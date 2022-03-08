/*
 * @Description: 
 * @Author: huazj
 * @Date: 2022-02-06 21:23:32
 * @LastEditTime: 2022-02-07 12:45:11
 * @LastEditors: huazj
 */

// ES5寄生组合继承实现
// 父类被继承的对象
function supFather(name) {
    this.name = name;
    this.colors = ['red', 'blus', 'green'];//复杂类型
}
supFather.prototype.sayName = function(age) {
    console.log(this.name, 'age');
}

// 子类
function Sub(name, age) {
    // ingenious：
    // 借用父类的方法：修改他的this指向，赋值父类的构造函数里面方法、属性到子类上
    supFather.call(this, name);
    this.age = age;
}
// 重写子类的prototype，修正constructor指向
function inheritPrototype(sonFn, fatherFn) {
    sonFn.prototype = Object.create(fatherFn.prototype);//浅拷贝父类原型上的属性和方法
    sonFn.prototype.constructor = sonFn;//修正constructor指向到继承的那个函数上
}

inheritPrototype(Sub, supFather);
// 子类的prototype属性要写在后面 否则会被覆盖
Sub.prototype.sayAge = function() {
    console.log(this.age, 'foo');
}

// 实例化子类，可以在实例上找到属性、方法
const instance1 = new Sub('sublei', 20);
const instance2 = new Sub('huazj', 24);
instance1.colors.push('black');
console.log(instance1);//Sub {name: 'sublei', colors: Array(4), age: 20}
console.log(instance2);//Sub {name: 'huazj', colors: Array(3), age: 24}

// 使用ES5实现ES6 extends的例子
// 其实就是上面ES5的寄生组合式继承的那个例子
function Parent(name) {
    this.name = name;
}
Parent.sayHello = function() {
    console.log('hello');
}
Parent.prototype.sayName = function() {
    console.log(`my name is ${this.name}`);
    return this.name;
}

function Child(name, age) {
    Parent.call(this, name);//相当于调用super
    this.age = age;
}
// 继承原型
function _inherits(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.__proto__ = Parent;//note
}
_inherits(Child, Parent);

Child.prototype.sayAge = function() {
    console.log(`my age is ${this.age}`);
    return this.age;
}
// 测试
const parent = new Parent('Parent');
const child = new Child('Child', 20);
console.log('parent: ', parent);//parent:  Parent {name: 'Parent'}
Parent.sayHello();// hello
parent.sayName();// my name is Parent
console.log('child: ', child);// child:  Child {name: 'Child', age: 20}
Child.sayHello();//hello
child.sayName();// my name is Child
child.sayAge();// my age is 20




