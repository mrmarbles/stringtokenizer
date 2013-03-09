module.exports = {

  setUp: function(callback) {
    this.tokenizer = require('../lib/tokenizer.js').getInstance();
    callback();
  },

  "Test tokenization without any variables": function(test) {

    var tokenized = this.tokenizer.tokenize('hello world');

    test.ok(tokenized);
    test.ok(tokenized.template);
    test.ok(tokenized.matcher);
    test.ok(tokenized.tokens);
    test.equals('hello world', tokenized.template);
    test.equals('/^hello world$/', tokenized.matcher.toString());
    test.equals(0, tokenized.tokens.length);

    test.done();
  },

  "Test tokenization with a single simple variable": function(test) {

    var tokenized = this.tokenizer.tokenize('/user/{userId}');

    test.ok(tokenized);
    test.ok(tokenized);
    test.ok(tokenized.template);
    test.ok(tokenized.matcher);
    test.ok(tokenized.tokens);
    test.equals('/user/{userId}', tokenized.template);
    test.equals('/^/user/([\\w\\d]+)$/', tokenized.matcher.toString());
    test.equals(1, tokenized.tokens.length);
    test.equals('userId', tokenized.tokens[0]);

    test.done();

  },

  "Test tokenization with multiple variables": function(test) {

    var tokenized = this.tokenizer.tokenize('/one/{two}/three/{four}');

    test.ok(tokenized);
    test.ok(tokenized);
    test.ok(tokenized.template);
    test.ok(tokenized.matcher);
    test.ok(tokenized.tokens);
    test.equals('/one/{two}/three/{four}', tokenized.template);
    test.equals('/^/one/([\\w\\d]+)/three/([\\w\\d]+)$/', tokenized.matcher.toString());
    test.equals(2, tokenized.tokens.length);
    test.equals('two', tokenized.tokens[0]);

    test.done();

  },

  "Test tokenization with custom matcher": function(test) {

    var tokenized = this.tokenizer.tokenize('/user/{userId:[0-9]{4}}');

    test.ok(tokenized);
    test.ok(tokenized);
    test.ok(tokenized.template);
    test.ok(tokenized.matcher);
    test.ok(tokenized.tokens);
    test.equals('/user/{userId:[0-9]{4}}', tokenized.template);
    test.equals('/^/user/([0-9]{4})$/', tokenized.matcher.toString());
    test.equals(1, tokenized.tokens.length);
    test.equals('userId', tokenized.tokens[0]);

    test.done();

  },

  "Test parsing with tokenized object - no match": function(test) {

    var tokenized = this.tokenizer.tokenize('hello world');
    var parsed = this.tokenizer.parse('hello worldd', tokenized);
    test.ok(!parsed);

    test.done();

  },

  "Test parsing with tokenized object containing a single variable": function(test) {

    var tokenized = this.tokenizer.tokenize('/user/{userId}');
    var parsed = this.tokenizer.parse('/user/1234', tokenized);

    test.ok(parsed);
    test.ok(parsed.userId);
    test.equals('1234', parsed.userId);

    var parsed = this.tokenizer.parse('/user/bcarr', tokenized);
    test.ok(parsed);
    test.equals('bcarr', parsed.userId);

    test.done();

  },

  "Test parsing with tokenized object containing single variable with custom matcher": function(test) {

    var tokenized = this.tokenizer.tokenize('/user/{userId:[0-9]{4}}');
    var parsed = this.tokenizer.parse('/user/123', tokenized);
    test.ok(!parsed); // no match - null parsed object

    var parsed = this.tokenizer.parse('/user/12345', tokenized);
    test.ok(!parsed) // no match - null parsed object

    var parsed = this.tokenizer.parse('/user/asdf', tokenized);
    test.ok(!parsed); // no match - null parsed object

    var parsed = this.tokenizer.parse('/user/1234', tokenized);
    test.ok(parsed) // good match!

    test.ok(parsed.userId);
    test.equals('1234', parsed.userId);

    test.done();

  }

};