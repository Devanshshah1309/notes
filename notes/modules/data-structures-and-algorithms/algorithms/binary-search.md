---
sidebar_position: 2
---

# Binary Search

**Pre-condition**: The array you are searching should be sorted (or more generally, the function should be monotonic)

**Aim:** Given a sorted array, find an element in the array (and return its index). Return -1 if the element is not in the array.

**Invariant:** If you are searching for key in an array (and key actually exists in the array),then `A[begin] <= key <= A[end]`is true at every step of the procedure.

**Code for Binary Search on an Array**

```Java
public int BSearch(A, key, n) {
	begin = 0;
	end = n - 1;
	while begin < end {
		mid = begin + (end - begin)/2 // to avoid overflow error, we don't use (begin+end)/2
		if key <= A[mid] {
			end = mid;
		} else {
			begin = mid + 1;
		}
	return (A[begin] == key) ? begin : - 1
```

**Running time**: $O(logn)$

At each stage, the array size to be searched splits in half. So, the running time reccurence relation is $T(n)= T(\dfrac{n}{2}) +O(1)$. The solution to this recurrence relation can easily be determined to be $O(logn)$.

Binary search is often a part of much larger solution to a complicated problem

### Applications of Binary Search

**Q. Random number guesser** - Given that a random number has been chosen between 1 and 1024, guess the number correctly in less than 12 tries. Everytime you make a guess, you will know whether your guess was too high or too low.

Ans: Just apply Binary Search with `begin = 1` and `end = 1024`

**Q. Smallest Indistinguishable Integer** - Given that there exists a limit beyond which integers cannot be represented effectively in a computer system, your task is to find the smallest number that is indistinguishable from its successor. An integer $i$ is said to be indistinguishable if $i == i + 1$ returns true.

Ans: Consider the function `boolean isDistinguishable(int i)`.Observe that the function here is monotonic. In other words, once the function crosses a certain threshold (that we need to find), it will always return indistinguishable, whereas it will always return distinguishable for values before the threshold. So, first try to the largest power of 2 (by multiplying by 2 at each iteration) that can be represented effectively, i.e, find $j$ such that $2^j$ is distinguishable but $2^{j+1}$ is not. Then apply Binary Search to find the exact integer between $[2^j, 2^{j+1}]$.
