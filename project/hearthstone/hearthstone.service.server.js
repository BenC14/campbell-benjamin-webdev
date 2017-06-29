

var q = require('q');
const app = require('../../express');
const https = require('https');

app.get('/api/hearthstone/query/cards/classes/:heroClass', searchQuery);

var appKey  = process.env.HEARTHSTONE_API_KEY;

function searchQuery(req, res) {
    var heroClass     = req.params.heroClass;
    hearthstoneSearchQuery(heroClass)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function hearthstoneSearchQuery(heroClass) {
    var deferred = q.defer();
    https.get({
        host: 'omgvamp-hearthstone-v1.p.mashape.com',
        path: '/cards/classes/'+heroClass+'?collectible=1',
        headers: {
            "Accept": "application/json",
            "X-Mashape-Key": appKey
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}