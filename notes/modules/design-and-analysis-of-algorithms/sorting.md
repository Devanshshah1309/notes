---
sidebar_position: 5
---

# Sorting Algorithms

## Introduction

You're probably familiar with the common sorting algorithms like `BubbleSort`, `InsertionSort`, `SelectionSort`, `MergeSort`, `QuickSort`, etc. For a more detailed explanation of these algorithms, you can refer to the CS2040S notes.

Here, we are more concerned with the analysis of these algorithms.

The algorithms we know so far can be classified in terms of:

- Running Time? $O(n^2)$ for `MergeSort`, `HeapSort`, `QuickSort` (in expectation, with random pivot) vs $O(n \log n)$ for `BubbleSort`, `InsertionSort`, `SelectionSort`.
- In-place? A sorting algorithm is in-place if it uses very little additional memory beyond that is used for the data, usually $O(1)$ or $O(\log n)$. Examples: Insertion sort and Bubble sort use $O(1)$ space. Quick Sort uses $O(logn)$ additional memory (on the stack) with proper implementations.
- Stable? A sorting algorithm is stable if the original order of equal elements is preserved in the sorted output. Examples: Insertion sort, merge sort, bubble sort are stable, whereas quicksort, selection sort are unstable.
- Comparison-based? Comparison-based algorithm is an algorithm that only compares elements. A sorting algorithm that sorts the elements by using comparisons to determine the relative order of elements is a called a comparison sort. All the algorithm mentioned above are examples of comparison-based sorting algorithms.

:::info
Whenever we mention "running time" without any other specifications, we are referring to the **worst-case** running time.
:::

We want to answer 2 questions:

1. **What is the best time complexity for a comparison sort?**
2. **Is there any sorting algorithm which is better than a comparison sort?**

## Lower Bound for Comparison Based Sorting

The best worst-case running time that we’ve seen for comparison sorting is $O(n \log n)$. But, is $O(n \log n)$ the best we can do? This is a difficult question because we need to prove that it is impossible to come up with any clever observation/technique that can sort using comparisons faster than $O(n \log n)$.

We will use decision trees to help us prove that the lower bound on comparison based sorting is indeed $O(n \log n)$!

**A decision tree is a tree-like model where:**

- **Every node is a comparison**
- **Every branch represents the outcome of the comparison**
- **Every leaf represents a class label (decision after all comparisons)**

Consider the case where you want to sort a 3-element array. We denote a node $i:j$ to mean that we are comparing the values at the $i^{th}$ and $j^{th}$ indices. The left subtree shows subsequent comparisons if $a_i < a_j$ and the right subtree shows subsequent comparisons if $a_i \geq a_j$.

We can then use a decision tree to model the execution of any comparison sort (as the algorithm would somehow compare all the necessary elements - which can be visualized as tracing a path from the root node of the decision tree to a leaf, where the final outcome lies). In our case, the leaf nodes contains the indices in the sorted ordering (e.g. $[2, 1, 3]$ means the sorted order is $A[2] \leq A[1] \leq A[3]$). **More formally, each leaf contains a permutation $<\pi(1), \pi(2), \dots, \pi(n)>$ to indicate that the ordering $a_{\pi(1)} \leq a_{\pi(2)} \leq \dots \leq a_{\pi(n)}$ has been established.**

We need one tree for each input size $n$ and we can view the algorithm as splitting into a branch whenever it compares 2 elements. The tree contains the comparisons along all possible instruction traces.

Then, obviously the running time of the algorithm for a particular run (input) = length of the path taken (note that some permutations take much fewer comparisons than others)

So, the worst case running time = length of the longest path = height of the tree.

**Theorem: Any decision tree that can sort $n$ elements must have height $\Omega(n \log n)$**

**Since an input of size $n$ has $n!$ possible permutations, the tree must contain at least $n!$ leaves** (if it is missing some leaves, it cannot sort those corresponding permutations). Each input will use a different path → $n!$ input permutations possible and each needs its unique leaf (ordering) → $n!$ leaves of the tree.

Since we are just comparing 2 elements at every step, the **branching factor must be at most $2$** (there are only 2 possibilities: $<$ or $>$. Duplicates can be handled in either case).

**We also know that a binary tree of height $h$ has $\leq 2^h$ leaves.**

So, we get: $2^h \geq n! \implies h \geq \log(n!)$

