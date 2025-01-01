var sum_to_n_a = function(n) {
  // your code here
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i
  }
  return sum;
};

var sum_to_n_b = function(n) {
  // your code here
  return Array.from({length: n + 1}, (_, i) => i).reduce((sum, num) => sum + num, 0);  
};

var sum_to_n_c = function(n) {
  // your code here
  return (n * (n + 1)) / 2;
};