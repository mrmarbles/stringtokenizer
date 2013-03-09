var StringTokenizer = function() {};

/**
 * Given the provided string template, generates a tokenized 'pattern' object
 * which contains information about the template to be used in future
 * calls to parse().
 *
 * @param template
 * @return {{template: *, matcher: RegExp, tokens: Array}}
 */
StringTokenizer.prototype.tokenize = function(template) {

  var replacements = template.match(/\{.*?\}{1,2}/g), matcher = template,
    replacement, raw, name, reg, components, i,
    tokenized, tokens = [];

  if (replacements) {
    for (i = 0; i < replacements.length; i++) {
      raw = replacements[i];
      replacement = raw.replace(/\{/, "").replace(/\}$/, "");
      components = replacement.split(":");
      name = components[0];
      reg = (components.length > 1) ? "(" + components[1] + ")" : "([\\w\\d]+)";
      matcher = matcher.replace(raw, reg);
      tokens.push(name);
    }
  }

  matcher = "^" + matcher + "$";

  tokenized = {
    template: template,
    matcher: new RegExp(matcher),
    tokens: tokens
  };

  return tokenized;

};

/**
 * Will attempt to parse the provided string (str) with the provided
 * tokenized 'pattern' object.  In order to obtain a properly constructed
 * tokenized pattern, a string template must be provided to the tokenize()
 * method.
 *
 * If the tokenized object is capable of parsing the provided string,
 * then an object with all parsed token names and values will be returned.
 * If it is unable to parse the string (e.g., no match) then undefined will be returned.
 *
 * For example; If a tokenized pattern has been constructed from the following
 * template;
 *
 * /user/{userId}
 *
 * And that pattern object is provided to this parse() method along with the
 * following string;
 *
 * parse('/user/1234', tokenized);
 *
 * Then an object with a single property named 'userId' will be returned containing
 * the value '1324'.
 *
 * @param str
 * @param tokenized
 * @return {{}}
 */
StringTokenizer.prototype.parse = function(str, tokenized) {

  var match = str.match(tokenized.matcher),
    parsed = {}, i = 0;

  if (!match) {
    return;
  }

  for (; i < tokenized.tokens.length; i++) {
    parsed[tokenized.tokens[i]] = match[i + 1];
  }

  return parsed;

};

exports.getInstance = function() {
  return new StringTokenizer();
};