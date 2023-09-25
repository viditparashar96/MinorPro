
// cursor animation
var main = document.querySelector("#main")
var cursor = document.querySelector("#cursor")

main.addEventListener("mousemove" , function(dets){
    cursor.style.top=dets.y+(-15)+"px"
    cursor.style.left=dets.x +(-15) +"px"
})
