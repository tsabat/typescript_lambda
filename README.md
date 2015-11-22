This is CodePen's implementation of the TypeScript preprocessor.  The module is
laid out in a way that allows [AWS
Lambda](http://docs.aws.amazon.com/lambda/latest/dg/walkthrough-custom-events-create-test-function.html)
to run it.

At the moment, we're stuck on [this issue](#issues) which prevents us from using
React.  Any contributions would be happily accepted.


## Install

```
npm install
```

## Run

The most basic run is without arguments.  This will render so valid TypeScript

```
./run_locally.js
```

However, if you want to test out error handling, try running 

```
./run_locally.js invalid_typescript
```

And react support using

```
./run_locally.js valid_react
```

You can add more markup types by placing them in `./markup` and passing their
relative path to `run_locally`.


## Issues:

As it stands, our compiler does not use JSX, as pointed out by user Mishkin

```
TypeScript + React requires compiling JSX which normally would be handled by
Babel but the TypeScript compiler can be configured to allow for the TypeScript
equivalent of JSX which is TSX. Refer to the TypeScript github page:
https://github.com/Microsoft/TypeScript/wiki/JSX and also
https://github.com/Microsoft/TypeScript/wiki/Compiler-Options which specify that
jsx can be compiled with the “—jsx” flag in order to "Support JSX in '.tsx'
files: 'React' or 'Preserve'.

Here is my test case which is failing. http://codepen.io/anon/pen/avMePy
```

So, here's where we're stuck.  I'm using TypeScript V1.6, so React support is
built in.  But, we're still having issues.  Maybe I'm passing the react
arguments incorrectly in `typescript.js`, but as it stands, I can't get the react
stuff to work when I call

```
./run_locally.js valid_react
```

I get this error:

```
{ error: '\',\' expected.', line: 3 }
```
