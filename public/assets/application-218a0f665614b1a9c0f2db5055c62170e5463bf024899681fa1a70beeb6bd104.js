/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
(function() {


}).call(this);
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var nativeHints = ['native code', '[object MutationObserverConstructor]'];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @method
 * @memberof Popper.Utils
 * @argument {Function | undefined} fn the function to check
 * @returns {Boolean}
 */
var isNative = (function (fn) {
  return nativeHints.some(function (hint) {
    return (fn || '').toString().indexOf(hint) > -1;
  });
});

var isBrowser = typeof window !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var scheduled = false;
  var i = 0;
  var elem = document.createElement('span');

  // MutationObserver provides a mechanism for scheduling microtasks, which
  // are scheduled *before* the next task. This gives us a way to debounce
  // a function but ensure it's called *before* the next paint.
  var observer = new MutationObserver(function () {
    fn();
    scheduled = false;
  });

  observer.observe(elem, { attributes: true });

  return function () {
    if (!scheduled) {
      scheduled = true;
      elem.setAttribute('x-index', i);
      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
    }
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
    return window.document.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return window.document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return window.document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = window.document.documentElement;
    var scrollingElement = window.document.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var computedStyle = isIE10$1() && window.getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = +styles.marginTop.split('px')[0];
    var marginLeft = +styles.marginLeft.split('px')[0];

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = window.document.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(popper));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = window.document.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = window.document.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier.function) {
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier.function || modifier.fn;
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length - 1; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? window : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  window.addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  window.removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    window.cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var popperMarginSide = getStyleComputedProperty(data.instance.popper, 'margin' + sideCapitalized).replace('px', '');
  var sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = {};
  data.offsets.arrow[side] = Math.round(sideValue);
  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference.jquery ? reference[0] : reference;
    this.popper = popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));
/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
}(jQuery);


