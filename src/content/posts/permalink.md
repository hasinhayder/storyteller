---
title: Modifying the Permalink
tags: [programming,web]
date: August 13 2024
featuredImage: https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

Authors in WordPress have a homepage url like [http://domain.com/author/authorname](http://domain.com/author/authorname) where all their posts are shown. And many of us who think it doesn’t look attractive want to change that url format. The middle part of that url, which says author, is called an author_base and it is possible to change this using some rewrite rules and filters. Let’s get our hand dirty 🙂

## Modifying the permalink
To change the author base in permalink, you need to use the global $wp_rewrite class, like this

```php
add_action("init","change_author_base_in_permalink");
function change_author_base_in_permalink() {
    global $wp_rewrite;
    $wp_rewrite->author_base = "users";
    $wp_rewrite->flush_rules();
}
```

Now, as soon as you visit http://domain.com/author/authorname you will see that it’s a 404. Good, eh? At the same time, this link http://domain.com/users/authorname will display all the posts for this particular user.

If you want to revert this change and go back to the old url structure, then all you have to do is comment that action, and then flush the permalink for once.

## Other fixes
There is one small problem. Though the new permalink has been effective, but `get_author_posts_url()` still returns an url with the old format. So we need to fix that part too. Luckily, there is a filter 🙂

```php
add_filter("author_link","fix_author_link");
function fix_author_link($link){
    if($link){
    return str_replace("author","users",$link);
    }
}
```

That’s mainly it. I hope you find this article useful.