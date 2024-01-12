---
sidebar_position: 1
---

# Asymptotic Analysis

## Introduction

:::danger definition
**Algorithm**: A _finite sequence_ of _“well-defined” instructions_ to solve a given computational problem.
:::

Algorithm design is an art that demands a lot of creativity, intuition, and perseverance.

There is generally a trade-off between simplicity and efficiency of algorithms (i.e., efficient algorithms are generally more complex)

We don’t want to analyze running time of an algorithm using a wall clock because that depends on the machine, programming language, etc. Instead, we use mathematical analysis.

## Word-RAM Model

Word is the basic storage unit of RAM. Word is a collection of few bytes. Each input item (number, name) is stored in binary format.

RAM can be viewed as a huge 1D array of words.

Any arbitrary location of RAM can be accessed in the same time irrespective of the location (hence the name “Random Access”) → approximately same latency regardless of the position in the array.

Data as well as Program reside fully in RAM (otherwise you’d have to load each instruction from the disk which is super inefficient - think of CS2106).

Each arithmetic or logical operation (+, -, \*, /, AND, OR, NOT) involving a constant number of words takes a constant number of CPU cycles. (However, note that exponentiation takes logarithmic time if done right)

So, an instruction is executed by fetching it first from RAM, decoding it, fetching operands, performing arithmetic or logical operations, and then storing the results back into RAM. Each instruction takes a few clock cycles to be executed (about a few nanoseconds)

In this model, we count the number of instructions taken in Word-RAM model as a mesaure of the time taken for a program to run (so we abstract away running time). There is an assumption here that all operations (+, \*, etc.) take the same time - although multiplication is obviously much harder (and hence, takes longer) then addition.

The reason we analyze the algorithm running time mathematically is that it is independent of the machine, hardware, etc. We are only concerned with the analysis of _algorithms_, not the running time on actual machines.

## Running Time

Running time depends on the size of input. So, we parameterize the running time by the size of the input. Generally, we seek upper bounds on the running time, because well, everybody likes a guarantee (we want to know for sure that _no matter what input_, our algorithm cannot do worse than a specific amount of time)

There are 3 kinds of analysis **depending on how the inputs are fed to the algorithm:**

:::info important

1. **Worst case: $T(n)$ = maximum number of instructions of an algorithm on any input of size $n$ (we assume that an adversary will try to find the worst possible input for our program such that it takes the longest time)**
2. **Average case: $T(n)$ = expected number of instructions of an algorithm over all inputs of size $n$. We need some assumption of statistical distribution of inputs to calculate this properly.**
3. **Best case: $T(n)$ = minimum number of instructions of an algorithm on an input of size $n$ (we can just cheat with some naive slow algorithm that works fast on some input)**
   :::

Example: worst case of bubble sort (reverse array) is $\approx n^2$ instructions, while best case of bubble sort is $\approx n$ instructions (already sorted array).

Example: Best case, worst case, average case of merge sort is $\approx nlogn$ instructions.

:::note note
Note that there is no indeterminism in the algorithm itself for average-case analysis, the uncertainty lies in the input, NOT the algorithm. This is different from expected time complexity for randomised algorithms where the expectation is over the statistical distribution of randomness internal to the algorithm/program.
:::

### Comparing Efficiency

When given two algorithms with their running times, we only compare for asymptotically large values of input size because time complexity really matters only for large-sized input (for small inputs, even a very inefficient algorithm will terminate in reasonable time).

Different machines/languages, etc. have different running time. So, we don’t measure _actual run-time_.

We estimate the rate of growth of runtime by asymptotic analysis.

## Asymptotic Notations

:::note
Note that $O(f(n)), \Omega(f(n))$, etc. are sets of functions, i.e., they represent a family of functions that are asymptotically upper bounded (or lower bounded) by $f(n)$.
:::

:::danger definition
**Big-O notation (Upper Bound)**: We write $f(n) = O(g(n))$ if there exists constants $c > 0, n_0 > 0$ such that $0 \leq f(n) \leq cg(n)$ for all $n \geq n_0$
:::

