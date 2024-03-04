---
sidebar_position: 2
---

# Trie

Pronounced "try", not "tree".

**Aim: Searching for a string in a tree in $O(L)$ time (where $L$ is the length of the string), Performing Partial String Operations, Prefix Queries, etc.**

## Option 1: Just use a Tree!

If we store a string at every node of a tree, in which all the nodes are sorted lexicographically, then how much time do we take to find a string in the tree?

It takes $O(L)$ to compare two strings of length $L$. So, in the worst case it would take $O(hL)$time to find a string in a tree, where $h$ is the height of the tree. We can do better than this!

## Using Tries!

Store a letter (instead of a string) at every node of the tree. Then, you just have to compare each letter at every level of the trie. You need to have an end-of-string character to indicate that a string ends at that particular node. This can be done simply by using a variable at every node. Each node stores an array of its children. If you wish to have only lower-case strings in your trie, each node will have an array of length 26 for its children.

Note that it takes $O(1)$ to find the child since you maintain an array of children at each node. For example, if you are searching for “c” as the next character, you know that if the node exists, it would be at index 2 of the children array. No need to loop through the entire array. Thus, $O(1)$ lookup time.

### Time

- Tries are much faster than trees for string-comparisons (and other cool stuff too!).
- Does not depend on the size of the total text.
- Does not depend on the number of strings in the trie.

### Space

- Trie tends to use more space
- BST and Trie use $O(\text{text size})$ space.
- Trie has more nodes and more overhead.

### Applications of Tries

- Searching, sorting and enumerating strings in a “dictionary”
- Performing partial string operations inlcluding but not limited to:
  - **Prefix queries**: find all the strings that start with a specific substring
  - **Long prefix**: what is the longest prefix of a given string in the trie
  - **Wildcards**: find a string of the form pi??e where ? could be any letter

### Basic Trie implementation (supports insertion, search, prefix query, wildcards)

The following is a simple implementation of a trie in Java.

