---
sidebar_position: 6
---

# General Solution to Gambler’s Ruin

Until now, we had been using fixed values of initial condition and stopping constraints. But what if we want to solve another similar problem with a different constraint? We would have to solve it all over again (set up the linear system, etc.)

Instead of that, let’s solve the general version of the gambler’s ruin problem, which can be stated as such:

**Suppose the gambler starts with $0 < k < N$ dollars in hand. For each round, the gambler will win with probability $p$ and lose with probability $q=1-p$. The gambler will stop playing with $N$ dollars in hand, or when he goes broke.**

Then, we’re interested to know:

1. **What is the probability that he will go broke? (and, as a consequence, what is the probability that he has $N$ dollars at the end?)**
2. **How many rounds will he play before the game ends?**

:::tip note
The gambler’s ruin “process” is also more generally referred to as a “random walk” (where there is a probability of walking 1 step left/right at any state, and we stop walking when we reach either of the 2 points on the left/right end). A random walk can also be considered in 2-D (which becomes slightly more complicated but the idea still holds) or even $n$-D 😲
:::

### Probability of Going Broke

Let’s deal with the first question first.

We can write it as $P(X_T=0|X_0=k)$.

Then, we can define, for every $0 \leq k \leq N$, $u_k=P(X_T=0|X_0=k)$. We have already seen that it can be written as:

$$
u_k = E[\sum_{n=0}^T I\{X_T=0\}|X_0=k]
$$

According to first-step analysis, we have:

$$
u_k = I\{k=0\} + \sum_{j=0}^N \mu_jP(X_1=j|X_0=k)
$$

So, when $k=0$, this expression can be simplified to: $u_0=1$ (since the indicator function is “on” and the probability of escaping the “broke” state is $0$). Also, for $k=N$, this becomes: $u_k=0$ (indicator is “off” and the game is over)

For all other values of $k$, we have:

$$
u_k = \sum_{j=0}^N \mu_jP(X_1=j|X_0=k) = p u_{k+1} + qu_{k-1}
$$

Put in words, this is because we have probablility $p$ of going from state $k \to k+1$ and probability $q$ of going from $k \to k-1$. Remember that this is only true for non-absorbing states.

We can write out the system of equations for all values of $k$ now.

$$
\begin{equation*}
\begin{split}
u_0 &= 1 \\
u_1 &= pu_2 + qu_0 \\
u_2 &= pu_3 + qu_1 \\
& \dots \\
u_N &= 0
\end{split}
\end{equation*}
$$

How do we solve this? We can use some neat algebraic manipulation here. Remember that $p+q =1$. So, we can rewrite our expression for $u_k$ in this form:

$$
\begin{equation*}
\begin{split}
(p+q)u_k &= pu_{k+1} + qu_{k-1} \\
u_{k+1} - u_k &= \frac{q}{p}(u_k-u_{k-1})
\end{split}
\end{equation*}
$$

Notice that we can repeatedly apply this result to smaller values of $k$ as such:

$$
\begin{equation*}
\begin{split}
u_{k+1} - u_k &= \frac{q}{p}(u_k-u_{k-1}) \\
&= \left(\frac{q}{p}\right)^2(u_{k-1}-u_{k-2}) \\
& \dots \\
&= \left(\frac{q}{p}\right)^k(u_1 -u_0)
\end{split}
\end{equation*}
$$

Then, we have:

$$
\begin{equation*}
\begin{split}
u_k - u_0 &= (u_k-u_{k-1}) + (u_{k-1} - u_{k-2}) + \dots + (u_1-u_0) \\
&= \left [\left(\frac{q}{p}\right)^{k-1} + \left(\frac{q}{p}\right)^{k-2} + \dots + 1 \right ](u_1 - u_0)
\end{split}
\end{equation*}
$$

We now need to evaluate the sum of the finite series $\left(\frac{q}{p}\right)^{k-1} + \left(\frac{q}{p}\right)^{k-2} + \dots + 1$ .

To do so, we need 2 separate cases: 1) $p=q$, and 2) $p \neq q$.

**Case 1:** When $p=q$ (that is, the game is “fair”), we $q/p = 1$. So, the result is simply:

$$
u_k-u_0 = k(u_1-u_0)
$$