Using stirling’s formula, we know that $n! \geq \left(\dfrac{n}{e} \right)^n$

So, $h \geq log(n!) \geq log((n/e)^n) \geq n \log n - n\log e = \Omega(n \log n)$

Hence, $h = \Omega(n \log n)$

**Corollary: Heapsort and Mergesort are asymptotically optimal comparison sorting algorithms.**

:::caution
Note that this does not mean that any comparison based sorting algorithm will always perform $\Omega(n\log n)$ comparisons for all inputs! $\Omega(n\log n)$ is the lower-bound on the worst case time complexity of comparison-based sorting algorithms. Example: Bubble sort can complete in $O(n)$ if given an already sorted array, Insertion sort can complete in $O(n)$ if given a nearly sorted array.
:::

### Examples

**Q. What is the minimum number of comparisons a comparison-based sorting algorithm needs to perform if it needs to sort any input of size $6$?**

Ans: There are $6! = 720$ input permutations possible - each of which needs to have a unqiue path/leaf. So, the height must be $h = \lceil \log_2720 \rceil = 10$. Hence, the algorithm needs to perform at least 10 comparisons in the worst case to sort an array of size 6.

**Q. What is the lower bound on merging 2 sorted arrays to form a larger sorted array?**

Ans: $\Omega(n)$ (recall merging operation in merge sort). Number of permutations of inputs = $\dbinom{2n}{n}$ → choose $n$ seats from $2n$ where you can place elements of $A$, once you pick those → ordering of $A$ is fixed. Remaining $n$ seats are occupied by elements of $B$ and their ordering is also fixed. Then $\log(\frac{(2n)!}{n!n!}) = \Theta(n)$ (using sterling’s approximation again)

## Counting Sort

$\Omega(n\log n)$ is the lower bound for comparison-based sorting. What if we sort the elements without ever comparing them? Can we break the lower bound then?

Assume there are only $k$ different elements in the world. We can perform counting sort as follows:

1. Set $C[i]$ be the number of elements equal to $i$ for $i = 1, 2, \dots, k$
2. Set $C[i]$ be the number of elements smaller than or equal to $i$ for $i = 1, 2, \dots , k$ (to ensure stability!)
3. Move elements equal to $i$ to $B[C[i-1]+1\dots C[i]]$ for $i =1, 2, \dots, k$

```python
def counting_sort(A, k):
	n = len(A)
	C = [0 for _ in '.'*k]
	for i in range(n):
		C[A[i]] = C[A[i]] + 1
	for i in range(2, k):
		C[i] += C[i-1] # maintain prefix sum
	for i in range(n - 1, -1, -1) # move from end of A so you can ensure stability
		B[C[A[j]]] = A[j] # C gives the index at which A[j] needs to be inserted
		C[A[j]] -= 1 # reduce index by 1 for next element of same value
```

**We only need to perform step $2$ if we want to ensure that the sort is stable.** We can directly use step $1$ to sort the array if we don’t care about stability.

The **running time of counting sort** can be quite easily analysed to be: $\Theta(n + k)$

## Radix Sort

Radix sort is a digit by digit sorting algorithm that sorts from least significant digit to most significant digit using an auxiliary stable sort. Like counting sort, is also a non-comparison based sorting algorithm.

It is basically a generalization of counting sort. Instead of sorting the elements based on their values, we sort them based on their digits (in any base we like). We can use counting sort (or any other stable sort) as the auxiliary sort to sort the digits.

:::tip think
Q. Why can’t we sort from most significant bit to least significant bit instead?

Ans: We can, but then we would have to keep track of which groups are placed together so we can recursively perform radix sort using the next most significant bit. It’s just more convenient and easier to implement if we start sorting from LSB.
:::

:::tip think
Q. Why do we need to use a stable sorting algorithm while performing radix sort based on a digit?

Ans: The stability of the auxiliary sorting algorithm is crucial to the correctness of radix sort. We need to ensure that in every pass, we are maintaining the relative ordering of all previous bits. If we don’t use a stable algorithm, each iteration of sorting can potentially mess up the sorting done based on the lower significant bits. This would mean that in the end, we can only guarantee that the numbers are sorted by their MSBs (or whichever group of digits were used for the last iteration).
:::

When we perform radix sort, we normally use counting sort to be our stable sorting algorithm → since it is ideal given that there are a limited number of digits we are going to be counting, i.e., the number of “buckets” is small. In theory, we can also use any other stable sorting algorithm (e.g. merge sort, bubble sort) to do this, but they’re all less optimal given the constraints.

