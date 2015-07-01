var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deadmen","outputs":[{"name":"origin","type":"address"},{"name":"timestamp","type":"uint256"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"interval","type":"uint256"}],"name":"initialize","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"released","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"lazarus","outputs":[],"type":"function"}];
var helpers = ethlightjs.helpers;
var contractAddr = "71696feb6f12903103c60357232c71ae60fae1bb";
var api = new ethlightjs.blockchainapi.blockappsapi("http://stablenet.blockapps.net");
var password = '';
var seed = '';
var sendingAddr;
// var keystore;
// var seed;
var address;
function onLoad(){
    var name = localStorage.getItem("name");
    sendingAddr = localStorage.getItem("address");
    seed = localStorage.getItem("seed");
    document.getElementById("name").innerHTML = "<strong>Name: </strong>" + "<br><em>" + "Michael" + "</em>" ;
    document.getElementById("address").innerHTML = "<strong>Address: </strong>" + "<br><em>" + "af8b2d3fe28201476fc0a3961f8f9690693f3ef4" + "</em>" ;

    var trigger = "<br><br>Your name and address has now been bound.<br><br>"+
                   "The trigger protocol is activated.<br><br>" +
                   "Releasing the button spreads the information.<br><br>" +
                   "Good luck, <strong>dead man</strong>.<br><br>"
        document.getElementById("description").innerHTML = trigger;

    var seed = localStorage.getItem("seed");
    var keystore = new ethlightjs.keystore(seed, password);
    var address = keystore.generateNewAddress(password);
    var accNonce;
    api.getNonce(address, function(err, nonce){
        var trig = document.getElementById('trigger');
        var sendingAddr = "af8b2d3fe28201476fc0a3961f8f9690693f3ef4"
        accNonce = nonce;
        var txObj = {gasLimit: 3000000, gasPrice: 12000000000000, nonce: accNonce};

        helpers.sendFunctionTx(abi, contractAddr, 'released', [],
                        address, txObj, api, keystore, password,
                        function (err, data) {console.log(data)});
    });

}
