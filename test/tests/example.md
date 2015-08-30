# Tests for `marked-tex-renderer`

This file contains tests for `marked-tex-renderer`.

## Headings

Let's check how the headings work.

### A Level 3 Heading

This should be a subsection.

#### A Level 4 Heading

This should be a subsubsection.

##### A level 5 heading

This should be a paragraph.

###### A level 6 heading

This should be a subparagraph.

## Basic formatting

### Emphasis {-}

```
This text is *emphasized*. So is _this_.
```

This text is *emphasized*. So is _this_.

### Strong {-}

```
This text is **strong**. So is __this__.
```

This text is **strong**. So is __this__.

### Emphasis and Strong {-}

```
This text is both ***strong and emphasized***.
So is ___this___.
```

This text is both ***strong and emphasized***.
So is ___this___.

### Inline Code {-}

```
This text contains `some code`.
```

This text contains `some code`.

### Deleted text {-}

```
This sentence has ~~an interesting~~a deleted phrase.
```

This sentence has ~~an interesting~~a deleted phrase.

### Hyperlinks {-}

```
Visit [GitHub](https://github.com/).
```

Visit [GitHub](https://github.com/).

## Lists

### Unordered Lists {-}

To put a Girraffe in a refregerator:

```
 * Open refregerator door
 * Put the Girraffe in
 * Close the refregerator door
```

 * Open refregerator door
 * Put the Girraffe in
 * Close the refregerator door

### Ordered Lists {-}

A hitchhicker must have:

```
 1. The Hitchhicker's Guide to Galaxy
 2. A towel
```

 1. The Hitchhicker's Guide to Galaxy
 2. A towel

## Quotes

```
> When I wrote it, only God and I knew; now God alone knows!
```

> When I wrote it, only God and I knew; now God alone knows!

## Code Listings

### Traditional {-}

Code is marked by an indent of four spaces:

```
    console.log('Hello world!);
```

    console.log('Hello world!);

### GitHub Style {-}

Code is fenced by three backtick characters:

    ```
    console.log('Hello GitHub');
    ```

```
console.log('Hello GitHub');
```

## Tables

### A minimal table {-}

```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

### With extra lines on sides {-}

```
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
```

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

### Columns with irregular width {-}

```
| Name | Description          |
| ------------- | ----------- |
| Help      | Display the help window.|
| Close     | Closes a window     |
```

| Name | Description          |
| ------------- | ----------- |
| Help      | Display the help window.|
| Close     | Closes a window     |

### Table with inlined markdown {-}

```
| Name | Description          |
| ------------- | ----------- |
| Help      | Display the **help** window.|
| Close     | _Closes_ a window     |
```

| Name | Description          |
| ------------- | ----------- |
| Help      | Display the **help** window.|
| Close     | _Closes_ a window     |

### Aligned cells {-}

```
| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
```

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

## TeX Special Characters

There are 10 special characters that should be taken care of:

`&` `%` `$` `#` `_` `{` `}` `~` `^` `\`

## Images

![The TeX Logo](TeX_logo.png)