In set notation, $O(g(n)) = \{f(n) : \exists c > 0, n_0 > 0  \ s.t. \ \forall n \geq n_0, 0 \leq f(n) \leq cg(n)) \}$

(So, actually $f(n) = O(g(n))$ is abuse of notation! We should be writing $f(n) \in O(g(n))$ since $O(g(n))$ is a set of functions of which $f(n)$ is a member)

:::tip definition
**Big-$\Omega$ notation (Lower Bound)**: We write $f(n) = \Omega(g(n))$ if there exists constants $c > 0, n_0 > 0$ such that $0 \leq cg(n) \leq f(n)$ for all $n \geq n_0$
:::

:::info definition
**Big-$\Theta$ (Tight Bound)**: $\Theta(g(n)) = \{ f(n) : \exists c_1, c_2, n_0 > 0 \ s.t. \ \forall n \geq n_0, 0 \leq c_1g(n) \leq f(n) \leq c_2 g(n) \}$
:::

Note: $\Theta(g(n)) = O(g(n)) \cap \Omega(g(n))$ (proof under Appendix)

There are 2 other notations - little-o and little-$\omega$ (omega) - which are even stricter definitions of their counterparts:

>

1. **Little-o**: $o(g(n)) = \{ f(n) : \forall c > 0, \exists n_0 > 0 \ s.t. \ \forall n \geq n_0, 0 \leq f(n) < cg(n) \}$ (i.e., $g$ is strictly faster-growing than $f$)
2. **Little-$\omega$**: $\omega(g(n)) = \{ f(n) : \forall c > 0, \exists n_0 > 0  \ s.t. \ \forall n \geq n_0,  0 \leq cg(n) < f(n) \}$ (i.e., $g$ is stricly slower-growing than $f$)

There are some important points to note about these little-o and little-omega definitions:

1. You need to find an $n_0$ **for every positive constant c**. In other words, you need some sort of relation between $n_0$ and $c$ so that given a $c$, you can find $n_0$. It is a universal statement in terms of $c$. So, one example of $c$ and $n_0$ cannot be used to prove that a function is $o(g(n))$ or $\omega(g(n))$. However, if you can find one value of $c$ for which there is no $n_0$ that satisfies the above conditions, then we can say that it is _not_ $o(g(n))$ or $\omega(g(n))$.
2. Notice the strict inequality between $cg(n)$ and $f(n)$ as opposed to the non-strict inequality for Big-O and Big-$\Omega$.
3. It should be obvious that:
   1. $f(n) \in o(g(n)) \implies f(n) \in O(g(n))$ (if you can find an $n_0$ for every positive value of $c$, you can pick any combination to satisfy the Big-O definition)
   2. $f(n) \in \omega(g(n)) \implies f(n) \in \Omega(g(n))$ (same as above)
