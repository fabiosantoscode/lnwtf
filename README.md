
# lnwtf

Because I never remember the argument order for `ln`. And because doing relative paths is just confusing!

Here's how to create a symlink from `/foo/bar` to a directory called `here`, above your own directory.

    $ lnwtf -s --from /foo/barz --to ../here

Easy right?

# Options

```
-f, --from                   The start of the link (required)
-t, --to                     The destination of the link (required)
-s, --symbolic, --symlink    Create a symbolic link
-h, --help                   Display this message
```

