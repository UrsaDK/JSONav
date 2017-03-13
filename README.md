JSON Navigator
==============

**Version:** 0.1  
**Status:** Fully functional, but missing tests.

Further details of the status of the project are in the "Development Roadmap" section.

About JSONav
------------

JSON Navigator (JSONav) is a Safari extension used to display JSON responses in a human-readable form: indented, syntax highlighted, with clickable links.

This extension is designed as a development tool with the following goals:

  - minimal size of the injected code
  - minimal interference with the loaded content
  - standard compliant, only valid content is highlighted

    There is plenty of tools out there that will try to repair JSON content, making a very good job of highlighting it. However, what I needed was a tool that would alert me to the fact that there are issues with the content returned by an endpoint.

    As a result, this extension will only highlight valid JSON responses from `http` or `https` protocols which identify their content either via *Content-Type* header (eg: `application/json`) or via the filename extension (ie: `.json`).

In short, JSONav is fast, minimalist, won't slow your system down, and if it isn't highlighting JSON content returned by a page then it is most likely that there is a problem with the endpoint!

How to Install
--------------

The easiest way to install this extension is via Apple's [Safari Extensions][safari_ext] repository.

If you wish to try the latest development release then you have two choices:

  1. [Download the latest build][github_ext]

    The latest signed build of the extension is available in the `build` directory of this repository. Once the file is downloaded, it can be installed by double clicking on it.

  2. Build the extension from scratch.

    To use this method you would have to be comfortable in a Terminal, as you might be required to diagnose and repair any potential build issues.

    The following set commands should get you started:

        git clone https://github.com/UmkaDK/JSONav.git
        bundle install
        bundle exec rake install build

    This would build an unpackaged and unsigned extension in the `JSONav.safariextension` directory of the repository. To use it, you would have to:

      - allow the use of unsigned extensions in Safari:  
        *Safari Menu > Develop > Allow Unsigned Extensions*

      - install the extension via the extension builder:  
        *Safari Menu > Develop > Show Extension Builder > + > Add Extension...*

3rd Party Libraries
-------------------

JSON Navigator relies on a number of 3rd party libraries to do the heavy lifting:

  - @isagalaev/highlight.js - is used to provide syntax highlighting and colour themes (77 of them!).

  - @SoapBox/linkifyjs - is used to find links in plain-text and converting them to HTML `<a>` tags.

Development Roadmap
-------------------

A list of planned features and issues that needs to be addressed before this extension can be considered at:

### 1.0

- [x] Automate build via Rake

- [ ] Rewrite in ECMAScript 6

- [ ] Add browser tests via [selenium-cucumber](https://seleniumcucumber.info)

### 1.1

- [ ] Implement an additional object-viewer, possibly using @xyc/react-object-inspector

### 1.2

- [ ] Add support for JSONP


[safari_ext]: #
[github_ext]: #
