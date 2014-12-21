namespace :karma  do
  task :start => :environment do
    test :start
  end

  task :run => :environment do
    test :start, "--single-run"
  end

  private

  def test(command, args = nil)
    system "./node_modules/karma/bin/karma #{command} spec/karma/config/unit.js #{args}"
  end
end
