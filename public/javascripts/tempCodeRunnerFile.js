gsap.from("#page1 h1",{
//     y:50,
//     duration:1,
   
// })

// gsap.to("#page1",{
//     height:"40vh",
   
//     scrollTrigger:{
//         trigger:"#page1",
//         scroller:"body",
//         // markers:true,
//         start:"top -10%",
//         end:"top -50%",
        
//         scrub:2,

//     }
// })


// gsap.from("#page2 #img",{
//     y:140,
//     ease:Power3,
   
//     scrollTrigger:{
//         trigger:"#page2 #img",
//         scroller:"body",
//         // markers:true,
//         start:"top 90%",
//         end:"top 40%",
        
//         scrub:2,

//     }
// })

// // gsap.from("#page1 #text1 h1",{
// //     x:-70,
// //     // stagger:1
// //     opacity:0
// // })


// var menubar = document.querySelector("#menubar")
// // menubar.addEventListener("click",function(){
// //     menubar.style.top ="10%";

// // })



// var line1 =document.querySelector("#line1")
// var line3 =document.querySelector("#line2")
// var nav1 =document.querySelector("#line")
// var nav =document.querySelector("#nav")
// var logo= document.querySelector("#left h3")
// var right= document.querySelector("#right")
// flag=0
// nav1.addEventListener("click",function(){
//     if(flag==0){
//     line1.style.rotate= "45deg"
//     line1.style.transformOrigin= " 35% center"
//     line1.style.width= "30px"
    
//     line3.style.width= "30px"
//     menubar.style.top ="0";
    

//     line3.style.rotate= "-40deg"
//     line3.style.transformOrigin= " 35% center"

//     flag=1
//     // logo.style.display="none"
//     // right.style.display="none"


//     }
//     else{
//         line1.style.rotate= "0deg"
//     line3.style.rotate= "0deg"
    
//     flag=0
//     line1.style.width= "70px"
//     line3.style.width= "70px"
//     menubar.style.top ="-100%";
//     // logo.style.display="initial"
//     // right.style.display="initial"


//     }
    
// })


// // cursor animation
// var main = document.querySelector("#main")
// var cursor = document.querySelector("#cursor")

// main.addEventListener("mousemove" , function(dets){
//     cursor.style.top=dets.y+(-15)+"px"
//     cursor.style.left=dets.x +(-15) +"px"
// })