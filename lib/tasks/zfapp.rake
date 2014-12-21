namespace :zfapp  do
  task :install => :environment do
    system "npm install; bower install"
  end

  task :build => :environment do
    system "gulp"
  end
end
