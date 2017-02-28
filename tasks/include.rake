desc "Include 3rd party code in JSONav extensions"
task include: ['include:highlight', 'include:linkify']

namespace :include do
  desc "Include #{CONFIG[:highlight][:desc]} in JSONav extensions"
  task :highlight do |t|
    include_provided_resources t
  end

  desc "Include #{CONFIG[:linkify][:desc]} in JSONav extensions"
  task :linkify do |t|
    include_provided_resources t
  end
end

def include_provided_resources(task)
  ext = task.name.split(':').last.to_sym
  dir = vendor_path_for ext

  CONFIG[ext][:provides].each do |src|
    src = File.join File.dirname(__dir__), CONFIG[ext][:base_dir], src
    dest = File.join dir, File.basename(src)
    include_resource src, dest
  end
end

def include_resource(src, dest)
  if File.directory? src
    remove_dir dest if File.directory? dest
    cp_r src, File.dirname(dest), verbose: true
  else
    install src, dest, verbose: true
  end
end

def vendor_path_for(ext)
  dir = File.join File.dirname(__dir__),
            CONFIG[:safari][:base_dir],
            CONFIG[:safari][:vendor_dir],
            File.basename(CONFIG[ext.to_sym][:base_dir])
  mkdir_p dir, verbose: true
end
