[![Build Status](https://travis-ci.org/mrmarbles/stringtokenizer.png)](https://travis-ci.org/mrmarbles/stringtokenizer)

stringtokenizer
==========================

String parsing component for Nodejs.

This API provides a means of tokenizing and extracting variables
from strings based off of simple template patterns.

Ideal for URL (path-info / REST web service endpoint) variable extrapolation.

Installation
---------------
     npm install stringtokenizer

Use
---------------
    var tokenizer = require('stringtokenizer').getInstance();
    var tokenized = tokenizer.tokenize("/user/{id}");
    var parsed = tokenizer.parse("/user/1234", tokenized);

Testing
---------------
     npm test

License
-------
[MIT License](http://mrmarbles.mit-license.org/ "Mit License")