This needs to be true for $k=N$ as well. But we already know that $u_N=0$. Using this, we can find the value of $u_1$

$$
u_N - u_0 = -1 = N(u_1-u_0) \implies u_1 - u_0 = \frac{1}{N}
$$

Therefore for $k=1,2, \dots, N-1$ we have:

$$
u_k - u_0 = k(u_1 - u_0) = \frac{-k}{N}
$$

Using the fact that $u_0 =1$, we get:

$$
u_k = 1 - \frac{k}{N}
$$

How can we interpret this result?

1. When $k$ increases (that is, when we have more money to start with), the probability of going broke is smaller (for a fixed value of $N$)
2. When $N \to \infty$ (the gambler sets no bound on when he will stop, i.e,. he will only stop when he goes broke), the probability of going broke converges to $1$ _even if the game is fair_. This means that if we never stop, we will go broke eventually (this is why it’s called the gambler’s “ruin” - because it’s very difficult to quit when you’re winning, you are doomed to go broke and this is one of the reasons the casinos win → they have virtually unlimited cash compared to you so it’s more likely for you to go broke before the casino goes broke, _even if the game is fair_)

:::info Insight
💡 From a gambler’s perspective, it makes sense to “set” (in his mind) $N$ to be smaller than $2\times k$ so that the probability of going broke is less than $0.5$ (which means he is more likey than not to reach $N$dollars and quit, hence making a profit).
:::

**Case 2:** Okay, now we need to solve the case when the game is not fair, i.e., $p \neq q$.

Then, using the geometric series formula, we have:

$$
\left(\frac{q}{p}\right)^{k-1} + \left(\frac{q}{p}\right)^{k-2} + \dots + 1 = \frac{1-(q/p)^k}{1-(q/p)}
$$

Then,

$$
u_k - u_0 = \frac{1-(q/p)^k}{1-(q/p)} (u_1-u_0)
$$

This must be true for $k=N$ (we use $N$ because we already know the “real” value of $u_k=0$ and using this, we can find the value of $u_1-u_0$):

$$
u_N - u_0 = \frac{1-(q/p)^N}{1-(q/p)} (u_1-u_0) \implies u_1 - u_0 = - \left (\frac{1 - (q/p)}{1 - (q/p)^N} \right )
$$

Therefore, for $k = 1, 2, \dots, N-1$,

$$
u_k - u_0 = \left (\frac{1 - (q/p)^k}{1 - (q/p)} \right )(u_1 - u_0)= - \left (\frac{1 - (q/p)^k}{1 - (q/p)} \right ) \left (\frac{1 - (q/p)}{1 - (q/p)^N} \right )
$$

So, the solution (using $u_0=1$) is:

$$
u_k = 1- \left (\frac{1 - (q/p)^k}{1 - (q/p)^N} \right )
$$

How do we interpret this result:

- When $q > p$ (game is NOT in our favor), then the probability of going broke is approximately $1 - \dfrac{1}{(q/p)^{N-k}}$. So, when $N \to \infty$, the probability of going broke goes to $1$ , i.e., if we do not set a stopping rule for ourselves, we will go broke eventually.
- When $p >q$ (the game is in our favor), the probability of going broke is approximately $(q/p)^k - (q/p)^N$. This means that when $N \to \infty$, the probability of going broke converges to $(q/p)^k$. Since $p > 1/2$, it’s likely that we will not get broke. But notice that even in this case, increasing $N$ increases the probability of going broke (since we will end up subtracting a smaller quantity of $(q/p)^N$).
- When $k$ increases (for a fixed $N$), i.e., we start out with more money, then the probability of going broke is smaller.
- It should come as no surprise that for a fixed $k$ and $N$, if the probability of winning a round $p$ increases, our chances of going broke decreases (why else would we be wishing for “good” luck 😲)

---

### Expected Number of Games Played

Recall that we’re trying to find out the average number of games the gambler will play before he reaches $N$ or $0$ (i.e,. before he “gets absorbed”).

That is, we are trying to find: $v_k= E[T|X_0=k]$.

We have already seen that it can be rewritten as: $v_k = E[\sum_{i=0}^{T-1}1|X_0=k]$ where $g(X_i)=1$ for any $X_i$

