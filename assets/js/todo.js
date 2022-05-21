
const element = document.getElementsByClassName("midr");
var checkbox = document.getElementsByClassName('checkbox');
const a=document.getElementsByClassName('work');
const b=document.getElementsByClassName('pdate');
const cm=document.getElementsByClassName('chipmid');

const delbtn=document.getElementsByClassName('deltebtn')[0];


//discoverd way to add color to divs but changes as i refresh the page

// var d=document.getElementsByClassName('midr');
// var colors=["yellow","red","pink","cyan"];
// var ind=d.length-1;
//   let r = Math.floor(Math.random() * 5);
//   d[ind].style.backgroundColor=colors[r];
  

for(let i=0;i<checkbox.length;i++)
{
checkbox[i].addEventListener('change', function(event) {

  if (this.checked) {
    element[i].style.display= "none" 
    a[i].style="text-decoration: line-through;"
    b[i].style="text-decoration: line-through;"
  } else {
    element[i].style.display = "block";
    a[i].style="text-decoration: none;"
    b[i].style="text-decoration: none;"
  }
});



}