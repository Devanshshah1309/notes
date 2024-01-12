---
sidebar_position: 3
---

# Proof of Correctness

In this module, our goal is to design and analyse algorithms. One of the main requirements is that the algorithm must be _correct_ (an inefficient correct algorithm is better than an efficient incorrect algorithm).

But how do we formally prove that an algorithm is correct? We show 2 different ways to prove correctness: one for iterative algorithms and another for recrusive algorithms.

## Correctness of Iterative Algorithms

:::tip definition
**Loop Invariant**: A loop invariant is any statement that is true at the beginning of a loop, and remains true at the beginning of the next iteration.
:::

Let’s explain this using a familiar algorithm: insertion sort, whose code is shown below.

```python
INSERTION_SORT(A[1...n])
	for j = 2 to n
        key = A[j]
        // insert A[j] into sorted sequence a[1...j-1]
        i = j - 1
        while i > 0 and A[i] > key:
            A[i + 1] = A[i]
            i -= 1
        A[i + 1] = key
```

Let’s find the invariants of the while loop. Denote by A’ the array immediately before the while loop is run. Then, the following are true (based on how insertion sort works)

- `A[1...i] = A’[1...i]`
- `A[i+2...j] = A'[i+1...j-1]`
- All elements of `A[i+2...j]` > `key`

The invariant of the for-loop is: “`A[1...i]` is the sorted list of elements originally in `A[1...i]`" → describes that in each iteration, the relatively sorted prefix array grows by 1 element as we insert the next element into its correct position relative to the sorted prefix.

:::info
We can show the correctness of an algorithm using a loop invariant as such:

1. Initialization: The invariant is true before the first iteration of the loop.
2. Maintenance: If the invariant is true before an iteration, it remains true before the next iteration.
3. Termination: When the algorithm terminates, the invariant provides a useful property for proving correctness.

:::

We can show that the above invariant of insertion sort is true initially, it is maintained throughout all iterations, and is true even when it terminates. Using this property, it is easy to show correctness of insertion sort (i.e., the final output is indeed a sorted array).

## Correctness of Recursive Algorithms

Let’s explain how to prove correctness of recursive algorithms using a classic example of binary search. Consider the following code:

```python
BINARY_SEARCH(A, a, b, x)
	if a > b
		return false
	mid = a + (b - a)/2
	if A[mid] == x
		return true
	if A[mid] > x
		return BINARY_SEARCH(A, a, mid - 1, x)
	else
		return BINARY_SEARCH(A, mid + 1, b, x)
```

We usually use mathematical induction on the size of the problem!

Here let, $P(n)$: `BINARY_SEARCH(A, b, x)`returns the correctness answer when $b -a + 1 =n$

We prove the base case, inductive case, and then conclude the correctness of our algorithm. We often need to use the pre-conditions (here, the array is sorted) to prove the inductive step. We use the inductive hypothesis to reason that the recursive calls work properly (wishful thinking!) → this means we need to use strong induction whenever our sub-problem size is not $n -1$.

In summary,

:::danger note
Steps to prove correctness of a recursive algorithm:

1. Define a statement $P(n)$ over the input size $n$.
2. (Base step) Prove that $P$ is true for the base cases
3. (Inductive step) Show algorithm works correctly assuming algorithm works correctly for all smaller cases (strong induction)

:::