:::tip think 🤔
Why is it $\sum_0^{T-1}$ and not $\sum_0^T$ here? Because we are concerned with the number of transitions here. In particular, we don’t want to count the “state” where the game is over (because in that state, he doesn’t play any game) → think of it as the difference between counting the number of nodes on a path and the numebr of edges on a path. Here, we care about the edges. If he plays 2 games, he will go from $X_0 \to X_1 \to X_2$ (absorbed here) which is a total of $3$ “states”, but the “expected” answer is $2$. It’s just a small technicality - don’t worry too much about it. (even if we do count the state at time $T$, we can just set $g(x) = 0$ for absorbing states and it all works out okay)
:::

The system of linear equations is quite simple:

$$
\begin{equation*}
\begin{split}
v_0 &= 0 \\
v_N &= 0 \\
v_k &= 1 + pv_{k+1} + qv_{k-1} ,\quad k = 1, 2, \dots N-1
\end{split}
\end{equation*}
$$

Similar to what we had done for the previous question, we can use the fact that $p+q =1$ and analyze $v_k$ as such:

$$
\begin{equation*}
\begin{split}
(p+q)v_k &= 1 + pv_{k+1} + qv_{k-1} \\
v_{k+1} - v_k &= \frac{q}{p}(v_k - v_{k-1}) - \frac{1}{p}
\end{split}
\end{equation*}
$$

Similar to what we had done before, we can consider 2 cases: 1) $p=q$, and 2) $p \neq q$

**Case 1**: $p = q = 1/2$. The game is fair.

Then, using $v_0 =0$, the formula reduces to:

$$
v_{k+1} - v_k = v_k - v_{k-1}-2 = \dots = v_1 - v_0 - 2k = v_1 - 2k
$$

Noting that $v_k=0$, we have (think: telescoping series):

$$
\begin{equation*}
\begin{split}
v_k = v_k - v_0 &= (v_k - v_{k-1}) + (v_{k-1} - v_{k-2}) + \dots + (v_1 - v_0) \\
&= (v_1 - 2(k-1)) + (v_1 - 2(k-2)) + \dots + v_1 \\
&= kv_1 - k(k-1)
\end{split}
\end{equation*}
$$

For $k=N$, the above equation must also be true, and we know that $v_N = 0$ and so,

$$
v_N = 0 = Nv_1 - N(N-1) \implies v_1 = v_N/N + (N-1) = N-1
$$

Therefore (substituting the above value of $v_1$ in the previous equation), for $k=1,2, \dots, N-1$, we have:

$$
v_k = kv_1-k(k-1) = k(N-k)
$$

How do we interpret this?

- When $N \to \infty$, the above equation tells us that the expected number of games the gambler plays also tends to infinity. But recall that we have already shown that as $N \to \infty$, the probability of going broke tends to $1$. Moreover, we know that probability of stopping (either through going broke or reaching $N$) must be _at least_ the probability of going broke, i.e., $P(stop) \geq P(broke) = 1$. This may seem counter-intuitive: for $N \to \infty$ (gambler (virtually) “never” stops unless he goes broke), he is (virtually) destined to go broke and at the same time, the exepcted number of games he plays is infinite. This means that in expectation, “at some point in the very distant future (which refers to the “nearly infinite games”), he will go broke”.
  Note that this equation (actually, all our equations so far 😲) is only true for a finite $N$ so when we say “$N \to \infty$”, we actually mean “a very large value of $N$”

**Case 2**: $p \neq q$

Using the formula for geometric series, we get:

$$
v_{k+1} - v_k = \frac{q}{p}(v_k - v_{k-1}) - 1/ p= \dots = (\frac{q}{p})^k(v_1 - v_0) - \frac{(\frac{q}{p})^{k-1} + \dots + 1}{p}
$$

We can simplify the second term on the RHS to be:

$$
\frac{(\frac{q}{p})^{k-1} + \dots + 1}{p} = \left [\frac{1 - (q/p)^k}{1 - (q/p)} \right ]/ p = \frac{1 - (q/p)^k}{p - q}
$$

So, we get:

$$
v_{k+1} - v_k = (\frac{q}{p})^k(v_1 - v_0) - \frac{1 - (q/p)^k}{p - q}
$$

