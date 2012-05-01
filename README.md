Node BrowserID Consumer
=======================

This is a one-function module for verifying auth tokens with an external BrowserID server (such as Mozilla's).

Usage example -- on the server, using express:

    var browserid = require('browserid-consumer');

    app.post('/authorize', function(req, res) {
        browserid.verify(req.body.assertion, "localhost:3000", function(err, message) {
            if (err) {
                res.send("Error: authorization failed.");
            } else {
                res.send("Success: " + JSON.stringify(message));
            }
        });
    });

On the client, using jQuery:

    $(".signin").on("click", function() {
        navigator.id.get(function(assertion) {
            if (assertion) {
                $.ajax({
                    url: "/authorize",
                    type: "POST",
                    data: {assertion: assertion},
                    success: function(data) {
                        // tell the user they're signed in.
                    },
                    error: function(data) {
                        // tell the user something went wrong.
                    }
                });
            } else {
                // Signin was cancelled.
            }
        });
        return false;
    });

Options
=======

The one function is:

    verify(assertion, audience, callback, options)

* `assertion`: This is the nonce passed by the client to you to verify.  The client should have gotten it directly from the identity provider (e.g. Mozilla).
* `audience`: This is your host name, with port if different than 80.
* `callback(err, answer)`: A function to respond to the identity provider's verification attempt.  If there was an error, the answer will be in the first argument, `err`.  If there was no answer, `err` will be null.  The answer looks like:

        {
            "status": "okay", 
            "email": "name@example.com",
            "audience": "https://yoursite.com",
            "expires": 1308859352261,
            "issuer": "browserid.org"
        }

    Documentation of this can be found at https://developer.mozilla.org/en/BrowserID/Quick_Setup .

* `options`: A hash of options.  Default values:

     * `protocol`: Protocol for the identity provider.  "https" or "http", default "https"
     * `host`: Host for the identity provider.  Default "browserid.org"
     * `port`: Port for the identity provider. Default 443.
     * `path`: Path part of URL for identity provider. Default "/verify"
     * `method`: Method for request for identity provider. Default "POST"
     * `logger`: Pass an object with `{ debug: function(...) {} }` to enable debug logging.

Development
===========

Written in coffeescript.  Run the example server using `cake runserver`, and point your browser to `http://localhost:3000`
