// 1. car and cat
let regex1 = /ca[rt]/;
console.log(regex1.test("car")); // → true
console.log(regex1.test("cat")); // → true
console.log(regex1.test("dog")); // → false

// 2. pop and prop
let regex2 = /pr?op/;
console.log(regex2.test("pop")); // → true
console.log(regex2.test("prop")); // → true
console.log(regex2.test("drop")); // → false

// 3. ferret, ferry, and ferrari
let regex3 = /ferr(et|y|ari)/;
console.log(regex3.test("ferret")); // → true
console.log(regex3.test("ferry")); // → true
console.log(regex3.test("ferrari")); // → true
console.log(regex3.test("ferrum")); // → false

// 4. Any word ending in ious
let regex4 = /\w+ious\b/;
console.log(regex4.test("delicious")); // → true
console.log(regex4.test("precious")); // → true
console.log(regex4.test("hello")); // → false

// 5. A whitespace character followed by a period, comma, colon, or semicolon
let regex5 = /\s[.,:;]/;
console.log(regex5.test("hello .")); // → true
console.log(regex5.test("hello,")); // → false
console.log(regex5.test("hello ,")); // → true

// 6. A word longer than six letters
let regex6 = /\b\w{7,}\b/;
console.log(regex6.test("elephant")); // → true
console.log(regex6.test("mouse")); // → false

// 7. A word without the letter e or E
let regex7 = /\b[^\We]+\b/i;
// Alternative: /\b[a-df-z]+\b/i
console.log(regex7.test("dog")); // → true
console.log(regex7.test("elephant")); // → false
console.log(regex7.test("DOG")); // → true
