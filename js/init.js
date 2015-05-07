
eve.system.init({
  transports: [
    {
      type: 'http'
    }
  ]
});

var proxy = new proxyAgent("proxy");

proxy.rpc.request(EVE_ADDRESS, {method:'test',params:{a:1,b:4}}).done(function (reply) {console.log(reply);});