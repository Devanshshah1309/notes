---
sidebar_position: 5
---

# Generalising First-Step Analysis

In the previous week, we were able to answer specific strategy-related questions about a specific instance of the gambler’s ruin problem. But we don’t want to perform the analysis each time we’re given a different example (i.e,. different parameters, or initial conditions): so, can we come up with a more general solution?

Recall that for all the 3 questions, we have a quantity of interest, usually related to the stopping time $T$ and initial state $X_0=i$.

We can express all the 3 equations (and more) to be of the form:

$$
a_i = E[\sum_{n=0}^T g(X_n)|X_0=i]
$$

where $a_i$ is our quantity of interest, and $g$ is a function from $S \to R$

:::tip note
Note that the probability $P(X_T=j|X_0=i)$ where $j$ is any absorbing state is also a special kind of expectation where we can define $g$ to be the indicator function $I_j$ which is “on” (1) when $X_T$ takes the value $j$ and “off” (0) otherwise, i.e,.

$$
P(X_T=j|X_0=i) = E[I_j(X_T=j)|X_0=i]
$$

We can also write it as the following (because we know that $T$ is the stopping time and the indicator value will always be $0$ for all values of $n < T$ since otherwise, it would contradict the definition of $T$

$$
P(X_T=j|X_0=i) = E[\sum_{n=0}^T I_j(X_n=j)|X_0=i]
$$

The above expectation is taken over all possible values of $T$ (remember that $T$ itself is a random variable)

:::

The above equations can be thought of as a sort of random sum (since the number of terms to be summed is itself a random variable, and each of the term is also a random variable).

So, if we’re intersted in the quantity $a_i = E[\sum_{n=0}^T g(X_n)|X_0=i]$, we can use the following steps:

1. Define $|S|$ terms $a_i = E[\sum_{n=0}^T g(X_n)|X_0=i]$ for each $i \in S$ (not just the particular $a_i$ that we care about, but ALL of them → since we need ALL of the rest of the values to find any particular value - using a system of linear equations)
2. Then, apply the law of total expectation to $a_i$, conditional on $X_1$:

   $$
   a_i= \sum_{k \in S}\left (\left( g(i) + E[\sum_{n=1}^T g(X_n)|X_0=i, X_1=k] \right)P(X_1=k|X_0=i) \right)
   $$

   That is, we look at all possible steps we can take in the first move and calculate accordingly → one-step transition (we consider the transition from $i \to k$ (for every possible value of $k$) when trying to calculate $a_i$). Notice that when we reach state $k$, the time $t=1$ so the sum is from $\sum_{n=1}^T$.

   And we need to perform this step (equation) to find $a_i$ for _every_ value of $i$

3. We already know the value of $P(X_1=k|X_0=i) = p_{ik}$ from the one-step transition matrix.
4. Consider the process $\{Y_n\}$ defined to be $Y_n=X_{n+1}$. It is stochastically equivalent (same probabilistic structure, only differing in the time at which they start) with $\{X_n\}$. Further by Markovian property,

   $$
   E\left[\sum_{n=0}^T g(X_n)|X_0=i,X_1=k\right] = E\left[\sum_{n=0}^{T_Y}g(Y_n)|Y_0=k \right] = a_k
   $$

5. Combining our results from step (3) and (4) and inserting it into the equation in step (2), we get:

   $$
   a_i = \sum_{k \in S}(g(i) + a_k)p_{ik}
   $$

   Note that the above is true only when $a_i$ is not an absorbing state. When $a_i$ itself is an absorbing state, then we can simply write it as (since the stopping time $T=0$):

   $$
   a_i = g(i)
   $$

6. We can set up a system of linear equations about $a_i$ for all values of $i \in S$, solve them and obtain the result.

The above is the general procedure to follow when trying to answer any strategy related questions.

The only hard part is to define the function $g$ correctly in order to answer the question.

For example:

- To find $P(X_T=0|X_0=3)$, we can use the $I_0$ indicator function that takes on the value $1$ when the argument is $0$, and $0$ otherwise). In other words,
  $$
  P(X_T=0|X_0=3) = E[\sum_{n=0}^T I\{X_n=0\}|X_0=3]
  $$
  So, $g(x) = 1$ when $x=0$, and $0$ otherwise.
- To find $E[T|X_0=3]$, we can set $g(x)= 1$ for all values of $x=0,1,2,3,4$. Why? Because each transition is of unit “cost” (in time).
  Notice that this will give us $T+1$ (since we’re summing $T+1$ terms from $0$ to $T$), so we need to remember to subtract $1$ (that’s because we’re counting the initial state as also being a “cost” in terms of time, but actually it starts at time = 0)

Let’s try to use this procedure to answer a slightly more complicated question:

**Q. What is the expected number of times that the gambler reaches state $2$ in his entire gambling journey if he starts with $X_0=3$?**

We can write this as $E[\sum_{i=0}^T I\{X_i=2\}|X_0=3]$

For this question, $g(x) = 1$ when $x=2$, and $0$ otherwise, i..e, $g(X_n) = I\{X_n=2\}$.

Then, we set up $w_i = \sum_{i=0}^4 (g(i)+a_k)p_{ik}$ for all values of $i$.

We get the following linear system:

$$
\begin{equation*}
\begin{split}
w_0 &= 0 \\
w_1 &= \frac{1}{3}w_2 + \frac{2}{3}w_0 \\
w_2 &= 1 + \frac{1}{3}w_3 + \frac{2}{3}w_1 \\
w_3 &= \frac{1}{3}w_4 + \frac{2}{3}w_2 \\
w_4 &= 0
\end{split}
\end{equation*}
$$

We can easily solve the above system.

:::info
Notice that for the absorbing states, i.e., $0$ or $4$, the gambler stops the game at $i=0$. So, the number of times he passes through 2 if he starts at 0 or 4 is 0. These are the boundary cases (base cases).

:::

Generally, we don’t consider the number of times of passing 0 or 4 because it equals to the probability that it is trapped in 0 or 4. This degenerates to the first question (about the probability of reaching a particular absorption state) → the only possible time that the gambler reaches 0 is if he goes broke and the only possible time that the gambler reaches 4 is if he wins the entire game and quits. The reason is that these are absorbing states and once the gambler reaches either of these states, he cannot escape, and the game is over (we don’t count the same state infinite times even though he’s stuck there forever because we just “end” the game there). That is, he visits 0 exactly once if he goes broke, and 4 exactly once if he wins the game. So, the expectation of visiting 0 (or 4) is equal to the probability of going broke (or winning the game).
