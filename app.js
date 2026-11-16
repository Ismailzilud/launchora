var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};

// node_modules/abitype/dist/esm/version.js
var version;
var init_version = __esm({
  "node_modules/abitype/dist/esm/version.js"() {
    version = "1.2.3";
  }
});

// node_modules/abitype/dist/esm/errors.js
var BaseError;
var init_errors = __esm({
  "node_modules/abitype/dist/esm/errors.js"() {
    init_version();
    BaseError = class _BaseError extends Error {
      constructor(shortMessage, args = {}) {
        const details = args.cause instanceof _BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
        const docsPath = args.cause instanceof _BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args.metaMessages ? [...args.metaMessages, ""] : [],
          ...docsPath ? [`Docs: https://abitype.dev${docsPath}`] : [],
          ...details ? [`Details: ${details}`] : [],
          `Version: abitype@${version}`
        ].join("\n");
        super(message);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiTypeError"
        });
        if (args.cause)
          this.cause = args.cause;
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.shortMessage = shortMessage;
      }
    };
  }
});

// node_modules/abitype/dist/esm/regex.js
function execTyped(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
var bytesRegex, integerRegex, isTupleRegex;
var init_regex = __esm({
  "node_modules/abitype/dist/esm/regex.js"() {
    bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
    integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
    isTupleRegex = /^\(.+?\).*?$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/signatures.js
function isErrorSignature(signature) {
  return errorSignatureRegex.test(signature);
}
function execErrorSignature(signature) {
  return execTyped(errorSignatureRegex, signature);
}
function isEventSignature(signature) {
  return eventSignatureRegex.test(signature);
}
function execEventSignature(signature) {
  return execTyped(eventSignatureRegex, signature);
}
function isFunctionSignature(signature) {
  return functionSignatureRegex.test(signature);
}
function execFunctionSignature(signature) {
  return execTyped(functionSignatureRegex, signature);
}
function isStructSignature(signature) {
  return structSignatureRegex.test(signature);
}
function execStructSignature(signature) {
  return execTyped(structSignatureRegex, signature);
}
function isConstructorSignature(signature) {
  return constructorSignatureRegex.test(signature);
}
function execConstructorSignature(signature) {
  return execTyped(constructorSignatureRegex, signature);
}
function isFallbackSignature(signature) {
  return fallbackSignatureRegex.test(signature);
}
function execFallbackSignature(signature) {
  return execTyped(fallbackSignatureRegex, signature);
}
function isReceiveSignature(signature) {
  return receiveSignatureRegex.test(signature);
}
var errorSignatureRegex, eventSignatureRegex, functionSignatureRegex, structSignatureRegex, constructorSignatureRegex, fallbackSignatureRegex, receiveSignatureRegex, modifiers, eventModifiers, functionModifiers;
var init_signatures = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/signatures.js"() {
    init_regex();
    errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
    structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
    constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
    fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
    receiveSignatureRegex = /^receive\(\) external payable$/;
    modifiers = /* @__PURE__ */ new Set([
      "memory",
      "indexed",
      "storage",
      "calldata"
    ]);
    eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
    functionModifiers = /* @__PURE__ */ new Set([
      "calldata",
      "memory",
      "storage"
    ]);
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/abiItem.js
var UnknownTypeError, UnknownSolidityTypeError;
var init_abiItem = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/abiItem.js"() {
    init_errors();
    UnknownTypeError = class extends BaseError {
      constructor({ type }) {
        super("Unknown type.", {
          metaMessages: [
            `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownTypeError"
        });
      }
    };
    UnknownSolidityTypeError = class extends BaseError {
      constructor({ type }) {
        super("Unknown type.", {
          metaMessages: [`Type "${type}" is not a valid ABI type.`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownSolidityTypeError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js
var InvalidAbiParametersError, InvalidParameterError, SolidityProtectedKeywordError, InvalidModifierError, InvalidFunctionModifierError, InvalidAbiTypeParameterError;
var init_abiParameter = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js"() {
    init_errors();
    InvalidAbiParametersError = class extends BaseError {
      constructor({ params }) {
        super("Failed to parse ABI parameters.", {
          details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
          docsPath: "/api/human#parseabiparameters-1"
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiParametersError"
        });
      }
    };
    InvalidParameterError = class extends BaseError {
      constructor({ param }) {
        super("Invalid ABI parameter.", {
          details: param
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidParameterError"
        });
      }
    };
    SolidityProtectedKeywordError = class extends BaseError {
      constructor({ param, name }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SolidityProtectedKeywordError"
        });
      }
    };
    InvalidModifierError = class extends BaseError {
      constructor({ param, type, modifier }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidModifierError"
        });
      }
    };
    InvalidFunctionModifierError = class extends BaseError {
      constructor({ param, type, modifier }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
            `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidFunctionModifierError"
        });
      }
    };
    InvalidAbiTypeParameterError = class extends BaseError {
      constructor({ abiParameter }) {
        super("Invalid ABI parameter.", {
          details: JSON.stringify(abiParameter, null, 2),
          metaMessages: ["ABI parameter type is invalid."]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiTypeParameterError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/signature.js
var InvalidSignatureError, UnknownSignatureError, InvalidStructSignatureError;
var init_signature = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/signature.js"() {
    init_errors();
    InvalidSignatureError = class extends BaseError {
      constructor({ signature, type }) {
        super(`Invalid ${type} signature.`, {
          details: signature
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidSignatureError"
        });
      }
    };
    UnknownSignatureError = class extends BaseError {
      constructor({ signature }) {
        super("Unknown signature.", {
          details: signature
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownSignatureError"
        });
      }
    };
    InvalidStructSignatureError = class extends BaseError {
      constructor({ signature }) {
        super("Invalid struct signature.", {
          details: signature,
          metaMessages: ["No properties exist."]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidStructSignatureError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/struct.js
var CircularReferenceError;
var init_struct = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/struct.js"() {
    init_errors();
    CircularReferenceError = class extends BaseError {
      constructor({ type }) {
        super("Circular reference detected.", {
          metaMessages: [`Struct "${type}" is a circular reference.`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "CircularReferenceError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js
var InvalidParenthesisError;
var init_splitParameters = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js"() {
    init_errors();
    InvalidParenthesisError = class extends BaseError {
      constructor({ current, depth }) {
        super("Unbalanced parentheses.", {
          metaMessages: [
            `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
          ],
          details: `Depth "${depth}"`
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidParenthesisError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/cache.js
function getParameterCacheKey(param, type, structs) {
  let structKey = "";
  if (structs)
    for (const struct of Object.entries(structs)) {
      if (!struct)
        continue;
      let propertyKey = "";
      for (const property of struct[1]) {
        propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
      }
      structKey += `(${struct[0]}{${propertyKey}})`;
    }
  if (type)
    return `${type}:${param}${structKey}`;
  return `${param}${structKey}`;
}
var parameterCache;
var init_cache = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/cache.js"() {
    parameterCache = /* @__PURE__ */ new Map([
      // Unnamed
      ["address", { type: "address" }],
      ["bool", { type: "bool" }],
      ["bytes", { type: "bytes" }],
      ["bytes32", { type: "bytes32" }],
      ["int", { type: "int256" }],
      ["int256", { type: "int256" }],
      ["string", { type: "string" }],
      ["uint", { type: "uint256" }],
      ["uint8", { type: "uint8" }],
      ["uint16", { type: "uint16" }],
      ["uint24", { type: "uint24" }],
      ["uint32", { type: "uint32" }],
      ["uint64", { type: "uint64" }],
      ["uint96", { type: "uint96" }],
      ["uint112", { type: "uint112" }],
      ["uint160", { type: "uint160" }],
      ["uint192", { type: "uint192" }],
      ["uint256", { type: "uint256" }],
      // Named
      ["address owner", { type: "address", name: "owner" }],
      ["address to", { type: "address", name: "to" }],
      ["bool approved", { type: "bool", name: "approved" }],
      ["bytes _data", { type: "bytes", name: "_data" }],
      ["bytes data", { type: "bytes", name: "data" }],
      ["bytes signature", { type: "bytes", name: "signature" }],
      ["bytes32 hash", { type: "bytes32", name: "hash" }],
      ["bytes32 r", { type: "bytes32", name: "r" }],
      ["bytes32 root", { type: "bytes32", name: "root" }],
      ["bytes32 s", { type: "bytes32", name: "s" }],
      ["string name", { type: "string", name: "name" }],
      ["string symbol", { type: "string", name: "symbol" }],
      ["string tokenURI", { type: "string", name: "tokenURI" }],
      ["uint tokenId", { type: "uint256", name: "tokenId" }],
      ["uint8 v", { type: "uint8", name: "v" }],
      ["uint256 balance", { type: "uint256", name: "balance" }],
      ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
      ["uint256 value", { type: "uint256", name: "value" }],
      // Indexed
      [
        "event:address indexed from",
        { type: "address", name: "from", indexed: true }
      ],
      ["event:address indexed to", { type: "address", name: "to", indexed: true }],
      [
        "event:uint indexed tokenId",
        { type: "uint256", name: "tokenId", indexed: true }
      ],
      [
        "event:uint256 indexed tokenId",
        { type: "uint256", name: "tokenId", indexed: true }
      ]
    ]);
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/utils.js
function parseSignature(signature, structs = {}) {
  if (isFunctionSignature(signature))
    return parseFunctionSignature(signature, structs);
  if (isEventSignature(signature))
    return parseEventSignature(signature, structs);
  if (isErrorSignature(signature))
    return parseErrorSignature(signature, structs);
  if (isConstructorSignature(signature))
    return parseConstructorSignature(signature, structs);
  if (isFallbackSignature(signature))
    return parseFallbackSignature(signature);
  if (isReceiveSignature(signature))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new UnknownSignatureError({ signature });
}
function parseFunctionSignature(signature, structs = {}) {
  const match = execFunctionSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "function" });
  const inputParams = splitParameters(match.parameters);
  const inputs = [];
  const inputLength = inputParams.length;
  for (let i = 0; i < inputLength; i++) {
    inputs.push(parseAbiParameter(inputParams[i], {
      modifiers: functionModifiers,
      structs,
      type: "function"
    }));
  }
  const outputs = [];
  if (match.returns) {
    const outputParams = splitParameters(match.returns);
    const outputLength = outputParams.length;
    for (let i = 0; i < outputLength; i++) {
      outputs.push(parseAbiParameter(outputParams[i], {
        modifiers: functionModifiers,
        structs,
        type: "function"
      }));
    }
  }
  return {
    name: match.name,
    type: "function",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs,
    outputs
  };
}
function parseEventSignature(signature, structs = {}) {
  const match = execEventSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "event" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], {
      modifiers: eventModifiers,
      structs,
      type: "event"
    }));
  return { name: match.name, type: "event", inputs: abiParameters };
}
function parseErrorSignature(signature, structs = {}) {
  const match = execErrorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "error" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "error" }));
  return { name: match.name, type: "error", inputs: abiParameters };
}
function parseConstructorSignature(signature, structs = {}) {
  const match = execConstructorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "constructor" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs: abiParameters
  };
}
function parseFallbackSignature(signature) {
  const match = execFallbackSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: match.stateMutability ?? "nonpayable"
  };
}
function parseAbiParameter(param, options) {
  const parameterCacheKey = getParameterCacheKey(param, options?.type, options?.structs);
  if (parameterCache.has(parameterCacheKey))
    return parameterCache.get(parameterCacheKey);
  const isTuple = isTupleRegex.test(param);
  const match = execTyped(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
  if (!match)
    throw new InvalidParameterError({ param });
  if (match.name && isSolidityKeyword(match.name))
    throw new SolidityProtectedKeywordError({ param, name: match.name });
  const name = match.name ? { name: match.name } : {};
  const indexed = match.modifier === "indexed" ? { indexed: true } : {};
  const structs = options?.structs ?? {};
  let type;
  let components = {};
  if (isTuple) {
    type = "tuple";
    const params = splitParameters(match.type);
    const components_ = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      components_.push(parseAbiParameter(params[i], { structs }));
    }
    components = { components: components_ };
  } else if (match.type in structs) {
    type = "tuple";
    components = { components: structs[match.type] };
  } else if (dynamicIntegerRegex.test(match.type)) {
    type = `${match.type}256`;
  } else if (match.type === "address payable") {
    type = "address";
  } else {
    type = match.type;
    if (!(options?.type === "struct") && !isSolidityType(type))
      throw new UnknownSolidityTypeError({ type });
  }
  if (match.modifier) {
    if (!options?.modifiers?.has?.(match.modifier))
      throw new InvalidModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
    if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
      throw new InvalidFunctionModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
  }
  const abiParameter = {
    type: `${type}${match.array ?? ""}`,
    ...name,
    ...indexed,
    ...components
  };
  parameterCache.set(parameterCacheKey, abiParameter);
  return abiParameter;
}
function splitParameters(params, result = [], current = "", depth = 0) {
  const length = params.trim().length;
  for (let i = 0; i < length; i++) {
    const char = params[i];
    const tail = params.slice(i + 1);
    switch (char) {
      case ",":
        return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
      case "(":
        return splitParameters(tail, result, `${current}${char}`, depth + 1);
      case ")":
        return splitParameters(tail, result, `${current}${char}`, depth - 1);
      default:
        return splitParameters(tail, result, `${current}${char}`, depth);
    }
  }
  if (current === "")
    return result;
  if (depth !== 0)
    throw new InvalidParenthesisError({ current, depth });
  result.push(current.trim());
  return result;
}
function isSolidityType(type) {
  return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex.test(type) || integerRegex.test(type);
}
function isSolidityKeyword(name) {
  return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex.test(name) || integerRegex.test(name) || protectedKeywordsRegex.test(name);
}
function isValidDataLocation(type, isArray) {
  return isArray || type === "bytes" || type === "string" || type === "tuple";
}
var abiParameterWithoutTupleRegex, abiParameterWithTupleRegex, dynamicIntegerRegex, protectedKeywordsRegex;
var init_utils = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/utils.js"() {
    init_regex();
    init_abiItem();
    init_abiParameter();
    init_signature();
    init_splitParameters();
    init_cache();
    init_signatures();
    abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
    abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
    dynamicIntegerRegex = /^u?int$/;
    protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/structs.js
function parseStructs(signatures) {
  const shallowStructs = {};
  const signaturesLength = signatures.length;
  for (let i = 0; i < signaturesLength; i++) {
    const signature = signatures[i];
    if (!isStructSignature(signature))
      continue;
    const match = execStructSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "struct" });
    const properties = match.properties.split(";");
    const components = [];
    const propertiesLength = properties.length;
    for (let k = 0; k < propertiesLength; k++) {
      const property = properties[k];
      const trimmed = property.trim();
      if (!trimmed)
        continue;
      const abiParameter = parseAbiParameter(trimmed, {
        type: "struct"
      });
      components.push(abiParameter);
    }
    if (!components.length)
      throw new InvalidStructSignatureError({ signature });
    shallowStructs[match.name] = components;
  }
  const resolvedStructs = {};
  const entries = Object.entries(shallowStructs);
  const entriesLength = entries.length;
  for (let i = 0; i < entriesLength; i++) {
    const [name, parameters] = entries[i];
    resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
  }
  return resolvedStructs;
}
function resolveStructs(abiParameters = [], structs = {}, ancestors = /* @__PURE__ */ new Set()) {
  const components = [];
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    const isTuple = isTupleRegex.test(abiParameter.type);
    if (isTuple)
      components.push(abiParameter);
    else {
      const match = execTyped(typeWithoutTupleRegex, abiParameter.type);
      if (!match?.type)
        throw new InvalidAbiTypeParameterError({ abiParameter });
      const { array, type } = match;
      if (type in structs) {
        if (ancestors.has(type))
          throw new CircularReferenceError({ type });
        components.push({
          ...abiParameter,
          type: `tuple${array ?? ""}`,
          components: resolveStructs(structs[type], structs, /* @__PURE__ */ new Set([...ancestors, type]))
        });
      } else {
        if (isSolidityType(type))
          components.push(abiParameter);
        else
          throw new UnknownTypeError({ type });
      }
    }
  }
  return components;
}
var typeWithoutTupleRegex;
var init_structs = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/structs.js"() {
    init_regex();
    init_abiItem();
    init_abiParameter();
    init_signature();
    init_struct();
    init_signatures();
    init_utils();
    typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/parseAbi.js
function parseAbi(signatures) {
  const structs = parseStructs(signatures);
  const abi = [];
  const length = signatures.length;
  for (let i = 0; i < length; i++) {
    const signature = signatures[i];
    if (isStructSignature(signature))
      continue;
    abi.push(parseSignature(signature, structs));
  }
  return abi;
}
var init_parseAbi = __esm({
  "node_modules/abitype/dist/esm/human-readable/parseAbi.js"() {
    init_signatures();
    init_structs();
    init_utils();
  }
});

// node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js
function parseAbiParameters(params) {
  const abiParameters = [];
  if (typeof params === "string") {
    const parameters = splitParameters(params);
    const length = parameters.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(parseAbiParameter(parameters[i], { modifiers }));
    }
  } else {
    const structs = parseStructs(params);
    const length = params.length;
    for (let i = 0; i < length; i++) {
      const signature = params[i];
      if (isStructSignature(signature))
        continue;
      const parameters = splitParameters(signature);
      const length2 = parameters.length;
      for (let k = 0; k < length2; k++) {
        abiParameters.push(parseAbiParameter(parameters[k], { modifiers, structs }));
      }
    }
  }
  if (abiParameters.length === 0)
    throw new InvalidAbiParametersError({ params });
  return abiParameters;
}
var init_parseAbiParameters = __esm({
  "node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js"() {
    init_abiParameter();
    init_signatures();
    init_structs();
    init_utils();
    init_utils();
  }
});

// node_modules/abitype/dist/esm/exports/index.js
var init_exports = __esm({
  "node_modules/abitype/dist/esm/exports/index.js"() {
    init_parseAbi();
    init_parseAbiParameters();
  }
});

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { even = false, strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  if (even && value.length % 2 !== 0)
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm({
  "node_modules/viem/_esm/utils/data/isHex.js"() {
  }
});

// node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
var init_size = __esm({
  "node_modules/viem/_esm/utils/data/size.js"() {
    init_isHex();
  }
});

// node_modules/viem/_esm/errors/version.js
var version2;
var init_version2 = __esm({
  "node_modules/viem/_esm/errors/version.js"() {
    version2 = "2.57.20";
  }
});

// node_modules/viem/_esm/errors/base.js
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}
var errorConfig, BaseError2;
var init_base = __esm({
  "node_modules/viem/_esm/errors/base.js"() {
    init_version2();
    errorConfig = {
      getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
      version: `viem@${version2}`
    };
    BaseError2 = class _BaseError extends Error {
      constructor(shortMessage, args = {}) {
        const details = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.details;
          if (args.cause?.message)
            return args.cause.message;
          return args.details;
        })();
        const docsPath = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.docsPath || args.docsPath;
          return args.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath });
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args.metaMessages ? [...args.metaMessages, ""] : [],
          ...docsUrl ? [`Docs: ${docsUrl}`] : [],
          ...details ? [`Details: ${details}`] : [],
          ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
        ].join("\n");
        super(message, args.cause ? { cause: args.cause } : void 0);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "version", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "BaseError"
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.name = args.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = version2;
      }
      walk(fn) {
        return walk(this, fn);
      }
    };
  }
});

// node_modules/viem/_esm/errors/data.js
var SizeExceedsPaddingSizeError;
var init_data = __esm({
  "node_modules/viem/_esm/errors/data.js"() {
    init_base();
    SizeExceedsPaddingSizeError = class extends BaseError2 {
      constructor({ size: size2, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
var init_pad = __esm({
  "node_modules/viem/_esm/utils/data/pad.js"() {
    init_data();
  }
});

// node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError, SizeOverflowError;
var init_encoding = __esm({
  "node_modules/viem/_esm/errors/encoding.js"() {
    init_base();
    IntegerOutOfRangeError = class extends BaseError2 {
      constructor({ max: max2, min, signed, size: size2, value }) {
        super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max2 ? `(${min} to ${max2})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
      }
    };
    SizeOverflowError = class extends BaseError2 {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size2 }) {
  if (size(hexOrBytes) > size2)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size2
    });
}
var init_fromHex = __esm({
  "node_modules/viem/_esm/utils/encoding/fromHex.js"() {
    init_encoding();
    init_size();
  }
});

// node_modules/viem/_esm/utils/encoding/toHex.js
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}
var hexes, encoder;
var init_toHex = __esm({
  "node_modules/viem/_esm/utils/encoding/toHex.js"() {
    init_encoding();
    init_pad();
    init_fromHex();
    hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    encoder = /* @__PURE__ */ new TextEncoder();
  }
});

// node_modules/viem/_esm/utils/encoding/toBytes.js
function toBytes(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex, opts = {}) {
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hexString = hexString.padEnd(opts.size * 2, "0");
  }
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
var encoder2, charCodeMap;
var init_toBytes = __esm({
  "node_modules/viem/_esm/utils/encoding/toBytes.js"() {
    init_base();
    init_isHex();
    init_pad();
    init_fromHex();
    init_toHex();
    encoder2 = /* @__PURE__ */ new TextEncoder();
    charCodeMap = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
  }
});

// node_modules/@noble/hashes/esm/_u64.js
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
var init_u64 = __esm({
  "node_modules/@noble/hashes/esm/_u64.js"() {
    U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    _32n = /* @__PURE__ */ BigInt(32);
    rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
  }
});

// node_modules/@noble/hashes/esm/utils.js
function isBytes(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
var isLE, swap32IfBE, Hash;
var init_utils2 = __esm({
  "node_modules/@noble/hashes/esm/utils.js"() {
    isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    swap32IfBE = isLE ? (u) => u : byteSwap32;
    Hash = class {
    };
  }
});

// node_modules/@noble/hashes/esm/sha3.js
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
var _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_PI, SHA3_ROTL, _SHA3_IOTA, IOTAS, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, Keccak, gen, keccak_256;
var init_sha3 = __esm({
  "node_modules/@noble/hashes/esm/sha3.js"() {
    init_u64();
    init_utils2();
    _0n = BigInt(0);
    _1n = BigInt(1);
    _2n = BigInt(2);
    _7n = BigInt(7);
    _256n = BigInt(256);
    _0x71n = BigInt(113);
    SHA3_PI = [];
    SHA3_ROTL = [];
    _SHA3_IOTA = [];
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    IOTAS = split(_SHA3_IOTA, true);
    SHA3_IOTA_H = IOTAS[0];
    SHA3_IOTA_L = IOTAS[1];
    rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
    rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
    Keccak = class _Keccak extends Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        anumber(outputLen);
        if (!(0 < blockLen && blockLen < 200))
          throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200);
        this.state32 = u32(this.state);
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        swap32IfBE(this.state32);
        keccakP(this.state32, this.rounds);
        swap32IfBE(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        aexists(this);
        data = toBytes2(data);
        abytes(data);
        const { blockLen, state } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        aexists(this, false);
        abytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        anumber(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        aoutput(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        clean(this.state);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
    keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
  }
});

// node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
var init_keccak256 = __esm({
  "node_modules/viem/_esm/utils/hash/keccak256.js"() {
    init_sha3();
    init_isHex();
    init_toBytes();
    init_toHex();
  }
});

// node_modules/viem/_esm/utils/lru.js
var LruMap;
var init_lru = __esm({
  "node_modules/viem/_esm/utils/lru.js"() {
    LruMap = class extends Map {
      constructor(size2) {
        super();
        Object.defineProperty(this, "maxSize", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.maxSize = size2;
      }
      get(key) {
        const value = super.get(key);
        if (super.has(key)) {
          super.delete(key);
          super.set(key, value);
        }
        return value;
      }
      set(key, value) {
        if (super.has(key))
          super.delete(key);
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
          const firstKey = super.keys().next().value;
          if (firstKey !== void 0)
            super.delete(firstKey);
        }
        return this;
      }
    };
  }
});

// node_modules/viem/_esm/errors/address.js
var InvalidAddressError;
var init_address = __esm({
  "node_modules/viem/_esm/errors/address.js"() {
    init_base();
    InvalidAddressError = class extends BaseError2 {
      constructor({ address }) {
        super(`Address "${address}" is invalid.`, {
          metaMessages: [
            "- Address must be a hex value of 20 bytes (40 hex characters).",
            "- Address must match its checksum counterpart."
          ],
          name: "InvalidAddressError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/address/getAddress.js
function checksumAddress(address_, chainId) {
  const lower = address_.toLowerCase();
  const cacheKey = `${lower}.${chainId}`;
  const cached = checksumAddressCache.get(cacheKey);
  if (cached)
    return cached;
  const hexAddress = chainId ? `${chainId}${lower}` : lower.substring(2);
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(cacheKey, result);
  return result;
}
function getAddress(address, chainId) {
  if (!isAddress(address, { strict: false }))
    throw new InvalidAddressError({ address });
  return checksumAddress(address, chainId);
}
var checksumAddressCache;
var init_getAddress = __esm({
  "node_modules/viem/_esm/utils/address/getAddress.js"() {
    init_address();
    init_toBytes();
    init_keccak256();
    init_lru();
    init_isAddress();
    checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// node_modules/viem/_esm/utils/address/isAddress.js
function isAddress(address, options) {
  const { strict = true } = options ?? {};
  if (!addressRegex.test(address))
    return false;
  if (!strict || address.toLowerCase() === address)
    return true;
  let result = isAddressCache.get(address);
  if (result === void 0) {
    result = checksumAddress(address) === address;
    isAddressCache.set(address, result);
  }
  return result;
}
var addressRegex, isAddressCache;
var init_isAddress = __esm({
  "node_modules/viem/_esm/utils/address/isAddress.js"() {
    init_lru();
    init_getAddress();
    addressRegex = /^0x[a-fA-F0-9]{40}$/;
    isAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// node_modules/viem/_esm/utils/data/concat.js
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
var init_concat = __esm({
  "node_modules/viem/_esm/utils/data/concat.js"() {
  }
});

// node_modules/viem/_esm/index.js
var init_esm = __esm({
  "node_modules/viem/_esm/index.js"() {
    init_exports();
    init_getAddress();
    init_concat();
    init_toHex();
    init_keccak256();
  }
});

// node_modules/@ammora-protocol/math/dist/index.js
var Q64, Q128, Q642, Q96, Q1282, MAX_UINT160, MAX_UINT256;
var init_dist = __esm({
  "node_modules/@ammora-protocol/math/dist/index.js"() {
    Q64 = 1n << 64n;
    Q128 = 1n << 128n;
    Q642 = 1n << 64n;
    Q96 = 1n << 96n;
    Q1282 = 1n << 128n;
    MAX_UINT160 = (1n << 160n) - 1n;
    MAX_UINT256 = (1n << 256n) - 1n;
  }
});

// node_modules/@ammora-protocol/sdk/dist/index.js
function address4(value, field) {
  if (typeof value !== "string" || !ADDRESS.test(value) || value.toLowerCase() === ZERO || value.toLowerCase() === AMMORA_NATIVE_TOKEN.toLowerCase()) fail("AMMORA_PORTABLE_INVALID_PROFILE", `${field} must identify a non-native, nonzero contract`);
}
function decimals(value, field) {
  if (!Number.isInteger(value) || value < 0 || value > 77) {
    fail("AMMORA_PORTABLE_INCOMPATIBLE_DECIMALS", `${field} must be an integer in [0,77]`);
  }
}
function label(value, field) {
  if (typeof value !== "string" || value.length === 0 || value.length > 160 || /[\u0000-\u001f]/.test(value)) {
    fail("AMMORA_PORTABLE_INVALID_PROFILE", `${field} must be a nonempty bounded label`);
  }
}
function record2(value, field) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail("AMMORA_PORTABLE_INVALID_PROFILE", `${field} must be an object`);
}
function freeze2(value) {
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) freeze2(item);
    Object.freeze(value);
  }
  return value;
}
var ammoraContractErrorAbi, giwaSepoliaLegacyNativeCompatibility, collectDeploymentContractAddresses, uniqueDeploymentAddresses, assertRuntimePins, assertExplorerVerification, deepFreeze, defineAmmoraDeployment, createAmmoraDeploymentCatalog, giwaSepoliaVNext, giwaSepoliaMerged, giwaSepoliaAudited, giwaSepoliaSealed, giwaSepoliaVaults, giwaSepoliaPermissionless, ammoraDeployments, ZERO_HASH, dammV2FactoryProfiles, COMMON_ACTIVE_ROLES, V1_ACTIVE_ROLES, V2_ACTIVE_ROLES, AMMORA_FEE_POLICY_VERSION, AMMORA_PROTOCOL_TRADING_FEE_SHARE_BPS, AMMORA_REFERRAL_SHARE_OF_PROTOCOL_BPS, AMMORA_PROTOCOL_LIQUIDITY_MIGRATION_FEE_BPS, BPS, requireShare, requireAmount, previewAmmoraLaunchFeeDistribution, ZERO_HASH2, Q1283, DBC_AUTHORIZED_FIRST_BUY_MAGIC, UINT40_MAX, UINT32_MAX, UINT16_MAX, UINT128_MAX, UINT256_MAX, DAMM_V2_DEAD_LIQUIDITY, rolesAbi, MAX_REWARD_DURATION, MAX_MARKET_SYNC_WINDOW, MAX_MARKET_SYNC_COOLDOWN, UINT256_MAX2, UINT64_MAX, UINT64_MAX2, UINT128_MAX2, UINT256_MAX3, MAX_RATE_LIMITER_DURATION, MAX_VESTING_DURATION, DEFAULT_DEADLINE_SECONDS, MAX_DEADLINE_SECONDS, AMMORA_NATIVE_TOKEN, AMMORA_PROTOCOL_ROUTE_MODELS, AMMORA_VENUE_ROUTE_MODEL_PREFIX, VENUE_ROUTE_MODEL_SLUG, isAmmoraExternalVenueRouteModel, VenueKind, AMMORA_VENUE_SPEC_VERSION, ADDRESS_PATTERN, IDENTIFIER_PATTERN, AMMORA_VENUE_EXECUTION_REGISTRY, AMMORA_DEFAULT_VENUE_VALUATION, AMMORA_PROTOCOL_AUTHENTICATED_VALUATION, AMMORA_VENUE_QUOTE_ASSET_FIXTURE_FLOOR_UNITS, ammoraVenueQuoteAssetFixtureFloor, assertAmmoraVenueValuation, requireRole, addressGetterAbis, ammoraVenueAddressGetterAbi, defineAmmoraVenueDescriptor, AMMORA_UNISWAP_V4_VENUE_ID, uniswapV4Descriptors, ammoraUniswapV4VenueDescriptor, ammoraRouteDeploymentVenues, ADDRESS_PATTERN2, HASH_PATTERN2, minimalProxyRuntimeCodeHash, deepFreeze3, requireAddress2, assertVenueValuationFitsEnvironment, defineAmmoraRouteDeployment, runtimePin, routeDeploymentFromCore, aggregationCoreTrustAddresses, venueTrustAddresses, aggregationVenueTrustAddresses, aggregationTrustAddresses, createAmmoraRouteDeploymentCatalog, giwaSepoliaRouteRuntimeCodeHashes, ammoraRouteDeployments, UNISWAP_V4_MAX_EXACT_IN, bindingsAbi, poolTokensAbi, poolAbi, adapterAbi, lensAbi, DEADLINE_SECONDS, AMMORA_DEFAULT_BLOCK_TIME_SECONDS, DEFAULT_RISK_POLICY, RISK_POLICY_FIELDS, MAXIMUM_NEW_POOL_WINDOW_SECONDS, MAXIMUM_MINIMUM_LIQUIDITY_USD_X18, giwaSepoliaAutoRouteAddresses, giwaSepoliaUniswapV4Venue, giwaSepoliaUniswapV4VenueRuntimeHashes, giwaSepoliaAutoRouteRuntimeHashes, a, hashes, routeHashes, pin, giwaSepoliaAutoRouteDeployment, giwaSepoliaAutoRoute, giwaSepoliaAutoRouteCatalog, giwaSepoliaAutoRouteDeploymentCatalog, giwaSepoliaAutoRoutePoolProfiles, commitmentTypes, AmmoraPortableError, UINT256_MAX4, ADDRESS, HASH, ZERO, fail, defineAmmoraNativeAssetModel, contractAddresses, defineAmmoraPortableDeployment, UINT256_MAX5, UINT256_MAX6, UINT256_MAX7, UINT256_MAX8, CONTEXT_TYPEHASH, UINT128_MAX3, UINT256_MAX9, PROTOCOL_LIQUIDITY_MIGRATION_FEE_BPS, TAMM_TOKEN_DECIMALS, TAMM_TOTAL_SUPPLY_RAW, TAMM_SALE_ALLOCATION_RAW, TAMM_MIGRATION_BASE_BUDGET_RAW, UINT64, UINT128, UINT256, MAX_LAUNCH_VESTING_SECONDS, giwaSepoliaTokenLockDeployment, giwaSepoliaAtomicLaunchDeployment, giwaSepoliaAtomicLaunchTargets, AMMORA_ARC_TESTNET, PARTNER_GRADUATION_VERSION, arlV5FactoryAbi, arlV5FeeControllerAbi, ARL_V5_VERSION, creationOutput, policyTuple, feeTuple, stateTuple, patchTuple, max, almmFeeClaimRoutingAbi, rolesAbi2, ARLORA_LEGACY_LOCKER_MAX_ESCROW_DURATION_SECONDS, ARLORA_PROTOCOL_FEE_ALL_PERMISSIONS, ARLORA_LAUNCH_DISCOVERY_TAGS, UINT40_MAX3, UINT128_MAX4, UINT256_MAX10, ZERO_BYTES32, DBC_AUTHORIZED_FIRST_BUY_MAGIC2, DBC_MAX_VESTING_DURATION_SECONDS, ALMM_MARKET_SYNC_MAX_TWAP_WINDOW, ALMM_MARKET_SYNC_MAX_COOLDOWN, Q1285, ARLORA_STAKE2EARN_Q128, ARLORA_STAKE2EARN_V2_MIN_DURATION, ARLORA_STAKE2EARN_V2_MAX_DURATION, ARLORA_STAKE2EARN_V2_MIN_POOL_CLAIM_INTERVAL;
var init_dist2 = __esm({
  "node_modules/@ammora-protocol/sdk/dist/index.js"() {
    init_esm();
    init_dist();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    ammoraContractErrorAbi = [
      ...[
        "Unauthorized",
        "AlreadyInitialized",
        "InvalidConfiguration",
        "InvalidState",
        "InvalidAmount",
        "InvalidProof",
        "CapExceeded",
        "InexactTransfer",
        "Reentrancy",
        "NothingToClaim",
        "DeadlineExpired",
        "SlippageExceeded",
        "InvalidToken",
        "Overflow",
        "PositionIsLocked",
        "InvalidRecipient",
        "PoolNotActive",
        "InvalidPermission",
        "InvalidReward",
        "UnsupportedToken",
        "InvalidPool",
        "InsufficientCredit",
        "InvalidMulticall",
        "InsufficientUnlockedLiquidity",
        "InvalidVesting",
        "PoolExists",
        "InvalidAmounts",
        "TradingInactive",
        "MigrationNotReady",
        "PartialFillRequired",
        "ZeroAmount",
        "AmountTooLarge",
        "InvalidCurve",
        "PriceOutsideCurve",
        "ExactOutputNotFilled",
        "InvalidLiquidity",
        "InvalidPrice",
        "InvalidReserves",
        "InsufficientLiquidity",
        "PriceRangeViolation",
        "InvalidPriceOrLiquidity",
        "PriceOverflow",
        "CustodyDeficit",
        "TransferFailed",
        "TransferFromFailed",
        "ApproveFailed",
        "SyncUnavailable",
        "DeviationExceeded",
        "LiquidityPathBlocked",
        "CooldownActive",
        "InvalidSource",
        "RouteUnavailable",
        "AmountLimitExceeded",
        "OracleUnavailable",
        "InvalidSettlement"
      ].map((name) => ({ type: "error", name, inputs: [] })),
      { type: "error", name: "PositionLocked", inputs: [{ name: "releasePoint", type: "uint64" }] },
      {
        type: "error",
        name: "TokenBalanceQueryFailed",
        inputs: [{ name: "token", type: "address" }, { name: "account", type: "address" }]
      },
      {
        type: "error",
        name: "TokenTransferCallFailed",
        inputs: [
          { name: "token", type: "address" },
          { name: "from", type: "address" },
          { name: "to", type: "address" }
        ]
      },
      {
        type: "error",
        name: "TokenBalanceDeltaMismatch",
        inputs: [
          { name: "token", type: "address" },
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "expected", type: "uint256" },
          { name: "senderDebit", type: "uint256" },
          { name: "recipientCredit", type: "uint256" }
        ]
      }
    ];
    giwaSepoliaLegacyNativeCompatibility = Object.freeze({
      deployedAtBlock: 36799471n,
      executionRegistry: "0x46F511De2A1B229f8e6E39E5C918aFA119bb8259",
      nativeRouter: "0xb325f2f674B10F596E0AefEC51c6394BF1190a45",
      executionRegistryRuntimeCodeHash: "0x1ec00147713743740d45896697607c3ad7c1bfe83a2b1303308fce4303936449",
      nativeRouterRuntimeCodeHash: "0x43e229ddfffe23fc8e4a7e5e25c938d98d21ac0014e995f97600489ebe5daaee"
    });
    collectDeploymentContractAddresses = (value) => {
      if (typeof value === "string" && /^0x[0-9a-fA-F]{40}$/.test(value)) {
        return [value];
      }
      if (!value || typeof value !== "object") return [];
      return Object.values(value).flatMap(collectDeploymentContractAddresses);
    };
    uniqueDeploymentAddresses = (deployment) => [
      ...new Map(
        collectDeploymentContractAddresses(deployment.contracts).map((address10) => [address10.toLowerCase(), address10])
      ).values()
    ];
    assertRuntimePins = (deployment) => {
      const pins = deployment.security?.runtimeCodeHashes;
      if (!pins) {
        if (deployment.environment === "mainnet") {
          throw new Error("mainnet deployment must pin every runtime code hash");
        }
        return;
      }
      const normalizedPins = new Map(
        Object.entries(pins).map(([address10, hash3]) => [address10.toLowerCase(), hash3])
      );
      for (const address10 of uniqueDeploymentAddresses(deployment)) {
        const hash3 = normalizedPins.get(address10.toLowerCase());
        if (!hash3 || !/^0x[0-9a-fA-F]{64}$/.test(hash3)) {
          throw new Error(`deployment runtime hash is missing for ${address10}`);
        }
      }
      const known = new Set(
        uniqueDeploymentAddresses(deployment).map((address10) => address10.toLowerCase())
      );
      for (const address10 of normalizedPins.keys()) {
        if (!known.has(address10)) {
          throw new Error(`deployment runtime hash contains unknown address ${address10}`);
        }
      }
    };
    assertExplorerVerification = (deployment) => {
      const verification = deployment.explorerVerification;
      if (!verification) return;
      if (verification.factory.toLowerCase() !== deployment.contracts.launch.factory.toLowerCase() || verification.registry.toLowerCase() !== deployment.contracts.launch.configRegistry.toLowerCase() || verification.protocolVersion !== deployment.contracts.launch.protocolVersion || verification.sourceCommit !== deployment.sourceCommit) {
        throw new Error("Explorer verification metadata does not match the launch deployment");
      }
      let url;
      try {
        url = new URL(verification.verificationManifestUrl);
      } catch {
        throw new Error("verification manifest URL must be an absolute HTTPS URL");
      }
      if (url.protocol !== "https:") {
        throw new Error("verification manifest URL must be an absolute HTTPS URL");
      }
    };
    deepFreeze = (value) => {
      if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
      for (const nested of Object.values(value)) deepFreeze(nested);
      return Object.freeze(value);
    };
    defineAmmoraDeployment = (deployment) => {
      if (!Number.isSafeInteger(deployment.chain.id) || deployment.chain.id <= 0) {
        throw new Error("deployment chain ID must be a positive safe integer");
      }
      if (deployment.startBlock < 0n) {
        throw new Error("deployment start block must be non-negative");
      }
      if (deployment.chain.rpcUrls.length === 0) {
        throw new Error("deployment must contain a public RPC fallback");
      }
      if (deployment.contracts.launch.protocolVersion === 4 && deployment.contracts.launch.feePolicy === null) {
        throw new Error("Ammora V4 deployment must identify its immutable fee policy");
      }
      if (deployment.contracts.launch.protocolVersion === 3 && deployment.contracts.launch.feePolicy !== null) {
        throw new Error("Ammora V3 deployment must not claim a V4 fee policy");
      }
      assertExplorerVerification(deployment);
      assertRuntimePins(deployment);
      return deepFreeze(deployment);
    };
    createAmmoraDeploymentCatalog = (deployments) => {
      const catalog = {};
      for (const deployment of deployments) {
        const reviewed2 = defineAmmoraDeployment(deployment);
        if (catalog[reviewed2.chain.id]) {
          throw new Error(`duplicate deployment chain ID ${reviewed2.chain.id}`);
        }
        catalog[reviewed2.chain.id] = reviewed2;
      }
      return Object.freeze(catalog);
    };
    giwaSepoliaVNext = defineAmmoraDeployment({
      environment: "testnet",
      slot: "vnext",
      sourceCommit: "f156655e92e73173fbc4ffae3c8b8c9ac571645e",
      startBlock: 31903962n,
      chain: {
        id: 91342,
        name: "GIWA Sepolia",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://sepolia-rpc.giwa.io"],
        blockExplorerUrl: "https://sepolia-explorer.giwa.io"
      },
      contracts: {
        launch: {
          protocolVersion: 3,
          feePolicy: null,
          factory: "0x79f5525fdc6b5d433da016d145bfbb0997161c22",
          firstBuyExecutor: "0x59503240457cc75d39b7f3e4473d348b3c6f9c26",
          configRegistry: "0x858f45a14f88e5507668416e8ad80bd30eb57772",
          mathModule: "0x22a3180c6f5f9bb9777d8b05a7b6bdfbe45a43aa",
          metadataRegistry: "0x046f2a63f74bb93e565de50961917ee4394a6a6f",
          graduationAdapter: "0x6339cdd25741dc5b5885d5407a5669432e4df80c",
          concentratedFactory: "0xb2ddabe31dc4984c4e20450854102bbf9e513cc2",
          concentratedPositionManager: "0x03cde8ebce4ea612b12b761e242de7db4db6d4b9",
          concentratedFeeController: "0x6f40bea7265ecf99be9c970f8485c073d5cdd956",
          compoundingFactory: "0x3f5d94698dbc613918bf8ecf4adb5a142c60712d",
          compoundingFeeController: "0x1bbb58b0111442681c2bd7b55d59034638612758"
        },
        liquidityMarketMaker: {
          deployer: "0x95b437d149731c0a9baff5f77749fbb4e07af45d",
          factory: "0x0411f703b17d9cd22406b2fdce5b7661f8684f8d",
          positionManager: "0xf92e3a06f7a4319650c4268bb758fe3541a458e5",
          binLens: "0x4b846299cb9236a41e0c81ad84efd15695658fca",
          limitOrderManager: "0xef80618d892a303552ace9a793f4325e7899e344",
          zapRouter: "0x9c783b279841481b26b4626535f5196efe3d8e4a",
          rewardManager: "0x790690a205d00c656937ef353c569a623d6f86ec",
          oracle: "0x8299545881abc235f7910adc471691b1a83ac6d8",
          marketSyncController: "0x4391c1b28056fe1b166cc0385c057068b5b93d07"
        },
        feeSharing: {
          factory: "0xd624dcfa2e4219563f40d7feef368a4cd40fcbfe"
        },
        policy: {
          tokenPolicyRegistry: "0x83444bc3bfb011962b8c530d4b9cfb2fbd1084fb"
        },
        routers: {
          executionRegistry: "0x19cf5fcb19426fbb2b7b2ff745bb2a5829cc0919",
          native: "0xa3cf8c9f7dc804a4675f98ddc41df1836833f391",
          permit: "0x36776f1bc3d7afd7ce2b4174bd6723eef7a998bd",
          zap: "0x24df2f159e49865ae1f0e3def1b0836fb96339b6",
          permit2: "0x000000000022d473030f116ddee9f6b43ac78ba3"
        },
        tokens: {
          wrappedNative: "0x4200000000000000000000000000000000000006"
        }
      }
    });
    giwaSepoliaMerged = defineAmmoraDeployment({
      environment: "testnet",
      slot: "merged",
      sourceCommit: "9ed0def2428cdd4482a2c62e1b6c9f340c132609",
      startBlock: 32388744n,
      chain: {
        id: 91342,
        name: "GIWA Sepolia",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://sepolia-rpc.giwa.io"],
        blockExplorerUrl: "https://sepolia-explorer.giwa.io"
      },
      contracts: {
        launch: {
          protocolVersion: 3,
          feePolicy: null,
          factory: "0x1b8210f2f54c2fd6394eb7c1cf1ca7617a71b3bd",
          firstBuyExecutor: "0xbdfd212ae3db67dfc5859c12afed6a419d3047c5",
          configRegistry: "0xfb1016b126282cec9e7d6670189c20917faeb724",
          mathModule: "0x31f28e014761bad6bc71939a4b4c10f3aba312eb",
          metadataRegistry: "0x91335eff897f10ca770c4f7c57f30d3daf7618b5",
          graduationAdapter: "0xa014b8255ba231341ac68e3b36eb0a08cf292a2f",
          concentratedFactory: "0x2b038dcaa0feee1787bd20edee70335799dc7f92",
          concentratedPositionManager: "0x74837f2b84fef78acd98dbcaa169ee8082d241d5",
          concentratedFeeController: "0xb3c89398284be449fb2001c0dae8369501bcf719",
          compoundingFactory: "0xc7dec835bc52089313d289960613e43005700005",
          compoundingFeeController: "0x65344d5d2a3f358519ff62f8563bb23dfbcd44a7"
        },
        liquidityMarketMaker: {
          deployer: "0x48655716938ff7d89e81a8ed644a88263685e74c",
          factory: "0x6ce8f7c34038186b57bc516296f7ec6e90f0c9c9",
          positionManager: "0x217c8431d3146680b7586c2e76744a46eafe3554",
          binLens: "0x5b61e29561685a2aed5feb3fa2029ed741482b0d",
          limitOrderManager: "0x58f15210514169a274a53821d4d4aa2d0e42db2c",
          zapRouter: "0x2a39b3b935e59fe5a6d512e3497bd8cc9efad3a1",
          rewardManager: "0xe340d77512bb14780156223b3e6f7c530a2763b1",
          oracle: "0x1746a1878c2ff4700278aca4dfc4b57eeb6feea9",
          marketSyncController: "0x9b1768d97356bdc0828b66b587bfae77200e5d68"
        },
        feeSharing: {
          factory: "0x20369b0d76d90538c8619c6557c0c9a70ff02ff2"
        },
        policy: {
          tokenPolicyRegistry: "0x31fecf7782952d8aafa44967b804f0bdadaf1599"
        },
        routers: {
          executionRegistry: "0x39d8353d39ba882960821a23aea7eb91ffab41bd",
          native: "0x31aae6c2325806617dbd5f03e4e26421f0ccf227",
          permit: "0x5324a16f4d0982730d91c036d63dbefe9055dd5d",
          zap: "0x051821edd18cd278c239bb47ae920fe734139710",
          permit2: "0x000000000022d473030f116ddee9f6b43ac78ba3"
        },
        tokens: {
          wrappedNative: "0x4200000000000000000000000000000000000006"
        }
      }
    });
    giwaSepoliaAudited = defineAmmoraDeployment({
      environment: "testnet",
      slot: "audited",
      sourceCommit: "8a432b64fcc4f1bdb4a215a32399f2e8d4432ca5",
      startBlock: 32398622n,
      chain: {
        id: 91342,
        name: "GIWA Sepolia",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://sepolia-rpc.giwa.io"],
        blockExplorerUrl: "https://sepolia-explorer.giwa.io"
      },
      contracts: {
        launch: {
          protocolVersion: 3,
          feePolicy: null,
          factory: "0xafb0b870d718f656cadd2bea721b9736d9064c9a",
          firstBuyExecutor: "0xb64ec96bcb75f9e4f391437993b42338c4559e52",
          configRegistry: "0x8bd344d6c2ac01cbd5166c022f13895ab0b69d17",
          mathModule: "0x1c15f161db071409dee858ed032e046c57992bef",
          metadataRegistry: "0xe87974f30422d29d2caab2bfc1777ab6d7693c23",
          graduationAdapter: "0x86a0d370985649fa37de5d15f520d8286a475a68",
          concentratedFactory: "0x88ac3c2981f053ba82db1f93ccc156a16cc792db",
          concentratedPositionManager: "0x78e3bef38d7a792538d57d0cb26228321abb81cd",
          concentratedFeeController: "0xf149048c52cdbcd418f3033bf2b87effa4a132a0",
          compoundingFactory: "0xcb65cfae3c4b61c4cc6f7c71e236540ad30205d5",
          compoundingFeeController: "0x95ed1a6e13d867e7e80db128bf9d6ae99f4e8554"
        },
        liquidityMarketMaker: {
          deployer: "0xe917580c934d12fd2b67b60702a06b9e4f30dd80",
          factory: "0x92982ccfbbe91754a1eb64e20cf7d401e7989709",
          positionManager: "0x825e4168bc8ef2e0baac505842747cdf8df6579a",
          binLens: "0xb6e31310ff2fb946c6148d5c6025ceba5e777df9",
          limitOrderManager: "0x8ac8939a550bfb20186ece2cbbccb92d1e4053f6",
          zapRouter: "0x7428a3e0cae3401db898235396a2715f6039ec88",
          rewardManager: "0xe65d1e37a318d975264c31660f7284505e5a3871",
          oracle: "0xd98a1559ab323240fb1f0ac0fa92322ef39c2c8b",
          marketSyncController: "0xd7329b470c6def799bc76cd9ac56b68f9c2587bf"
        },
        feeSharing: {
          factory: "0x4af530d3599ecd7959bf2749a5674e001d18fe88"
        },
        policy: {
          tokenPolicyRegistry: "0x6738338d6863585854770633f3f6068e7a083ffc"
        },
        routers: {
          executionRegistry: "0xf2094fba74e1857a339090ab8687abdcf6487b21",
          native: "0xb003fc924c530b1ed7d54bd984d5c9d1606d9658",
          permit: "0x638ca9c8047d93b3bea9ec255a8532ad2b3f6fac",
          zap: "0x00ba7527701ef666ad28540bce7221781964afc4",
          permit2: "0x000000000022d473030f116ddee9f6b43ac78ba3"
        },
        tokens: {
          wrappedNative: "0x4200000000000000000000000000000000000006"
        }
      }
    });
    giwaSepoliaSealed = defineAmmoraDeployment({
      environment: "testnet",
      slot: "sealed",
      sourceCommit: "ee3d752156235fcec55ca7b253dfb112830ab1de",
      startBlock: 32472683n,
      chain: {
        id: 91342,
        name: "GIWA Sepolia",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://sepolia-rpc.giwa.io"],
        blockExplorerUrl: "https://sepolia-explorer.giwa.io"
      },
      contracts: {
        launch: {
          protocolVersion: 3,
          feePolicy: null,
          factory: "0x42acd2531e47ea789c03915c9de195bf6250c0a2",
          firstBuyExecutor: "0x253d6a175426f50879a4f9eb6947ecddc8328cc8",
          configRegistry: "0x068d624653fe9a6b1e428fee5058aaec93c0d231",
          mathModule: "0xb2fe6d1579e8cadbbaa0369974c9eef2f9bd7aa9",
          metadataRegistry: "0xb3a6fb7f4d0fefa01c9054af4adcdec65a0794ae",
          graduationAdapter: "0xcc909073b4fe45a5141e05e005ca261bdc2464f8",
          concentratedFactory: "0xc42733b043f1f132615f3be4d3ac20d1d4fb0d51",
          concentratedPositionManager: "0x9c1a0b9a90db6c9e7a4ae8d19a074f6340bc9119",
          concentratedFeeController: "0x7d5650788fb56b83081f327b5bdbfa920d8be035",
          compoundingFactory: "0xfc81511ce9f697afcee2dfaa67d2c1e7d3ebed3b",
          compoundingFeeController: "0xf49186f525ee272d2ea0f8907b4f139cb91f1385"
        },
        liquidityMarketMaker: {
          deployer: "0x7f8736f46c8fd39528493a498ac7e6f292c4de21",
          factory: "0x0364c663c6515c1607ad18627df9cae36e22b740",
          positionManager: "0x02868c51214bae02f74da01078ac864df9009f80",
          binLens: "0x8855f49ef3ce0b65ed4334b912deb66c0f51042b",
          limitOrderManager: "0x5b80e266abd801772dc820546e79a4c3c9ffa81a",
          zapRouter: "0x12522794c41111845751b1f0d54795581803e0f2",
          rewardManager: "0x5366a15a153644646fbeb0584712355dd43f7729",
          oracle: "0x568176e7f64202b86aed8e60f8edd90dd3cf9c77",
          marketSyncController: "0x95d025b18c7f8788eca722175e7887c95e8cec63"
        },
        feeSharing: {
          factory: "0x2b4b0f2a09a70a4ad7c6a1bbfcde43d20872ed97"
        },
        policy: {
          tokenPolicyRegistry: "0x9a35ee560507b0d627697c1256dcca8c7957343c"
        },
        routers: {
          executionRegistry: "0x097df3c402ba9b1daeb57814f4c099a08c082119",
          native: "0x5a5b768b249e2f72084ac4d64b3b50a50257ab7c",
          permit: "0x885939fbfc0ee30c9f35e76f0d6bb20ce18958c3",
          zap: "0xacae22cfd287c2ae02a6e1a1272ee9af002950da",
          permit2: "0x000000000022d473030f116ddee9f6b43ac78ba3"
        },
        tokens: {
          wrappedNative: "0x4200000000000000000000000000000000000006"
        }
      }
    });
    giwaSepoliaVaults = defineAmmoraDeployment({
      environment: "testnet",
      slot: "vaults",
      sourceCommit: "cd844972bd273a63bf02a59c8b880d3b42803626",
      startBlock: 32500768n,
      chain: {
        id: 91342,
        name: "GIWA Sepolia",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://sepolia-rpc.giwa.io"],
        blockExplorerUrl: "https://sepolia-explorer.giwa.io"
      },
      contracts: {
        launch: {
          protocolVersion: 3,
          feePolicy: null,
          factory: "0x3203801200503c78e5ee0b81696818bd1b5649bb",
          firstBuyExecutor: "0x188dec187269e97a4e1b9137a36d02259539dc0c",
          configRegistry: "0x67aebead92ea0557bb699d015bafb4044efad8d2",
          mathModule: "0x955847d6c229d34b181237e2c20a769d76b8be8d",
          metadataRegistry: "0x04667030cd17bb7d6ef3e66c634b102598c9fbb7",
          graduationAdapter: "0x4edb43447bea00af6171f58207e8bf54ff7d7a15",
          concentratedFactory: "0x1125b95da09d04f78efd5ec2ec990366bda03df9",
          concentratedPositionManager: "0xe894bcdd0a8d2c6faa3e2dfeeb998e24ac941245",
          concentratedFeeController: "0x80e8172146dc3e8396cb64441b6c46d7c2234fa4",
          compoundingFactory: "0x91f3c5b181a76d87b5c0e90c75f229e9c2873de3",
          compoundingFeeController: "0xfcb33723c25e447d2749c3a4e89f4f0820637d25"
        },
        liquidityMarketMaker: {
          deployer: "0x69ea2868e78742ee3dfbe92dd49362f171724cd6",
          factory: "0xd6d5b1a49100fbda757f6502e48cd4e05fea4d16",
          positionManager: "0xdeff59a7c041446bcf1524fd1b66e2c81823d243",
          binLens: "0xb579358950c7faa6bc7f9f8255c4f748795a859a",
          limitOrderManager: "0xe6b1f16dc36394193f7e8d081747a4b681364a68",
          zapRouter: "0xe0dfd04a65d98361c0e9e6413ad10c3cb7819e32",
          rewardManager: "0x81ab50a88c88de4067d4a24b17f7214732ee7bf9",
          oracle: "0x5439b584140c8019a3dd3dcdda8ed21d603f6173",
          marketSyncController: "0x05458e1893f6604efce071c68a0c4f5f410f6277"
        },
        feeSharing: {
          factory: "0x6eb2b96270001fb6a82cec6c2542cda1039c1d28"
        },
        policy: {
          tokenPolicyRegistry: "0x0f2bf040e8e96c2268897e5f565f0c457e572d57"
        },
        routers: {
          executionRegistry: "0x40b0bb7408e325e96b437c479cab3dc2beee487b",
          native: "0x8db6c3165768d4f194f05405f6ade223b58e3277",
          permit: "0x0dd1be4ef02ff17e24a0cddffafd8e2a01784225",
          zap: "0x03079782db87496c1162bc1be5d752d756b6c0ef",
          permit2: "0x000000000022d473030f116ddee9f6b43ac78ba3"
        },
        vaults: {
          genesisFactory: "0xdb6e46bb0239d7278ec17b4726e7a489512ee3ed",
          yieldFactory: "0xc8258f18909a8ee5f184a4c2ea79d4a8430d1fd1"
        },
        tokens: {
          wrappedNative: "0x4200000000000000000000000000000000000006"
        }
      }
    });
    giwaSepoliaPermissionless = defineAmmoraDeployment({
      environment: "testnet",
      slot: "permissionless",
      sourceCommit: "bde6a1e15916333d371c0afe5c90a061e8aa5709",
      explorerVerification: {
        factory: "0x1a30507113c5f3bc1b0d740b69548b499ebf83cf",
        tokenImplementation: "0x076b0e8338454f4d8b5a7ce03522c8aa6757cd86",
        curveImplementation: "0x1476aa81d21a475274436806b4cea8fe476e1363",
        registry: "0xd7e454ff6232158162b9a2fc498dda2c8d76abf9",
        protocolVersion: 4,
        sourceCommit: "bde6a1e15916333d371c0afe5c90a061e8aa5709",
        verificationManifestUrl: "https://ammora-docs.vercel.app/deployments/giwa-sepolia-v4/verification-manifest.json",
        explorerVerificationStatus: "verified"
      },
      startBlock: 33189035n,
      chain: {
        id: 91342,
        name: "GIWA Sepolia",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://sepolia-rpc.giwa.io"],
        blockExplorerUrl: "https://sepolia-explorer.giwa.io"
      },
      contracts: {
        launch: {
          protocolVersion: 4,
          feePolicy: "0xffab5d41c63fa83aa01b33059c325a7137adf9a0",
          factory: "0x1a30507113c5f3bc1b0d740b69548b499ebf83cf",
          firstBuyExecutor: null,
          configRegistry: "0xd7e454ff6232158162b9a2fc498dda2c8d76abf9",
          mathModule: "0x88997690a5393b54b1b5e4f39288274d2decaead",
          metadataRegistry: null,
          graduationAdapter: "0xf7880b7430a7a3b41329f9b716c766fd3ff6fee3",
          concentratedFactory: "0x038170a4dd4bb9a01ccf3bfee817f092c8d50321",
          concentratedPositionManager: "0xd0551711b193fa1423fcd3f9b95354ccf4f18c81",
          concentratedFeeController: "0x13fef62e9ce0212d3d4bba9de074c50a8c4ceadb",
          compoundingFactory: "0x40d2219a3ecf2bc07e4729b5773f0443670ff6c7",
          compoundingFeeController: "0x6b181b0f7d41d4487cd71f99983d945048c6182a"
        },
        liquidityMarketMaker: {
          deployer: "0x8274c961bd026c35c83b6f88a545729a4d4b13e9",
          factory: "0x63c9f1cab865d708a49df5304b59e91474860bde",
          positionManager: "0xcde333bfa48ba90e6a6db75775488ac34d03e2c8",
          binLens: "0x2e6db44c2743666c858e87f15649354f394cc082",
          limitOrderManager: "0xd2958beac2db8e384a35e79aa96c446c6e811829",
          zapRouter: "0x76f82067d9c4b0a5a56a53f821e4b3bccf67a9bc",
          rewardManager: "0x94b3c9aa27c076607bc36211083d943173725ae6",
          oracle: "0x65933a1b181840bb2d4b1a64624cedce2e7ebb83",
          marketSyncController: "0xdf040d925dc2abaf02dc3ed3d669e75f9ca0a3dc"
        },
        feeSharing: {
          factory: "0xb6131d1f86321c3de61f0e92fe136fa82e078927"
        },
        policy: {
          tokenPolicyRegistry: "0xc9ca24791b0fe146c02299261a55220e4213645f"
        },
        routers: {
          executionRegistry: giwaSepoliaLegacyNativeCompatibility.executionRegistry,
          native: giwaSepoliaLegacyNativeCompatibility.nativeRouter,
          permit: "0xd0396d6c5ff4d1238c937b084cd9a3632374cc64",
          zap: "0x6b14a4445b3de107844ffa81f033733f045ef1d0",
          permit2: "0x000000000022d473030f116ddee9f6b43ac78ba3"
        },
        vaults: {
          genesisFactory: "0xb268bf745d803800a3a31b331cad0547157c1e40",
          yieldFactory: "0x9f37ab9afba33ca28ea28327f0946343ee301c7f"
        },
        tokens: {
          wrappedNative: "0x4200000000000000000000000000000000000006"
        }
      }
    });
    ammoraDeployments = createAmmoraDeploymentCatalog([
      // One deployment per chain: the catalog is what an address resolves through, and two
      // answers for one chain is not a catalog. Earlier slots stay exported so a caller can
      // name one deliberately, which is the only way to reach them now.
      //
      // Omitted-source connected clients retain the frozen sealed generation. Newer named
      // catalogs, including `permissionless`, remain available only through deliberate
      // application selection; the reviewed PR4 profile is supplied through deploymentSource.
      giwaSepoliaSealed
    ]);
    ZERO_HASH = `0x${"00".repeat(32)}`;
    dammV2FactoryProfiles = Object.freeze([
      {
        chainId: 91342,
        factory: "0x038170a4dd4bb9a01ccf3bfee817f092c8d50321",
        factoryRuntimeCodeHash: "0x7161642d426afaa84e0ebd062717d9945e548dbd058d5795f1d3c0cdd957de39",
        implementation: "0x815bbca92eb069fff4520e6e49a839f5ef5134b4",
        implementationRuntimeCodeHash: "0x084e48693d777b257e1f9e80dd895df0078ba6603381ab7a0a08f9306b8acd9c",
        kind: "concentrated",
        lifecycle: "current",
        revision: "concentrated-v4-ammora-fee-v1",
        sourceCommit: "bde6a1e15916333d371c0afe5c90a061e8aa5709",
        creatorFeeSource: "factory",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0x40d2219a3ecf2bc07e4729b5773f0443670ff6c7",
        factoryRuntimeCodeHash: "0xb55db41c2c3f9ade25159a70b7b6f9d9aa3c3012fbe48ba8d99e3e5c2921d674",
        implementation: "0x30d2aa2888afc6479f090e0f2f4ac165e5ddcd00",
        implementationRuntimeCodeHash: "0x602d976520ea2cdd1d514c440f0576b70da8fc2aa8bba0153ff7ed13914d8524",
        kind: "compounding",
        lifecycle: "current",
        revision: "compounding-v4-ammora-fee-v1",
        sourceCommit: "bde6a1e15916333d371c0afe5c90a061e8aa5709",
        creatorFeeSource: "quote",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0xc42733b043f1f132615f3be4d3ac20d1d4fb0d51",
        factoryRuntimeCodeHash: "0xab1dfa3a2a1cc12ad6158714a4f866d3baa20414bf29c7d9f86cde44f43d3987",
        implementation: "0xe0a350ea7e793ff607ba36cc832ebec7fb3276a8",
        implementationRuntimeCodeHash: "0x084e48693d777b257e1f9e80dd895df0078ba6603381ab7a0a08f9306b8acd9c",
        kind: "concentrated",
        lifecycle: "legacy",
        revision: "concentrated-v3.1-sealed",
        sourceCommit: "ee3d752156235fcec55ca7b253dfb112830ab1de",
        creatorFeeSource: "factory",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0xfc81511ce9f697afcee2dfaa67d2c1e7d3ebed3b",
        factoryRuntimeCodeHash: "0x9f93c419425f24d5c5978eec90878b49f70ac9e606d95fb99abb3da745a62229",
        implementation: "0xe47bbceccab854058baf489389b2450f7abd53ff",
        implementationRuntimeCodeHash: "0x602d976520ea2cdd1d514c440f0576b70da8fc2aa8bba0153ff7ed13914d8524",
        kind: "compounding",
        lifecycle: "legacy",
        revision: "compounding-v3.1-sealed",
        sourceCommit: "ee3d752156235fcec55ca7b253dfb112830ab1de",
        creatorFeeSource: "quote",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0x118563a9d5df0da97fb48e1dd0ffd0139d0d49c8",
        factoryRuntimeCodeHash: "0x43aae9e9675389e2be3f52351039975a50ee3ce1c9161b65823544d31457276c",
        implementation: "0x3de2ebd6b8755c26b30f2a737283747c27ab477f",
        implementationRuntimeCodeHash: "0x084e48693d777b257e1f9e80dd895df0078ba6603381ab7a0a08f9306b8acd9c",
        kind: "concentrated",
        lifecycle: "legacy",
        revision: "concentrated-v3.1-factory-creator-fee",
        sourceCommit: "4afbd30bc037011314f5b6eb8b814bf13b037d11",
        creatorFeeSource: "factory",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0xa5249e4d663a30f03af94f52644ed71d4295880a",
        factoryRuntimeCodeHash: "0xcef1d928c2f519ec3b1893c89aea6fe66d3a2af88d37b9c4cc8e3ffac4d5f6f7",
        implementation: "0x5455e36c1cf27f68960351ea856cec354e15a35e",
        implementationRuntimeCodeHash: "0x602d976520ea2cdd1d514c440f0576b70da8fc2aa8bba0153ff7ed13914d8524",
        kind: "compounding",
        lifecycle: "legacy",
        revision: "compounding-v3.1-detailed-fee-quote",
        sourceCommit: "4afbd30bc037011314f5b6eb8b814bf13b037d11",
        creatorFeeSource: "quote",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0x1125b95da09d04f78efd5ec2ec990366bda03df9",
        factoryRuntimeCodeHash: "0x7fd34cf0c2e6ccfa528c56955e9b018ee88edda859b701a095521ea54f409111",
        implementation: "0x458fd31211e47597c5ebc232e77672a166116122",
        implementationRuntimeCodeHash: "0x084e48693d777b257e1f9e80dd895df0078ba6603381ab7a0a08f9306b8acd9c",
        kind: "concentrated",
        lifecycle: "legacy",
        revision: "concentrated-v3.1-factory-creator-fee",
        sourceCommit: "cd844972bd273a63bf02a59c8b880d3b42803626",
        creatorFeeSource: "factory",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0x91f3c5b181a76d87b5c0e90c75f229e9c2873de3",
        factoryRuntimeCodeHash: "0xaf6a75c2b3a3d09389ab576bd3e485fbc4d6a0f8f97e4043dc7c43191c3d1c30",
        implementation: "0x356655b79df833ee65f10c138d4fb54ec27baaae",
        implementationRuntimeCodeHash: "0x602d976520ea2cdd1d514c440f0576b70da8fc2aa8bba0153ff7ed13914d8524",
        kind: "compounding",
        lifecycle: "legacy",
        revision: "compounding-v3.1-detailed-fee-quote",
        sourceCommit: "cd844972bd273a63bf02a59c8b880d3b42803626",
        creatorFeeSource: "quote",
        executionEnabled: true
      },
      {
        chainId: 91342,
        factory: "0xb82d592ae44b6806c6ac6ff5320bc5f669fc377c",
        factoryRuntimeCodeHash: "0x9d6c073afce341129b3ad4a71f5a11a8d0bc9844f894da5e289968518542dc90",
        implementation: "0x74036bf3d5b2273b931418de7499d21d3079bfbb",
        implementationRuntimeCodeHash: "0x7681609ed6633a18ec076bbbada9d163862d5505e6f3f9e7e8c7e2268651e988",
        kind: "concentrated",
        lifecycle: "legacy",
        revision: "concentrated-v3.0-pool-creator-fee",
        sourceCommit: "8afb513dbd88b9a601364e68bfd5e19bd89df338",
        creatorFeeSource: "pool",
        executionEnabled: true
      }
    ]);
    COMMON_ACTIVE_ROLES = [
      "launch.factory",
      "launch.configRegistry",
      "launch.mathModule",
      "launch.graduationAdapter",
      "launch.concentratedFactory",
      "launch.concentratedPositionManager",
      "launch.concentratedFeeController",
      "launch.compoundingFactory",
      "launch.compoundingFeeController",
      "liquidityMarketMaker.deployer",
      "liquidityMarketMaker.factory",
      "liquidityMarketMaker.positionManager",
      "liquidityMarketMaker.binLens",
      "liquidityMarketMaker.limitOrderManager",
      "liquidityMarketMaker.zapRouter",
      "liquidityMarketMaker.rewardManager",
      "liquidityMarketMaker.oracle",
      "liquidityMarketMaker.marketSyncController",
      "feeSharing.factory",
      "policy.tokenPolicyRegistry",
      "routers.executionRegistry",
      "routers.native",
      "routers.permit",
      "routers.zap",
      "routers.permit2",
      "tokens.wrappedNative"
    ];
    V1_ACTIVE_ROLES = [
      ...COMMON_ACTIVE_ROLES,
      "launch.firstBuyExecutor",
      "launch.metadataRegistry"
    ];
    V2_ACTIVE_ROLES = [
      ...COMMON_ACTIVE_ROLES,
      "launch.feePolicy"
    ];
    AMMORA_FEE_POLICY_VERSION = keccak256(
      stringToHex("AMMORA_FEE_V1")
    );
    AMMORA_PROTOCOL_TRADING_FEE_SHARE_BPS = 2e3;
    AMMORA_REFERRAL_SHARE_OF_PROTOCOL_BPS = 2e3;
    AMMORA_PROTOCOL_LIQUIDITY_MIGRATION_FEE_BPS = 20;
    BPS = 10000n;
    requireShare = (shareBps, name) => {
      if (!Number.isInteger(shareBps) || shareBps < 0 || shareBps > 1e4) {
        throw new RangeError(`${name} must be an integer from 0 to 10000`);
      }
      return BigInt(shareBps);
    };
    requireAmount = (amount, name) => {
      if (amount < 0n) throw new RangeError(`${name} must be non-negative`);
    };
    previewAmmoraLaunchFeeDistribution = (totalFee, creatorShareOfNonProtocolBps, hasReferral) => {
      requireAmount(totalFee, "totalFee");
      const creatorShare = requireShare(
        creatorShareOfNonProtocolBps,
        "creatorShareOfNonProtocolBps"
      );
      const protocolFeeGross = totalFee * BigInt(AMMORA_PROTOCOL_TRADING_FEE_SHARE_BPS) / BPS;
      const nonProtocolFee = totalFee - protocolFeeGross;
      const creatorFee = nonProtocolFee * creatorShare / BPS;
      const referralFee = hasReferral ? protocolFeeGross * BigInt(AMMORA_REFERRAL_SHARE_OF_PROTOCOL_BPS) / BPS : 0n;
      return {
        totalFee,
        protocolFeeGross,
        protocolFeeNet: protocolFeeGross - referralFee,
        creatorFee,
        partnerFee: nonProtocolFee - creatorFee,
        referralFee
      };
    };
    ZERO_HASH2 = `0x${"00".repeat(32)}`;
    Q1283 = 1n << 128n;
    DBC_AUTHORIZED_FIRST_BUY_MAGIC = keccak256(
      stringToHex("AMMORA_DBC_AUTHORIZED_FIRST_BUY_V1")
    ).slice(0, 10);
    UINT40_MAX = 2 ** 40 - 1;
    UINT32_MAX = 2 ** 32 - 1;
    UINT16_MAX = 2 ** 16 - 1;
    UINT128_MAX = (1n << 128n) - 1n;
    UINT256_MAX = (1n << 256n) - 1n;
    DAMM_V2_DEAD_LIQUIDITY = 100n << 64n;
    rolesAbi = parseAbi([
      "function owner() view returns(address)",
      "function tokenPolicyRegistry() view returns(address)",
      "function defaultFeeBps() view returns(uint16)",
      "function protocolFeeShareBps() view returns(uint16)",
      "function feeRecipient() view returns(address)",
      "function rewardManager() view returns(address)",
      "function factory() view returns(address)",
      "function isPool(address) view returns(bool)",
      "function policy(address) view returns(uint8 kind,bool poolAllowed,bool routerAllowed,bool rewardAllowed)",
      "function ownerPolicyConfigured(address) view returns(bool)",
      "function aggregationRouterAllowed(address) view returns(bool)",
      "function getPositionBins(uint256) view returns(int24[])",
      "function positionShares(uint256,int24) view returns(uint256)",
      "function currentActivationPoint() view returns(uint64)",
      "function permissionlessOperationBits(uint256) view returns(uint8)"
    ]);
    MAX_REWARD_DURATION = 365 * 24 * 60 * 60;
    MAX_MARKET_SYNC_WINDOW = 7 * 24 * 60 * 60;
    MAX_MARKET_SYNC_COOLDOWN = 7 * 24 * 60 * 60;
    UINT256_MAX2 = (1n << 256n) - 1n;
    UINT64_MAX = (1n << 64n) - 1n;
    UINT64_MAX2 = (1n << 64n) - 1n;
    UINT128_MAX2 = (1n << 128n) - 1n;
    UINT256_MAX3 = (1n << 256n) - 1n;
    MAX_RATE_LIMITER_DURATION = 12 * 60 * 60;
    MAX_VESTING_DURATION = 730 * 24 * 60 * 60;
    DEFAULT_DEADLINE_SECONDS = 20 * 60;
    MAX_DEADLINE_SECONDS = 30 * 60;
    AMMORA_NATIVE_TOKEN = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    AMMORA_PROTOCOL_ROUTE_MODELS = Object.freeze(
      ["dbc", "concentrated", "compounding", "almm"]
    );
    AMMORA_VENUE_ROUTE_MODEL_PREFIX = "venue:";
    VENUE_ROUTE_MODEL_SLUG = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
    isAmmoraExternalVenueRouteModel = (model) => model.startsWith(AMMORA_VENUE_ROUTE_MODEL_PREFIX) && VENUE_ROUTE_MODEL_SLUG.test(model.slice(AMMORA_VENUE_ROUTE_MODEL_PREFIX.length));
    VenueKind = Object.freeze({
      None: 0,
      AmmoraConcentrated: 1,
      AmmoraCompounding: 2,
      ExternalAdapter: 3
    });
    AMMORA_VENUE_SPEC_VERSION = 1;
    ADDRESS_PATTERN = /^0x[0-9a-fA-F]{40}$/;
    IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
    AMMORA_VENUE_EXECUTION_REGISTRY = "executionRegistry";
    AMMORA_DEFAULT_VENUE_VALUATION = Object.freeze({ mode: "usd-oracle" });
    AMMORA_PROTOCOL_AUTHENTICATED_VALUATION = Object.freeze({ mode: "protocol-authenticated" });
    AMMORA_VENUE_QUOTE_ASSET_FIXTURE_FLOOR_UNITS = 1n;
    ammoraVenueQuoteAssetFixtureFloor = (decimals4) => AMMORA_VENUE_QUOTE_ASSET_FIXTURE_FLOOR_UNITS * 10n ** BigInt(decimals4);
    assertAmmoraVenueValuation = (venueId, valuation) => {
      if (valuation === void 0) return;
      if (valuation.mode === "usd-oracle") return;
      if (valuation.mode === "protocol-authenticated") {
        throw new Error(
          `venue ${venueId} may not declare protocol-authenticated valuation: it is what the protocol's own dbc, concentrated and compounding models already are, not a mode a venue can claim`
        );
      }
      if (valuation.mode !== "quote-asset") {
        throw new Error(`venue ${venueId} declares unknown valuation mode ${String(valuation.mode)}`);
      }
      if (!ADDRESS_PATTERN.test(valuation.quoteAsset) || /^0x0{40}$/.test(valuation.quoteAsset)) {
        throw new Error(`venue ${venueId} quote-asset valuation must name a quote asset address`);
      }
      if (!Number.isSafeInteger(valuation.quoteAssetDecimals) || valuation.quoteAssetDecimals < 0 || valuation.quoteAssetDecimals > 36) {
        throw new Error(`venue ${venueId} quote asset decimals must be a whole number between 0 and 36`);
      }
      if (!valuation.quoteAssetLabel) throw new Error(`venue ${venueId} quote-asset valuation requires a quote asset label`);
      if (typeof valuation.minimumLiquidity !== "bigint" || valuation.minimumLiquidity <= 0n) {
        throw new Error(
          `venue ${venueId} quote-asset floor must be a positive bigint of raw ${valuation.quoteAssetLabel || "quote asset"} units`
        );
      }
      if (valuation.referenceSource !== "registered-venue") {
        throw new Error(
          `venue ${venueId} quote-asset valuation must take its reference from another registered venue; a floor with no independent reference cannot be checked`
        );
      }
      if (valuation.minimumLiquidity < ammoraVenueQuoteAssetFixtureFloor(valuation.quoteAssetDecimals) && valuation.testnetOnly !== true) {
        throw new Error(
          `venue ${venueId} declares a quote-asset floor below one whole ${valuation.quoteAssetLabel}; a floor that small is a testnet fixture figure and must declare testnetOnly`
        );
      }
    };
    requireRole = (descriptor, role) => {
      const matches = descriptor.contracts.filter((contract) => contract.role === role);
      if (matches.length !== 1) {
        throw new Error(`venue ${descriptor.id} must declare exactly one ${role} contract`);
      }
      return matches[0];
    };
    addressGetterAbis = /* @__PURE__ */ new Map();
    ammoraVenueAddressGetterAbi = (name) => {
      if (!IDENTIFIER_PATTERN.test(name)) throw new Error(`venue wiring read ${name} is not a function name`);
      const cached = addressGetterAbis.get(name);
      if (cached) return cached;
      const abi = parseAbi([`function ${name}() view returns (address)`]);
      addressGetterAbis.set(name, abi);
      return abi;
    };
    defineAmmoraVenueDescriptor = (descriptor) => {
      if (descriptor.specVersion !== AMMORA_VENUE_SPEC_VERSION) {
        throw new Error(`venue ${descriptor.id} declares unsupported spec version ${String(descriptor.specVersion)}`);
      }
      if (!descriptor.id || !descriptor.label) throw new Error("venue descriptor requires an id and a label");
      if (!isAmmoraExternalVenueRouteModel(descriptor.model)) {
        throw new Error(`venue ${descriptor.id} model must be a venue:<slug> identifier`);
      }
      if (descriptor.startBlock < 0n) throw new Error(`venue ${descriptor.id} start block must be non-negative`);
      if (!descriptor.capabilities.exactInput) {
        throw new Error(`venue ${descriptor.id} must support exact input`);
      }
      const ids = /* @__PURE__ */ new Set();
      for (const contract of descriptor.contracts) {
        if (!contract.id || !contract.label) throw new Error(`venue ${descriptor.id} contract requires an id and a label`);
        if (ids.has(contract.id)) throw new Error(`venue ${descriptor.id} has a duplicate contract id ${contract.id}`);
        if (!ADDRESS_PATTERN.test(contract.address)) {
          throw new Error(`venue ${descriptor.id} contract ${contract.id} must be an EVM address`);
        }
        ids.add(contract.id);
      }
      for (const role of ["poolFactory", "poolImplementation", "adapter"]) requireRole(descriptor, role);
      for (const assertion of descriptor.wiring) {
        if (!ids.has(assertion.from)) {
          throw new Error(`venue ${descriptor.id} wiring reads an unknown contract ${assertion.from}`);
        }
        if (assertion.mustEqual !== AMMORA_VENUE_EXECUTION_REGISTRY && !ids.has(assertion.mustEqual)) {
          throw new Error(`venue ${descriptor.id} wiring compares against an unknown contract ${assertion.mustEqual}`);
        }
        if (!assertion.readLabel) throw new Error(`venue ${descriptor.id} wiring requires a read label`);
        ammoraVenueAddressGetterAbi(assertion.read);
      }
      for (const reader of descriptor.stateReaders) {
        if (!ids.has(reader)) throw new Error(`venue ${descriptor.id} declares an unknown state reader ${reader}`);
      }
      assertAmmoraVenueValuation(descriptor.id, descriptor.valuation);
      return Object.freeze({
        ...descriptor,
        contracts: Object.freeze(descriptor.contracts.map((contract) => Object.freeze({ ...contract }))),
        wiring: Object.freeze(descriptor.wiring.map((assertion) => Object.freeze({ ...assertion }))),
        stateReaders: Object.freeze([...descriptor.stateReaders]),
        capabilities: Object.freeze({ ...descriptor.capabilities }),
        ...descriptor.valuation === void 0 ? {} : { valuation: Object.freeze({ ...descriptor.valuation }) }
      });
    };
    AMMORA_UNISWAP_V4_VENUE_ID = "uniswap-v4";
    uniswapV4Descriptors = /* @__PURE__ */ new WeakMap();
    ammoraUniswapV4VenueDescriptor = (venue) => {
      const cached = uniswapV4Descriptors.get(venue);
      if (cached) return cached;
      const descriptor = Object.freeze({
        specVersion: AMMORA_VENUE_SPEC_VERSION,
        id: AMMORA_UNISWAP_V4_VENUE_ID,
        label: "Uniswap V4",
        model: "uniswap-v4",
        startBlock: venue.startBlock,
        contracts: Object.freeze([
          Object.freeze({ id: "handleFactory", role: "poolFactory", label: "handle factory", address: venue.handleFactory }),
          Object.freeze({
            id: "handleImplementation",
            role: "poolImplementation",
            label: "handle implementation",
            address: venue.handleImplementation
          }),
          Object.freeze({ id: "adapter", role: "adapter", label: "adapter", address: venue.adapter }),
          Object.freeze({ id: "poolManager", role: "singleton", label: "PoolManager", address: venue.poolManager }),
          Object.freeze({ id: "stateView", role: "stateReader", label: "StateView", address: venue.stateView })
        ]),
        wiring: Object.freeze([
          Object.freeze({ from: "handleFactory", read: "poolManager", readLabel: "PoolManager", mustEqual: "poolManager" }),
          Object.freeze({ from: "handleFactory", read: "stateView", readLabel: "StateView", mustEqual: "stateView" }),
          Object.freeze({
            from: "handleFactory",
            read: "poolImplementation",
            readLabel: "pool implementation",
            mustEqual: "handleImplementation"
          }),
          Object.freeze({ from: "adapter", read: "poolManager", readLabel: "PoolManager", mustEqual: "poolManager" }),
          Object.freeze({
            from: "adapter",
            read: "executionRegistry",
            readLabel: "execution registry",
            mustEqual: AMMORA_VENUE_EXECUTION_REGISTRY
          }),
          Object.freeze({ from: "stateView", read: "poolManager", readLabel: "PoolManager", mustEqual: "poolManager" })
        ]),
        stateReaders: Object.freeze(["stateView"]),
        capabilities: Object.freeze({ exactInput: true, tokenOrder: "exact" }),
        ...venue.valuation === void 0 ? {} : { valuation: Object.freeze({ ...venue.valuation }) }
      });
      uniswapV4Descriptors.set(venue, descriptor);
      return descriptor;
    };
    ammoraRouteDeploymentVenues = (deployment) => {
      const derived = deployment.uniswapV4Venue ? [ammoraUniswapV4VenueDescriptor(deployment.uniswapV4Venue)] : [];
      return deployment.venues ? [...derived, ...deployment.venues] : derived;
    };
    ADDRESS_PATTERN2 = /^0x[0-9a-fA-F]{40}$/;
    HASH_PATTERN2 = /^0x[0-9a-fA-F]{64}$/;
    minimalProxyRuntimeCodeHash = (implementation) => keccak256(concatHex([
      "0x363d3d373d3d3d363d73",
      implementation,
      "0x5af43d82803e903d91602b57fd5bf3"
    ]));
    deepFreeze3 = (value) => {
      if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
      for (const nested of Object.values(value)) deepFreeze3(nested);
      return Object.freeze(value);
    };
    requireAddress2 = (address10, label2) => {
      if (address10 !== null && !ADDRESS_PATTERN2.test(address10)) {
        throw new Error(`${label2} must be an EVM address`);
      }
    };
    assertVenueValuationFitsEnvironment = (deployment, venue) => {
      const valuation = venue.valuation;
      if (valuation === void 0 || valuation.mode !== "quote-asset") return;
      if (deployment.environment === "testnet") return;
      if (valuation.testnetOnly === true) {
        throw new Error(
          `${venue.label} venue declares a testnet-only quote-asset valuation and cannot be used on a ${deployment.environment} deployment`
        );
      }
      if (valuation.minimumLiquidity < ammoraVenueQuoteAssetFixtureFloor(valuation.quoteAssetDecimals)) {
        throw new Error(
          `${venue.label} venue quote-asset floor is below one whole ${valuation.quoteAssetLabel}, which is not a ${deployment.environment} setting`
        );
      }
    };
    defineAmmoraRouteDeployment = (deployment) => {
      if (!Number.isSafeInteger(deployment.chainId) || deployment.chainId <= 0) {
        throw new Error("route deployment chain ID must be a positive safe integer");
      }
      if (deployment.rpcUrls.length === 0) {
        throw new Error("route deployment must include at least one RPC URL");
      }
      if (deployment.finality.kind === "confirmations" && (!Number.isSafeInteger(deployment.finality.confirmations) || deployment.finality.confirmations < 0)) {
        throw new Error("route deployment confirmations must be a non-negative integer");
      }
      requireAddress2(deployment.wrappedNative, "wrappedNative");
      if (deployment.blockTimeSeconds !== void 0 && (!Number.isSafeInteger(deployment.blockTimeSeconds) || deployment.blockTimeSeconds < 1 || deployment.blockTimeSeconds > 86400)) {
        throw new Error("route deployment block time must be a whole number of seconds between 1 and 86400");
      }
      requireAddress2(deployment.aggregationRouter, "aggregationRouter");
      requireAddress2(deployment.aggregationExecutionRegistry, "aggregationExecutionRegistry");
      if (deployment.aggregationAuthorities !== null) {
        requireAddress2(deployment.aggregationAuthorities.owner, "aggregationAuthorities.owner");
        requireAddress2(deployment.aggregationAuthorities.guardian, "aggregationAuthorities.guardian");
        if (deployment.aggregationAuthorities.owner.toLowerCase() === deployment.aggregationAuthorities.guardian.toLowerCase()) {
          throw new Error("aggregation owner and guardian must be separated");
        }
      }
      const minimumRegistrationDelaySeconds = deployment.environment === "testnet" && deployment.chainId === 91342 ? 600 : 3600;
      if (deployment.aggregationRegistrationDelaySeconds !== null && (!Number.isSafeInteger(deployment.aggregationRegistrationDelaySeconds) || deployment.aggregationRegistrationDelaySeconds < minimumRegistrationDelaySeconds || deployment.aggregationRegistrationDelaySeconds > 7 * 24 * 60 * 60)) {
        throw new Error(`aggregation registration delay must be between ${minimumRegistrationDelaySeconds} seconds and seven days`);
      }
      requireAddress2(deployment.nativeRouter, "nativeRouter");
      requireAddress2(deployment.executionRegistry, "executionRegistry");
      requireAddress2(deployment.tokenPolicyRegistry, "tokenPolicyRegistry");
      requireAddress2(deployment.permit2, "permit2");
      requireAddress2(deployment.multicall3, "multicall3");
      if (deployment.alcAggregationAdapter) {
        requireAddress2(deployment.alcAggregationAdapter, "alcAggregationAdapter");
        const alc = deployment.factories.find((factory) => factory.kind === "dbc");
        if (!alc || alc.abiVersion !== "v4" || !alc.execution || !alc.runtimeCodeHash || !deployment.runtimeCodeHashes[deployment.alcAggregationAdapter.toLowerCase()]) {
          throw new Error("ALC aggregation requires a V4 factory, implementation and adapter runtime pins");
        }
      }
      const declaredVenues = ammoraRouteDeploymentVenues(deployment);
      const venueIds = /* @__PURE__ */ new Set();
      const venueModels = /* @__PURE__ */ new Set();
      for (const venue of declaredVenues) {
        if (venue.id !== AMMORA_UNISWAP_V4_VENUE_ID) defineAmmoraVenueDescriptor(venue);
        assertAmmoraVenueValuation(venue.id, venue.valuation);
        assertVenueValuationFitsEnvironment(deployment, venue);
        if (venueIds.has(venue.id)) throw new Error(`duplicate route venue ID ${venue.id}`);
        if (venueModels.has(venue.model)) throw new Error(`duplicate route venue model ${venue.model}`);
        venueIds.add(venue.id);
        venueModels.add(venue.model);
        if (deployment.aggregationRouter === null || deployment.aggregationExecutionRegistry === null) {
          throw new Error(`${venue.label} venue requires the aggregation router and execution registry`);
        }
        if (!deployment.capabilities.atomicMultiHop) {
          throw new Error(`${venue.label} venue requires atomic multi-hop aggregation`);
        }
        for (const contract of venue.contracts) {
          requireAddress2(contract.address, `${venue.id}.${contract.id}`);
          if (!deployment.runtimeCodeHashes[contract.address.toLowerCase()]) {
            throw new Error(`${venue.label} venue ${contract.id} requires a runtime code hash pin`);
          }
        }
        const addresses = venue.contracts.map((contract) => contract.address.toLowerCase());
        if (new Set(addresses).size !== addresses.length) {
          throw new Error(`${venue.label} venue addresses must be distinct`);
        }
        if (venue.startBlock < 0n) throw new Error(`${venue.label} venue start block must be non-negative`);
      }
      const factoryIds = /* @__PURE__ */ new Set();
      const factoryAddresses = /* @__PURE__ */ new Set();
      for (const factory of deployment.factories) {
        requireAddress2(factory.address, `factory ${factory.id}`);
        if (factory.startBlock < 0n) throw new Error("factory start block must be non-negative");
        if (factoryIds.has(factory.id)) throw new Error(`duplicate route factory ID ${factory.id}`);
        const normalized = factory.address.toLowerCase();
        if (factoryAddresses.has(normalized)) {
          throw new Error(`duplicate route factory address ${factory.address}`);
        }
        factoryIds.add(factory.id);
        factoryAddresses.add(normalized);
        if (factory.runtimeCodeHash !== null && !HASH_PATTERN2.test(factory.runtimeCodeHash)) {
          throw new Error(`invalid runtime code hash for factory ${factory.id}`);
        }
        if (factory.execution !== null) {
          requireAddress2(factory.execution.poolImplementation, `factory implementation ${factory.id}`);
          if (!HASH_PATTERN2.test(factory.execution.implementationRuntimeCodeHash) || !HASH_PATTERN2.test(factory.execution.cloneRuntimeCodeHash)) {
            throw new Error(`invalid execution runtime pin for factory ${factory.id}`);
          }
          if (factory.execution.cloneRuntimeCodeHash.toLowerCase() !== minimalProxyRuntimeCodeHash(factory.execution.poolImplementation).toLowerCase()) {
            throw new Error(`factory clone runtime pin is not bound to its implementation for ${factory.id}`);
          }
        }
        for (const binding of factory.bindings) {
          requireAddress2(binding.address, `factory binding ${factory.id}.${binding.name}`);
          if (binding.runtimeCodeHash !== null && !HASH_PATTERN2.test(binding.runtimeCodeHash)) {
            throw new Error(`invalid runtime code hash for ${factory.id}.${binding.name}`);
          }
        }
      }
      if (deployment.capabilities.atomicMultiHop && (deployment.aggregationRouter === null || deployment.aggregationExecutionRegistry === null || deployment.aggregationAuthorities === null || deployment.aggregationRegistrationDelaySeconds === null)) {
        throw new Error("atomic multi-hop capability requires a router, execution registry, authorities, and registration delay");
      }
      if (deployment.capabilities.atomicMultiHop) {
        if (deployment.capabilities.maxHops !== 3 || !deployment.capabilities.atomicTwoHop) {
          throw new Error("aggregation v1 requires maxHops 3 and the deprecated compatibility flag");
        }
        const aggregationFactories = deployment.factories.filter(
          (factory) => factory.kind === "concentrated" || factory.kind === "compounding"
        );
        if (!aggregationFactories.some((factory) => factory.kind === "concentrated") || !aggregationFactories.some((factory) => factory.kind === "compounding")) {
          throw new Error("atomic multi-hop capability requires both concentrated and compounding factories");
        }
        for (const address10 of aggregationTrustAddresses(deployment)) {
          if (!HASH_PATTERN2.test(deployment.runtimeCodeHashes[address10.toLowerCase()] ?? "")) {
            throw new Error(`atomic multi-hop runtime hash is missing for ${address10}`);
          }
        }
        for (const factory of aggregationFactories) {
          const manifestHash = deployment.runtimeCodeHashes[factory.address.toLowerCase()];
          if (factory.runtimeCodeHash === null || factory.runtimeCodeHash.toLowerCase() !== manifestHash?.toLowerCase()) {
            throw new Error(`atomic multi-hop factory pin does not match the runtime manifest for ${factory.id}`);
          }
          if (factory.execution === null) {
            throw new Error(`atomic multi-hop implementation pin is missing for ${factory.id}`);
          }
          const implementationManifestHash = deployment.runtimeCodeHashes[factory.execution.poolImplementation.toLowerCase()];
          if (factory.execution.implementationRuntimeCodeHash.toLowerCase() !== implementationManifestHash?.toLowerCase()) {
            throw new Error(`atomic multi-hop implementation pin does not match the runtime manifest for ${factory.id}`);
          }
        }
      }
      if (deployment.environment === "mainnet") {
        const required = [
          deployment.wrappedNative,
          deployment.aggregationRouter,
          deployment.aggregationExecutionRegistry,
          deployment.nativeRouter,
          deployment.executionRegistry,
          deployment.tokenPolicyRegistry,
          deployment.permit2,
          deployment.multicall3,
          ...deployment.factories.flatMap((factory) => [
            factory.address,
            ...factory.execution === null ? [] : [factory.execution.poolImplementation],
            ...factory.bindings.map((binding) => binding.address)
          ])
        ].filter((value) => value !== null);
        for (const address10 of required) {
          if (!HASH_PATTERN2.test(deployment.runtimeCodeHashes[address10.toLowerCase()] ?? "")) {
            throw new Error(`mainnet route runtime hash is missing for ${address10}`);
          }
        }
      }
      return deepFreeze3(deployment);
    };
    runtimePin = (deployment, address10) => deployment.security?.runtimeCodeHashes[address10.toLowerCase()] ?? null;
    routeDeploymentFromCore = (deployment, options = {}) => {
      const runtimeCodeHashes = options.runtimeCodeHashes ?? deployment.security?.runtimeCodeHashes ?? {};
      const pin2 = (address10) => runtimeCodeHashes[address10.toLowerCase()] ?? runtimePin(deployment, address10);
      const binding = (name, address10) => ({
        name,
        address: address10,
        runtimeCodeHash: pin2(address10)
      });
      const descriptor = (id, kind, address10, bindings, execution = null) => ({
        id,
        kind,
        address: address10,
        abiVersion: id.endsWith("-v4") ? "v4" : "v3",
        startBlock: deployment.startBlock,
        runtimeCodeHash: pin2(address10),
        execution,
        bindings
      });
      const aggregationRouter = options.aggregationRouter ?? null;
      const aggregationExecutionRegistry = options.aggregationExecutionRegistry ?? null;
      const aggregationAuthorities = options.aggregationAuthorities ?? null;
      const aggregationRegistrationDelaySeconds = options.aggregationRegistrationDelaySeconds ?? null;
      return defineAmmoraRouteDeployment({
        source: options.source ?? "official",
        environment: deployment.environment,
        slot: deployment.slot,
        chainId: deployment.chain.id,
        chainName: deployment.chain.name,
        rpcUrls: deployment.chain.rpcUrls,
        blockExplorerUrl: deployment.chain.blockExplorerUrl,
        nativeCurrency: deployment.chain.nativeCurrency,
        wrappedNative: deployment.contracts.tokens.wrappedNative,
        ...options.blockTimeSeconds === void 0 ? {} : { blockTimeSeconds: options.blockTimeSeconds },
        aggregationRouter,
        aggregationExecutionRegistry,
        aggregationAuthorities,
        aggregationRegistrationDelaySeconds,
        nativeRouter: deployment.contracts.routers.native,
        executionRegistry: deployment.contracts.routers.executionRegistry,
        tokenPolicyRegistry: options.tokenPolicyRegistry ?? deployment.contracts.policy.tokenPolicyRegistry,
        permit2: deployment.contracts.routers.permit2,
        multicall3: options.multicall3 ?? null,
        ...options.alcAggregationAdapter ? { alcAggregationAdapter: options.alcAggregationAdapter } : {},
        ...options.uniswapV4Venue ? { uniswapV4Venue: options.uniswapV4Venue } : {},
        ...options.venues ? { venues: options.venues } : {},
        factories: [
          descriptor(`dbc-v${deployment.contracts.launch.protocolVersion}`, "dbc", deployment.contracts.launch.factory, [
            binding("configRegistry", deployment.contracts.launch.configRegistry),
            binding("graduationAdapter", deployment.contracts.launch.graduationAdapter),
            ...deployment.contracts.launch.protocolVersion === 4 ? [binding("feePolicy", deployment.contracts.launch.feePolicy)] : []
          ], options.alcFactoryExecutionPin ?? null),
          descriptor(
            `concentrated-v${deployment.contracts.launch.protocolVersion}`,
            "concentrated",
            deployment.contracts.launch.concentratedFactory,
            [binding(
              "positionManager",
              deployment.contracts.launch.concentratedPositionManager
            )],
            options.aggregationFactoryExecutionPins?.concentrated ?? null
          ),
          descriptor(
            `compounding-v${deployment.contracts.launch.protocolVersion}`,
            "compounding",
            deployment.contracts.launch.compoundingFactory,
            [],
            options.aggregationFactoryExecutionPins?.compounding ?? null
          ),
          descriptor(
            "almm-v3",
            "almm",
            deployment.contracts.liquidityMarketMaker.factory,
            [
              binding(
                "positionManager",
                deployment.contracts.liquidityMarketMaker.positionManager
              ),
              binding("binLens", deployment.contracts.liquidityMarketMaker.binLens)
            ]
          )
        ],
        finality: options.finality ?? { kind: "confirmations", confirmations: 2 },
        runtimeCodeHashes,
        capabilities: {
          directExactInput: true,
          nativeInput: true,
          atomicMultiHop: aggregationRouter !== null && aggregationExecutionRegistry !== null,
          maxHops: aggregationRouter !== null && aggregationExecutionRegistry !== null ? 3 : 1,
          atomicTwoHop: aggregationRouter !== null && aggregationExecutionRegistry !== null
        }
      });
    };
    aggregationCoreTrustAddresses = (deployment) => {
      if (deployment.aggregationRouter === null || deployment.aggregationExecutionRegistry === null) {
        return [];
      }
      const factories = deployment.factories.filter((factory) => factory.kind === "concentrated" || factory.kind === "compounding").flatMap((factory) => [
        factory.address,
        ...factory.execution === null ? [] : [factory.execution.poolImplementation]
      ]);
      return [
        deployment.aggregationRouter,
        deployment.aggregationExecutionRegistry,
        deployment.wrappedNative,
        deployment.tokenPolicyRegistry,
        ...factories
      ];
    };
    venueTrustAddresses = (deployment, venue) => deployment.aggregationRouter === null || deployment.aggregationExecutionRegistry === null ? [] : venue.contracts.map((contract) => contract.address);
    aggregationVenueTrustAddresses = (deployment) => ammoraRouteDeploymentVenues(deployment).flatMap((venue) => venueTrustAddresses(deployment, venue));
    aggregationTrustAddresses = (deployment) => [
      ...aggregationCoreTrustAddresses(deployment),
      ...aggregationVenueTrustAddresses(deployment)
    ];
    createAmmoraRouteDeploymentCatalog = (deployments) => {
      const catalog = {};
      for (const deployment of deployments) {
        const reviewed2 = defineAmmoraRouteDeployment(deployment);
        if (catalog[reviewed2.chainId]) {
          throw new Error(`duplicate route deployment chain ID ${reviewed2.chainId}`);
        }
        catalog[reviewed2.chainId] = reviewed2;
      }
      return Object.freeze(catalog);
    };
    giwaSepoliaRouteRuntimeCodeHashes = Object.freeze({
      [giwaSepoliaLegacyNativeCompatibility.nativeRouter.toLowerCase()]: giwaSepoliaLegacyNativeCompatibility.nativeRouterRuntimeCodeHash,
      [giwaSepoliaLegacyNativeCompatibility.executionRegistry.toLowerCase()]: giwaSepoliaLegacyNativeCompatibility.executionRegistryRuntimeCodeHash,
      "0x4200000000000000000000000000000000000006": "0xa62eedb6ad76577d404f9030968b640d14e72bdcd6428707d0d2f0f18546c294",
      "0xb1914b8ac353d8e4702eec1dc07995c7c2c5ac15": "0x86ea7824d0bf3cfc126f13063ac455680dce4cefe25ea6851de284122b00520b",
      "0xe65ecb670004ba41312d05c7230b1f4b3b06913f": "0x47a74dcbe3ff4751dbe196ec2843061244d846b28d1935bfe0e5b4cec5044aaa",
      "0xc9ca24791b0fe146c02299261a55220e4213645f": "0x93149b63d9352990bb7464d7f421c9b9de5636238071123d6f76aeabf598bacb",
      "0x000000000022d473030f116ddee9f6b43ac78ba3": "0xe0e8484bb12a73d6804c93de97b18cb6175c9710eaa4f4722f8c94771460dfc9",
      "0x4e20c6d736439f06cb85356e0c89bab2ee5c09dc": "0x9b1ac5dac6baae8618eedc86689e3665951829424286758e71f7309a65bdda45",
      "0x369e5f0915857896b1f4f08d0cdd11c035f2213e": "0x4e6bb69c847923486ade2a4430bc98363f01758cbbd2121f15c1b88c550d5719",
      "0xbffc3a05bebbba7b9647dd0a3e4aa74eecadc341": "0x4ebf3cf45e8ad35f5e17a8a6e841f61cd274b31c221e43738a954ee7e7d50f0c",
      "0x118563a9d5df0da97fb48e1dd0ffd0139d0d49c8": "0x43aae9e9675389e2be3f52351039975a50ee3ce1c9161b65823544d31457276c",
      "0x72705d3979b097bef8c53068b7417f0f398f7cd4": "0xb5df289e5df8efd7bd078620ec9abb0ea1f5d4721b73a3e67e8283712538c093",
      "0xa5249e4d663a30f03af94f52644ed71d4295880a": "0xcef1d928c2f519ec3b1893c89aea6fe66d3a2af88d37b9c4cc8e3ffac4d5f6f7",
      "0x63c9f1cab865d708a49df5304b59e91474860bde": "0x14eb4e21396abc4455b4382989eeda90b0fdad6c493d97eb945db3c638e066fc",
      "0xcde333bfa48ba90e6a6db75775488ac34d03e2c8": "0x2df6a767364b9746f9bdbc0c7cc554130aa2b7a6a86e230d92b0120f290d81b3",
      "0x2e6db44c2743666c858e87f15649354f394cc082": "0x5882365fd2b2b50b8fbaaf29a209f2195ccede16822ca1631bebeb7962ded581",
      "0xffab5d41c63fa83aa01b33059c325a7137adf9a0": "0xbe1333990c1fdbe9345078d6e8739ee1bbf546ab12906e108df995c95b462916",
      "0x1a30507113c5f3bc1b0d740b69548b499ebf83cf": "0x49a93e68ce5af7eac62203f9120fb8388d42a8cd72b5a5470209a7cd5af5d845",
      "0xd7e454ff6232158162b9a2fc498dda2c8d76abf9": "0x8aecb9b87d800579fdbd242b0a9ee96b9fff6c7442c127834a550bc3da43ca89",
      "0xf7880b7430a7a3b41329f9b716c766fd3ff6fee3": "0x7939803ad447b6c006e11fcb523cc278b2f1841a8e4c2505fe47c55bc60fcb5f",
      "0x038170a4dd4bb9a01ccf3bfee817f092c8d50321": "0x7161642d426afaa84e0ebd062717d9945e548dbd058d5795f1d3c0cdd957de39",
      "0x815bbca92eb069fff4520e6e49a839f5ef5134b4": "0x084e48693d777b257e1f9e80dd895df0078ba6603381ab7a0a08f9306b8acd9c",
      "0xd0551711b193fa1423fcd3f9b95354ccf4f18c81": "0xe1cb00997c574bbef9f4813794b1dc63a988b6a4c571c7afb66c2e9a7dc40db9",
      "0x40d2219a3ecf2bc07e4729b5773f0443670ff6c7": "0xb55db41c2c3f9ade25159a70b7b6f9d9aa3c3012fbe48ba8d99e3e5c2921d674",
      "0x30d2aa2888afc6479f090e0f2f4ac165e5ddcd00": "0x602d976520ea2cdd1d514c440f0576b70da8fc2aa8bba0153ff7ed13914d8524",
      "0x26c9bd48a43768152a10099c94c42a6fb316720d": "0xdb5e4bb300c932111ac68fe35f79752b6532217abecd31535ac7e59b06eda010",
      "0xd239993b1598290c6b21eb5e479fba5ecf0ae102": "0x28a982c4fee384940643bd2a75b8c66504b5951246c37b48d9263239af8ceee1",
      "0x6d4141985e8b0689e4437c9b66af22fd4235f3b3": "0xe0da5b7184f520f95765d43bab195bb285d1dff8f36d681ff0b165c5ce35cc68",
      "0xdb006e17f672046eb1a427d7cfc87b4a0fe94b2b": "0x889aae1a8b67151c758022f254bb36152eec9d157c9ca416720dd90bc64cf9c6",
      "0x2f5df0222070e5a0168c16c4f75c4a635d414579": "0x20ec9b6efa533f5cfdcd5b547c474890c674de36accc2817e4b3006da1f51af7",
      "0xbbc273088e3950cbac014a2149dc3c7803b7db63": "0xc0965f5894306f3549fe2f649eb92b82215165f7c008386d1e5adc9489788e5c"
    });
    ammoraRouteDeployments = createAmmoraRouteDeploymentCatalog([
      routeDeploymentFromCore(giwaSepoliaPermissionless, {
        // GIWA Sepolia produces one block per second. Same value as the committed Data API chain
        // manifests (`deploy/releases/giwa-sepolia.*.data-api-chain.json`, `blockTimeSeconds: 1`), and
        // independently reproducible from the UniV4 activation evidence: the 10m adapter and factory
        // proposals are 652 blocks and 652 seconds apart, the 1h pair 3672 blocks and 3672 seconds.
        blockTimeSeconds: 1,
        aggregationRouter: "0xbbC273088e3950cBAC014a2149DC3c7803B7db63",
        aggregationExecutionRegistry: "0xd239993B1598290c6b21eB5E479fba5ecF0AE102",
        aggregationAuthorities: {
          owner: "0x13cD27a6E337097dB858C9C4FA472FbAd2F2c637",
          guardian: "0xBda1Cfd6F20d45cFd42C1fE43be713ddAbCF88f7"
        },
        aggregationRegistrationDelaySeconds: 3600,
        tokenPolicyRegistry: "0x26C9BD48A43768152A10099C94C42a6Fb316720d",
        aggregationFactoryExecutionPins: {
          concentrated: {
            poolImplementation: "0x815bbcA92Eb069FFf4520E6E49a839f5EF5134b4",
            implementationRuntimeCodeHash: "0x084e48693d777b257e1f9e80dd895df0078ba6603381ab7a0a08f9306b8acd9c",
            cloneRuntimeCodeHash: minimalProxyRuntimeCodeHash(
              "0x815bbcA92Eb069FFf4520E6E49a839f5EF5134b4"
            )
          },
          compounding: {
            poolImplementation: "0x30D2aA2888aFC6479f090E0f2f4ac165e5dDCD00",
            implementationRuntimeCodeHash: "0x602d976520ea2cdd1d514c440f0576b70da8fc2aa8bba0153ff7ed13914d8524",
            cloneRuntimeCodeHash: minimalProxyRuntimeCodeHash(
              "0x30D2aA2888aFC6479f090E0f2f4ac165e5dDCD00"
            )
          }
        },
        runtimeCodeHashes: giwaSepoliaRouteRuntimeCodeHashes
      })
    ]);
    UNISWAP_V4_MAX_EXACT_IN = (1n << 127n) - 1n;
    bindingsAbi = parseAbi([
      "function factory() view returns (address)",
      "function executionRegistry() view returns (address)",
      "function curveImplementation() view returns (address)",
      "function tokenForCurve(address) view returns (address)",
      "function curveForToken(address) view returns (address)",
      "function baseToken() view returns (address)",
      "function quoteToken() view returns (address)",
      "function status() view returns (uint8)",
      "function configRegistry() view returns (address)",
      "function configId() view returns (uint256)",
      "function quoteExactInput(uint256,bool) view returns ((uint256 amountIn,uint256 amountOut,uint256 amountLeft,uint128 nextSqrtPrice),uint256)"
    ]);
    poolTokensAbi = parseAbi(["function baseToken() view returns (address)", "function quoteToken() view returns (address)"]);
    poolAbi = parseAbi(["function factory() view returns(address)", "function baseToken() view returns(address)", "function quoteToken() view returns(address)", "function collectFeeMode() view returns(uint8)"]);
    adapterAbi = parseAbi(["function executionRegistry() view returns(address)", "function factory() view returns(address)"]);
    lensAbi = parseAbi(["function quoteExactInputWithFees(address pool,uint256 amountIn,bool baseForQuote) view returns(uint256 amountOut,uint256 amountInLeft,uint256 fee,uint256 protocolFee,int24 nextActiveId)"]);
    DEADLINE_SECONDS = 20n * 60n;
    AMMORA_DEFAULT_BLOCK_TIME_SECONDS = 12;
    DEFAULT_RISK_POLICY = Object.freeze({
      minimumLiquidityUsdX18: 10000n * 10n ** 18n,
      maximumPriceDeviationBps: 300,
      newPoolWindowSeconds: 86400n * BigInt(AMMORA_DEFAULT_BLOCK_TIME_SECONDS),
      newPoolLiquidityMultiplier: 2n
    });
    RISK_POLICY_FIELDS = Object.freeze([
      "minimumLiquidityUsdX18",
      "maximumPriceDeviationBps",
      "newPoolWindowSeconds",
      "newPoolLiquidityMultiplier",
      "newPoolBlockWindow"
    ]);
    MAXIMUM_NEW_POOL_WINDOW_SECONDS = 365n * 24n * 60n * 60n;
    MAXIMUM_MINIMUM_LIQUIDITY_USD_X18 = 10n ** 12n * 10n ** 18n;
    giwaSepoliaAutoRouteAddresses = Object.freeze({
      factory: "0x35353a2Dab7426EcCAe6f5FB267702a542ab68fA",
      firstBuyExecutor: "0x1a19a3b0e69b33db3a2f9b2487866b4be04dd451",
      policy: "0xADD644Af3a868Ef4165e04CA5eac280ab5819bE3",
      registry: "0xCCa3e38eAa4F00e43599646a75CcA164B97cC4eB",
      router: "0x176d8c2b26C6373Ba7c9dd5ed8E1a626caf2f206",
      adapter: "0x074e4e25D1575fa2e66C7638F78c4AF5283eb37C",
      nativeRouter: "0xade9E6dEF440E05640ed07c4a701C238B9FB66a8",
      curveImplementation: "0x014133029714f185D976549Dd4Ea2d6Aca9EC031",
      concentrated: "0x9eBD78f3839996014238728b4c9C2f2A4e6759Cb",
      compounding: "0x303EaA3BcF86283CBfe3f0E01290C11452bF91cf",
      concentratedImplementation: "0x16aC2947598408d51999346c4BCFAB5f9c5c0c65",
      compoundingImplementation: "0xa31Aab5A152DecD122040A0EAbF97122974D4Fcc"
    });
    giwaSepoliaUniswapV4Venue = Object.freeze({
      handleFactory: "0x3819200DD891C98f0443607aC9f3116f5a1CeAA7",
      handleImplementation: "0xA6c068EB674Fe0EbF7D79a24944E47C40AdcC30A",
      adapter: "0x91fC9eb5Ea887BeEcf087eb8f035943877C01A3D",
      poolManager: "0x794b8D559cFA850DCFc370201497d626f5991529",
      stateView: "0x2b51363aDDCe6c6FB688f174836b2AE45Bc5e9C7",
      startBlock: 36741670n,
      /**
       * TESTNET-ONLY quote-asset valuation for the GIWA Sepolia fixture venue.
       *
       * Why not USD: GIWA prices three assets, and AIV4C — the token in the only handle that exists —
       * is not one of them, so the USD rule leaves this venue with no floor and no deviation cap at all
       * rather than a strict one. Denominating in WETH restores both.
       *
       * The floor, 0.0005 WETH of two-sided depth: the fixture pool's quote-denominated depth is about
       * 0.00167 WETH (virtual reserves of ~8.35e14 raw a side at a 1:1 raw price). The pool is inside
       * the young-pool window, where the risk policy doubles the floor to 0.001 WETH, so the fixture
       * clears the floor it is actually held to with roughly 40% of headroom left, while a pool with
       * less than a third of the fixture's depth is refused. It is a fixture figure and nothing more:
       * `testnetOnly` says so, `defineAmmoraVenueDescriptor` requires that flag for any floor below one
       * whole quote asset, and `defineAmmoraRouteDeployment` refuses the venue outright on a deployment
       * whose environment is not `testnet`.
       *
       * The reference is another *registered* venue on this same execution registry trading WETH/AIV4C
       * — the ALC V4 launch curve `0x2C4e147617Ca14502c438a35a370680494E8BD7B`, registered on the
       * 10-minute registry `0xCCa3…c4eB` that this deployment pins (evidence/onchain/
       * giwa-sepolia.alc-sdk-auto-discovery-20260917.json; docs/qa/giwa-v4-isolated-deployment-20260917.md
       * §"Canary launch"). The SDK never takes a reference on trust: it accepts one only from a
       * different venue's candidate for this same pair, denominated in this same asset, and excludes
       * the pool when there is none.
       */
      valuation: {
        mode: "quote-asset",
        quoteAsset: "0x4200000000000000000000000000000000000006",
        quoteAssetDecimals: 18,
        quoteAssetLabel: "WETH",
        minimumLiquidity: 500000000000000n,
        referenceSource: "registered-venue",
        testnetOnly: true
      }
    });
    giwaSepoliaUniswapV4VenueRuntimeHashes = Object.freeze({
      "0x3819200dd891c98f0443607ac9f3116f5a1ceaa7": "0x312fbe21c83c2fe3cd64930becf79564644830c5c08fc9ff0f0b09789668b8a6",
      "0xa6c068eb674fe0ebf7d79a24944e47c40adcc30a": "0x932b476de5fe9f674f82f8cdde32bf34ca30afe05a448dc49e82b419a8ae779f",
      "0x91fc9eb5ea887beecf087eb8f035943877c01a3d": "0xdc070f0904ef40f6b8f22e20c9e3df9534cac5cd17636e7762c284af30eff27b",
      "0x794b8d559cfa850dcfc370201497d626f5991529": "0xe1ca28fd5ac0d7789c3da75163d30bb899afc0b44061018521da14350d8a07c5",
      "0x2b51363addce6c6fb688f174836b2ae45bc5e9c7": "0xc268fbc62fa8a2242cd7dc8ebc02dc0166c9a6b792d0e76f93cc2e317f02a8c5"
    });
    giwaSepoliaAutoRouteRuntimeHashes = Object.freeze({
      // First-buy helper deployed/approved at 39690780 / 39690836, successful atomic launch at 39691306.
      "0x1a19a3b0e69b33db3a2f9b2487866b4be04dd451": "0x0c2dea9d7e87f7974191b02162a131dbe38fd500681e835a2cb20b7a8b9f62e4",
      "0xade9e6def440e05640ed07c4a701c238b9fb66a8": "0x3cd701f7547bf1ba314934558d01c33cc4909756b376a90a285e1645a653219c",
      "0x3cdd7cc246cc49aea779e5e589bd175251617626": "0x1ec00147713743740d45896697607c3ad7c1bfe83a2b1303308fce4303936449",
      "0x81f18ad1654a6dfc89388c8ffffc7bb616a9f6d0": "0xa5e3c858e69dc7759f286319a1d915d4aad3bc977ce68990435034309bb006a2",
      "0x35353a2dab7426eccae6f5fb267702a542ab68fa": "0xf4bdf481252fb37bae95df148ba66e788ff59f22205d4e9c2f4df2c55c4fa173",
      "0xadd644af3a868ef4165e04ca5eac280ab5819be3": "0xdb5e4bb300c932111ac68fe35f79752b6532217abecd31535ac7e59b06eda010",
      "0xcca3e38eaa4f00e43599646a75cca164b97cc4eb": "0xd217691100337f885c4f9114608b648a2e6bcc15e9f9ab0f503049943c614a76",
      "0x176d8c2b26c6373ba7c9dd5ed8e1a626caf2f206": "0x984b7f4a5143e7df50b6e9fa10d8acfc6f73e2c40773b160d7e430a29e6ba29c",
      "0x074e4e25d1575fa2e66c7638f78c4af5283eb37c": "0xdcea75c8019820c32e10e438de0fef47a3c0106b210f20f53316489716e08c4f",
      "0x014133029714f185d976549dd4ea2d6aca9ec031": "0xb4a95aa7c6310ba650ef3b77fabf62a6f5fbe03c21fae708b4950c71316febe5",
      "0x9ebd78f3839996014238728b4c9c2f2a4e6759cb": "0x5ec422e766da1fa07cc2933f3999a3c8b36e76bdca5a4824f97b9b58c7ae7334",
      "0x303eaa3bcf86283cbfe3f0e01290c11452bf91cf": "0xc1fa11403f6df52b1f45f7dea96580d8796d5c02684a1d11d5426313e3809b48",
      "0x4200000000000000000000000000000000000006": "0xa62eedb6ad76577d404f9030968b640d14e72bdcd6428707d0d2f0f18546c294",
      "0x16ac2947598408d51999346c4bcfab5f9c5c0c65": "0x65ee94939140483e0435412378e8530014202c7198470828531fc00c4e9f3352",
      "0xa31aab5a152decd122040a0eabf97122974d4fcc": "0xb5d04cce25ab654abd49e64f468b0e8d9dba199efa3c706f75e8cace2b465431"
    });
    a = giwaSepoliaAutoRouteAddresses;
    hashes = giwaSepoliaAutoRouteRuntimeHashes;
    routeHashes = {
      ...giwaSepoliaAutoRouteRuntimeHashes,
      ...giwaSepoliaUniswapV4VenueRuntimeHashes
    };
    pin = (implementation) => ({
      poolImplementation: implementation,
      implementationRuntimeCodeHash: hashes[implementation.toLowerCase()],
      cloneRuntimeCodeHash: minimalProxyRuntimeCodeHash(implementation)
    });
    giwaSepoliaAutoRouteDeployment = defineAmmoraDeployment({
      ...giwaSepoliaPermissionless,
      slot: "v4-auto-route-20260917",
      sourceCommit: "258e87b608b8f998e550142531d108e21c7282f6",
      explorerVerification: void 0,
      startBlock: 36220000n,
      contracts: {
        ...giwaSepoliaPermissionless.contracts,
        launch: {
          ...giwaSepoliaPermissionless.contracts.launch,
          factory: a.factory,
          firstBuyExecutor: a.firstBuyExecutor,
          feePolicy: "0x17B44C14F640fD429740FA3220f47a567c62725C",
          configRegistry: "0x6d043014972b87406C4757a5f2d655A24e0b0aF9",
          mathModule: "0xbF5f52525E7415896bCa7f7cBADcEB294dF173ef",
          graduationAdapter: "0xF1A0f23036Aae88EEcecd1D9205Dd78c388fe263",
          concentratedFactory: a.concentrated,
          concentratedPositionManager: "0x089163706d9956d7baeCeDF4eAb4aD6CcE7Ca2D6",
          concentratedFeeController: "0x71Fea1fb18647986C4e02D0D06BFb6dD2491F6fE",
          compoundingFactory: a.compounding,
          compoundingFeeController: "0x00eaab75E3EA5cc68d39Ba8b7E531a0F822e4A8b"
        },
        policy: { tokenPolicyRegistry: a.policy },
        routers: {
          ...giwaSepoliaPermissionless.contracts.routers,
          native: a.nativeRouter,
          executionRegistry: "0x3CDD7cC246Cc49aEa779E5E589Bd175251617626",
          zap: "0x81f18aD1654A6dFc89388C8FFFFc7BB616a9f6d0"
        }
      }
    });
    giwaSepoliaAutoRoute = routeDeploymentFromCore(giwaSepoliaAutoRouteDeployment, {
      source: "custom",
      finality: { kind: "confirmations", confirmations: 12 },
      blockTimeSeconds: 1,
      aggregationRouter: a.router,
      aggregationExecutionRegistry: a.registry,
      aggregationAuthorities: {
        owner: "0x13cD27a6E337097dB858C9C4FA472FbAd2F2c637",
        guardian: "0xBda1Cfd6F20d45cFd42C1fE43be713ddAbCF88f7"
      },
      aggregationRegistrationDelaySeconds: 600,
      alcAggregationAdapter: a.adapter,
      alcFactoryExecutionPin: pin(a.curveImplementation),
      aggregationFactoryExecutionPins: { concentrated: pin(a.concentratedImplementation), compounding: pin(a.compoundingImplementation) },
      uniswapV4Venue: giwaSepoliaUniswapV4Venue,
      runtimeCodeHashes: routeHashes
    });
    giwaSepoliaAutoRouteCatalog = createAmmoraRouteDeploymentCatalog([giwaSepoliaAutoRoute]);
    giwaSepoliaAutoRouteDeploymentCatalog = createAmmoraDeploymentCatalog([giwaSepoliaAutoRouteDeployment]);
    giwaSepoliaAutoRoutePoolProfiles = Object.freeze(
      ["concentrated", "compounding"].map((kind) => {
        const factory = a[kind];
        const implementation = a[kind === "concentrated" ? "concentratedImplementation" : "compoundingImplementation"];
        return Object.freeze({
          chainId: 91342,
          kind,
          factory,
          implementation,
          factoryRuntimeCodeHash: hashes[factory.toLowerCase()],
          implementationRuntimeCodeHash: hashes[implementation.toLowerCase()],
          creatorFeeSource: kind === "concentrated" ? "factory" : "quote",
          lifecycle: "current",
          executionEnabled: true,
          revision: giwaSepoliaAutoRouteDeployment.slot,
          sourceCommit: giwaSepoliaAutoRouteDeployment.sourceCommit
        });
      })
    );
    commitmentTypes = parseAbiParameters("uint256, (address pool,address tokenIn,address tokenOut,bytes venueParams)[], uint256, uint256, address, uint256, address, uint16, uint16, bool, bool");
    AmmoraPortableError = class extends Error {
      constructor(code, message, details) {
        super(message);
        this.code = code;
        this.details = details;
      }
      code;
      details;
      name = "AmmoraPortableError";
      retryable = false;
    };
    UINT256_MAX4 = (1n << 256n) - 1n;
    ADDRESS = /^0x[0-9a-fA-F]{40}$/;
    HASH = /^0x[0-9a-fA-F]{64}$/;
    ZERO = "0x0000000000000000000000000000000000000000";
    fail = (code, message) => {
      throw new AmmoraPortableError(code, message);
    };
    defineAmmoraNativeAssetModel = (model) => {
      record2(model, "nativeAsset");
      decimals(model.nativeDecimals, "nativeDecimals");
      if (model.kind === "WRAPPED_ERC20") {
        address4(model.wrappedToken, "wrappedToken");
        address4(model.nativeRouter, "nativeRouter");
        decimals(model.wrappedTokenDecimals, "wrappedTokenDecimals");
        if (model.nativeDecimals !== model.wrappedTokenDecimals) fail("AMMORA_PORTABLE_INCOMPATIBLE_DECIMALS", "A wrapped asset must preserve native units");
      } else if (model.kind === "NATIVE_ERC20_INTERFACE") {
        address4(model.erc20Token, "erc20Token");
        decimals(model.erc20Decimals, "erc20Decimals");
        if (model.sharesUnderlyingBalance !== true || model.wrappedToken !== null || model.nativeRouter !== null || model.wrapOperation !== "UNSUPPORTED") fail("AMMORA_PORTABLE_INVALID_PROFILE", "A native ERC-20 interface is not a wrapper or native router");
        if (model.nativeDecimals < model.erc20Decimals) fail("AMMORA_PORTABLE_INCOMPATIBLE_DECIMALS", "Native precision cannot be lower than its shared ERC-20 interface");
      } else if (model.kind === "NATIVE_ONLY") {
        if (model.wrappedToken !== null || model.nativeRouter !== null) fail("AMMORA_PORTABLE_INVALID_PROFILE", "A native-only model cannot claim a wrapper or native router");
      } else fail("AMMORA_PORTABLE_UNSUPPORTED_CAPABILITY", "Unsupported native asset model");
      return freeze2(structuredClone(model));
    };
    contractAddresses = (deployment) => {
      const core = deployment.contracts;
      const model = deployment.nativeAsset;
      return [...new Map([
        core.configRegistry,
        core.launchFactory,
        core.graduationAdapter,
        core.feePolicy,
        core.tokenImplementation,
        core.curveImplementation,
        ...core.additional,
        deployment.quoteAsset.token,
        ...model.kind === "WRAPPED_ERC20" ? [model.wrappedToken, model.nativeRouter] : model.kind === "NATIVE_ERC20_INTERFACE" ? [model.erc20Token] : []
      ].map((item) => [item.toLowerCase(), item])).values()];
    };
    defineAmmoraPortableDeployment = (input) => {
      record2(input, "deployment");
      if (input.schemaVersion !== 1 || input.provenance !== "custom" || !["local", "testnet"].includes(input.environment)) {
        fail("AMMORA_PORTABLE_INVALID_PROFILE", "Only explicit custom local/testnet portable manifests are supported; no official or mainnet fallback exists");
      }
      if (!["active", "retired"].includes(input.status)) fail("AMMORA_PORTABLE_INVALID_PROFILE", "Unknown deployment slot status");
      label(input.slot, "slot");
      label(input.buildProfile, "buildProfile");
      if (!/^[a-f0-9]{40}$/i.test(input.sourceCommit)) fail("AMMORA_PORTABLE_INVALID_PROFILE", "sourceCommit must be a full commit hash");
      record2(input.chain, "chain");
      record2(input.chain.nativeCurrency, "nativeCurrency");
      if (!Number.isSafeInteger(input.chain.id) || input.chain.id <= 0) fail("AMMORA_PORTABLE_INVALID_PROFILE", "chain ID must be a positive safe integer");
      label(input.chain.name, "chain.name");
      label(input.chain.nativeCurrency.name, "nativeCurrency.name");
      label(input.chain.nativeCurrency.symbol, "nativeCurrency.symbol");
      decimals(input.chain.nativeCurrency.decimals, "nativeCurrency.decimals");
      if (!Array.isArray(input.chain.rpcUrls) || input.chain.rpcUrls.length > 8) fail("AMMORA_PORTABLE_INVALID_PROFILE", "rpcUrls must be a bounded metadata list");
      for (const raw of [...input.chain.rpcUrls, ...input.chain.blockExplorerUrl === void 0 ? [] : [input.chain.blockExplorerUrl]]) {
        let url;
        try {
          url = new URL(raw);
        } catch {
          return fail("AMMORA_PORTABLE_INVALID_PROFILE", "Invalid metadata URL");
        }
        const local = input.environment === "local" && ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname);
        if (url.username || url.password || url.search || url.hash || !(url.protocol === "https:" || local && url.protocol === "http:")) {
          fail("AMMORA_PORTABLE_INVALID_PROFILE", "Metadata URLs must be credential-free HTTPS (or local HTTP)");
        }
      }
      const model = defineAmmoraNativeAssetModel(input.nativeAsset);
      if (input.chain.nativeCurrency.decimals !== model.nativeDecimals) fail("AMMORA_PORTABLE_INCOMPATIBLE_DECIMALS", "Native currency and asset model precision differ");
      record2(input.quoteAsset, "quoteAsset");
      address4(input.quoteAsset.token, "quoteAsset.token");
      decimals(input.quoteAsset.decimals, "quoteAsset.decimals");
      label(input.quoteAsset.symbol, "quoteAsset.symbol");
      if (model.kind === "NATIVE_ERC20_INTERFACE" && (input.quoteAsset.token.toLowerCase() !== model.erc20Token.toLowerCase() || input.quoteAsset.decimals !== model.erc20Decimals)) {
        fail("AMMORA_PORTABLE_INCOMPATIBLE_DECIMALS", "The dual-interface quote must match the explicitly declared ERC-20 interface");
      }
      record2(input.contracts, "contracts");
      for (const key of ["launchFactory", "configRegistry", "graduationAdapter", "feePolicy", "tokenImplementation", "curveImplementation"]) address4(input.contracts[key], `contracts.${key}`);
      if (!Array.isArray(input.contracts.additional) || input.contracts.additional.length > 128) fail("AMMORA_PORTABLE_INVALID_PROFILE", "additional contracts must be bounded");
      input.contracts.additional.forEach((item) => address4(item, "additional contract"));
      record2(input.security, "security");
      record2(input.security.runtimeCodeHashes, "runtimeCodeHashes");
      if (!HASH.test(input.security.manifestDigest) || /^0x0{64}$/i.test(input.security.manifestDigest)) fail("AMMORA_PORTABLE_INVALID_PROFILE", "A source manifest digest is required");
      const pins = /* @__PURE__ */ new Map();
      if (Object.keys(input.security.runtimeCodeHashes).length > 256) fail("AMMORA_PORTABLE_INVALID_PROFILE", "Too many runtime pins in one manifest");
      for (const [target, hash3] of Object.entries(input.security.runtimeCodeHashes)) {
        address4(target, "runtime target");
        if (!HASH.test(hash3) || /^0x0{64}$/i.test(hash3)) fail("AMMORA_PORTABLE_MISSING_RUNTIME_HASH", "Invalid runtime code hash");
        if (pins.has(target.toLowerCase())) fail("AMMORA_PORTABLE_INVALID_PROFILE", "Duplicate case-insensitive runtime target");
        pins.set(target.toLowerCase(), hash3);
      }
      for (const target of contractAddresses(input)) if (!pins.has(target.toLowerCase())) fail("AMMORA_PORTABLE_MISSING_RUNTIME_HASH", `Runtime pin missing for ${target}`);
      return freeze2(structuredClone(input));
    };
    UINT256_MAX5 = (1n << 256n) - 1n;
    UINT256_MAX6 = (1n << 256n) - 1n;
    UINT256_MAX7 = (1n << 256n) - 1n;
    UINT256_MAX8 = (1n << 256n) - 1n;
    CONTEXT_TYPEHASH = keccak256(stringToHex(
      "AmmoraRestrictedContext(uint256 chainId,bytes32 marketId,uint64 policyVersion,address pool,address asset,uint8 action,address subject,address operator,address recipient,uint256 reference,uint256 deadline)"
    ));
    UINT128_MAX3 = (1n << 128n) - 1n;
    UINT256_MAX9 = (1n << 256n) - 1n;
    PROTOCOL_LIQUIDITY_MIGRATION_FEE_BPS = BigInt(AMMORA_PROTOCOL_LIQUIDITY_MIGRATION_FEE_BPS);
    TAMM_TOKEN_DECIMALS = 6;
    TAMM_TOTAL_SUPPLY_RAW = 1000000000n * 10n ** BigInt(TAMM_TOKEN_DECIMALS);
    TAMM_SALE_ALLOCATION_RAW = 800000000n * 10n ** BigInt(TAMM_TOKEN_DECIMALS);
    TAMM_MIGRATION_BASE_BUDGET_RAW = 200000000n * 10n ** BigInt(TAMM_TOKEN_DECIMALS);
    UINT64 = (1n << 64n) - 1n;
    UINT128 = (1n << 128n) - 1n;
    UINT256 = (1n << 256n) - 1n;
    MAX_LAUNCH_VESTING_SECONDS = 730n * 86400n;
    giwaSepoliaTokenLockDeployment = Object.freeze({
      chainId: 91342,
      factory: "0x191E814b1f4a6A66377775477671E7890c9Da799",
      implementation: "0x1c7Ae6E6d6d619C3ebB431c6C2e1c79432361927",
      tokenPolicyRegistry: "0xADD644Af3a868Ef4165e04CA5eac280ab5819bE3",
      factoryRuntimeCodeHash: "0x23015730fc251ce2cc43746d500867a79063a024856268e72b4ccee06688d592",
      implementationRuntimeCodeHash: "0x768ea5b3d59819d9b7d1ca5a22fe55b2ff5157771ea1d5d7660bb10b9c17fd6e"
    });
    giwaSepoliaAtomicLaunchDeployment = defineAmmoraPortableDeployment({
      "schemaVersion": 1,
      "provenance": "custom",
      "environment": "testnet",
      "slot": "giwa-auto-route-atomic-20261027",
      "status": "active",
      "sourceCommit": "258e87b608b8f998e550142531d108e21c7282f6",
      "buildProfile": "reviewed-prague-viaIR-optimizer1",
      "chain": {
        "id": 91342,
        "name": "GIWA Sepolia",
        "nativeCurrency": {
          "name": "Ether",
          "symbol": "ETH",
          "decimals": 18
        },
        "rpcUrls": [
          "https://sepolia-rpc.giwa.io"
        ],
        "blockExplorerUrl": "https://sepolia-explorer.giwa.io"
      },
      "nativeAsset": {
        "kind": "WRAPPED_ERC20",
        "nativeDecimals": 18,
        "wrappedToken": "0x4200000000000000000000000000000000000006",
        "wrappedTokenDecimals": 18,
        "nativeRouter": "0xade9E6dEF440E05640ed07c4a701C238B9FB66a8"
      },
      "quoteAsset": {
        "token": "0x4200000000000000000000000000000000000006",
        "symbol": "WETH",
        "decimals": 18
      },
      "contracts": {
        "configRegistry": "0x6d043014972b87406C4757a5f2d655A24e0b0aF9",
        "launchFactory": "0x35353a2Dab7426EcCAe6f5FB267702a542ab68fA",
        "graduationAdapter": "0xF1A0f23036Aae88EEcecd1D9205Dd78c388fe263",
        "feePolicy": "0x17B44C14F640fD429740FA3220f47a567c62725C",
        "tokenImplementation": "0xdc578698C39E874eE5df1e12FD68F9ad38A4b4CA",
        "curveImplementation": "0x014133029714f185D976549Dd4Ea2d6Aca9EC031",
        "additional": [
          "0x9eBD78f3839996014238728b4c9C2f2A4e6759Cb",
          "0x303EaA3BcF86283CBfe3f0E01290C11452bF91cf",
          "0x1a19a3b0e69b33db3a2f9b2487866b4be04dd451"
        ]
      },
      "security": {
        "runtimeCodeHashes": {
          "0x6d043014972b87406c4757a5f2d655a24e0b0af9": "0xd74516d51f2d02dba03d09828ecfa1bcbca363b295765cf57f8c07401826b257",
          "0x35353a2dab7426eccae6f5fb267702a542ab68fa": "0xf4bdf481252fb37bae95df148ba66e788ff59f22205d4e9c2f4df2c55c4fa173",
          "0xf1a0f23036aae88eececd1d9205dd78c388fe263": "0xa44b825427fcc8a97db886cf2f7f972ecead0246889572c9318cd5ad31d06c5a",
          "0x17b44c14f640fd429740fa3220f47a567c62725c": "0x740e954bc72b72e0c1661ef54399fbbda7bedd0d116c8daf2f16ba42346d58f3",
          "0xdc578698c39e874ee5df1e12fd68f9ad38a4b4ca": "0x5015fe10340c7e9d4d2e5c970f9367924823ca763aa16045f0cc9f380c0bbac5",
          "0x014133029714f185d976549dd4ea2d6aca9ec031": "0xb4a95aa7c6310ba650ef3b77fabf62a6f5fbe03c21fae708b4950c71316febe5",
          "0x9ebd78f3839996014238728b4c9c2f2a4e6759cb": "0x5ec422e766da1fa07cc2933f3999a3c8b36e76bdca5a4824f97b9b58c7ae7334",
          "0x303eaa3bcf86283cbfe3f0e01290c11452bf91cf": "0xc1fa11403f6df52b1f45f7dea96580d8796d5c02684a1d11d5426313e3809b48",
          "0x1a19a3b0e69b33db3a2f9b2487866b4be04dd451": "0x0c2dea9d7e87f7974191b02162a131dbe38fd500681e835a2cb20b7a8b9f62e4",
          "0x4200000000000000000000000000000000000006": "0xa62eedb6ad76577d404f9030968b640d14e72bdcd6428707d0d2f0f18546c294",
          "0xade9e6def440e05640ed07c4a701c238b9fb66a8": "0x3cd701f7547bf1ba314934558d01c33cc4909756b376a90a285e1645a653219c"
        },
        "manifestDigest": "0xdde8108f163d958a70c1609a98708c417a06dfd20644bb0fe0534a122067291a"
      }
    });
    giwaSepoliaAtomicLaunchTargets = Object.freeze({
      firstBuyExecutor: giwaSepoliaAutoRouteAddresses.firstBuyExecutor,
      concentratedFactory: giwaSepoliaAutoRouteDeployment.contracts.launch.concentratedFactory,
      compoundingFactory: giwaSepoliaAutoRouteDeployment.contracts.launch.compoundingFactory
    });
    AMMORA_ARC_TESTNET = Object.freeze({
      chainId: 5042002,
      name: "Arc Testnet",
      httpRpcUrls: Object.freeze([
        "https://rpc.testnet.arc.network",
        "https://rpc.drpc.testnet.arc.network"
      ]),
      webSocketRpcUrl: "wss://rpc.testnet.arc.network",
      blockExplorerUrl: "https://testnet.arcscan.app",
      nativeCurrency: Object.freeze({ name: "USDC", symbol: "USDC", decimals: 18 }),
      usdc: getAddress("0x3600000000000000000000000000000000000000"),
      usdcDecimals: 6,
      create2Factory: getAddress("0x4e59b44847b379578588920cA78FbF26c0B4956C"),
      multicall3: getAddress("0xcA11bde05977b3631167028862bE2a173976CA11"),
      permit2: getAddress("0x000000000022D473030F116dDEE9F6B43aC78BA3"),
      /** Native 18-decimal USDC Transfer emitter observed in Arc execution receipts. */
      nativeTransferEmitter: getAddress("0xfffffffffffffffffffffffffffffffffffffffe"),
      finality: Object.freeze({ kind: "DETERMINISTIC_BFT", confirmations: 1 }),
      evmBaseline: "prague"
    });
    PARTNER_GRADUATION_VERSION = keccak256(stringToHex("AMMORA_PARTNER_GRADUATION_V1"));
    arlV5FactoryAbi = [
      { "type": "constructor", "inputs": [{ "name": "owner_", "type": "address", "internalType": "address" }, { "name": "tokenPolicy_", "type": "address", "internalType": "address" }, { "name": "feePolicy_", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable" },
      { "type": "function", "name": "FEE_EXECUTION_WINDOW", "inputs": [], "outputs": [{ "name": "", "type": "uint40", "internalType": "uint40" }], "stateMutability": "view" },
      { "type": "function", "name": "MINIMUM_FEE_DELAY", "inputs": [], "outputs": [{ "name": "", "type": "uint40", "internalType": "uint40" }], "stateMutability": "view" },
      { "type": "function", "name": "acceptOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
      { "type": "function", "name": "cancelPoolFees", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "proposalId", "type": "bytes32", "internalType": "bytes32" }], "outputs": [], "stateMutability": "nonpayable" },
      { "type": "function", "name": "createPool", "inputs": [{ "name": "params", "type": "tuple", "internalType": "struct ArlV5Types.CreatePoolParamsV5", "components": [{ "name": "baseToken", "type": "address", "internalType": "address" }, { "name": "quoteToken", "type": "address", "internalType": "address" }, { "name": "creator", "type": "address", "internalType": "address" }, { "name": "initialPositionOwner", "type": "address", "internalType": "address" }, { "name": "sqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "liquidity", "type": "uint256", "internalType": "uint256" }, { "name": "activationTime", "type": "uint40", "internalType": "uint40" }, { "name": "initialPositionPermanent", "type": "bool", "internalType": "bool" }, { "name": "compoundingFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "userSalt", "type": "bytes32", "internalType": "bytes32" }, { "name": "maxBaseAmount", "type": "uint256", "internalType": "uint256" }, { "name": "maxQuoteAmount", "type": "uint256", "internalType": "uint256" }, { "name": "minInitialSqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "maxInitialSqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "deadline", "type": "uint40", "internalType": "uint40" }] }, { "name": "feeConfig", "type": "tuple", "internalType": "struct ArlV5Types.FeeConfigV5", "components": [{ "name": "schedule", "type": "tuple", "internalType": "struct FeeSchedulerMath.Schedule", "components": [{ "name": "cliffFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "numberOfPeriods", "type": "uint16", "internalType": "uint16" }, { "name": "periodFrequency", "type": "uint32", "internalType": "uint32" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "mode", "type": "uint8", "internalType": "enum FeeSchedulerMath.Mode" }] }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }, { "name": "limits", "type": "tuple", "internalType": "struct ArlV5Types.FeeLimitsV5", "components": [{ "name": "maxBaseFeeAfterUpdateBps", "type": "uint16", "internalType": "uint16" }, { "name": "maxDynamicFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "normalMaxTotalFeeBps", "type": "uint16", "internalType": "uint16" }] }] }], "outputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "initialPositionId", "type": "uint256", "internalType": "uint256" }], "stateMutability": "nonpayable" },
      { "type": "function", "name": "executePoolFees", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "proposalId", "type": "bytes32", "internalType": "bytes32" }], "outputs": [], "stateMutability": "nonpayable" },
      { "type": "function", "name": "factoryVersion", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "pure" },
      { "type": "function", "name": "feeAuthorityEpoch", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" },
      { "type": "function", "name": "feeController", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "feePolicy", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract IAmmoraProtocolFeePolicyV1" }], "stateMutability": "view" },
      { "type": "function", "name": "feePolicyVersion", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "pure" },
      { "type": "function", "name": "feeProposalNonce", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" },
      { "type": "function", "name": "feeVault", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract FeeVault" }], "stateMutability": "view" },
      { "type": "function", "name": "getCreationInfo", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct ArlV5Types.CreationInfo", "components": [{ "name": "creationCaller", "type": "address", "internalType": "address" }, { "name": "initialPositionId", "type": "uint256", "internalType": "uint256" }, { "name": "baseAmount", "type": "uint256", "internalType": "uint256" }, { "name": "quoteAmount", "type": "uint256", "internalType": "uint256" }, { "name": "creationConfigHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "policy", "type": "tuple", "internalType": "struct ArlV5Types.CreationPolicy", "components": [{ "name": "baseToken", "type": "address", "internalType": "address" }, { "name": "quoteToken", "type": "address", "internalType": "address" }, { "name": "creator", "type": "address", "internalType": "address" }, { "name": "initialPositionOwner", "type": "address", "internalType": "address" }, { "name": "requestedSqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "actualInitialSqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "liquidity", "type": "uint256", "internalType": "uint256" }, { "name": "initialPositionPermanent", "type": "bool", "internalType": "bool" }, { "name": "activationTime", "type": "uint40", "internalType": "uint40" }, { "name": "compoundingFeeBps", "type": "uint16", "internalType": "uint16" }] }, { "name": "feeConfig", "type": "tuple", "internalType": "struct ArlV5Types.FeeConfigV5", "components": [{ "name": "schedule", "type": "tuple", "internalType": "struct FeeSchedulerMath.Schedule", "components": [{ "name": "cliffFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "numberOfPeriods", "type": "uint16", "internalType": "uint16" }, { "name": "periodFrequency", "type": "uint32", "internalType": "uint32" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "mode", "type": "uint8", "internalType": "enum FeeSchedulerMath.Mode" }] }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }, { "name": "limits", "type": "tuple", "internalType": "struct ArlV5Types.FeeLimitsV5", "components": [{ "name": "maxBaseFeeAfterUpdateBps", "type": "uint16", "internalType": "uint16" }, { "name": "maxDynamicFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "normalMaxTotalFeeBps", "type": "uint16", "internalType": "uint16" }] }] }] }], "stateMutability": "view" },
      { "type": "function", "name": "getPendingPoolFees", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct ArlV5Types.PendingPoolFees", "components": [{ "name": "proposalId", "type": "bytes32", "internalType": "bytes32" }, { "name": "nonce", "type": "uint256", "internalType": "uint256" }, { "name": "authorityEpoch", "type": "uint256", "internalType": "uint256" }, { "name": "expectedCurrentHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "patchHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "eta", "type": "uint40", "internalType": "uint40" }, { "name": "expiresAt", "type": "uint40", "internalType": "uint40" }, { "name": "patch", "type": "tuple", "internalType": "struct ArlV5Types.FeePatchV5", "components": [{ "name": "updateBaseFee", "type": "bool", "internalType": "bool" }, { "name": "baseFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "updateDynamicFee", "type": "bool", "internalType": "bool" }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }] }] }], "stateMutability": "view" },
      { "type": "function", "name": "installFeeController", "inputs": [{ "name": "controller", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" },
      { "type": "function", "name": "isPool", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" },
      { "type": "function", "name": "isRewardTokenSupported", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "pure" },
      { "type": "function", "name": "owner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "pendingOwner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "poolByKey", "inputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "poolImplementation", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "poolKey", "inputs": [{ "name": "creationCaller", "type": "address", "internalType": "address" }, { "name": "salt", "type": "bytes32", "internalType": "bytes32" }], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" },
      { "type": "function", "name": "predictPool", "inputs": [{ "name": "creationCaller", "type": "address", "internalType": "address" }, { "name": "userSalt", "type": "bytes32", "internalType": "bytes32" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "proposePoolFees", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "patch", "type": "tuple", "internalType": "struct ArlV5Types.FeePatchV5", "components": [{ "name": "updateBaseFee", "type": "bool", "internalType": "bool" }, { "name": "baseFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "updateDynamicFee", "type": "bool", "internalType": "bool" }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }] }, { "name": "expectedCurrentHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "eta", "type": "uint40", "internalType": "uint40" }], "outputs": [{ "name": "proposalId", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "nonpayable" },
      { "type": "function", "name": "protocolRecipient", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "quoteInitialLiquidity", "inputs": [{ "name": "params", "type": "tuple", "internalType": "struct ArlV5Types.CreatePoolParamsV5", "components": [{ "name": "baseToken", "type": "address", "internalType": "address" }, { "name": "quoteToken", "type": "address", "internalType": "address" }, { "name": "creator", "type": "address", "internalType": "address" }, { "name": "initialPositionOwner", "type": "address", "internalType": "address" }, { "name": "sqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "liquidity", "type": "uint256", "internalType": "uint256" }, { "name": "activationTime", "type": "uint40", "internalType": "uint40" }, { "name": "initialPositionPermanent", "type": "bool", "internalType": "bool" }, { "name": "compoundingFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "userSalt", "type": "bytes32", "internalType": "bytes32" }, { "name": "maxBaseAmount", "type": "uint256", "internalType": "uint256" }, { "name": "maxQuoteAmount", "type": "uint256", "internalType": "uint256" }, { "name": "minInitialSqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "maxInitialSqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "deadline", "type": "uint40", "internalType": "uint40" }] }], "outputs": [{ "name": "baseAmount", "type": "uint256", "internalType": "uint256" }, { "name": "quoteAmount", "type": "uint256", "internalType": "uint256" }, { "name": "positionLiquidity", "type": "uint256", "internalType": "uint256" }, { "name": "actualSqrtPrice", "type": "uint128", "internalType": "uint128" }], "stateMutability": "pure" },
      { "type": "function", "name": "tokenPolicyRegistry", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract TokenPolicyRegistry" }], "stateMutability": "view" },
      { "type": "function", "name": "transferOwnership", "inputs": [{ "name": "next", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" },
      { "type": "function", "name": "withdrawPoolDeadFee", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }], "outputs": [{ "name": "deadAmount", "type": "uint256", "internalType": "uint256" }, { "name": "dustAmount", "type": "uint256", "internalType": "uint256" }], "stateMutability": "nonpayable" },
      { "type": "event", "name": "FeeAuthorityEpochChanged", "inputs": [{ "name": "epoch", "type": "uint256", "indexed": true, "internalType": "uint256" }, { "name": "owner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false },
      { "type": "event", "name": "FeeControllerInstalled", "inputs": [{ "name": "controller", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false },
      { "type": "event", "name": "OwnershipTransferStarted", "inputs": [{ "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "pendingOwner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false },
      { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false },
      { "type": "event", "name": "PoolCreated", "inputs": [{ "name": "poolKey", "type": "bytes32", "indexed": true, "internalType": "bytes32" }, { "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "creator", "type": "address", "indexed": true, "internalType": "address" }, { "name": "baseToken", "type": "address", "indexed": false, "internalType": "address" }, { "name": "quoteToken", "type": "address", "indexed": false, "internalType": "address" }, { "name": "sqrtPrice", "type": "uint128", "indexed": false, "internalType": "uint128" }, { "name": "liquidity", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "production", "type": "bool", "indexed": false, "internalType": "bool" }], "anonymous": false },
      { "type": "event", "name": "PoolDeadFeeWithdrawn", "inputs": [{ "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "recipient", "type": "address", "indexed": true, "internalType": "address" }, { "name": "deadAmount", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "roundingDust", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false },
      { "type": "event", "name": "PoolFeesCancelled", "inputs": [{ "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "proposalId", "type": "bytes32", "indexed": true, "internalType": "bytes32" }], "anonymous": false },
      { "type": "event", "name": "PoolFeesExecuted", "inputs": [{ "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "proposalId", "type": "bytes32", "indexed": true, "internalType": "bytes32" }, { "name": "policyHash", "type": "bytes32", "indexed": true, "internalType": "bytes32" }], "anonymous": false },
      { "type": "event", "name": "PoolFeesProposed", "inputs": [{ "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "proposalId", "type": "bytes32", "indexed": true, "internalType": "bytes32" }, { "name": "proposal", "type": "tuple", "indexed": false, "internalType": "struct ArlV5Types.PendingPoolFees", "components": [{ "name": "proposalId", "type": "bytes32", "internalType": "bytes32" }, { "name": "nonce", "type": "uint256", "internalType": "uint256" }, { "name": "authorityEpoch", "type": "uint256", "internalType": "uint256" }, { "name": "expectedCurrentHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "patchHash", "type": "bytes32", "internalType": "bytes32" }, { "name": "eta", "type": "uint40", "internalType": "uint40" }, { "name": "expiresAt", "type": "uint40", "internalType": "uint40" }, { "name": "patch", "type": "tuple", "internalType": "struct ArlV5Types.FeePatchV5", "components": [{ "name": "updateBaseFee", "type": "bool", "internalType": "bool" }, { "name": "baseFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "updateDynamicFee", "type": "bool", "internalType": "bool" }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }] }] }], "anonymous": false },
      { "type": "event", "name": "PublicPoolCreated", "inputs": [{ "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "creationCaller", "type": "address", "indexed": true, "internalType": "address" }, { "name": "creationConfigHash", "type": "bytes32", "indexed": true, "internalType": "bytes32" }, { "name": "initialPositionId", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "initialPositionOwner", "type": "address", "indexed": false, "internalType": "address" }, { "name": "permanent", "type": "bool", "indexed": false, "internalType": "bool" }, { "name": "actualInitialSqrtPrice", "type": "uint128", "indexed": false, "internalType": "uint128" }, { "name": "activationTime", "type": "uint40", "indexed": false, "internalType": "uint40" }, { "name": "compoundingFeeBps", "type": "uint16", "indexed": false, "internalType": "uint16" }], "anonymous": false },
      { "type": "error", "name": "FailedDeployment", "inputs": [] },
      { "type": "error", "name": "InsufficientBalance", "inputs": [{ "name": "balance", "type": "uint256", "internalType": "uint256" }, { "name": "needed", "type": "uint256", "internalType": "uint256" }] },
      { "type": "error", "name": "InvalidConfiguration", "inputs": [] },
      { "type": "error", "name": "InvalidLiquidity", "inputs": [] },
      { "type": "error", "name": "InvalidPrice", "inputs": [] },
      { "type": "error", "name": "InvalidProposal", "inputs": [] },
      { "type": "error", "name": "InvalidReserves", "inputs": [] },
      { "type": "error", "name": "Overflow", "inputs": [] },
      { "type": "error", "name": "PoolAlreadyExists", "inputs": [] },
      { "type": "error", "name": "Reentrancy", "inputs": [] },
      { "type": "error", "name": "TimelockNotReady", "inputs": [] },
      { "type": "error", "name": "TokenBalanceDeltaMismatch", "inputs": [{ "name": "token", "type": "address", "internalType": "address" }, { "name": "from", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }, { "name": "expected", "type": "uint256", "internalType": "uint256" }, { "name": "senderDebit", "type": "uint256", "internalType": "uint256" }, { "name": "recipientCredit", "type": "uint256", "internalType": "uint256" }] },
      { "type": "error", "name": "TokenBalanceQueryFailed", "inputs": [{ "name": "token", "type": "address", "internalType": "address" }, { "name": "account", "type": "address", "internalType": "address" }] },
      { "type": "error", "name": "TokenTransferCallFailed", "inputs": [{ "name": "token", "type": "address", "internalType": "address" }, { "name": "from", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }] },
      { "type": "error", "name": "Unauthorized", "inputs": [] },
      { "type": "error", "name": "UnsupportedToken", "inputs": [] }
    ];
    arlV5FeeControllerAbi = [
      { "type": "constructor", "inputs": [{ "name": "factory_", "type": "address", "internalType": "address" }, { "name": "feePolicy_", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable" },
      { "type": "function", "name": "MAX_FEE_SCHEDULE_DURATION", "inputs": [], "outputs": [{ "name": "", "type": "uint40", "internalType": "uint40" }], "stateMutability": "view" },
      { "type": "function", "name": "MAX_HIGH_FEE_DURATION", "inputs": [], "outputs": [{ "name": "", "type": "uint40", "internalType": "uint40" }], "stateMutability": "view" },
      { "type": "function", "name": "MAX_LAUNCH_BASE_FEE_BPS", "inputs": [], "outputs": [{ "name": "", "type": "uint16", "internalType": "uint16" }], "stateMutability": "view" },
      { "type": "function", "name": "MAX_NORMAL_TOTAL_FEE_BPS", "inputs": [], "outputs": [{ "name": "", "type": "uint16", "internalType": "uint16" }], "stateMutability": "view" },
      { "type": "function", "name": "MAX_POST_UPDATE_BASE_FEE_BPS", "inputs": [], "outputs": [{ "name": "", "type": "uint16", "internalType": "uint16" }], "stateMutability": "view" },
      { "type": "function", "name": "applyPoolFeePatch", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "proposalId", "type": "bytes32", "internalType": "bytes32" }, { "name": "patch", "type": "tuple", "internalType": "struct ArlV5Types.FeePatchV5", "components": [{ "name": "updateBaseFee", "type": "bool", "internalType": "bool" }, { "name": "baseFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "updateDynamicFee", "type": "bool", "internalType": "bool" }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }] }], "outputs": [{ "name": "nextHash", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "nonpayable" },
      { "type": "function", "name": "controllerVersion", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "pure" },
      { "type": "function", "name": "currentFeeBps", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "sqrtPrice", "type": "uint128", "internalType": "uint128" }], "outputs": [{ "name": "", "type": "uint16", "internalType": "uint16" }], "stateMutability": "view" },
      { "type": "function", "name": "currentFeePolicyHash", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" },
      { "type": "function", "name": "excludeFee", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "includedAmount", "type": "uint256", "internalType": "uint256" }, { "name": "", "type": "bool", "internalType": "bool" }, { "name": "sqrtPrice", "type": "uint128", "internalType": "uint128" }], "outputs": [{ "name": "excludedAmount", "type": "uint256", "internalType": "uint256" }, { "name": "fee", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" },
      { "type": "function", "name": "factory", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "feeChangeStart", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint40", "internalType": "uint40" }], "stateMutability": "view" },
      { "type": "function", "name": "feePolicy", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract IAmmoraProtocolFeePolicyV1" }], "stateMutability": "view" },
      { "type": "function", "name": "feePolicyVersion", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "pure" },
      { "type": "function", "name": "getConfig", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct ArlV5Types.PoolFeeState", "components": [{ "name": "originalSchedule", "type": "tuple", "internalType": "struct FeeSchedulerMath.Schedule", "components": [{ "name": "cliffFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "numberOfPeriods", "type": "uint16", "internalType": "uint16" }, { "name": "periodFrequency", "type": "uint32", "internalType": "uint32" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "mode", "type": "uint8", "internalType": "enum FeeSchedulerMath.Mode" }] }, { "name": "currentStaticBaseFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }, { "name": "limits", "type": "tuple", "internalType": "struct ArlV5Types.FeeLimitsV5", "components": [{ "name": "maxBaseFeeAfterUpdateBps", "type": "uint16", "internalType": "uint16" }, { "name": "maxDynamicFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "normalMaxTotalFeeBps", "type": "uint16", "internalType": "uint16" }] }, { "name": "activationTime", "type": "uint40", "internalType": "uint40" }, { "name": "compoundingFeeBps", "type": "uint16", "internalType": "uint16" }] }], "stateMutability": "view" },
      { "type": "function", "name": "getTracker", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct DynamicFeeMath.Tracker", "components": [{ "name": "lastUpdateTimestamp", "type": "uint40", "internalType": "uint40" }, { "name": "sqrtPriceReference", "type": "uint128", "internalType": "uint128" }, { "name": "volatilityAccumulator", "type": "uint128", "internalType": "uint128" }, { "name": "volatilityReference", "type": "uint128", "internalType": "uint128" }] }], "stateMutability": "view" },
      { "type": "function", "name": "includeFee", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "excludedAmount", "type": "uint256", "internalType": "uint256" }, { "name": "", "type": "bool", "internalType": "bool" }, { "name": "sqrtPrice", "type": "uint128", "internalType": "uint128" }], "outputs": [{ "name": "includedAmount", "type": "uint256", "internalType": "uint256" }, { "name": "fee", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" },
      { "type": "function", "name": "previewPoolFeePatch", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "patch", "type": "tuple", "internalType": "struct ArlV5Types.FeePatchV5", "components": [{ "name": "updateBaseFee", "type": "bool", "internalType": "bool" }, { "name": "baseFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "updateDynamicFee", "type": "bool", "internalType": "bool" }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }] }], "outputs": [{ "name": "normalized", "type": "tuple", "internalType": "struct ArlV5Types.FeePatchV5", "components": [{ "name": "updateBaseFee", "type": "bool", "internalType": "bool" }, { "name": "baseFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "updateDynamicFee", "type": "bool", "internalType": "bool" }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }] }, { "name": "nextHash", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" },
      { "type": "function", "name": "protocolRecipient", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "recordSwap", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "oldSqrtPrice", "type": "uint128", "internalType": "uint128" }, { "name": "newSqrtPrice", "type": "uint128", "internalType": "uint128" }], "outputs": [], "stateMutability": "nonpayable" },
      { "type": "function", "name": "registerPool", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "config", "type": "tuple", "internalType": "struct ArlV5Types.FeeConfigV5", "components": [{ "name": "schedule", "type": "tuple", "internalType": "struct FeeSchedulerMath.Schedule", "components": [{ "name": "cliffFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "numberOfPeriods", "type": "uint16", "internalType": "uint16" }, { "name": "periodFrequency", "type": "uint32", "internalType": "uint32" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "mode", "type": "uint8", "internalType": "enum FeeSchedulerMath.Mode" }] }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }, { "name": "limits", "type": "tuple", "internalType": "struct ArlV5Types.FeeLimitsV5", "components": [{ "name": "maxBaseFeeAfterUpdateBps", "type": "uint16", "internalType": "uint16" }, { "name": "maxDynamicFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "normalMaxTotalFeeBps", "type": "uint16", "internalType": "uint16" }] }] }, { "name": "activationTime", "type": "uint40", "internalType": "uint40" }, { "name": "compoundingFeeBps", "type": "uint16", "internalType": "uint16" }], "outputs": [], "stateMutability": "nonpayable" },
      { "type": "function", "name": "registeredPool", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" },
      { "type": "function", "name": "splitProtocolFee", "inputs": [{ "name": "pool", "type": "address", "internalType": "address" }, { "name": "amount", "type": "uint256", "internalType": "uint256" }, { "name": "referrer", "type": "address", "internalType": "address" }], "outputs": [{ "name": "primary", "type": "uint256", "internalType": "uint256" }, { "name": "secondary", "type": "uint256", "internalType": "uint256" }, { "name": "referral", "type": "uint256", "internalType": "uint256" }, { "name": "secondaryRecipient", "type": "address", "internalType": "address" }], "stateMutability": "view" },
      { "type": "function", "name": "validateCreationConfig", "inputs": [{ "name": "config", "type": "tuple", "internalType": "struct ArlV5Types.FeeConfigV5", "components": [{ "name": "schedule", "type": "tuple", "internalType": "struct FeeSchedulerMath.Schedule", "components": [{ "name": "cliffFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "numberOfPeriods", "type": "uint16", "internalType": "uint16" }, { "name": "periodFrequency", "type": "uint32", "internalType": "uint32" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "mode", "type": "uint8", "internalType": "enum FeeSchedulerMath.Mode" }] }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }, { "name": "limits", "type": "tuple", "internalType": "struct ArlV5Types.FeeLimitsV5", "components": [{ "name": "maxBaseFeeAfterUpdateBps", "type": "uint16", "internalType": "uint16" }, { "name": "maxDynamicFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "normalMaxTotalFeeBps", "type": "uint16", "internalType": "uint16" }] }] }, { "name": "activationTime", "type": "uint40", "internalType": "uint40" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct ArlV5Types.FeeConfigV5", "components": [{ "name": "schedule", "type": "tuple", "internalType": "struct FeeSchedulerMath.Schedule", "components": [{ "name": "cliffFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "numberOfPeriods", "type": "uint16", "internalType": "uint16" }, { "name": "periodFrequency", "type": "uint32", "internalType": "uint32" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "mode", "type": "uint8", "internalType": "enum FeeSchedulerMath.Mode" }] }, { "name": "dynamicFee", "type": "tuple", "internalType": "struct DynamicFeeMath.Config", "components": [{ "name": "enabled", "type": "bool", "internalType": "bool" }, { "name": "maxVolatilityAccumulator", "type": "uint32", "internalType": "uint32" }, { "name": "variableFeeControl", "type": "uint32", "internalType": "uint32" }, { "name": "binStepBps", "type": "uint16", "internalType": "uint16" }, { "name": "filterPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "decayPeriod", "type": "uint16", "internalType": "uint16" }, { "name": "reductionFactorBps", "type": "uint16", "internalType": "uint16" }, { "name": "binStepQ64", "type": "uint128", "internalType": "uint128" }] }, { "name": "limits", "type": "tuple", "internalType": "struct ArlV5Types.FeeLimitsV5", "components": [{ "name": "maxBaseFeeAfterUpdateBps", "type": "uint16", "internalType": "uint16" }, { "name": "maxDynamicFeeBps", "type": "uint16", "internalType": "uint16" }, { "name": "normalMaxTotalFeeBps", "type": "uint16", "internalType": "uint16" }] }] }], "stateMutability": "pure" },
      { "type": "event", "name": "PoolFeePatchApplied", "inputs": [{ "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "proposalId", "type": "bytes32", "indexed": true, "internalType": "bytes32" }, { "name": "policyHash", "type": "bytes32", "indexed": true, "internalType": "bytes32" }], "anonymous": false },
      { "type": "event", "name": "PoolRegistered", "inputs": [{ "name": "pool", "type": "address", "indexed": true, "internalType": "address" }, { "name": "policyHash", "type": "bytes32", "indexed": true, "internalType": "bytes32" }], "anonymous": false },
      { "type": "error", "name": "InvalidConfiguration", "inputs": [] },
      { "type": "error", "name": "InvalidDynamicFee", "inputs": [] },
      { "type": "error", "name": "InvalidSchedule", "inputs": [] },
      { "type": "error", "name": "NoChange", "inputs": [] },
      { "type": "error", "name": "Unauthorized", "inputs": [] }
    ];
    ARL_V5_VERSION = keccak256(stringToHex("AMMORA_ARL_PUBLIC_V5_1"));
    creationOutput = arlV5FactoryAbi.find((item) => item.type === "function" && item.name === "getCreationInfo").outputs[0];
    policyTuple = creationOutput.components.find((item) => item.name === "policy");
    feeTuple = creationOutput.components.find((item) => item.name === "feeConfig");
    stateTuple = arlV5FeeControllerAbi.find((item) => item.type === "function" && item.name === "getConfig").outputs[0];
    patchTuple = arlV5FactoryAbi.find((item) => item.type === "function" && item.name === "proposePoolFees").inputs[1];
    max = (1n << 256n) - 1n;
    almmFeeClaimRoutingAbi = parseAbi([
      "function FEE_CLAIM_ROUTING_VERSION() view returns(uint16)",
      "function feeClaimDelegationEpoch(uint256) view returns(uint256)",
      "function feeClaimDelegate(uint256,address) view returns(address feeOwner,address recipient,uint64 expiresAt,uint64 positionEpoch,uint256 epoch,bool anyRecipient,bool active)",
      "function setFeeClaimDelegate(uint256,address,address,uint64)",
      "function setFeeClaimDelegateAnyRecipient(uint256,address,uint64)",
      "function revokeFeeClaimDelegate(uint256,address)",
      "function revokeAllFeeClaimDelegates(uint256)",
      "function claimPositionFeeTo(uint256,address) returns(uint256 baseAmount,uint256 quoteAmount)",
      "function claimPositionFeeToChunk(uint256,int24[],address) returns(uint256 baseAmount,uint256 quoteAmount)",
      "function previewPositionFee(uint256,int24[]) view returns(uint256 baseAmount,uint256 quoteAmount)",
      "function positionFeeBaseOwed(uint256) view returns(uint256)",
      "function positionFeeQuoteOwed(uint256) view returns(uint256)",
      "event FeeClaimDelegateUpdated(uint256 indexed tokenId,address indexed delegate,address indexed recipient,address feeOwner,uint64 expiresAt,uint64 positionEpoch,uint256 epoch,bool anyRecipient)",
      "event FeeClaimDelegationEpochUpdated(uint256 indexed tokenId,uint256 epoch)"
    ]);
    rolesAbi2 = parseAbi([
      "function factory() view returns(address)",
      "function positionManager() view returns(address)",
      "function tokenPolicyRegistry() view returns(address)",
      "function rewardManager() view returns(address)",
      "function isPool(address) view returns(bool)",
      "function getPositionBins(uint256) view returns(int24[])",
      "function baseToken() view returns(address)",
      "function quoteToken() view returns(address)",
      "function permissionlessOperationBits(uint256) view returns(uint8)",
      "function permissionEpoch(uint256) view returns(uint64)",
      "function feeClaimController() view returns(address)"
    ]);
    ARLORA_LEGACY_LOCKER_MAX_ESCROW_DURATION_SECONDS = 30 * 24 * 60 * 60;
    ARLORA_PROTOCOL_FEE_ALL_PERMISSIONS = 1 | 2;
    ARLORA_LAUNCH_DISCOVERY_TAGS = [
      [BigInt(
        1
        /* Featured */
      ), "FEATURED"],
      [BigInt(
        2
        /* Verified */
      ), "VERIFIED"],
      [BigInt(
        4
        /* Community */
      ), "COMMUNITY"],
      [BigInt(
        8
        /* Partner */
      ), "PARTNER"]
    ];
    UINT40_MAX3 = 2 ** 40 - 1;
    UINT128_MAX4 = (1n << 128n) - 1n;
    UINT256_MAX10 = (1n << 256n) - 1n;
    ZERO_BYTES32 = `0x${"00".repeat(32)}`;
    DBC_AUTHORIZED_FIRST_BUY_MAGIC2 = keccak256(
      stringToHex("AMMORA_DBC_AUTHORIZED_FIRST_BUY_V1")
    ).slice(0, 10);
    DBC_MAX_VESTING_DURATION_SECONDS = 730 * 24 * 60 * 60;
    ALMM_MARKET_SYNC_MAX_TWAP_WINDOW = 7 * 24 * 60 * 60;
    ALMM_MARKET_SYNC_MAX_COOLDOWN = 7 * 24 * 60 * 60;
    Q1285 = 1n << 128n;
    ARLORA_STAKE2EARN_Q128 = 1n << 128n;
    ARLORA_STAKE2EARN_V2_MIN_DURATION = 6 * 60 * 60;
    ARLORA_STAKE2EARN_V2_MAX_DURATION = 31 * 24 * 60 * 60;
    ARLORA_STAKE2EARN_V2_MIN_POOL_CLAIM_INTERVAL = 5 * 60;
  }
});

// src/app.mjs
init_dist2();
var chain = giwaSepoliaAutoRouteDeployment.chain;
var RPC_URL = chain.rpcUrls[0];
var EXPLORER = chain.blockExplorerUrl;
var $ = (id) => document.getElementById(id);
function shortAddr(a2) {
  return a2 ? a2.slice(0, 6) + "\u2026" + a2.slice(-4) : "\u2014";
}
function fmtEth(wei) {
  const s = wei.toString().padStart(19, "0");
  const whole = s.slice(0, -18);
  let frac = s.slice(-18).replace(/0+$/, "");
  if (frac.length > 6) frac = frac.slice(0, 6);
  return frac ? `${whole}.${frac}` : whole;
}
var contracts = [
  ["Launch Factory", giwaSepoliaAutoRouteDeployment.contracts.launch.factory],
  ["Config Registry", giwaSepoliaAutoRouteDeployment.contracts.launch.configRegistry],
  ["Fee Policy", giwaSepoliaAutoRouteDeployment.contracts.launch.feePolicy],
  ["Graduation Adapter", giwaSepoliaAutoRouteDeployment.contracts.launch.graduationAdapter],
  ["ALMM Factory", giwaSepoliaAutoRouteDeployment.contracts.liquidityMarketMaker.factory],
  ["Fee Sharing Factory", giwaSepoliaAutoRouteDeployment.contracts.feeSharing.factory]
];
$("contracts").innerHTML = contracts.map(
  ([label2, addr]) => `<div class="contract"><span>${label2}</span><a href="${EXPLORER}/address/${addr}" target="_blank" rel="noopener">${shortAddr(addr)}</a></div>`
).join("");
$("chainName").textContent = `${chain.name} \xB7 chain ${chain.id}`;
$("slot").textContent = giwaSepoliaAutoRouteDeployment.slot;
async function refreshBlock() {
  try {
    const res = await fetch(RPC_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] })
    });
    const json = await res.json();
    $("block").textContent = Number(BigInt(json.result)).toLocaleString("en-US");
  } catch {
    $("block").textContent = "unavailable";
  }
}
refreshBlock();
setInterval(refreshBlock, 15e3);
function renderFeePreview() {
  const feeEth = parseFloat($("feeAmount").value || "0");
  const creatorBps = Math.round(parseFloat($("creatorShare").value || "0") * 100);
  const hasReferral = $("referral").checked;
  $("creatorShareOut").textContent = `${(creatorBps / 100).toFixed(0)}%`;
  if (!feeEth || feeEth <= 0) return;
  const totalFee = BigInt(Math.round(feeEth * 1e6)) * 10n ** 12n;
  const b = previewAmmoraLaunchFeeDistribution(totalFee, creatorBps, hasReferral);
  const rows = [
    ["Protocol", b.protocolFeeNet],
    ["Creator", b.creatorFee],
    ["Partner (launchpad)", b.partnerFee],
    ["Referral", b.referralFee]
  ];
  $("feeBreakdown").innerHTML = rows.map(([label2, wei]) => `<div class="row"><span>${label2}</span><b>${fmtEth(wei)} ETH</b></div>`).join("");
}
["feeAmount", "creatorShare", "referral"].forEach(
  (id) => $(id).addEventListener("input", renderFeePreview)
);
renderFeePreview();
var TAMM_PRICE_ETH = 1970218e-10;
function renderConvert() {
  const eth = parseFloat($("convEth").value || "0");
  $("convOut").textContent = eth > 0 ? `${(eth / TAMM_PRICE_ETH).toLocaleString("en-US", { maximumFractionDigits: 2 })} $tAMM` : "\u2014";
}
$("convEth").addEventListener("input", renderConvert);
renderConvert();
$("connect").addEventListener("click", async () => {
  const eth = window.ethereum;
  if (!eth) {
    $("wallet").textContent = "No wallet found \u2014 open this page in your wallet browser.";
    return;
  }
  try {
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chain.id.toString(16) }]
      });
    } catch (e) {
      if (e && e.code === 4902) {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x" + chain.id.toString(16),
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls: [EXPLORER]
          }]
        });
      }
    }
    $("wallet").textContent = shortAddr(accounts[0]);
  } catch {
    $("wallet").textContent = "Connection rejected";
  }
});
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
