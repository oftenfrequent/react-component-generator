const ask = question => {
  const format = /^(?:y|n)/
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  return new Promise((res, rej) => {
    stdin.once('data', data => {
      data = data.toString().trim();

      if (format.test(data)) {
        res(data);
      } else {
        stdout.write("It should match: "+ format +"\n");
        // TODO: not sure about here
        res(ask(question, format));
      }
    });
  });
}

export default ask;