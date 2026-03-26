class Car{
    constructor(brand , price){
        this.brand = brand;
        this.price = price;
    }
    showDetails(){
        console.log(`This car is  ${this.brand}  and its costs Rs.  ${this.price}`);
    }
    discount(percent){
        let discountAmount = (this.price * percent) / 100;
        this.price = this.price - discountAmount;
        console.log(`After ${percent}% discount , new price is Rs. ${this.price}`);
    }
    increasePrice(amount){
        this.price = this.price + amount;
        console.log(`After adding gst the updatedprice of the car is Rs. ${this.price}`); 
    }
}
let c1 = new Car("SUV" , 5000000);
c1.showDetails();
c1.discount(10);
c1.increasePrice(200000);