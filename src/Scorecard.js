var Scorecard = function(){
this.Total = null;
this.rolls = [];
this.frameTotals = []
};

Scorecard.prototype.roll = function(roll1, roll2, roll3){
  if (typeof roll3 === 'undefined') { roll3 = 0; }
  if(roll1 > 10){throw new Error("can't score more than 10!");};
  if(roll2 > 10){throw new Error("can't score more than 10!");};
  if(roll3 > 10){throw new Error("can't score more than 10!");};
  if(((roll1+roll2) > 10) && (this.rolls.length != 9)) {throw new Error("You cannot score more than 10 from two rolls!");};
  if (this.rolls.length === 9){
    if(((this.rolls[8][0] || this.rolls[8][1]) != 10) && ((roll1 !=10) || (roll2 !=10))){
      if(roll3 > 0){throw new Error("Cannot use 3rd roll as you did not have a strike");};
    } else {
      return this.rolls.push([roll1,roll2, roll3]);
    }
  }
  if (this.rolls.length === 10){throw new Error("You cannot play more than 10 frames!");};
  this.rolls.push([roll1,roll2]);
};

Scorecard.prototype.frameTotal = function(i){
  var f1r1 = (this.rolls[i-1][0]);  // f = frame , r = roll
  var f1r2 = (this.rolls[i-1][1]);  // for initial frame

  if(this.rolls.length > i) {       // Assigns r1 & r2 for subsequent frame
    var f2r1 = (this.rolls[i][0]);
    var f2r2 = (this.rolls[i][1]);
  }

  if(this.rolls.length > i+1) {       // Assigns r1 & r2 for 3rd frame in case of double strike
    var f3r1 = (this.rolls[i+1][0]);
    var f3r2 = (this.rolls[i+1][1]);
  }

  var total = (f1r1 + f1r2);
  if (i === (9 || 10)){
      if(((f1r1 || f1r2) === 10) && (f2r1) === 10){
        return total += (f2r1 + f2r2 + f3r1);
      } else if((f1r1 || f1r2) === 10) {
        return total += (f2r1 + f2r2);
      } else if(total === 10) {
        return total += f2r1;
      } else {
        return total;
      }
    } else {
      if(((f1r1 || f1r2) === 10) && (f2r1) === 10){
        return total += (f2r1 + f2r2 + f3r1);
      } else if((f1r1 || f1r2) === 10) {
        return total += (f2r1 + f2r2);
      } else if(total === 10) {
        return total += f2r1;
      } else {
        return total;
      }
    }

};

Scorecard.prototype.runningTotal = function(){
  var total = 0;
  this.frameTotals = [];
  for(var i = 1; i < (this.rolls.length)+1; i++){
    if(isNaN(this.frameTotal(i))){
    } else {
      this.frameTotals.push((this.frameTotal(i)));
    }
  }

  for( var i = 0; i < (this.frameTotals.length); i++ ){
      total += (this.frameTotals[i]);
  }

  return total;

}
