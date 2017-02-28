desc "Install all resources required by 3rd party code"
task install: ['install:highlight', 'install:linkify']

namespace :install do
  task :check_prerequisites do |t|
    unless system "type -P npm"
      puts "ERROR: Missing dependency -- NodeJS"
      puts "NodeJS can be installed via Homebrew with:"
      puts "\tbrew install node --with-full-icu --with-openssl"
    end
  end

  desc "Install resources required by #{CONFIG[:highlight][:desc]}"
  task highlight: [:check_prerequisites] do |t|
    cd File.join File.dirname(__dir__), CONFIG[:highlight][:base_dir]
    sh "npm install"
    cd File.dirname(__dir__)
  end

  desc "Install resources required by #{CONFIG[:linkify][:desc]}"
  task linkify: [:check_prerequisites] do |t|
    cd File.join File.dirname(__dir__), CONFIG[:linkify][:base_dir]
    sh "npm install"
    cd File.dirname(__dir__)
  end
end


desc "Recursively update submodules & reinstall resources"
task :update do |t|
  sh "git submodule update --recursive --remote"
  Rake::Task['rake:install'].invoke
end
