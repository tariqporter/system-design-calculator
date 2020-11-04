export const calculate = (s) => {
  s = s.toLowerCase();
  let i = 0;

  const TYPES = {
    SPACE: 'SPACE',
    NUM: 'NUM',
    OP: 'OP',
    BRACKET: 'BRACKET',
    UNIT: 'UNIT',
  };

  const SPACES = ' ';
  const NUMS = '0123456789';
  const OPS = '+-/*^';
  const BRACKETS = '()';
  const UNITS = ['k', 'm', 'g', 't'];

  const POWS = {
    '(': 0,
    ')': 0,
    '-': 1,
    '+': 1,
    '*': 2,
    '/': 2,
    '^': 3,
  };

  const isSpace = () => {
    return SPACES.includes(s[i]);
  };

  const getSpaces = () => {
    let start = i;
    while (isSpace()) i++;
    return [TYPES.SPACE, s.substring(start, i + 1)];
  };

  const isNum = () => {
    return NUMS.includes(s[i]);
  };

  const getNums = () => {
    let start = i;
    let hasPeriod = false;
    while (isNum() || s[i] === '.') {
      if (s[i] === '.') {
        if (hasPeriod) break;
        hasPeriod = true;
      }
      i++;
    }
    return [TYPES.NUM, parseFloat(s.substring(start, i))];
  };

  const isOp = () => {
    return OPS.includes(s[i]);
  };

  const getOp = () => {
    return [TYPES.OP, s[i++]];
  };

  const isBracket = () => {
    return BRACKETS.includes(s[i]);
  };

  const getBracket = () => {
    return [TYPES.BRACKET, s[i++]];
  };

  const isUnit = () => {
    return UNITS.includes(s[i]);
  };

  const getUnit = () => {
    return [TYPES.UNIT, s[i++]];
  };

  const multNum = (num, unit) => {
    if (unit === 'k') return num * 1024;
    else if (unit === 'm') return num * 1024 ** 2;
    else if (unit === 'g') return num * 1024 ** 3;
    else if (unit === 't') return num * 1024 ** 4;
  };

  const stack = [];
  const ops = [];

  const calc = (num1, num2, op) => {
    const n1 = num1[1];
    const n2 = num2[1];
    const o = op[1];
    let num = 0;
    if (o === '+') num = n1 + n2;
    else if (o === '-') num = n1 - n2;
    else if (o === '*') num = n1 * n2;
    else if (o === '/') num = n1 / n2;
    else if (o === '^') num = n1 ** n2;
    return [TYPES.NUM, num];
  };

  const process = (lastOp) => {
    const pow = POWS[lastOp[1]];
    while (ops.length) {
      const topOp = ops[ops.length - 1];
      const topPow = POWS[topOp[1]];
      if (topPow <= pow) break;
      ops.pop();
      if (stack.length < 2) break;
      const num2 = stack.pop();
      const num1 = stack.pop();
      const num3 = calc(num1, num2, topOp);
      stack.push(num3);
    }
  };

  const processEnd = () => {
    while (ops.length) {
      const op = ops.pop();
      if (stack.length < 2) break;
      const num2 = stack.pop();
      const num1 = stack.pop();
      const num3 = calc(num1, num2, op);
      stack.push(num3);
    }
  };

  const simplify = (num) => {
    let ans;
    if (num < 1024) ans = [num, ''];
    else if (num < 1024 ** 2) ans = [num / 1024, 'K'];
    else if (num < 1024 ** 3) ans = [num / 1024 ** 2, 'M'];
    else if (num < 1024 ** 4) ans = [num / 1024 ** 3, 'G'];
    else ans = [num / 1024 ** 4, 'T'];
    if (Math.round(ans[0]) !== ans[0]) ans[0] = ans[0].toFixed(2);
    return ans;
  };

  while (i < s.length) {
    if (isSpace()) {
      getSpaces();
    } else if (isNum()) {
      const num = getNums();
      stack.push(num);
    } else if (isOp()) {
      const op = getOp();
      process(op);
      ops.push(op);
    } else if (isBracket()) {
      const bracket = getBracket();
      if (bracket[1] === '(') ops.push(bracket);
      else {
        process(bracket);
        ops.pop();
      }
    } else if (isUnit()) {
      const unit = getUnit();
      if (!stack.length || stack[stack.length - 1][0] !== TYPES.NUM) break;
      const num = stack[stack.length - 1][1];
      stack[stack.length - 1][1] = multNum(num, unit[1]);
    } else break;
    // console.log([...stack], [...ops]);
  }
  processEnd();
  return stack.length ? simplify(stack[0][1]) : ['', ''];
};