We can repeatedly apply this equation for smaller values of $k$ (just as we had done in the first question) and use the formula for geometric series to obtain a simplified equation for $v_k$ in terms of $v_1$ and $v_0$ (details omitted for the sake of brevity). Moreover, we can use the fact that $v_N=0$ and find the value of $(v_1-v_0)$. Substituting this in the general equation for $v_k$, we get:

$$
v_k = \frac{1}{(p-q)}\left [\frac{N(1-(q/p)^k)}{1 - (q/p)^N} - k \right ]
$$

How can we interpret this?

- When $p > q$ (game is biased in our favor), and we start off with more money (i.e., higher $k$), we will play a fewer number of games (for a fixed $N$) → because we are more likely to reach the “winning state” (i.e., obtain $N$ dollars) quickly and we’ll just quit earlier.
- Similarly, when $q > p$ (game is biased against us) and we start off with less money, we are likely to go broke quickly (and so, we will play fewer number of games).
- Suppose we get greedy and abandon our stopping rule (i.e,. set $N$ to be very large):
  - If $p > q$, the random walk diverges to infinity, i.e., it takes a very long time to stop the game
  - If $p < q$, $v_k \to \frac{k}{q-p}$ and so when the winning probability is less than 0.5, the expected time to converge is still finite.

:::note
💡 It is important to keep in mind that all our equations and interpretations are based on a finite, albeit arbitrarily large or small, value of $N$ (because in our derivations, we used the fact that $u_N = 0$ and $v_N = 0$)
:::

---

### Remarks on FSA (First Step Analysis)

We’ve seen that FSA can be applied when we’re interested in a quantity that can be expressed as:

$$
a_i = E[\sum_{n=0}^T g(X_n)|X_0=i]
$$

Let’s answer the following questions:

1. **How do we find $g(X_n)$?**

   Intuitively, we want to find out what and how does each step _contribute_ to the final quantity of interest. We need to have a deep understanding of the formula and what it really means to be able to apply it.

   For example, if we want to find $E[T|X_0=i]$ then we set $g(X_n)=1$ which means that every step we take, contributes one “time unit” to the final answer.

   When we’re interested in $P(X_T=0|X_0=i)$, we’re only concerned with the last state (i.e., the state at the stopping time), so we can write it as: $g(X_n) = I\{X_T=0\}$ (it’s not a typo → for any $n < T, g(X_n)=0$ and only for $n=T$ then $g(X_T)$ is $1$ if $X_T=0$, and $0$ otherwise). But since $0$ is an absorbing state, we are sure that for any $n<T, X_n \neq 0$ and so, we can simplify it to be: $g(X_n)=I\{X_n=0\}$

2. **Is $g(X_n)$ unique for one problem?**

   The functional form of $g(X_n)$ can be different, but the final quantity of interest needs to be the same → so the contribution of each term must be the same, but different people may have different ways of expressing the same contribution (using different functions that evaluate to the same numerical value for each step). So, by technicality, the form of $g$ is not unique, but practically speaking, the values of $g(X_n)$ are “fixed” for a given problem (otherwise we would get different answers).

3. **Can FSA only be applied for $a_i$ only? How about other formats?**

   Yes. One common “other” usecase is when we want to find the probability of a specific path/subpath (e.g. the expected number of times we observe $X_n=i,X_{n+1}=j$ in the stochastic process). In such a case, we cannot directly capture information about both the states $X_n$ and $X_{n+1}$ in a single equation of $a_i$. However, we can define a new markov process $\{Y_n\}$ such that $Y_n=(X_n,X_{n+1})$ and then we can perform first-step analysis on the process $Y$. If we had $4$ possible values of $X_n$, we would have $4^2=16$ possible values for $Y_n$. So, we can write out the 16 equations of $Y_{ij}$ and solve all of them.

   Intuitively, there’s no reason to stop at “first-step” analysis → so this is identical to performing “two-step” analysis. We look at how “two” steps behave together (and we need to “store”/capture the previous state’s information in some way → the cleanest way to do this is to define a new markov process that does exactly this).

   But, it is not always possible to apply FSA. For example, consider $S=$ number of times we visit state $2$ in the markov process. Obviously, we can find $E[S|X_0=i]$ using FSA. But we cannot find $Var(S)$ using FSA. Why? Because we don’t have a convenient way of representing $S^2$, which makes it difficult to perform the analysis.
