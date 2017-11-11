import IPrinter from './IPrinter';
import someFun from './someFun';

class AbduloPrinter implements IPrinter {
    print() {
        console.log("Анша Абдуль");
    }
}

var printer = new AbduloPrinter();

function printSth(s : IPrinter) : void {
    s.print();
}

printSth(printer);

someFun();