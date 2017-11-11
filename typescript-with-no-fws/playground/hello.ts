interface IPrinter {
    print() : void;
}

class AbduloPrinter implements IPrinter {
    print() : void {
        console.log("Анша Абдуль");
    }
}

var printer : IPrinter;

printer = new AbduloPrinter();

printer.print();