```java
import java.util.ArrayList;

public class Trie {

    // Wildcards
    final char WILDCARD = '.';
    TrieNode root; //Each trie needs to have a root of the trie

    private class TrieNode {

        // 26 (Uppercase) + 26 (Lowecase) + 10 (Numbers) = 62
        int[] presentChars = new int[62];

        /*
        0 - 9 correspond to the numbers 0 - 9
        10 - 35 correspond to the uppercase alphabets A - Z
        36 - 61 correspond to the lowercase alphabets a - z
         */
        TrieNode[] children = new TrieNode[62];
        boolean endOfString = false;
        String c;

        TrieNode(String c) {
            this.c = c;
        }
        TrieNode() {}

    }

    public Trie() {
        this.root = new TrieNode("");
    }

    /**
     * Inserts string s into the Trie.
     *
     * @param s string to insert into the Trie
     */
    void insert(String s) {
        insert_helper(s,this.root,0);
    }

    /**
     * Inserts the ith character of the string into the trie at node
     * @param s
     * @param node
     * @param i
     */
    public void insert_helper(String s, TrieNode node, int i) {
        if (i >= s.length()) {
            node.endOfString = true;
            return;
        }
        char character = s.charAt(i);
        int ascii = (int) character;
        if (ascii >= 48 && ascii <= 57) {
            ascii -= 48; //Since ascii = 48 corresponds to index 0 in the children array
        } else if (ascii >= 65 && ascii <= 90) {
            ascii -= 55; //Since ascii = 65 corresponds to index 10 in the children array
        } else if (ascii >= 97 && ascii <= 122) {
            ascii -= 61;
        }
        if (node.children[ascii] == null) node.children[ascii] = new TrieNode(Character.toString(character));
        insert_helper(s, node.children[ascii], i + 1);
    }

    /**
     * Checks whether string s exists inside the Trie or not.
     *
     * @return whether string s is inside the Trie
     */
    boolean contains(String s) {
        return contains_helper(s, this.root, 0);
    }
    public boolean contains_helper(String s, TrieNode node, int i) {
        if (i >= s.length()) return node.endOfString;
        char character = s.charAt(i);

        int ascii = (int) character;
        if (ascii >= 48 && ascii <= 57) {
            ascii -= 48; //Since ascii = 48 corresponds to index 0 in the children array
        } else if (ascii >= 65 && ascii <= 90) {
            ascii -= 55; //Since ascii = 65 corresponds to index 10 in the children array
        } else if (ascii >= 97 && ascii <= 122) {
            ascii -= 61;
        }
        if (node.children[ascii] == null) return false;
        else return contains_helper(s, node.children[ascii], i + 1);
    }

    /**
     * Searches for strings with prefix matching the specified pattern sorted by lexicographical order. This inserts the
     * results into the specified ArrayList. Only returns at most the first limit results.
     *
     * @param s       pattern to match prefixes with
     * @param results array to add the results into
     * @param limit   max number of strings to add into results
     */
    void prefixSearch(String s, ArrayList<String> results, int limit) {
        if (results.size() >= limit) return;
        prefixSearchHelper(s, results, limit, 0, this.root, new StringBuilder());

    }
    void prefixSearchHelper(String s, ArrayList<String> results, int limit, int index, TrieNode node, StringBuilder curr) {
        if (node == null || results.size() > limit) return;
        // If you are at a node, it means that you are meant to be there. So, add that letter to curr without checking
        // Then continue checking for the rest

        curr.append(node.c);
        if (node.endOfString && index >= s.length()) results.add(String.valueOf(curr));

        // we have already finished the prefix, just find all possible strings in the trie rooted at node
        // sort of DFS
        // We exploit the lazy evaluation of logical operators in java below
        if (index >= s.length() || s.charAt(index) == WILDCARD) {

            for (TrieNode child : node.children) {
                if (results.size() > limit) return;
                prefixSearchHelper(s, results, limit, index + 1, child, new StringBuilder(curr));
            }
        }
        else {
            // we still need to stick to finding the prefix
            char character = s.charAt(index);
            int ascii = (int) character;
            if (ascii >= 48 && ascii <= 57) {
                ascii -= 48; //Since ascii = 48 corresponds to index 0 in the children array
            } else if (ascii >= 65 && ascii <= 90) {
                ascii -= 55; //Since ascii = 65 corresponds to index 10 in the children array
            } else if (ascii >= 97 && ascii <= 122) {
                ascii -= 61;
            }
            if (node.children[ascii] == null) return;
            prefixSearchHelper(s, results, limit, index + 1, node.children[ascii], curr);
        }

    }

    // Simplifies function call by initializing an empty array to store the results.
    String[] prefixSearch(String s, int limit) {
        ArrayList<String> results = new ArrayList<String>();
        prefixSearch(s, results, limit);
        return results.toArray(new String[0]);
    }

    public static void main(String[] args) {
        Trie t = new Trie();
        t.insert("peter");
        t.insert("piper");
        t.insert("picked");
        t.insert("a");
        t.insert("peck");
        t.insert("of");
        t.insert("pickled");
        t.insert("peppers");
        t.insert("pepppito");
        t.insert("pepi");
        t.insert("pik");

        System.out.println(t.contains("peter"));

//        String[] result1 = t.prefixSearch("pe", 10);
//        for (String s : result1) {
//            System.out.println(s);
//        }
//        String[] result2 = t.prefixSearch("pe.", 10);
//        for (String s : result2) {
//            System.out.println(s);
//        }
//        String[] result3 = t.prefixSearch(".e.p", 10);
//        for (String s : result3) {
//            System.out.println(s);
//        }

        // result1 should be:
        // ["peck", "pepi", "peppers", "pepppito", "peter"]
        // result2 should contain the same elements with result1 but may be ordered arbitrarily
    }
}
```
