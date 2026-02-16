# Learning JavaScript

## References
- https://learnxinyminutes.com/javascript/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference


## Running scripts

From the command line:
```bash
node <script-file>
```

In interactive mode:
```bash
node
```
Then, import a specific function from a file. Inside the node REPL:
```node
const { <function> } = await import("<script-file>");
```


## Unit tests

Install the requirements:
```bash
npm install
```

Run specific tests:
```bash
npm test test/<test-file>
```
Example:
```bash
npm test test/next_day.js
```

