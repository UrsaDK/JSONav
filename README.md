JSON Navigator
==============

A Safari extension used display JSON in a usable way.

TODO
----

A list of things that needs to be done in the nearest future:

- Make sure that `rake clean` does all of the following:

      git reset --hard
      git submodule foreach reset --hard
      git clean -d --force
      git submodule foreach clean -d --force

- Add SASS and JS minification support
  - Create a generic `source` directory and move `JSONav.*` code there
  - Add all required gems to the Gemfile
  - Add `build:source` & `include:source` rake tasks
