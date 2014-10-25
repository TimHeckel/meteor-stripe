var Future = Npm.require("fibers/future");

function ff() {
	var f = new Future();
	return { cb: f.resolver(), f: f };
};

var _self;
Stripe = {
	init: function(apiSecretKey) {
		var _stripe = Npm.require('stripe');
		_self = new _stripe(apiSecretKey);
	},
	customers: {
		create: function(params) {
			var f = ff();
			//calling apply or call on the create method (or any stripe method) doesn't work
			//because createUrlData is null and 'this' context is off...
			var _res = _self.customers.create(params, f.cb);
			return f.f.wait();
		}
		, createCard: function(custId, opts) {
			var f = ff();
			var _res = _self.customers.createCard(custId, opts, f.cb);
			return f.f.wait();
		}
		, updateSubscription: function(custId, opts) {
			var f = ff();
			var _res = _self.customers.updateSubscription(custId, opts, f.cb);
			return f.f.wait();
		}
		, cancelSubscription: function(custId) {
			var f = ff();
			var _res = _self.customers.cancelSubscription(custId, f.cb);
			return f.f.wait();
		}
	},
	plans: {
		list: function(params) {
			var f = ff();
			var _res = _self.plans.list(params, f.cb);
			return f.f.wait();
		}
		, create: function(params) {
			var f = ff();
			var _res = _self.plans.create(params, f.cb);
			return f.f.wait();
		}
	}
};

/*
accounts
retrieve()

balance
retrieve()
listTransactions([params])
retrieveTransaction(transactionId)

charges
create(params)
list([params])
retrieve(chargeId)
capture(chargeId[, params])
refund(chargeId[, params])
update(chargeId[, params])
updateDispute(chargeId[, params])
closeDispute(chargeId[, params])
setMetadata(chargeId, metadataObject) (metadata info)
setMetadata(chargeId, key, value)
getMetadata(chargeId)

coupons
create(params)
list([params])
retrieve(chargeId)
del(chargeId)

customers
create(params)
list([params])
update(customerId[, params])
retrieve(customerId)
del(customerId)
setMetadata(customerId, metadataObject) (metadata info)
setMetadata(customerId, key, value)
getMetadata(customerId)
updateSubscription(customerId[, params])
cancelSubscription(customerId[, params])
createCard(customerId[, params])
listCards(customerId)
retrieveCard(customerId, cardId)
updateCard(customerId, cardId[, params])
deleteCard(customerId, cardId)
deleteDiscount(customerId)

events (types of events)
list([params])
retrieve(eventId)

invoiceItems
create(params)
list([params])
update(invoiceItemId[, params])
retrieve(invoiceItemId)
del(invoiceItemId)

invoices
create(params)
list([params])
update(invoiceId[, params])
retrieve(invoiceId)
retrieveLines(invoiceId)
retrieveUpcoming(customerId)
pay(invoiceId)

plans
create(params)
list([params])
update(planId[, params])
retrieve(planId)
del(planId)

recipient
create(params)
list([params])
update(recipientId[, params])
retrieve(recipientId)
del(recipientId)
setMetadata(recipientId, metadataObject) (metadata info)
setMetadata(recipientId, key, value)
getMetadata(recipientId)

tokens
create(params)
retrieve(tokenId)

transfers
create(params)
list([params])
retrieve(transferId)
update(transferId[, params])
cancel(transferId)
setMetadata(transferId, metadataObject) (metadata info)
setMetadata(transferId, key, value)
getMetadata(transferId)
*/