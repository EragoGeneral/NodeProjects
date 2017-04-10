var someuser = {
	name : 'byvoid',
	func : function(){
		console.log(this.name);
	}
};

var foo = {
	name: 'foobar'
}

foo.func = someuser.func;
foo.func();					//foobar

foo.func1 = someuser.func.bind(someuser);
foo.func1();				//byvoid

func = someuser.func.bind(foo);
func();						//foobar

func2 = func;
func2();					//foobar