+function () {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this2 = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this2._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
        }
      }

      this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.NEXT);
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.PREVIOUS);
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this3 = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this3.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this4 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this4._keydown(event);
        });
      }

      if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this4.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this4.cycle(event);
        });
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREVIOUS;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREVIOUS ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this5 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this5._isSliding = false;

          setTimeout(function () {
            return $(_this5._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .show, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this6 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if ($(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this6._element.style[dimension] = '';

        _this6.setTransitioning(false);

        $(_this6._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this7 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if (!$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this7.setTransitioning(false);
        $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this8 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    SHOW: 'show'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', true);

      $(parent).toggleClass(ClassName.SHOW);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this9 = this;

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this9.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this9._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this9._element)) {
            _this9._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this9._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this10 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this10._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this11 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this11._config.focus) {
          _this11._element.focus();
        }
        _this11._isTransitioning = false;
        $(_this11._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this12 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this12._element !== event.target && !$(_this12._element).has(event.target).length) {
          _this12._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this13 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this13.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this14 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this14._handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this15 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this15._resetAdjustments();
        _this15._resetScrollbar();
        $(_this15._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this16 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this16._ignoreBackdropClick) {
            _this16._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this16._config.backdrop === 'static') {
            _this16._element.focus();
          } else {
            _this16.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this16._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this17 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this17).is(':visible')) {
          _this17.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this18 = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this18._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this19 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target && (target.offsetWidth || target.offsetHeight)) {
          // todo (fat): remove sketch reliance on jQuery position/offset
          return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this19._offsets.push(item[0]);
        _this19._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // todo (fat) this is kinda sus...
        // recursively add actives to tested nav-links
        $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this20 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.LIST)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this20._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this20._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeClass(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this21 = this;

      var active = $(container).find(Selector.ACTIVE_CHILD)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

      var complete = function complete() {
        return _this21._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (typeof Tether === 'undefined') {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: [],
    container: false
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array',
    container: '(string|element|boolean)'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._isTransitioning = false;
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this22 = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.SHOW);

        var complete = function complete() {
          var prevHoverState = _this22._hoverState;
          _this22._hoverState = null;
          _this22._isTransitioning = false;

          $(_this22.element).trigger(_this22.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this22._leave(null, _this22);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this23 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      if (this._isTransitioning) {
        throw new Error('Tooltip is transitioning');
      }
      var complete = function complete() {
        if (_this23._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this23.element.removeAttribute('aria-describedby');
        $(_this23.element).trigger(_this23.constructor.Event.HIDDEN);
        _this23._isTransitioning = false;
        _this23.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this24 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this24.element).on(_this24.constructor.Event.CLICK, _this24.config.selector, function (event) {
            return _this24.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSEENTER : _this24.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSELEAVE : _this24.constructor.Event.FOCUSOUT;

          $(_this24.element).on(eventIn, _this24.config.selector, function (event) {
            return _this24._enter(event);
          }).on(eventOut, _this24.config.selector, function (event) {
            return _this24._leave(event);
          });
        }

        $(_this24.element).closest('.modal').on('hide.bs.modal', function () {
          return _this24.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);

}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
        }
      }

      this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.NEXT);
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.PREVIOUS);
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREVIOUS;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREVIOUS ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this3 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this3._isSliding = false;

          setTimeout(function () {
            return $(_this3._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .show, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if ($(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if (!$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);
        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this3 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    SHOW: 'show'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', true);

      $(parent).toggleClass(ClassName.SHOW);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this = this;

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }
        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !$(_this4._element).has(event.target).length) {
          _this4._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this6._handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this7._resetAdjustments();
        _this7._resetScrollbar();
        $(_this7._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this9 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this9).is(':visible')) {
          _this9.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target && (target.offsetWidth || target.offsetHeight)) {
          // todo (fat): remove sketch reliance on jQuery position/offset
          return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);
        _this2._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // todo (fat) this is kinda sus...
        // recursively add actives to tested nav-links
        $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.LIST)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeClass(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var active = $(container).find(Selector.ACTIVE_CHILD)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

      var complete = function complete() {
        return _this2._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (typeof Tether === 'undefined') {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: [],
    container: false
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array',
    container: '(string|element|boolean)'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._isTransitioning = false;
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.SHOW);

        var complete = function complete() {
          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          _this._isTransitioning = false;

          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      if (this._isTransitioning) {
        throw new Error('Tooltip is transitioning');
      }
      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2.element.removeAttribute('aria-describedby');
        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
        _this2._isTransitioning = false;
        _this2.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this3 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
            return _this3.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

          $(_this3.element).on(eventIn, _this3.config.selector, function (event) {
            return _this3._enter(event);
          }).on(eventOut, _this3.config.selector, function (event) {
            return _this3._leave(event);
          });
        }

        $(_this3.element).closest('.modal').on('hide.bs.modal', function () {
          return _this3.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery); /* global Tether */
;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);











/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */


(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (typeof options.beforeSend === "function") {
          options.beforeSend(xhr, options);
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        } else {
          return fire(document, 'ajaxStop');
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return xhr.abort();
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var DragDropTouch;
(function(DragDropTouch_1) {
  "use strict";
  /**
     * Object used to hold the data that is being dragged during drag and drop operations.
     *
     * It may hold one or more data items of different types. For more information about
     * drag and drop operations and data transfer objects, see
     * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer">HTML Drag and Drop API</a>.
     *
     * This object is created automatically by the @see:DragDropTouch singleton and is
     * accessible through the @see:dataTransfer property of all drag events.
     */
  var DataTransfer = (function() {
    function DataTransfer() {
      this._dropEffect = "move";
      this._effectAllowed = "all";
      this._data = {};
    }
    Object.defineProperty(DataTransfer.prototype, "dropEffect", {
      /**
             * Gets or sets the type of drag-and-drop operation currently selected.
             * The value must be 'none',  'copy',  'link', or 'move'.
             */
      get: function() {
        return this._dropEffect;
      },
      set: function(value) {
        this._dropEffect = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DataTransfer.prototype, "effectAllowed", {
      /**
             * Gets or sets the types of operations that are possible.
             * Must be one of 'none', 'copy', 'copyLink', 'copyMove', 'link',
             * 'linkMove', 'move', 'all' or 'uninitialized'.
             */
      get: function() {
        return this._effectAllowed;
      },
      set: function(value) {
        this._effectAllowed = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DataTransfer.prototype, "types", {
      /**
             * Gets an array of strings giving the formats that were set in the @see:dragstart event.
             */
      get: function() {
        return Object.keys(this._data);
      },
      enumerable: true,
      configurable: true
    });
    /**
         * Removes the data associated with a given type.
         *
         * The type argument is optional. If the type is empty or not specified, the data
         * associated with all types is removed. If data for the specified type does not exist,
         * or the data transfer contains no data, this method will have no effect.
         *
         * @param type Type of data to remove.
         */
    DataTransfer.prototype.clearData = function(type) {
      if (type != null) {
        delete this._data[type];
      } else {
        this._data = null;
      }
    };
    /**
         * Retrieves the data for a given type, or an empty string if data for that type does
         * not exist or the data transfer contains no data.
         *
         * @param type Type of data to retrieve.
         */
    DataTransfer.prototype.getData = function(type) {
      return this._data[type] || "";
    };
    /**
         * Set the data for a given type.
         *
         * For a list of recommended drag types, please see
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Recommended_Drag_Types.
         *
         * @param type Type of data to add.
         * @param value Data to add.
         */
    DataTransfer.prototype.setData = function(type, value) {
      this._data[type] = value;
    };
    /**
         * Set the image to be used for dragging if a custom one is desired.
         *
         * @param img An image element to use as the drag feedback image.
         * @param offsetX The horizontal offset within the image.
         * @param offsetY The vertical offset within the image.
         */
    DataTransfer.prototype.setDragImage = function(img, offsetX, offsetY) {
      var ddt = DragDropTouch._instance;
      ddt._imgCustom = img;
      ddt._imgOffset = { x: offsetX, y: offsetY };
    };
    return DataTransfer;
  })();
  DragDropTouch_1.DataTransfer = DataTransfer;
  /**
     * Defines a class that adds support for touch-based HTML5 drag/drop operations.
     *
     * The @see:DragDropTouch class listens to touch events and raises the
     * appropriate HTML5 drag/drop events as if the events had been caused
     * by mouse actions.
     *
     * The purpose of this class is to enable using existing, standard HTML5
     * drag/drop code on mobile devices running IOS or Android.
     *
     * To use, include the DragDropTouch.js file on the page. The class will
     * automatically start monitoring touch events and will raise the HTML5
     * drag drop events (dragstart, dragenter, dragleave, drop, dragend) which
     * should be handled by the application.
     *
     * For details and examples on HTML drag and drop, see
     * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations.
     */
  var DragDropTouch = (function() {
    /**
         * Initializes the single instance of the @see:DragDropTouch class.
         */
    function DragDropTouch() {
      this._lastClick = 0;
      // enforce singleton pattern
      if (DragDropTouch._instance) {
        throw "DragDropTouch instance already created.";
      }
      // detect passive event support
      // https://github.com/Modernizr/Modernizr/issues/1894
      var supportsPassive = false;
      document.addEventListener("test", function() {}, {
        get passive() {
          supportsPassive = true;
          return true;
        }
      });
      // listen to touch events
      if ("ontouchstart" in document) {
        var d = document,
          ts = this._touchstart.bind(this),
          tm = this._touchmove.bind(this),
          te = this._touchend.bind(this),
          opt = supportsPassive ? { passive: false, capture: false } : false;
        d.addEventListener("touchstart", ts, opt);
        d.addEventListener("touchmove", tm, opt);
        d.addEventListener("touchend", te);
        d.addEventListener("touchcancel", te);
      }
    }
    /**
         * Gets a reference to the @see:DragDropTouch singleton.
         */
    DragDropTouch.getInstance = function() {
      return DragDropTouch._instance;
    };
    // ** event handlers
    DragDropTouch.prototype._touchstart = debounce(function(e) {
      var supportsPassive = false;
      var tm = this._touchmove.bind(this),
        opt = supportsPassive ? { passive: false, capture: false } : false;
      document.addEventListener("touchmove", tm, opt);
      var _this = this;
      if (this._shouldHandle(e)) {
        // raise double-click and prevent zooming
        if (Date.now() - this._lastClick < DragDropTouch._DBLCLICK) {
          if (this._dispatchEvent(e, "dblclick", e.target)) {
            e.preventDefault();
            this._reset();
            return;
          }
        }
        // clear all variables
        this._reset();
        // get nearest draggable element
        var src = this._closestDraggable(e.target);
        if (src) {
          // give caller a chance to handle the hover/move events
          if (
            !this._dispatchEvent(e, "mousemove", e.target) &&
            !this._dispatchEvent(e, "mousedown", e.target)
          ) {
            // get ready to start dragging
            this._dragSource = src;
            this._ptDown = this._getPoint(e);
            this._lastTouch = e;
            e.preventDefault();
            // show context menu if the user hasn't started dragging after a while
            setTimeout(function() {
              if (_this._dragSource == src && _this._img == null) {
                if (_this._dispatchEvent(e, "contextmenu", src)) {
                  _this._reset();
                }
              }
            }, DragDropTouch._CTXMENU);
          }
        }
      }
    }, 500);
    DragDropTouch.prototype._touchmove = function(e) {
      if (this._shouldHandle(e)) {
        // see if target wants to handle move
        var target = this._getTarget(e);
        if (this._dispatchEvent(e, "mousemove", target)) {
          this._lastTouch = e;
          e.preventDefault();
          return;
        }
        // start dragging
        if (this._dragSource && !this._img) {
          var delta = this._getDelta(e);
          if (delta > DragDropTouch._THRESHOLD) {
            this._dispatchEvent(e, "dragstart", this._dragSource);
            this._createImage(e);
            this._dispatchEvent(e, "dragenter", target);
          }
        }
        // continue dragging
        if (this._img) {
          this._lastTouch = e;
          e.preventDefault(); // prevent scrolling
          if (target != this._lastTarget) {
            this._dispatchEvent(this._lastTouch, "dragleave", this._lastTarget);
            this._dispatchEvent(e, "dragenter", target);
            this._lastTarget = target;
          }
          this._moveImage(e);
          this._dispatchEvent(e, "dragover", target);
        }
      }
    };
    DragDropTouch.prototype._touchend = function(e) {
      if (this._shouldHandle(e)) {
        // see if target wants to handle up
        if (this._dispatchEvent(this._lastTouch, "mouseup", e.target)) {
          e.preventDefault();
          return;
        }
        // user clicked the element but didn't drag, so clear the source and simulate a click
        if (!this._img) {
          this._dragSource = null;
          this._dispatchEvent(this._lastTouch, "click", e.target);
          this._lastClick = Date.now();
        }
        // finish dragging
        this._destroyImage();
        if (this._dragSource) {
          if (e.type.indexOf("cancel") < 0) {
            this._dispatchEvent(this._lastTouch, "drop", this._lastTarget);
          }
          this._dispatchEvent(this._lastTouch, "dragend", this._dragSource);
          this._reset();
        }
      }
    };
    // ** utilities
    // ignore events that have been handled or that involve more than one touch
    DragDropTouch.prototype._shouldHandle = function(e) {
      return e && !e.defaultPrevented && e.touches && e.touches.length < 2;
    };
    // clear all members
    DragDropTouch.prototype._reset = function() {
      this._destroyImage();
      this._dragSource = null;
      this._lastTouch = null;
      this._lastTarget = null;
      this._ptDown = null;
      this._dataTransfer = new DataTransfer();
    };
    // get point for a touch event
    DragDropTouch.prototype._getPoint = function(e, page) {
      if (e && e.touches) {
        e = e.touches[0];
      }
      return { x: page ? e.pageX : e.clientX, y: page ? e.pageY : e.clientY };
    };
    // get distance between the current touch event and the first one
    DragDropTouch.prototype._getDelta = function(e) {
      var p = this._getPoint(e);
      return Math.abs(p.x - this._ptDown.x) + Math.abs(p.y - this._ptDown.y);
    };
    // get the element at a given touch event
    DragDropTouch.prototype._getTarget = function(e) {
      var pt = this._getPoint(e),
        el = document.elementFromPoint(pt.x, pt.y);
      while (el && getComputedStyle(el).pointerEvents == "none") {
        el = el.parentElement;
      }
      return el;
    };
    // create drag image from source element
    DragDropTouch.prototype._createImage = function(e) {
      // just in case...
      if (this._img) {
        this._destroyImage();
      }
      // create drag image from custom element or drag source
      var src = this._imgCustom || this._dragSource;
      this._img = src.cloneNode(true);
      this._copyStyle(src, this._img);
      this._img.style.top = this._img.style.left = "-9999px";
      // if creating from drag source, apply offset and opacity
      if (!this._imgCustom) {
        var rc = src.getBoundingClientRect(),
          pt = this._getPoint(e);
        this._imgOffset = { x: pt.x - rc.left, y: pt.y - rc.top };
        this._img.style.opacity = DragDropTouch._OPACITY.toString();
      }
      // add image to document
      this._moveImage(e);
      document.body.appendChild(this._img);
    };
    // dispose of drag image element
    DragDropTouch.prototype._destroyImage = function() {
      if (this._img && this._img.parentElement) {
        this._img.parentElement.removeChild(this._img);
      }
      this._img = null;
      this._imgCustom = null;
    };
    // move the drag image element
    DragDropTouch.prototype._moveImage = function(e) {
      var _this = this;
      requestAnimationFrame(function() {
        if (_this._img) {
          var pt = _this._getPoint(e, true),
            s = _this._img.style;
          s.position = "absolute";
          s.pointerEvents = "none";
          s.zIndex = "999999";
          s.left = Math.round(pt.x - _this._imgOffset.x) + "px";
          s.top = Math.round(pt.y - _this._imgOffset.y) + "px";
        }
      });
    };
    // copy properties from an object to another
    DragDropTouch.prototype._copyProps = function(dst, src, props) {
      for (var i = 0; i < props.length; i++) {
        var p = props[i];
        dst[p] = src[p];
      }
    };
    DragDropTouch.prototype._copyStyle = function(src, dst) {
      // remove potentially troublesome attributes
      DragDropTouch._rmvAtts.forEach(function(att) {
        dst.removeAttribute(att);
      });
      // copy canvas content
      if (src instanceof HTMLCanvasElement) {
        var cSrc = src,
          cDst = dst;
        cDst.width = cSrc.width;
        cDst.height = cSrc.height;
        cDst.getContext("2d").drawImage(cSrc, 0, 0);
      }
      // copy style (without transitions)
      var cs = getComputedStyle(src);
      for (var i = 0; i < cs.length; i++) {
        var key = cs[i];
        if (key.indexOf("transition") < 0) {
          dst.style[key] = cs[key];
        }
      }
      dst.style.pointerEvents = "none";
      // and repeat for all children
      for (var i = 0; i < src.children.length; i++) {
        this._copyStyle(src.children[i], dst.children[i]);
      }
    };
    DragDropTouch.prototype._dispatchEvent = function(e, type, target) {
      if (e && target) {
        var evt = document.createEvent("Event"),
          t = e.touches ? e.touches[0] : e;
        evt.initEvent(type, true, true);
        evt.button = 0;
        evt.which = evt.buttons = 1;
        this._copyProps(evt, e, DragDropTouch._kbdProps);
        this._copyProps(evt, t, DragDropTouch._ptProps);
        evt.dataTransfer = this._dataTransfer;
        target.dispatchEvent(evt);
        return evt.defaultPrevented;
      }
      return false;
    };
    // gets an element's closest draggable ancestor
    DragDropTouch.prototype._closestDraggable = function(e) {
      for (; e; e = e.parentElement) {
        if (e.hasAttribute("draggable") && e.draggable) {
          return e;
        }
      }
      return null;
    };
    return DragDropTouch;
  })();
  /*private*/ DragDropTouch._instance = new DragDropTouch(); // singleton
  // constants
  DragDropTouch._THRESHOLD = 5; // pixels to move before drag starts
  DragDropTouch._OPACITY = 0.5; // drag image opacity
  DragDropTouch._DBLCLICK = 500; // max ms between clicks in a double click
  DragDropTouch._CTXMENU = 900; // ms to hold before raising 'contextmenu' event
  // copy styles/attributes from drag source to drag image element
  DragDropTouch._rmvAtts = "id,class,style,draggable".split(",");
  // synthesize and dispatch an event
  // returns true if the event has been handled (e.preventDefault == true)
  DragDropTouch._kbdProps = "altKey,ctrlKey,metaKey,shiftKey".split(",");
  DragDropTouch._ptProps = "pageX,pageY,clientX,clientY,screenX,screenY".split(
    ","
  );
  DragDropTouch_1.DragDropTouch = DragDropTouch;
})(DragDropTouch || (DragDropTouch = {}));
//# sourceMappingURL=DragDropTouchNoWijmo.js.map

;
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
/**
 * Return zodiac sugn by month and day
 *
 * @param day
 * @param month
 * @return {string} name of zodiac sign
 */

function getZodiacSign(day, month) {
  var zodiacSigns = {
    capricorn: "Козерог | capricorn",
    aquarius: "Водолей | aquarius",
    pisces: "Рыбы | pisces",
    aries: "Овен | aries",
    taurus: "Телец | taurus",
    gemini: "Близнецы | gemini",
    cancer: "Рак | cancer",
    leo: "Лев | leo",
    virgo: "Девы | virgo",
    libra: "Весы | libra",
    scorpio: "Скорпион | scorpio",
    sagittarius: "Стрелец | sagittarius"
  };

  if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
    return zodiacSigns.capricorn;
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return zodiacSigns.aquarius;
  } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return zodiacSigns.pisces;
  } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return zodiacSigns.aries;
  } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return zodiacSigns.taurus;
  } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return zodiacSigns.gemini;
  } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return zodiacSigns.cancer;
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return zodiacSigns.leo;
  } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return zodiacSigns.virgo;
  } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return zodiacSigns.libra;
  } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return zodiacSigns.scorpio;
  } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return zodiacSigns.sagittarius;
  }
}

function Ascendant(zodiname, birthtimes) {
  var zodiacSigns = {
    capricorn: "Capricorn",
    aquarius: "Aquarius",
    pisces: "Pisces",
    aries: "Aries",
    taurus: "Taurus",
    gemini: "Gemini",
    cancer: "Cancer",
    leo: "Leo",
    virgo: "Virgo",
    libra: "Libra",
    scorpio: "Scorpio",
    sagittarius: "Sagittarius"
  };

  if (zodiname == "Козерог | capricorn") {
    zodiac = 1;
  } else if (zodiname == "Водолей | aquarius") {
    zodiac = 2;
  } else if (zodiname == "Рыбы | pisces") {
    zodiac = 3;
  } else if (zodiname == "Овен | aries") {
    zodiac = 4;
  } else if (zodiname == "Телец | taurus") {
    zodiac = 5;
  } else if (zodiname == "Близнецы | gemini") {
    zodiac = 6;
  } else if (zodiname == "Рак | cancer") {
    zodiac = 7;
  } else if (zodiname == "Лев | leo") {
    zodiac = 8;
  } else if (zodiname == "Девы | virgo") {
    zodiac = 9;
  } else if (zodiname == "Весы | libra") {
    zodiac = 10;
  } else if (zodiname == "Скорпион | scorpio") {
    zodiac = 11;
  } else if (zodiname == "Стрелец | sagittarius") {
    zodiac = 12;
  }

  var pluscal = zodiac + parseInt(birthtimes);
  if (pluscal >= 12) {
    calcu = (pluscal-1) % 12;
  } else {
    calcu = pluscal - 1;
  }

  if (calcu == 1) {
    return zodiacSigns.capricorn;
  } else if (calcu == 2) {
    return zodiacSigns.aquarius;
  } else if (calcu == 3) {
    return zodiacSigns.pisces;
  } else if (calcu == 4) {
    return zodiacSigns.aries;
  } else if (calcu == 5) {
    return zodiacSigns.taurus;
  } else if (calcu == 6) {
    return zodiacSigns.gemini;
  } else if (calcu == 7) {
    return zodiacSigns.cancer;
  } else if (calcu == 8) {
    return zodiacSigns.leo;
  } else if (calcu == 9) {
    return zodiacSigns.virgo;
  } else if (calcu == 10) {
    return zodiacSigns.libra;
  } else if (calcu == 11) {
    return zodiacSigns.scorpio;
  } else if (calcu == 12) {
    return zodiacSigns.sagittarius;
  }
}


function getAge(dateString) {
  var now = new Date();
  var today = new Date(now.getYear(), now.getMonth(), now.getDate());

  var yearNow = now.getYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

  var dob = new Date(
    dateString.substring(6, 10),
    dateString.substring(0, 2) - 1,
    dateString.substring(3, 5)
  );

  var yearDob = dob.getYear();
  var monthDob = dob.getMonth();
  var dateDob = dob.getDate();
  var age = {};
  var ageString = "";
  var yearString = "";
  var monthString = "";
  var dayString = "";

  yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
  else {
    yearAge--;
    var monthAge = 12 + monthNow - monthDob;
  }

  if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
  };

  if (age.years > 1) yearString = " years";
  else yearString = " year";
  if (age.months > 1) monthString = " months";
  else monthString = " month";
  if (age.days > 1) dayString = " days";
  else dayString = " day";

  if (age.years > 0 && age.months > 0 && age.days > 0)
    ageString =
      age.years +
      yearString +
      ", " +
      age.months +
      monthString +
      ", and " +
      age.days +
      dayString +
      " old.";
  else if (age.years == 0 && age.months == 0 && age.days > 0)
    ageString = "Only " + age.days + dayString + " old!";
  else if (age.years > 0 && age.months == 0 && age.days == 0)
    ageString = age.years + yearString + " old. Happy Birthday!!";
  else if (age.years > 0 && age.months > 0 && age.days == 0)
    ageString =
      age.years + yearString + " and " + age.months + monthString + " old.";
  else if (age.years == 0 && age.months > 0 && age.days > 0)
    ageString =
      age.months + monthString + " and " + age.days + dayString + " old.";
  else if (age.years > 0 && age.months == 0 && age.days > 0)
    ageString =
      age.years + yearString + " and " + age.days + dayString + " old.";
  else if (age.years == 0 && age.months > 0 && age.days == 0)
    ageString = age.months + monthString + " old.";
  else ageString = "Oops! Could not calculate age!";

  return ageString;
}


function chinese_zodiac(year) {
  switch ((year - 4) % 12) {
    case 0:
      return "Rat";

    case 1:
      return "Ox";

    case 2:
      return "Tiger";

    case 3:
      return "Rabbit";

    case 4:
      return "Dragon";

    case 5:
      return "Snake";

    case 6:
      return "Horse";

    case 7:
      return "Goat";

    case 8:
      return "Monkey";

    case 9:
      return "Rooster";

    case 10:
      return "Dog";

    case 11:
      return "Pig";
  }
}

/*$("input")
  .keyup(function() {
    var year = $(this).val(),
      zodiac = chinese_zodiac(year);
    $("#zodiac").text(year + " is the year of the " + zodiac);
  })
  .keyup();*/



;
(function() {


}).call(this);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */

(function(factory) {
  if (typeof define === "function" && define.amd) {
    // AMD (Register as an anonymous module)
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s
        .slice(1, -1)
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\");
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, " "));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = ($.cookie = function(key, value, options) {
    // Write

    if (arguments.length > 1 && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === "number") {
        var days = options.expires,
          t = (options.expires = new Date());
        t.setMilliseconds(t.getMilliseconds() + days * 864e5);
      }

      return (document.cookie = [
        encode(key),
        "=",
        stringifyCookieValue(value),
        options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
        options.path ? "; path=" + options.path : "",
        options.domain ? "; domain=" + options.domain : "",
        options.secure ? "; secure" : ""
      ].join(""));
    }

    // Read

    var result = key ? undefined : {},
      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling $.cookie().
      cookies = document.cookie ? document.cookie.split("; ") : [],
      i = 0,
      l = cookies.length;

    for (; i < l; i++) {
      var parts = cookies[i].split("="),
        name = decode(parts.shift()),
        cookie = parts.join("=");

      if (key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  });

  config.defaults = {};

  $.removeCookie = function(key, options) {
    // Must not alter options, thus extending a fresh object...
    $.cookie(key, "", $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };
});

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */

(function($) {
  // Detect touch support
  $.support.touch = "ontouchend" in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
    return;
  }

  var mouseProto = $.ui.mouse.prototype,
    _mouseInit = mouseProto._mouseInit,
    _mouseDestroy = mouseProto._mouseDestroy,
    touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent(event, simulatedType) {
    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
      simulatedEvent = document.createEvent("MouseEvents");

    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType, // type
      true, // bubbles
      true, // cancelable
      window, // view
      1, // detail
      touch.screenX, // screenX
      touch.screenY, // screenY
      touch.clientX, // clientX
      touch.clientY, // clientY
      false, // ctrlKey
      false, // altKey
      false, // shiftKey
      false, // metaKey
      0, // button
      null // relatedTarget
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function(event) {
    var self = this;

    // Ignore the event if another widget is already being handled
    if (
      touchHandled ||
      !self._mouseCapture(event.originalEvent.changedTouches[0])
    ) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, "mouseover");

    // Simulate the mousemove event
    simulateMouseEvent(event, "mousemove");

    // Simulate the mousedown event
    simulateMouseEvent(event, "mousedown");
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function(event) {
    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was not a click
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, "mousemove");
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function(event) {
    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, "mouseup");

    // Simulate the mouseout event
    simulateMouseEvent(event, "mouseout");

    // If the touch interaction did not move, it should trigger a click
    if (!this._touchMoved) {
      // Simulate the click event
      simulateMouseEvent(event, "click");
    }

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function() {
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.bind({
      touchstart: $.proxy(self, "_touchStart"),
      touchmove: $.proxy(self, "_touchMove"),
      touchend: $.proxy(self, "_touchEnd")
    });

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function() {
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.unbind({
      touchstart: $.proxy(self, "_touchStart"),
      touchmove: $.proxy(self, "_touchMove"),
      touchend: $.proxy(self, "_touchEnd")
    });

    // Call the original $.ui.mouse destroy method
    _mouseDestroy.call(self);
  };
})(jQuery);
(function() {


}).call(this);
// The Tarot Organon by Dmitry Nets (http://github.com/dnets)
// Uh oh, global stuff
var deck = {
  // Populate deck with cards in sequence via array returned from IIFE
  cards: (function() {
    var arr = [];
    for (var i = 0, len = 77; i <= len; i++) { arr.push(i); }
    return arr;
  })(),

  shuffle: function() {
    var j, x, i;
    for (i = this.cards.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = this.cards[i - 1];
        this.cards[i - 1] = this.cards[j];
        this.cards[j] = x;
    }
  },

  reset: function() {
    this.populate();
    this.shuffle(this.cards);
  },

  populate: function() {
    var incubator = [];
    for (var i = 0, len = 77; i <= len; i++) { incubator.push(i); }
    this.cards = incubator;
  },

  getCard: function (arcanum) {
    if (arcanum) {
      var buffer;
      do { buffer = this.cards.pop(); } while(buffer > 21);
      return buffer;
    } else {
      return this.cards.pop();
    }
  }
};

function drawCard(db, e, top, left) {
  console.log(e.parent().parent().find('li').length);
  var card;
  var cardholder = $('.primal').clone(true);
  if (e.hasClass('organon-arcanum')) {
    card = deck.getCard(true);
  } else {
    card = deck.getCard();
  }
  cardholder.removeClass('primal');
  cardholder.find('img.organon-card-front').attr({
    'src': '/img/small/'+db[card].img,
    'data-toggle': 'modal',
    'data-target': '#cardModal',
    'data-card-id': card
  });
  cardholder.show();
  var offset = e.data('cardno')-1;
  cardholder.appendTo($('.organon-spread'));
  cardholder.animate({
    top: top+20,
    left: (left + (215 * (e.data('cardno')-1))-offset)
  });
  $.when(cardholder.find('.organon-card').addClass('flipped')).done(function() {
    e.removeClass('empty');
  });
}

function resetSpread(e) {
  deck.reset();
  $('.organon-card').removeClass('flipped');
  $('.organon-placeholder').removeClass('empty');
  if (e) {
    switch(e.parent().find('li').length) {
      case 1:
        $('.organon-deck-stack,.organon-card-holder').animate({left: '610', top: '40'});
        break;
      case 3:
        $('.organon-deck-stack,.organon-card-holder').animate({left: '820', top: '40'});
        break;
      case 4:
        $('.organon-deck-stack,.organon-card-holder').animate({left: '400', top: '380'});
        break;
    }
  } else {
  }
  $.when($('.organon-deck-stack,.organon-card-holder').animate({left: '+=0'})).done(function() {
    $('.organon-placeholder').addClass('empty');
    $('.organon-card-holder').not('.primal').remove();
  });
  // $('.organon-card-holder').not('.primal').remove();
}

function logCards() {
  console.log(deck.cards);
  console.log(deck.cards.length + ' cards left in the deck.');
}

function populateModal(cardDB, id, target) {
  // Populate modal title
  if (cardDB[id].suit === 'Trump') {
    $(target+' h4.modal-title').text(cardDB[id].number+' - '+cardDB[id].name);
  } else {
    $(target+' h4.modal-title').text(cardDB[id].name);
  }
  // Populate keywords
  $(target+' .modal-keywords').children().remove();
  $.each(cardDB[id].description.keywords, function(i,value) {
    $('<li><i class="fa fa-circle"></i>'+value+'</li>').appendTo(target+' .modal-keywords');
  });
  // Populate image
  $(target+' .modal-image').attr('src','./img/small/'+cardDB[id].img);
  // Populate descriptions
  // Archetype
  if (cardDB[id].description.Archetype) {
    $(target+' .modal-archetype .modal-description').text(cardDB[id].description.Archetype);
    $(target+' .modal-archetype').show();
  } else {
    $(target+' .modal-archetype').hide();
  }
  // Numerology
  if (cardDB[id].description.Numerology) {
    $(target+' .modal-numerology .modal-description').text(cardDB[id].description.Numerology);
    $(target+' .modal-numerology').show();
  } else {
    $(target+' .modal-numerology').hide();
  }
  // Planetary/Astrological/Elemental
  if (cardDB[id].description['Planetary/Astrological/Elemental']) {
    $(target+' .modal-planetary .modal-description').text(cardDB[id].description['Planetary/Astrological/Elemental']);
    $(target+' .modal-planetary').show();
  } else {
    $(target+' .modal-planetary').hide();
  }
  // Mythical/Spiritual
  if (cardDB[id].description['Mythical/Spiritual']) {
    $(target+' .modal-mythical .modal-description').text(cardDB[id].description['Mythical/Spiritual']);
    $(target+' .modal-mythical').show();
  } else {
    $(target+' .modal-mythical').hide();
  }
  // Personality
  if (cardDB[id].description.Personality) {
    $(target+' .modal-personality .modal-description').text(cardDB[id].description.Personality);
    $(target+' .modal-personality').show();
  } else {
    $(target+' .modal-personality').hide();
  }
  // Elemental
  if (cardDB[id].description.Elemental) {
    $(target+' .modal-elemental .modal-description').text(cardDB[id].description.Elemental);
    $(target+' .modal-elemental').show();
  } else {
    $(target+' .modal-elemental').hide();
  }
  // Astrology
  if (cardDB[id].description.Astrology) {
    $(target+' .modal-astrology .modal-description').text(cardDB[id].description.Astrology);
    $(target+' .modal-astrology').show();
  } else {
    $(target+' .modal-astrology').hide();
  }
  // Affirmation
  if (cardDB[id].description.Affirmation) {
    $(target+' .modal-affirmation .modal-description').text(cardDB[id].description.Affirmation);
    $(target+' .modal-affirmation').show();
  } else {
    $(target+' .modal-affirmation').hide();
  }
  // Hebrew Alphabet
  if (cardDB[id].description['Hebrew Alphabet']) {
    $(target+' .modal-hebrew .modal-description').text(cardDB[id].description['Hebrew Alphabet']);
    $(target+' .modal-hebrew').show();
  } else {
    $(target+' .modal-hebrew').hide();
  }
  // When?
  if (cardDB[id].description['When?']) {
    $(target+' .modal-when .modal-description').text(cardDB[id].description['When?']);
    $(target+' .modal-when').show();
  } else {
    $(target+' .modal-when').hide();
  }
  $(target+' .modal-light .modal-description').text(cardDB[id].description.Light);
  $(target+' .modal-shadow .modal-description').text(cardDB[id].description.Shadow);
  $(target+' .modal-story .modal-description').text(cardDB[id].description.Story);
  $(target+' .modal-relationships .modal-description').text(cardDB[id].description.Relationships);
  $(target+' .modal-work .modal-description').text(cardDB[id].description.Work);
  $(target+' .modal-spirituality .modal-description').text(cardDB[id].description.Spirituality);
  $(target+' .modal-personal .modal-description').text(cardDB[id].description['Personal Growth']);
  $(target+' .modal-fortune .modal-description').text(cardDB[id].description['Fortune Telling']);
  // Populate keywords
  $(target+' .modal-questions ul').children().remove();
  $.each(cardDB[id].description['Questions to Ask'], function(i,value) {
    $('<li><i class="fa fa-circle"></i>'+value+'</li>').appendTo(target+' .modal-questions ul');
  });
  // Populate Symbols and Insights
  $(target+' .modal-symbols tbody').children().remove();
  $.each(cardDB[id].description['Symbols and Insights'], function(key,value) {
    $('<tr><td>'+key+'</td><td>'+value+'</td></tr>').appendTo(target+' .modal-symbols tbody');
  });
}
$(function() {

  $('.organon-card-holder').on('click', function() {
    $(this).find('.organon-card').addClass('flipped');
  });

  var spreads = $('.organon-spread ul');
  $('.navbar-header p').on('click', function(e) {
    resetSpread();
    console.log('Header click');
    $('.navbar-spread li').removeClass('organon-spread-active');
    $('.organon-spread ul').fadeOut({duration: 500});
    $('.organon-deck-stack,.organon-card-holder').animate({left: '400',top: '40'});
  });

  $('.navbar-spread li').on('click', function(e) {
    if (!$(this).hasClass('organon-spread-active')) {
      switch($(this).data('spread')) {
        case 0:
          $('.organon-deck-stack,.organon-card-holder').animate({left: '610', top: '40'});
          break;
        case 1:
          $('.organon-deck-stack,.organon-card-holder').animate({left: '820', top: '40'});
          break;
        case 2:
          $('.organon-deck-stack,.organon-card-holder').animate({left: '400', top: '380'});
          break;
      }
      $(this).toggleClass('organon-spread-active');
      $(this).siblings().removeClass('organon-spread-active');
      resetSpread();
    }
    // jQuery get id from data attribute and toggle spread visibility
    spreads.eq($(this).data('spread')).fadeIn({duration: 500}).siblings().fadeOut({duration: 500});
    $('.organon-reset').show();
  });

  $('.organon-placeholder').on('click', function(e) {
    var startTop = $(this).parent().parent().position().top;
    var startLeft = $(this).parent().parent().position().left;
    if ($(this).hasClass('empty')) {
      drawCard(cardDB,$(this),startTop,startLeft);
    }
  });

  $('.organon-reset').on('click', function(e) {
    resetSpread($(this));
  });



  // Populate Encyclopedia
  // Major Arcana
  $.each(cardDB, function(index,card) {
    switch(card.suit) {
      case 'Trump':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal">'+card.number+' - '+card.name+'</a></li>').appendTo('ul.encyclopedia-list-trumps');
        break;
      case 'Wands':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-wands');
        break;
      case 'Cups':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-cups');
        break;
      case 'Swords':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-swords');
        break;
      case 'Coins':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-coins');
        break;
    }
  });
  // Populate Modal with card info
  $('.organon-card-front, .encyclopedia-list ul a').on('click', function(e) {
    var id = $(this).data('card-id');
    console.log(id);
    populateModal(cardDB, id, '#cardModal');
  });

  // Double modal scrollbar fix
  $('#cardModal, #encyclopedia').on('hidden.bs.modal', function (e) {
    if($('.modal.in').css('display') === 'block'){
      $('body').addClass('modal-open');
    }
  });
  // $('#cardModal').on('hidden.bs.modal', function (e) {
    // if($('.modal.in').css('display') === 'block'){
      // $('body').addClass('modal-open');
    // }
  // });
});

(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
var cardDB = [
  {
    "id" : "0",
    "img" : "major00.jpg",
    "name" : "The Fool",
    "suit": "Trump",
    "number": "O",
    "description": {
      "keywords": ["Freedom","Energy","Travel","Seeking","Origin","Wandering","Essence","Liberating Force","The Irrational","Chaos","Flight","Madness"],
      "Light": "Freeing yourself from limitation. Expressing joy and youthful vigor. Being open-minded. Taking a leap of faith. Attuning yourself to your instincts. Being eager or curious. Exploring your potential. Embracing innovation and change.",
      "Shadow": "Being gullible and naive. Taking unnecessary risks. Failing to be serious when required. Being silly or distracted. Lacking experience. Failing to honor well-established traditions and limits. Behaving inappropriately.",
      "Archetype": "The Divine Madman",
      "Hebrew Alphabet": "Aleph/Ox/1",
      "Numerology": "0 (off the scale; pure potential)",
      "Planetary/Astrological/Elemental": "Air",
      "Mythical/Spiritual": "Adam before the fall. Christ as a wandering holy madman. Deity wrapped in human flesh. The Holy Spirit.",
      "Story": "The Main Character as the story begins, unaware of complications to come.",
      "Relationships": "There's a reason we say we \"fall\" in love! Each new romance makes us as giddy as a total beginner. Don't allow old habits to smother opportunities for growth. You can break rules without resorting to rash action, and you don't have to be in control all the time.",
      "Work": "Leap over limits. Don't waver; now's the time to jump, even if you don't have all the facts in hand. Remember that once, every new direction was just another crazy idea. Be prepared, though. Later, your results will determine whether others deem you clever or crazy.",
      "Spirituality": "You are old and young, wise and inexperienced. Life is a cycle of cycles; find your place in the dance and start dancing. Reinvention is the key to transformation. See who you are, but acknowledge, too, the person you can be. Grace abounds; embrace it. Consider Zen meditation.",
      "Personal Growth": "Without falling for every scheme that comes your way, you can cultivate an openness to life. What are your limits? What boundaries define you? What might happen if you step outside those definitions? With eyes wide open, expand your world today.",
      "Fortune Telling": "Watch for new projects and new beginnings. Prepare to take something on faith. Something new comes your way; go for it.",
      "When?" : "Unexpectedly, if at all.",
      "Symbols and Insights": {
        "The Jester": "In the royal court, the jester's wit bought indulgence for his sharp-tongued commentary. As a result, he could say what the king (and others) could not. How might his strategy work for you?",
        "The Beggar": "While later Fools are fresh-faced characters cavorting on cliffs, earlier incarnations were beggars - the lowliest of the low, according to the Renaissance world view. How capable are you of embracing everyone, regardless of their social status?",
        "The Animal Familiar": "In different decks, different animals accompany the Fool. In the RWS, we see dog, the symbol of loyalty and instinct. In the Thoth deck, we see an entire menagerie, including a crocodile (the reptilian brain) and a tiger (violent instinct). Which quality suits you best today?",
        "The Cliff": "The Fool is often shown just one footfall short of a tumble; in other decks, he is suspended in space. In your situation, what works best: your feet on the ground or head in the clouds?",
        "Possessions": "The RWS Fool carries a bag or wallet, presumably filled with lessons from a previous life. He may carry a white rose (innocence) or a red rose (will). How might your experience, or lack thereof, be the key to your situation?"
      },
      "Questions to Ask" : ["What would I do if I felt free to take a leap?","How willing am I to be vulnerable and open?","How might past experiences help in this new situation?"]
    }
  },

  {
    "id" : "1",
    "img" : "major01.jpg",
    "name" : "The Magician",
    "suit": "Trump",
    "number": "I",
    "description": {
      "keywords": ["Capability","Initiation","Beginning","Empowerment","Activity","Dexterity","Youth","Potentiality","Expression","Disciple","Malice","Verve","Talent","Trickster","Choosing"],
      "Light": "Taking appropriate action. Receiving guidance from a higher power. Becoming a channel of divine will. Expressing masculine energy in appropriate and constructive ways. Being yourself in every way.",
      "Shadow" : "Inflating your own ego. Abusing talents. Manipulating or deceiving others. Being too aggressive. Using cheap illusions to dazzle others. Refusing to invest the time and effort needed to master your craft. Taking shortcuts.",
      "Archetype" : "The Ego/The Self",
      "Hebrew Alphabet" : "Beth/House/2",
      "Numerology" : "1 (origins, unity, seeds)",
      "Planetary/Astrological/Elemental" : "The Sun/Mercury",
      "Mythical/Spiritual" : "Thoth, the Egyptian god of wisdom, known to the Greeks as Hermes and to the Romans as Mercury. Christ working miracles. Brahma, the Creator.",
      "Story" : "Consciously or unconsciously, the main character receives or controls a resource that holds the key to the story's primary challenge.",
      "Relationships" : "A relationship should empower you. Does yours generate positive change in your life? Do you feel happier and more fulfilled? A relationship that supports your goals is to be valued; a relationship that doesn't must be changed or cast aside.",
      "Work" : "Exercise whatever authority you have. With the right resources, you'll succeed. But not everyone who appears empowered really is. With an eye toward growth, seek allies who focus on steak, not sizzle. Be a mentor ... or find one. Deploy tools and resources against well-defined goals.",
      "Spirituality" : "If others were to see you and your life as an expression of the Divine, what would their impression of the Divine be? How can you improve that perception? How can you better dedicate yourself to being a channel for positive energy in the world?",
      "Personal Growth" : "Asserting yourself can be an important step toward wholeness. When your work or life experience has given you special insights or talents, shrug off self-doubt and apply them fearlessly. Act confidently, and feelings of confidence will follow.",
      "Fortune Telling" : "A powerful man may play a role in your day. Your current situation must be seen as one element of a much larger plan.",
      "When?" : "Within three months.",
      "Symbols and Insights" : {
        "The Lemniscate" : "Symbolic of infinity and spiritual mastery, the lemniscate floats above the Magician's head; some also see it reflected in the oddly shaped brim of the Marseilles' Juggler's hat. How would access to infinite power change your situation? What would you do?",
        "The Magician's Tools" : "Very early decks depict the juggler with a wand, cups and balls, and a knifeÑtools of a common conjurer. Some later decks change these to a cup, a blade, a pentacle, and a wand, suggesting mastery over the four dimensions of life. Contemporary decks may use other symbols to suggest similar themes and additional alternatives for action. Which tool do you need today?",
        "The Upraised Wand" : "The Magician often holds aloft a wand or caduceus (the snake-entwined symbol associated with the god Hermes and the medical profession). He channels the power of heaven to bring about change on earth: \"As above, so below!\" What might heaven channel through you?",
        "Magician's Clothing" : "The Magician's robe suggests masculine empowerment. He might also wear a belt fashioned like an oroborous (a snake swallowing its own tail, suggesting constant reinvention). How might direct action or reinvention aid you?",
        "Roses and Lilies" : "The flowers at the foot of the RWS Magician suggest the unification of the masculine and feminine, associated with the alchemist's goal of spiritual refinement and perfection. Which approach takes best advantage of both your masculine and feminine perspectives?"
      },
      "Questions to Ask" : ["What am I empowered to do?","How might my abilities come into play?","To what extent am I making the most of my talents?"]
    }
  },

  {
    "id" : "2",
    "img" : "major02.jpg",
    "name" : "The Papess/High Priestess",
    "suit": "Trump",
    "number": "II",
    "description": {
      "keywords": ["Intuition","Reflection","Purity","Initiation","Gestation","Accumulation","Faith","Knowledge","Patience","Sanctuary","Fidelity","Purity","Solitude","Silence","Severity","Matriarchy","Virginity","Cold","Resignation"],
      "Light": "Listening to your feelings and intuitions. Exploring unconventional spirituality. Keeping secrets. Being receptive. Reflecting instead of acting. Observing others. Preserving purity.",
      "Shadow" : "Being aloof. Obsessing on secrets and conspiracies. Rejecting guidance from spirit or intuition. Revealing all. Ignoring gut feelings. Refusing to become involved, even when involvement is appropriate.",
      "Archetype" : "The Virgin/The Maiden",
      "Hebrew Alphabet" : "Gimel/Camel/3",
      "Numerology" : "2 (division, debate, duality)",
      "Planetary/Astrological/Elemental" : "The Moon",
      "Mythical/Spiritual" : "The feminine aspect of divinity, particularity when expressed through virginity, as with the Virgin Mary or Isis.",
      "Story" : "An unexpected event contains seeds of discord with potential to disrupt the main character's everyday world.",
      "Relationships" : "Your heart is your best source of information now; listen to it. Set, communicate, and respect sexual limits. Don't tell everything you know; one element of attraction is mystery. Still, don't be a puzzle; communicate your needs and the reasons for them. Watch and learn.",
      "Work" : "Play your cards close to the vest. Reveal your insights to a chosen few. Rather than take rash action now, keep still and observe. Hold your tongue and learn by listening. Listen to your gut instincts. When the time comes for action, you'll know.",
      "Spirituality" : "The unconventional image of a papess recalls the legend of the heretical, cross-dressing Pope Joan, whose true gender was revealed when she unexpectedly gave birth. Consider alternative spiritual paths or nontraditional applications of your familiar faith.",
      "Personal Growth" : "Learning to listen can be the most difficult lesson of all. Invest energy in the transformational discipline of silence. Disengaging from the drive to respond will free you to reflect. As an observer, you will see patterns participants will overlook.",
      "Fortune Telling" : "A mysterious woman arrives. A sexual secret may surface. Someone knows more than he or she will reveal.",
      "When?" : "Within 28 days.",
      "Symbols and Insights" : {
        "The Scroll of the Law" : "Often, the Papess or High Priestess holds an unopened book, occasionally labeled TORA (\"law\"), an anagram of TARO. What laws govern your situation? Have they been expressed, or kept secret?",
        "The Lunar Crescent" : "The Priestess is closely associated with the moon and, by extension, with all lunar cycles (including menstruation). Which cycles are at work in your situation?",
        "Boaz and Jachin" : "The B and J often seen on the columns to either side of the Priestess are the two pillars of Solomon's Temple. Their names mean \"in strength\" and \"God will establish.\" What might God (or the universe) be using your strength to establish?",
        "The Pomegranate Veil" : "Symbolizing fertility, pomegranates connect the Priestess with the myth of Persephone, whose consumption of three pomegranate seeds linked her with the underworld. The veil is the veil of the temple, symbolically marking the division between the realm of humanity and the realm of God. Might the seeds of this situation have been sown by a belief in an obstacle between you and the Divine?",
        "The Waters" : "The water often seen behind or beneath this archetype represents the unknown depths of the subconscious mind. What is your intuition telling you?"
      },
      "Questions to Ask" : ["What might a rebel against tradition do?","What isn't being said or revealed?","What could be achieved by observing and reflecting?"]
    }
  },
  {
    "id" : "3",
    "img" : "major03.jpg",
    "name" : "The Empress",
    "suit": "Trump",
    "number": "III",
    "description": {
      "keywords": ["Fertility","Productivity","Ripeness","Nurturing","Creative Outburst","Expression","Seduction","Power","Feelings","Enthusiasm","Harverst","Beauty","Nature","Desire","Abundance","Luxury","Mistress"],
      "Light": "Nurturing yourself and others. Bearing fruit. Celebrating your body. Bearing (literal or figurative) children. Reveling in luxury. Mothering those around you in positive ways. Enjoying your sexuality. Getting things done.",
      "Shadow" : "Overindulging. Being greedy. Smothering someone with attention. Debilitating someone by being overprotective. Inhibiting productivity by obsessing on productivity. Being overcome by addictive behavior.",
      "Archetype" : "The Mother",
      "Hebrew Alphabet" : "Daleth/Door/4",
      "Numerology" : "3 (expression, productivity, output)",
      "Planetary/Astrological/Elemental" : "Venus",
      "Mythical/Spiritual" : "Gaia, Mother Earth, Ishtar, DemeterÑmature, reproductive female divinity in every form. Also Aphrodite and Turan. ",
      "Story" : "A motherly or nurturing figure reminds the main character of the core values that are the essence of his or her character.",
      "Relationships" : "Without going overboard, revel in your sensuality. Take care you don't produce more than you intended; the moment is pregnant with possibility. Be lavish with demonstrations of affection. Watch for what a friend or partner needs, and then supply it in abundance.",
      "Work" : "Now is the time to get things done. Wrap up projects. Ask for resources. Meet deadlines. Move ahead. During this time of growth and expansion, be sure you have the skills and training you need. In the meantime, don't mistake a headlong rush for focused, verifiable progress.",
      "Spirituality" : "Women are the figurative and literal door to this world. This moment, too, can be a door for youÑa threshold you cross into a new awareness. Watch for physical ways to express your spiritual insights. Reconnect with nurturing, feminine images of divinity, including nature.",
      "Personal Growth" : "Your attitudes toward women (and your insights into your own feminine qualities) are likely rooted in early experiences. How can you emulate the best female role models you've encountered? How can you transcend female influences that harm or hold you back?",
      "Fortune Telling" : "Pregnancy is in the cards. An opportunity to be involved in luxurious sexuality is coming. Beware a tendency toward addiction.",
      "When?" : "Within seven and one-half months.",
      "Symbols and Insights" : {
        "Venus" : "The familiar planetary symbol for Venus often appears in illustrations for Trump 3, stressing the Empress's association with domesticity, motherhood, and female sexuality. What course of action might these themes suggest?",
        "The Scepter and Crown" : "The Empress's scepter (a symbol of authority) is topped by a cross and an orb, a sign of earthly dominion. In RWS-influenced images, the Empress wears a diadem of 12 stars, suggesting her dominion over the circle of the year. What do you have dominion over?",
        "The Cushioned Throne" : "Unlike the rigid stone throne of the Emperor, the Empress is often depicted on a cushioned throne, emphasizing themes of luxury. How might themes of comfort or indulgence impact your situation?",
        "Pregnancy/Ripeness" : "A universal sign for fertility is pregnancy; in many decks, the Empress is pregnant, emphasizing themes of fertility and productivity. In your situation, what outcome struggles to be born?",
        "The Rushing Stream" : "Unlike the vast, still, reflective body of water often shown behind the Priestess, the Empress is often seen near a rushing stream or waterfall. Is it time to put your intuition into motion?"
      },
      "Questions to Ask" : ["What would a concerned and capable mother do?","What can I do that would emphasize growth?","How can I celebrate my own sensuality and sexuality?"]
    }
  },

  {
    "id" : "4",
    "img" : "major04.jpg",
    "name" : "The Emperor",
    "suit": "Trump",
    "number": "IV",
    "description": {
      "keywords": ["Authority","Regulation","Direction","Structure","Stability","Mastery of the Material World","Domination","Power","Father","Order","Balance","Leader","Solidity","Rationalism","Support","Responsibility","Money","Security","Masculinity","Man of Power"],
      "Light": "Exercising authority. Defining limits. Directing the flow of work. Communicating clear guidelines. Being in control of yourself and others. Tempering aggressive masculinity with wisdom and experience.",
      "Shadow" : "Micromanaging. Crushing the creativity of others with a rigid, iron-fisted approach. Insisting on getting your own way. Assuming a dictatorial mindset. Using overt force to achieve your goals and maintain order.",
      "Archetype" : "The Father",
      "Hebrew Alphabet" : "He[as]/Window/5, or in some decks, Tzaddi/Fish hook/90",
      "Numerology" : "4 (stability, equality, persistence)",
      "Planetary/Astrological/Elemental" : "Mars/Aries",
      "Mythical/Spiritual" : "Masculine gods, including the Hebrew God, the Christian God, Allah, and Zeus. Patriarchs (Abraham) and lawgivers (Moses). Vishnu, the Preserver.",
      "Story" : "A stern figure seeks to control or restrain the main character by reminding him or her of responsibilities and obligations.",
      "Relationships" : "Without becoming false or deceptive, you can regulate your feelings and reactions. Beware the need to always be in control; a healthy relationship incorporates a fair division of labor. Be on the lookout for subtle (and not-so-subtle) efforts to wear the pants in the relationship.",
      "Work" : "Efficient groups depend on centralized control. Seek ways to direct the flow without micromanaging the process. Encourage leaders (including yourself) to step up to the plate and embrace their obligations. Control what you can; don't worry about the rest.",
      "Spirituality" : "The stereotypical view of religion casts organized faith in restrictive terms. Rather than be constrained by structure, consider how structure and discipline might enhance your spiritual experience. Seek guidance and direction from those who have walked the path before you.",
      "Personal Growth" : "In what ways do your attitudes toward authority seem to be shaped by your relationship with your father? A mature person recognizes that structure and authority are a requirement of civilization. Some resist purely out of habit or stubbornness; when you buck the system, be sure you have good reason to do so.",
      "Fortune Telling" : "A father figure arrives. A new employer or authority figure will give you orders. Expect discipline or correction in the near future.",
      "When?" : "Between March 20 and April 19.",
      "Symbols and Insights" : {
        "The Ankh Scepter" : "The Emperor's distinctive scepter hints at his dominion over life and death. In the Marseilles-style decks, the Emperor holds a standard orb and cross scepter. In your situation, what do you really control?",
        "The Beard" : "The Emperor is often drawn with a full beard, suggesting masculinity and maturity. Significantly, many drawings of masculine deities (including the Christian God) incorporate long, flowing beards, emphasizing transcendent authority. Who's in charge of your situation, and by what authority?",
        "The Cubic Throne" : "In stark contrast to the Empress's cushioned throne, the Emperor's seat often appears to be carved out of a single marble slab, reinforcing his monolithic authority. Would rigid control be more appropriate than gentle guidance today?",
        "Fiery Surroundings" : "The Emperor often appears in a blasted desert landscape (suggestive of Mars). Here, the emotional stream that flowed so freely past the Empress is often compressed into a weak, regulated trickle. How might strict emotional control help you now?",
        "The Ram" : "The ram, absent in early versions of the card, suggests the Emperor's ties to Aries. Traditionally, the ram symbolizes the fiery energy of Aries and, physically, the head of the body. Are your efforts fruitful, or are you just butting your head against a wall?"
      },
      "Questions to Ask" : ["How does the issue of control or regulation impact this situation?","What would a compassionate but strict father do?","What needs more control?"]
    }
  },
  {
    "id" : "5",
    "img" : "major05.jpg",
    "name" : "The Pope/Hierophant",
    "suit": "Trump",
    "number": "V",
    "description": {
      "keywords": ["Guidance","Knowledge","Revelation","Belief","Mediator","Bridge","Ideal","Wisdom","Teaching","Spiritual Power","Saintliness","Communication","Connection","Self-mastery"],
      "Light": "Teaching or guiding others. Searching for the truth. Asking for guidance from a higher power. Acknowledging the wisdom and experience of others. Taking vows. Engaging in heartfelt rituals. Volunteering.",
      "Shadow" : "Using experience as a means of manipulating or misguiding others. Being dogmatic. Favoring tradition over what is expedient or necessary. Going through the motions of empty rituals. Concealing wisdom. Restricting access to spiritual truths or the gods.",
      "Archetype" : "The Guardian/The Church/Faith",
      "Hebrew Alphabet" : "Vau/Nail or Spike/6",
      "Numerology" : "5 (instability, resistance, confrontation, evolution)",
      "Planetary/Astrological/Elemental" : "Taurus/Earth",
      "Mythical/Spiritual" : "The Christ, the Apostle Peter, Buddha, Mohammed. Popes, priests, and intercessors of every faith and tradition",
      "Story" : "A skilled advisor or capable initiate teaches the main character the secrets he or she needs to succeed.",
      "Relationships" : "A relationship should be more than just going through the motions. Seek the deeper meaning of small gestures and daily chores. Emphasize signs that those involved have real faith in the partnership. If necessary, seek guidance from a spiritual leader or counselor.",
      "Work" : "Seek training or a mentor, particularly if you are having difficulty understanding a complex assignment or when adjusting to new professional surroundings. See your daily work as an expression of your faith. Take traditional routes instead of innovative, unproven measures.",
      "Spirituality" : "See familiar spiritual symbols in a new light by pursuing a deeper understanding of them. If you're a lone practitioner, consider the value of joining a like-minded group or learning from a worthy teacher. What are the larger truths behind the rituals or stories you've learned?",
      "Personal Growth" : "In time, everyone must deal with conflicts between experience and faith. Where do you find your personal center? Values dictate behavior, so work to define what you truly believe in. Don't shy away from the big questions, but be wary of gurus bearing quick answers.",
      "Fortune Telling" : "Expect to be caught in a misdeed and punished accordingly. Pray for forgiveness and confess wrongdoings. A more experienced man, spiritual leader, or father figure will come into your life.",
      "When?" : "Between April 20 and May 20.",
      "Symbols and Insights" : {
        "The Three-tiered Hat" : "he three-tiered crown, called a triregnum or tiara, of the Pope dates to at least the thirteenth century. The number 3 suggests a connection with the trinity. How is your own faith (or lack of faith) reflected in this situation?",
        "The Triple-cross Scepter" : "The Papal Cross is widely recognized as a symbol of the Pope's authority and office. Crowley's version in the Thoth deck is said to represent three distinct eras, concluding with the age of Horus, in which old beliefs are abandoned. Are there outdated beliefs you'd do well to abandon?",
        "The Kneeling Acolytes" : "The acolytes or ministers wear robes adorned with roses and lilies in RWS-influenced decks, suggesting a connection with repressed male and female sexual energies. What urges or inclinations are you being called upon to control?",
        "The Crossed Keys" : "The crossed keys are associated with St. Peter, considered by some traditions to be the first pope. Jesus gave Peter the keys of the kingdom. If you were in a respected position of power, what changes would you make?",
        "The Number 5" : "The five points of the Hierophant's body (head, hands, feet) suggest an upright, five-pointed star. This upright pentagram places the head above the body, emphasizing the mind's ability to force bodily urges into submission. Five, the number of the senses, is also the number of humanity. Which might your situation call for: your head or your humanity?"
      },
      "Questions to Ask" : ["What role might tradition or religion play in this situation?","Who authored the rules? Who enforces them? Why?","How might an experienced guide impact this situation?"]
    }
  },
  {
    "id" : "6",
    "img" : "major06.jpg",
    "name" : "The Lovers",
    "suit": "Trump",
    "number": "VI",
    "description": {
      "keywords": ["Love","Passion","Unity","Choice","Heart","Emotions","Siblings","Menage-a-trois","Community","Conflict","Social Life","Joy","Friendship","Choice to be made","New Union"],
      "Light": "Being in love. Showing your love to others. Expressing passion or romantic feelings. Aligning yourself with groups or like-minded others. Bringing people together. Making well-informed decisions. ",
      "Shadow" : "Debilitating passion. Allowing an unhealthy desire for love to motivate destructive behavior. Disrupting unity. Working against the best interests of those who care about you. Ill-informed decisions.",
      "Archetype" : "The Lover/Sexual Awakening",
      "Hebrew Alphabet" : "Zain/Sword/7",
      "Numerology" : "6 (cooperation, collaboration, interaction)",
      "Planetary/Astrological/Elemental" : "Gemini",
      "Mythical/Spiritual" : "Obviously, Adam and Eve, who are depicted in RWS-influenced decks. Also Venus and Cupid, Aphrodite and Eros.",
      "Story" : "The main character encounters a love interest or must choose between love and doing what is right.",
      "Relationships" : "This is a time to celebrate unity, love, and romance in all its forms. Souls are coming together, and a unique opportunity exists for people to enjoy an unusual degree of interdependence and cooperation. Let your heart guide your choices today.",
      "Work" : "Call group meetings, pursue mergers, and find solid business partners during this rare opportunity for successful cooperation. Pay special attention to opportunities to supply what others need. Lay a foundation for future success by watching for team members with skills you lack. Make choices based on what you truly enjoy doing.",
      "Spirituality" : "Open yourself to new and diverse spiritual experiences. See opportunities to love others (even romantically) as chances to be a channel for divine love. Every small blessing you receive is an expression of universal love; give thanks and embrace what life brings you.",
      "Personal Growth" : "Now is a good time to deal with outstanding issues related to sexuality and relationships. Rather than be overwhelmed with Hollywood-style passion, consider the extent to which your qualities might be balanced or enhanced by those of your potential partner. In other areas, find your passion and pursue it.",
      "Fortune Telling" : "A new personal or professional relationship blossoms. Sexual opportunities abound. Unexpectedly, a friend becomes a lover.",
      "When?" : "Between May 21 and June 20.",
      "Symbols and Insights" : {
        "The Angel" : "Whether seen as Cupid (in the Marseilles deck) or Eros (in the RWS-influenced decks), the influence of the angel draws the lovers together. If you were Cupid, whom might you bring together to resolve your challenge?",
        "The Trees" : "Adam and Eve ate of the Tree of the Knowledge of Good and Evil but were driven out of the Garden of Eden before they could partake of the Tree of Life and become \"as gods.\" Choices have consequences; note how RWS-influenced deck and the Marseilles deck all drive this point home.",
        "The Serpent" : "An expert at manipulating loopholes, the Biblical serpent tempted Eve. In your situation, should you honor the letter or the spirit of the law?",
        "The Wedding" : "Centuries ago, alchemists (the forefathers of modern chemists) used the phrase \"the Alchemical Wedding\" to describe the moment when long-divided opposites were brought together to create something new. They saw this reunion as a symbol for personal transformation and, eventually, enlightenment. What enlightenment might you achieve by bringing together opposing points of view?",
        "The Players" : "RWS-influenced decks depict Adam and Eve. The Marseilles decks depict a young man making a choice between two women: a young wife and (depending on whom you ask) his mother or an older woman. Who are the players in your situation, and what choices do they face?"
      },
      "Questions to Ask" : ["What guides my choices?","What is my heart leading me to do?","How might this decision transform me as a person?"]
    }
  },
  {
    "id" : "7",
    "img" : "major07.jpg",
    "name" : "The Chariot",
    "suit": "Trump",
    "number": "VII",
    "description": {
      "keywords": ["Advancement","Victory","Triumph","Success","Action","Ease","Journey","Conqueror","Messenger"],
      "Light": "Breaking through barriers. Moving forward with confidence and authority. Reaching the pinnacle of success. Basking in the glory of achievement. Guiding an effort to total victory. Establishing yourself as a worthy leader.",
      "Shadow" : "Resting on laurels. Riding roughshod over the feelings or expectations of others. Focusing more on past successes than future opportunities. Failing to rein in impulsive behavior. ",
      "Archetype" : "The Victorious Hero",
      "Hebrew Alphabet" : "Cheth/Fence/8",
      "Numerology" : "7 (imagination, inner work, psychology)",
      "Planetary/Astrological/Elemental" : "Cancer",
      "Mythical/Spiritual" : "Odysseus. Jason. The search for the Holy Grail. Christ's triumphal entry into Jerusalem.",
      "Story" : "With an eye toward solving the story's central problem, the main character commits to a quest, usually at the end of the first act. ",
      "Relationships" : "Moving forward to mutual victory requires trust and cooperation. If you have this already, depend on it during an upcoming challenge. If you lack it, consider what choices have prevented forming this kind of bond. Don't rest on your laurels; successful romance is an ongoing commitment.",
      "Work" : "What do you need to move forward? Now is the time to summon resources and plan for future success. Past successes might not be an indicator of current value. Remember that employers tend to ask \"What have you done for me lately?\" Work accordingly.",
      "Spirituality" : "Celebrate spiritual achievement, but be aware that a sense of having arrived can be the first step toward disastrous vanity. The goal is not to be a guru, but to achieve balance and stability. As you make progress, extend a helping hand to others who still await their chariot moment.",
      "Personal Growth" : "Reaching a new plane of maturity is exciting, so some celebration is in order. Every ending, though, is a new beginning; keep an eye fixed on further growth. Having reached the limits of mundane success, it's time to work on deeper transformation.",
      "Fortune Telling" : "Victory is a certainty. Move ahead with all plans. Beware the jealousy of others.",
      "When?" : "Between June 21 and July 22.",
      "Symbols and Insights" : {
        "The Canopy" : "Stars imprinted on the canopy of the Chariot signify the occupant's mastery over all things under heaven. How has past success (or a lack of it) played into this situation?",
        "The Sphinxes" : "Horses draw the Marseilles Chariot, but in other decks, sphinxes - keepers of riddles, wisdom, and hidden knowledge - pull the carriage. One is black and the other white, symbolizing the charioteer's dominion over masculine and feminine forces. Who guards the answer to your riddle? ",
        "The Scepter" : "The wand, a symbol of power used throughout the deck, appears in RWS-inspired decks as the charioteer's scepter. How should you channel your power today?",
        "Achievement vs. momentum" : "In some decks, the illustration makes it difficult to tell whether the Chariot is standing still (having reached a strategic position) or moving forward (as if mounting an attack). Is it time for strategic thinking or action?",
        "The Lingam-Yoni" : "The lingam is a cylindrical or phallic shape associated with male sexual potency; the yoni, shaped like a bowl, is considered the source of all that exists. How might your situation change if you commanded unlimited creative energy?"
      },
      "Questions to Ask" : ["To what extent have I arrived? What will my next challenge be?","How can I use past achievements to their best advantage?","What would the criteria for real and meaningful success be?"]
    }
  },
  {
    "id" : "8",
    "img" : "major08.jpg",
    "name" : "The Justice",
    "suit": "Trump",
    "number": "VIII",
    "description": {
      "keywords": ["Balance","Perfection","Woman","Maternity","Deceit","Taking a Stand","Judging","Valor","Authorizing","Law","Fairness","Objectivity","Trial","Stability"],
      "Light": "Making an objective decision. Weighing an issue carefully before taking action. Appropriately scaling your reaction to a situation. Getting all the facts. Considering evidence. Deliberating.",
      "Shadow" : "Delivering harsh criticism. Obsessing on rules and regulations. Playing by the book even when it is destructive or counterproductive to do so. Confusing snap decisions with timely action. Playing favorites.",
      "Archetype" : "The Law",
      "Hebrew Alphabet" : "Lamed/Outstretched Arms/30 or Theth/Snake/9",
      "Numerology" : "8 (movement, work) or 11 = 1 + 1 = 2 (debate, duality)",
      "Planetary/Astrological/Elemental" : "Libra or Leo",
      "Mythical/Spiritual" : "Themis or Justitia. Ma'at. Solomon dividing a baby. The Sword of Damocles. The giving of the Ten Commandments.",
      "Story" : "During the main character's initial challenge, his or her ability, knowledge, or personal suitability is found to be lacking.",
      "Relationships" : "Relationships are rarely 50/50 propositions, but the closer you come to an even division of responsibility, the better. What do you really need to be satisfied? Knowing your standards empowers you to evaluate your feelings more clearly.",
      "Work" : "Work toward a more equitable division of labor. Learn to delegate. Evaluate your own work using the same standard you bring to bear on the work of others. Know what matters most, and prioritize accordingly.",
      "Spirituality" : "In all things, seek balance. When faced with a decision, quiet your mind and allow your heart to weigh the moment. Trust in the law of karma; avoid personal efforts to mete out universal justice.",
      "Personal Growth" : "Everyone faces limitations of some kind. Learn your own limits. Rather than allow them to define you, use what you know to better position yourself for success. Learn when to say yes; know when to say no.",
      "Fortune Telling" : "A legal verdict will be rendered soon. Someone is making a decision. You need to get the facts.",
      "When?" : "If Justice = 8, between July 23 and August 27 (Leo). If Justice = 11, between September 23 and October 22 (Libra).",
      "Symbols and Insights" : {
        "The Sword" : "Swords symbolize decision-making and clarity, along with the responsibility such talents bring. (Ask Damocles!) What information is crucial to your decision? What are the pros and cons?",
        "The Scales" : "Scales have long been a symbol of balance and evaluation. The Egyptian god Ma'at weighed souls to determine purity of heart. What needs to be evaluated or weighed today?",
        "The Blindfold" : "Themis does not wear a blindfold, emphasizing her ability to foresee the future; Justitia does, emphasizing her objectivity. How can you enhance your own objectivity?",
        "The Temple Columns" : "In RWS-influenced decks, we once again see the pillars from Solomon's Temple. The veil now represents human law. What would a judge or lawyer do in your situation?"
      },
      "Questions to Ask" : ["To what extent is your life (or work) balanced?","How can you achieve greater objectivity?","What course of action would be fair to everyone concerned?"]
    }
  },
  {
    "id" : "9",
    "img" : "major09.jpg",
    "name" : "The Hermit",
    "suit": "Trump",
    "number": "VIIII",
    "description": {
      "keywords": ["Solitude","Experience","Stillness","Withdrawal","Wisdom","Letting Go","Crisis","Ancient","Silence","Ascetic","Grandfather","Old Age","Absent or Cold Father","Passage"],
      "Light": "Becoming or seeking out a guru. Going on a retreat. Recharging spiritual or creative batteries. Lighting the way for those with less experience. Stepping back to gain perspective.",
      "Shadow" : "Being a loner. Fearing contact with others. Becoming a know-it-all. Inflating claims of expertise. Hiding your skills and talents out of fear of unworthiness.",
      "Archetype" : "The Holy Man",
      "Hebrew Alphabet" : "Yod/Hand/10",
      "Numerology" : "9 (fullness, readiness, ripeness)",
      "Planetary/Astrological/Elemental" : "Virgo",
      "Mythical/Spiritual" : "The Christ, while fasting 40 days in the wilderness. Chronos, the god of time. Father Time. Hermes.",
      "Story" : "On the verge of giving up, the main character withdraws, seeking clarity in isolation. He or she may receive advice from a wise person.",
      "Relationships" : "Don't be afraid of being alone. Even the closest companions need some time apart. Being involved in a partnership does not eliminate your need to be your own person. To better please others, first learn how to please yourself.",
      "Work" : "Sometimes, you have to close the door, forward calls to voice mail, and shut down your email client to get things done. Demand the space and time you need to get your assignment done. If you're overwhelmed, consider bringing in a consultant or an experienced aid.",
      "Spirituality" : "Learn to be still. Doing so is a challenge in today's hurly-burly world, but the skill offers many benefits. Focus on meditation; condition yourself to slow your thoughts and lower your blood pressure with a few measured breaths. Daily practice will make a huge difference in the quality of your life.",
      "Personal Growth" : "To be the best you can be, you must know who you really are. Reject the definitions others project on you. Search within. What do you really value? What do you really want to achieve? Empower yourself by embracing yourself, warts and all.",
      "Fortune Telling" : "A period of loneliness begins. One partner in a relationship departs. A search for love or money proves fruitless.",
      "When?" : "Between August 23 and September 22.",
      "Symbols and Insights" : {
        "The Raised Lantern" : "A raised lantern has long suggested knowledge: \"Thy word is a lamp unto my feet and a light unto my path.\" Here, the lantern shows the way to higher knowledge. What information do you need to bring to light today?",
        "The Star of David" : "This hexagram is a symbol of Judaism and is also called the Seal of Solomon. It combines the symbols for water and fire, suggesting the union of male and female energies. How might faith unify those involved in your situation?",
        "The Staff" : "This incarnation of the scepter suggests a different use of power, recalling the staff of Moses. Instead of symbolizing power or intention, it facilitates progress. What support do you need today?",
        "The Remote Setting" : "The work of the Hermit requires isolation; he is usually drawn in a remote locale, emphasizing themes of withdrawal. What might happen if everyone in your situation backed off a bit?",
        "The Robes" : "The robes suggest the Hermit's status as an initiate or member of an esoteric order. Are you a member of a group that could prove helpful now?"
      },
      "Questions to Ask" : ["What would happen if I simply withdrew and took no action?","How can I get some perspective on the situation?","Who has walked this path before me? How can I enlist his or her help?"]
    }
  },
  {
    "id" : "10",
    "img" : "major10.jpg",
    "name" : "The Wheel",
    "suit": "Trump",
    "number": "X",
    "description": {
      "keywords": ["Luck","Randomness","Cycles","Karma","Fate","Revolution","Block","Enigma","Solution","Change","Eternal Return","Fulfillment","Providence"],
      "Light": "Allowing events to unfold. Seeing the larger pattern in everyday events. Trusting your luck. Watching for cycles. Believing that \"what goes around, comes around.\"",
      "Shadow" : "Losing money gambling. Refusing to do your part to bring a plan to fruition. Taking a fatalistic approach to life. Fighting the natural course of events.",
      "Archetype" : "The Fates/Destiny",
      "Hebrew Alphabet" : "Koph/Palm/20",
      "Numerology" : "10 (finality, completion) and 10 = 1 + 0 = 1 (seed, opportunity)",
      "Planetary/Astrological/Elemental" : "Jupiter",
      "Mythical/Spiritual" : "The God in the Machine. Deus ex Machina. Clotho, Lachesis, and Atropos. Fortuna.",
      "Story" : "An unforeseen event, completely out of the main character's control, changes everything. Alternatively, decisions made in the past have unexpected present-day consequences.",
      "Relationships" : "You can't plan every moment. Be spontaneous. Rather than strive for control, let go of the reins and see where the relationship goes. Check your behaviors. Are you reliving mistakes of the past?",
      "Work" : "Feeling a little de[as]ja[ag]-vu? Return to old files; new solutions might be lying dormant there. Ask yourself what this new opportunity has in common with older challenges. In analysis, take into account all influences, including those beyond your control.",
      "Spirituality" : "Behold the delicate machinery of heaven! As you watch events unfold, keep your perspective. What seems impossible to understand today will make sense with the passing of time. Look for the larger patterns.",
      "Personal Growth" : "The actions you take today will influence your reality for days and years to come. Making wise choices now can free you from the unpleasant business of enduring repercussions further down the road.",
      "Fortune Telling" : "Some events are in the hands of heaven. You've lived through this before. What happened then?",
      "When?" : "Within 12 years.",
      "Symbols and Insights" : {
        "The Four Evangelists" : "Four winds of heaven, the four corners of the earth, four seasons, four classical elements, four fixed signs of the zodiac, and four Gospels. Matthew, who looks human, traced the human lineage of Christ. Mark, the Lion, wrote of someone \"crying\" (roaring) in the wilderness. Luke, the Ox, focused on Jesus as a sacrifice. John, the Eagle, emphasized the mystical, higher nature of the Christ. What strategy would help you most: tracing roots, communication, sacrifice, or mystery?",
        "The Great Wheel" : "\"To everything there is a season; a time for every purpose under heaven.\" The wheel suggests the evolution of events, but also the cyclical nature of time and history. In your situation, what time has finally come?",
        "Symbols and Letters" : "Using TARO as an alternative spelling, occultists came up with an anagram: TAROT ROTA ORAT TORA ATOR, or \"The Tarot speaks the law of Hathor.\"(Hathor was an Egyptian goddess of motherhood and love.) The Hebrew letters spell out the unspeakable name of God. The symbols are alchemical glyphs for mercury, sulfur, water, and salt. What might happen if you rearranged the basic elements of your situation?",
        "Fantastic Beasts" : "The descending serpent or monkey once reigned. The Sphinx at the top now reigns. The ascending dog, or Anubis, will reign. Where are you in the cycle?"
      },
      "Questions to Ask" : ["How does this challenge fit into a larger pattern?","What role does luck play in my circumstances?","What can I control? How should I know when to relinquish control?"]
    }
  },
  {
    "id" : "11",
    "img" : "major11.jpg",
    "name" : "The Strength",
    "suit": "Trump",
    "number": "XI",
    "description": {
      "keywords": ["Discipline","Boldness","Self-discipline","Power","Vitality","Creative Beginning","New Energy","Depth","To Feel","Voice","Puberty","Animal Nature","Courage","Orgasm","Tantra"],
      "Light": "Imposing restrictions on yourself for your own benefit. Bringing your passions under the control of reason. Resisting impulses that work against your best interests. Taking bold action.",
      "Shadow" : "Indulging weakness, even when you know it will damage your health and happiness. Languishing in addiction. Allowing your instincts to tame and conquer you. Failing to take a stand when necessary.",
      "Archetype" : "The Id",
      "Hebrew Alphabet" : "Theth/Snake/9 or Lamed/Outstretched Arms/30",
      "Numerology" : "11 = 1 + 1 = 2 (debate, duality) or 8 (movement, outer work)",
      "Planetary/Astrological/Elemental" : "Leo or Libra",
      "Mythical/Spiritual" : "Samson. Hercules. Daniel in the lion's den. The sinless Christ.",
      "Story" : "An event hints at the main character's hidden strength, which he or she will use (or choose not to use) to resolve the story. Alternatively, a physical or emotional weakness hinders the main character's progress.",
      "Relationships" : "You're in control. You can't tame others, but you can rein yourself in. Watch for old habits or weaknesses to surface, and use your wits to avoid upcoming pitfalls.",
      "Work" : "Emotions and distractions can hinder progress. Identify the cause of dissention and take steps to moderate it. Allow people (including yourself) to do what they do best. An objective perspective yields more effective action.",
      "Spirituality" : "The spirit is willing, but the flesh is weak. Your own willpower may not be strong enough to resist the temptations that come your way. (That's okay; you're human.) Turn challenges over to a higher power, and allow yourself to be led.",
      "Personal Growth" : "Identify problematic habits and unhealthy tendencies, and weigh their overall impact on your life. Consider, too, the value of leaving these behind for healthier options. A good measure of maturity is the ability to forgo immediate gratification to reap benefits later.",
      "Fortune Telling" : "Your self-control will be tested. A woman will seek to change her partner or lover. You are a strong, capable person.",
      "When?" : "If Strength = XI, between September 23 and October 22 (Libra). If Strength = VIII, between July 23 and August 27 (Leo).",
      "Symbols and Insights" : {
        "The Lemniscate" : "Again, in the Marseilles decks, many see a lemniscate, or infinity symbol, concealed in the brim of the figure's hat. RWS-inspired decks emphasize the symbol, suggesting infinite self-discipline. What role does self-control play in your situation?",
        "The Lion" : "Generally, the lion (king of beasts) suggests bestial, untamed instincts. Closing the mouth of the lion graphically illustrates the power the central figure has over instinctual forces. What instinctual responses need to be curbed?",
        "Symbols of Strength" : "Some illustrators use Hercules on this card; a gentle woman is more frequently seen, though. What course of action would best symbolize your own moral strength?"
      },
      "Questions to Ask" : ["How can I enhance my self-discipline?","What behaviors tempt me? How can I resist?","What instincts do I continue to struggle with today?"]
    }
  },
  {
    "id" : "12",
    "img" : "major12.jpg",
    "name" : "The Hanged Man",
    "suit": "Trump",
    "number": "XII",
    "description": {
      "keywords": ["Halt","Meditation","Gift of the Self","Gestation","Sacrifice","Delay","Suspension","Rest","Reversals","Not Choosing","Enlightement"],
      "Light": "Seeing growth opportunities in unpleasant events. Experiencing a dramatic change in personal perspective. Making the best of an unforeseen change in your life or work. Suspending disbelief. Making sacrifices.",
      "Shadow" : "Being untrue to yourself and your values. Refusing to make sacrifices when appropriate. Refusing to adapt to new situations. Blaming others. Profiting at the expense of others. ",
      "Archetype" : "The Traitor",
      "Hebrew Alphabet" : "Mem/Water/40",
      "Numerology" : "12 = 1 + 2 = 3 (expression, productivity, output)",
      "Planetary/Astrological/Elemental" : "Water",
      "Mythical/Spiritual" : "The Crucified Christ. Isaac as a sacrifice. Prometheus bound. Jonah and the whale. Lazarus. Any hanged or sacrificed god. Judas.",
      "Story" : "One of the main character's allies is discovered to be working secretly for the antagonist.",
      "Relationships" : "What doesn't move forward isn't growing. If you're hanging by a thread, it might be time to grab the scissors. If you can learn from what's not working, do so, but don't equate learning with having to stay.",
      "Work" : "Occasionally, no amount of effort will move a project to completion; progress simply isn't the cards, despite your best efforts. Learn from setbacks; turn disappointment into opportunity.",
      "Spirituality" : "Sometimes the best action is no action at all. Suspend your need to have a hand in things. Consider, too, the value of small sacrifices. What you give away will come back to you greatly multiplied.",
      "Personal Growth" : "One sign of maturity is your ability to deal effectively with the unexpected. Rather than be decimated, look for the lesson. If you're true to your own values, no disaster will get the best of you.",
      "Fortune Telling" : "A traitor is revealed. One of your friends is working against you. Change your ways or suffer the consequences.",
      "When?" : "When you least expect it.",
      "Symbols and Insights" : {
        "The Inverted Traitor" : "Renaissance audiences would immediately recognize a hanged man as a traitor because hanging traitors by one foot was a common practice. Are you bound to any old habits that, in this situation, betray you?",
        "The Serpent" : "One occultist taught that the image of the Hanged Man was \"originally\" drawn right-side up, as a man stepping over a snake (thought to be a representation of the missing virtue of Prudence). What would be your most prudent course of action now?",
        "The Halo of Enlightement" : "The Marseilles Hanged Man is clearly being punished. As they mapped concepts of sacrificial enlightenment to this card, occultists added the halo. What have your own trials taught you? How might those lessons apply now?"
      },
      "Questions to Ask" : ["How can I radically alter my perspective?","How might being stuck actually be a blessing in disguise?","How can I help myself see the glass as half full?"]
    }
  },
  {
    "id" : "0",
    "img" : "major13.jpg",
    "name" : "The Nameless Arcanum/Death",
    "suit": "Trump",
    "number": "XIII",
    "description": {
      "keywords": ["Ending","Conclusion","Transition","Passage","Departue","Profound Transformation","Revolution","Cleansing","Harverst","To Destroy"],
      "Light": "Bringing an unpleasant phase of life to an end. Recognizing and celebrating the conclusion of something. Putting bad habits to rest. Becoming a new person. Leaving one person, place, or thing for another. Letting go.",
      "Shadow" : "Obsessing on death and dying. Refusing to give up old habits or unhealthy relationships. Insisting that everything and everyone should stay the same forever. Failing to take good care of yourself.",
      "Archetype" : "Death",
      "Hebrew Alphabet" : "Nun/Fish/50",
      "Numerology" : "13 = 1 + 3 = 4 (stability, persistence)",
      "Planetary/Astrological/Elemental" : "Scorpio",
      "Mythical/Spiritual" : "Christ in the tomb. Hades. Hypnos. Thanatos. Stories of journeys into the underworld.",
      "Story" : "At the midpoint of the story, the main character believes all is lost. Alternatively, a helper or valued ally dies or is believed dead.",
      "Relationships" : "Identify what's not working and put it behind you. Take stock, too, of the relationship itself. Dying flames can be rekindled with mutual effort, but embrace an ending if, in fact, an ending is what's best for you. Poets used to call orgasm the \"little death,\" so, at times, this card can also point to a consummated relationship!",
      "Work" : "Close out lingering projects and tie up loose ends. Now is a good time to consider all your options, including the possibility of moving on. Alternatively, you could put an end to feelings of unrest by deciding, once and for all, to stay put. Do what's best for you.",
      "Spirituality" : "Spiritual scribes write of \"dying to the world\" - realizing that the physical world and its concerns are illusory at best. For you, the Death card is a reminder to focus on what really matters. Alternatively, the card can suggest a need to contact or honor your ancestors.",
      "Personal Growth" : "Grasping the short, fleeting nature of life is one of life's hardest and most sobering lessons. Acknowledging your own impermanence can help you live your life more fully.",
      "Fortune Telling" : "A relationship or illness ends suddenly. Limit travel and risk-taking. General gloom and doom.",
      "When?" : "Between October 23 and November 21.",
      "Symbols and Insights" : {
        "The Rose Flag" : "Oddly, in The Pictorial Key to the Tarot, Waite writes, \"[The] black banner emblazoned with the Mystic Rose ... signifies life.\" In your situation, how might ending one thing give rise to another?\"",
        "The Skeleton" : "Bones persist long after the decay of the body; so, they are symbols of the enduring and eternal. Which aspects of your situation have persisted over time? Which aspects are temporary?",
        "The Pale Horse" : "\"And I looked, and behold a pale horse: and his name that sat on him was Death\" (Revelation 6:8). How do you feel about death? How might your feeling about death be a metaphor for how you feel now?",
        "Sunrise/Sunset" : "In many illustrations, it's difficult to tell whether the sun is rising or setting. Is your own situation just beginning, or is it coming to an end? How can you be sure?",
        "Doomed Figures" : "The sprawled bodies and scattered body parts seen on many cards reflect death's disruptive force. How might the need for disruption figure into your situation?"
      },
      "Questions to Ask" : ["What needs to end?","How might an ending actually be a blessing in this situation?","What's next?"]
    }
  },
  {
    "id" : "14",
    "img" : "major14.jpg",
    "name" : "Temperance",
    "suit": "Trump",
    "number": "XIIII",
    "description": {
      "keywords": ["Blending","Synthesis","Mediation","Combination","Harmony","Protection","Circulation","Healing","Measure","Benevolence","To Protect","Health"],
      "Light": "Bringing opposites together. Moderating your actions or emotions. Finding middle ground. Reaching compromises. Synthesizing solutions that please everyone involved. Using the old to make something new.",
      "Shadow" : "Going to extremes. Disrupting group efforts. Ignoring healthy approaches to life. Becoming an addict. Practicing gluttony. Tearing something or someone apart. Breaking alliances.",
      "Archetype" : "The Mediator",
      "Hebrew Alphabet" : "Samekh/Foundation/60",
      "Numerology" : "14 = 1 + 4 = 5 (catalyst, instability, confrontation)",
      "Planetary/Astrological/Elemental" : "Sagittarius",
      "Mythical/Spiritual" : "The angel seen here may be the goddess Iris. By extension, priests, priesthoods, or the transfigured Christ.",
      "Story" : "The main character learns to moderate impulses or habits that limit his or her ability to solve the story's central problem.",
      "Relationships" : "Set superficial relationships aside. Pursue trust and deep intimacy - the subtle blending of two people into one. Bring people together. Commit to introductions, parties, or gatherings. Seek out groups.",
      "Work" : "Many hands make work easier. Call meetings. Get input from every level at every step. If everyone has a hand in defining an effort, then everyone will feel ownership and investment. Moderate your tendency toward all-or-nothing work habits.",
      "Spirituality" : "Some spiritual advisors recommend extreme practices, from fasting to abstinence, as a means of boosting spiritual awareness. Consider the potential value of moderation in all things. You can value what is right here, right now, without craving more or surpassing healthy limits.",
      "Personal Growth" : "Young people want to toss out tradition and forge ahead. Older people are more conservative. Between these extremes lies a healthier middle ground. Define the polarities and then ask, \"What lies between?\" ",
      "Fortune Telling" : "Someone's using drugs or alcohol to excess. It's time to get back on that diet.",
      "When?" : "Between November 22 and December 21.",
      "Symbols and Insights" : {
        "The Square and Triangle" : "In many RWS-inspired decks, a symbol on the angel's chest suggests the fiery spirit enshrined in stable matter. What meaning do your possessions have beyond their physical value?",
        "The Blended Cups" : "Temperance often pours the contents of two cups together, blending water, water and wine, wine and milk, or even fire and water. How might blending two opposites resolve your challenge today?",
        "Land and Water" : "Occult decks frequently draw Temperance with one foot on stable land and one foot in emotional water. A dive-in-or-get-off-the-dock approach assumes extremes are the only options. Are they?",
        "Irises" : "The flowers seen in RWS-inspired illustrations suggest their namesake, Iris, the goddess of the rainbow. What would happen if you reduced your situation to its most basic components, as a rainbow breaks down white light?"
      },
      "Questions to Ask" : ["How can I avoid extremes?","What does everyone involved have in common?","How might combining familiar things help me create something new?"]
    }
  },
  {
    "id" : "15",
    "img" : "major15.jpg",
    "name" : "The Devil",
    "suit": "Trump",
    "number": "XV",
    "description": {
      "keywords": ["Shadow","Materialism","Bondage","Delusion","Unconscious Forces","Passion","Creativity","Temptation","Darkness","Fear","Taboo","Sexuality","Impulses","Dark Side","Energy Buried in Psyche"],
      "Light": "Appreciating the luxuries that life has to offer. Being comfortable in your own skin. Enjoying your sexuality. Splurging on an expensive personal item. Embracing the fact that everyone has a darker side. Dealing with unhealthy impulses in healthy ways.",
      "Shadow" : "Putting excessive emphasis on appearances. Always wanting more. Valuing possessions more than people or relationships. Allowing base instincts to govern your life. Being selfish. Attributing your own dark impulses to outside forces or other people.",
      "Archetype" : "The Shadow, The Other",
      "Hebrew Alphabet" : "Ayin/Eye/70",
      "Numerology" : "15 = 1 + 5 = 6 (adjustment, collaboration)",
      "Planetary/Astrological/Elemental" : "Capricorn",
      "Mythical/Spiritual" : "The Biblical Satan, certainly. Fallen angels, including Lucifer. Bacchus and Pan. Tempters and serpents of every stripe.",
      "Story" : "The main character comes face to face with his or her adversary. Alternatively, the main character realizes that his or her own perceptions or actions are the cause of the story's primary problem.",
      "Relationships" : "Avoid the temptation to blame everything on everyone else; own your own contribution to the relationship's success or failure. Doing what feels good is not always the best strategy. Take care that sexual attraction plays a healthy role; resist the tendency to be dominated by cravings.",
      "Work" : "The bottom line is important, but not all-important. Do not allow material concerns to obscure human issues. There's nothing wrong with enjoying or being compensated for good work but keep the money in perspective. Know when to say, \"Enough's enough.\"",
      "Spirituality" : "Many traditions position the body as bad or evil, something unclean. In your own spiritual practice, consider the wisdom of relishing the body and its spectrum of sensations. You can honor the pleasures of the body without being enslaved by them.",
      "Personal Growth" : "Be honest: what habit or attitude holds you back most? You might find that the qualities you most detest in others are, in fact, reflections of your darkest self. Rather than be chained to old attitudes or habits, embrace your shortcomings and strive to make more conscious choices.",
      "Fortune Telling" : "Adultery and unfaithfulness. A string of extremely bad luck is coming your way. Beware evil influences and wolves in sheep's clothing.",
      "When?" : "Between December 22 and January 19.",
      "Symbols and Insights" : {
        "The Beast" : "The Marseilles Devil incorporates bat wings and sexual features. The RWS Devil, influenced by Pan and associations with Capricorn, is more bestial and fearsome. The Gilded Tarot emphasizes the attractiveness of the Devil; the Bright Idea Deck suggests that the Shadow is, in fact, within. Which plays the greatest role in your challenge: fear, attraction, or denial?",
        "Prisoners and Chains" : "The Devil is accompanied by fauns & mythical half-goats whose horns and tails emphasize their bestial nature. Their fascination with the material prevents them from stepping away from the loose chains around their necks. Might someone in your situation need to escape the influence of his or her basest instincts?",
        "Flames" : "Flames appear on the tip of the male faun's tail in the RWS. What all-consuming obsession or passion plays a role in your situation?",
        "The Pentagram" : "Upright, the pentagram is associated with the five points of the human body. Inverted, it suggests the head (the intellect) has been conquered by desire. In your situation, are you being led by your conscience or your cravings?",
        "The Hermaphrodite" : "The Devil is often drawn as a hermaphrodite - a dark parody of the unity associated with enlightenment and divinity. How might false unity or misrepresented loyalty play a role in your situation?"
      },
      "Questions to Ask" : ["What enslaves me? How can I set myself free?","How can I re-evaluate the importance I assign to material things?","To what extent do my cravings define me?"]
    }
  },
  {
    "id" : "16",
    "img" : "major16.jpg",
    "name" : "The Tower",
    "suit": "Trump",
    "number": "XVI",
    "description": {
      "keywords": ["Demolition","Upheaval","Deconstruction","Disaster","Destruction","Opening","Release","Temple","Construction","Shock","Expression","Exploding","Liberation","To Uncork","Burst","Revealed Secret"],
      "Light": "Breaking out of old, confining habits and mindsets. Clearing the way for new growth. Dispelling the influence of an inflated ego. Getting back to basics. Stripping away harmful illusions. Receiving sudden insight.",
      "Shadow" : "Clinging to traditions that repress growth. Engaging in willful blindness. Rejecting evidence that change is needed. Ignoring guidance from a higher power. Maliciously engaging in destructive behavior.",
      "Archetype" : "The Shattered Ego",
      "Hebrew Alphabet" : "Pe[as]/Open Mouth/80",
      "Numerology" : "16 = 1 + 6 = 7 (psychology, imagination, inner work)",
      "Planetary/Astrological/Elemental" : "Mars",
      "Mythical/Spiritual" : "The Tower of Babel. The destruction of Sodom and Gomorrah. Shiva's destructive dance. The lightning of Zeus and Thor.",
      "Story" : "In a moment of intense crisis, the main character apparently loses all. Alternatively, the utter setback at the end of act 2.",
      "Relationships" : "Extinguish old flames before they have an opportunity to dampen promising new relationships. Despite the pain involved, a clean break is healthier than a lingering, drawn-out departure. Break down the walls and communicate honestly about what's really happening.",
      "Work" : "Sacrifice some sacred cows. Harsh criticism from above can clear ground for a new breakthrough. Something is blocking progress; identify it and boldly sweep it aside. Document everything; should the climate suddenly change, you want your ducks in a row.",
      "Spirituality" : "Loss clears away the debris of the past, opening up new ground for new growth. As your heart opens, let old scar tissue fall away. Rather than live in fear of sudden loss, recognize that none of us owns anything. Practice detachment.",
      "Personal Growth" : "Identify what holds you back and attack it. Embrace bold change. Criticism may come; if so, search each barbed word for a kernel of much-needed truth. Some of life's greatest lessons are tough ones! With time, a bruised ego can become fertile ground for personal growth and maturity.",
      "Fortune Telling" : "Impending disaster. Cancel plans and reverse decisions. Someone wants to take you down a notch or two. Don't hold back; say what you really mean.",
      "When?" : "Within 23 months.",
      "Symbols and Insights" : {
        "The Lightning Bolt" : "Many old traditions interpret disasters as divine commentary. A bolt from the blue might not be God knocking at the door, but a sudden change in circumstance may call your attention to a pattern you've overlooked.",
        "The Darkness" : "With the exception of early decks (like the Marseilles), many Tower cards depict darkened skies. The moment of disaster is our lowest point. In what ways have you hit bottom?",
        "The Toppled Crown" : "The crown in some illustrations represents the ego, or the self. Disasters and sudden challenges often clear the way for us to see ourselves in a new and unexpected light. ",
        "Plummeting Bodies" : "Universally, humans fear falling from great heights. Significantly, we fall from grace; exposed criminals \"take the fall.\" The scapegoat may be called the \"fall guy\". How might your situation be impacted by someone's metaphorical fear of falling? Or are they dancing having completed the tower?"
      },
      "Questions to Ask" : ["How might the current situation dramatically alter my perspective?","How might this loss open the door for new growth?","What attitudes need to be struck down before I proceed?"]
    }
  },
  {
    "id" : "17",
    "img" : "major17.jpg",
    "name" : "The Star",
    "suit": "Trump",
    "number": "XVII",
    "description": {
      "keywords": ["Hope","Optimism","Openness","Certainty","Faith","Longing","Truth","Finding your place","Chance","To Sanctify","Stellar","Cosmic","Fertility","Talent","Inspiration","Femininity","Luck","Paradise","Success"],
      "Light": "Hoping for the best. Believing good things happen to good people. Seeing events in the best possible light. Adopting a generous spirit. Seeking guidance from above. Embracing possibility over probability.",
      "Shadow" : "Denying unpleasant truths. Denying personal accountability and saying, \"Things just happen!\" Ignoring signs and omens. Preferring illusion to reality. Spreading pessimism and stinginess of spirit.",
      "Archetype" : "The Heavenly Guide",
      "Hebrew Alphabet" : "Tzaddi/Fishhook/90 or, in some decks, He[as]/Window/5",
      "Numerology" : "17 = 1 + 7 = 8 (action, movement, swiftness)",
      "Planetary/Astrological/Elemental" : "Aquarius",
      "Mythical/Spiritual" : "The star that guided the Magi. Aphrodite. Venus. The Pleiades. Moses bringing forth water from the rock.",
      "Story" : "After the darkness, comes the dawn! Just as the situation looks completely bleak, the main character discovers a way to move forward.",
      "Relationships" : "Give freely of yourself and expect the best. Don't hold back genuine emotions; express them without shame. Consider exploring spiritual goals together. Astrology can offer important insights into compatibility. Let your honesty and openness encourage others to reveal their deepest thoughts.",
      "Work" : "Surround yourself with visual reminders of your goal because these can serve as guiding lights when you need a way to put the situation into perspective. Expect the best of yourself and your co-workers. You'll know when the time is right to take action; have confidence in your own judgment.",
      "Spirituality" : "Prayer and quiet time communicate your openness to guidance from above. Don't hesitate to share your spiritual side with those around you. Seek out oracles. Allow the power of spirit to flow through you; let your spirituality color all aspects of your life.",
      "Personal Growth" : "An optimist sees what is ... and what can be. Open yourself to possibility. Numbers never tell the whole story. Shed your ego; be yourself, no matter what others think. The only truly unique thing you have to share is the person you really are. Unmask!",
      "Fortune Telling" : "Get an astrology chart drawn up. Someone is a little too starstruck. What's happening now has long been fore-ordained.",
      "When?" : "Between January 20 and February 17.",
      "Symbols and Insights" : {
        "The Seven Stars" : "The seven stars seen on both the RWS and Marseilles cards likely refer to the seven classical planets. They orbit a central flamboyant star, which Waite, in The Pictorial Key to the Tarot, describes as a Masonic symbol. In your situation, who is following whom, and why?",
        "Eight-pointed Stars" : "Depending on the deck used, the number eight suggests the work associated with expressions of strength or the delivery of justice. Eight, the number of action, doubles four, the number of persistence and stability. Might the key to your situation be the application of consistent effort over time?",
        "Pouring Water" : "There's no conservation going on here; the figure on most Star cards bears an inexhaustible supply of the Water of Life. What are your own inexhaustible resources? How can they help?",
        "Nudity" : "Here, nudity communicates innocence, openness, and shamelessness. What would happen if you embraced yourself completely?",
        "The Ibis" : "The ibis is the representative of Thoth, the master magician of the Egyptians. It is associated with the idea of both initiation and meditation. In your situation, who is the magician, and who is the mediator?"
      },
      "Questions to Ask" : ["What would my higher power direct me to do?","How can I be less self-conscious and guarded?","How can I better attune myself to the abundance of life's blessings?"]
    }
  },
  {
    "id" : "18",
    "img" : "major18.jpg",
    "name" : "The Moon",
    "suit": "Trump",
    "number": "XVIII",
    "description": {
      "keywords": ["Mystery","Fantasy","Imagination","Dreams","Uncertainty","Receptive Female Power","Night","Dream","Madness","Phases","Magnetic","Depression","Ocean","Superstition","Secret"],
      "Light": "Enjoying healthy fantasies and daydreams. Using your imagination. Practicing magic or celebrating the magic of everyday life. Attuning yourself to the cycles of nature. Embracing the unknown.",
      "Shadow" : "Becoming unable to separate fantasy from reality. Suffering from delusions. Losing your appreciation for the fantastic or magical. Adopting a ruthlessly logical mindset. Failing to appreciate life's mysteries.",
      "Archetype" : "The Holy Feminine/The Crone",
      "Hebrew Alphabet" : "Koph/Back of the Head/100",
      "Numerology" : "18 = 1 + 8 = 9 (fullness, readiness, ripeness)",
      "Planetary/Astrological/Elemental" : "Pisces",
      "Mythical/Spiritual" : "Kali, the dark-skinned divine mother associated with time, the eternal night, and the female principle. Hecate, goddess of night and darkness, who, like Anubis, assists others in their travels to the underworld. ",
      "Story" : "With nothing left to lose, the main character commits to a dangerous or unlikely course of action as part of a last-ditch effort to reach his or her goal.",
      "Relationships" : "Moonlight becomes you, so don't be afraid to indulge in a little romantic lunacy. Navigating your way to a fulfilling relationship involves risks. Some people will say you're crazy. Pay attention to your instincts, surround yourself with loyal guides, and make your move.",
      "Work" : "Avoid linear/logical approaches and go with your gut. Brainstorm. Put the rules aside and use your imagination. What would happen if restrictions were removed? What might happen? What could happen? A little lunacy can be a good thing; blow off steam, change your habits, and try working in a different light.",
      "Spirituality" : "How does your personal spiritual path incorporate the Divine Feminine? What qualities would a divine mother offer? Which aspects of your personal spirituality would benefit from a feminine touch? How might contact with the divine feminine benefit you today? How might you honor or invite that energy?",
      "Personal Growth" : "Faced with an uncertain future, you might feel led to abandon your search for self and crawl back into your shell. You can move forward without tossing caution to the wind. Uncertainty can be the mother of great creativity. Listen your instincts, clarify your path, and keep going.",
      "Fortune Telling" : "Watch for problems at the end of the month. Someone you know needs to howl at the moon more often. Someone is about to change his or her mind about an important decision.",
      "When?" : "Between February 18 and March 19.",
      "Symbols and Insights" : {
        "The Moon" : "This \"lesser light to rule the night\" renews itself every 28 days, linking it to cycles of all sorts, including menstruation. By extension, it is also associated with rare events (\"once in a blue moon\"). How is your situation shaped by repeating events? By rare ones?",
        "Brilliant Droplets" : "The Marseilles Moon (and many RWS-inspired Moons) exudes a shower of brilliant droplets; in The Pictorial Key to the Tarot, Waite calls these \"the dew of thought.\" To what extent might your own fears be rooted in imagination alone?",
        "Baying Hounds/Howling Wolves" : "Waite cast these as fears; later commentators position the hounds and wolves as faithful familiars - animal helpers who, like Hecate, lend aid on our journey through darkness. Which familiars can you call on for help today?",
        "The Crayfish or Lobster" : "The night can put us in contact with our deepest, most instinctual fears. Here, this representative of our most primitive brain crawls up from the depths of the subconscious mind and bathes itself in the light of the moon. What is your greatest fear? Does it play a role in your current situation?",
        "The Two Towers" : "The path between the two towers leads into unknown territory. In your own situation, what remains unknown? How can you limit the influence of these variables?"
      },
      "Questions to Ask" : ["How can I face my fears and move forward?","What helpers can serve me as guides through my personal darkness?","How can I deal with the unknown in healthy ways?"]
    }
  },

  {
    "id" : "19",
    "img" : "major19.jpg",
    "name" : "The Sun",
    "suit": "Trump",
    "number": "XIX",
    "description": {
      "keywords": ["Joy","Brilliance","Validation","Attention","Energy","Father","New Construction","Love","Heat","Success","Evolution","Fraternity","Happy Union","Light","Wealth"],
      "Light": "Seeing things clearly. Experiencing intense joy. Celebrating your own successes. Knowing you're good at what you do. Gaining recognition for your personal genius.",
      "Shadow" : "Being dazzled by your own accomplishments. Becoming absorbed in your own self-image. Feeling rushed and distracted. Exerting yourself to the point of exhaustion. Overstating your abilities or misrepresenting your achievements.",
      "Archetype" : "The Holy Masculine",
      "Hebrew Alphabet" : "Resh/Head/200",
      "Numerology" : "19 = 1 + 9 = 10 (completion, exhaustion) 1 + 0 = 1 (starting point, opportunity)",
      "Planetary/Astrological/Elemental" : "The Sun",
      "Mythical/Spiritual" : "God the Father. Sun gods, including Ra, Apollo, and Helios. The moment of baptism. Claiming a new faith as your own.",
      "Story" : "At the climax of the story, the main character is victorious.",
      "Relationships" : "You're turning heads without realizing it. Attention is coming your wayÑand you deserve it! The admiration of others is a warm glow, so bask in it while you can. As all things begin to revolve around you, take care you don't get blinded or burned by your own brilliance.",
      "Work" : "With the proper strategy, you're all set to be the golden boy (or girl). Approval and praise are the order of the day. Accept all this admiration with humbleness; give credit where credit's due. Meanwhile, make hay while the sun shines. Remember: after noon, the rest of the day is a sunset!",
      "Spirituality" : "As your meditative and spiritual practices hone your sensitivities, you begin to feel your connectedness to the energies around you. Branch out. Spread warmth, love, and joy through your attitudes and actions. Today, embody the universal light.",
      "Personal Growth" : "Learn to win gracefully. Accept compliments with a humble heart. You can acknowledge and celebrate your own achievements without falling prey to greediness. Be who you are. You've earned this moment, but don't let pride in your progress hinder further growth!",
      "Fortune Telling" : "Everything's coming up roses (or sunflowers, whatever the case may be). Whatever's on your mind, go for it because you can't lose today.",
      "When?" : "Within one year.",
      "Symbols and Insights" : {
        "The Sunflowers" : "Sunflowers turn to follow the path of the sun through the sky, modeling the sort of attention paid to any sunny personality. Their shape and color emulates the object of their attention. Might imitating a respected person be the key to solving your problem?",
        "The Victor Reborn" : "In RWS-influenced decks, the Sun card depicts a single gleeful child. In other decks, we see two dancing cherubs. Both represent an energetic and mystical rebirth. In The Book of Thoth, Crowley writes, \"They represent ... the next stage which is to be attained by mankind.\" In your situation, what needs to evolve?",
        "The Garden Wall" : "The wall separates citizens of the current world from spiritual purity. From Earth, like sunflowers following the sun, we gaze on this return to Eden with great longing. How does a loss of innocence figure in your challenge?",
        "The White Horse" : "RWS-influenced decks place a single child on a white horse, long considered proper conveyance for heroes. When all is said and done, will your actions guarantee you a place on a white steed?",
        "The Red Banner" : "The banner signifies the RWS child's victory over animal instincts and worldly influences. Might a spiritual transformation be overdue?"
      },
      "Questions to Ask" : ["How can I take best advantage of the attention coming my way?","What are my highest spiritual goals?","How can I avoid being bedazzled by the energy swirling around me?"]
    }
  },
  {
    "id" : "20",
    "img" : "major20.jpg",
    "name" : "Judgement",
    "suit": "Trump",
    "number": "XX",
    "description": {
      "keywords": ["Revival","Renewal","Resurrection","Evaluation","Invitation","New Consciousness","Irresistible Desire","Vocation","Call","Birth","Renaissance","Union","Family","Transcendence","To Emerge","Announcement","Good News"],
      "Light": "Receiving a wake-up call. Discovering a new purpose in life. Becoming totally and completely yourself. Receiving a well-deserved reward. Passing an evaluation or examination. Welcoming the start of a new phase of life.",
      "Shadow" : "Being weighed in the balances and found wanting. Failing to measure up to a well-defined standard. Being caught goofing off or misbehaving. Failing to prepare for an examination you know is coming. Rejecting an opportunity to reinvent yourself.",
      "Archetype" : "Resurrection",
      "Hebrew Alphabet" : "Sin/Tooth/300",
      "Numerology" : "20 = 2 + 0 = 2 (division, duality)",
      "Planetary/Astrological/Elemental" : "Fire",
      "Mythical/Spiritual" : "The resurrected Christ. The Last Judgment of Revelation. The phoenix, which rises to new life from its own ashes.",
      "Story" : "Having earned a victory, the main character sees himself or herself differently. Alternatively, others see the main character in a new and flattering light.",
      "Relationships" : "Freshen your relationship by taking advantage of opportunities to reinvent yourself (and each other). Swap roles. Seek out entertainment you would normally avoid. Shatter habits and breath new life into your partnerships. What you learn in the process could be a wake-up call for you both.",
      "Work" : "If something or someone is holding you back, it's time for a \"Come to Jesus Meeting\" -- a time to air dirty laundry, read someone the riot act, or say out loud what, to this point, has only been said in private. Identify the problem and eliminate it before the decay spreads to other efforts. If things are going well, use this as an opportunity to define why, so you can replicate your success elsewhere.",
      "Spirituality" : "With a shock, we realize the impermanent nature of this world. Use this sudden insight to your advantage. Answer the trumpet call and reinvent yourself by refusing to cling to distractions. Set aside your stumbling blocks and embrace transformation.",
      "Personal Growth" : "The assessments of others cannot impact your true value. The only standard you must meet is being the very best version of yourself you can be. Identify your next steps ... and take them. Don't do this for others; do it for you.",
      "Fortune Telling" : "An old issue you thought was over will come up again today. Get ready for huge changes: break-ups, sudden calls from old friends, and unexpected setbacks. God's trying to get your attention.",
      "When?" : "Unexpectedly, if at all.",
      "Symbols and Insights" : {
        "Gabriel" : "In the apocalyptic visions of the Book of Revelation, Gabriel summons the dead from their slumber with a blast of his trumpet. In your situation, who needs a wake-up call?",
        "The Crossed Banner" : "In Tarot: History, Symbolism, and Divination, scholar Robert Place identifies this as Constantine's victory flag. \"When held by Christ or Gabriel, it represents victory over death.\" How would your life change if you put a fear of death or loss aside?",
        "The Resurrected Dead" : "In both the Marseilles and RWS-influenced cards, the risen show only positive emotions. The trumpet call liberates and re-creates them. In what way do you need to be reborn?"
      },
      "Questions to Ask" : ["What is the main thing I need to realize about myself?","In what way might the universe be trying to get my attention?","If I were to reinvent myself, what would I become?"]
    }
  },
  {
    "id" : "21",
    "img" : "major21.jpg",
    "name" : "The World",
    "suit": "Trump",
    "number": "XXI",
    "description": {
      "keywords": ["Wholeness","Integration","Totality","Completeness","Fullness","Total Realization","Soul","Heroism","Genius","Holiness"],
      "Light": "Having it all. Knowing and loving yourself as completely as possible. Seeing the interconnection of all things and people. Enhancing your perspective. Living life to its fullest. Understanding the meaning of life.",
      "Shadow" : "Allowing greed and envy to prevent you from enjoying what you do possess. Failing to see the larger design in ordinary events. Believing that everything that exists can be touched, counted, or measured. Failing to see the divine reflected in those around you.",
      "Archetype" : "Enlightenment",
      "Hebrew Alphabet" : "Tau/Cross/400",
      "Numerology" : "21 = 2 + 1 = 3 (expression, result)",
      "Planetary/Astrological/Elemental" : "Saturn",
      "Mythical/Spiritual" : "The ascended Christ. The Buddha attaining enlightenment. The alpha and the omega. The completion of the alchemist's great work.",
      "Story" : "The main character lives happily ever after.",
      "Relationships" : "With mutual trust and effort, very different people can come together to create a reality greater than the sum of its parts. Once you have a taste of what can be, settling for less will be difficult. Keep in mind, though, that a dream of perfection can foster dissatisfaction with an otherwise perfectly good relationship.",
      "Work" : "Synergy! It's possible for everyone involved to work together in harmony to create something better than any one person could produce on his or her own. Encourage people to share ideas. Allow others to share in the investment and the glory. Unite and meet your goals.",
      "Spirituality" : "Enlightenment is a goal; reaching it is bliss. Rather than beat yourself up for falling short, celebrate your progress. Meantime, keep in mind the lesson of the Tarot: Even as we reach one level of enlightenment, we become a fool again.",
      "Personal Growth" : "For most challenges, both intuitive and logical approaches exist. Most of us favor one over the other, but the secret to true mastery involves learning to wield both with perfect facility. Identify your least favorite approach, and then speed your growth by giving it special attention.",
      "Fortune Telling" : "Winning the lottery. Getting your heart's desire. Having everything you ever imagined having.",
      "When?" : "Within 29.5 years",
      "Symbols and Insights" : {
        "The Mandolora" : "Both the Marseilles and RWS-inspired decks surround the central figure with a wreath, or mandalora. Like the oroborous, the snake that swallows its own tail, the mandalora has no beginning or end. Its shape also suggests the number zero - the designation of the Fool. If you examine the current situation in light of past events, what next step makes the most sense?",
        "The Four Evangelists" : "Previously seen in the corners of the Wheel, the signs of the four evangelists once again evoke the ultimate integration of all things. What do you need to bring together? How can you promote the stability of your solution?",
        "The Central Figure" : "The Wheel has been replaced by the victorious central figure, indicating that luck and fate have given way to the greater force of self-realization. In the Visconti deck, the central figure is a white city: the New Jerusalem. In some decks, it is the Christ. In others, it appears to be a hermaphrodite - the ultimate reunion of male and female energies in a single body. In your own situation, what would be the best ultimate outcome?",
        "The Baton" : "In many decks, the central figure holds a baton; in RWS-influenced decks, he or she holds two. This is no longer the singular wand of the Magician! What might happen if you put both your magical and practical powers to work today?"
      },
      "Questions to Ask" : ["For me, what would having it all mean?","How aware am I of my own connectedness to the world around me?","What keeps me from having it all right now, today?"]
    }
  },
  {
    "id" : "22",
    "img" : "clubs01.jpg",
    "name" : "Ace of Wands",
    "suit": "Wands",
    "number": "1",
    "description": {
      "keywords": ["Desire","Inspiration","Vision","Creation","Invention"],
      "Light": "Being inspired. Identifying an important goal. Being given the opportunity to do whatever you want to do. Giving or receiving direction. Seeing a solution. Creating something new. Being aroused, sexually or creatively.",
      "Shadow" : "Failing to take advantage of a great opportunity. Being ineffectual or lazy. Making an inadequate effort. Working toward a goal, but lacking the resources or initiative to achieve success. Setting inappropriate goals. Failing to take a stand.",
      "Numerology" : "1 (The Origin: the starting point, the seed, opportunity)",
      "Astrology" : "Aries, Leo, Sagittarius",
      "Affirmation" : "\"I jump at the opportunity to pursue my heart's desire.\"",
      "Story" : "The Main Character has an opportunity to join the story's quest.",
      "Relationships" : "This could be the start of something big. It's time to evaluate what you really want; once you do, you can decide whether or not this opportunity can take you there. Be careful: overwhelming attraction can distort good judgment.",
      "Work" : "The only way to stop moving in circles is to define clear criteria for success. What's the goal? What do you need in order to achieve it? What steps must be taken to get from A to B? This card heralds the need for absolute clarity. Anything less breeds confusion.",
      "Spirituality" : "Where does your spiritual path lead? Walking a path without direction amounts to wandering in the wilderness: you may have some amazing experiences, but there's no easy way to measure progress. What signs of evolution should you see as you grow?",
      "Personal Growth" : "Where should you be in five years? In ten years? Rather than float like a leaf on the river, consider the value of setting standards for yourself. In addition to defining a direction, give yourself milestones to meet. Before you know it, your dreams will be realities.",
      "Fortune Telling" : "Someone has the \"hots\" for you. A new job offer is coming your way. Walk softly, and carry a big stick.",
      "When?" : "In the Spring.",
      "Symbols and Insights" : {
        "The Hand Of God" : "On the Aces in Marseilles and RWS-inspired decks, a heavenly hand extends from the clouds, offering the viewer the suit's distinctive marker. When opportunity comes your way, take advantage of it; the hand that extends an offer can always withdraw it.",
        "Types of Wands" : "Many decks depict budding Wands, suggesting the potential for growth. Wands in general are a tool for focusing creative energy. In your situation, will growth happen on its own, or will you have to focus your creative energy to move ahead?",
        "Wands as a Symbol" : " As a suit marker, Wands suggest the power and potency of a king's scepter. When a Magician wants something to happen, he waves his magic wand to make his intentions manifest. What action must you take to convert your dreams into realities?",
        "The Nature of the Ace" : "Compressed into the Ace are all the qualities of all the other cards of the suit. In this way, the Ace can be said to be the \"root\" or \"seed\" of its associated element. How might your situation contain the seeds of future action?",
        "Your First Impressions" : "When you see the Ace, what's your first impression? Is the Wand hovering there, waiting for you to take it? Is the hand offering you the Wand...or moving to hit you with it? What might that suggest about the nature of your desires?"
      },
      "Questions to Ask" : ["What do I really want, more than anything else?","What happens if I let this opportunity pass me by?","How clearly have I defined my directions, values, and goals?"]
    }
  },
  {
    "id" : "23",
    "img" : "clubs02.jpg",
    "name" : "Two of Wands",
    "suit": "Wands",
    "number": "2",
    "description": {
      "keywords": ["Conflict","Decision","Option","Individuality"],
      "Light": "Having a choice. Offering or being offered an option. Seeing the value of another person's approach. Understanding there's more than one way to \"skin a cat.\" Successfully doing more than one thing at a time. Being empowered to make a choice.",
      "Shadow" : "Misrepresenting your intentions. Doing one thing while desiring another. Changing course mid-stream for no good reason. Refusing to change your goal even when pursuing it no longer makes sense. Disregarding the input of others.",
      "Numerology" : "2 (The Other: division, debate, duality)",
      "Astrology" : "Mars in Aries",
      "Affirmation" : "\"With my goals in mind, I make confident choices.\"",
      "Story" : "The Main Character is confronted with an alternative goal.",
      "Relationships" : "o what extent does everyone involved in your situation want the same thing? The actions people take reveal their true inclinations. To gain insight into the goals of others, study what they do. Are their actions in line with their stated goals? Are yours?",
      "Work" : "No one can serve two masters. Before proceeding, determine exactly how much authority you have in this matter. In addition, it's time to decide which \"To Do\" items move you closer to your personal goals...and which ones are merely consuming your limited time and energy.",
      "Spirituality" : "Others will have their opinions, but ultimately, you must decide what spiritual practices are right for you. Speak your mind and share your own views with courage and honesty. Answering the call of Spirit may dictate taking the road less traveled by.",
      "Personal Growth" : "While others become slaves to fashion and convention, you should work to express yourself. What sets you apart? What makes you unique? These are qualities worth celebrating. Rather than give in to brow-beating and peer pressure, set your own standards in all things.",
      "Fortune Telling" : "Beware false friends. Don't be mealy-mouthed; say what you think and do what you want to do.",
      "When?" : "Between March 21st and March 30th.",
      "Symbols and Insights" : {
        "The Bolted Wand" : "In RWS-inspired decks, one of the two Wands is bolted to the wall. Do you need to abandon old habits for new, more flexible ones?",
        "The Rose and Lilly Cross" : "Here again, male and female energies are shown at odds, as masculine activity comes into conflict with the classically feminine energies of reflection and intuition. Consider both points of view, but only for a time; eventually, you must choose a course and move forward.",
        "The Moment of Choice" : "When the road divides, which way should you go? Developing a clear picture of what matters most will help you make the right decision when the time comes.",
        "The Globe" : "The figure on RWS-inspired decks carries \"the whole world in his hands\",literally. He enjoys a clearly-defined value system, enabling him to make difficult choices with ease. Can you say the same?",
        "Differing Goals" : "Some people feel their needs outweigh the needs of the many; others feel the needs of the many trump the needs of the one. When goals conflict, what criteria will you use to plan your own response?",
        "The Marseilles Image" : "Two solid Wands form a cross, diving the square card into four three-sided slices. Take a moment to appreciate the stark clarity of this simple illustration: progress will be barred until someone finds a way to align the two opposing forces."
      },
      "Questions to Ask" : ["In a conflict, how do you decide who wins?","What values govern your decision-making process?","What choice will you make if you make no choice at all?"]
    }
  },
  {
    "id" : "24",
    "img" : "clubs03.jpg",
    "name" : "Three of Wands",
    "suit": "Wands",
    "number": "3",
    "description": {
      "keywords": ["Implementation","Action","Exploration"],
      "Light": "Putting a plan into motion. Taking that critical first step. Making good things happen. Going beyond your limits. Blazing new trails. Hitting the ground running. Seeing your plans come to fruition.",
      "Shadow" : "Procrastinating. Knowing what to do, but refusing to do it. Launching a project without a clear definition of who should do what. Rejecting an opportunity to try something new. Failing to finish what you start.",
      "Numerology" : "3 (The Result: expression, productivity, output)",
      "Astrology" : "Sun in Aries",
      "Affirmation" : "\"I take the steps necessary to put my plans in action.\"",
      "Story" : "The Main Character's initial plans are laid and launched.",
      "Relationships" : "Knowing what you want or need does you no good if you don't come up with a plan for achieving it! It's time to expand your horizons: go places you've never been, try sports you've never tried, meet people you've overlooked. As your world expands, so do your opportunities.",
      "Work" : "Lead by doing. Forge ahead with your plans, but don't forget to show others what you're doing and why you're doing it. Be proactive, brainstorming obstacles and minting solutions before breakdowns occur. Define very clearly your criteria for success and measure progress daily.",
      "Spirituality" : "Rather than look for a guru or a well-worn path, take the spiritual initiative. If you could express your spirituality in any way, what form would you choose? If you could worship anywhere, where would you go? Break the mold. Remember: bearing new fruit takes time.",
      "Personal Growth" : "Routine is the enemy of growth. Take new roads. See new sights. Pick a new hobby. Order the menu items you don't recognize. Make a habit of blazing new trails.",
      "Fortune Telling" : "You'll be planning a trip soon. Be on the lookout: your ship is coming in.",
      "When?" : "Between March 31st and April 10th.",
      "Symbols and Insights" : {
        "A Wand in Hand" : "In RWS-inspired decks, this card often depicts a merchant and three wands. Two (the number of duality) have been planted in the ground, but one (the \"starting point\") is in hand, suggesting the time for debate has given way to a time for action.",
        "Distant Ships" : "In the background of RWS illustrations, this card often features ships sailing toward the horizon. In The Pictorial Key to the Tarot, Waite says these belong to the central figure, who sends them out to do his bidding.",
        "The Marseilles Image" : "The two Wands from the earlier card are joined by a third, decisive Wand. The crossed purposes of the Two must now give way to the clear intention expressed by the Three. Have you clarified your own goals?"
      },
      "Questions to Ask" : ["How can you make a habit of breaking your habits?","How can you be a decisive leader in this circumstance?","What's your action plan for the next week, month, year, or decade?"]
    }
  },
  {
    "id" : "25",
    "img" : "clubs04.jpg",
    "name" : "Four of Wands",
    "suit": "Wands",
    "number": "4",
    "description": {
      "keywords": ["Celebration","Jubilation","Community","Teamwork","Completion"],
      "Light": "Sharing in a great celebration. Sharing in a communal sense of achievement and success. Preparing for a party. Working together toward a common goal. Giving or winning awards.",
      "Shadow" : "Keeping your nose to the grindstone. Recognizing good work by demanding more work. Failing to share in a group celebration. Allowing sour grapes to poison your moment in the sun. Refusing to do your part.",
      "Numerology" : "4 (The Status Quo: stability, equality, persistence)",
      "Astrology" : "Venus in Aries",
      "Affirmation" : "\"My contributions are worthy of celebration.\"",
      "Story" : "We see a demonstration of the Main Character's special gifts.",
      "Relationships" : "Have you been together for ten years? Celebrate. Have you been together ten days? Celebrate. Do something to recognize the contribution of both partners. Alone? Celebrate yourself.",
      "Work" : "Assign duties, delegate, and get out of the way. Allow others to contribute, even if their contributions aren't exactly up to your personal standards. When projects end, thank everyone involved in a meaningful way.",
      "Spirituality" : "It's easy to allow any ritual to become empty. Get back in touch with what your rituals were meant to teach or inspire. When you restore meaning to your spiritual practice, every prayer becomes a celebration.",
      "Personal Growth" : "You can amplify individual achievements by becoming part of a group. Without decreasing the importance of your own contribution, you'll achieve more...and have more to celebrate, too.",
      "Fortune Telling" : "Someone is watching and evaluating your work. You may get a wedding invitation soon.",
      "When?" : "Between April 11th and April 20th. ",
      "Symbols and Insights" : {
        "The Arbor" : "Most RWS-inspired illustrations for this card incorporate a celebratory arbor. What do you have to celebrate?",
        "Laurels and Grapes" : "Some RWS-inspired decks feature figures wearing laurel leaves and carrying bunches of flowers or grapes. Laurel leaves have long been given as tokens of recognition. Grapes suggest both harvest and celebration. Might it be time for a ceremony recognizing contributions?",
        "Shared Labour, Shared Rewards" : "To what extent is everyone in your group doing his or her part in your \"harvest?\" How might a celebration (or being reminded of what's worth celebrating) better integrate the people working with you?",
        "The Marseilles Image" : "Four Wands have been woven together, creating a sturdy arrangement that might well serve as the top of a simple arbor. How might a celebration better integrate the people in your circle?"
      },
      "Questions to Ask" : ["To what extent am I doing my part?","What kind of recognition would be most meaningful?","How might a celebration now impact community morale?"]
    }
  },
  {
    "id" : "26",
    "img" : "clubs05.jpg",
    "name" : "Five of Wands",
    "suit": "Wands",
    "number": "5",
    "description": {
      "keywords": ["Confrontation","Disruption","Distinction","Objection","Strife"],
      "Light": "Calmly expressing a dissenting opinion. Allowing someone to use his or her own methods to get a job done. Opening the floor for discussion or debate. Comparing progress made so far to standards set earlier.",
      "Shadow" : "Berating others for their ridiculous opinions. Picking fights. Offering destructive criticism. Baiting people with barbed remarks. Disrupting progress with an endless stream of pointless objections.",
      "Numerology" : "5 (The Catalyst: instability, resistance, confrontation)",
      "Astrology" : "Saturn in Leo",
      "Affirmation" : "\"I can express dissent in constructive ways.\"",
      "Story" : "The Main Character takes a stand and says, \"Enough is enough!\"",
      "Relationships" : "Every relationship has its ups and downs; no two people can be together for any length of time without some friction. Without making things personal, air your grievances. Share how you feel. If you feel a confrontation coming on, ask yourself what triggers it and why.",
      "Work" : "If your workplace lacks harmony, getting things done requires far more time and effort. Create an atmosphere where people feel free to share what they really think. Avoid the blame game; talk in terms of what should happen...and what happens when the system breaks down.",
      "Spirituality" : "It's easy to feel spiritually connected when meditating in a tranquil garden. But how can you maintain your balance when surrounded by emotionally-charged chaos? Remember: you are not your emotions. Withdraw. Breathe. Save anger for those few transgressions worthy of such a powerful emotion.",
      "Personal Growth" : "What makes you angry? How do you respond when you loose your cool? Going berserk isn't the answer. Swallowing your feelings won't work either. Find constructive, level-headed ways to say what you need to say before you reach the boiling point.",
      "Fortune Telling" : "Prepare for a fight with your best friend. Remember: once you let words loose, you can't take them back.",
      "When?" : "Between July 22nd and August 1st.",
      "Symbols and Insights" : {
        "The Five Figures" : "In RWS-inspired decks, five figures confront each other, Wands in hand. Are they fighting? Are they dancing? Are three watching while the other two battle to the death? Waite claimed the youths could be engaged in either sport or strife, or even a \"sham fight.\" It's worth asking whether or not your conflict, represented by this card, is the problem...or just a symptom.",
        "Meekness as an Alternative" : "How might meekness (as opposed to confrontation) work in your situation? How might changing yourself change the outcome of this particular battle?",
        "Your Contribution to the Clash" : "We're quick to see the errors of others, but slow to understand how our own actions might contribute to confrontations. How have your actions contributed to the crisis?",
        "The Marseilles Image" : "Remember the stable Four of Wands? Now, someone comes along and thrusts an intrusive new Wand into the mix, shattering the delicate balances that gave rise to celebration. Will you let the Wands topple? Or work to restore balance somehow?"
      },
      "Questions to Ask" : ["To what extent is your current issue worth fighting for?","What alternatives are there to outright conflict?","What happens in a \"fair fight?\" How can you keep this fight fair?"]
    }
  },
  {
    "id" : "27",
    "img" : "clubs06.jpg",
    "name" : "Six of Wands",
    "suit": "Wands",
    "number": "6",
    "description": {
      "keywords": ["Victory","Achievement","Success","Triumph"],
      "Light": "Outperforming your peers. Winning a competition. Being recognized as a capable person. Having your \"moment in the spotlight.\" Being cheered on by the crowd. Getting an award. Earning the admiration of others. Telling someone, \"Good job!\"",
      "Shadow" : "Being a bad winner. Allowing your achievements to inflate your ego. Looking down on people who seem less capable. Craving to be the center of attention. Giving or receiving insincere praise. Envying the achievements of others.",
      "Numerology" : "6 (The Adjustment: cooperation, collaboration, interaction)",
      "Astrology" : "Jupiter in Leo",
      "Affirmation" : "\"I value sincere praise.\"",
      "Story" : "The Main Character scores a small victory, boosting his or her own spirits, but angering the opposition.",
      "Relationships" : "How often do you praise your friend or partner? You may be underestimating how effective a few words of sincere affirmation can be. Recognition doesn't have to be extravagant; often, all someone needs is a quiet expression of your appreciation.",
      "Work" : "In the rush to get work done, your personal contributions may be celebratedÑor overlooked. Recognized or not, your skills have value. If you get a moment in the sun, bask in it. If not, don't allow yourself to be embittered when others get the recognition you feel you deserved.",
      "Spirituality" : "Offer service quietly, and accept recognition with the same modest spirit. You aren't working for the recognition, but there's nothing wrong with allowing others to express the joy they take in the labor you provide.",
      "Personal Growth" : "Ultimately, the opinions of others won't matter; you must, in the end, please yourself. What standards have you set? To what extent are you meeting them? Recognition is sweet...but meeting or exceeding your own personal criteria for success is even sweeter!",
      "Fortune Telling" : "Someone is planning a party for you, but not everyone feels so good about your recent success. Watch out for envious friends.",
      "When?" : "Between August 2nd and August 11th.",
      "Symbols and Insights" : {
        "The Triumphal Procession" : "The parade depicted on RWS-inspired decks calls to mind the modern \"ticker tape parade,\" in which heroes roll down boulevards, cheered on by crowds. Does your current level of performance warrant such recognition?",
        "Flags, Banners, and Laurels" : "Many illustrations for this card show Wands with flags, banners, and laurels attached. There are many ways to reward victory; what kind of recognition do you crave? When the time comes to recognize the contribution of others, what visual signs of your approval do you offer?",
        "Responses to the Victory of Others" : "When others are victorious, do you lose well? How might this person change her response for the better? How might you change yours?",
        "The Marseilles Image" : "The six Wands are woven together into an intricate lattice. The instability of the Five has given way to the interaction and cooperation of the six. As you strive for personal victory, you'd do well to interlace your efforts this efficiently with the work of others."
      },
      "Questions to Ask" : ["What kind of recognition do I crave? Why?","How freely do I praise the achievements of others?","What happens when the parade is over?"]
    }
  },
  {
    "id" : "28",
    "img" : "clubs07.jpg",
    "name" : "Seven of Wands",
    "suit": "Wands",
    "number": "7",
    "description": {
      "keywords": ["Bravery","Resolve","Determination"],
      "Light": "Refusing to be silenced through fear or intimidation. Continuing a fight against all odds. Being fierce. Defending yourself against physical and emotional attacks. Refusing to put up with abuse. Clinging to your values despite all pressure to abandon them.",
      "Shadow" : "Having a chip on your shoulder. Taking unnecessary risks as a means of proving your fearlessness. Looking for an opportunity to take offense. Responding to constructive criticism with defensiveness. Refusing to stand up for yourself and your beliefs.",
      "Numerology" : "7 (The Motive: imagination, inner work, psychology)",
      "Astrology" : "Mars in Leo",
      "Affirmation" : "\"I am willing to take a stand for what I believe in.\"",
      "Story" : "The Main Character is attacked by the minions of his adversary.",
      "Relationships" : "In a healthy relationship, each person feels secure. Partners and friends who constantly abuse others or tear people down must be confronted. Being in a relationship does not mean squelching your own unique insights; stand up for what you feel is right.",
      "Work" : "The workplace tends to reward aggression. Defend yourself and your own work, making sure you have hard data to back up your claims. If you must become involved in unpleasantness, be sure those you investigate have no valid reason to feel attacked.",
      "Spirituality" : "Especially when you feel attacked, your spirituality should guide you. Don't be defensive; as a spiritual person, you know it's \"not about you.\" As dramas unfold, stand up for your beliefs, but avoid absorbing and reflecting the poisonous emotions of others.",
      "Personal Growth" : "Standing up for yourself is healthy and reasonable. Turning the other cheek doesn't mean making yourself into a doormat. It's okay to insist on respect. Apply this principle to your interactions with others, too; it's easier to get fair treatment when you're known for treating others fairly.",
      "Fortune Telling" : "Don't be surprised by a personal attack. Prepare to defend yourself or someone you love.",
      "When?" : "Between August 12th and 22nd.",
      "Symbols and Insights" : {
        "Six Converging Wands" : "On RWS-inspired decks, we often see a lone figure threatened by six converging Wands. Six is the number of collaboration, suggesting that many people have come together to launch an attack. But who is carrying those wands? Is the attack real...or imagined?",
        "The King of the Hill" : "Many illustrations for this card place the lone warrior on top of a small hill cliff. Is our friend a guard? If so, what is he guarding? And, more importantly, is it worth fighting for?",
        "Crisis as a Clarifier" : "A crisis has the power to reveal what we really value. In your situation, how far are you willing to go to stand up for what you believe in?",
        "The Marseilles Image" : "Again, a lone wand comes to shatter the arrangement we worked so hard to establish! The lattice we built for the Six collapses. Why would someone do this? How can we prevent it from happening? And are these, in the end, the questions we should be asking?"
      },
      "Questions to Ask" : ["When do you feel most threatened? When do you get defensive?","How capable are you of defending yourself?","What kinds of beliefs are worth defending?"]
    }
  },
  {
    "id" : "29",
    "img" : "clubs08.jpg",
    "name" : "Eight of Wands",
    "suit": "Wands",
    "number": "8",
    "description": {
      "keywords": ["Speed","Swiftness","Responsiveness","Change"],
      "Light": "Taking swift action. Moving forward with a plan as quickly as possible. Energizing yourself. Adapting to sudden changes. Taking setbacks in stride. Embracing the idea that nothing stays the same forever. Reacting quickly and appropriately to unforeseen problems.",
      "Shadow" : "Giving in to panic. Running in circles and screaming. Insisting things must always stay the same. Stirring the pot just to see what will happen. Rushing others. Refusing to re-evaluate a schedule or program, even when it's clearly no longer appropriate.",
      "Numerology" : "8 (The Action: movement, outer work, swiftness)",
      "Astrology" : "Mercury in Sagittarius",
      "Affirmation" : "\"I adapt quickly to change.\"",
      "Story" : "The Main Character's adaptability is tested when he or she is thrown into unforeseen circumstances.",
      "Relationships" : "People and situations are always changing; the key is deciding whether you want to grow together...or grow apart. What worked once might not work later; on the other hand, those you dismissed before might now be perfect mates. Embrace change, and you'll be surprised at how quickly good things happen.",
      "Work" : "Yesterday's solutions aren't going to solve today's problems; in minutes, innovations become old news. Shake things up. Tap into a new stream of information. Bring in an expert from outside. Juggle your hours. Your adaptability will atrophy if you don't exercise it with new challenges.",
      "Spirituality" : "Become aware of patterns of change: the seasons, the phases of the moon, the steady progression of the Church calendar. Time is passing faster than you realize, and using your faith as a means to honor and appreciate that transition will help you better appreciate the time you have.",
      "Personal Growth" : "When things change, do you tend to procrastinate, or respond right away? Handling something nowÑtaking action as soon as possibleÑcan keep a small issue from becoming a large stumbling block. Resolve to handle challenges as soon as you possibly can.",
      "Fortune Telling" : "Watch for a surprising letter in the mail. Your whole world is about to be turned on its ear.",
      "When?" : "Between November 23rd and December 2nd.",
      "Symbols and Insights" : {
        "Flying Wands" : "Waite, in The Pictorial Key to the Tarot, suggests the eight Wands seen on RWS-inspired versions of this card are just shy of impact. If your worst case scenario suddenly became reality, what would your action plan be?",
        "The Pastoral Landscape" : "The quiet landscape seen in RWS versions of this card represents the calm before the storm. Even in times of peace, a wise person watches for incoming Wands...and prepares to deal with the changes generated by their arrival.",
        "Reflexive Action" : "Are your actions driven by reflection or reflex? By what criteria would you judge your own response to a crisis?",
        "The Marseilles Image" : "The Marseilles Eight of Wands presents a lattice even sturdier than the one last seen on the Six. We've wrapped our mind around the new influence that arrived with the Seven, and now we've integrated the new idea into our Work. The result? We're more stable than ever before."
      },
      "Questions to Ask" : ["How quickly to you adapt to change?","What would your response be to overwhelming, sudden change?","What changes are on your horizon? How well have you prepared for them?"]
    }
  },
  {
    "id" : "30",
    "img" : "clubs09.jpg",
    "name" : "Nine of Wands",
    "suit": "Wands",
    "number": "9",
    "description": {
      "keywords": ["Toughness","Persistence","Stamina","Loyalty","Release"],
      "Light": "Sticking with it for the duration. Fulfilling your promises and obligations. Bearing up under incredible duress. Dragging yourself across the finish line. Picking yourself up by your own bootstraps. Refusing to quit. Going as far as you can go and being satisfied with your performance.",
      "Shadow" : "Making yourself a martyr. Abandoning your post. Giving up at the first sign of opposition. Being prevented from fulfilling an obligation. Failing to be dependable. Refusing to let something go that needs to be released. Beating a dead horse.",
      "Numerology" : "9 (The Completion: fullness, readiness, ripeness)",
      "Astrology" : "Moon in Sagittarius",
      "Affirmation" : "\"When the going gets tough, I stay the course.\"",
      "Story" : "The Main Character continues to strive for the goal, despite terrible odds.",
      "Relationships" : "Sometimes relationships of any kind are hard work. You and your partner must be able to count on each other when the going gets rough. If you've been unreliable, it's time to change your ways. If your partner doesn't seem to be in things for the long haul, you should plan accordingly.",
      "Work" : "When there's hard work to be done, you learn who your real friends are. Call on others for support, especially if you feel overwhelmed. Take note of who responds. Recognize, too, when you've had enough; doggedly pressing on when you're broken benefits no one.",
      "Spirituality" : "Meaningful progress takes time. You'll be tempted to give up, to abandon your practices, to shrug off your faith. Stick with it. Your transformation is slow, but steady. Encourage yourself by looking back and seeing how far you've come.",
      "Personal Growth" : "Know when to be a hero. Coached by phrases like \"When the going gets tough, the tough get going,\" you'll be tempted to crawl ahead even when you're down. Some causes deserve your total dedication; some don't. Knowing the difference is an important component of maturity.",
      "Fortune Telling" : "Don't relax yet; there's more to come. The test you're facing now is happening for one reason: to show you who your real friends are.",
      "When?" : "December 3rd through 12th.",
      "Symbols and Insights" : {
        "The Battered Hero" : "The figure on RWS-inspired versions of this card looks exhausted; his Wand is more a prop than a weapon. Still, he persists. If you've been through a lot yourself, this card can be a reminder that there's light at the end of the tunnel.",
        "Eight Background Wands" : "Eight is the number of action and outer work; Wands is the suit of intention. In the background of many RWS versions of this card, we see eight Wands; they represent the work done to get this far. When you're exhausted, look back. Your achievements can give you the strength to keep moving forward.",
        "The Fullness of Intention" : "A slightly different take on numerology positions this card as the \"fullness of intention.\" Having done all that can be done, we must let go.",
        "The Marseilles Image" : "Another intrusive Wand appears, but the lattice of eight Wands is to strong to be broken. One imagines the entire structure sagging under the weight of this new addition. Will the work (suggested by the eight Wands) done so far hold up to this new challenge? Only time will tell."
      },
      "Questions to Ask" : ["How do you cope when things get really tough?","When you get low, what encourages you to go on?","At what point should you be able to let this situation go?"]
    }
  },
  {
    "id" : "31",
    "img" : "clubs10.jpg",
    "name" : "Ten of Wands",
    "suit": "Wands",
    "number": "10",
    "description": {
      "keywords": ["Exhaustion","Resistance","Burden","Oppression"],
      "Light": "Holding your own in extreme circumstances. Helping others carry their burdens. Coming to the aid of the oppressed. Knowing and being honest about your own limits. Recognizing when you are not well-suited for a particular task.",
      "Shadow" : "Taking on more work than you know you can handle. Refusing to say \"No\" when you're already overloaded. Making a habit of working overtime. Shielding others from facing the consequences of their own poor judgment. Over-extending yourself on a regular basis.",
      "Numerology" : "10 (The End: finality, completion, exhaustion)",
      "Astrology" : "Saturn in Sagittarius",
      "Affirmation" : "\"I respect my own limits.\"",
      "Story" : "The Main Character attempts a task he is not well-suited for, with disastrous results.",
      "Relationships" : "Some relationships become a burden. When this happens, have the presence of mind to put them aside. Relationships involve more than one person. When you've done all you can do to make a relationship a success, there's no shame in withdrawing from a bad situation.",
      "Work" : "Over-extending yourself on a regular basis is not a sign of strength: it's evidence of poor judgment. You cannot perform at your best when exhausted. There are too many irons in the fire. Review your values and make tough choices, letting go of work that isn't critical.",
      "Spirituality" : "When we are exhausted, we tend to feel disconnected from Spirit. Restore yourself (and your spirit) by scheduling regular quiet time. Guard this appointment with contemplative silence as jealously as you would an appointment with a life-saving doctor. Disconnect and reconnect.",
      "Personal Growth" : "Knowing your own limits is a sign of maturity. Don't take on more than you can reliably handle. It's better to be respected for saying \"No\" than hated for saying \"Yes\" and failing to deliver. When unreasonable demands are made, point them out and sidestep them.",
      "Fortune Telling" : "You're worn out! Back off, take a time out, and let someone else handle things for a while.",
      "When?" : "Between December 13th and 21st.",
      "Symbols and Insights" : {
        "The Stooped Figure" : "Most RWS-inspired decks depict a stooped, overburdened figure on this card. He has gone as far as sheer Will can take him; he is on the verge of collapse. There comes a point when too much is too much, and it's time to re-evaluate your approach to the problem.",
        "The Distant Village" : "Some RWS-inspired decks depict a distant village in the background of the card. The village is the light at the end of the tunnel: a reminded that the destination is close at hand. Your own \"way out\" may be as simple as declining an opportunity you lack the time or energy to complete.",
        "Exhaustion" : "Fullness has been exceeded, and the energy of the Wands suit becomes spoiled and over-extended. As a result, weÕve become slaves to our own intentions; a little searching, though, will help us find the key to escaping our self-made prisons.",
        "The Marseilles Image" : "Though woven tightly together, the ten Wands seen here are as compressed as they can be. Adding another would likely cause an explosion! Intent and action have reached their limit; it's time to try another way of solving the problem at hand."
      },
      "Questions to Ask" : ["How will you know when you reach the end of your rope?","How easily do you say no to new projects and requests?","What projects could you delegate...or eliminate?"]
    }
  },
  {
    "id" : "32",
    "img" : "clubs11.jpg",
    "name" : "Page of Wands",
    "suit": "Wands",
    "description": {
      "keywords": ["Enthusiasm","Eagerness","Confidence","Validation","Affirmation"],
      "Light": "Leaping at a new opportunity. Being a cheerleader or ardent advocate for your cause. Being a True Believer. Taking first steps toward independence. Trusting in your own abilities. Asking for feedback.",
      "Shadow" : "Basing your entire self-image on what others think. Seizing every new idea that comes your way without question. Habitually discounting input or feedback from others. Being so eager to \"do it yourself\" that you hinder your own progress.",
      "Personality" : "The Page of Wands can represent anyone who wants to learn (Page) how to make something happen (Wands), especially in academic, romantic, and professional areas of life. The Page may also represent the tendency to be more eager than well-informed or a need to learn by doing.",
      "Elemental" : "Earth of Fire.",
      "Affirmation" : "\"I can do this.\"",
      "Story" : "The Main Character's doubts about himself or herself are dispelled by a positive experience.",
      "Relationships" : "Be eager to try new things, especially activities that fall outside your comfort zone. Don't hide your emotions: let eagerness show. Be vulnerable; if you don't know what to do, admit it. Learn from a more experienced lover, or take someone under your wing.",
      "Work" : "Be honest about your abilityÑor your lack of ability. When someone uses a term you don't know, ask for a definition. Watch for opportunities to be a student and to learn new programs and processes. Your ignorance can be a tool, helping you see what others will dismiss.",
      "Spirituality" : "Pledge to fully experience (or recapture) the thrill of exploring new spiritual horizons. Read a book for beginnersÑeven if you've been involved in your practice for decades. Consider teaching others; beginners should find a trustworthy teacher.",
      "Personal Growth" : "Make something happen! List your goals, determine what needs to be done, pick a target, and take those first steps. Learning new tricks keep the mind and body young. A mature soul sets ego aside and embraces the unknown with eagerness.",
      "Fortune Telling" : "This card represents a young man or woman with a fiery, enthusiastic demeanor, likely born a Cancer, Leo, or Virgo, who wants to start a new relationship with you.",
      "When?" : "Between June 21st and September 22nd.",
      "Symbols and Insights" : {
        "The Romantic Pose" : "Most RWS-inspired cards will feature a young man in impractical attire, gazing at a Wand as though it were a lover. The Page feels intently the fiery grip of passion, but lacks the experience to know how such intense emotion should be put into action. Sound familiar?",
        "Awkwardness" : "In addition to the Page's yearning gaze, he is frequently posed in a manner that suggests awkwardness or clumsiness. Are you dealing with someone too young (or young at heart) to be emotionally or intentionally stable?",
        "The Need for Affirmation" : "When learning a new skill, good feedback speeds our progress and boosts our confidence. The best students know this, and seek out worthy teachers to evaluate their work.",
        "The Marseilles Image" : "Is it a walking stick? Is it a weapon? The Marseilles Page of Wands isn't sure, and his stiff pose and awkward grip betray his uncertainty. Rather than allow your own actions to betray your uncertainties, be proactive: ask for help."
      },
      "Questions to Ask" : ["How easily do you admit your own inexperience?","How can you be a better student or employee?","What qualities would make a total beginner's voyage of discovery easier?"]
    }
  },
  {
    "id" : "33",
    "img" : "clubs12.jpg",
    "name" : "Knight of Wands",
    "suit": "Wands",
    "description": {
      "keywords": ["Boldness","Bravado","Passion","Persuation","Advocacy"],
      "Light": "Charging ahead. Making rapid progress. Refusing limits. Dazzling those around you with your wit and charm. Convincing others of your right to leadership. Convincing others to follow you. Being a catalyst for change.",
      "Shadow" : "Blundering forward with inadequate skill or information. Running roughshod over the feelings of others. Using sex appeal to manipulate others. Forcing your leadership or ideology on others. Beginning many projects without finishing any.",
      "Personality" : "The Knight of Wands can represent anyone who wants to lead the way (Knight) to a goal (Wands), especially in academic, romantic, and professional areas of life. The Knight may also represent the tendency to be more forceful than cooperative or the need to take action at any cost.",
      "Elemental" : "Air of Fire.",
      "Affirmation" : "\"I can lead the way to success.\"",
      "Story" : "The Main Character leads the effort to reach a common goal.",
      "Relationships" : "Ask someone out. Set up a romantic evening and make it happen. Speak your heart, and challenge others to do the same. Be feverishly romantic. Pull out all the stops. After making sure your motives are pure, use your charisma to bowl someone over.",
      "Work" : "If you are not equipped to be a charismatic advocate for your ideas, find a champion and enlist his or her aid. Your focus today is more on \"sizzle\" than \"steak.\" Sell your ideas and skills as boldly as you can without distorting or exaggerating their value. Stress benefits and push for commitments.",
      "Spirituality" : "Without coming off as a fanatic, you can share your spiritual journey with others. Offer prayers. Mention important Truths you've learned to apply. Loan out your books. Mention your faith in a letter to a friend. Every time you share your Light, you aid in conquering Darkness.",
      "Personal Growth" : "Share yourself. Watch for opportunities to lend a hand, offer your skills, or lead an effort others will avoid. Prove yourself in small things, and others will be willing to follow you into larger battles.",
      "Fortune Telling" : "This card represents a man with a bold, passionate personality, likely born between July 12th and August 11th, who wants to sweep you off your feet.",
      "When?" : "Between July 12th and August 11th.",
      "Symbols and Insights" : {
        "Charging Forward" : "Versions of this card based on RWS imagery often depict a fair young man streaking across the desert in full battle armor. Is the horse you're riding today galloping fast...or out of control?",
        "Pyramids" : "In the background of RWS-inspired versions of this card, we frequently see pyramids. While his \"get things done\" attitude moves the Knight rapidly forward, the pyramids remind him that long-term application of force over time is more likely the key to lasting achievement.",
        "Eliciting Involvement" : "Before inviting people to join your venture, find out what benefits really interest them or you might gallop off into the distance, alone!",
        "The Marseilles Image" : "The Marseilles Knight of Wands is a picture of distraction. Instead of looking forward, he's looking back. Despite his uncertainty, he's beating his horse, urging speed. Before you rush headlong into action, be sure you have a destination defined."
      },
      "Questions to Ask" : ["To what extent have you defined your ultimate goal?","What's the fastest way to get the job done? Is this necessarily the best way?","How long has it been since you looked back to see if others really are following your lead?"]
    }
  },
  {
    "id" : "34",
    "img" : "clubs13.jpg",
    "name" : "Queen of Wands",
    "suit": "Wands",
    "description": {
      "keywords": ["Attraction","Unification","Attention","Collaboration"],
      "Light": "Paying close attention. Helping others focus on the issue at hand. Getting everyone to work together. Identifying common ground. Bringing people together, despite their differences. Using reverse psychology.",
      "Shadow" : "Being distracted, or using your charms or skills to distract others from the goal. Calling attention to yourself with negative or unhealthy behaviors. Disrupting group activities as a means of feeding your own ego.",
      "Personality" : "The Queen of Wands can represent anyone who wants to convince others (Queen) to pursue a common goal (Wands), especially in academic, romantic, and professional areas of life. The Queen may also represent the tendency to be more manipulative than direct or the need to capture the attention of others.",
      "Elemental" : "Water of Fire.",
      "Affirmation" : "\"I use my influence to promote unity.\"",
      "Story" : "The Main Character must persuade others to follow his or her lead.",
      "Relationships" : "Pull together a group of friends and organize a group date. If in an argument, make a special effort to see all sides. Refrain from thinking the issue at hand is \"all about you.\" Understand the motives of everyone involved, then go for common ground.",
      "Work" : "Progress is complicated by a lack of attention to details. Start from square one. Ask everyone involved to give a stamp of approval to the parts of a project they control. Get more people involved, and more people will be invested in the success of your project.",
      "Spirituality" : "A quiet mind is a sign of a focused spirit. When you're feeling distracted, your spirit is pulled in every direction; when you're focused, your energies flow naturally toward success. Take a deep breath, close your door, and invest a few minutes in calming yourself and your soul.",
      "Personal Growth" : "When you give someone your full and undivided attention, you give a rare and amazing gift. If you cultivate an ability to truly listen and respond, others will identify you as an intelligent, sensitive person they can trust with matters of real importance.",
      "Fortune Telling" : "This card represents a woman with an attractive, appealing personality, likely born between March 11th and April 20th, who wants to charm you into doing things her way.",
      "When?" : "Between March 11th and April 20th.",
      "Symbols and Insights" : {
        "The Black Cat" : "The black cat on RWS-inspired versions of this card is a familiar, an animal helper sent to guard, assist, and protect. Having a \"familiar\" (an aide openly or covertly embraces your ideology) in a group can help you steer participants toward agreement.",
        "Sunflowers" : "Sunflowers twist on their stems, following the course of the Sun through the sky. Are they devoting exclusive attention to the Sun, or does its light and warmth merely distract them from the world around them?",
        "Biases and Agendas" : "When pushed to cast your vote, be sure to know the biases and agendas of those who guide your collaborative efforts.",
        "The Marseilles Image" : "The Marseilles Queen of Wands looks sharply away, slouching in her throne - the picture of pure distraction. Still, her Wand is held at the ready. Should our attention wander from her, she's liable to offer a gentle tap of correction."
      },
      "Questions to Ask" : ["How attentive am I?","How can I draw people's attention to what we have in common?","To what extent am I able to convince people to do what I want them to do?"]
    }
  },
  {
    "id" : "35",
    "img" : "clubs14.jpg",
    "name" : "King of Wands",
    "suit": "Wands",
    "description": {
      "keywords": ["Creativity","Ingenuity","Achievement","Direction"],
      "Light": "Putting old things together in new and exciting ways. Coming up with unexpected solutions. Using your experience to solve puzzles and problems. Doing what you set out to do. Directing the efforts of others.",
      "Shadow" : "Using your creativity to get out of honest work. Investing great energy in avoiding responsibility. Boasting about achievements without putting your expertise to practical use. Lording it over others.",
      "Personality" : "The King of Wands can represent anyone who wants to oversee or take control of (King) a situation (Wands), especially in academic, romantic, and professional areas of life. The King may also represent the tendency to be more authoritative than cooperative or the need to control the actions of others.",
      "Elemental" : "Fire of Fire",
      "Affirmation" : "\"I use my authority and experience to get things done faster.\"",
      "Story" : "Surrounded by indecision, the Main Character takes control and gives orders.",
      "Relationships" : "When it comes to your own relationships, you're in the driver's seat. What do you want? Are you getting it? If not, why not? While relationships are a two-way street, you ultimately decide whether or not you will continue to be involved. It could be time to lay down the law.",
      "Work" : "Someone in authority needs to be calling the shots. There is a need for input from an experienced worker who has been empowered to cut through red tape and make things happen. If you're that person, step up. If you're not that person, step aside.",
      "Spirituality" : "Who's in control? We like to think we hold the reins of our lives, but all too often, the Universe reminds us that we are a very small cog in a very large machine. Consider today the role you play in larger plans, and make yourself available to be a means for accomplishing great things.",
      "Personal Growth" : "In order to achieve your goals, you must control what you can: your habits, your choices, your schedule. Without being rigid, you can put a structure in place that takes the craziness out of the most hectic days. That foundation will help you maintain the calmness of a King, even when the castle walls are falling down around you.",
      "Fortune Telling" : "This card represents an older man with a commanding, charismatic personality, likely born between November 13th and December 12th, who prefers to give directions and have them followed.",
      "When?" : "Between November 13th and December 12th.",
      "Symbols and Insights" : {
        "The Lion and Salamander" : "The Lion, often seen on the throne of RWS-inspired versions of this card, has long been a symbol of royalty. The lowly salamander was once thought to be born in fire and capable of passing through flame without injury. In your situation, who is trying to appear impervious to attack? Why?",
        "The Posture of Authority" : "The posture of the King of Wands is generally relaxed, but authoritative. He often sits with legs apart, suggesting sexual dominance. There's a lesson here: half of being confident is acting confident.",
        "Power vs. Preparedness" : "Many are eager for power and authority, but few are prepared to accept the consequences of absolute power. Are you?",
        "The Marseilles Image" : "The Marseilles King of Wands looks positively splendid with his wide-brimmed crown, epaulets, and gleaming armor. He is the picture of confident command. His demeanor may hold the key to your situation. What would happen if you were to lead while clearly expecting others to follow?"
      },
      "Questions to Ask" : ["How confident a leader am I?","How can I project more confidence?","How can I offer my expertise in ways that inspire others to follow me?"]
    }
  },
  {
    "id" : "36",
    "img" : "cups01.jpg",
    "name" : "Ace of Cups",
    "suit": "Cups",
    "number": "1",
    "description": {
      "keywords": ["Intuition","Spiritualtiy","Affection","Motivation"],
      "Light": "Trusting your feelings. Opening yourself to spirit. Accepting and returning affection. Getting in touch with what motivates you. Taking advantage of an opportunity to express love to others. Listening to the still, small voice.",
      "Shadow" : "Hiding your feelings. Spurning an opportunity to love or be loved. Numbing yourself to spiritual yearnings. Rejecting the counsel of your heart. Becoming a puppet of your own emotions. Indulging in hysteria or obsession.",
      "Numerology" : "1 (The Origin: the starting point, the seed, opportunity)",
      "Astrology" : "Cancer, Scorpio, Pisces",
      "Affirmation" : "\"I listen to the counsel of my heart.\"",
      "Story" : "The Main Character meets a love interest or discovers his or her true calling.",
      "Relationships" : "This is an opportunity to set logic aside and allow actions to be guided by feelings alone. Irrational? Perhaps. But in certain matters, logic does not apply. Be romantic. Be spiritual. This moment is a chance to see romance as an expression of spirituality, and vice-versa.",
      "Work" : "How fulfilling is your work? If you're going through the motions, this card challenges you to get back in touch with what delights you. Find a way to integrate your labor with your dreams. If you're already fulfilled, watch for an opportunity to take your satisfaction to the next level.",
      "Spirituality" : "On rare occasions, Heaven opens, and the Hand of God offers us the opportunity to experience unexpected spiritual highs. Pay close attention to the events around you; one is a seed - an opportunity to be uniquely and totally immersed in the work and power of Spirit.",
      "Personal Growth" : "How comfortable are you with expressions of emotion? Of faith? This card challenges you to be more open with both. A centered person freely shares what he or she feels, and a truly spiritual person can share his or her faith in natural, non-aggressive ways. Give both a try.",
      "Fortune Telling" : "Romance is in the cards! A new relationship or marriage is just around the corner. Prayers are answered.",
      "When?" : "In the Summer",
      "Symbols and Insights" : {
        "The Hand of God" : "On the Aces in Marseilles and RWS-inspired decks, a heavenly hand extends from the clouds, offering the viewer the suit's distinctive marker. When opportunity comes your way, take advantage of it; the hand that extends an offer can always withdraw it.",
        "The Holy Grail" : "The RWS depicts the chalice as the GrailÑthe cup of the Christ. In addition to the spiritual connotations of the Grail, this card (like the Grail) can be connected with the Divine Feminine. What would your spiritual quest be? What hidden truths should you pursue?",
        "Cups as Symbols" : "As a suit marker, Cups suggest receptivity: they are vessels, waiting to be filled. Cups have long been associated with divination (remember the uproar caused when Benjamin stole King Joseph's cup?) and, by extension, intuition. How can you enhance your own receptivity?",
        "The Nature of the Ace" : "Compressed into the Ace are all the qualities of all the other cards of the suit. In this way, the Ace can be said to be the \"root\" or \"seed\" of its associated element. How might your situation contain the seeds of emotional or spiritual growth?",
        "Your First Impressions" : "When you see the Ace, what's your first impression? What will the cup contain? What actions are you expected to take?"
      },
      "Questions to Ask" : ["What am I feeling right now?","How would I go about opening myself to spiritual guidance?","What motivates me the most - pleasure or pain? Why?"]
    }
  },
  {
    "id" : "37",
    "img" : "cups02.jpg",
    "name" : "Two of Cups",
    "suit": "Cups",
    "number": "2",
    "description": {
      "keywords": ["Union","Attraction","Combination","Affection"],
      "Light": "Being drawn to someone. Longing for someone or something. Acting on your desires. Discovering a feeling is mutual. Doing what makes you feel good. Merging. Healing broken ties. Admitting two people feel differently about each other and moving on.",
      "Shadow" : "Burning bridges. Becoming caught up in unhealthy codependency. Shutting out anyone but your chosen few. Obsessing on someone who does not return your affections. Despairing over finding \"The One.\" Deceiving yourself about your true orientation.",
      "Numerology" : "2 (The Other: duality, division, debate)",
      "Astrology" : "Venus in Cancer",
      "Affirmation" : "\"I am attuned to what my heart truly desires.\"",
      "Story" : "The Main Character improves his or her lot by joining with likeminded others.",
      "Relationships" : "In a healthy relationship, everyone involved feels safe enough to reveal how he or she really feels. Feeling attraction? Say so. Not invested? Say so. Reflected love is a balm for the soul, but hidden or repressed emotions will poison a relationship.",
      "Work" : "Meet your goals more easily by recruiting others who see things your way. If what you're doing now doesn't thrill you, admit it. Do what delights you, or engineer a change of heart that allows you to enjoy what you're doing now.",
      "Spirituality" : "The idea that your spiritual practice must satisfy anyone other than yourself is an illusion. Do what you feel drawn to do. Find support and solace with like-minded individuals. Forgive spiritual abuse and rediscover the power of unity.",
      "Personal Growth" : "Rather than merely reflect the desires of others, identify what you want and be yourself. You can appreciate others without sacrificing your individuality. Honesty is power; be brave enough to admit what you really feel.",
      "Fortune Telling" : "Someone has a secret crush on you. Relationships should be mutual; get rid of a leech.",
      "When?" : "Between June 21st and July 1st.",
      "Symbols and Insights" : {
        "The Medicinal Angel" : "In RWS-inspired decks, an angel and a caduceus (the medical symbol) rise from the two cups, signifying the healing power of love. How might affection be the balm for what ails you now?",
        "The Romantic Couple" : "Many versions of this card depict a couple caught up in intense, hypnotic passion. This symbolizes the power of reflected feeling: the unity achieved when yin and yang combine. In your situation, what's missing? What's needed in order to be complete?",
        "Balance" : "Note how often illustrations for this card incorporate themes of balance. Emotional extremes and obsessions unbalance us; tempering your feelings with wisdom may help you feel more empowered.",
        "Mutuality" : "Do your relationships and alliances incorporate a cycle of healthy interdependence and mutual support?",
        "Responses to Mutuality" : "RWS-inspired couples seem to be on the verge of a toast. What do you need to celebrate? To acknowledge? To embrace?",
        "The Marseilles Image" : "Two perfectly-balanced chalices give rise to a beautifully symmetrical blossom. Stability requires equality. Is everyone in your situation equally invested? What role do mutual feelings play?"
      },
      "Questions to Ask" : ["How can I make sure that what I'm feeling is mutual?\",\"When was the last time I felt \"in love\" with someone or something?","What do you need in order to feel emotionally stable?"]
    }
  },
  {
    "id" : "38",
    "img" : "cups03.jpg",
    "name" : "Three of Cups",
    "suit": "Cups",
    "number": "3",
    "description": {
      "keywords": ["Celebration","Expression","Community","Friendliness"],
      "Light": "Celebrating your feelings or connections with others. Expressing joy through song, dance, or physical affection. Working together with others who share your feelings. Performing acts of service as a way of saying, \"I love you.\" Embracing unconventional romantic arrangements.",
      "Shadow" : "Mistaking giddiness for true affection. Being dominated by manic emotions. Expecting everyone to always feel the same way you do. Demanding unreasonable support from friends or family. Partying to a dangerous or unhealthy extent.",
      "Numerology" : "3 (The Result: expression, productivity, output)",
      "Astrology" : "Mercury in Cancer",
      "Affirmation" : "\"I allow my actions to reflect my true emotions.\"",
      "Story" : "The Main Character's actions show how he or she really feels.",
      "Relationships" : "Be open to unconventional relationships that defy your dearly-held expectations. Saying what you feel may not be enough; sometimes, actions speak louder than words. Think beyond sex. What service can you render as a way of showing your love?",
      "Work" : "For insight into what you really love to do, monitor how you spend your time. We make time for what delights us. If your schedule is dominated by things you don't love doing, it's time to realign your priorities. Ask others how they manage their time.",
      "Spirituality" : "Especially when walking a solitary path, it's easy to neglect the rituals that are an integral part of living with Spirit. Become a part of a like-minded group. Celebrate the season. Seek outward, shared expressions of your inner faith.",
      "Personal Growth" : "To have more friends, be one. Look for opportunities to serve others or aid them in their pursuits. Shared success is sweeter, and you'll find your own success is multiplied when you're helping others achieve their goals, too.",
      "Fortune Telling" : "Unconventional romance is coming your way: a gay or lesbian relationship, or a love affair with someone you've always dismissed.",
      "When?" : "Between July 2nd and 11th.",
      "Symbols and Insights" : {
        "The Dancing Women" : "In RWS-inspired decks, this card frequently depicts three dancing women. How in touch are you with your more feminine emotions and instincts? To what extent do you regard \"expressing emotion\" as a feminine trait?",
        "Upraised Cups" : "Upraised cups suggest a toast, which, by extension, is associated with wine. What deserves to be celebrated, and what form of recognition would be appropriate?",
        "Celebration vs. Inebriation" : "At what point do you cross the line from having fun to having too much fun? How can you know when enough's enough?",
        "The Marseilles Image" : "The blossom seen on the Two of Cups has matured into a third cup: the \"offspring\" off the original pair. What fruit is being produced by your own spiritual work or emotional involvement?"
      },
      "Questions to Ask" : ["What's worth celebrating in my life?","How can I demonstrate my feelings in appropriate ways?","What can I do to show my partner how I really feel?"]
    }
  },
  {
    "id" : "39",
    "img" : "cups04.jpg",
    "name" : "Four of Cups",
    "suit": "Cups",
    "number": "4",
    "description": {
      "keywords": ["Boredom","Listlessness","Lethargy","Stability","Ingratitude"],
      "Light": "Maintaining your emotional stability. Refusing to give in to overwhelming emotions. Appreciating what you have and refusing to take it for granted. Seeing the value of long-term commitments.",
      "Shadow" : "Being bored. Daydreaming at the expense of your work. Refusing to be engaged by opportunity. Taking people and relationships for granted. Ignoring romantic or spiritual opportunities. Spurning inspiration. Feeling everything should stay \"just like it is!\"",
      "Numerology" : "4 (The Status Quo: stability, equality, persistence)",
      "Astrology" : "Moon in Cancer",
      "Affirmation" : "\"I appreciate what I've been given.\"",
      "Story" : "For right or wrong, the Main Character refuses to re-evaluate his or her feelings about an important person or issue. Alternatively, the Main Character suffers from boredom.",
      "Relationships" : "Without adequate attention, even the best relationships grow stale over time. Reignite the spark. Rediscover what brought you together. If on your own and unhappy about it, don't play the victim: get back in the game.",
      "Work" : "Bored? It's time to ask for new challenges. When work fails to fulfill us, it quickly becomes drudgery. There's always plenty to do. You can shatter inertia by just getting started. Take that first step; others will follow.",
      "Spirituality" : "Unless you tap into a fresh reservoir, your spiritual well will eventually run dry. Replenish your Spirit with a dip into new experiences: meditation, drumming, fasting. Open yourself to new possibilities.",
      "Personal Growth" : "Boredom and ingratitude blind us to new opportunities. Don't fall into this trap! Alter your routine. Try new foods. Dress in different colors. Break the mold, and you'll never stop growing.",
      "Fortune Telling" : "A lover is getting restless. Find out what he or she needs, or new opportunities may lure your partner away.",
      "When?" : "Between July 12th and 21st.",
      "Symbols and Insights" : {
        "The Extended Cup" : "Remember the Ace? Here again, opportunity knocks, but we may be too distracted or dull-witted to hear it. What opportunities are you overlooking today?",
        "The Three Known Cups" : "The figure in RWS-inspired decks already possesses three familiar, comforting cups. What emotional or spiritual resource are you taking for granted?",
        "Delayed Gratification" : "How might focusing on pleasure yet to come help you deal with the less attractive, less engaging responsibilities you face today?",
        "The Marseilles Image" : "Four Cups anchor a flowering vine, providing stability, but also limiting further growth. What ingrained emotional responses, useful in the past, limit your personal evolution now?"
      },
      "Questions to Ask" : ["How can I use this \"downtime\" to my best advantage?","How can I show my partner that I don't take him or her for granted?","To what extent is my mood blinding me to new opportunities?"]
    }
  },
  {
    "id" : "40",
    "img" : "cups05.jpg",
    "name" : "Five of Cups",
    "suit": "Cups",
    "number": "5",
    "description": {
      "keywords": ["Loss","Despair","Re-evaluation","Regret","Uncertainty","Repentance"],
      "Light": "Acknowledging loss and moving on. Focusing on how the glass remains \"half-full.\" Finding the silver lining in a dark cloud. Recognizing that loss is a natural part of life. Embracing healthy grief. Learning lessons from harsh consequences.",
      "Shadow" : "Wallowing in unhealthy grief or self-pity. Refusing to move on and let go. Clinging to the past. Obsessing on past lives and past loves. Failing to live in the present. Beating yourself up over past mistakes. Allowing fear of failure to limit your efforts.",
      "Numerology" : "5 (The Catalyst: instability, resistance, confrontation)",
      "Astrology" : "Mars in Scorpio",
      "Affirmation" : "\"I learn from my losses and move on.\"",
      "Story" : "Shocked by loss, the Main Character considers giving up the quest. Alternatively, the Main Character's judgment is distorted by memories of loss.",
      "Relationships" : "Maintaining an affair with memories of past lovers will prevent you from appreciating lovers in the here and now. Burned by past friends or partners? Thank them for the lesson learned and offer your heart to those who deserve your affection.",
      "Work" : "You can't look back. The \"good old days\" have given way to the \"here and now,\" and it's time to adjust your efforts accordingly. If you made mistakes, admit them, pick up the pieces, and return to work with renewed effort. Don't focus on losses; define new goals.",
      "Spirituality" : "Your faith, at first, may seem like \"cold comfort\" in times of loss. But if you accept that all things unfold according to a larger pattern, you must look for the role this loss plays in the grand scheme of things. Three cups remain upright. What do you still have to be thankful for?",
      "Personal Growth" : "Perspective is everything. Each of us is predisposed to focus on the positive or the negative; if you tend toward the latter, condition yourself to be more optimistic by reviewing how apparently dark events of the past gave rise to greater strength or insight.",
      "Fortune Telling" : "A breakup looms. Don't cry over spilt milk. Take your lumps and get back in the saddle.",
      "When?" : "Between October 23rd and November 1st.",
      "Symbols and Insights" : {
        "Three Cups Down, Two Cups Up" : "Tradition leads many artists to draw this card with three Cups overturned and two still standing. The outcome (three) of your emotional or spiritual effort may be disappointing, but now it's time to focus on achieving a new sense of unity (two) elsewhere.",
        "The Posture of Defeat" : "This card often depicts a cloaked figure with slumped shoulders. How is your current mood reflected in your posture? If your demeanor changed, might your mood change along with it?",
        "Weighing Options" : "Do you focus on loss, or on the opportunity inherent in change? Do you grieve for the way things were or do you reassess your situation and adapt to it? How might this insight help you in your own situation?",
        "The Marseilles Image" : "Growth continues (loss forces growth!), but the garden's getting cramped. How can you balance the need for emotional stability with the fact that time is marching on?"
      },
      "Questions to Ask" : ["How do I tend to deal with loss?","What life lesson might I be learning now?","How can I shift my attention from the past to the future?"]
    }
  },
  {
    "id" : "41",
    "img" : "cups06.jpg",
    "name" : "Six of Cups",
    "suit": "Cups",
    "number": "6",
    "description": {
      "keywords": ["Charity","Sharing","Sacrifice","Cooperation","Fairness"],
      "Light": "Donating your time and talents to others. Taking satisfaction in knowing how your efforts will aid others. Creating a \"win-win\" scenario. Giving even when you know repayment is not possible. Being motivated to do a good deed.",
      "Shadow" : "Linking your sense of self-worth to the appraisals of others. Striving to appear more needy than you really are. Taking undeserved or unmerited charity. Bragging about your charitable efforts. Profiteering in times of distress. Refusing to share a burden.",
      "Numerology" : "6 (The Adjustment: cooperation, collaboration, interaction)",
      "Astrology" : "Sun in Scorpio",
      "Affirmation" : "\"I freely give myself to others, expecting nothing in return.\"",
      "Story" : "Defying conventional wisdom, the Main Character lends his or her support to a hopeless cause.",
      "Relationships" : "We like to say relationships involve give and take; this card invites you to focus on giving more than receiving. Watch for opportunities to take on chores that neither you nor your friends (or partners) enjoy. Surprise a loved one with an unexpected, unmerited gift.",
      "Work" : "Most people focus on profit; what might happen if you focused on giving instead? A gift given with strings attached deserves a skeptical response. When charitable gestures are revealed (or perceived) as bribes, don't expect good results.",
      "Spirituality" : "Few things energize the weary spirit like service. Volunteer. Lend a helping hand to someone in need. Give of your time, your money, and your talentsÑall three. In helping others, you help yourself.",
      "Personal Growth" : "When you can give something without expecting anything in return, you've reached an important milestone. Accelerate your quest for maturity; practice giving with no thought of what's in it for you.",
      "Fortune Telling" : "A stingy spirit is strangling your enjoyment of life. Loosen up and think of others for once, why don't you?",
      "When?" : "Between November 2nd and 11th.",
      "Symbols and Insights" : {
        "The Exchange" : "On many versions of this card, one figure passes a bouquet to another. Was money involved, or was this a free gift? How might expectations of payment (or repayment) be shaping your own situation?",
        "Flowers in Cups" : "Many versions of this card depict chalices overflowing with blossoms: a reminder of the inexhaustible bounty available from the Universe. How can you escape a \"poverty mentality?\"",
        "Giving Gifts" : "What attitudes and emotions would motivate such an action? How might these attitudes and emotions play a role in solving your dilemma? What dictates the value of a gift?",
        "The Marseilles Image" : "The cramped configuration of the Five has given way to the orderly balance of the Six. When emotions and spirituality are properly aligned, they become a channel for healthy growth."
      },
      "Questions to Ask" : ["What gifts do I possess? How freely do I give them?","How can I practice unconditional giving?","How would things change if I became a more charitable person?"]
    }
  },
  {
    "id" : "42",
    "img" : "cups07.jpg",
    "name" : "Seven of Cups",
    "suit": "Cups",
    "number": "7",
    "description": {
      "keywords": ["Imagination","Dreams","Illusions","Goals"],
      "Light": "Motivating yourself with images of future success. Using visualization to encourage progress. Taking an imaginative or creative approach to problem solving. Making dreams come true. Gleaning insight from personal visions.",
      "Shadow" : "Obsessing on imaginary fears or uncertain consequences. Giving in to emotional or political terrorism. Spending more time dreaming than working. Failing to envision the possible repercussions of your choices. Being controlled by fear.",
      "Numerology" : "7 (The Motive: imagination, inner work, psychology)",
      "Astrology" : "Venus in Scorpio",
      "Affirmation" : "\"I use inner vision as a tool for growth.\"",
      "Story" : "The Main Character is hindered by unreasonable expectations or unfounded fears. Alternatively, the Main Character insists on remaining true to his or her original vision.",
      "Relationships" : "Comparing your friendships and relationships to unrealistic, Hollywood-produced fantasies is a sure-fire formula for disappointment. Rather than imagine what things ought to be, face how things are...and then take the steps necessary to make your relationships more rewarding.",
      "Work" : "Plan for contingencies. At the same time, don't allow \"what might be\" to distract you from \"what is.\" Unless it's your job to build castles in the sky, be sure to invest more effort in hard work than sweet dreams.",
      "Spirituality" : "Use meditation and prayer to build a clear vision of your spiritual goals, and call on this for inspiration in times of need. Pay attention to dreams; they have important messages for you.",
      "Personal Growth" : "Your imagination is a powerful tool, capable of shaping your experience and your world. Focus your thoughts. See life as it should be, and then take personal responsibility for making your dreams come true. Always link imagination with action!",
      "Fortune Telling" : "You're being fed a line. Rather than be dazzled by fancy words and promises, demand something real.",
      "When?" : "Between November 13th and 22nd.",
      "Symbols and Insights" : {
        "Contents of the Cups" : "On RWS-inspired decks, we often see cups laden with all manner of intriguing options: masks, serpents, wreaths, jewels, elemental symbols, shrouded figures. Be aware of your fears and your motivations, and act accordingly.",
        "Dangers and Surprises" : "In your situation, what is the worst possible outcome? What's the best possible outcome? How are hopes and fears shaping your thoughts about the challenge of the moment?",
        "Dreaming isn't Enough" : "As engaging as dreams and fantasies can be, imagination without action is wasted energy. How might things change if you fantasized less about outcomes and more about new ways to take action?",
        "The Marseilles Image" : "The arrangement of Cups seen here suggests a conflict between opportunity (the one, central cup) and uncertain feelings (the two sets of three). What do you need in order to shift confidently from imagination to action? Until you know, growth will be limited."
      },
      "Questions to Ask" : ["What do you want most? What do you fear most? How are these related?","How is your imagination working for you? Against you?","How might a clearer personal vision help you choose a single cup from the many available?"]
    }
  },
  {
    "id" : "43",
    "img" : "cups08.jpg",
    "name" : "Eight of Cups",
    "suit": "Cups",
    "number": "8",
    "description": {
      "keywords": ["Longing","Dissatisfaction","Quest","Departue","Withdrawal"],
      "Light": "Wanting something better. Blazing your own trail. Realizing there must be more to life. Leaving an unhealthy situation behind. Starting your own business. Going on a retreat. Seeking the \"still, small voice.\"",
      "Shadow" : "Being implacable. Finding fault. Nitpicking. Refusing to settle down. Running away from problems or confrontations. Saying, \"It's my way or the highway!\" Harping on past mistakes and disappointments. Threatening to quit as a strategy to get your way.",
      "Numerology" : "8 (The Action: movement, outer work, swiftness)",
      "Astrology" : "Saturn in Pisces",
      "Affirmation" : "\"I am always open to opportunities for growth.\"",
      "Story" : "The Main Character finds his or her everyday life suddenly unrewarding. The Main Character sets off to find his or her destiny.",
      "Relationships" : "If a relationship fails to supply what you need, consider looking elsewhere. Occasionally, a little time apart can restore perspective and reveal true character. Don't be afraid to be alone; it's okay to be your own person.",
      "Work" : "Threatening to quit is never productive. Dedicate yourself wholeheartedly to a task...or move on without fanfare. A persistent feeling that \"something's missing\" should tell you something. Know when to say \"No!\" to overbearing bosses.",
      "Spirituality" : "Consider the value a retreat might offer. Spend time alone in nature. By stepping outside of your daily routine, you automatically heighten your awareness. When you return to your every day world, you'll see it with fresh eyes.",
      "Personal Growth" : "As children, we ridicule \"quitters.\" As adults, we need to realize the time does come to throw in the towel. In your own life, what habits or attitudes need to be abandoned, cold turkey? Don't think of it as quitting; see quitting as a step toward a new beginning.",
      "Fortune Telling" : "Someone's \"stepping out\" on you, now or in the near future. Maybe it's time to quit talking about the problem and just move on.",
      "When?" : "Between February 19th through 28th.",
      "Symbols and Insights" : {
        "Stacked Chalices" : "The RWS-inspired versions of this card frequently depict eight stacked Cups, arranging to emphasize the ninth cup's absence. What do you lack emotionally or spiritually? How willing are you to pursue it?",
        "The Retreating Figure" : "On many versions of this card, a weary figure walks away, heading toward the horizon. In your own life, what do you need to walk away from? What new experiences or insights might you gain from doing so?",
        "Starting Again" : "What risks are inherent in starting over? What would be lost? What benefits might you gain from a fresh start?",
        "The Marseilles Image" : "What a labor (eight) of love (Cups) this arrangement must have been: such careful balance, such deliberate symmetry! Still, there's room for growth. What labor of love should you undertake today?"
      },
      "Questions to Ask" : ["What do I need to leave behind once and for all?","If I left in search of \"more,\" what would I be looking for, exactly?","How might a retreat enhance my perspective?"]
    }
  },
  {
    "id" : "44",
    "img" : "cups09.jpg",
    "name" : "Nine of Cups",
    "suit": "Cups",
    "number": "9",
    "description": {
      "keywords": ["Satisfation","Sensuality","Luxury","Pleasure"],
      "Light": "Being delighted with your own achievements. Recognizing your own talents and abilities. Reveling in the good things life has to offer. Indulging yourself. Relaxing and unwinding. Having everything you need in order to feel complete.",
      "Shadow" : "Being smug. Satisfying yourself at the expense of others. Being selfish. Over-indulging. Avoiding work that needs to be done. Claiming achievements or skills you do not possess. Never being satisfied, no matter how much you have.",
      "Numerology" : "9 (The Completion: fullness, readiness, ripeness)",
      "Astrology" : "Jupiter in Pisces",
      "Affirmation" : "\"I have everything I need to be happy.\"",
      "Story" : "The Main Character expresses supreme confidence. Alternatively, the Main Character completes a task, but is denied the promised payment.",
      "Relationships" : "Appreciate what you have. When things are good, it's easy to take someone for granted. Today, emphasize the ways your friendships and relationships are working for you. What's working? What's comforting? What do you have to smile about?",
      "Work" : "Who should your work satisfy? What are the criteria used to evaluate your work's completeness? Knowing the answer to these questions is the key to success. Resist the urge to revise and revise; know when to be happy with your best effort.",
      "Spirituality" : "Finding your center(a still point, a place of peace insulated from outer disturbances) will help you maintain an enlightened perspective. When pressured or rushed, remember to breathe. Pause, retreat, withdraw. Allow your spiritual discipline to yield practical results.",
      "Personal Growth" : "A life of constant luxury breeds dullness. Learn when to push back; you can be satisfied with less than you think. With a little restraint in place, you'll be better equipped to enjoy real luxury when the time for indulgence comes.",
      "Fortune Telling" : "Whatever you want, you'll get it.",
      "When?" : "March 1st through 10th.",
      "Symbols and Insights" : {
        "The Happy Merchant" : "The RWS-inspired merchant sits in front of a raised and curtained platform, looking as happy as he can be. The Gilded Tarot's wine maker is \"in his cups,\" merry as ever. What outcome would delight you? How can you make that outcome more likely?",
        "What's behind the Curtain?" : "The curtained shelf on RWS-inspired cards prompts much speculation. What's the merchant hiding? And to what extent is that secret responsible for his apparent satisfaction? In your situation, what information is being hidden or repressed in order to maintain false happiness?",
        "The Life of Leisure" : "In the Blue 9, we see a picture of total relaxation: an escape from the worries and cares of the world. What steps would you have to take in order to experience this kind of peace? Do you know what it would take to satisfy you completely?",
        "The Marseilles Image" : "Strong emotions (represented by the nine Cups) have all but crowded out opportunities for growth and prosperity. To what extent do your emotional responses support your goals? How might they interfere with your achievement of satisfaction?"
      },
      "Questions to Ask" : ["What is true happiness?","If I could have anything, what would I have?","What is my attitude toward luxury? Do I deserve it?"]
    }
  },
  {
    "id" : "45",
    "img" : "cups10.jpg",
    "name" : "Ten of Cups",
    "suit": "Cups",
    "number": "10",
    "description": {
      "keywords": ["Joy","Fulfillment","Overwhelming Emotion","Giddiness"],
      "Light": "Having more than you ever dreamed. Being deeply thankful for all you've been given. Recognizing the Hand of God in the gifts the Universe brings your way. Experiencing transcendent joy. Achieving domestic bliss.",
      "Shadow" : "Comparing your achievements or relationships to unrealistic fantasy standards. Experiencing emotions so intense they blunt your ability to cope with reality. Feeling overwhelmed. Envying the achievements and happiness of others.",
      "Numerology" : "10 (The End: finality, completion, exhaustion)",
      "Astrology" : "Mars in Pisces",
      "Affirmation" : "\"I take time to appreciate what I've been given.\"",
      "Story" : "The Main Character finds himself or herself in a relationship more fulfilling or intense than expected.",
      "Relationships" : "Having it all may be a matter of perspective. Rather than pursue a fantasy romance, decide what you really want and need. Your relationship doesn't require anyone else's stamp of approval. Do what delights you, and be grateful for what you have.",
      "Work" : "Fulfilling work is rare indeed. Be careful how you define success; don't get so caught up in reaching the next goal that you forget to celebrate your achievements so far. Feeling overwhelmed? Take time out to count your blessings and realign your work with what matters most.",
      "Spirituality" : "While we may glimpse nirvana in meditation, maintaining a constant state of bliss may prove to be an unrealistic goal. Delight in the small steps you take along the Path. Don't be overly concerned with spiritual arrival; enjoy the journey.",
      "Personal Growth" : "Gratitude enhances success. While celebrating your achievements, remember to give credit to those who helped you achieve it. Overwhelm others with sincere recognition, and you'll find yourself surrounded by an army of eager supporters.",
      "Fortune Telling" : "Marriage and family are in the cards. Expect a friendship to blossom into a romance.",
      "When?" : "Between March 11th and March 20th.",
      "Symbols and Insights" : {
        "The Happy Family" : "Most RWS-inspired decks depict a joyful couple with dancing children. How do you define family? What makes a group of people a family? How might family play a role in your current situation?",
        "The Rainbow" : "RWS-inspired decks often place a rainbow at the top of this card. Since Biblical times, rainbows have been symbols of promise. In your situation, what's been promised? Who has a promise to keep? What will it take to fulfill that promise?",
        "Overabundance of Emotion" : "Some readers believe tens represent the point at which fullness has been exceeded, and the energy of the suit becomes spoiled and over-extended. Sometimes, emotions spill over, leaving everyone feeling ragged and raw. Might it be time to curb excessive emotions?",
        "The Marseilles Image" : "Just when you thought a card could contain no more Cups...bam! A huge Cup appears, obliterating the struggling blossoms last seen on the nine. In your own situation, what are the signs that, emotionally, things have gone too far?"
      },
      "Questions to Ask" : ["Who gets to define what \"joy\" consists of?","What course of action is available when you feel overwhelmed?","How might vows or promises play a role in achieving a greater level of joy in your life?"]
    }
  },
  {
    "id" : "46",
    "img" : "cups11.jpg",
    "name" : "Page of Cups",
    "suit": "Cups",
    "description": {
      "keywords": ["Wisdom","Diplomacy","Restraint","Composture"],
      "Light": "Showing your emotions freely. Throwing yourself into romance. Nursing a secret crush. Indulging in romantic fantasy. Starting a new relationship. Recalling your first love. Experiencing love for the first time. Converting to a new religion.",
      "Shadow" : "Mistaking a crush for true love. Reading romantic intention into innocent action. Frantically trying to impress others. Indulging in overly-sweet sentimentality. Pretending to more romantic or spiritual experience than you possess.",
      "Personality" : "The Page of Wands can represent anyone who wants to or needs to learn (Page) more about love or spirituality (Cups). Though eager to make a good impression, The Page may lack the experience or information needed to handle new love or new faith with grace and confidence. He or she may overcompensate for this with over-the-top gestures and fanatical zeal.",
      "Elemental" : "Earth of Water.",
      "Affirmation" : "\"I am ready to embrace love and Spirit.\"",
      "Story" : "The Main Character has a \"fish out of water\" experience, leaving him or her feeling uncertain and awkward.",
      "Relationships" : "Fools rush in. Don't mistake the heady rush of infatuation for the enduring stability of true love. Why rush? You've got plenty of time to decide what works (and doesn't work) for you.  Before making commitments, learn the ropes.",
      "Work" : "Be indulgent of beginners and channel their enthusiasm into useful projects. Be wary of those who overstate their skills. Keep your own skills sharp by pursuing every opportunity to be a student. Generate change by embodying enthusiasm.",
      "Spirituality" : "Embrace a new faith. In addition to pursuing what feels right, plumb the depths. Invest time pursuing the roots of your spiritual practice. Become well-grounded in what you believe, so you'll be well-prepared to explain your practice to others.",
      "Personal Growth" : "A gung-ho spirit goes a long way; be sure to pair it with due diligence. Pair your enthusiasm with practical preparation, and you'll find yourself maturing at a surprising rate.",
      "Fortune Telling" : "This card represents a young man or woman with a watery, dreamy demeanor, likely born a Libra, Scorpio, or Sagittarius, who wants to start a new relationship with you.",
      "When?" : "Between September 23rd and December 21st.",
      "Symbols and Insights" : {
        "Awkwardness and Silliness" : "Most RWS-inspired cards will feature a young man in impractical attire - clothing suggesting a lack of connection with sober reality. The Page of Cups wants to play the part of the confident lover or spiritual leader, but lacks the experience required for such a role.",
        "Something Fishy" : "In many decks, a playful fish peeks out of the Page's Cup. How might you recapture your own sense of wonder at the surprises served up by daily life?",
        "Making an Impression" : "Whatever you set out to do, some will be delighted and some will doubt you. Since you can't please everyone, why not abandon extreme strategies and just be yourself?",
        "The Marseilles Image" : "The Page of Cups walks stiffly, as though taking great care not to spill a single drop of his Cup's contents. His eyes are fixed on the Cup, the whole Cup, and nothing but the Cup. How might narrow focus be setting you up for a fall?"
      },
      "Questions to Ask" : ["How worried are you that others will see you as foolish or inexperienced?","To what extent can you be honest about your lack of experience in love and faith?","How can you maintain enthusiasm over time?"]
    }
  },
  {
    "id" : "47",
    "img" : "cups12.jpg",
    "name" : "Knight of Cups",
    "suit": "Cups",
    "description": {
      "keywords": ["Fervor","Zeal","Moodiness","Illumination"],
      "Light": "Being deeply committed to a cause. Giving in to strong emotions, from excitement to depression. Acting on intuition alone. Solving problems intuitively. Believing in and basing decisions on ideals instead of realities. Bringing intuition or passion to the table.",
      "Shadow" : "Becoming a fanatic. Rejecting information that suggests your intuitions are misguided. Allowing your emotions to control you. Giving in to jealousy, confrontation, and peer pressure. Hiding or ignoring intuitive insights.",
      "Personality" : "The Knight of Cups can represent anyone who wants to lead the way (Knight) to stronger emotions and deeper spiritual understanding (Cups). The Knight may also represent the tendency to be more emotional than reasonable, or an urgent desire to experience spiritual or emotional extremes.",
      "Elemental" : "Air of Water.",
      "Affirmation" : "\"I translate my passions into actions.\"",
      "Story" : "Prompted by strong emotion, the Main Character launches into action.",
      "Relationships" : "A desire for a Hollywood-style romance may blunt your ability to appreciate the value of everyday, garden-variety love. There's a fine line between passion and obsession; if your relationship leaves you upset and exhausted, consider other options.",
      "Work" : "Beware initiatives designed to do little more than stir everyone's emotions. Keep your own feelings in check, and don't hesitate to ask for details. Decisions may require more than the facts. What do your wisest advisors feel about your options?",
      "Spirituality" : "Spirituality may incorporate extremes (speaking in tongues, intense rituals), but more modest spiritual experiences are also valid. Strive to find Spirit in everyday actions. When you do, the smallest gestures take on the aura of ministry.",
      "Personal Growth" : "Temper your inclination to be driven to extremes. Love can be passionate without overwhelming you. Spirituality can be deep without becoming bizarre. In all things, seek the balance of the middle ground.",
      "Fortune Telling" : "This card represents a man with an emotional, sensitive personality, likely born between October 13th and November 11th, who wants you to rally around his latest passionate cause.",
      "When?" : "Between October 13th and November 11th.",
      "Symbols and Insights" : {
        "The Cup Held Aloft" : "The Knight of Cups is frequently drawn with a cup held aloftÑor, at least, carried reverently. Emotions are powerful; they must be treated with the utmost care. If we fail to take proper precautions, emotions will overrun our lives, drenching us in obsession and over-reaction.",
        "The Animal's Attitude" : "In RWS-inspired versions of this card, the Knight's steed looks almost contemplative. But Knights, by nature embody extremes. In times of extreme emotion, are you reflective...or berserk?",
        "Intuition and Illumination" : "When emotion and spirituality are combined, we become enlightened, discovering a new way of thinking, seeing, and acting. That transcendence may not be appreciated by those who feel their own light is dimmed by your personal brilliance.",
        "The Marseilles Image" : "The Marseilles Knight of Cups regards his Cup with trepidation, as though terrified of spilling a single precious drop from the Grail. Even his horse is on tip-toe! To what extent are you \"tip-toeing\" around in an effort to avoid heated confrontation?"
      },
      "Questions to Ask" : ["How prone to emotional extremes are you?","What's the difference in driving passion and blind zeal?","How can you inspire others without inciting a riot?"]
    }
  },
  {
    "id" : "48",
    "img" : "cups13.jpg",
    "name" : "Queen of Cups",
    "suit": "Cups",
    "description": {
      "keywords": ["Insightfulness","Spirituality","Compassion","Empathy","Instinct"],
      "Light": "Allowing yourself to be moved by the plight of others. Feeling strong emotions. Possessing unusual sympathy or empathy. Trusting your feelings to guide you. Calling on psychic abilities. Achieving unity with Spirit.",
      "Shadow" : "Becoming so caught up in matters of Spirit, you become detached from the world. Allowing empathy to disable you (instead of inspire action). Using psychic abilities to wield covert influence. Wallowing in emotionalism, sentiment, or self-pity.",
      "Personality" : "The Queen of Cups can represent anyone who wants to convince others (Queen) to be more spiritual and empathetic (Cups). The Queen may also represent the tendency to be more reflective than active, or the need to sway the opinions of others through emotional appeals.",
      "Elemental" : "Water of Water.",
      "Affirmation" : "\"I choose to be enabled, not disabled, by my strong emotions.\"",
      "Story" : "The Main Character plays on sympathy to gain an advantage, or uses love, sex, or affection to gain cooperation.",
      "Relationships" : "No amount of hand-wringing or self-pity will make things better. Stop second-guessing yourself! Strong feelings should tell you something, not render you helpless. Reflect on what you really need, then take action; otherwise, you'll get bogged down.",
      "Work" : "Strong emotions in the workplace can distract people from their everyday goals. (Many may welcome such distraction!) Rather than get caught up in all the agony and ecstasy, keep an even keel. Don't fret; trust your intuition and take appropriate action.",
      "Spirituality" : "In truth, very few of us were meant for a life of constant contemplation. Most of us have to live in the real world! If you possess psychic abilities, be sure their deployment is regulated by your highest ethical standards.",
      "Personal Growth" : "Beating yourself up accomplishes nothing. Embracing your true feelings is one thing; wallowing in them is another. Pause to feel...and then move on, informed and enabled by your insights.",
      "Fortune Telling" : "This card represents a woman with an emotional, deeply spiritual nature, likely born between June 11th and July 11th, who uses emotional and spiritual appeals to sway others to her point of view.",
      "When?" : "Between June 11th and July 11th.",
      "Symbols and Insights" : {
        "The Seashell Throne" : "While the nature of the Queen's throne is difficult to see in the Marseilles version of this card, most RWS-inspired cards depict a throne integrating watery themes. Do your emotions support you...or rule you?",
        "The Pensive Expression" : "Some see the Queen of Cups as pensive and moody. Are your own strong feelings an aid...or a distraction? What might happen if you set them aside for now?",
        "Feeling vs. Thinking" : "The Queen of Cups feels things deeply É and thinks deeply, too. Which approach is your personal default? How well can you integrate your thoughts and your feelings?",
        "The Marseilles Image" : "The Marseilles Queen of Cups holds both a chalice and a sword. As a result, she may suggest the need to allow your emotions, your spirituality, or your psychic insights to inform your decisions. What would happen if you set pure logic aside?"
      },
      "Questions to Ask" : ["How do I handle strong emotions?","To what extent am I a victim of my own feelings?","How can I move from reflection to action?"]
    }
  },
  {
    "id" : "49",
    "img" : "cups14.jpg",
    "name" : "King of Cups",
    "suit": "Cups",
    "description": {
      "keywords": ["Wisdom","Diplomacy","Restraint","Composture"],
      "Light": "Keeping a stiff upper lip. Being brave and clear in the face of adverse circumstances. Sharing experience as a way of comforting others. Making fair and empathetic decisions. Honoring the spirit, not just the letter, of the law.",
      "Shadow" : "Allowing yourself to become rigid and unemotional. Making unfair decisions based on a hidden agenda. Making decisions without regard for their emotional impact on others. Abusing spiritual authority. Using emotional or spiritual leverage to exercise unhealthy control over others.",
      "Personality" : "The King of Cups can represent anyone who tends to control (King) emotional and spiritual responses (Cups). The King may also represent the tendency to be more sober than emotional, or the need to maintain order in the face of an overwhelming situation.",
      "Elemental" : "Fire of Water.",
      "Affirmation" : "\"I strive to be stable and fair-minded.\"",
      "Story" : "The Main Character must suppress or control an emotional response in order to complete a difficult task.",
      "Relationships" : "Without adopting a \"poker face,\" some situations call for a little restraint. Calm down. Consider the other side's arguments. Walk in the shoes of your partner or friend. Give strong emotions time to subside before taking action you may regret later.",
      "Work" : "When everyone is running in circles and screaming, someone has to step forward, exercise restraint, and draw attention back to the work that remains. Refuse to be drawn into rumor-mongering and petty disagreements. Remain neutral, fair, and focused.",
      "Spirituality" : "A deeper sense of Spirit should move us to greater service. Let wisdom guide you to a ministry that makes sense in terms of your life and your world. Consider taking on the role of a counselor or mentor. Use your experiences to help others mature.",
      "Personal Growth" : "The time has come to assume a leadership role, using your experiences to guide others. Find a way to give back some of what you've been given. You have more wisdom than you know; draw on newfound maturity to come to the aid of a cause greater than yourself.",
      "Fortune Telling" : "This card represents an older man with a gentle, sensitive presence, likely born between February 9th and March 10th, who is known for his fairness and tolerance.",
      "When?" : "Between February 9th and March 10th.",
      "Symbols and Insights" : {
        "The Watery Throne" : "Many decks depict the King's throne floating in water. Rather than sink into emotionalism, this King rises above it. What might happen if you elevated yourself above your conflicting emotions and saw things more clearly?",
        "Control under Pressure" : "Despite the turbulent water surrounding him, the King maintains control over his feelings. How might shutting out the source of emotional noise and doubt help you make contact with what you really feel?",
        "Emotional or Spiritual Focus" : "What sort of mindset allows a person to remain calm in the face of an uproar? How can you keep the goal in mind, even in the midst of battle?",
        "The Marseilles Image" : "The Marseilles King of Cups strikes a relaxed pose; he looks almost sleepy! How might relaxing your need to control this situation help you (paradoxically) to gain better control of it?"
      },
      "Questions to Ask" : ["What wise person could be consulted for good advice?","How can I make sure I'm being as objective and fair as possible?","To what extent am I capable of keeping a \"stiff upper lip?\""]
    }
  },
  {
    "id" : "50",
    "img" : "swords01.jpg",
    "name" : "Ace of Swords",
    "suit": "Swords",
    "number": "1",
    "description": {
      "keywords": ["Logic","Objectivity","Intellect","Choice"],
      "Light": "Making objective decisions. Applying logic. Reasoning your way out of a difficult situation. Solving puzzles. Thinking things through. Emphasizing the facts. Clearing your mind. Seeking clarity.",
      "Shadow" : "Applying ruthless or twisted logic. Gloating over your own superior intellect. Using quick thinking to deceive or confuse others. Confusing snap judgments with quick thinking. Making decisions without thinking through consequences.",
      "Numerology" : "1 (The Origin: the starting point, the seed, opportunity)",
      "Astrology" : "Libra, Aquarius, Gemini",
      "Affirmation" : "\"I take the time to think things through.\"",
      "Story" : "The Main Character must make an important decision that will determine his or her ultimate fate.",
      "Relationships" : "Set your emotions aside for the moment and look at your relationship from an objective point of view. Would a judge or jury say this relationship is performing as it should? You're facing a difficult decision; make it with your head, not your heart.",
      "Work" : "Cut through emotionalism and get to the facts. In this situation, the devil's in the details. What happened and when? Slay some sacred cows, stop the blame game, and get down to brass tacks. What are the objectives? Where are you in relationship to your goals?",
      "Spirituality" : "Your relationship with Spirit should inform all your decisions. Here's an opportunity to apply what you've learned in your inner life to decisions that impact your outer life. If you were to make this decision for someone else, what verdict would you render?",
      "Personal Growth" : "At some point, we must go from seeking advice to making our own decisions. Gather information, draw on the experience of mentors, and get the facts...but be prepared, as a mature individual, to make decisions and own the consequences.",
      "Fortune Telling" : "The time to make a choice is now. Stop wavering and do what you know is best.",
      "When?" : "In the Fall.",
      "Symbols and Insights" : {
        "The Hand of God" : "On the Aces in Marseilles and RWS-inspired decks, a heavenly hand extends from the clouds, offering the viewer the suit's distinctive marker. When opportunity comes your way, take advantage of it; the hand that extends an offer can always withdraw it.",
        "The Festooned Crown" : "The Tarot of Marseilles and RWS-inspired decks picture the Sword topped by a festooned crown. If this decision were made by your Higher Self, freed from petty, earthly concerns, what verdict would be rendered?",
        "Swords as Symbols" : "As a suit marker, Swords suggest logic, clarity, and decision-making. Remember the story of wise King Solomon, who once offered to slice a baby in half in order to resolve a dispute over motherhood? Swords cut through confusion, revealing our agendas in the process.",
        "The Nature of the Ace" : "Compressed into the Ace are all the qualities of all the other cards of the suit. In this way, the Ace can be said to be the \"root\" or \"seed\" of its associated element. How might your situation contain the seeds of intellectual or logical growth?",
        "Your First Impressions" : "When you see the Ace, what's your first impression? Is the Sword being offered as a gift...or wielded as a weapon? Does it point upward, to God, or downward, to Earth? Is it to heavy to bear, or something you could manage?"
      },
      "Questions to Ask" : ["If I made my decision purely based on reason and logic, what would my decision be?","What do I think about my own problem-solving ability?","Who can supply me with the pure and simple facts?"]
    }
  },
  {
    "id" : "51",
    "img" : "swords02.jpg",
    "name" : "Two of Swords",
    "suit": "Swords",
    "number": "2",
    "description": {
      "keywords": ["Denial","Debate","Impasse","Truce"],
      "Light": "Refusing to make a decision without getting the facts. Exploring both sides of an argument. Arguing passionately for what you believe in. Weighing the issues. Encouraging the open exchange of ideas. Discussing political or religious issues without getting \"hot under the collar.\"",
      "Shadow" : "Rejecting evidence that conflicts with dearly-held beliefs. Arguing with others just for the sake of doing so. Nit-picking. Putting off a decision because you're afraid to face the consequences. Preventing others from getting the information they need to make good decisions.",
      "Numerology" : "2 (The Other: duality, division, debate)",
      "Astrology" : "Moon in Libra",
      "Affirmation" : "\"I strive to see all sides of every issue.\"",
      "Story" : "The Main Character must defend his or her decisions. Alternatively, the Main Character rejects critical information and makes a bad decision.",
      "Relationships" : "You may be in denial; if so, you're only fooling yourself. You serve your own best interests by seeing things as they really are. Stop avoiding unpleasant confrontations. An honest disagreement is better than a false peace.",
      "Work" : "Consider all the facts before making your decision. Once you've made your decision, be prepared to defend it with well-reasoned arguments. If others continue to reject your counsel, be aware that you may have to let go, sit back, and let time prove that you were right, after all.",
      "Spirituality" : "Spiritual maturity demands we see ourselves as we really are, and love ourselves in spite of our shortcomings. Rather than debate whether or not you're \"good enough,\" be thankful for the progress you've made thus far. Avoid beating yourself up with high-minded standards of perfection.",
      "Personal Growth" : "What are you avoiding? Growth awaits the souls brave enough to cast aside blindfolds and see the situation for what it really is. Get past this personal stalemate by taking time to think clearly about what you want and where you're going.",
      "Fortune Telling" : "Sometimes, the only way to win is to refuse to fight. You're stuck for now; let time pass before taking action.",
      "When?" : "Between September 23rd and October 2nd.",
      "Symbols and Insights" : {
        "The Blindfolded Figure" : "In RWS-inspired decks, we frequently see a blindfolded woman grasping two broadswords. Set apart from the waters of intuition, she is depending solely on logic to make a difficult decision. To what extent are your own decisions informed by logic? By emotion?",
        "The Crescent Moon" : "Many versions of this card depict a sky punctuated by a crescent moonÑa symbol for receptivity and cyclical change. What would happen if you took a \"wait and see\" approach to your current dilemma? How might your situation change over time?",
        "Different Ways of Thinking" : "In your situation, is it more important to think fast or to deliberate slowly? How can you declare a truce between frenzied thoughts and the need to think carefully? Could meditation help find an answer?",
        "The Blindfold" : "In your situation, is there value in not knowing certain things? Should some information be repressed or ignored?",
        "The Marseilles Image" : "The curved blades on the Two of Swords are hardly recognizable to modern eyes. They are crossed (suggesting conflict); between them, an elaborate flower blooms (suggesting growth). Faced with two options? Try evaluating each option in terms of the growth you'll experience, should you adopt it."
      },
      "Questions to Ask" : ["What information do I need to get past this impasse?","How can I get past being defensive and see the facts?","What viewpoints, other than my own, play a role in this situation?"]
    }
  },
  {
    "id" : "52",
    "img" : "swords03.jpg",
    "name" : "Three of Swords",
    "suit": "Swords",
    "number": "3",
    "description": {
      "keywords": ["Variance","Difference","Dissatisfaction","Heartache","Rejection"],
      "Light": "Being brave enough to see things as they really are. Exercising your critical eye. Being your own best critic. Acknowledging that things don't always turn out as planned. Moving past heartbreak to embrace a painful truth.",
      "Shadow" : "Wallowing in despair. Allowing yourself to be completely crushed by the thoughts, words, or deeds of another. Judging yourself too harshly. Holding yourself to an unrealistic standard of excellence. Wearing your heart on your sleeve while carrying a chip on your shoulder.",
      "Numerology" : "3 (The Result: expression, productivity, output)",
      "Astrology" : "Saturn in Libra",
      "Affirmation" : "\"I learn from failures and setbacks.\"",
      "Story" : "The Main Character sees the error of his or her ways and changes course.",
      "Relationships" : "If things aren't turning out as planned, it's time to adjust your expectations...or look elsewhere. Don't allow rejection to deliver a fatal blow; you've lots to offer those who can appreciate it. It's okay to mourn the loss of a friend or lover, but don't let mourning become a way of avoiding further growth and new experiences.",
      "Work" : "You may find yourself playing the role of the lone wolf; for now, that's okay. Things don't always turn out as planned. Rather than pull out your hair, retrace your steps and identify objectively what went wrong. This information will come in handy in the future.",
      "Spirituality" : "In the midst of heartbreak, it's not always possible to sit back and ask, \"What lesson does Spirit have for me in this situation?\" Give yourself time to move past emotional responses; once you do, you can think in terms of what an event might teach you.",
      "Personal Growth" : "If at first you don't succeed, try again. It's an old cliche, but an important mantra for anyone determined to make the most of what he or she has been given. If recent efforts have fallen short, you must make a choice: despair...or embody the spirit of determination.",
      "Fortune Telling" : "Breakups and infidelity abound. What hurts now, though, will turn out to be good for you later on.",
      "When?" : "Between October 3rd and 12th.",
      "Symbols and Insights" : {
        "The Pierced Heart" : "This imagery, adapted from one of the earliest illustrated decks, doesn't require a great deal of interpretation; it's meaning is clear to everyone who sees it. In your own situation, what role does disappointment play?",
        "The Rain" : "Few things dampen our spirits like a pouring rain, particularly if we're already distraught. Talk of silver linings may do little more than irritate us when the clouds are directly overhead. Still, it's good to realize that the weather will change, and that the rain won't last forever.",
        "Variation from Expectation" : "Many disappointments are rooted in unrealistic expectations. How might letting go of expectations help you think more clearly about the realities of your situation?",
        "The Marseilles Image" : "The hardy blossom we saw on the Two has been split and destroyed by the arrival of a straight, solid Sword. Have any of your own decisions had unintended consequences lately? How might your own decisions have contributed to the setback you're facing now?"
      },
      "Questions to Ask" : ["How can I get past my depression?","To what extent are my emotions a matter of choice?","How can I learn from the mistakes of the past?"]
    }
  },
  {
    "id" : "53",
    "img" : "swords04.jpg",
    "name" : "Four of Swords",
    "suit": "Swords",
    "number": "4",
    "description": {
      "keywords": ["Meditation","Contemplation","Perspective","Mindset"],
      "Light": "Thinking over your plans before putting them into action. Pausing to meditate or clear your mind. Taking time to understand someone or something before criticizing it. Resting. Occupying your thoughts with a healthy distraction.",
      "Shadow" : "Failing to think things through. Mistaking procrastination for thoughtfulness. Adopting a point of view and refusing to reconsider your conclusions, even when presented with refuting evidence. Allowing chaos and whimsy to dominate your thoughts.",
      "Numerology" : "4 (The Status Quo: stability, equality, persistence)",
      "Astrology" : "Jupiter in Libra",
      "Affirmation" : "\"I think before taking action.\"",
      "Story" : "The Main Character withdraws and spends time in quiet contemplation before taking action.",
      "Relationships" : "Taking a break from each other might restore some perspective. Rather than over-analyze everything, clear your mind and take things at face value for once. If you can't achieve peace together, there's no shame in saying you need a rest.",
      "Work" : "Running at top speed all the time wears down the most capable individuals. Insist on time to recharge your creative batteries. On even the most hectic days, steal ten minutes to be still and disconnect. See time off as an investment in maintaining your sharp edge.",
      "Spirituality" : "Withdrawal from the world can help you achieve remarkable perspective. Schedule time for quiet contemplation. Rather than ponder solutions, just breathe, and let Spirit sort things out.",
      "Personal Growth" : "A mature person knows the value of stillness. Before taking action, set aside time to simply be. Associate calmness and focus with specific postures or breathing patterns, and you'll be able to summon a clear state of mind on demand.",
      "Fortune Telling" : "Don't make any decision now. Wait, and you'll be glad you did.",
      "When?" : "Between October 13th and 22nd.",
      "Symbols and Insights" : {
        "The Still Figure" : "On the original RWS cards, the figure of the sleeping knight is easily mistaken for a decorative touch on a stone sarcophagus. Or, perhaps, he's asleep -- but with one Sword at the ready, just in case. The message? Even in rest, be prepared for action.",
        "Three and One" : "The three Swords remaining on the wall suggest the knight's rest is a deliberate one - a course of action deliberately chosen. The single Sword in hand suggests opportunity. What opportunities might open for you if you made a conscious decision to integrate relaxation into your routine?",
        "Quiet Thoughts" : "Quiet time can be used for research and personal growth, enhancing the work you do when more physically active.",
        "The Marseilles Image" : "The curved blades form a protective barrier in which a new blossom can flourish. How might a retreat or a withdrawal provide you with a protected space in which to grow?"
      },
      "Questions to Ask" : ["How long has it been since you deliberately took a \"time out?\"","How difficult is it for you to meditate?","What would happen if you simply refused to make a decision today?"]
    }
  },
  {
    "id" : "54",
    "img" : "swords05.jpg",
    "name" : "Five of Swords",
    "suit": "Swords",
    "number": "5",
    "description": {
      "keywords": ["Selfishness","Hostility","Irrationality","Self-Preservation"],
      "Light": "Acting in your own best interest. Choosing to stand up for yourself. Not backing down from disagreement and discord. Taking a stand. Refusing to go along with an unethical plan. Knowing when to bend the rules.",
      "Shadow" : "Taking advantage of others. Intimidating others. Acting in an unethical manner. Picking fights. Using words to goad others into violence and irrationality. Ignoring rules you've agreed to abide by. Looking out for yourself while allowing harm to come to others. Gloating over victory.",
      "Numerology" : "5 (The Catalyst: instability, resistance, confrontation)",
      "Astrology" : "Venus in Aquarius",
      "Affirmation" : "\"Even as I care for myself, I am mindful of the needs of others.\"",
      "Story" : "Others are shocked or angered by the Main Character's apparently irrational actions. Alternatively, the Main Character must take an action that will cause pain for his or her loved ones.",
      "Relationships" : "It's crazy to think that one person in a relationship deserves more pleasure or power than the other. Balance must be restored. You're not thinking clearly now, so back off and rethink your approach. Take care of yourself, but try to do so without hurting those you love most.",
      "Work" : "Occasionally, one person's success will bring about another person's loss. When you're the successful one, don't gloat; be humble. When you suffer the loss, don't despair; pick up the pieces and move on. Don't drive yourself crazy asking \"Why?\" Breaking a rule may prove to be the key to innovation.",
      "Spirituality" : "Suffering is a fact of life. How does your spiritual path deal with the reality of suffering or the pain of inequality? It's easy to be spiritual when all is well. Insulate yourself from instability by thinkingÑin advanceÑof how you'll deal with adversity when it comes your way.",
      "Personal Growth" : "You can't win every fight. With this truth in mind, think in terms of how you want to win...and how you want to lose. Rather than be driven by emotion, make conscious choices in both situations. Resolve to be noble in both victory and defeat.",
      "Fortune Telling" : "Someone is stealing from you, financially or romantically. Be wary of friends who talk behind your back.",
      "When?" : "Between January 20th and 29th.",
      "Symbols and Insights" : {
        "The Stolen Swords" : "Many see the figure in the foreground of RWS-inspired cards as a thief, stealing Swords at the expense of his associates. Just remember: victory achieved through dishonesty robs you of your integrity. Karma is a law; how long before someone steals your Swords?",
        "The Jolly Victor" : "The victorious knight depicted on many versions of this card is gloating over his triumph. How we act when we win tells a lot about our character. What does your recent behavior say about you?",
        "Unstable Logic" : "When the instability of the Five combines with the thoughtfulness of the suit of Swords, logic gives way to irrationality. Rules are shattered, and the whole world turns upside down. What would happen if you broke some rules?",
        "The Marseilles Image" : "Again, a central blade comes to cut down the growth we saw taking root in the Four. The four curved, protective blades remain, but now they are guarding a single decision. How has a protected decision (or sacred cow) influenced your situation today?"
      },
      "Questions to Ask" : ["How do I behave when I win? What does that say about me?","How can I do what's necessary without making others feel defeated?","What's the difference between selfish action and acting in my own best interest?"]
    }
  },
  {
    "id" : "55",
    "img" : "swords06.jpg",
    "name" : "Six of Swords",
    "suit": "Swords",
    "number": "6",
    "description": {
      "keywords": ["Adaptation","Adjustments","Science","Travel"],
      "Light": "Making the best of a bad situation. Recovering from defeat. Resetting expectations. Making allowances for unexpected circumstances. Helping others who find themselves in dire circumstances. Changing the way you see the world. Broadening your perspective through study or travel.",
      "Shadow" : "Refusing to accept that things have changed. Playing the victim. Rejecting the idea that your actions have consequences. Applying scientific criteria to matters of faith, or confusing faith with science. Believing the whole world should be like your small corner of it.",
      "Numerology" : "6 (The Adjustment: cooperation, collaboration, interaction)",
      "Astrology" : "Mercury in Aquarius",
      "Affirmation" : "\"I keep an open mind.\"",
      "Story" : "The Main Character comes up with a creative solution to handle an unforeseen complication.",
      "Relationships" : "Relationships involve give and take. Prepare for some compromises. Someone may have to adjust expectations in order to be happy. Look around; you may find better options elsewhere. How long since you sat down and discussed what works and what doesn't?",
      "Work" : "Times change, and the wise businessperson changes with them. Reinvent yourself and your approach to work. Seeking inspiration, go places you don't normally go. Find out what's on the \"cutting edge.\" Now is a good time for business trips, seminars, and training sessions.",
      "Spirituality" : "Attend a workshop or seminar and learn new spiritual techniques. Consider taking a trip exclusively for the purpose of enhancing your spiritual perspective. If a discipline isn't helping you, abandon it, but not without defining what worked, what didn't work, and why.",
      "Personal Growth" : "Reaching out to others in need will rapidly advance your growth and maturity. Don't make the mistake of thinking everyone wants what you want; ask people what they need, and find a way to supply it without strings attached. Know why you do what you do.",
      "Fortune Telling" : "You'll soon go on a long journey over water. Actions have unexpected consequences, so be prepared.",
      "When?" : "Between January 30th and February 8th.",
      "Symbols and Insights" : {
        "The Boatman" : "On RWS versions of this card, a boatman steers a craft bearing one or two huddled figures. Lending aid to others in need encourages personal growth. In your situation, who needs help? To what extent are you positioned to supply that help?",
        "Swords in the Boat" : "Many decks depict six Swords embedded in the deck of the boat. Do they form a defensive barrier? Are they needed in case of attack? Or are they products, being ferried to market? What might your answer suggest about your perspective?",
        "Ways of Knowing" : "Extended analysis or going with your gut: either approach can foster greater understanding. Which is your default? What might happen if you tried the other approach now?",
        "The Marseilles Image" : "Six curved blades form a tight lattice. This careful placement would require a great deal of collaboration to construct; once complete, it creates, once again, a space for growth. How might thoughtful collaboration impact your situation today?"
      },
      "Questions to Ask" : ["What assumptions govern my thinking?","How willing am I to lend aid to others? To request it when I need it?","How prepared am I to deal with change? With unexpected outcomes?"]
    }
  },
  {
    "id" : "56",
    "img" : "swords07.jpg",
    "name" : "Seven of Swords",
    "suit": "Swords",
    "number": "7",
    "description": {
      "keywords": ["Dishonesty","Presumption","Sneakiness","Assumptions"],
      "Light": "Refusing to do something dishonest, even when there's no chance of ever being caught. Handling a difficult situation with finesse. Pointing out assumptions. Acting ethically in public and in private. Living a life that is beyond reproach.",
      "Shadow" : "Stealing or lying. Doing whatever you can get away with, simply because you can. Looking for a way around consequences. Justifying wicked behavior by focusing on the wickedness of others. Failing to examine your own motives and prejudices.",
      "Numerology" : "7 (The Motive: imagination, inner work, psychology)",
      "Astrology" : "Moon in Aquarius",
      "Affirmation" : "\"I hold myself to the highest ethical standards.\"",
      "Story" : "The Main Character has an opportunity to win using dishonest means.",
      "Relationships" : "If you could cheat and get away with it, would you? Your answer says a lot about you...and your sense of commitment. Secrets are toxic to healthy relationships. Act with integrity, and demand integrity in those closest to you. If you've wronged someone, accept the consequences.",
      "Work" : "Embody honesty in the workplace. The smallest dishonest indulgence numbs the conscience, opening the door to larger abuses. Reign in a tendency to do as little as you can. Rather than \"get by,\" do your best, even if it won't always be appreciated.",
      "Spirituality" : "While you must not obsess on darkness, you must confront your own Shadow from time to time. To what extent do you live up to your own highest standards? In what situations is your dedication to Spirit challenged most? To gain strength, learn from your weaknesses.",
      "Personal Growth" : "You may fool others, but you cannot fool yourself. When you're alone, how do you behave? Your answer will provide meaningful insights into your true character.",
      "Fortune Telling" : "Don't assume people around you are worthy of your trust. Ask for an accounting of where people have been, and what they've been doing.",
      "When?" : "Between February 9th and 18th.",
      "Symbols and Insights" : {
        "The Sneaky Man" : "RWS-inspired illustrations often depict a sneaky figure, tip-toeing away with stolen goods. He carries five (the number of chaos), but leaves behind two (the number of duality). When you do something dishonest, you invite chaos into your life, and force others to question their high opinions of you.",
        "The Encampment" : "In the background of many RWS-inspired cards, we see a cluster of distant tents. Is the figure in the foreground an outsider, come to steal...or an insider, taking advantage of his own people? Your answer may reveal important assumptions you make without even thinking about them.",
        "Shifted Perspective" : "By focusing so completely on his prize, the character on this card might not foresee unexpected complications. Assumptions can blind us, keeping us from seeing critical information. What are you overlooking today?",
        "The Marseilles Image" : "The Sword in the center is increasingly constrained by the curved blades surrounding it. The logic of the group (the six Swords) often limits new thought (the one Sword). In what ways are your own ideas being limited by the assumptions others have taught you to make?"
      },
      "Questions to Ask" : ["What assumptions am I making?","How well-defined is my sense of ethics?","How should I respond when I know others are breaking the rules?"]
    }
  },
  {
    "id" : "57",
    "img" : "swords08.jpg",
    "name" : "Eight of Swords",
    "suit": "Swords",
    "number": "8",
    "description": {
      "keywords": ["Restriction","Limitation","Confinement","Helplessness"],
      "Light": "Honoring limits. Respecting the rules. Deciding to go on a diet for your health's sake. Recognizing you cannot always be in control. Identifying obstacles to further progress. Refusing to think about unhealthy or unethical options. Asking for assistance.",
      "Shadow" : "Feeling trapped. Being lost in a maze of rules and regulations. Giving in to despair. Playing the victim. Allowing others to dictate what you can and cannot do. Being rendered helpless. Having very few options. Failing to look for a way out.",
      "Numerology" : "8 (The Action: movement, outer work, swiftness)",
      "Astrology" : "Jupiter in Gemini",
      "Affirmation" : "\"I know my own limits.\"",
      "Story" : "The Main Character must call on his or her ingenuity to escape a trap.",
      "Relationships" : "Feeling boxed in? You have exactly as many options as you imagine you do. There is a way out, but someone is refusing to see it. A relationship should broaden horizons, not limit them. If the rules are uncomfortable, perhaps it's time to re-examine them.",
      "Work" : "Some restrictions are necessary; others are merely tradition. Ethics demand you play by the rules; sacred cows, however, are fair game. What are the obstacles, exactly? If your limits didn't exist, how might you move forward? Thinking freely will open unexpected options.",
      "Spirituality" : "The free spirit cannot be contained by the physical constraints. As you learn to cultivate balance and focus, you may find that most obstacles are self-imposed and most limits are strictly imaginary. When you focus your will, blindfolds and bonds will fall away.",
      "Personal Growth" : "Knowing your own limits is important; respect them. Whatever the issue, you're balking for a reason. There's no harm in refusing to move forward for now, and no shame in saying, \"No.\" A mature person communicates what he or she needs with absolute confidence.",
      "Fortune Telling" : "Get over playing the victim. Once you realize you are your own biggest obstacle, nothing can hold you back.",
      "When?" : "Between May 21st and 31st.",
      "Symbols and Insights" : {
        "The Blade Barrier" : "RWS-inspired versions of this card depict a woman trapped in the middle of a circle of swords. Many have noted the circle is incomplete; escape is simply a matter of casting off the blindfold and taking that first step. How many of your own limitations are strictly imagined?",
        "The Loose Bonds" : "Many versions of this card feature someone tied with what appear to be very loose bonds. (Compare the chains around the fawns' necks on Trump XIII.) In your own situation, have you abandoned all hope of escape too soon? Might just a bit more struggle cause your bonds to drop away?",
        "Drop the Blindfold" : "Take a look around. Has the Universe been showing you an escape route you've been too proud or too distracted to see? What might happen if, instead of moving obediently from A to B, you rudely jumped over the walls?",
        "The Marseilles Image" : "Eight sharp, curved blades interlock in a double knot of steel. A single blossom, all but crushed, remains, along with four unopened buds. Even when options are severely limited, the potential for growth remains."
      },
      "Questions to Ask" : ["Who's empowered to cut through the red tape?","What, exactly, are the obstacles? What resources, exactly, are needed to move them?","To what extent is your powerlessness a matter of attitude?"]
    }
  },
  {
    "id" : "58",
    "img" : "swords09.jpg",
    "name" : "Nine of Swords",
    "suit": "Swords",
    "number": "9",
    "description": {
      "keywords": ["Remorse","Worry","Distraught","Conclusion"],
      "Light": "Refusing to worry about what you cannot control. Rejecting anxiety. Judging your own performance with kindness and gentleness. Using meditation to quiet a troubled mind. Confronting nightmares and fears. Drawing a conclusion and putting an issue out of your mind.",
      "Shadow" : "Torturing yourself with regrets. Second-guessing your every move. Beating yourself up for your mistakes. Depression. Obsessing on errors and overlooked details. Refusing to handle stress in healthy ways. Ruining your ability to appreciate the present by dwelling on the past. Debating irreversible decisions.",
      "Numerology" : "9 (The Completion: fullness, readiness, ripeness)",
      "Astrology" : "Mars in Gemini",
      "Affirmation" : "\"I do not worry about what I cannot control.\"",
      "Story" : "The Main Character agonizes over a past mistake.",
      "Relationships" : "Comparing your current relationship to past or fantasy relationships is a formula for discontent and depression. Rather than wring your hands, say what's on your mind. Don't allow your past mistakes to smother your delight in the present.",
      "Work" : "The blame game can gobble up unlimited hours and energy; don't play it. Review errors only with an eye toward improving future performance. Instead of dwelling on missed opportunities, define what must be done to create new ones.",
      "Spirituality" : "Everyone has regrets. Rather than be strangled by them, use your regrets as a means of enhancing empathy for others. Understanding that we've all made mistakes can help us remember to cut everyone a little slack. Use your pain to gain insight into the pain others feel.",
      "Personal Growth" : "Worry wastes energy. If something happens, it happens; the energy expended on worry won't change a thing. Do what you can do, and let the Universe handle the rest. Maturity dictates letting go of unhealthy obsessions and learning to be happy with the here and now.",
      "Fortune Telling" : "If you take the action you're considering now, you'll be sorry in the future.",
      "When?" : "Between June 1st and 10th.",
      "Symbols and Insights" : {
        "The Rack of Swords" : "In the RWS, the Swords in this card point forward, suggesting a dread of future events. If you pause to define exactly what you fear, you may find that you diminish that fear's ability to rob you of a good night's sleep.",
        "The Distraught Figure" : "In illustrations for this card, postures of agony abound. Consider how your inner emotions are shaping your posture (and, by extension, your approach to life.) How might a change in posture elicit a change in your circumstances?",
        "Finding an Answer" : "Logic has taken you as far as it can; beyond this point, all you can do is call into question (and devalue) the good work you've done. It may well be time for you to make a choice - and stick with it!",
        "The Marseilles Image" : "The ninth Sword appears: stunted and blunted. Its decisive blade is trapped, interlaced with eight other blades, useless. There is a point at which logic and questions are no longer useful; pressing beyond this point does nothing but trap us. Perhaps it's time for you to shift from debate...to action?"
      },
      "Questions to Ask" : ["What role does worry play in your current situation?","To what other ends might you devote the energy you're giving to anxiety?","How can you know when it's time to stop thinking and start acting?"]
    }
  },
  {
    "id" : "59",
    "img" : "swords10.jpg",
    "name" : "Ten of Swords",
    "suit": "Swords",
    "number": "10",
    "description": {
      "keywords": ["Exhaustion","Ruin","Disaster","Stamina","Obsession"],
      "Light": "Seeing the signs that you've reached your limits. Paying attention to what your body is trying to tell you. Giving in to the need for rest and renewal. Acknowledging that you've hit bottom. Committing to a turnaround. Knowing the worst is over.",
      "Shadow" : "Accepting defeat prematurely. Driving yourself to total exhaustion, especially mentally. Experiencing a mental breakdown. Obsessing on a problem to the breaking point. Giving up. Refusing to move from thought to action. Deeply unhealthy thoughts.",
      "Numerology" : "10 (The End: finality, completion, exhaustion)",
      "Astrology" : "Sun in Gemini",
      "Affirmation" : "\"When my limits are exceeded, I take action on my own behalf.\"",
      "Story" : "The Main Character must acknowledge that all is apparently lost.",
      "Relationships" : "Preserving a relationship or friendship shouldn't require self-destruction. There's a strong possibility it's time to let this one go. Examine the logic you're using to justify maintaining this connection. A healthy relationship produces peace, not insanity.",
      "Work" : "Know when to say when. Continuing to take on more work and more responsibility is not the answer here. Be honest about your limits. If they've been exceeded, ask for relief. Diverting some of the work may mean eating some crow, but beats a complete systems failure later on.",
      "Spirituality" : "It's hard to keep your eyes on heaven when you're face-down on the ground. When darkness overwhelms us, we may be tempted to abandon Spirit entirely. Finding just one thing to be thankful for, though, may provide you with the key to turning things around.",
      "Personal Growth" : "Failure is a cruel but powerful teacher. When possible, make corrections before hitting bottom. If that time has passed, the mature thing to do is accept consequences, resolve to do better, and start the process of making amends. As they say: live one day at a time.",
      "Fortune Telling" : "Disaster. Put off plans and do not take action until omens are better.",
      "When?" : "Between June 11th and June 20th.",
      "Symbols and Insights" : {
        "The Human Pincushion" : "Optimistic users of the RWS claim the Swords on this card pierce the pitiful figure's charkas, yielding enlightenment through trial. Other decks show the victim face-up, suggesting the additional agony of seeing a bad situation coming. In your situation, is there a way to extract a life lesson from the trial you're now facing? If so, what would that lesson be?",
        "Dark Skies" : "RWS-inspired decks often depict a sunset (or sunrise) in the background of this card, suggesting that a change of some kind is at hand. How might your current situation contain the seeds of a turnaround?",
        "The End of Logic" : "Numerology suggests the Ten is the point at which fullness has been exceeded, and the energy of the suit becomes spoiled and over-extended. Here, endless deliberation and over-thinking have exhausted all possibilities for growth. It's time to try another approach.",
        "The Marseilles Image" : "Two crossed Swords pierce the eight curved blades, producing a dramatic image of mental excess. At this point, any further debate (the two Swords) will do little more than shred the mental work (the eight Swords) completed so far."
      },
      "Questions to Ask" : ["What are the signs that the time for debate is over?","How can you tell when interest has given way to obsession?","When your own limits are reached, where can you turn for aid?"]
    }
  },
  {
    "id" : "60",
    "img" : "swords11.jpg",
    "name" : "Page of Swords",
    "suit": "Swords",
    "description": {
      "keywords": ["Student","Apprentice","Scholarship","Information"],
      "Light": "Pursuing a course of study. Asking good questions. Investing time in study and practice. Doing research. Making a habit of learning new things. Starting an investigation. Outlining what you need to know. Finding a mentor or teacher.",
      "Shadow" : "Pretending to knowledge or sophistication you do not possess. Cheating on an exam. Feigning interest as a way of gaining favor. Considering only the evidence that supports conclusions you've already drawn. Rejecting the wise counsel of experienced teachers.",
      "Personality" : "The Page of Swords can represent anyone who wants to (or needs to) learn (Page) more about intellectual pursuits, academic subjects, or good decision-making (Swords). Though eager to make a good impression, The Page may lack the experience or information needed to handle studies or assignments with responsibility and confidence. He or she may overcompensate for this with bluster, exaggerated credentials, or snap judgments.",
      "Elemental" : "Earth of Air.",
      "Affirmation" : "\"I am ready to make good decisions.\"",
      "Story" : "The Main Character must humbly apply himself or herself to an apprenticeship or course of study.",
      "Relationships" : "Every relationship is an opportunity to learn about others and learn about yourself. Some relationships provide a lifetime of lessons; others run short of insights in a matter of weeks. Judge mistakes with kindness and affection; you're both learning.",
      "Work" : "Get the training you need. Ask questions. Forget the stigma of \"not looking capable\" - smart and worthy superiors know who's faking it. Be up front about what you need in order to move forward with confidence. Get clarification and point out contradiction.",
      "Spirituality" : "Spend time with whatever Scripture governs your path. Read books. Consult oracles. Ask a guide, priest, priestess, or other minister the questions that cloud your mind. Prayers for wisdom and patience can open doors to new insights and spiritual discoveries.",
      "Personal Growth" : "Keep your mind young by playing the role of the perpetual student. Enroll in a course. Visit a museum. See a movie you'd normally avoid. Ask someone who enjoys an art you find annoying to explain what he or she loves about it. Do all you can to shift perspective and see the world from new and exciting angles.",
      "Fortune Telling" : "This card represents a young man or woman with an airy, intellectual demeanor, likely born a Capricorn, Aquarius, or Pisces, who wants to learn something new from you or have a discussion with you.",
      "When?" : "Between December 22nd through March 20th.",
      "Symbols and Insights" : {
        "Awkwardness and Silliness" : "Most RWS-inspired cards will feature a young swordsman in a romantic pose, indicating he's more acquainted with the idea of battle than he is with its harsh realities. The Page of Swords wants to be an intellectual or scholar, but lacks the credentials or training to fill the role with much success at this time.",
        "The Windswept Background" : "In a nod to the airy nature of the suit of Swords, the background may be filled with puffy clouds and windswept landscapes. The Page, intrigued by every notion but lacking the experience to distinguish between fluff and hard information, is constantly blown in different directions. Sound familiar?",
        "The Desire to Know It All" : "Dedicating yourself to pure research - holding off on conclusions until all the information has been gathered, organized, and weighed - can become a means of putting off decision-making.",
        "The Marseilles Image" : "The Page of Swords looks surprised to find a Sword in his scabbard! (\"Oh, so that's what this thing's for!\") Review the recent past. Has an off-hand decision, later overlooked or forgotten, contributed to your situation? If you've made mistakes, chalk them up to the learning process and move on."
      },
      "Questions to Ask" : ["How comfortable are you with revealing your own ignorance?","What are the marks of a good student?","To what extent are you open to new information?"]
    }
  },
  {
    "id" : "61",
    "img" : "swords12.jpg",
    "name" : "Knight of Swords",
    "suit": "Swords",
    "description": {
      "keywords": ["Bluntness","Intelligence","Incisiveness","Investigation"],
      "Light": "Speaking your mind. Making your opinions known. Offering constructive criticism. Sharing your knowledge. Making insightful observations. Pinpointing the problem. Clarifying what others have said. Giving clear direction to others. Uncovering the truth.",
      "Shadow" : "Stating your opinions as fact. Picking fights. Starting arguments. Using clever insults to undermine the confidence of others. Tossing reason out the window. Speaking without taking the feelings of others into account. Going on a witch hunt. Distorting evidence.",
      "Personality" : "The Knight of Swords can represent anyone who wants to lead the way (Knight) to greater knowledge and mental clarity (Swords). The Knight may also represent the tendency to be more intellectual than empathetic, or a compulsive desire to analyze or lecture others.",
      "Elemental" : "Air of Air.",
      "Affirmation" : "\"I temper my insights with tact.\"",
      "Story" : "The Main Character's remarkable abilities cause some to become his enemies.",
      "Relationships" : "Words can hurt. In addition to knowing why you're saying what you're saying, think about how you're saying it. Don't read too much into the statements of others. If you aren't sure what someone means, ask for clarification. Resolve to be a better listener.",
      "Work" : "Ask good questions. Before rendering judgment, be sure you have all the facts. Refrain from cutting others short; even if you've heard it all before, give others a chance to share their ideas. Resist the urge to correct; open the door to free-wheeling creativity before you become an editor.",
      "Spirituality" : "Consider the words that have been used to shape your understanding of yourself (and Spirit) over the years. If these terms have been poisoned by dogmatism and abusive spirituality, strive to find your own words for the higher powers and deeper realms you hope to explore.",
      "Personal Growth" : "Rather than be defensive, relax. Give criticism a chance. A mature person acknowledges his or her capacity for improvement, and isn't intimidated by the observations of others. Take what will help you; discard the rest.",
      "Fortune Telling" : "A blunder leads someone to say something he or she regrets. If this was you, be prepared to apologize and move on.",
      "When?" : "Between January 10th and February 8th.",
      "Symbols and Insights" : {
        "The Upraised Sword" : "Charge! In many different decks, the Knight of Swords is rushing off on a quest, sword upraised. But what is the quest? What's his destination? What are the terms of success? Charging ahead feels greatÑbut before you do it, a little investigation and reflection can go a long way.",
        "Information vs. Insight" : "The Knight of Swords is associated with information and investigation; be sure to pair this rush to research with intuition and a desire for insight!",
        "Expertise" : "Expertise can speed an investigation, allowing us to identify issues others would overlook. Who's the expert on your challenge? How can you encourage him or her to work with you?",
        "The Marseilles Image" : "The Marseilles Knight of Swords is, perhaps, the most confident of his counterparts. His prancing horse and battle-ready posture exude a level of competence other Marseilles characters seem to lack. How does information impart confidence? How might getting more information help you be more confident now?"
      },
      "Questions to Ask" : ["What do I really need to know?","To what extent have I investigated the facts behind my situation?","How can I share what I know without alienating others?"]
    }
  },
  {
    "id" : "62",
    "img" : "swords13.jpg",
    "name" : "Queen of Swords",
    "suit": "Swords",
    "description": {
      "keywords": ["Grace","Skill","Wit","Charm","Aptitude"],
      "Light": "Exercising tact or using diplomacy. Defusing a tense situation. Knowing what to say and how to say it. Making others feel comfortable and confident. Bringing out the best in everyone. Having a way with words. Telling jokes. Possessing a knack for music, math, art, or science.",
      "Shadow" : "Knowing exactly what to say to destroy another person. Withholding critical information. Using a barbed tongue to upset others. Employing sarcasm. Mimicking others unkindly. Making light of the less fortunate. Being disrespectful. Failing to use the talent you've been given.",
      "Personality" : "The Queen of Swords can represent anyone who wants to encourage others (Queen) to be brighter and more communicative (Swords). The Queen may also represent the tendency to be more tactful than objective, or the need to express information more politely than precisely.",
      "Elemental" : "Water of Air.",
      "Affirmation" : "\"I make the truth easier to hear.\"",
      "Story" : "The Main Character must deliver news that is difficult for others to receive with grace. Alternatively, the Main Character must confront the less desirable aspects of his or her personality.",
      "Relationships" : "You can't change other people, but you can provide gentle prompts designed to help them be the best they can be. Know the difference in supporting and nagging. Know, too, that requested advice is always prized more highly than unsolicited observations. Until you're invited to speak, hold your tongue.",
      "Work" : "Harsh criticism crushes morale, but finely-tuned words of praise can enhance performance and elicit remarkable productivity. Identify what must be changed, but express that change in terms of growth and benefit. Instead of problems, see challenges. Instead of deficits, see opportunities.",
      "Spirituality" : "Practice the delivery of praise. When you receive blessings, voice your thanks. When others work for you, show your bright spirit by acknowledging their contributions. Whatever the situation, strive to be the soul of encouragement.",
      "Personal Growth" : "Your insights, opinions, and attitudes influence others more than you know. Express your thoughts with care, making sure you phrase your observations in ways that encourage growth. If you need encouragement, encourage others to give it.",
      "Fortune Telling" : "This card represents a woman with an artistic, intellectual nature, likely born between September 12th and October 12th, who uses clever, positive communication to sway others to her point of view.",
      "When?" : "Between September 12th and October 12th.",
      "Symbols and Insights" : {
        "The Winged Throne" : "The Queen of Swords is frequently drawn ruling from a throne decorated with butterflies, birds, or other winged creatures, reinforcing the airiness of her suit. How does the element of Air(matters of communication and intellect) play a role in your situation?",
        "The Posture of Pronouncement" : "The Queen of Swords often appears to be on the verge of making an important statement or rendering an important verdict. In your own situation, what needs to be said? Who needs to say it? What is the obstacle blocking this critical communication?",
        "From Discord to Harmony" : "What skill or aptitude, employed now, might transform the discord you're experiencing today into pure harmony?",
        "The Marseilles Image" : "The Marseilles Queen is focused on the Sword in her right handÑthe hand of linear logic. How might the advice of a cooler, more objective advisor help you now? Where might you find such an advisor? How might you elicit his or her assistance?"
      },
      "Questions to Ask" : ["What do I have a knack for? How might my special gift prove useful now?","To what extent am I capable of saying what needs to be said?","What is the best possible way to say what I want to say?"]
    }
  },
  {
    "id" : "63",
    "img" : "swords14.jpg",
    "name" : "King of Swords",
    "suit": "Swords",
    "description": {
      "keywords": ["Genius","Expertise","Decision","Verdict"],
      "Light": "Expressing yourself with firmness and authority. Rendering a final decision. Consulting an expert. Calling in advisors and consultants. Coming to a final conclusion. Reaching a beneficial agreement based on sound information.",
      "Shadow" : "Insisting on having the last word. Flaunting your intellectual capability. Talking \"over the heads\" of others. Waffling on an important decision. Constantly changing your mind. Refusing to make choices that are in your own best interest. Wishing in vain you could take back what's been said.",
      "Personality" : "The King of Swords can represent anyone who tends to control or seek to control (King) intellectual and verbal responses (Swords). The King may also represent the tendency to be more blunt than diplomatic, or the need to bring something to a conclusion once and for all.",
      "Elemental" : "Fire of Air.",
      "Affirmation" : "\"My word is my bond.\"",
      "Story" : "The Main Character must choose a side and stick with that choice, regardless of the consequences.",
      "Relationships" : "Say what you mean, and mean what you say. Your friends and partners need straightforward feedback; give it to them. Avoid trying to control what someone says or how he or she says it. When an argument's over, let it be over. Do what you said you would do.",
      "Work" : "Don't waffle. Make commitments and stick to them. If you say you'll meet a deadline, do so. If called on to evaluate the work of others, don't sugar-coat the results; render a fair verdict. Strive to be known for your honesty; avoid brown-nosing and voicing empty praise.",
      "Spirituality" : "Listen for the still, small voice, and, when you've heard it, act on its advice with total confidence. Don't hesitate to confirm your verdict with a wise counselor whose opinions you respect. Be sure to let your spirituality temper your conversation, and match your words with deeds.",
      "Personal Growth" : "Strive to be consistent. Let your word be your bond. One measure of maturity is the ratio of words spoken vs. words listened to. Grow (and gain respect) by learning to hear what others are saying. Reserve judgment until after all the evidence has been heard.",
      "Fortune Telling" : "This card represents an older man with an insightful, deliberate spirit, likely born between May 11th and June 10th, who is known for his integrity and sharp decision-making ability.",
      "When?" : "Between May 11th and June 10th.",
      "Symbols and Insights" : {
        "The Airy Throne" : "To emphasize the airiness of this suit, the throne of the King of Swords may be decorated with flying creatures - or, in some decks, may hover in space. Air's qualities include logic and communication. How might these qualities be deployed to improve your situation?",
        "Solomon Enthroned" : "The gravity and wisdom of this King are unmistakableÑhe is an incarnation of Solomon, who ruthlessly applied logic in order to render wise decisions. In your own situation, should you rely more on logic or wisdom? What might happen if you blended the two?",
        "Thoughtful Bravery" : "How comfortable are you with the fact that not everyone may support or applaud your decisions?  How willing are you to make decisions that alienate some people?",
        "The Marseilles Image" : "The Marseilles King of Swords is composed and alert, maintaining a posture of readiness. He can be seen as a reminder that paying attention is half of solving any problem. Watch the actions of those around you. Weigh their statements carefully. Review records. With a holistic picture in hand, you'll make a better decision."
      },
      "Questions to Ask" : ["What would your decision be if you had to render a binding verdict right now?","How comfortable are you saying exactly what you mean? How often do you temper what you have to say for fear of offending others?","If you were to ask others, \"What's my area of expertise?\" what would they say?"]
    }
  },
  {
    "id" : "64",
    "img" : "coins01.jpg",
    "name" : "Ace of Coins",
    "suit": "Coins",
    "number": "1",
    "description": {
      "keywords": ["Health","Wealth","Practicality","Receiving"],
      "Light": "Outlining a plan for achieving prosperity. Becoming aware of opportunities to improve income or health. Realizing you have everything you need. Appreciating everything the Universe has given you. Receiving the perfect gift at the perfect time.",
      "Shadow" : "Indulging in relentless consumerism. Wanting more, no matter how much you have. Obsessing on your account balance. Suffering from hypochondria. Consuming blessings without expressing gratitude. Taking what you want without concern for the needs of others.",
      "Numerology" : "1 (The Origin: the starting point, the seed, opportunity)",
      "Astrology" : "Capricorn, Taurus, Virgo",
      "Affirmation" : "\"I am open to and thankful for my blessings.\"",
      "Story" : "At the last minute, the Main Character stumbles on a resource that will enable him or her to triumph.",
      "Relationships" : "While money and sex can be used to \"buy\" attention, they cannot purchase true love. An opportunity to have what you've always wanted (at least, in a physical sense) may or may not satisfy your craving for genuine affection. The motive behind a gift means more than the gift itself.",
      "Work" : "An opportunity to earn more money or work in better conditions may come your way. As always, though, you must balance this against the requirements and constraints of such a position. Money is important, but not all-important. Weigh all your options before making a choice.",
      "Spirituality" : "Your spiritual path should influence how you see the physical world, coloring attitudes about everything from possessions to your own body. Ponder the higher purpose your physical resources should play. What are you doing to use them to advance the greater good?",
      "Personal Growth" : "The dream of the world offers us many shiny baubles and hypnotic pleasures, and most of us live in cultures that celebrate acquisition. An opportunity to possess more may come your way. To prevent imbalance, have your ethics clearly in mind, and be prepared to manage your new resources wisely.",
      "Fortune Telling" : "Your health will improve. The check you're looking for really is in the mail.",
      "When?" : "In the Winter.",
      "Symbols and Insights" : {
        "The Hand of God" : "On RWS-inspired decks, a heavenly hand extends from the clouds, offering the viewer the suit's distinctive marker. When opportunity comes your way, take advantage of it; the hand that extends an offer can always withdraw it.",
        "Coins as Symbols" : "As a suit marker, Coins suggest practicality and physicality. Their domain extends beyond money and finance to all physical things, including the human body. Coins explore your attitude toward resources of all kinds: what you've been given, and what you do with it.",
        "Pentacles" : "In RWS-influenced decks, Coins are often called Pentacles. A pentacle's design (with the upright star in the middle) reminds us that physical blessings, from possessions to our bodies, are to be used for higher purposes. In your own life, how often do you focus on \"the star in the coin?\"",
        "The Nature of the Ace" : "Compressed into the Ace are all the qualities of all the other cards of the suit. In this way, the Ace can be said to be the \"root\" or \"seed\" of its associated element. How might your situation contain the seeds of physical growth or financial prosperity?",
        "Your First Impressions" : "When you see the Ace, what's your first impression? Is the Coin in a display case, elaborately decorated but out of reach? Is it being offered ... or taken away? Will the Hand of God freely give it ... or snatch it from your grasp? If you take this Coin, how long before you get another?"
      },
      "Questions to Ask" : ["If I made my decision based solely on practical concerns, what would my decision be?","What resources are available to me?","What will be the physical and financial impact of my decisions?"]
    }
  },
  {
    "id" : "65",
    "img" : "coins02.jpg",
    "name" : "Two of Coins",
    "suit": "Coins",
    "number": "2",
    "description": {
      "keywords": ["Evaluation","Decision","Budgeting","Diagnosis"],
      "Light": "Weighing options. Comparing prices. Determining the value of one option over another. Juggling resources to make ends meet. Making difficult choices based on what's best for your body or your bankbook. Looking at the bottom line. Asking for a second opinion on health issues.",
      "Shadow" : "Engaging in endless price comparison. Putting off a buying decision for fear of finding a slightly better value later on. Buying something without regard for value. Breaking your budget with unnecessary expenses. Engaging in behavior with no regard for how your body or bankbook will be impacted.",
      "Numerology" : "2 (The Other: duality, division, debate)",
      "Astrology" : "Jupiter in Capricorn",
      "Affirmation" : "\"Before taking action, I consider costs.\"",
      "Story" : "The Main Character weighs the impact his or her course of action will have on everyone involved.",
      "Relationships" : "What does this relationship cost you? If this relationship were an investment, how profitable would it be? This card extends an invitation to consider the pros and cons of your relationship. Before taking action, consider what you have to gain ... and what you have to lose.",
      "Work" : "How well do you balance demands of work and life? Remember: you should be working to live, not living to work. If the job is dominating your schedule, press back. If unfettered playtime is ruining your productivity, sober yourself by tallying up the time and money lost to distractions.",
      "Spirituality" : "Of the many options you have for service, which will ultimately do everyone the most good? Identify your skills and talents, and use these as a means of illuminating your own best contribution. Pair your resources with those of other, like-minded people and get twice as much done in half the time.",
      "Personal Growth" : "Be aware of how you determine value. What matters? What doesn't? Before you can answer these questions, you must have a firm grip on your own value system. Making a choice becomes infinitely easier when you have a firm grip on what you value and why.",
      "Fortune Telling" : "It's time to balance the budget. Avoid the temptation to spend critical funds on frivolous goods.",
      "When?" : "Between December 22nd and 30th.",
      "Symbols and Insights" : {
        "The Juggling Man" : "In RWS-inspired decks, a juggler carefully balances two Coins joined by a lemniscate (or \"infinity symbol\"). The world offers us infinite options; the choices we make are a result of weighing each option against our personal value system. What are your values? What action would they dictate today?",
        "Uncertain Seas, Distant Cities" : "In some versions of this card, we see a rolling, unstable sea in the backgroundÑa sign the juggler's emotions are stirred as he struggles to \"get a grip\" on his dilemma. In other versions, we see a distant town, suggesting pressure to make a decision that conforms to the expectations of friends, family, and community. Would your decision be easier if you excluded emotional factors? How might your decision differ if you could make it without incurring the disapproval of others?",
        "Resource Management" : "What course of action best suits your long-term goals? In your situation, what happens if you ask for help? What happens if you do what you can do without asking for additional resources?",
        "The Marseilles Image" : "In antique decks, the two Coins on this card are often encircled by a ribbon imprinted with the publisher's name and the date of publication. How might your decision be impacted by investigating who created this situation ... and when?"
      },
      "Questions to Ask" : ["What values govern my decisions?","How willing am I to sacrifice a little pleasure now in order to have more pleasure later on?","Given my current situation, which course of action will give me more of what I really need?"]
    }
  },
  {
    "id" : "66",
    "img" : "coins03.jpg",
    "name" : "Three of Coins",
    "suit": "Coins",
    "number": "3",
    "description": {
      "keywords": ["Expression","Production","Work","Contribution"],
      "Light": "Finishing a project. Setting and meeting standards. Performing according to specifications. Making something others value. Creating something new. Doing your part in a group project. Delivering exactly what others have asked for.",
      "Shadow" : "Pandering to the tastes of others. Failing to deliver what you've promised. Not delivering your best work unless closely supervised. Ignoring or breaking agreements with those who have invested in you. Refusing to do your part. Failing to abide by a clearly-outlined agreement with yourself or others.",
      "Numerology" : "3 (The Result: expression, productivity, output)",
      "Astrology" : "Mars in Capricorn",
      "Affirmation" : "\"My work produces results.\"",
      "Story" : "The Main Character achieves a result that no other characters have been able to attain.",
      "Relationships" : "What are the terms that govern your relationship? What have you agreed to do? What roles and responsibilities fall to your partner or friend? The health of any relationship is directly related to the effort both partners make to fulfill their obligations. If you haven't discussed terms, do so.",
      "Work" : "It's time to review contracts and agreements. To what extent do you deliver an honest day's work? To what extent is this fairly compensated? If you agreed to work for a certain price, you should fulfill that agreement, even if you underestimated the time and effort involved in a project. A formula for success: know what you need, ask for it up front, and deliver more than promised.",
      "Spirituality" : "In return for dedicated pursuit, a spiritual path should yield focus, fulfillment, and peace. To what extent is your own spiritual practice delivering the promised changes in mind, body, and prosperity? It may be time to evaluate what you're giving ... and receiving.",
      "Personal Growth" : "Integrity is a fragile thing; one broken promise or one unmet commitment can shatter it forever. If you are out of integrity with someone, it's time to correct the situation by admitting fault and accepting consequences. If someone is out of integrity with you, you'll have to decide what value you place on giving them a second chance.",
      "Fortune Telling" : "A high-dollar contract is in your future. If you work hard, you'll succeed.",
      "When?" : "December 31st through Jan 9th.",
      "Symbols and Insights" : {
        "The Worker's Review" : "In RWS-inspired decks, officials or patrons review a craftsman's labor. To what extent has he met their expectations? Others may view you as a craftsman - if only in the metaphorical sense. Will your work please or offend ... and why?",
        "The Product" : "Your effort will likely be judged by the quality of its output. What is the final result of your labor? What does that product say about you, your ethics, and your level of expertise?",
        "Your Role as Creator" : "How might a desire to revise the work of others play a role in your current situation? To what extent can you see yourself \"behind the scenes\" of what you're facing now? What could you produce that is distinctively yours?",
        "The Marseilles Image" : "A flowering vine shaped vaguely like a heart coils around three coinsÑtwo in a pair, one alone. When two people come together in work or in love, their union produces something entirely new. What is your friendship, romance, or cooperative effort producing? What does that product say about the nature of the relationship itself?"
      },
      "Questions to Ask" : ["How can I get more done?","What's expected of me? How large a role do I play in controlling those expectations?","What's been agreed to? How well has that agreement been followed?"]
    }
  },
  {
    "id" : "67",
    "img" : "coins04.jpg",
    "name" : "Four of Coins",
    "suit": "Coins",
    "number": "4",
    "description": {
      "keywords": ["Production","Conservation","Preservation","Safety"],
      "Light": "Saving for a rainy day. Fasting as part of a spiritual practice. Dieting in an effort to improve your body. Abstaining from sex as a way of honoring a spiritual tradition or personal promise. Being financially conservative. Establishing a trust fund. Opening a savings account.",
      "Shadow" : "Being stingy. Refusing to spend money that needs to be spent. Withholding sex from your partner. Taking care of your own needs exclusively, without regard for the needs of others. Spending a dollar to save a penny. Failing to be a good manager of the blessings you've been given.",
      "Numerology" : "4 (The Status Quo: stability, equality, persistence)",
      "Astrology" : "Sun in Capricorn",
      "Affirmation" : "\"I use my resources wisely.\"",
      "Story" : "The Main Character must carefully manage a resource - time, money, people - in order to succeed.",
      "Relationships" : "Seek balance in both physical and financial matters. Too much spending and too much sex leave everyone feeling exhausted and dazed. Too little spending and too little sex starve the soul, making everyone bitter. The healthier the relationship, the more generous the spirits of those involved.",
      "Work" : "Conservation makes sense - and can keep an effort afloat, even in difficult times. Taken to extremes, though, short-sighted savings can alienate customers and shatter opportunities. Every short-cut and every opportunity to save has a cost. Be sure your approach is appropriate for the time.",
      "Spirituality" : "A stingy spirit hampers growth. You simply cannot give more than the Universe can return! Let love, compassion, and interest in others flow freely. Share insights and personal stories. Open yourself to new experiences, new companions, and new points of view. Review your charitable contributions; is it possible to give more?",
      "Personal Growth" : "A mature person elects to be responsible for both the body and the bottom line. Try to understand better how your actions impact both your health and your wealth. Rather than obsess on restriction, think in terms of your goal. With it in mind, what actions are appropriate?",
      "Fortune Telling" : "A rainy day is coming - it's time to save.",
      "When?" : "Between January 10th and 19th.",
      "Symbols and Insights" : {
        "The Stingy King" : "By definition, the King owns it all; on many RWS-influenced cards, we see a ruler who takes this idea to extremes. His possessions are (literally) on his mind and close to his heart; they also anchor his feet to the ground. How might greed or stinginess be distorting your perspective today?",
        "Reaching Limits" : "It's possible to acquire so much, you render yourself incapable of receiving anything more. By letting something go you no longer need, you might open the door for new blessings.",
        "Resisting Change" : "Sometimes we're so intent on preserving what we have, we miss opportunities to have more. How might a blind dedication to protection be limiting your life?",
        "The Marseilles Image" : "Four Coins surround an official seal. In your situation, what do the \"authorities\" have to say about your physical or financial situation? Are their verdicts designed to protect you? Or their own authority?"
      },
      "Questions to Ask" : ["What factors determine how conservative or generous you are?","What kinds of things must be preserved at all costs?","When is greediness or stinginess a good trait to have? When might generosity work against you?"]
    }
  },
  {
    "id" : "68",
    "img" : "coins05.jpg",
    "name" : "Five of Coins",
    "suit": "Coins",
    "number": "5",
    "description": {
      "keywords": ["Poverty","Destitution","Need","Crisis"],
      "Light": "Recognizing your needs and taking action to fulfill them. Doing as much as you can do with what little you have. Admitting you need help. Embracing the aid that comes your way. Focusing on what you have versus what you don't. Looking for the light at the end of the tunnel.",
      "Shadow" : "Exaggerating your financial or physical needs. Adopting a poverty mentality. Refusing to support yourself. Refusing offers of support. Playing the martyr. Turning down opportunities to improve your health or finances. Wallowing in misery.",
      "Numerology" : "5 (The Catalyst: instability, resistance, confrontation)",
      "Astrology" : "Mercury in Taurus",
      "Affirmation" : "\"I have faith that what I need will appear.\"",
      "Story" : "The Main Character refuses to see how he or she can be aided by others.",
      "Relationships" : "No matter how much is given, some people never feel they have enough. A relationship that drains your wallet and spirit may prove too expensive to maintain in the long run. If you accept offers of aid from loved ones, be sure you define and stick to the terms of repayment, or be prepared to lose the relationship.",
      "Work" : "Too few customers. Too few innovations. Too few resources. All too often, we focus on what we lack. Turn this around by taking a fresh look at the resources you do have. Watch for offers of help. Consider mergers and partnerships. Rather than focus on the deficits, consider what could be.",
      "Spirituality" : "Faith can turn trial into triumph. Rather than give in to a depletion of spirit, turn to your faith for support. Turn a difficult situation over to your higher power. Pray for guidance. Be bold: ask the Universe for what you really need. The response may surprise you.",
      "Personal Growth" : "Whining achieves nothing. If the situation is unbearable, it's time to define exactly what resources you have on hand and what needs are critical. Prioritize! By focusing on what you can actually do, you'll avoid the trap of self-pity and depression.",
      "Fortune Telling" : "Finances are getting tighter. Prepare for a setback.",
      "When?" : "Between April 21st and 30th.",
      "Symbols and Insights" : {
        "The Destitute Figures" : "The pitiful people on many RWS-inspired versions of this card are in dire straits indeed. Starving, freezing, and wounded in both body and spirit ... they limp right past an opportunity for aid. When feeling down, don't forget to look up.",
        "The Stained-Glass Window" : "Many versions of this card depict a stained-glass windowÑwhich, by association, suggests a church. What organizations could come to your aid? What groups of people might leap at the chance to be involved in your situation? What keeps you from approaching them?",
        "The Distractions of a Crisis" : "When things are going wrong, strong emotions can interfere with making practical choices. To what extent might strong emotions be blinding you to quick and easy solutions?",
        "The Marseilles Image" : "Four Coins, entwined with vines, surround and isolate a fifth. The central Coin, isolated from the others, cannot benefit from the resources they represent. How does isolation figure in your situation? How might your situation be enriched by reaching out to others?"
      },
      "Questions to Ask" : ["What critical resources do I lack?","What people or groups would come to my aid if I asked?","How might an impoverished spirit be impacting my physical or financial condition?"]
    }
  },
  {
    "id" : "69",
    "img" : "coins06.jpg",
    "name" : "Six of Coins",
    "suit": "Coins",
    "number": "6",
    "description": {
      "keywords": ["Charity","Fairness","Cooperation","Sharing"],
      "Light": "Giving time, money, or effort to a charity. Taking part in a group effort. Lending your resources to others without expecting anything in return. Making sure everyone is treated equally. Working together toward a common goal. Redistributing wealth, time, or attention. Tithing. Sharing credit for your success.",
      "Shadow" : "Making a loan as a means of gaining control over someone. Using charitable acts to draw attention to yourself. Dividing work or resources unfairly. Failing to do your part in a group effort. Ignoring obligations and commitments.",
      "Numerology" : "6 (The Adjustment: cooperation, collaboration, interaction)",
      "Astrology" : "Moon in Taurus",
      "Affirmation" : "\"Knowing I will receive more, I share my resources freely.\"",
      "Story" : "The Main Character wins by cooperating instead of competing.",
      "Relationships" : "In a healthy relationship, partners help each other. Healthy partners agree on rules for dividing up chores, financial responsibilities, and social roles - and then honor those commitments. Define what equality means for you, and help each other achieve it.",
      "Work" : "Learn to delegate. Many people, working together, can achieve more than one person, working alone. So what if some people contribute less and still get credit? Good managers will recognize star contributors and reward them accordingly.",
      "Spirituality" : "A mature soul seeks to come to the aid of others. This may involve traditional charity: giving time, money, or effort. Don't forget, though, that prayers and compassionate meditation can also change the world for good. Whatever form of service your spiritual path encourages, offer it with sincerity and regularity.",
      "Personal Growth" : "Charity is based on a simple principle: we should all look out for each other. Self-interest comes naturally; interest in others and their well-being is the hallmark of maturity. Putting the needs of others first can ease your progress toward a balanced life.",
      "Fortune Telling" : "When you need help, ask for it. Remember, though: what you receive may be limited by what you've given to others in the past.",
      "When?" : "Between May 1st and May 10th.",
      "Symbols and Insights" : {
        "Scales" : "Many versions of this card incorporate an image of a man with scales, doling out charity to grateful recipients. The scales emphasize the fairness with which his charity is delivered, making it possible for each person to receive exactly what's needed. In your own circumstance, what role does fairness play?",
        "The Nature of Charity" : "The wealthy merchant on many versions of this card won't miss a gold Coin or two, but the money he distributes could make a huge difference to someone less fortunate. Keep an eye out for a small gesture that could make a big difference in someone else's life.",
        "The Lone Giver" : "The wealthy merchant can help a few, but his \"lone wolf\" approach to charity will have its limits. What role does isolation play in your situation? How might joining a group of some kind influence your future?",
        "The Marseilles Image" : "An elaborate vine divides six Coins into six virtually equal compartments: a place for everything, and everything in its place. With this image in mind, explore the equal division of responsibility in your own situation. To what extent is everyone pulling his or her weight?"
      },
      "Questions to Ask" : ["How do I feel about charity? About giving it? About receiving it?","How can I know if I'm treating others fairly?","What could I give that no one else can?"]
    }
  },
  {
    "id" : "70",
    "img" : "coins07.jpg",
    "name" : "Seven of Coins",
    "suit": "Coins",
    "number": "7",
    "description": {
      "keywords": ["Assessment","Evaluation","Re-evaluation","Reflection"],
      "Light": "Measuring progress toward your goal. Looking at results with an eye toward improving performance. Asking, \"How happy am I?\" Coming up with ideas for improving your health or prosperity. Deciding it's time for a change. Expressing an honest opinion.",
      "Shadow" : "Becoming distracted by melancholy thoughts. Longing for \"the good old days.\" Beating yourself up over lost opportunities. Judging your own work harshly. Holding others to inappropriate standards. Refusing to take part in a project, then whining about the quality of the outcome.",
      "Numerology" : "7 (The Motive: imagination, inner work, psychology)",
      "Astrology" : "Saturn in Taurus",
      "Affirmation" : "\"To stay on target, I measure my progress.\"",
      "Story" : "The Main Character looks back on what he or she has achieved and sees his or her work in a new light.",
      "Relationships" : "When this relationship started, what did you imagine it could become? To what extent have your expectations been fulfilled? If it falls short, you have two options: confront the difference ... or revise your expectations. Which option is most likely to lead to happiness?",
      "Work" : "Fulfillment keeps work from becoming drudgery. What do you need in order to feel rewarded? To what extent is your current work providing this? A new project can breathe life back into a dull job. Be alert for opportunities to change your job without, necessarily, changing jobs.",
      "Spirituality" : "Which are you more likely to do: look back on wasted days or focus on a brighter future? The past is the past; let it go. If you haven't achieved, spiritually speaking, what you hoped to achieve by now, deepen your resolve, set new goals, and pray for the strength to achieve them.",
      "Personal Growth" : "You can waste an entire lifetime wrestling with regrets. Escape the trap. Shift your focus from the past to the future, and resolve to make the most of the here and now. No amount of looking back can rewrite history; by contrast, working in the here and now can radically alter tomorrow.",
      "Fortune Telling" : "Things won't work out as expected. Pick up the pieces and prepare to move on.",
      "When?" : "Between May 11th and May 20th.",
      "Symbols and Insights" : {
        "The Crop of Pentacles" : "RWS-inspired illustrations portray a vine or tree bearing a crop of golden Coins: the fruit of past labor. Take stock of what you have today, and consider how past efforts have contributed to your current situation. If you're unhappy at all, change your strategy; to get different results, stop doing the same old thing.",
        "The Unhappy Farmer" : "RWS-influenced decks depict a man whose posture and expression suggest a level of exhaustion and regret that not even a bumper crop can alleviate. Most likely, his expectations were out of alignment with reality. What expectations do you have? How have these expectations shaped your efforts?",
        "Everyone's a Critic" : "Each person sees his or her situation through a lens of his or her own making. What role might prejudices and assumptions play in your current situation?",
        "The Marseilles Image" : "Seven coins are balanced like berries on vines that sag beneath their weight. In your situation, how might further growth be limited by past performance? Might some items be ripe for picking - creating room for new expansion and growth?"
      },
      "Questions to Ask" : ["To what extent have I fulfilled my own expectations?","What are the terms of success?","How can I be happier with the progress I've made?"]
    }
  },
  {
    "id" : "71",
    "img" : "coins08.jpg",
    "name" : "Eight of Coins",
    "suit": "Coins",
    "number": "8",
    "description": {
      "keywords": ["Effort","Work diligence","Skill"],
      "Light": "Doing your best. Bringing enthusiasm and zeal to your work. Making an effort to be the best you can be. Finding the work that is right for you. Taking care of the small details. Becoming a finely skilled craftsperson. Building something with your hands. Making a handmade gift.",
      "Shadow" : "Working yourself to death. Doing a half-hearted or sloppy job. Continuing in a job you hate. Buying thoughtless gifts. Producing work with shoddy craftsmanship. Rushing through your work. Rejecting opportunities to learn more about your craft.",
      "Numerology" : "8 (The Action: movement, outer work, swiftness)",
      "Astrology" : "Sun in Virgo",
      "Affirmation" : "\"I give myself wholeheartedly to the task of the moment.\"",
      "Story" : "The Main Character is shown to be the very best at his or her chosen vocation.",
      "Relationships" : "Discover what your partner loves or needs and make a special effort to deliver those gifts, words, or service on a regular basis. Consider the value of a handmade gift. Partners should look for ways to demonstrate their dedication to each other. Busy? Make sure a request from your partner or friend rises to the top of your \"To Do\" list.",
      "Work" : "All too often, compressed schedules demand we do \"just enough.\" Today, try going beyond the bare minimum. Add that extra touch. Devote a little personal time to completing your work. Even if the task is an ordinary one, strive to make today's product extraordinary. Others may not notice the difference - but you will.",
      "Spirituality" : "Rituals can feel silly, and formal prayer can feel stiff and unnatural. Today, though, invest a little extra time and energy into your spiritual observations. Choose something to wear that reflects your faith. Acquire a special item for a home altar. Be in the moment, devoting extra attention to the small details of your faith.",
      "Personal Growth" : "Instead of just getting by, a mature person recognizes that every project and every interaction is a reflection of character. What would recent projects say about you? With an eye toward improving your image and reputation, how might your work and speech need to change?",
      "Fortune Telling" : "Stop over-analyzing, researching, and outlining. Buckle down and get the work done.",
      "When?" : "Between August 23rd and September 1st.",
      "Symbols and Insights" : {
        "The Devoted Craftsman" : "RWS-inspired versions of this card often show an isolated worker carving a number of shiny new pentacles. Note how he loses himself in his work! What might happen if you shunned distraction, isolated yourself, and focused yourself entirely on the work at hand?",
        "One Coin at a Time" : "Our friend on many versions of this card has several coins hanging on the doorpost - but he can only make one coin at a time. What small step can you take right now toward realizing a larger plan?",
        "Getting Lost in the Work" : "In the rush to complete a project, we can easily lose our connection with the simple pleasure of work done well. How can you start taking pleasure in the process?",
        "The Marseilles Image" : "Eight Coins have been arranged in two precisely balanced rows of four. The arrangement looks deliberate; someone worked hard to move each Coin into perfect alignment. When your work is done, what evidence will there be of your own dedication to perfection?"
      },
      "Questions to Ask" : ["How long has it been since you were \"lost in your work?\"","How can you improve your level of dedication and focus?","What work do you do best? What about that work appeals to you?"]
    }
  },
  {
    "id" : "72",
    "img" : "coins09.jpg",
    "name" : "Nine of Coins",
    "suit": "Coins",
    "number": "9",
    "description": {
      "keywords": ["Training","Discipline","Confidence","Enough"],
      "Light": "Investing time in learning or teaching a difficult task. Restraining yourself from physical or financial extremes. Making sacrifices as a way of achieving larger goals. Breaking a complex task down into simple steps. Wanting what you have. Knowing the difference between needs and wants.",
      "Shadow" : "Being assigned to a task without being trained to perform it. Pursuing a position for which you are not qualified. Disregarding requirements. Refusing to dedicate adequate time or attention when learning about something or someone new. Always craving more.",
      "Numerology" : "9 (The Completion: fullness, readiness, ripeness)",
      "Astrology" : "Venus in Virgo",
      "Affirmation" : "\"I know enough to be confident in my decisions.\"",
      "Story" : "The Main Character outlines a detailed action plan, step-by-step. Alternatively, the Main Character is placed in a position for which he or she is completely unqualified.",
      "Relationships" : "We learn about love from our parents, but their examples may or may not be suitable for relationships we forge for ourselves. Everyone has something to learn about love. Model the level of love and patience you want your partner to provide.",
      "Work" : "Many problems arise when people are assigned to tasks to which they are not suited by training or nature. Where's the disconnect? Identify what you don't know, and ask for appropriate training. When using unskilled workers to do an elaborate task, scale expectations accordingly.",
      "Spirituality" : "Wanting what you have can transform your world. All too often, we get caught up in the ruthless cycle of pursuing \"bigger and better,\" when, in fact, we could very easily make do. Today, consider how you can delight in what you've already been given.",
      "Personal Growth" : "Be patient with yourself. Seek advice from those who easily do what you must strive to do. Give yourself time to learn a new process. If you're hoping to engineer a change in your own behavior, recognize the value of little steps toward your goal.",
      "Fortune Telling" : "Until you appreciate what you have, you won't have any luck getting more.",
      "When?" : "Between September 2nd and 11th.",
      "Symbols and Insights" : {
        "The Hooded Falcon" : "Decks in the RWS family often illustrate this card with an image of a fine lady training a falcon. Training an animal requires patience and empathy. How might these qualities play a role in your situation today?",
        "The Bumper Crop" : "While the lady of the manor focuses on the task at hand, a rich harvest of pentacles grows. Her bounty looks effortless, but a crop this rich doesn't happen by accident. How have past efforts (or a lack of effort) shaped the situation you find yourself in now? To what extent is someone reaping what he or she has sown?",
        "Fullness" : "The woman on many versions of this card appears to have plenty of resources at her disposal. For you, how much is too little? How much is too much? What would be \"just right?\"",
        "The Marseilles Image" : "The ninth Coin squeezes into position, disrupting the careful balance of the Eight. It bulges outward, forcing all other coins to the extreme ends of the card. In what way might your \"desire of the moment\" caught similar crowding in your own life?"
      },
      "Questions to Ask" : ["If you could not have what you want, how would you make do?","Could you make a complex task easier by breaking it down into smaller steps?","How patient are you during the learning process? With yourself? With others?"]
    }
  },
  {
    "id" : "73",
    "img" : "coins10.jpg",
    "name" : "Ten of Coins",
    "suit": "Coins",
    "number": "10",
    "description": {
      "keywords": ["Wealth","Abundance","Acquisition","Greed"],
      "Light": "Celebrating your physical and financial blessings. Realizing how lucky or how blessed you are. Being satisfied with your physical and financial achievements. Taking best advantage of \"times of plenty.\" Enjoying a feast. Showering friends or family with gifts.",
      "Shadow" : "Spending all of your money on extravagant gifts and possessions. Trying too hard to impress others with your wealth or physique. Giving an inappropriately expensive gift as a means of currying favor. Obsessing on matters of weight, health, or finance. Always asking, \"What's in it for me?\"",
      "Numerology" : "10 (The End: finality, completion, exhaustion)",
      "Astrology" : "Mercury in Virgo",
      "Affirmation" : "\"I keep physical and financial matters in perspective.\"",
      "Story" : "The Main Character turns down an extravagant reward for his or her good work. Alternatively, the Main Character is offered an attractive bribe.",
      "Relationships" : "Being swept off your feet is one thing; being overwhelmed by sex or gifts is quite another. Keep a level head with regard to the importance of both presents and pleasure. Gifts and physical intimacy have an intensity all their own, but cannot compensate for genuine affection.",
      "Work" : "Your skills are for saleÑnot your soul. In the long run, will any amount of money compensate for the loss of your health or self-respect? Look carefully at the carrots being dangled before you. Know when to say no. Celebrate what you have; debate whether more is needed.",
      "Spirituality" : "Lots of \"stuff\" can blind us to or distract us from our deepest, most important needs. Lighten the load. Consider giving away some of the possessions that weight you down. When blessings overflow, share them with others.",
      "Personal Growth" : "You are not defined by your paycheck, by the size of your home, or by memberships in exclusive clubs. Behind all the possessions, behind the physical shell, there is only you; instead of focusing on the externals, make sure you're at peace with the person you really are.",
      "Fortune Telling" : "Big money is in the near future. Expect a powerful blessing to come your way.",
      "When?" : "Between September 12th through 22nd.",
      "Symbols and Insights" : {
        "The Tree of Life" : "Students of Qabalah will recognize the ten Coins so often seen on the original RWS version of this card have been arranged to suggest the shape of the Tree of Life. In other decks, including the Marseilles, an overflow of Coins dominates the image. Either approach stresses the overflow of material blessings and should remind us to consider the higher purpose behind the \"ten thousand things\" in our lives.",
        "The Pensive Elder" : "On this card, RWS-inspired decks often depict an older man, deep in thought. What's on his mind? His wealth? His family? The future of his empire? How might these sobering topics play a role in your situation?",
        "More Than Enough" : "Numerology suggests the tens represent the point at which fullness has been exceeded, and the energy of the suit becomes spoiled and over-extended. Too much focus on material goods Ð or even on the condition of our own bodies - can be just as damaging as too little.",
        "The Marseilles Image" : "Ten coins crowd the image. An additional coin would crush the central blossom, obliterating any room for growth. At some point, physical possessions and concerns can limit our progress. Are you there?"
      },
      "Questions to Ask" : ["How much stuff do I really need?","How do I feel about wealth and abundance? How do I define these terms?","How might shedding some possessions open room for growth?"]
    }
  },
  {
    "id" : "74",
    "img" : "coins11.jpg",
    "name" : "Page of Coins",
    "suit": "Coins",
    "description": {
      "keywords": ["Practicality","Prosperity","learning","Growth","Adolescence"],
      "Light": "Learning the value of a dollar. Starting a savings plan. Taking the first steps toward getting out of debt. Learning new physical tasks. Discovering your sexuality. Launching a diet, a weight-lifting program, or a health-related effort. Learning by doing.",
      "Shadow" : "Trying to appear healthier or wealthier than you really are. Spending money carelessly. Living strictly for today, with no thought of tomorrow. Possessing immature attitudes toward sex and sexuality. Using wealth or beauty as an excuse for not having to learn and grow.",
      "Personality" : "The Page of Coins can represent anyone who wants to or needs to learn (Page) more about money, health, or sexuality (Coins). Though fascinated with the physical realm, The Page may lack the experience or information needed to handle money or human sexuality with responsibility and confidence. He or she may overcompensate for this by wasting money, abusing his or her health, or over-indulging in or obsessing on sex.",
      "Elemental" : "Earth of Earth.",
      "Affirmation" : "\"I am physically and financially responsible.\"",
      "Story" : "The Main Character must compensate for or learn from an earlier financial or sexual impropriety.",
      "Relationships" : "Don't rush into sexual situations that make you uncomfortable or that push your limits. Give a relationship time to flourish before opening a joint checking account. Lending money is a sure way to poison friendships and relationships. Before starting something new, ask \"What's in this for me?\"",
      "Work" : "Accepting lower pay as a means of gaining experience makes sense when starting your career - but experienced workers should view such arrangements with skepticism. Know what you're worth. Look for opportunities to learn while doing. Subject all work to the practicality test.",
      "Spirituality" : "Consider what role your faith should play in making financial and sexual decisions. To what extent would your financial or sexual activity differ if you were not on your current spiritual path? Your body is a precious gift; treat it as such. Keep material blessings in perspective.",
      "Personal Growth" : "Whatever our station in life, we can always be better stewards of the blessings we've received. Do old habits threaten your health? Set them aside. Today, make a point to take special care of whatever you've been given.",
      "Fortune Telling" : "This card represents a young man or woman with an earthy, practical demeanor, likely born an Aries, Taurus, or Gemini, who playfully encourages you to take financial or sexual risks.",
      "When?" : "Between March 21st and June 20th.",
      "Symbols and Insights" : {
        "Awkwardness and Silliness" : "The RWS Page of Pentacles romanticizes his Pentacle, holding it like a treasured bauble. This suggests a degree of impracticality; how might this quality play a role in your situation?",
        "Earthiness vs. Inexperience" : "The Page of Coins combines the practicality of Coins with the awkwardness of a Page. The result is someone who longs for more financial or sexual skill then he or she actually possesses. Sound familiar?",
        "Learning by Doing" : "A little preparation in advance of a task can eliminate distraction and limit the potential for disaster. Just remember: once the action starts, you're committed!",
        "The Marseilles Image" : "In many versions of the Marseilles image, the Page of Coins gazes romantically at the Coin in his hand, but is oblivious to an identical Coin on the ground before him. How might enthusiasm or inexperience be blinding you to more practical alternatives?"
      },
      "Questions to Ask" : ["How can you get more financial or sexual experience without risking your livelihood or health?","How might hands-on learning play a role in your situation?","What's the most practical choice you could make?"]
    }
  },
  {
    "id" : "75",
    "img" : "coins12.jpg",
    "name" : "Knight of Coins",
    "suit": "Coins",
    "description": {
      "keywords": ["Caution","Focus","Realism","Invention"],
      "Light": "Spending money wisely. Saving for a rainy day. Paying close attention to physical or financial details. Knowing where every dollar goes. Having safe sex. Preferring facts to \"good feelings.\" Finding creative ways to \"make do\" with resources on hand. Completing a new invention.",
      "Shadow" : "Throwing caution to the four winds. Spending without regard for consequence. Spending on luxury when necessities are lacking. Escaping stress by spending money. Obsessing on tiny physical or financial details. Perpetually chasing after some new bauble. Copying another's work and claiming it as your own.",
      "Personality" : "The Knight of Coins can represent anyone who wants to lead the way (Knight) to greater physical and financial success (Coins). The Knight may also represent the tendency to be more cautious than adventuresome, or a compulsive desire to avoid risk by obsessing on tiny logistical or physical details.",
      "Elemental" : "Air of Earth.",
      "Affirmation" : "\"I temper my actions with cautious optimism.\"",
      "Story" : "The Main Character takes a tentative first step toward a new solution.",
      "Relationships" : "Relationships, like investments, should pay dividends. Your investment of time, attention, and affection should be returned by your friends and partners. Taking care of others is admirable; take care of yourself, too. Watch for creative ways to enjoy time together without spending money.",
      "Work" : "Keep an eye on the bottom line. Some times call for penny-pinching. At other times, growth many depend on generosity. There's satisfaction in delivering a final, physical product. Keep an eye on the goal. Keep your commitments. Tackle big projects one step at a time.",
      "Spirituality" : "Avoid taking a guru's claims at face value. Weigh any guidance received on the scales of your heart. Take spiritual advice (including advice from this book) with great caution and deliberation. Find practical, physical, creative ways to express your spiritual insights.",
      "Personal Growth" : "There's a fine line between caution and pessimism. Believe in yourself and what you hope to achieve; at the same time, be sure to attend to the \"doing\" that leads to \"having.\" Encourage progress by keeping a physical reminder of upcoming rewards close at hand.",
      "Fortune Telling" : "A stingy person may chide you for spending money. Be prepared to defend an economic or sexual decision.",
      "When?" : "Between April 11th and May 10th.",
      "Symbols and Insights" : {
        "The Precious Pentacle" : "Many versions of this card show a knight apparently hypnotized by the pentacle in his hand. Once you've attained the object of your quest, caution is required to protect, maintain, and preserve what you've won - but remember, too, that regarding something too highly is the best way to render it useless.",
        "The Unmoving Horse" : "In many decks, the Knight of Coin's horse stands as rigid and still as a statue. There's a difference between proceeding with caution and allowing yourself to become paralyzed by pessimism. What do you need in order to get moving again?",
        "Saving vs. Spending" : "Knights embody extremes. The Knight of Coins could be a miser or a spendthrift, depending on which way his energy flows. What would a miser do? What might a spendthrift do? And might there be some middle ground worth pursuing?",
        "The Marseilles Image" : "The well-grounded Marseilles Knight of Coins rides boldly forward, chasing a Coin that somehow always manages to remain just out of reach. To what extent might you also be chasing \"castles in the sky?\" How well-grounded are your own plans and methods? How might an emphasis on the practical speed your progress toward your goals?"
      },
      "Questions to Ask" : ["What's the difference between caution and fear?","How can I evaluate the practicality of my own ideas and methods?","How realistic are my goals?"]
    }
  },
  {
    "id" : "76",
    "img" : "coins13.jpg",
    "name" : "Queen of Coins",
    "suit": "Coins",
    "description": {
      "keywords": ["Luxury","Comfort","Resourcefulness","Generosity","Prosperity"],
      "Light": "Appreciating fine food, fine wine, beautiful art, beautiful bodies, or any of the better things in life. Reveling in healthy sexuality. Treating yourself. Splurging on the occasional \"nice to have\" item. Rewarding someone with compensation above and beyond expectations. Having it all.",
      "Shadow" : "Indulging in gluttony or greediness. Becoming insatiable. Blunting the impact of treats by indulging in them too often. Providing physical comfort without providing for emotional needs. Allowing a feeling of entitlement to distort your gratitude for what you're given.",
      "Personality" : "The Queen of Coins can represent anyone who wants to encourage others (Queen) to appreciate the pleasures of the physical world (Coins). The Queen may also represent the tendency to be more materially-minded than spiritually-minded, or the need to pursue personal comfort at almost any cost.",
      "Elemental" : "Water of Earth.",
      "Affirmation" : "\"I relish the best this world has to offer.\"",
      "Story" : "The Main Character must avoid being lulled into complacency by the temptations of \"the good life.\"",
      "Relationships" : "Over time, passion may give way to comfort; both of these incarnations of love have their benefits. A luxury shared with others becomes even more luxurious. Don't over-think sex and relationships. Instead, set reasonable limits and embrace what your body yearns for.",
      "Work" : "Strive to incorporate special touches and little extras in your products and services today. These may require more time or resources to complete, but the results will be well worth the investment. Don't be satisfied with anything less than the very best product possible.",
      "Spirituality" : "Cocoon yourself in spiritual protection. Say an extra prayer. Burn an expensive stick of incense and savor the sweet aroma. Light a scented candle. Enjoy a ritual dinner. Alternatively, heighten your appreciation for your blessings by engaging in a period of voluntary simplicity. What can you do without?",
      "Personal Growth" : "How often do you cheat yourself by opting for the less expensive, the less suitable, or the less than perfect? There's great pleasure in sacrificing for, saving for, and acquiring something \"just right.\" You may find anticipating something is more pleasurable than having it.",
      "Fortune Telling" : "This card represents a woman with an expansive, sensual nature, likely born between December 13th and 31st, who uses sensual appeal and the promise of reward to sway others to her point of view.",
      "When?" : "Between December 13th and 31st.",
      "Symbols and Insights" : {
        "Luxurious Robes" : "Reflecting themes of luxury and sensuality, the Queen of Coins is frequently clothed in rich fabrics and loose, comfortable robes. She loves the pentacle in her hands: its texture, its temperature, its smoothness, its weight. What might happen if you emulated her attention to sensual detail?",
        "The Treasured Pentacle" : "What an object of art that Pentacle is! What might happen if you were to put your own best side forward, thrusting it into the spotlight for all to admire?",
        "The Value of True Comfort" : "Money and health come and go. How can you cultivate a level of comfort that transcends sudden and unexpected changes in your circumstances?",
        "The Marseilles Image" : "The Marseilles Queen of Coins gazes into her Coin as though it were a crystal ball. In some ways, knowing the future is the ultimate luxury. What outcomes can you predict? With those predictions in mind, what actions should you be taking now as a means of securing your own comfort tomorrow?"
      },
      "Questions to Ask" : ["How do I define luxury?","To what extent am I capable of reveling in sensual pleasure?","What would I have to give up in order to \"have it all?\""]
    }
  },
  {
    "id" : "77",
    "img" : "coins14.jpg",
    "name" : "King of Coins",
    "suit": "Coins",
    "description": {
      "keywords": ["Stability","Dependability","Confidence","Intervention"],
      "Light": "Becoming debt-free. Having more than enough to get by. Making contributions to a savings plan. Taking a new job with an eye toward advancing your career. Buying life or health insurance. Being confident in the bedroom. Taking on the role of enforcer when called upon to do so.",
      "Shadow" : "Becoming so conservative you resist all change on principle alone. Ignoring innovations in the name of preserving tradition. Being smug or cocky. Becoming ruthlessly dedicated to profit or pleasure. Being sexually selfish. Bossing others around, especially when you're not empowered to do so.",
      "Personality" : "The King of Coins can represent anyone who tends to control (King) finances and physical resources (Coins). The King may also represent the tendency to be more conservative than innovative, or the need to intervene on the behalf of others with less confidence or experience.",
      "Elemental" : "Fire of Earth.",
      "Affirmation" : "\"I embody confidence and fairness.\"",
      "Story" : "The Main Character must persuade conservative or traditional people to try a new approach, or must spurn tradition in order to succeed.",
      "Relationships" : "Money trouble can ruin romance; dedicate yourself to handling funds (especially mutual ones) responsibly. Planning for a future together can be exciting and even arousing. Express physical affection with boldness. When circumstances dictate, be prepared to speak up or take action in your partner's defense.",
      "Work" : "This card points to a need for a conservative approach to making and spending money. Stay on budget. Find ways to reduce costs. These measures don't have to choke innovation and fun; they just call on you to be more creative with the resources you do have.",
      "Spirituality" : "Allow your spirituality to inspire financial and physical responsibility. Take great care to honor the money you've been given. Take special care of your body, and see it as an instrument of the Universal Will. Lend your resources to those who earnestly need your help.",
      "Personal Growth" : "Mature souls handle money and relationships responsibly. Before spending money, consider the consequences. Before becoming physical with someone, consider the potential outcome of your actions. Live in the moment, but cultivate an awareness of future events your present actions could call into being.",
      "Fortune Telling" : "This card represents an older man with a financially, socially, and politically conservative spirit, likely born between August 12th and September 11th, who is known for putting his money where his mouth is.",
      "When?" : "Between August 12th and September 11th.",
      "Symbols and Insights" : {
        "The Harvest Throne" : "The King of Coins frequently sits on a throne draped with vines and grapes - a reminder of his intimate connection with the forces that create abundance. How might a conservative approach today help you achieve greater abundance and wealth tomorrow?",
        "Controlled Luxury" : "No excesses here; the King of Coins enjoys his comforts, but he keeps them in perspective. How do you assign value to the objects around you? If you sense that physical things are becoming too important, what should you do?",
        "Lessons Learned" : "One way to control (King) the physical realm (Coins) is to restrict those actions that disturb the status quo. How might being physically or financially conservative be an advantage now? How might shattering that control lead to positive outcomes?",
        "The Marseilles Image" : "The Marseilles King of Coins exudes a confidence that comes from knowing the Coin in his hand isn't the only Coin at his command. When you've taken measures to make best use of your physical blessings, you can enjoy them without becoming their slave."
      },
      "Questions to Ask" : ["How can you handle expenses with greater confidence and maturity?","How dependable are you? How dependable would others say you are?","To what extent is a conservative viewpoint valuable? At what point does it become more of a burden than a blessing?"]
    }
  }
];
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//








;
