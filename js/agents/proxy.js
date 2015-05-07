
function proxyAgent(id) {
  eve.Agent.call(this, id);
  this.rpc = this.loadModule('rpc', {});
  this.connect(eve.system.transports.getAll());

}

proxyAgent.prototype = Object.create(eve.Agent.prototype);
proxyAgent.prototype.constructor = proxyAgent;
