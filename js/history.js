class OperationsHistory{
   constructor(){
     this.currentIndex = 0;
     this.operations = [];
   }
   
   push(operation){
      if (this.currentIndex != this.operations.length - 1){
          let diff = this.operations.length - this.currentIndex;
          for (let i = 0; i < diff; i++){
            this.operations.pop();
          }
      }
      console.log(this.currentIndex);
      console.log(this.operations)
      this.operations.push(operation);
      this.currentIndex++;
      console.log(this.currentIndex);
      console.log(this.operations)
      if (this.operations.length >= 10){
          this.operations.shift();
          this.currentIndex--;
      }

   }
   
   getNext(){
      this.currentIndex = this.currentIndex + 1 <= this.operations.length - 1 ? this.currentIndex + 1: 0;
      console.log(this.currentIndex)
      return this.operations[this.currentIndex];
   }

   getPrev(){
       this.currentIndex =  this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : this.operations.length - 1;
       return this.operations[this.currentIndex];
   }



}
