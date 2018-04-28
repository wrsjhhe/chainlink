var link, cc, oracle;
LinkToken.deployed().then(l => link = l);
Oracle.deployed().then(l => oracle = l);
Consumer.deployed().then(l => cc = l);
link.transfer(cc.address, web3.toWei(100));
link.balanceOf.call(cc.address);