:::tip think
Q. Do we have to go digit-by-digit while sorting?

Ans: No! We can group the digits together and go block by block too. As long as we go from least significant group to most significant group, it is still a correct radix sort. In fact, we don’t even have to use base-10. We can use base-2 and interpret this in binary: given a 32 bit integer, can perform 32 passes of counting sort. We can group bits together (say we group 4 bits together → which means base-16) and sort the numbers by considering 4 bits at a time, from LSB to MSB.
Also, your block-size doesn’t even have to be the same for different iterations! You can use base-10 for the first iteration, and base-1024 for the next - this is perfectly fine! You can tweak this parameters based on the question constraints (as long as you go from LSB to MSB, you’ll get the correct answer)
:::

When we say base-$r$, we mean that there can be at most $r$ different kinds of digits for that pass. For example, if we group 3 bits at a time in binary, there can be up to 8 digits (ranging from 0 to 7), and so it is base-8. In general, grouping $r$ bits of binary, gives rise to base-$2^r$. We can also have bases that are not powers of 2 (e.g. base-7, base-10) whose digits can be retrieved by using modulo with the relevant base (and then dividing by the base to move on to the next digit → similar to how you would modulo by 10 to get one’s digit in decimal (base 10) and divide by 10 to get the remaining digits).

### Analysis of Radix Sort

Let’s analyse the running time of radix sort assuming we’re using stable counting sort as the auxiliary sort. Say we have to sort $n$ computer words of $b$ bits each. Each word can be viewed as having $b/r$ base-$2^r$ digits.

For example, if we have a 32-bit word, and we choose $r =8$, it will take us $32/8 = 4$ passes of counting sort on base-$2^8$ digits.

The question we’re interested in is trying to figure out the optimal value of $r$ to minimise the running time. Intuitively, we can observe that if $r$ is too large, then the number of iterations of counting sort will be small, but each pass will take longer time; and if $r$ is too small, it’ll take more iterations of counting sort, although each pass will be faster. So, we can find a balance?

We know that counting sort will take $O(n + k)$ iterations where $k =$ range of numbers to be sorted in this pass. In our case, if we’re considering $r$ bits at a time, $k = 2^r$. Hence, each pass of counting sort takes $O(n + 2^r)$ time.

How many passes do we need to completely sort the array? $b/r$

So, the **total running time is $T(n, b) = \Theta(\dfrac{b}{r}(n + 2^r))$.**

We have to find the value of $r$ to minimise the above function → Intuitively, as $r > logn$, the time will grow exponentially in $r$. So, we should pick a value very close to (but slightly less than) $logn$ to maximize the denominator, while at the same time, balancing the $n + 2^r$ term.

**Choosing $r = logn$, we get the running time, $T(n, b) = \Theta(bn/logn)$.**

**For numbers in the range from $0$ to $n^d-1$, we have $b = dlogn$, so radix sort runs in $\Theta(dn)$ time.**

### Correctness of Radix Sort

We prove that radix sort produces a sorted output using induction.

1. Let $P(t)$ denote that the numbers are sorted by their low-order $t$ digits.
2. Base case: To show that $P(1)$ is true
   1. Radix sort algorithm sorts the $1$st digit by using a stable sorting algorithm.
   2. Hence, $P(1)$ is true
3. Inductive case: $P(t-1) \implies P(t)$
   1. Inductive hypothesis: Assume that the numbers are sorted by their low-order $t - 1$ digits.
   2. Then, we perform sorting based on digit $t$.
   3. **If 2 numbers differ in digit $t$, they are obviously correctly sorted (by correctness of our auxiliary algorithm).**
   4. **If 2 numbers equal in digit $t$ are put in the same order as the input, their relative order is maintained after sorting by digit $t$ (by stability of our auxiliary algorithm)**
   5. Hence, in both cases, the numbers are sorted by the lower-order $t$ digits.
   6. Hence, $P(t)$ is true
4. So, by mathematical induction, $P(b)$ will also be true where $b$ is the number of bits in each word. This means that all the numbers are correctly sorted.

Radix sort is simple to code and maintain. In practice, it is fast when the number of passes is small.

However, unlike quicksort, radix sort displays little locality of reference, and thus a well-tuned quicksort fares better on modern processors, which feature steep memory hierarchies (and include caching functionality).
