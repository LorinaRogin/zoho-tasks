class Tabs{
    constructor(){
        this.buttons = document.querySelectorAll(".btn");
        this.contents = document.querySelectorAll(".content");
        this.addEvents();
    }
    hideAll(){
        this.contents.forEach(c => {
            c.style.display = "none";
        });
    }
    addEvents(){
        this.buttons.forEach(btn=>{
            btn.onclick = () =>{
                let id = btn.getAttribute("data-id");
                this.hideAll();
                document.getElementById("content" + id).style.display = "block";
            };
        });
        
    }
}
let tabs = new Tabs();