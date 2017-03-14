JSON Navigator
==============

<img src="./JSONav.safariextension/Icon.png" alt="JSONav" align="left" width="75">

**Version:** pre-release  
**Status:** Fully functional, but missing tests.  
**Download:** [Stable release][apple_download] | [Latest build][github_download]

About JSONav
------------

JSON Navigator (JSONav) is a Safari extension used to display JSON responses in a human-readable form: indented, syntax highlighted, with clickable links.

<img src="./Screenshot.png" alt="JSONav screenshot" align="right" width="50%">

This extension is designed with the following goals in mind:

  - minimal size of the injected code

    Under no circumstances should this extension interfere with or slow down the browser.

  - minimal interference with the loaded content

    JSONav should be very conservative at choosing what pages to alter. It should only look at pages that are:

    - served over `http` or `https` protocols
    - identified as having JSON content either by *Content-Type* header (eg: `application/json`) or via the filename extension (ie: `.json`).

  - standard compliant, only valid content is highlighted

    This extension will only highlight valid JSON content. Thus, effectively validating JSON content returned by an endpoint.

  - close integration with the browser eco-system

    JSONav looks and feels like part of the browsers. Where ever possible it reuses default fonts and styling providing a consistent and familiar styling, established by default browsers tools (eg: XML parser).

In short, JSONav is fast, minimalist, won't slow your system down, and if it isn't highlighting JSON content returned by a page then it is highly likely that there is a problem with the endpoint!

How to Install
--------------

The easiest way to install this extension is via Apple's [Safari Extensions][apple_download] repository.

If you wish to try the latest development release then you have two choices:

  1. [Download the latest build][github_download]

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

  - [isagalaev/highlight.js](https://github.com/isagalaev/highlight.js) - is used to provide syntax highlighting and colour themes (77 of them!).

  - [SoapBox/linkifyjs](https://github.com/SoapBox/linkifyjs) - is used to find links in plain-text and converting them to HTML `<a>` tags.


[apple_download]: https://safari-extensions.apple.com
[github_download]: https://github.com/UmkaDK/JSONav/raw/master/build/JSONav.safariextz
