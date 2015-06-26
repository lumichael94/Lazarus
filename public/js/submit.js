var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deadmen","outputs":[{"name":"origin","type":"address"},{"name":"timestamp","type":"uint256"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"interval","type":"uint256"}],"name":"initialize","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"released","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"lazarus","outputs":[],"type":"function"}];
var helpers = ethlightjs.helpers;
var contractAddr = "71696feb6f12903103c60357232c71ae60fae1bb";
var api = new ethlightjs.blockchainapi.blockappsapi("http://stablenet.blockapps.net");
var password = '';
var seed = '';
var sendingAddr;
var address;
function onLoad(){
    var seedField = document.getElementById('seed');
    seedField.onkeyup = function(){
        console.log("seedField up")
        var seed = document.getElementById('seed').value;
        // console.log(seed);
        var sel = document.getElementById('addresslist');
        var passwordField = document.getElementById('password');
        passwordField.onkeyup = function(){
            setTimeout(function(){
                var password = document.getElementById('password').value;
                console.log("passwordField up")
                for (var i = 0; i < sel.size; i++){
                    sel.removeChild(sel.childNodes[i]);
                }
                var keystore = new ethlightjs.keystore(seed, password);
                for (var i = 0; i < 10; i++){
                    var opt = document.createElement('option');
                    var address = keystore.generateNewAddress(password);
                    opt.innerHTML = address;
                    opt.value = address;
                    sel.appendChild(opt);
                }
            },2000);
        }
    }
}

function submit(){
    var seed = document.getElementById('seed').value;
    var keystore = new ethlightjs.keystore(seed, password);
    var address = keystore.generateNewAddress(password);

    console.log(keystore.getAddresses());
    console.log(address);
    var accNonce;
     api.getNonce(address,function(err, nonce){
         var name = document.getElementById('name').value;
         var sel = document.getElementById('addresslist');
         var sendingAddr = sel.options[sel.selectedIndex].value;

         localStorage.setItem("name", name);
         localStorage.setItem("address", sendingAddr);
         localStorage.setItem("protocol", "TRIGGER");
         localStorage.setItem("seed", seed);
         accNonce =  nonce;
         console.log(accNonce + " is the accNonce");
         var txObj = {gasLimit: 3000000, gasPrice: 12000000000000, nonce: accNonce};

         helpers.sendFunctionTx(abi, contractAddr, 'initialize', [name,0],
                         address, txObj, api, keystore, password,
                         function (err, data) {
                             console.log(data);
                             window.location.href = "/info";
                             });

    });







}
