class TestCase{
    constructor(name, status) {
        this.name = name;
        this.status = status;
    }
    
    showResult(){
        console.log(this.name +" - "+ this.status);
    }
}

    const test1 = new TestCase("Login test","Passed");
    test1.showResult();
    const test2 = new TestCase("Checkout test","Failed");
    test2.showResult();
    const test3 = new TestCase("Search test","Skipped");
    test3.showResult();