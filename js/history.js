class OperationsHistory{
   constructor(){
     this.currentIndex = 0;
     this.operations = [];
     this.current = null;
   }
   
   push(operation){
      if (this.currentIndex != this.operations.length - 1){
          this.current = this.operations[this.currentIndex + 1]
          let diff = this.operations.length - this.currentIndex;
          for (let i = 0; i < diff; i++){
            this.operations.pop();
          }
      }
      this.operations.push(operation);
      this.currentIndex++;
      if (this.operations.length >= 10){
          this.operations.shift();
          this.currentIndex--;
      }

   }
   
   getNext(){
      this.currentIndex = this.currentIndex + 1
      if (this.currentIndex >= this.operations.length - 1){
        this.currentIndex = this.operations.length - 1; 
        return this.current;
      }
      return this.operations[this.currentIndex];
   }

   getPrev(){
       this.currentIndex =  this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : this.operations.length - 1;
       return this.operations[this.currentIndex];
   }

   reset(){
     this.current = null;
    this.operations = [];
   }

   length(){
     return this.operations.length;
   }
}
