
var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deadmen","outputs":[{"name":"origin","type":"address"},{"name":"timestamp","type":"uint256"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"interval","type":"uint256"}],"name":"initialize","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"released","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"lazarus","outputs":[],"type":"function"}];
var password = '';
var seed = 'print angle evolve stick wild blue hidden danger nest bar retire north';

// var watcher = require('./lib/watcher');
// var persons = require('./persons')
var addresses = [];
var watchers = [];
function loop(){
    persons.forEach(function(person){

        var monitor = new watcher({
            username: person.username,
            address: person.address,
            timeout: person.timeout,
            emails: person.emails
        });
        addresses.push(person.address);
        watchers.push(monitor);
    });
}
