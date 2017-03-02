desc "Remove build artefacts from the safari extension"
task :clean do |t|
  cd File.dirname(__dir__)

  vendor_dir = File.join CONFIG[:safari][:base_dir], CONFIG[:safari][:vendor_dir]
  if File.directory? vendor_dir
    remove_dir vendor_dir, verbose: true
    mkdir_p vendor_dir, verbose: true
  end

  sh 'git submodule foreach git reset --hard'
  sh 'git submodule foreach git clean -d --force'
end

desc "Reset repository and submodules into a pristine state"
task clobber: [:clean] do |t|
  sh 'git reset --hard'
  sh 'git clean -d --force'
  sh 'git submodule foreach git clean -dx --force'
end
