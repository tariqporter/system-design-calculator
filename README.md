## A simple System Design Calculator

Enter any equation, using

- \* for multiply
- / for divide
- ^ To the power of
- \+ for addition
- \- for subtract

Brackets can also be used `3 * (1 + 2)`
As well as

- k for Kila
- m for Mega
- g for Giga
- t for Tera

Full units are not used ie. kb,mb etc as they are not known.
For example we may type `2M` to mean 2 million users or 2MB

An example of use:

```
3k * (1g + 2g)
// = 9T
```

### Building for your system

You may build a version for your system to the `/out` folder by running `yarn package`
