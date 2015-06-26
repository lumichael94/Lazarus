var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deadmen","outputs":[{"name":"origin","type":"address"},{"name":"timestamp","type":"uint256"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"interval","type":"uint256"}],"name":"initialize","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"released","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"lazarus","outputs":[],"type":"function"}];
var helpers = ethlightjs.helpers;
var contractAddr = eba1eadf355566f6fc2cf8baafc62cdf18037815;
var txObj = {gasLimit: 3000000, gasPrice: 12000000000000, nonce: accNonce};
var password = '';

function onLoad(){
    var name = localStorage.getItem("name");
    var address = localStorage.getItem("address");
    console.log(name);
    console.log(address);
    console.log(protocol);
    document.getElementById("name").innerHTML = "<strong>Name: </strong>" + "<br><em>" + name + "</em>" ;
    document.getElementById("address").innerHTML = "<strong>Address: </strong>" + "<br><em>" + address + "</em>" ;

    var trigger = "<br><br>Your name and address has now been bound.<br><br>"+
                   "The trigger protocol is activated.<br><br>" +
                   "Releasing the button spreads the information.<br><br>" +
                   "Good luck, <strong>dead man</strong>.<br><br>"
        document.getElementById("description").innerHTML = trigger;

}
function trigger(){
    var trigger = document.getElementById('trigger');
    var sendingAddr = localStorage.getItem("address");
    var protocol = localStorage.getItem("protocol");
    var contractAddr = "change this to address";
    var key = parseInt(document.getElementById('keyToSet').value);

    trigger.onmouseup = function(){
        helpers.sendFunctionTx(abi, contractAddr, 'released',
                        sendingAddr, txObj, api, [key], keystore, password,
                        function (err, data) {console.log(data)});
    }
    
}
