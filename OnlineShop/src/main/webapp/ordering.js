/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//getCard();

function getCard(){
    fetch('./cardServlet',
            {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }                
            })
            .then(function (response) {
                response.json().then(function (data) {
                    const obj = JSON.parse(JSON.stringify(data));
                    console.log(JSON.stringify(data));
                   var output="";
                   
                    for(var i=0;i<obj.length;i++){
                        var price = Number(parseFloat(obj[i].article.price).toFixed(2)).toLocaleString('de');
                        var total = Number(parseFloat((obj[i].article.price)*(obj[i].amount)).toFixed(2)).toLocaleString('de');
                        output+= "<tr><td>"+obj[i].article.id+"</td><td>"+obj[i].article.name+"</td><td>"+price+" €</td><td>"+obj[i].amount+"</td><td>"+total+" €</td><td class='actionButton'><button>-</button></td></tr>";
                    }
                    output+="</table>";
                    document.getElementById("selectedArticlesContent").innerHTML=output;
                });
            });
}

function addToCard(articleid){
    fetch('./addToCardServlet',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: articleid
            })
            .then(function (response) {
                response.json().then(function (data) {
                    getCard();
                });
            });
}