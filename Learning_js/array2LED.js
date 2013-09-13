var b = require('bonescript');
//Define Variables
var z = ['0','0','0','0'];
var start = 0;
var finish = 16;
//Pinout Definition
b.pinMode('USR0', b.OUTPUT);
b.pinMode('USR1', b.OUTPUT);
b.pinMode('USR2', b.OUTPUT);
b.pinMode('USR3', b.OUTPUT);

setInterval(begin,1000);

function begin(){   
    if(start < finish){
        counter(start);
        start++;}
    else{
        start = 0;
        return;
    }
}

//Function Converts the Decimal Value to Binary
function counter(start){
    z = dec2Bin(start);
    write_to_LEDS();
    return;
}
//Does it by converting the value into a string by radix 2(.tostring method), then splits the array. DOES NOT HAVE CONSTANT SIZE
function dec2Bin(dec){
    if (dec >= 0){
    dec = dec.toString(2);
    dec = dec.split('');
    return dec;
    }
    
}
//Figures Out whether to write a 1 or 0 to the LEDs
function low_high(val){
    var STATE;
    if (val == '1')
        STATE = b.HIGH;
    else
        STATE = b.LOW;
    return STATE;
}

//Figures out the length of the array then does some shifting. Writes to LEDs. Tried Concantenation. Does not split the array
function write_to_LEDS(){
    var writetostate;
    if(z.length == 1){
        z[3] = z[0];
        z[0] = '0';
        z[1] = '0';
        z[2] = '0';
    }        
    if(z.length == 2){
        z[3] = z[1];
        z[2] = z[0];
        z[0] = '0';
        z[1] = '0';
    }        
    if(z.length == 3){
        z[3] = z[2];
        z[2] = z[1];
        z[1] = z[0];
        z[0] = '0';
    }      
    console.log(z);
    writetostate = low_high(z[0]);
    b.digitalWrite('USR0',writetostate);
    writetostate = low_high(z[1]);
    b.digitalWrite('USR1',writetostate);
    writetostate = low_high(z[2]);
    b.digitalWrite('USR2',writetostate);
    writetostate = low_high(z[3]);
    b.digitalWrite('USR3',writetostate);
    
    
}