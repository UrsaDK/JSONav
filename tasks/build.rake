require 'plist'

desc "Build all 3rd party extensions"
task build: ['build:highlight', 'build:linkify']

namespace :build do
  desc "Build #{CONFIG[:highlight][:desc]}"
  task :highlight do |t|
    cd File.join File.dirname(__dir__), CONFIG[:highlight][:base_dir]
    sh "node tools/build.js --target browser #{CONFIG[:highlight][:languages].join(' ')}"
    cd File.dirname(__dir__)
  end

  desc "Build #{CONFIG[:linkify][:desc]}"
  task :linkify do |t|
    cd File.join File.dirname(__dir__), CONFIG[:linkify][:base_dir]
    sh "./node_modules/.bin/gulp build"
    sh "./node_modules/.bin/gulp dist"
    cd File.dirname(__dir__)
  end

  desc "Build #{CONFIG[:safari][:desc]}"
  task :safari do |t|
    settings = Plist::parse_xml safari_plist
    index = settings.find_index { |dict| dict['Key'] == 'theme' }

    settings[index]['Values'] = highlight_styles
    settings[index]['Titles'] = settings[index]['Values'].map do |style|
      style.split(/[-_\s\.]+/).map(&:capitalize).join(" ")
    end

    File.write safari_plist, settings.to_plist
    puts "Updated: #{safari_plist}"
  end
end

def safari_plist
  File.join File.dirname(__dir__),
            CONFIG[:safari][:base_dir],
            CONFIG[:safari][:settings]
end

def highlight_styles
  dir = File.join File.dirname(__dir__),
                  CONFIG[:safari][:base_dir],
                  CONFIG[:safari][:vendor_dir],
                  File.basename(CONFIG[:highlight][:base_dir]),
                  'styles'
  Dir::glob("#{dir}/*.css").map { |style| File.basename style, '.css' }
end