4. If $f(n) \in o(g(n))$ or $f(n) \in \omega(g(n))$, then $f(n) \notin \Theta(g(n))$ (since $g(n)$ either grows faster or slower than $f(n)$, it doesn’t grow at the same rate as $f(n)$, which is a requirement for $f(n)$ to be tightly bounded by $g(n)$.

### Limits

Assume $f(n), g(n) > 0$. Then, the following results are true:

1. $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0 \implies f(n) \in o(g(n))$
2. $\lim_{n \to \infty} \frac{f(n)}{g(n)} < \infty \implies f(n) \in O(g(n))$
3. $0 < \lim_{n \to \infty} \frac{f(n)}{g(n)} < \infty \implies f(n) \in \Theta(g(n))$
4. $\lim_{n \to \infty} \frac{f(n)}{g(n)} > 0 \implies f(n) \in \Omega(g(n))$
5. $\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty \implies f(n) \in \omega(g(n))$

We prove the first one using the epsilon-delta definition of limits:

1. Since $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$, by definition, we have:
   - For all $\epsilon > 0,$ there exists $\delta > 0$ such that $\frac{f(n)}{g(n)} < \epsilon$ for $n > \delta$ (as you increase $n$ beyond $\delta$, the ratio goes below $\epsilon$)
2. Setting $c = \epsilon$ and $n_0 = \delta$, we have:
   - For all $c> 0,$ there exists $n_0 > 0$ such that $\frac{f(n)}{g(n)} < c$ for $n > n_0$
   - Hence, for all $c > 0$, there exists $n_0 > 0$ such that $f(n) < cg(n)$ for $n > n_0$.
   - So, by definition, $f(n) \in o(g(n))$

### Other Important Results

### Other Important Properties

**Transitivity**

Should be obvious intuitively (e.g. If $g$ upper bounds $f$, and $h$ upper bounds $g$, then obviously $h$ upper bounds $f$). All of the following are true because $<, >, \leq, \geq$ are transitive.

1. $f(n) = \Theta(g(n)) \land g(n) = \Theta(h(n)) \implies f(n) = \Theta(h(n))$
2. $f(n) = O(g(n)) \land g(n) = O(h(n)) \implies f(n) = O(h(n))$
3. $f(n) = \Omega(g(n)) \land g(n) = \Omega(h(n)) \implies f(n) = \Omega(h(n))$
4. $f(n) = o(g(n)) \land g(n) = o(h(n)) \implies f(n) = o(h(n))$
5. $f(n) = \omega(g(n)) \land g(n) = \omega(h(n)) \implies f(n) = \omega(h(n))$

**Reflexivity**

1. $f(n) = \Theta(f(n))$
2. $f(n) = O(f(n))$
3. $f(n) = \Omega(f(n))$

In particular, note that $f(n) \neq o(f(n))$ and $f(n) \neq \omega(f(n))$ because $f$ cannot grow faster or slower than $f$. (So, if $f(n) = \Theta(g(n))$, then $f$ cannot be $o(g(n))$ or $\omega(g(n))$ → here, $g(n)$ = $f(n)$ itself)

**Symmetry**

1. $f(n) = \Theta(g(n)) \iff g(n) = \Theta(f(n))$ (if $f$ grows at the same rate as $g$, then $g$ grows at the same rate as $f$ → since equality is symmetrical)

**Complementarity**

1. $f(n) = O(g(n)) \iff g(n) = \Omega(f(n))$ (saying that $f$ is upper bounded by $g$ is the same as saying that $g$ is lower bounded by $f$)
2. $f(n) = o(g(n)) \iff g(n) = \omega(f(n))$ (if $f$ grows faster than $g$, then $g$ grows slower than $f$)

## Appendix

### Useful Mathematical Facts

**Properties of logarithms and exponents:**

1. $a^x = m \iff x = log_a (m)$ → definition of logarithm
2. $log_a (mn) = log_a (m) + log_a (n)$ → product property
3. $log_a(m/n) = log_a(m) - log_a(n)$ → quotient property
4. $log(m^n) = nlog(m)$ → power property
5. $log_a(b) = 1/log_b(a)$
6. $log_b a = log_c(a) \times log_b(c) = log_c(a)/log_c(b)$ → change of base property
7. $a^{log_a(x)} = a$ → number raised to log
8. $log_a(a) = 1$
9. $log_a(1) = 0$
10. $log_a(1/b) = -log_a(b)$
11. $a^{log_b(x)} =x^{log_b(a)}$ (when $x, a  > 0$) → can take $log$ on both sides to verify its true
12. $a^ma^n = a^{m + n}$
13. $a^m/a^n = a^{m -n}$
14. $1/a^m = a^{-m}$
15. $(a^m)^n = a^{mn}$
16. $(ab)^m = a^mb^m$

**Common Series and their Sums:**

$$
1 + 2 + 3  + ...  + n = \dfrac{n(n+1)}{2} = O(n^2)
$$

The above arithmetic progression can appear in various different forms. The more general form is:

$$a + (a + d) + (a + 2d) + \dots + a + (n-1)d = \dfrac{n}{2}(2a + (n-1)\times d) = \dfrac{n}{2}(a + l)$$

, where $l$ is the last term of the series and $n$ is the number of terms.

$$
1^2 + 2^2 + 3^2 + ...  + n^2 = \dfrac{n(n+1)(2n+1)}{6} = O(n^3)
$$

$$
1^3 + 2^3 + \dots + n^3 = \left(\dfrac{n(n+1)}{2} \right)^2 = O(n^4)
$$

$$
1 + r + r^2 + r^3 + .... = \dfrac{1}{1-r} \quad for\  |r| < 1
$$

More generally, the solution to the geometric progression $a + ar + ar^2 + \dots + ar^{n-1} = \dfrac{a(r^n - 1)}{r-1}$

$$
\dfrac{1}{1} + \dfrac{1}{2} + \dfrac{1}{3} + \dots + \dfrac{1}{n} = O(logn)
$$

The above series (called the harmonic series) is divergent but the sum of $n$ terms is upper bounded by $O(logn)$. This is because:

$$
\sum_{n = 1}^{k} \dfrac{1}{n} > \int_1^{k+1} \dfrac{1}{x}dx = ln(k+1)
$$

It is easy to view the bound in terms of the graphs.

$$
1 + 2 + 4 + 8 + 16 + \dots + 2^m = 2^{m + 1} - 1 = O(2^m)
$$

$$
1 + 2 + 4 + 8 + 16 + \dots + m = 2m - 1 = O(m)
$$

The following result is also very useful (e.g. for deriving the time complexity of `heapify`)

$$
\sum_{i = 1}^{\infty} \dfrac{i}{2^i} = \dfrac{1}{2} + \dfrac{2}{4} + \dfrac{3}{8} + \dots = 2
$$

### Proof of $\Theta(g(n)) = O(g(n)) \cap \Omega(g(n))$

Since all the above terms are sets (families of functions), we have to show that any arbitrary element of LHS is also in RHS, and vice versa. (Recall that proving that 2 sets are equal is the same as showing that each set is a subset of the other)

1. So, let $f(n) \in \Theta(g(n))$ be an arbitrary element of $\Theta(g(n))$.
2. Then, by definition, $0 \leq c_1 g(n) \leq f(n) \leq c_2 g(n)$ for some constants $c_1, c_2 > 0$ and for all $n > n_0$ for some $n_0$.
3. The above inequality can be rewritten as:
   $0 \leq c_1g(n) \leq f(n)$ for all $n > n_0$ **and $0 \leq f(n) \leq c_2 g(n)$** for all $n > n_0$
4. By definition of Big-Omega and Big-O notation, we can write (3) it as: $f(n) \in \Omega(g(n)) \cap f(n) \in O(g(n))$.
5. So, we have proved one direction of the equality.
6. Now, we show that if $f(n)$ (an arbitrary but particular function) is $O(g(n))$ and $\Omega(g(n))$, then $f(n) \in \Theta(g(n))$.
7. Since $f(n) \in O(g(n))$, by definition: there exists some constants $c_1, n_1$ such that $\forall n > n_1, 0 \leq f(n) \leq c_1 g(n)$
8. Similarly, since $f(n) \in O(g(n))$, by definition: there exists some constants $c_2, n_2$ such that $\forall n > n_2, 0 \leq c_2 g(n) \leq f(n)$
9. We pick $n_0 = max(n_1, n_2)$ (to ensure the above inequalities hold simultaneously, we have to pick the intersection of $n > n_1$ and $n > n_2$, which is given by $n > max(n_1, n_2)$).
10. Then, combining the above inequalities, we get: $\forall n > n_0, \ 0 \leq c_2g(n) \leq f(n) \leq c_1 g(n)$, which means that $f(n) \in \Theta(g(n))$ by defintion of Big-Theta.
11. Hence, $\Theta(g(n)) = O(g(n)) \cap \Omega(g(n))$
