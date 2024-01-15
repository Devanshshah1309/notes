---
sidebar_position: 1
---

# Time Complexity

Time complexity of a program shows the order of growth of the running time as the input gets larger and larger.

It tells nothing about the absolute/actual running time of the algorithm. So, it is not always a good idea to compare two algorithms simply based on their time complexities. For example, `MergeSort` runs in $O(nlogn)$ whereas `InsertionSort` runs in $O(n^2)$. But in practice, for smaller size arrays, `InsertionSort` often runs faster than `MergeSort`!!

Since constants are omitted while dealing with time complexity of algorithms, two programs may have the same complexity but very different running times. For example, consider program A with $T(n) = 10^8n = O(n)$ and program B with $T(n) = n = O(n)$. Obviously program B will run faster than program A, but this is not evident if you only look at their orders of growth.

:::tip
You can read some of the basic math results (exponents, logarithms, arithmetic and geometric series, etc.) that will be quite useful [here](../design-and-analysis-of-algorithms/asymptotic-analysis.md#useful-mathematical-facts).
:::

## Amortized Analysis

It is a common technique for analyzing “average” cost per operation. We use this when most operations are cheap but once in a while, we need to pay a lot. This is similar to how you pay rent: you don’t pay rent every second or every day (although you could technically). So, you can think of it like you’re living for free on 29 days of the month and on 1 day you need to pay a large amount. But of course this does not give the true picture - so you find the cost you’re paying per day.

Similarly, we use amortized analysis for data structures.

**An operation is said to have amortized cost $T(n)$ if, for every integer $k$, the cost of $k$ operations is $\leq kT(n)$**

When we say $k$ operations, we mean $k$ continuous operations, starting from the first operation. You cannot pick any random $k$ operations from the middle and say that the amortized cost is so high.

In other words, for every prefix sequence, the total cost of that sequence of operations cannot exceed $T(n)$ times the length of that prefix sequence.

Amortized ≠ Average! Amortized is a much stronger constraint than average since it needs to hold for **every** value of $k$. In case of average, the total cost of **all** operations should not exceed $T(n)$ times the total number of operations.

Example (hash table): Inserting $k$ elements into a hash table takes time $O(k)$. Therefore, the insert operation has amortized cost $O(1)$.

### Accounting Method

Imagine a bank account $B$. Each operation performed adds money to the bank acconut. Every step of the algorithm spends money:

- Immediate money: to perform that particular operation
- Deferred operation: from the bank account

Total cost of execution = total money (Average time per operation = total money divided by number of operations)

For each operation, you are given $T(n)$ time. For most operations you need less than that. So, you’re saving the time when performing cheap operations and using that saved time to perform expensive operations (that take $\geq T(n)$ ) once in a while.

## Clarification

There is a very important distinction between worst-case analysis, big-O notation, average-case analysis, expected time analysis, big-theta notation, etc.

Worst case analysis deals with the worst possible kind of input to a program. We carefully handpick the worst possible input by analysing how the algorithm works. When we say that insertion sort takes $\Theta(n^2)$ in the worst case, we mean that the algorithm running time grows quadratically as the array size increases and the worst possible input (e.g. reversed array) is fed to the program. It is not necessary to use $O$ while talking about worst-case analysis.

$O(f(n))$ simply represents a family of functions that grow slower than $cf(n)$ for some positive constant $c$, i.e., $T(n) \in O(f(n)) \implies \exists n_0, c \quad \forall n>n_0 \quad cf(n) > T(n)$. We often abuse notation and for convenience, simply write that $T(n) = O(f(n))$ to mean that the running time $T(n)$ is upper bounded by $f(n)$. BUT this does not give us any information regarding what type of running time we are dealing with or what scenario we are analysing.

Average-case analysis deals with how the program performs when a **random input** is fed to the algorithm. It is important to note that here, while the input is random, the program may still be deterministic.

An indeterministic program is one which makes **random choices** while the algorithm is running. When talking about indeterministic programs, the running time is a random variable (it depends on the random choice made by the algorithm). In fact, even for the same input, the running time may vary. For example, in case of `QuickSort` the running time depends heavily on the choice of a pivot. So, it is more practical to talk about the expected running time of a randomised algorithm.

In short, big-O and big-theta notations only give us bounds of a function. They do not tell us anything about the scenario for which the function is being considered.

In 2040S, we normally consider the worst-case scenario unless otherwise specified.
